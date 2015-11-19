FactoryGirl.define do
  factory :user do
    email 'somemail@example.com'
    password 'somepassword'
    password_confirmation 'somepassword'
  end


  factory :invalid_user, class: User do
    email 'email@example.com'
    password 'somepassword'
    password_confirmation 'somepassword'
  end
end