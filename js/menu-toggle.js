$(document).ready(function () {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    function addStory(){
      var formData = {
           "title": $('#title').val(),
           "as_i": $('#as').val(),
           "want": $("#iwant").val(),
           "so_that": $('#sothat').val(),
           "acceptance_criteria": $('#criteria').val()

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
