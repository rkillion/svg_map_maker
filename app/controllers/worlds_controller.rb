class WorldsController < ApplicationController
  before_action :confirm_authentication
  before_action :set_world, only: [:show, :update, :destroy]

  # GET /worlds
  def index
    @worlds = current_user.worlds

    render json: @worlds
  end

  # GET /worlds/1
  def show
    render json: @world, serializer: WorldsShowSerializer
  end

  # POST /worlds
  def create
    world = World.new(world_params)
    current_user.worlds << world
    if world.save
      world.seed
      render json: world, status: :created
    else
      render json: world.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /worlds/1
  def update
    if @world.update(world_params)
      render json: @world
    else
      render json: @world.errors, status: :unprocessable_entity
    end
  end

  # DELETE /worlds/1
  def destroy
    @world.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_world
      @world = current_user.worlds.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def world_params
      params.require(:world).permit(:universe_id, :title, :max_zoom_level)
    end
end
