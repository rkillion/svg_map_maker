class ShapeType < ApplicationRecord
  belongs_to :user
  belongs_to :shape_class
  validates :title, presence: true, uniqueness: {scope: :shape_class, message: "title already used for this shape class"}
  has_many :features, dependent: :destroy
end
