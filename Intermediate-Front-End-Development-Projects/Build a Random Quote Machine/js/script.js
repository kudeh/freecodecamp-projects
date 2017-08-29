$(document).ready(function(){

  $("#new-quote").click(function(){
   
   //Retrieve random quote from API.
   $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", 
    type: 'GET',
    dataType: 'json',
    cache: false,
    success : function(data){
      console.log(data[0]);
      
      var author = data[0].title;
      var quote = data[0].content;
      
      $(".author").empty();
      $(".quote").empty();
      
      $(".author").append("<p>- "+author+"</p>");
      $(".quote").append(quote);
      
      //strip out html tags from the string quote.
      var div = document.createElement("div");
      div.innerHTML = quote;      
      quote = div.textContent || div.innerText || "";
      
      console.log(quote + " " + author);
      
      updateTwitterValues(quote, author);

      
    },
    error: function(request,error)
    {
      console.log("error");
    }
  });

 });
  
});

//update twitter share link.
function updateTwitterValues(quote, author) {
// clear out the <a> tag that's currently there...probably don't really need this since you're replacing whatever is in there already.
  $("#share").html('&nbsp;'); 
  $("#share").html('<a href="https://twitter.com/intent/tweet?text='+encodeURIComponent(quote)+'20%2D%20'+encodeURIComponent(author)+'" class="twitter-share-button" data-size="large">Tweet</a>');
twttr.widgets.load();
}