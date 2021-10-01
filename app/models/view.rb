class View < ApplicationRecord
  belongs_to :user
  belongs_to :tile
  validates :title, presence: true, uniqueness: true
end
