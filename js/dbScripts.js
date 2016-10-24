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
