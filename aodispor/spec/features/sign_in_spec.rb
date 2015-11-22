require 'rails_helper'
require 'spec_helper'


feature 'Sign In' do
  it 'should have container class with h1 inside', :js => true do
    visit('/#/sign_in')
    expect(page).to have_css('.container h1')
    expect(find('.container h1')).to be_visible
  end


  it 'should have "LOGIN" on header', :js => true do
    visit('/#/sign_in')
    expect(find('.container h1')).to have_content('LOGIN')
  end


  it 'should have fieldset inside login-form', :js => true do
    visit('/#/sign_in')
    expect(page).to have_css('.login-form fieldset')
  end


  it 'should have two buttons inside fieldset', :js => true do
    visit('/#/sign_in')
    expect(page).to have_css('fieldset button', count: 2)
  end


  it 'should have a button with Facebook text', :js => true do
    visit('/#/sign_in')
    expect(page).to have_css('.btn-facebook', text: 'Sign In with Facebook')
  end


  it 'should have a fontawesome icon inside each button', :js => true do
    visit('/#/sign_in')
    page.all(:css, 'button').each do |el|
      expect(el.find('i')['class']).to have_content('fa')
    end
  end


  it 'should have a button with Github text', :js => true do
    visit('/#/sign_in')
    expect(page).to have_css('.btn-github', text: 'Sign In with Github')
  end


  it 'should login with github', :js => true do
    visit('/#/sign_in')
    click_button 'Sign In with Github'
    expect(page).to have_content 'LOGIN'
  end
end