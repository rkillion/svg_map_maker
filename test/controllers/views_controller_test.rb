require "test_helper"

class ViewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @view = views(:one)
  end

  test "should get index" do
    get views_url, as: :json
    assert_response :success
  end

  test "should create view" do
    assert_difference('View.count') do
      post views_url, params: { view: { focus_x: @view.focus_x, focus_y: @view.focus_y, tile_id: @view.tile_id, title: @view.title, user_id: @view.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show view" do
    get view_url(@view), as: :json
    assert_response :success
  end

  test "should update view" do
    patch view_url(@view), params: { view: { focus_x: @view.focus_x, focus_y: @view.focus_y, tile_id: @view.tile_id, title: @view.title, user_id: @view.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy view" do
    assert_difference('View.count', -1) do
      delete view_url(@view), as: :json
    end

    assert_response 204
  end
end
