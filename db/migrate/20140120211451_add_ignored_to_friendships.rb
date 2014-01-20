class AddIgnoredToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :ignored, :boolean, :default => false
  end
end
