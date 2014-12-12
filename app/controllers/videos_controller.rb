class VideosController < InheritedResources::Base
 respond_to :json
	
	def index
	 @yt_client ||= YouTubeIt::Client.new
    end
end
