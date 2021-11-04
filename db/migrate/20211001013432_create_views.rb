class CreateViews < ActiveRecord::Migration[6.1]
  def change
    create_table :views do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :tile, null: false, foreign_key: true
      t.float :focus_x
      t.float :focus_y
      t.string :title

      t.timestamps
    end
  end
end
