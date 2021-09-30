class Tile < ApplicationRecord
  belongs_to :world
  belongs_to :user
  validates :zoom_level, presence: true, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 21}
end
