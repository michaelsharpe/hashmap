class CollectionTag < ActiveRecord::Base
  acts_as_taggable
  belongs_to :collection
end
