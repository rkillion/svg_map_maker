class Feature < ApplicationRecord
  belongs_to :user
  belongs_to :shape_class
  belongs_to :shape_type
  belongs_to :world
  validates :title, presence: true, uniqueness: {scope: :world, message: "already exists in this world"}
  has_many :shapes
end
