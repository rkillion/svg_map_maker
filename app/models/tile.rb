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
    relationship = self.tile_relationships.where(relationship: "parent")
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

      [next_tile_zero,next_tile_one,next_tile_two,next_tile_three]
    end
  end

  private

  def opposite_of
    {parent: "child",child:"parent",east:"west",west:"east",north:"south",south:"north"}
  end
end
