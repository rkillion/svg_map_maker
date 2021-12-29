class Api::ShapesController < ApplicationController
  before_action :confirm_authentication
  before_action :set_shape, only: [:show, :update, :destroy]

  #POST /mapedits
  def process_mapedits
    params[:add].each do |shape|
      tile = current_user.tiles.find(shape[:tile_id])
      if tile
        new_shape = Shape.new(
          tile_id: tile.id,
          shape_type_id: shape[:feature][:shape_type_id],
          shape_class_id: shape[:feature][:shape_class_id],
          user_id: current_user.id,
          feature_id: shape[:feature][:id],
          path_array: shape[:path_array].to_json
        )
        if new_shape.valid?
          new_shape.save
        end
      end
      # check up the parent chain up to five levels and update each tile
      # any subtiles that already exist would need to be updated
    end
    params[:edit].each do |shape|
      shape_to_edit = current_user.shapes.find(shape[:id])
      if shape_to_edit
        shape_to_edit.update(
          path_array: shape[:path_array].to_json
        )
        shape_to_edit.tile.update_shape_on_parent_tiles(shape,0)
        shape_to_edit.tile.update_shape_on_child_tiles(shape[:feature][:id])
      end
    end
  end

  # GET /shapes
  def index
    @shapes = current_user.shapes

    render json: @shapes
  end

  # GET /shapes/1
  def show
    render json: @shape
  end

  # POST /shapes
  def create
    @shape = Shape.new(shape_params)
    current_user.shapes << @shape unless !@shape.valid?
    if @shape.save
      render json: @shape, status: :created, location: @shape
    else
      render json: @shape.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shapes/1
  def update
    if @shape.update(shape_params)
      render json: @shape
    else
      render json: @shape.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shapes/1
  def destroy
    @shape.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shape
      @shape = current_user.shapes.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shape_params
      params.require(:shape).permit(:tile_id, :shape_class_id, :shape_type_id, :path_zero, :path_one, :path_two, :path_three)
    end
end
