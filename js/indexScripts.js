//Ready to inProgress
$(document).ready(function () {
    $("#sprint_select").change(function () {
       var id_sprint = $("#sprint_select").val();
	   sessionStorage.currentSprintId = id_sprint;
	  clearTasks();
      $.get('http://trelloagilprueba.esy.es/agiltrello/api/getdetailsprint', {id_sprint}, function (data) {
        $.each(data, function (i, current) {
          //console.log(data);
          var html= createKanbanCardHtml(current['id'], current['title'], current['deadline'],current['description'],current['duration'],current['owner']);
          var colHtml = getColumn(current['column_state']);
      	 	 appendHtmlAfterHtml(html, colHtml);
      	 	 makeCardDraggable(current['id']);
        });
      });
    });
  });

function setSelectedID(id) {
	sessionStorage.selectedTaskId = id;
	console.log(sessionStorage.selectedTaskId);
	loadCRWAndEffort(id);
}

function loadCRWAndEffort(taskId) {
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getCRWAndEffort', {taskId}, function (data) {
		console.log(data);
		$.each(data, function (i, user_project) {
			if (i==0) {
				$("#crw_card_input").val(user_project['crw']);
				$("#effort_card_input").val(user_project['effort']);
			}
		});
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

function loadProjectUserConfig() {
	var userId = sessionStorage.currentUserId;
	var projectId = sessionStorage.currentProjectId;
	var sprintId = sessionStorage.currentSprintId;
	$.get('http://trelloagilprueba.esy.es/agiltrello/api/getUserToProject', {userId, projectId, sprintId}, function (data) {
	  console.log(data);
	  $.each(data, function (i, user_project) {
			if (i==0) {
				$("#team_id_input").val(user_project['team_id']);
				sessionStorage.currentTeamId = user_project['team_id'];
				$("#daily_capacity_input").val(user_project['daily_capacity']);
				$("#days_per_sprint_input").val(user_project['days_per_sprint']);
			}
	  });
	});
}

function addProjectUserConfig() {

	var userId = sessionStorage.currentUserId;
	var projectId = sessionStorage.currentProjectId;
	sprintId = sessionStorage.currentSprintId;

	var teamId = $("#team_id_input").val();
	var dailyCapacity = $("#daily_capacity_input").val();
	var daysPerSprint = $("#days_per_sprint_input").val();

	//console.log("Trying to get: "+getUserToProject(userId, projectId));
	updateUserProjectConfig(userId, projectId, dailyCapacity, daysPerSprint);
	
	console.log("Input team id:"+teamId, "Current team id:"+sessionStorage.currentTeamId);
	if (teamId != sessionStorage.currentTeamId) {
		updateUserSprintConfig(userId, projectId, sprintId, teamId);
	}
}

function addTask() {
	var taskTitle = $("#cardTitle").val();
	var taskDesc = $("#carddescription").val();
	var taskDuration = $("#cardduration").val();
	var taskDeadline= $("#carddeadline").val();
	var taskOwner= $("#cardowner").val();
	var taskColumn= $("#cardcolumn").val();
	var taskSprint= $("#sprint_select").val();

	addTaskToDB(taskTitle, taskDesc, taskDuration,taskDeadline, taskOwner, taskColumn, taskSprint);

	// Placeholder
	// sessionStorage.currentTasks ++;
	// sessionStorage.currentTaskID ++;

	//var n = sessionStorage.currentTasks;

}

function setCRWAndEffort() {
	var taskId = sessionStorage.selectedTaskId;
	var crw = $("#crw_card_input").val();
	var effort = $("#effort_card_input").val();
	updateCRWAndEffort(taskId, crw, effort);
}

function AssignEmployee(){
  var name_employee = $("#employees_select").val();
  var id_task = sessionStorage.getItem("recentTaskMoved");
  var id_current_sprint = $("#sprint_select").val();
  console.log("name_employee (id): "+name_employee);
  modifyTask(name_employee,id_task,id_current_sprint);

}
function dragStart(event){
  var itemInmovement = event.dataTransfer.setData("Text", event.target.id);
  console.log("Start Drag event");
  // console.log(itemInmovement);

}
function dragEnd(event) {
    sessionStorage.setItem("recentTaskMoved",event.target.id);
    assignUsers();
    $('#AssignModal').modal('show');
    console.log("Finished dragging.");

}

function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
  console.log(data);
}

function createKanbanCardHtml(id, title, date, desc, crw, owner) {//recibe toda la informacion de la tarjeta y la crea
	var htmlClass;
	var html =
	"<div id='"+id+"' class='card js--item"+id+"' draggable='true' ondragstart='dragStart(event)' ondragend='dragEnd(event)'>"+
	"<div class='cardTitle'>"+
	"    <label>"+title+"</label>"+
	"		<button id='configBtn"+id+"' class='configBtn' data-toggle='modal' data-target='#cardModal' onclick='setSelectedID("+id+")'>"+
	"			<span class='glyphicon glyphicon-time'></span>"+
	"		</button>"+
	"        <button id='blockBtn"+id+"' class='blockBtn' OnClick='blockCard("+id+");' >B</button>"+
	"</div>"+
	"    <div class='card-content'>"+
	"        <p><strong>Deadline:</strong> "+date+"</p>"+
	"        <p><strong>Description:</strong> "+desc+"</p>"+
	"        <p><strong>Duration:</strong> "+crw+"</p>"+
	"    </div>"+
	"    <div class='card-footer'>"+
	"			<p>"+owner+"</p>"+
	"		</div>"+
	"</div>";


	return html;
}

function getColumn(state) {
	if (state == "ready")
		htmlClass = ".readyCol";
	else if (state == "inProgress")
		htmlClass = ".inProgressCol"
	else if (state == "finished")
		htmlClass = ".finishedCol";
	else
		htmlClass = ".backlogCol";

	return htmlClass;
}

function makeCardDraggable(id){
			$('#item'+id).bind('dragstart', function(event) {
				event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
			});
			// bind the dragover event on the board sections
			$('#ready, #inprogress, #finished').bind('dragover', function(event) {
				event.preventDefault();
			});
			// bind the drop event on the board sections
		   $('#ready, #inprogress, #finished').bind('drop', function(event) {
					var notecard = event.originalEvent.dataTransfer.getData("text/plain");
					event.target.appendChild(document.getElementById(notecard));
					event.preventDefault();
		});
		}

function clearTasks () {
	console.log("Clearing tasks");
	$("div").remove(".card");
}

function appendHtmlAfterHtml (html, prevHtml) {
	$(prevHtml).append(html);
}