class TileRelationship < ApplicationRecord
    belongs_to :tile
    belongs_to :relative, class_name: "Tile"
    validates :relationship, presence: true
end
