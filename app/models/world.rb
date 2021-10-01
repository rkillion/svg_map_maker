class World < ApplicationRecord
  belongs_to :universe
  validates :title, presence: true, uniqueness: {scope: :universe, message: "already exists in this universe"}
  validates :max_zoom_level, presence: true, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 21}
  has_many :tiles, dependent: :destroy

  def settings
    #viewport = the size of the viewport
    #unit = a unit of distance in the viewport
    #square = a square of units whose colors can be changed (edited) at one time
    #properties are named as such viewport_width_tiles = the width of the viewport as measured in tiles
    #viewport tile width and tile width in squares are the same at all zoom levels. See tile settings to understand how the number of units in the viewport, square size, and scale change per zoom level
    {
      viewport_width_tiles: 2,
      tile_width_squares: 64,
      #zero_level_square_width_feet is the scale of the map at zoom 0 
      zero_level_square_width_feet: 0.625,
      max_zoom_level: max_zoom_level
    }
  end

end
