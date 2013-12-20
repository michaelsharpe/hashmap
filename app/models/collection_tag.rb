class CollectionTag < ActiveRecord::Base
  acts_as_taggable
  belongs_to :collection
  before_save :set_position

  private

  def set_position
    self.position ||= 1 + (eval("#{self.class.to_s}.maximum(:position)").to_i || 0)
  end
  
end
