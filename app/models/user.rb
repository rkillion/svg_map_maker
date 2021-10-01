class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :universes, dependent: :destroy
    has_many :worlds
    has_many :tiles
    has_many :shapes
    has_many :views
end
