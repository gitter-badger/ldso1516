class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :job, :string
    add_column :users, :job_description, :text
    add_column :users, :price, :decimal
  end
end
