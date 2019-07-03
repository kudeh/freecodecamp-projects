$(function() {

  var url = "/api/issues/issues";

  $.ajax({
      type: "GET",
      url: url,
      success: data => {
        
        data.forEach(item => {

          let id = item._id;
          let title = item.issue_title;
          let created_by = item.created_by;
          let created_on = item.created_on;
          let status = item.open;
          let status_text = item.status_text;
          let text = item.issue_text;
          let updated_on = item.updated_on;
          let assigned_to = item.assigned_to;           
          let header_color = status ? 'green' : 'red';
          
          let close_issue = status ? "<div data-id="+id+" class='btn closeButton'>Close Issue</div>" : "<div></div>"
          
          let card = `<div class='card'>
                         <div class='card-header ${header_color}'>
                            <h2 class='issue-title'>${title}</h2>
                            <p class='issue-creator'>Created By: ${created_by}</p>
                            <p class='issue-status'>${status ? 'Open' : 'Close'}</p>
                         </div>
                         <div class='card-body'>
                            <div class='card-body-content'>
                                <p>Description: ${text}</p>
                                <hr>
                                <p>Created on: ${moment(created_on, "x").format("DD MMM YYYY hh:mm a")}</p>
                                <p>Last Update: ${moment(updated_on, "x").format("DD MMM YYYY hh:mm a")}</p>
                            </div>
                         </div>
                         <div class='card-footer'>
                             ${close_issue}
                             <div data-id=${id} class='btn deleteButton'>Delete Issue</div>
                         </div>
                      </div>`
          
          $("#issue-list").append(card);
        })
         
      }
  })

  $('#newIssue').submit(function(e){
    e.preventDefault();
    $(this).attr('action', "/api/issues/issues");
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function(data) { 
      window.location.reload(true);
      }
    });
  });

  $("#issue-list").on('click', '.closeButton', function(e){
      event.preventDefault( );
      $.ajax( {
        type    : 'PUT',
        url     : url,
        data    : { _id: $(this).attr('data-id'), open: false },
        success : data => {
          setTimeout( () => window.location.reload( true ), 1500 );
        }
      });
  })

  $("#issue-list").on('click', '.deleteButton', function(e){
      event.preventDefault( );
      $.ajax( {
        type    : 'DELETE',
        url     : url,
        data    : { _id: $(this).attr('data-id') },
        success : data => {
          setTimeout( () => window.location.reload( true ), 1500 );
        }
      });
  })


});