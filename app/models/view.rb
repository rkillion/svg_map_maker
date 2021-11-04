class View < ApplicationRecord
  belongs_to :user
  belongs_to :tile
  belongs_to :world
  validates :title, presence: true, uniqueness: {scope: :world}
end
