class UniverseSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :worlds
end
