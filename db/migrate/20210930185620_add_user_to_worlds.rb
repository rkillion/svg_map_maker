class AddUserToWorlds < ActiveRecord::Migration[6.1]
  def change
    add_reference :worlds, :user, null: false, foreign_key: true
  end
end
