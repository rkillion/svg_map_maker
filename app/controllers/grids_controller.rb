class GridsController < ApplicationController
    before_action :confirm_authentication
    before_action :set_tile, only: [:show]

    def show
        render json: {
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
    end

    private

    def set_tile
        @tile = current_user.tiles.find(params[:id])
    end

    def tile_hash(tile)
        if tile
            {
                id: tile.id,
                zoom_level: tile.zoom_level,
                shapes: shapes_hash(tile)
            }
        else
            nil
        end
    end

    def shapes_hash(tile)
        tile.shapes.map{|shape| {
            id: shape.id,
            shape_class: shape.shape_class_id,
            shape_type: shape.shape_type_id,
            path_zero: shape.path_zero,
            path_one: shape.path_one,
            path_two: shape.path_two,
            path_three: shape.path_three,
            feature: shape.feature
        }}
    end
end
