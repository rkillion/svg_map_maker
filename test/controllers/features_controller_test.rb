require "test_helper"

class FeaturesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @feature = features(:one)
  end

  test "should get index" do
    get features_url, as: :json
    assert_response :success
  end

  test "should create feature" do
    assert_difference('Feature.count') do
      post features_url, params: { feature: { color: @feature.color, shape_class_id: @feature.shape_class_id, shape_type_id: @feature.shape_type_id, title: @feature.title, user_id: @feature.user_id, world_id: @feature.world_id } }, as: :json
    end

    assert_response 201
  end

  test "should show feature" do
    get feature_url(@feature), as: :json
    assert_response :success
  end

  test "should update feature" do
    patch feature_url(@feature), params: { feature: { color: @feature.color, shape_class_id: @feature.shape_class_id, shape_type_id: @feature.shape_type_id, title: @feature.title, user_id: @feature.user_id, world_id: @feature.world_id } }, as: :json
    assert_response 200
  end

  test "should destroy feature" do
    assert_difference('Feature.count', -1) do
      delete feature_url(@feature), as: :json
    end

    assert_response 204
  end
end
