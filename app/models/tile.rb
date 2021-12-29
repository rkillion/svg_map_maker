class Tile < ApplicationRecord
  belongs_to :world
  belongs_to :user
  validates :zoom_level, presence: true, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 21}
  has_many :tile_relationships, foreign_key: :tile_id, dependent: :destroy
  has_many :reverse_tile_relationships, class_name: "TileRelationship", foreign_key: :relative_id, dependent: :destroy
  has_many :relatives, through: :tile_relationships, source: :relative_id
  has_many :views, dependent: :destroy
  has_many :children, -> {where(relationship: "child")}, through: :tile_relationships, source: :relative_id, class_name: "Tile"
  has_many :shapes, dependent: :destroy

  def settings
    world = self.world.settings
    #a square (editable portion of the map) is 1 unit wide at zoom zero and squares with every level above that. The max width is 32 at level 5 because at that point, the editable squares from zoom zero are too small to see. They are removed from the shape path in this and higher zoom levels such that the user only ever sees paths from 5 levels
    square_width_units = 2**[zoom_level,5].min
    square_width_feet = world[:zero_level_square_width_feet]*(2**zoom_level)
    {
      zoom_level: zoom_level,
      square_width_units: square_width_units,
      square_width_feet: square_width_feet,
      square_width_miles: square_width_feet/5280,
      tile_width_units: world[:tile_width_squares]*square_width_units,
      tile_width_feet: world[:tile_width_squares]*square_width_feet,
      tile_width_miles: world[:tile_width_squares]*square_width_feet/5280
    }
  end

  def make_default_view(title="Tile#{self.id}")
    focus = self.settings[:tile_width_units]/2
    View.create(
      user_id: self.user.id,
      tile_id: self.id,
      world_id: self.world.id,
      focus_x: focus,
      focus_y: focus,
      title: title
    )
  end

  def parent
    relationship = TileRelationship.find_by(tile_id: self.id, relationship: "parent")
    Tile.find_by(id: relationship.relative_id)
  end

  def border(direction)
    relationship = self.tile_relationships.find_by(relationship: direction)
    if relationship
      Tile.find_by(id: relationship.relative_id)
    end
  end

  def east
    self.border("east")
  end

  def west
    self.border("west")
  end

  def north
    self.border("north")
  end

  def south
    self.border("south")
  end

  def northeast
    self.north&.east
  end

  def southeast
    self.south&.east
  end

  def northwest
    self.north&.west
  end

  def southwest
    self.south&.west
  end

  def make_sub_tile(quadrant)
    if self.zoom_level==0
      return nil
    else
    sub_tile = Tile.create(zoom_level: self.zoom_level.to_i-1,world_id: self.world.id,user_id: self.user.id)
    self.set_relationship(sub_tile,"child",quadrant)
    end
    sub_tile
  end

  def set_relationship(tile,relationship,reference=nil)
    TileRelationship.create(tile_id: self.id,relative_id: tile.id,relationship: relationship,reference: reference)
    TileRelationship.create(relative_id: self.id,tile_id: tile.id,relationship: opposite_of[relationship.to_sym],reference: reference)
  end

  def make_sub_tiles
    if self.zoom_level==0
      return nil
    else
      next_tile_zero = make_sub_tile(0)
      next_tile_one = make_sub_tile(1)
      next_tile_two = make_sub_tile(2)
      next_tile_three = make_sub_tile(3)

      next_tile_zero.set_relationship(next_tile_one,"east")
      next_tile_zero.set_relationship(next_tile_two,"south")
      next_tile_one.set_relationship(next_tile_three,"south")
      next_tile_two.set_relationship(next_tile_three,"east")

      #also check to see if neighboring tiles exist so you can make the connections to those as well
      
      child_tiles = [next_tile_zero,next_tile_one,next_tile_two,next_tile_three]
      relate_subtiles_to_neighbors(child_tiles)

      #lastly, new shapes need to be created for each child. First get all the shapes from the parent tile
      
      make_subshapes(next_tile_zero,0)
      make_subshapes(next_tile_one,1)
      make_subshapes(next_tile_two,2)
      make_subshapes(next_tile_three,3)
      child_tiles
    end
  end

  def subtiles?
    if self.tile_relationships.find_by(relationship: "child")
      return true
    else
      return false
    end
  end

  def subtiles(quadrant=nil)
    if self.subtiles?
      if quadrant
        return Tile.find(TileRelationship.find_by(tile_id: self.id,relationship:"child",reference:quadrant).relative_id)
      else
        return self.tile_relationships.select{|record| record.relationship=="child"}.map{|record|Tile.find(record.relative_id)}
      end
    end
  end

  def seed
    sea_shape = Shape.create(
      tile_id: self.id,
      shape_type_id: ShapeType.find_by(title: "Sea").id,
      shape_class_id: ShapeClass.find_by(title: "Geographical").id,
      user_id: self.user.id,
      feature_id: self.world.features[0].id
    )
    sea_shape.set_paths
  end

  def update_shape_on_parent_tiles(shape_params,count)
    relationship = TileRelationship.find_by(tile_id: self.id, relationship: "parent")
    this_feature = Feature.find(shape_params[:feature][:id])
    # byebug
    if relationship && count<10
      quadrant = relationship.reference;
      parent = Tile.find_by(id: relationship.relative_id)
      # check to see if the parent already has a shape of the same feature
      existing_shape = Shape.find_by(tile_id: parent.id,feature_id: shape_params[:feature][:id])
      # byebug
      if existing_shape
        existing_shape.update_from_child(shape_params[:path_array],quadrant)
        # byebug
      else
        new_shape = Shape.create(
          tile_id: parent[:id],
          shape_class_id: this_feature.shape_class_id,
          shape_type_id: this_feature.shape_type_id,
          user_id: parent[:user_id],
          feature_id: shape_params[:feature][:id]
          # path_array: needs to be set
        )
        new_shape.set_paths("empty",true)
        # byebug
        new_shape.update_from_child(shape_params[:path_array],quadrant)
      end
      parent = Tile.find_by(id: relationship.relative_id)
      parent_shape = Shape.find_by(tile_id: parent.id,feature_id: shape_params[:feature][:id])
      # byebug
      parent.update_shape_on_parent_tiles({
        path_array: JSON.parse(parent_shape.path_array),
        tile_id: parent[:id],
        feature: {id: shape_params[:feature][:id]}
      },count+1)
    end
    # you'll want to identify the predominant feature of a tile- the feature with the most colored squares (though you'll also have to subtract cover- so you'll need to subtract land from ocean for example since the ocean is still rendered underneath the land- or wait, no actually you can just look at the innermost level for each shape's path array. If two or more quadrants are full, fill the square, if not, then don't)
  end

  def update_shape_on_child_tiles(feature_id)
    #check to see if a child tile exists
    if self.subtiles? #if so, create or update its shape for that feature
      #get each child tile
      subtiles = self.subtiles
      #get this tiles' shape with the feature_id argument
      this_feature_shape = self.shapes.find_by(feature_id: feature_id)
      #get each subtiles' corresponding shape and/or create one
      subtiles.each do |subtile|
          #get the shape with the same feature
          quadrant = subtiles.index(subtile)
          this_feature_subtile_shape = subtile.shapes.find_by(feature_id: feature_id)
          if this_feature_subtile_shape # if the shape exists, update the path_array accordingly
            this_feature_subtile_shape.update(path_array: this_feature_shape.make_subpath(quadrant))
          else #if the shape doesn't exist on the subtile, create one with the adjust path_array
            sub_shape = Shape.create(
              tile_id: subtile[:id],
              shape_class_id: this_feature_shape[:shape_class_id],
              shape_type_id: this_feature_shape[:shape_type_id],
              user_id: self.user_id,
              feature_id: feature_id,
              path_array: this_feature_shape.make_subpath(quadrant)
            )
          end
          #run this function on each child tile
          subtile.update_shape_on_child_tiles(feature_id)
        end
    end
  end

  private

  def make_subshapes(child_tile,quadrant)
    self.shapes.each do |shape|
      sub_shape = Shape.create(
        tile_id: child_tile[:id],
        shape_class_id: shape[:shape_class_id],
        shape_type_id: shape[:shape_type_id],
        user_id: shape[:user_id],
        feature_id: shape[:feature_id],
        path_array: shape.make_subpath(quadrant)
      )
    end
  end

  def opposite_of
    {parent: "child",child:"parent",east:"west",west:"east",north:"south",south:"north"}
  end

  def relate_subtiles_to_neighbors(subtile_array)
    if self.north&.subtiles?
      connect_subtiles("north",subtile_array)
    end
    if self.south&.subtiles?
      connect_subtiles("south",subtile_array)
    end
    if self.east&.subtiles?
      connect_subtiles("east",subtile_array)
    end
    if self.west&.subtiles?
      connect_subtiles("west",subtile_array)
    end
  end

  def connect_subtiles(direction,subtiles)
    neighbor_subtile_indeces = {north: [2,3],south: [0,1],east: [0,2],west: [1,3]}
    subtile_indeces = {north: [0,1],south: [2,3],east: [1,3],west: [0,2]}
    subtile_a = self.border(direction).subtiles(neighbor_subtile_indeces[direction.to_sym][0])
    subtile_b = self.border(direction).subtiles(neighbor_subtile_indeces[direction.to_sym][1])
    subtiles[subtile_indeces[direction.to_sym][0]].set_relationship(subtile_a,direction)
    subtiles[subtile_indeces[direction.to_sym][1]].set_relationship(subtile_b,direction)
  end

end
