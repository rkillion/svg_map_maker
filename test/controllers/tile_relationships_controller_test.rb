require "test_helper"

class TileRelationshipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tile_relationship = tile_relationships(:one)
  end

  test "should get index" do
    get tile_relationships_url, as: :json
    assert_response :success
  end

  test "should create tile_relationship" do
    assert_difference('TileRelationship.count') do
      post tile_relationships_url, params: { tile_relationship: { reference: @tile_relationship.reference, relationship: @tile_relationship.relationship, relative_id: @tile_relationship.relative_id, tile_id: @tile_relationship.tile_id } }, as: :json
    end

    assert_response 201
  end

  test "should show tile_relationship" do
    get tile_relationship_url(@tile_relationship), as: :json
    assert_response :success
  end

  test "should update tile_relationship" do
    patch tile_relationship_url(@tile_relationship), params: { tile_relationship: { reference: @tile_relationship.reference, relationship: @tile_relationship.relationship, relative_id: @tile_relationship.relative_id, tile_id: @tile_relationship.tile_id } }, as: :json
    assert_response 200
  end

  test "should destroy tile_relationship" do
    assert_difference('TileRelationship.count', -1) do
      delete tile_relationship_url(@tile_relationship), as: :json
    end

    assert_response 204
  end
end
