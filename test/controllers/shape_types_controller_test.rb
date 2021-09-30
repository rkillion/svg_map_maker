require "test_helper"

class ShapeTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @shape_type = shape_types(:one)
  end

  test "should get index" do
    get shape_types_url, as: :json
    assert_response :success
  end

  test "should create shape_type" do
    assert_difference('ShapeType.count') do
      post shape_types_url, params: { shape_type: { color: @shape_type.color, shape_class_id: @shape_type.shape_class_id, title: @shape_type.title, user_id: @shape_type.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show shape_type" do
    get shape_type_url(@shape_type), as: :json
    assert_response :success
  end

  test "should update shape_type" do
    patch shape_type_url(@shape_type), params: { shape_type: { color: @shape_type.color, shape_class_id: @shape_type.shape_class_id, title: @shape_type.title, user_id: @shape_type.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy shape_type" do
    assert_difference('ShapeType.count', -1) do
      delete shape_type_url(@shape_type), as: :json
    end

    assert_response 204
  end
end
