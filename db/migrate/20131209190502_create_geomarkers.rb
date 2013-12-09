class CreateGeomarkers < ActiveRecord::Migration
  def change
    create_table :geomarkers do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
