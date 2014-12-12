class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :yt_client

  def yt_session
    @yt_client ||= YouTubeIt::Client.new
  end
  
end
