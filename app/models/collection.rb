class Collection < ActiveRecord::Base
  acts_as_list
  belongs_to :user
  has_many :collectionTags

end
