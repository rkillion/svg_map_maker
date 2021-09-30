class TileSerializer < ActiveModel::Serializer
  attributes :id, :zoom_level
  has_one :world
  has_one :user
end
