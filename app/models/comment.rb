class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :geomarker
  validates :content, presence: true
end
