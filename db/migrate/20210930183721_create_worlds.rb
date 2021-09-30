class CreateWorlds < ActiveRecord::Migration[6.1]
  def change
    create_table :worlds do |t|
      t.belongs_to :universe, null: false, foreign_key: true
      t.string :title
      t.integer :max_zoom_level

      t.timestamps
    end
  end
end
