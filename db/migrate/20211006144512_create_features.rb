class CreateFeatures < ActiveRecord::Migration[6.1]
  def change
    create_table :features do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :shape_class, null: false, foreign_key: true
      t.belongs_to :shape_type, null: false, foreign_key: true
      t.belongs_to :world, null: false, foreign_key: true
      t.string :title
      t.string :color

      t.timestamps
    end
  end
end
