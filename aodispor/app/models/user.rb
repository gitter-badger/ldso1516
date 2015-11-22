class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  
  attr_accessor :updating
  validates_presence_of :job, :job_description, :price, if: :updating?
  validates :price, numericality: { greater_than_or_equal_to: 0 }, if: :updating?
  before_save :professional_user_if_updating


  # Allow us to do User.professionals to return all the professional users
  scope :professionals, -> {
    where(user_type: 'ProfessionalUser')
  }


  private

  def updating?
    !self.updating.nil?
  end

  def professional_user_if_updating
    unless self.updating.nil?
      unless user_type == :ProfessionalUser then
        self.user_type = :ProfessionalUser
      end
    end
  end
end
