class Geomarker < ActiveRecord::Base
  acts_as_taggable
  acts_as_mappable :lat_column_name => :latitude,
                   :lng_column_name => :longitude
  mount_uploader :image, ImageUploader

  validates :name, presence: true
  validates :tag_list, presence: true

  belongs_to :user
  has_many :comments
  has_many :users, :through => :comments

  def self.all_collection_tags(user)
    collections= user.collections
    results = []
    collections.each do |collection|
      collection.tag_list.each do |tag|
        results << tag
      end
    end
    results.join(', ')
  end

end
