class AddUpdatedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :updated, :boolean
  end
end
