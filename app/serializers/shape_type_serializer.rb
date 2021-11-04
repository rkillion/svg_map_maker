class ShapeTypeSerializer < ActiveModel::Serializer
  attributes :id, :title, :color
  has_one :shape_class
end
