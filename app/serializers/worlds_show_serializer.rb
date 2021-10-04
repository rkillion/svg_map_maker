class WorldsShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :max_zoom_level, :settings
  has_one :universe
  has_many :views
end
