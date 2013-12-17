class CreateCollectionTags < ActiveRecord::Migration
  def change
    create_table :collection_tags do |t|
      t.string :name
      t.string :collection_id
      t.string :user_id
      t.boolean :visibility

      t.timestamps
    end
  end
end
