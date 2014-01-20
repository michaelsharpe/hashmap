class User < ActiveRecord::Base
  has_many :friendships
  has_many :friends, through: :friendships
  has_many :collections
  has_many :collectionTags, through: :collections
  has_many :comments
  has_many :geomarkers, :through => :comments
  acts_as_tagger

  authenticates_with_sorcery!

  validates :password, length: {minimum: 3}
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  validates_uniqueness_of :username
  validates_presence_of :username
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_presence_of :password
end
