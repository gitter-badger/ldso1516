require 'rails_helper'
require 'spec_helper'


feature 'UsersAuthentication', js: true do
  feature 'login' do
    scenario 'when user provide valid input' do
      @user = FactoryGirl.create(:user)
      visit 'http://localhost:9000/#/sign_in'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Entrar").click

      page.has_content?("Welcome,")
    end


    scenario 'when user provide invalid input' do
      @user = FactoryGirl.create(:invalid_user)
      visit 'http://localhost:9000/#/sign_in'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Entrar").click

      page.has_content?("Invalid login credentials.")
    end
  end


  feature 'register' do
    scenario 'when email already exists' do
      @user = FactoryGirl.create(:user)
      visit 'http://localhost:9000/#/sign_up'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      fill_in "Password Confirmation", with: @user.password_confirmation
      find("button", text: "Registar").click

      page.has_content?("Email address is already in use")
    end


    scenario 'when password is too short' do
      @user = FactoryGirl.create(:invalid_user)
      visit 'http://localhost:9000/#/sign_up'
      fill_in "Email", with: @user.email
      fill_in "Password", with: '1234'
      fill_in "Password Confirmation", with: '1234'
      find("button", text: "Registar").click

      page.has_content?("Password is too short")
    end
  end
end