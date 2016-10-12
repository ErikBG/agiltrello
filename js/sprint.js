//get sprint
$.get('http://localhost/agiltrello/api/getsprint', function (data) {
  console.log(data);
  var html_code = '<option value="id">sprint</option>';
  $.each(data, function (i, sprint) {
    var current_html = html_code;
    current_html = current_html.replace("id", sprint['id']);
    current_html = current_html.replace("sprint", sprint['name']);
    $('#sprint_select').append(current_html);
    var default_val=$('#sprint_select').val();
   
  });
});
//get sprint with stories
$(document).ready(function () {
    $("#sprint_select").change(function () {
      var id_sprint = $("#sprint_select").val();
      $.get('http://localhost/agiltrello/api/getdetailsprint', {id_sprint}, function (data) {
      
        $.each(data, function (i, subject) {
        console.log(data);
        });
        
      });
    
  });
  });

//get user_story
$.get('http://localhost/agiltrello/api/getcard', function (data) {
  var html_code='<a href="#" class="list-group-item" id="id_card">name</a>';


  $.each(data, function (i, card) {
    var current_html = html_code;
    current_html = current_html.replace("id_card", card['id']);
    current_html = current_html.replace("name", card['title']);

    $('#list_cards').append(current_html);
  });
});
