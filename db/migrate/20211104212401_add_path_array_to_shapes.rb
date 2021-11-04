class AddPathArrayToShapes < ActiveRecord::Migration[6.1]
  def change
    add_column :shapes, :path_array, :text
  end
end
