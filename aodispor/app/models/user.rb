class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User


  before_update :set_updated_to_true
  before_save :professional_user_if_updated
  validates_presence_of :job, :job_description, :price, if: :updated?
  validates :price, numericality: { greater_than_or_equal_to: 0 }, if: :updated?


  # Allow us to do User.professionals to return all the professional users
  scope :professionals, -> {
    where(user_type: 'ProfessionalUser')
  }


  private

  def professional_user_if_updated
    if updated?
      # The user can now be considered a professional because he/she filled all the details
      unless user_type == :ProfessionalUser then
        self.user_type = :ProfessionalUser
      end
    end
  end

  def updated?
    self.updated
  end

  def set_updated_to_true
    self.updated = true
  end
end
