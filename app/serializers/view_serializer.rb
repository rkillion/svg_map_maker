class ViewSerializer < ActiveModel::Serializer
  attributes :id, :focus_x, :focus_y, :title, :tile_id
end
