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

function addTaskToDB (taskTitle, taskDesc, taskDuration,taskDeadline,taskColumn, taskSprint) {
	var formData = {
			 "task_title": taskTitle,
			 "task_description": taskDesc,
			 "task_duration": taskDuration,
			 "task_deadline": taskDeadline,
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
			switch(taskColumn){
				case "ready":
				var html = createKanbanCardHtml(lastTaskAdded,taskTitle,taskDeadline,taskDesc,taskDuration,taskOwner);
		 	var colHtml = getColumn(taskColumn);
		 	 appendHtmlAfterHtml(html, colHtml);
		 	 makeCardDraggable(lastTaskAdded);
			 break;
			 case "backlog":
			 var html = createKanbanCardHtmlBacklog(lastTaskAdded,taskTitle,taskDeadline,taskDesc,taskDuration);
 	 	var colHtml = getColumn(taskColumn);
 	 	 appendHtmlAfterHtml(html, colHtml);
 	 	 makeCardDraggable(lastTaskAdded);
		 break;
			}

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
    current_html = current_html.replace("name_employee", users['id']);
    current_html = current_html.replace("name", users['user_name']);
    $('#employees_select').append(current_html);
    var default_val=$('#employees_select').val();

  });
});
}

function logIn(username_input,password_input) {
    
    $.get('http://trelloagilprueba.esy.es/agiltrello/api/getUsers', function (data){
        $.each(data, function(i, users){
            if((username_input == users['user_name'])&& (password_input == users['user_password'])) {
                alert("Login Successfully");
            }else{
                alert("Login Else");
            }
            alert("Failed to enter IF");
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

function getSprintStartDate(sprint) {
	return '2016-10-27';
}

function getSprintDuration(sprint) {
	return 14;
}

function getSprintTasksDuration(sprint, team) {
	return 16;
}

function getTeamSprintDailyEffort(sprint, team) {
	return 1.1428571429;
}

function getSprintTeamEffortHistory (sprint, team) {
	var x = new Array(3);
	x[0] = new Array(2);
	x[0][0] = 14;
	x[0][1] = new Date('2016-11-02');
	x[1] = new Array(2);
	x[1][0] = 10;
	x[1][1] = new Date('2016-11-05');
	x[2] = new Array(2);
	x[2][0] = 8;
	x[2][1] = new Date('2016-11-06');
	return x;
}
