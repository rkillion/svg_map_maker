# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_30_194319) do

  create_table "shape_classes", force: :cascade do |t|
    t.string "title"
    t.integer "user_id", null: false
    t.string "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_shape_classes_on_user_id"
  end

  create_table "shape_types", force: :cascade do |t|
    t.string "title"
    t.integer "user_id", null: false
    t.string "color"
    t.integer "shape_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shape_class_id"], name: "index_shape_types_on_shape_class_id"
    t.index ["user_id"], name: "index_shape_types_on_user_id"
  end

  create_table "tiles", force: :cascade do |t|
    t.integer "world_id", null: false
    t.integer "zoom_level"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tiles_on_user_id"
    t.index ["world_id"], name: "index_tiles_on_world_id"
  end

  create_table "universes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_universes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  create_table "worlds", force: :cascade do |t|
    t.integer "universe_id", null: false
    t.string "title"
    t.integer "max_zoom_level"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id", null: false
    t.index ["universe_id"], name: "index_worlds_on_universe_id"
    t.index ["user_id"], name: "index_worlds_on_user_id"
  end

  add_foreign_key "shape_classes", "users"
  add_foreign_key "shape_types", "shape_classes"
  add_foreign_key "shape_types", "users"
  add_foreign_key "tiles", "users"
  add_foreign_key "tiles", "worlds"
  add_foreign_key "universes", "users"
  add_foreign_key "worlds", "universes"
  add_foreign_key "worlds", "users"
end
