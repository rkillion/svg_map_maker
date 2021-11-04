class ViewsController < ApplicationController
  before_action :confirm_authentication
  before_action :set_view, only: [:show, :update, :destroy]

  # GET /views
  def index
    @views = current_user.views

    render json: @views
  end

  # GET /views/1
  def show
    render json: @view
  end

  # POST /views
  def create
    @view = View.new(view_params)
    current_user.views << @view unless !@view.valid?
    if @view.save
      render json: @view, status: :created, location: @view
    else
      render json: @view.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /views/1
  def update
    if @view.update(view_params)
      render json: @view
    else
      render json: @view.errors, status: :unprocessable_entity
    end
  end

  # DELETE /views/1
  def destroy
    @view.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_view
      @view = current_user.views.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def view_params
      params.require(:view).permit(:tile_id, :focus_x, :focus_y, :title)
    end
end
