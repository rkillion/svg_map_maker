require "test_helper"

class UniversesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @universe = universes(:one)
  end

  test "should get index" do
    get universes_url, as: :json
    assert_response :success
  end

  test "should create universe" do
    assert_difference('Universe.count') do
      post universes_url, params: { universe: { title: @universe.title, user_id: @universe.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show universe" do
    get universe_url(@universe), as: :json
    assert_response :success
  end

  test "should update universe" do
    patch universe_url(@universe), params: { universe: { title: @universe.title, user_id: @universe.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy universe" do
    assert_difference('Universe.count', -1) do
      delete universe_url(@universe), as: :json
    end

    assert_response 204
  end
end
