class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User


  # Run validations only when user updates his/her profile
  validates_presence_of :job, :job_description, :price
  validates :price, numericality: { greater_than_or_equal_to: 0 }, on: :update
  #before_update :check_updated_attributes


  # Allow us to do User.professionals to return all the professional users
  scope :professionals, -> {
    where(user_type: 'ProfessionalUser')
  }


  private

  def check_updated_attributes
    # The user can now be considered a professional because he/she filled all the details
    unless user_type == :ProfessionalUser then
      self.user_type = :ProfessionalUser
    end
  end
end
