class TileRelationshipsController < ApplicationController
  before_action :set_tile_relationship, only: [:show, :update, :destroy]

  # GET /tile_relationships
  def index
    @tile_relationships = TileRelationship.all

    render json: @tile_relationships
  end

  # GET /tile_relationships/1
  def show
    render json: @tile_relationship
  end

  # POST /tile_relationships
  def create
    @tile_relationship = TileRelationship.new(tile_relationship_params)

    if @tile_relationship.save
      render json: @tile_relationship, status: :created, location: @tile_relationship
    else
      render json: @tile_relationship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tile_relationships/1
  def update
    if @tile_relationship.update(tile_relationship_params)
      render json: @tile_relationship
    else
      render json: @tile_relationship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tile_relationships/1
  def destroy
    @tile_relationship.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tile_relationship
      @tile_relationship = TileRelationship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tile_relationship_params
      params.require(:tile_relationship).permit(:tile_id, :relative_id, :relationship, :reference)
    end
end
