class AddUseridToGeomarker < ActiveRecord::Migration
  def change
    add_column :geomarkers, :user_id, :integer
  end
end
