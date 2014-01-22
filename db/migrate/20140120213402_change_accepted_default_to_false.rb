class ChangeAcceptedDefaultToFalse < ActiveRecord::Migration
  def change
    change_column :friendships, :accepted, :boolean, :default => false
  end
end
