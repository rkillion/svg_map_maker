class CreateShapeClasses < ActiveRecord::Migration[6.1]
  def change
    create_table :shape_classes do |t|
      t.string :title
      t.belongs_to :user, null: false, foreign_key: true
      t.string :color

      t.timestamps
    end
  end
end
