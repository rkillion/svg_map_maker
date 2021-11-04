class ShapeClassSerializer < ActiveModel::Serializer
  attributes :id, :title, :color
  has_many :shape_types
end
