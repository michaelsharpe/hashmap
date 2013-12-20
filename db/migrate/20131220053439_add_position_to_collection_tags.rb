class AddPositionToCollectionTags < ActiveRecord::Migration
  def change
    add_column :collection_tags, :position, :integer
  end
end
