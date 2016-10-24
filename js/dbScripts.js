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
			var html = createKanbanCardHtml(lastTaskAdded,taskTitle,taskDeadline,taskDesc,taskDuration,taskOwner);
	 	var colHtml = getColumn(taskColumn);
	 	 appendHtmlAfterHtml(html, colHtml);
	 	 makeCardDraggable(lastTaskAdded);
	 console.log("Guardado correctamente");
	 }).fail(function (data) {
			 console.log(data);

	 });
}

function newProjectUserConfig(userId, projectId, teamId, dailyCapacity, daysPerSprint) {
	var formData = {
			 "user_id": userId,
			 "project_id": projectId,
			 "team_id": teamId,
			 "daily_capacity": dailyCapacity,
			 "days_per_sprint": daysPerSprint

		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/newUserToProject",
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

function updateProjectUserConfig(userId, projectId, teamId, dailyCapacity, daysPerSprint) {
	var formData = {
			 "user_id": userId,
			 "project_id": projectId,
			 "team_id": teamId,
			 "daily_capacity": dailyCapacity,
			 "days_per_sprint": daysPerSprint

		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/updateUserToProject",
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

function getUserToProject(userId, projectId) {
	/*var formData = {
			 "user_id": userId,
			 "project_id": projectId
		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/getUserToProject",
			 type: 'POST',
			 data: JSON.stringify(formData),
			 dataType: 'json',
			 encode: true
	 }).done(function (data) {
		console.log(data);
		console.log("Recuperado correctamente");
		return data;
	 }).fail(function (data) {
			 console.log(data);
	 });*/
	 
	 $.get('http://trelloagilprueba.esy.es/agiltrello/api/getUserToProject', {userId, projectId}, function (data) {
	  console.log(data);
	  $.each(data, function (i, user_project) {
			if (i==0) {
				$("#team_id_input").val(user_project['team_id']);
				$("#daily_capacity_input").val(user_project['daily_capacity']);
				$("#days_per_sprint_input").val(user_project['days_per_sprint']);
			}
	  });
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
