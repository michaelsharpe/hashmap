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

  def friend_requests
    request_list = []
    Friendship.where("friend_id = ? and accepted = ? and ignored = ?", self.id, false, false).each do |request|
      request_list << [request.id, User.find(request.user_id)]
    end
    request_list
  end

  def all_friends
    friend_list = []
    Friendship.where("user_id = ? and accepted = ?", self.id, true).each do |friend|
      friend_list << User.find(friend.friend_id)
    end
    Friendship.where("friend_id = ? and accepted = ?", self.id, true).each do |friend|
      friend_list << User.find(friend.user_id)
    end
    friend_list
  end

  def not_connected?(current_user_id)
    connection_list = []
    Friendship.where("user_id = ?", current_user_id).each do |friend|
      connection_list << User.find(friend.friend_id)
    end
    Friendship.where("friend_id = ?", current_user_id).each do |friend|
      connection_list << User.find(friend.user_id)
    end
    !(connection_list.include?(User.find(self.id)))
  end

  def friends?(current_user_id)
    self.all_friends.include?(User.find(current_user_id))
  end

  def request_pending?(current_user_id)
    request_list = []
    Friendship.where("friend_id = ? and accepted = ? and ignored = ?", self.id, false, false).each do |request|
      request_list << User.find(request.user_id)
    end
    request_list.include?(User.find(current_user_id))
  end
end
