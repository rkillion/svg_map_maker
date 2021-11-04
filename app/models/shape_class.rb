class ShapeClass < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, uniqueness: {scope: :user, message: "title already used"}
  has_many :shape_types
  has_many :features, dependent: :destroy
end
