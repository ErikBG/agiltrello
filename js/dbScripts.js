function modifyTask(name_employee,id_task,id_sprint){
	var formData = {
			 "task_id": id_task,
			 "name_employee": name_employee,
			 "column_state": "inProgress"
		 };

	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/modifyTask",
			 type: 'POST',
			 data: JSON.stringify(formData),
			 dataType: 'json',
			 encode: true
	 }).done(function (data) {
	clearTasks();
	getTaskFromSprint(id_sprint);

	 console.log("Modificado correctamente");
	 }).fail(function (data) {
			 console.log(data);

	 });
}

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
function assignUsers(){
$.get('http://trelloagilprueba.esy.es/agiltrello/api/getUsers', function (data) {

  var html_code = '<option value="name_employee">name</option>';
  $.each(data, function (i, users) {
    var current_html = html_code;
    current_html = current_html.replace("name_employee", users['Id']);
    current_html = current_html.replace("name", users['user_name']);
    $('#employees_select').append(current_html);
    var default_val=$('#employees_select').val();

  });
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

function updateUserProjectConfig(userId, projectId, dailyCapacity, daysPerSprint) {
	var formData = {
			 "user_id": userId,
			 "project_id": projectId,
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
		console.log("User Project saved correctly");
	 }).fail(function (data) {
			 console.log(data);
	 });
}

function updateUserSprintConfig(userId, projectId, sprintId, teamId) {
	var formData = {
			 "user_id": userId,
			 "project_id": projectId,
			 "team_id": teamId,
			 "sprint_id": sprintId
		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/updateUserToSprint",
			 type: 'POST',
			 data: JSON.stringify(formData),
			 dataType: 'json',
			 encode: true
	 }).done(function (data) {
		console.log(data);
		console.log("User Sprint Configuration saved correctly");
	 }).fail(function (data) {
			 console.log(data);
	 });
}

function updateCRWAndEffort(taskId, crw, effort) {
	var formData = {
			 "task_id": taskId,
			 "crw": crw,
			 "effort": effort
		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/updateCRWAndEffort",
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
