class ShapeSerializer < ActiveModel::Serializer
  attributes :id, :path_zero, :path_one, :path_two, :path_three, :tile_id
  has_one :tile
  has_one :shape_class
  has_one :shape_type
end
