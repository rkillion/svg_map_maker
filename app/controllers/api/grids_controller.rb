class Api::GridsController < ApplicationController
    before_action :confirm_authentication
    before_action :set_tile, only: [:show]

    def show
        # Run make subtiles on each tile in the grid unless it has subtiles already. You'll need to make the grid object first to reference it, then you can render it at the end. When making the sub-tile, you'll need to add another parameter: the grid. And you'll need to adjust make_subtile to accomodate that. This is because each subtile also needs to be able to link its north, south, east, and west tiles that belong to different parent tiles. You'll also need to add functionality to make-subtiles so that new Shapes are created for them with their path arrays copied from the matching quadrant. Shape updates will then also have to update child shapes and parent shapes
        grid = {
            settings: @tile.settings,
            tiles: {
                center: tile_hash(@tile),
                northeast: tile_hash(@tile.northeast),
                north: tile_hash(@tile.north),
                northwest: tile_hash(@tile.northwest),
                east: tile_hash(@tile.east),
                west: tile_hash(@tile.west),
                south: tile_hash(@tile.south),
                southeast: tile_hash(@tile.southeast),
                southwest: tile_hash(@tile.southwest)
            }
        }
        # check each tile in the grid to see if it has subtiles
        grid[:tiles].each do |position, tile_hash|
            tile = tile_hash&&Tile.find(tile_hash[:id])
            # puts "Checking #{position} tile #{tile_hash&&tile_hash[:id]}: #{tile&&tile.subtiles?}"
            # if tile&&!tile.subtiles?
            #     tile.make_sub_tiles
            # end
        end
        render json: grid
    end

    private

    def set_tile
        @tile = current_user.tiles.find(params[:id])
    end

    def tile_hash(tile)
        # the tile also needs to return an array of the four ids of its child tiles, the front end needs that so it knows what tile to ask for when zooming in 
        if tile
            thisParent = TileRelationship.find_by(tile_id: tile.id,relationship: "parent")
            parent_hash = {}
            if thisParent
                parent_hash = {id: thisParent.relative_id, quadrant: thisParent.reference}
            end
            {
                id: tile.id,
                zoom_level: tile.zoom_level,
                has_subtiles: tile.subtiles?,
                subtiles: tile.subtiles&.map{|subtile|subtile.id},
                parent: parent_hash,
                shapes: shapes_hash(tile)
            }
        else
            nil
        end
    end

    def shapes_hash(tile)
        shapes_array = tile.shapes.map{|shape| {
            id: shape.id,
            tile_id: shape.tile.id,
            shape_class: shape.shape_class_id,
            shape_type: shape.shape_type_id,
            path_zero: shape.path_zero,
            path_one: shape.path_one,
            path_two: shape.path_two,
            path_three: shape.path_three,
            path_array: shape.path_array && JSON.parse(shape.path_array),
            feature: shape.feature
        }}
        shapes_array.sort{|a,b|a[:feature][:id]<=>b[:feature][:id]}
    end
end
