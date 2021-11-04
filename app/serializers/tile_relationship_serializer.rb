class TileRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :tile_id, :relative_id, :relationship, :reference
end
