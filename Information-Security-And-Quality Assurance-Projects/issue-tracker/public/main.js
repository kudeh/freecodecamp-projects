$(function() {

    var url = "/api/issues/issues";

    $('#newIssue').submit(function(e){
      e.preventDefault();
      $(this).attr('action', "/api/issues/issues");
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) { 
          //window.location.reload(true); 
          $("#issue-list").append(data);
        }
      });
    });


  });