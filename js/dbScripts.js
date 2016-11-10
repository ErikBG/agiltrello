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
	 updateCRWAndEffortHistory(taskId, crw, effort);
}

function updateCRWAndEffortHistory(taskId, crw, effort) {
	var formData = {
			 "task_id": taskId,
			 "crw": crw,
			 "effort": effort
		 };
	 console.log(formData);
	$.ajax({
			 url: "http://trelloagilprueba.esy.es/agiltrello/api/postEffortAndCRW",
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

/*sessionStorage.sprintStartDate='';
sessionStorage.sprintDuration='';*/

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
	//"SELECT SUM(up.daily_capacity*up.days_per_sprint) as total_duration FROM user_sprint us JOIN user_project up ON us.user_id = up.user_id WHERE us.sprint_id = 1 AND us.team_id = 1;"
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

function getSprintTeamEffortHistory (burndownChart) {
	var sprintId = burndownChart.sprint;
	var teamId = burndownChart.team;
	console.log('Reaching DB for sprint', sprintId,'and team', teamId);
	/*"SELECT SUM(a.crw) as crw, a.date FROM (SELECT MIN(eh.crw) as crw, eh.date
	FROM effort_history as eh
	JOIN task t ON eh.task_id = t.id
	JOIN user_sprint us ON t.owner = us.user_id
	WHERE t.sprint_id = 6 AND us.sprint_id = 6 AND us.team_id = 1
	GROUP BY date, task_id) as a
	GROUP BY date ORDER BY date;"*/
	var x = new Array();
	var y;
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getSprintTeamEffortHistory', {sprintId, teamId}, function (data) {
		console.log(data);
		$.each(data, function (i, history) {
			y = new Array(2);
			y[0] = history['crw'];
			y[1] = new Date(history['date']);
			y[1].setDate(y[1].getDate()+1);
			y[1].setHours(0,0,0,0);
			console.log(history['crw'],',',history['date']);
			x.push(y);
		});
		burndownChart.setHistory(x);
		burndownChart.done('teamEffortHistory');
	});
	/*x[0] = new Array(2);
	x[0][0] = 14;
	x[0][1] = new Date('2016-11-02');
	x[1] = new Array(2);
	x[1][0] = 10;
	x[1][1] = new Date('2016-11-05');
	x[2] = new Array(2);
	x[2][0] = 8;
	x[2][1] = new Date('2016-11-06');*/
	//return x;
}
