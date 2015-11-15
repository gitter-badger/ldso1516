class Api::UserSerializer < ActiveModel::Serializer
  attributes :email, :created_at, :updated_at
end