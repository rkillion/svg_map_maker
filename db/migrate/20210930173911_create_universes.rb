class CreateUniverses < ActiveRecord::Migration[6.1]
  def change
    create_table :universes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
