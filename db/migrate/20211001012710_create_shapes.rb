class CreateShapes < ActiveRecord::Migration[6.1]
  def change
    create_table :shapes do |t|
      t.belongs_to :tile, null: false, foreign_key: true
      t.belongs_to :shape_class, null: false, foreign_key: true
      t.belongs_to :shape_type, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :path_zero
      t.string :path_one
      t.string :path_two
      t.string :path_three

      t.timestamps
    end
  end
end
