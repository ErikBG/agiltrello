function addTaskToDB (taskTitle, taskDesc, taskDuration,taskDeadline, taskOwner, taskColumn, taskSprint) {


	var formData = {
			 "task_title": taskTitle,
			 "task_description": taskDesc,
			 "task_duration": taskDuration,
			 "task_deadline": taskDeadline,
			 "task_owner": taskOwner,
			 "task_column": taskColumn,
			 "task_sprint": taskSprint

		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/newTask",
			 type: 'POST',
			 data: JSON.stringify(formData),
			 dataType: 'json',
			 encode: true
	 }).done(function (data) {
		 console.log(data);
		 	var lastTaskAdded = data['task_current_id'];
			var html = createKanbanCardHtml(lastTaskAdded, taskDeadline, taskDesc,taskDuration,taskOwner);
	 	var colHtml = getColumn(taskColumn);
	 	 appendHtmlAfterHtml(html, colHtml);
	 	 makeCardDraggable(lastTaskAdded);
	 console.log("Guardado correctamente");
	 }).fail(function (data) {
			 console.log(data);

	 });
}

function getCRW(id) { //debe recibir el id de la tarea y regresar el Current Remaining Time de la misma
	var crw = 4; // el numero es placeholder para probar

	// TAREA: Asignar a crw el valor recuperado de la BD, enviando el id de la tarea

	//sessionStorage.selectedCRW = crw;
	//console.log(sessionStorage.selectedCRW);
	return crw;
}

function setCRT() {
	if(name_signup_valid!=false && lastname_signup_valid!=false && email_signup_valid !=false && password_signup_valid!=false && password2_signup_valid!=false){

		var formData = {
            "id": $(/* SE DEBE RECUPERAR EL VALOR ID DE LA TARJETA A LA QUE SE LE DIO CLICK*/).val(),
            "crt": $('#crt_card_input').val()
        }; // ESTO DEBE CORREGIRSE YA QUE ESTE LA TABLA PARA TARJETAS DE TAREAS

       $.ajax({
            url: "http://trelloagilprueba.esy.es/agiltrello/api/setCRT", // ESTE URL DEBE CORREGIRSE (NO EXISTE)
            type: 'POST',
            data: JSON.stringify(formData),
            dataType: 'json',
            encode: true
        }).done(function (data) {
        	console.log(data);
			window.location.href="index.html";
        }).fail(function (data) {
            console.log(data);
        });
      } else {
      	 $("#error_required").show();
      console.log("Campos requeridos");
    }
}
