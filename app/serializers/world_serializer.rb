class WorldSerializer < ActiveModel::Serializer
  attributes :id, :title, :max_zoom_level
  has_one :universe
end
