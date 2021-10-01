require "test_helper"

class ShapesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @shape = shapes(:one)
  end

  test "should get index" do
    get shapes_url, as: :json
    assert_response :success
  end

  test "should create shape" do
    assert_difference('Shape.count') do
      post shapes_url, params: { shape: { path_one: @shape.path_one, path_three: @shape.path_three, path_two: @shape.path_two, path_zero: @shape.path_zero, shape_class_id: @shape.shape_class_id, shape_type_id: @shape.shape_type_id, tile_id: @shape.tile_id, user_id: @shape.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show shape" do
    get shape_url(@shape), as: :json
    assert_response :success
  end

  test "should update shape" do
    patch shape_url(@shape), params: { shape: { path_one: @shape.path_one, path_three: @shape.path_three, path_two: @shape.path_two, path_zero: @shape.path_zero, shape_class_id: @shape.shape_class_id, shape_type_id: @shape.shape_type_id, tile_id: @shape.tile_id, user_id: @shape.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy shape" do
    assert_difference('Shape.count', -1) do
      delete shape_url(@shape), as: :json
    end

    assert_response 204
  end
end
