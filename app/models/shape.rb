class Shape < ApplicationRecord
  belongs_to :tile
  belongs_to :shape_class
  belongs_to :shape_type
  belongs_to :user
  belongs_to :feature

  #you can create a formula that will generate a full path at a specified point by providing a quadrant path i.e. 0112

  def set_paths(type="full",override=false)
    if override || ((!path_zero && !path_one) && (!path_two && !path_three))
      paths = []
      case type
      when "full"
        paths = [
          generate_path(0,true),
          generate_path(1,true),
          generate_path(2,true),
          generate_path(3,true)
        ]
      when "checker"
        paths = [
          generate_path(0,true),
          generate_path(1,false),
          generate_path(2,false),
          generate_path(3,true)
        ]
      when "center"
        paths = [
          generate_path(0,false,join_paths([
            generate_path(0,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(1,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(2,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(3,true,"",self.tile.settings[:zoom_level]-1)],self.tile.settings[:zoom_level]-1)),
          generate_path(1,false,join_paths([
            generate_path(0,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(1,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(2,true,"",self.tile.settings[:zoom_level]-1),
            generate_path(3,false,"",self.tile.settings[:zoom_level]-1)],self.tile.settings[:zoom_level]-1)),
          generate_path(2,false,join_paths([
            generate_path(0,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(1,true,"",self.tile.settings[:zoom_level]-1),
            generate_path(2,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(3,false,"",self.tile.settings[:zoom_level]-1)],self.tile.settings[:zoom_level]-1)),
          generate_path(3,false,join_paths([
            generate_path(0,true,"",self.tile.settings[:zoom_level]-1),
            generate_path(1,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(2,false,"",self.tile.settings[:zoom_level]-1),
            generate_path(3,false,"",self.tile.settings[:zoom_level]-1)],self.tile.settings[:zoom_level]-1))
          ]
      end
      self.update(
        path_zero: paths[0],
        path_one: paths[1],
        path_two: paths[2],
        path_three: paths[3]
      )
      self.update(path_array: paths.to_json)
    end
  end

  def generate_path(quadrant,fill_square=false,relative_path="",zoom_level=self.tile.settings[:zoom_level])
    distance = get_fill_distance(zoom_level-1)
    path_m = [
      "m 0 0",
      "m #{distance} 0",
      "m #{-distance} #{distance}",
      "m #{distance} 0"
    ]
    path_r=""
    if fill_square
      path_r=" #{fill_square(zoom_level-1)}"
    elsif relative_path!=""
      path_r = " #{relative_path}"
    end
    "#{path_m[quadrant]}#{path_r}"
  end

  def make_subpath(quadrant)
    if !self.path_array
      return nil
    end
    quadrant_path = JSON.parse(self.path_array)[quadrant]
    if quadrant_path.class == String
      return split_path(quadrant_path).to_json
    end
    doubled_string = quadrant_path.to_json.gsub(/\b(\d+)/){|n|n.to_i*2}
    doubled_string
  end

  def test_split
    split_path(JSON.parse(self.path_array)[0])
  end

  private

  def split_path(path)
    fill = path.include?("h")
    puts path
    # numbers_not_zero = path.scan(/\b(\d+)/).select{|n|n[0].to_i>0}[0][0].to_i
    return [
        genUnitPath(0,fill,2048),
        genUnitPath(1,fill,2048),
        genUnitPath(2,fill,2048),
        genUnitPath(3,fill,2048)
    ]
  end

  def genUnitPath(quadrant,fill=false,width)
    distance = width/2
    pathM = [
      "m 0 0",
      "m #{distance} 0",
      "m #{-distance} #{distance}",
      "m #{distance} 0"
    ]
    pathR=""
    if fill
      pathR=" h #{distance} v #{distance} h #{-distance} v #{-distance}"
    end
    "#{pathM[quadrant]}#{pathR}"
  end

  def get_fill_distance(zoom_level)
    settings = self.tile.settings
    settings[:tile_width_units]/(2**(settings[:zoom_level]-zoom_level))
  end

  def fill_square(zoom_level)
    settings = self.tile.settings
    if settings[:zoom_level]>=zoom_level&&settings[:zoom_level]-5<=zoom_level
      distance = get_fill_distance(zoom_level)
      "h #{distance} v #{distance} h #{-distance} v #{-distance}"
    end
  end

  def join_paths(paths,zoom_level)
    distance = get_fill_distance(zoom_level-1)
    "#{paths[0]} #{paths[1]} #{paths[2]} #{paths[3]} m #{-distance} #{-distance}"
  end

end
