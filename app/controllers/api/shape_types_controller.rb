class Api::ShapeTypesController < ApplicationController
  before_action :confirm_authentication
  before_action :set_shape_type, only: [:show, :update, :destroy]

  # GET /shape_types
  def index
    @shape_types = ShapeType.all

    render json: @shape_types
  end

  # GET /shape_types/1
  def show
    render json: @shape_type
  end

  # POST /shape_types
  def create
    @shape_type = ShapeType.new(shape_type_params)
    current_user.shape_types << @shape_type unless !@shape_type.valid?
    if @shape_type.save
      render json: @shape_type, status: :created, location: @shape_type
    else
      render json: @shape_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shape_types/1
  def update
    if @shape_type.update(shape_type_params)
      render json: @shape_type
    else
      render json: @shape_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shape_types/1
  def destroy
    @shape_type.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shape_type
      @shape_type = ShapeType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shape_type_params
      params.require(:shape_type).permit(:title, :user_id, :color, :shape_class_id)
    end
end
