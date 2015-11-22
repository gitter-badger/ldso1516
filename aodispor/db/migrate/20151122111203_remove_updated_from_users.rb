class RemoveUpdatedFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :updated, :boolean
  end
end
