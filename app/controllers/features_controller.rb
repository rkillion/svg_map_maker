class FeaturesController < ApplicationController
  before_action :confirm_authentication
  before_action :set_feature, only: [:show, :update, :destroy]

  # GET /features
  def index
    @features = current_user.features.all

    render json: @features
  end

  # GET /features/1
  def show
    render json: @feature
  end

  # POST /features
  def create
    feature = Feature.new(feature_params)
    current_user.features << feature
    if feature.save
      render json: feature, status: :created
    else
      render json: feature.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /features/1
  def update
    if @feature.update(feature_params)
      render json: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # DELETE /features/1
  def destroy
    @feature.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feature
      @feature = current_user.features.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feature_params
      params.require(:feature).permit(:shape_class_id, :shape_type_id, :world_id, :title, :color)
    end
end
