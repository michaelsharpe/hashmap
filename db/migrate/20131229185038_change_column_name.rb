class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :comments, :marker_id, :geomarker_id
  end
end
