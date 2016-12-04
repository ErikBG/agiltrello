function modifyTask(name_employee,id_task,id_sprint, formattedDt){
	var formData = {
		"task_id": id_task,
		"name_employee": name_employee,
		"column_state": "inProgress",
		"deadline": formattedDt

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
function saveStatusTask(id_task,id_sprint){
	console.log("saveStatusTaskDB");
	var formData = {
		"task_id": id_task,
		"column_state": "finished"
	};

	$.ajax({
		url: "http://trelloagilprueba.esy.es/agiltrello/api/saveStatusTask",
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

function setTaskDuration(duration,id_task,id_sprint){
	var formData = {
		"task_id": id_task,
		"number_duration": duration,
		"column_state": "ready"
	};

	$.ajax({
		url: "http://trelloagilprueba.esy.es/agiltrello/api/setTaskDuration",
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

function loadVelocity() {
	var projectId = sessionStorage.currentProjectId;
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getVelocity', {projectId}, function (data) {
		console.log(data);
		$.each(data, function (i, task) {
			// AQUI VA LA ELABORACION DE TU GRAFICA, SANABIA.
			var sprint = task['sprint_id'];
			var team = task['team_id'];
			var velocity = task['velocity'];
			console.log(sprint, team, velocity);
			// UNA ITERACION DE ESTAS LINEAS REPRESENTA SOLO UN CAMPO DE LA TABLA QUE REGRESA (un solo conjunto de sprint/equipo/velocidad)
		});
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
		var owner=null;
		var lastTaskAdded = data['task_current_id'];
		switch(taskColumn){
			case "ready":
			var html = createKanbanCardHtml(lastTaskAdded,taskTitle,taskDeadline,taskDesc,taskDuration,owner);
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
			current_html = current_html.replace("name_employee", users['Id']);
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


function newProjectUserConfig(userId, projectId, teamId, capacity, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
	var formData = {
		"user_id": userId,
		"project_id": projectId,
		"team_id": teamId,
		"capacity": capacity,
		"monday": monday,
		"tuesday": tuesday,
		"wednesday": wednesday,
		"thursday": thursday,
		"friday": friday,
		"saturday": saturday,
		"sunday": sunday
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

function updateUserProjectConfig(userId, projectId, capacity, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
	var formData = {
		"user_id": userId,
		"project_id": projectId,
		"capacity": capacity,
		"monday": monday,
		"tuesday": tuesday,
		"wednesday": wednesday,
		"thursday": thursday,
		"friday": friday,
		"saturday": saturday,
		"sunday": sunday
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
function saveNewSprint(name,end_date,checkboxTask,start_date){
	var formData = {
		"name": name,
		"date": end_date,
		"currentdate": start_date,
		"array": checkboxTask.join(),
		"project_id": 1
	};
	console.log(formData);
	$.ajax({
		url: "http://trelloagilprueba.esy.es/agiltrello/api/saveNewSprint",
		type: 'POST',
		data: JSON.stringify(formData),
		dataType: 'json',
		encode: true
	}).done(function (data) {
		console.log(data);
		location.reload();
		console.log("Guardado correctamente");
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

function getSprintStartDateAndDuration (burndownChart) {
	var sprintId = burndownChart.sprint;
	console.log('Reaching DB for sprint ', sprintId);
	var date;
	var duration;
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getSprintStartDateAndDuration', {sprintId}, function (data) {
		$.each(data, function (i, user_project) {
			if (i==0) {
				date = user_project['start_date'];
				duration = user_project['duration'];
				burndownChart.setStartDate(date);
				burndownChart.setDays(duration);
				burndownChart.done('startDateAndDuration');
			}
		});
	});
}

/*function getSprintStartDate(burndownChart) {
//"SELECT start_date FROM sprint WHERE id = 1;"
//console.log('Received date on getSprintStartDate', sessionStorage.sprintStartDate);
//return sessionStorage.sprintStartDate;
//return '2016-10-27';
var sprintId = burndownChart.sprint;
var date;
$.get('http://trelloagilprueba.esy.es/agiltrello/api/getSprintStartDateAndDuration', {sprintId}, function (data) {
$.each(data, function (i, user_project) {
if (i==0) {
date = user_project['start_date'];
console.log('date from DB: ', sessionStorage.sprintStartDate);
burndownChart.setStartDate(date);
}
});
});
}

function getSprintDuration(sprintId) {
//"SELECT (DATEDIFF(end_date, start_date)+1) as duration FROM sprint WHERE id = 1;"
//return sessionStorage.sprintDuration;
//return 14;
$.get('http://trelloagilprueba.esy.es/agiltrello/api/getSprintStartDateAndDuration', {sprintId}, function (data) {
$.each(data, function (i, user_project) {
if (i==0) {
sessionStorage.sprintDuration = user_project['duration'];
console.log('duration:', sessionStorage.sprintDuration);
}
});
});
return sessionStorage.sprintDuration;
}*/

function getSprintTasksDuration (burndownChart) {
	var sprintId = burndownChart.sprint;
	var teamId = burndownChart.team;
	console.log('Reaching DB for sprint', sprintId,'and team', teamId);
	var totalDuration;
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getSprintTasksDuration', {sprintId, teamId}, function (data) {
		$.each(data, function (i, user_project) {
			if (i==0) {
				totalDuration = user_project['total_duration'];
				burndownChart.setTotalDuration(totalDuration);
				burndownChart.done('tasksDuration');
			}
		});
	});
	//return 16;
}

function getCRWHistory (burndownChart) {
	var sprintId = burndownChart.sprint;
	var teamId = burndownChart.team;
	console.log('Reaching DB for sprint', sprintId,'and team', teamId);
	var x = new Array();
	var y;
	//console.log('Sending to DB:', sprintId, teamId);
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getCRWHistory', {sprintId, teamId}, function (data) {
		//console.log(data);
		$.each(data, function (i, history) {
			y = new Array(2);
			y[0] = history['crw'];
			y[1] = new Date(history['date']);
			y[1].setDate(y[1].getDate());
			y[1].setHours(0,0,0,0);
			//console.log(history['crw'],',',history['date']);
			x.push(y);
		});
		burndownChart.setHistory(x);
		burndownChart.done('teamEffortHistory');
	});
}
function addStoryToDB (title,as_i,iwant,so_that,criteria) {
	var formData = {
		"story_title": title,
		"story_as": as_i,
		"story_want": iwant,
		"story_so": so_that,
		"story_criteria": criteria
	};

	$.ajax({
		url: "http://trelloagilprueba.esy.es/agiltrello/api/newUserStory",
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
function assignTasksForNewSprint(){

	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getactiveusers', function (data) {
		console.log(data);
		var html_code = ("<tr class='td_format'>"+"<td>"+"id"+"</td>"+"<td>"+"name"+"</td>"+"<td>"+"lastname"+"</td>"+"<td>"+"hour_sprint"+"</td>"+"</tr>");
		$.each(data,function(current,user) {
			if(current=="Error"){
				alert("Error al recuperar los datos");
			}
			else{
				var current_html = html_code;
				current_html = current_html.replace("id", user['user_id']);
				current_html = current_html.replace("name", user['user_name']);
				current_html = current_html.replace("lastname", user['user_lastname']);
				current_html = current_html.replace("hour_sprint", user['totalperuser']);
				$('#table_for_users').append(current_html);

			}
		});
	});
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getpendingtasks', function (data) {
		console.log(data);
		var html_code = ("<tr class='td_format'>"+"<td>"+"id"+"</td>"+"<td>"+"title"+"</td>"+"<td>"+"duration"+"</td>"+"<td>"+"<input type='checkbox' name='checkboxArray' value='id_task'>"+"</td>"+"</tr>");
		$.each(data,function(current,task) {
			if(current=="Error"){
				alert("Error al recuperar los datos");
			}
			else{
				var current_html = html_code;
				current_html = current_html.replace("id", task['id']);
				current_html = current_html.replace("title", task['title']);
				current_html = current_html.replace("duration", task['duration']);
				current_html = current_html.replace("id_task", task['id']);
				$('#table_for_tasks').append(current_html);

			}
		});
	});
}
