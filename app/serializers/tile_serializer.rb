class TileSerializer < ActiveModel::Serializer
  attributes :id, :zoom_level
  has_many :shapes
end
