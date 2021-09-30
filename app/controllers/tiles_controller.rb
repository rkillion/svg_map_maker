class TilesController < ApplicationController
  before_action :confirm_authentication
  before_action :set_tile, only: [:show, :update, :destroy]

  # GET /tiles
  def index
    @tiles = current_user.tiles

    render json: @tiles
  end

  # GET /tiles/1
  def show
    render json: @tile
  end

  # POST /tiles
  def create
    @tile = Tile.new(tile_params)
    current_user.tiles << @tile unless !@tile.valid?
    if @tile.save
      render json: @tile, status: :created, location: @tile
    else
      render json: @tile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tiles/1
  def update
    if @tile.update(tile_params)
      render json: @tile
    else
      render json: @tile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tiles/1
  def destroy
    @tile.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tile
      @tile = current_user.tiles.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tile_params
      params.require(:tile).permit(:world_id, :zoom_level)
    end
end
