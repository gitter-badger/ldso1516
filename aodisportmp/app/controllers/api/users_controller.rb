class Api::UsersController < ActionController::API


  def index
    users = User.all
    render(json: ActiveModel::ArraySerializer.new(users, each_serializer: Api::UserSerializer, root: 'users'))
  end
end