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

  def friend_requests()
    request_list = []
    Friendship.where("friend_id = ? and accepted = ?", self.id, false).each do |request|
      request_list << [request.id, User.find(request.user_id)]
    end
    request_list
  end

  def all_friends()
    friend_list = []
    Friendship.where("user_id = ? and accepted = ?", self.id, true).each do |friend|
      friend_list << User.find(friend.friend_id)
    end
    Friendship.where("friend_id = ? and accepted = ?", self.id, true).each do |friend|
      friend_list << User.find(friend.user_id)
    end
    friend_list
  end
end
