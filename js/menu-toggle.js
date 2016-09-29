$(document).ready(function () {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    function addStory(){
      var formData = {
           "id": $('#id_task').val(),
           "deadline": $('#deadline_task').val(),
           "description": $("#description_task").val(),
           "duration": $('#duration_task').val()

         };
       console.log(formData);
      $.ajax({
           url: "http://localhost/agiltrello/api/newStory",
           type: 'POST',
           data: JSON.stringify(formData),
           dataType: 'json',
           encode: true
       }).done(function (data) {
         console.log(data);
       console.log("Guardado correctamente");
       }).fail(function (data) {
           console.log(data);
       });
    }
});
