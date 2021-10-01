class ViewSerializer < ActiveModel::Serializer
  attributes :id, :focus_x, :focus_y, :title
  has_one :tile
end
