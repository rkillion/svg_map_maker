# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Generating seeds..."

# make sure to create a user first!

# universe = Universe.create(user_id: User.first.id,title:"BobVerse")
# world = World.create(user_id: User.first.id,universe_id: universe.id,title:"Earth-like",max_zoom_level: 21)

geo = ShapeClass.create(title:"Geographical",user_id: User.first.id)
# geo_named = ShapeClass.create(title:"GeoNamed",user_id: User.first.id)
political = ShapeClass.create(title:"Political",user_id: User.first.id)
# pol_named = ShapeClass.create(title:"PolNamed",user_id: User.first.id)

sea = ShapeType.create(title:"Sea",user_id: User.first.id,color: "lightblue",shape_class_id: geo.id)
land = ShapeType.create(title:"Land",user_id: User.first.id,color: "green",shape_class_id: geo.id)
ShapeType.create(title:"Mountain",user_id: 1,color: "purple",shape_class_id:1)

# top_tile_zero = Tile.create(zoom_level: 21,world_id: 1,user_id: User.first.id)
# top_tile_one = Tile.create(zoom_level: 21,world_id: 1,user_id: User.first.id)

# Tile.first.make_sub_tiles

# tile_one_sea = Shape.create(tile_id: 1,shape_type_id:1,shape_class_id:1,user_id:1)
# tile_one_sea.set_paths
# tile_two_sea = Shape.create(tile_id: 2,shape_type_id:1,shape_class_id:1,user_id:1)
# tile_two_sea.set_paths
# tile_one_land = Shape.create(tile_id: 1,shape_type_id:2,shape_class_id:1,user_id:1)
# tile_one_land.set_paths("checker")
# tile_two_land = Shape.create(tile_id: 2,shape_type_id:2,shape_class_id:1,user_id:1)
# tile_one_land.set_paths("center")

puts "...done seeding!"
