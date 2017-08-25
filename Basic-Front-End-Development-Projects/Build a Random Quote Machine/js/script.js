$(document).ready(function(){

  $("#new-quote").click(function(){

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
      
    },
    error: function(request,error)
    {
      console.log("error");
    }
  });

 });
  
});