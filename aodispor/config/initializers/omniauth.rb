Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.secrets.GITHUB_KEY, Rails.application.secrets.GITHUB_SECRET, scope: 'email,profile'
  provider :facebook, Rails.application.secrets.FACEBOOK_KEY, Rails.application.secrets.FACEBOOK_SECRET, image_size: { :width => 200, :height => 200 }
end