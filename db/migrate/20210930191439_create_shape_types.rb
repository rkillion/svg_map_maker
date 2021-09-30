class CreateShapeTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :shape_types do |t|
      t.string :title
      t.belongs_to :user, null: false, foreign_key: true
      t.string :color
      t.belongs_to :shape_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
