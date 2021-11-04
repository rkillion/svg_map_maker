class CreateTileRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :tile_relationships do |t|
      t.integer :tile_id, null: false
      t.integer :relative_id, null: false
      t.string :relationship
      t.integer :reference

      t.timestamps
    end
  end
end
