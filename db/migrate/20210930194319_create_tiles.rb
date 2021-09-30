class CreateTiles < ActiveRecord::Migration[6.1]
  def change
    create_table :tiles do |t|
      t.belongs_to :world, null: false, foreign_key: true
      t.integer :zoom_level
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
