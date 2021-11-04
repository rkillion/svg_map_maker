require "test_helper"

class ShapeClassesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @shape_class = shape_classes(:one)
  end

  test "should get index" do
    get shape_classes_url, as: :json
    assert_response :success
  end

  test "should create shape_class" do
    assert_difference('ShapeClass.count') do
      post shape_classes_url, params: { shape_class: { color: @shape_class.color, title: @shape_class.title, user_id: @shape_class.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show shape_class" do
    get shape_class_url(@shape_class), as: :json
    assert_response :success
  end

  test "should update shape_class" do
    patch shape_class_url(@shape_class), params: { shape_class: { color: @shape_class.color, title: @shape_class.title, user_id: @shape_class.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy shape_class" do
    assert_difference('ShapeClass.count', -1) do
      delete shape_class_url(@shape_class), as: :json
    end

    assert_response 204
  end
end
