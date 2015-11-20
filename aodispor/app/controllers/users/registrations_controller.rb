class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
  include DeviseTokenAuth::Concerns::SetUserByToken


  def account_update_params
    params.require(:user).permit(:job, :job_description, :price)
  end
end