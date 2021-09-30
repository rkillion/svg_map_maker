class ShapeClassesController < ApplicationController
  before_action :confirm_authentication
  before_action :set_shape_class, only: [:show, :update, :destroy]

  # GET /shape_classes
  def index
    @shape_classes = ShapeClass.all

    render json: @shape_classes
  end

  # GET /shape_classes/1
  def show
    render json: @shape_class
  end

  # POST /shape_classes
  def create
    @shape_class = ShapeClass.new(shape_class_params)
    current_user.shape_classes << @shape_class unless !@shape_class.valid?
    if @shape_class.save
      render json: @shape_class, status: :created, location: @shape_class
    else
      render json: @shape_class.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shape_classes/1
  def update
    if @shape_class.update(shape_class_params)
      render json: @shape_class
    else
      render json: @shape_class.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shape_classes/1
  def destroy
    @shape_class.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shape_class
      @shape_class = ShapeClass.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shape_class_params
      params.require(:shape_class).permit(:title, :user_id, :color)
    end
end
