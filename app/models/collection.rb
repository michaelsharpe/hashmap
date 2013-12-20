class Collection < ActiveRecord::Base
  belongs_to :user
  has_many :collectionTags
  before_save :set_position

  private

  def set_position
    self.position ||= 1 + (eval("#{self.class.to_s}.maximum(:position)").to_i || 0)
  end

end
