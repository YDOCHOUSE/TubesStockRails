$(document).ready(function() {


  var search_function = function() {
    var search_input = $(this).val();
    if (search_input.length < 4) return;

    var keyword= encodeURIComponent(search_input);
    // Youtube API 
    var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=10&v=2&duration=long&category=music%2Clive%2DMusic%2CLive&alt=jsonc'; 
    // Wiki API
    var wiki_url='http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+keyword+'&rvsection=0';
    //var wiki_url='http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles='+keyword;

    $.ajax ({
      type: "GET",   //you can also use Method: instead of type
      url: yt_url,
      dataType:"jsonp",
      success: function(response) {
        $("#results").html('');

        if(response.data.items) {
          $.each(response.data.items.slice(0,10), function(i, item) {
            // var all_videos=response.item.items; 
            var video_id = item.id;
            var video_title = item.title;
            var video_viewCount = item.viewCount;

            // IFRAME Embed for YouTube
            var video_frame="<iframe width='640' height='385' src='http://www.youtube.com/embed/"+video_id+"' frameborder='2' type='text/html'></iframe>";
            var search_vids="\
              <div class='result'> \
                <div id='title'>" + video_title + "</div> \
                <div>" + video_frame + "</div> \
                <div id='count'>" + video_viewCount + " Views</div> \
              </div>";

            console.log("appending "+video_title);
            $("#results").append(search_vids);
          });
        } else {
          $("#results").html("<div class='no'>No Videos</div>");
        }
      }
    });
  }
  /*
  $.ajax({
    type: "GET",
    url: wiki_url,
    dataType:"jsonp",
    success: function(data) {

      if (data && data.query && data.query.pages) {
        var pages = data.query.pages;
      }

      for (var id in pages) {
        if (pages[id].revisions && pages[id].revisions[0] && pages[id].revisions[0]["*"]) {
          var content = "<div id='wiki-info'>"+pages[id].revisions[0]["*"]+"</div>";
          $("#wiki").html(content);
        }
      }
    }

  }); 
  */

  var throttled_search_function = $.throttle(300, search_function);
  $(".search_input").keyup(throttled_search_function);

}); // and here

