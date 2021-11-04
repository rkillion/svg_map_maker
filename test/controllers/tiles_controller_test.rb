require "test_helper"

class TilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tile = tiles(:one)
  end

  test "should get index" do
    get tiles_url, as: :json
    assert_response :success
  end

  test "should create tile" do
    assert_difference('Tile.count') do
      post tiles_url, params: { tile: { user_id: @tile.user_id, world_id: @tile.world_id, zoom_level: @tile.zoom_level } }, as: :json
    end

    assert_response 201
  end

  test "should show tile" do
    get tile_url(@tile), as: :json
    assert_response :success
  end

  test "should update tile" do
    patch tile_url(@tile), params: { tile: { user_id: @tile.user_id, world_id: @tile.world_id, zoom_level: @tile.zoom_level } }, as: :json
    assert_response 200
  end

  test "should destroy tile" do
    assert_difference('Tile.count', -1) do
      delete tile_url(@tile), as: :json
    end

    assert_response 204
  end
end
