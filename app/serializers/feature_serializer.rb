class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :title, :color, :shape_class_id, :shape_type_id
end
