class World < ApplicationRecord
  belongs_to :universe
  validates :title, presence: true, uniqueness: {scope: :universe, message: "already exists in this universe"}
  validates :max_zoom_level, presence: true, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 21}
  has_many :tiles, dependent: :destroy
end
