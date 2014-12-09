class VideosController < ApplicationController

	def index
	  @client = YouTubeIt::Client.new	  
    	  
	  respond_to do |format|
	  	format.html
	  	format.json
	  	format.xml
	  end
    end
end
