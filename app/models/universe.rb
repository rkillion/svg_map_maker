class Universe < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, uniqueness: {scope: :user, message: "title already exists"}
  has_many :worlds, dependent: :destroy
end
