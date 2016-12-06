//Ready to inProgress
$(document).ready(function () {
    $("#sprint_select").change(function () {
		var id_sprint = $("#sprint_select").val();
		sessionStorage.currentSprintId = id_sprint;
		clearTasks();
		console.log('Selected sprint:', sessionStorage.currentSprintId);
      $.get('http://trelloagilprueba.esy.es/agiltrello/api/getdetailsprint', {id_sprint}, function (data) {
        $.each(data, function (i, current) {
			//console.log('id from DB: ',current['id'])
          if(current['column_state']=="backlog"){
            var html= createKanbanCardHtmlBacklog(current['id'], current['title'],current['description'],current['deadline'],current['duration']);
            var colHtml = getColumn(current['column_state']);
             appendHtmlAfterHtml(html, colHtml);
             makeCardDraggable(current['id']);
          }else{
            var html= createKanbanCardHtml(current['id'], current['title'], current['deadline'],current['description'],current['duration'],current['owner']);
            var colHtml = getColumn(current['column_state']);
             appendHtmlAfterHtml(html, colHtml);
             makeCardDraggable(current['id']);
          }

        });
      });
    });

	$("#team_select").change(function () {
		sessionStorage.currentTeamId = $("#team_select").val();
		loadBurndownChart ();
    });
});

  $("#criteria").focusout(function(){
  var str = $("#criteria").val();
  console.log(str);
  test_situation(str);

});
function addStory(){
  var title = $("#title").val();
  var as_i = $("as").val();
  var iwant = $("iwant").val();
  var so_that = $("#sothat").val();
  var criteria = $("#criteria").val();
  addStoryToDB(title,as_i,iwant,so_that,criteria);
}

function setSelectedID(id) {
	sessionStorage.selectedTaskId = id;
	console.log(sessionStorage.selectedTaskId);
	loadCRWAndEffort(id);
}

function createNewSprint(){
// console.log("createNewSprint");
var checkboxTask = [];
  $("input:checkbox[name='checkboxArray']:checked").each(function(){
      checkboxTask.push($(this).val());
  });
  var name=$("#name_new_sprint").val();
  var end_date = $("#finish_date_sprint").val();
  var date = new Date();

  var month = date.getMonth();
  var day = date.getDate();

  var start_date = date.getFullYear() + '-' +
      (month<10 ? '0' : '') + month + '-' +
      (day<10 ? '0' : '') + day;

  saveNewSprint(name,end_date,checkboxTask,start_date);

// console.log(name,end_date,checkboxTask,start_date);
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
				$("#capacity_input").val(user_project['capacity']);

				if (user_project['monday'] == 1) $("#monday_input").prop('checked', true);
				if (user_project['tuesday'] == 1) $("#tuesday_input").prop('checked', true);
				if (user_project['wednesday'] == 1) $("#wednesday_input").prop('checked', true);
				if (user_project['thursday'] == 1) $("#thursday_input").prop('checked', true);
				if (user_project['friday'] == 1) $("#friday_input").prop('checked', true);
				if (user_project['saturday'] == 1) $("#saturday_input").prop('checked', true);
				if (user_project['sunday'] == 1) $("#sunday_input").prop('checked', true);
			}
	  });
	});
}

function addProjectUserConfig() {

	var userId = sessionStorage.currentUserId;
	var projectId = sessionStorage.currentProjectId;
	sprintId = sessionStorage.currentSprintId;
	var monday, tuesday, wednesday, thursday, friday, saturday, sunday;

	var teamId = $("#team_id_input").val();
	var capacity = $("#capacity_input").val();
	if($('#monday_input').is(':checked')) {monday = 1;} else {monday = 0;}
	if($('#tuesday_input').is(':checked')) {tuesday = 1;} else {tuesday = 0;}
	if($('#wednesday_input').is(':checked')) {wednesday = 1;} else {wednesday = 0;}
	if($('#thursday_input').is(':checked')) {thursday = 1;} else {thursday = 0;}
	if($('#friday_input').is(':checked')) {friday = 1;} else {friday = 0;}
	if($('#saturday_input').is(':checked')) {saturday = 1;} else {saturday = 0;}
	if($('#sunday_input').is(':checked')) {sunday = 1;} else {sunday = 0;}

	//console.log("Trying to get: "+getUserToProject(userId, projectId));
	updateUserProjectConfig(userId, projectId, capacity, monday, tuesday, wednesday, thursday, friday, saturday, sunday);

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
	var taskColumn= $("#cardcolumn").val();
	var taskSprint= $("#sprint_select").val();

	addTaskToDB(taskTitle, taskDesc, taskDuration,taskDeadline, taskColumn, taskSprint);
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

    //Calculate New Deadline
     var dl = new Date($.now());
        dl.setDate(dl.getDate()+2);
        var dd = dl.getDate();
        var mm = dl.getMonth()+1;
        var y = dl.getFullYear();
        var formattedDt = y+"-"+mm+"-"+dd;
  modifyTask(name_employee,id_task,id_current_sprint, formattedDt);

}

function assignDuration(){
  var number_duration = $("#duration_select").val();
  var id_task = sessionStorage.getItem("recentTaskMoved");
  var id_current_sprint = $("#sprint_select").val();
  console.log("number_duration:"+number_duration);
  modifyTask(number_duration,id_task,id_current_sprint);

}

function dragStart(event){
   event.dataTransfer.setData("Text", event.target.id);
  console.log("Start Dragging ");


}

function dragEnd(event) {
    if(sessionStorage.getItem("nameColumn")== "inprogress"){
        sessionStorage.setItem("recentTaskMoved",event.target.id);
        assignUsers();
        $('#AssignModal').modal('show');

        //Add two days to deadline once card is dragged into InProgress
        var dt = new Date($.now());
        dt.setDate(dt.getDate()+2);
        var dd = dt.getDate();
        var mm = dt.getMonth()+1;
        var y = dt.getFullYear();

        var formattedDt = y+"-"+mm+"-"+dd;
        var currentCard = document.getElementById(event.target.id);
        $(currentCard).find('#deadline-label').show();
        //$(currentCard).find('#deadline-label').text("Deadline: "+formattedDt);

    }

    if(sessionStorage.getItem("nameColumn")== "ready"){
        sessionStorage.setItem("recentTaskMoved",event.target.id);
        var currentCard = document.getElementById(event.target.id);
        $(currentCard).find('#deadline-label').hide();
        $('#AssignDurationModal').modal('show');
        console.log("Finished dragging.");
        //$(currentCard).find('#deadline-label').css('color','blue');
        //$('#deadline-label').hide();
        //alert("Tarjeta ID: "+event.target.id);
    }

    if(sessionStorage.getItem("nameColumn")== "finished"){

        sessionStorage.setItem("recentTaskMoved",event.target.id);
        var currentCard = document.getElementById(event.target.id);
          var id_current_sprint = $("#sprint_select").val();
        saveStatusTask(sessionStorage.getItem("recentTaskMoved"),id_current_sprint);


    }
}

function saveTaskDuration(){
  var newduration=$("#duration_select").val();
  var sprint_id=$("#sprint_select").val();
  var id_task = sessionStorage.getItem("recentTaskMoved");
  console.log(newduration,sprint_id,id_task);
  setTaskDuration(newduration,id_task,sprint_id);
}

document.addEventListener("dragenter", function(event) {
    var whichColumn;
    switch(event.target.id){
      case "ready":
      whichColumn ="ready"
      sessionStorage.setItem("nameColumn",whichColumn);
      console.log("Drag over ready");
      break;
      case "inprogress":
      whichColumn ="inprogress"
      sessionStorage.setItem("nameColumn",whichColumn);
      console.log("Drag over inprogress");
      break;
      case "finished":
      whichColumn ="finished"
      sessionStorage.setItem("nameColumn",whichColumn);
      console.log("Drag over finished");
      break;
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");

}

function createKanbanCardHtml(id, title, date, desc, crw, owner) {//recibe toda la informacion de la tarjeta y la crea
	if (owner==null)
		owner = "No owner";
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
	"        <p id='deadline-label'><strong>Deadline:</strong> "+date+"</p>"+
	"        <p><strong>Description:</strong> "+desc+"</p>"+
	"        <p><strong>Duration:</strong> "+crw+"</p>"+
	"    </div>"+
	"    <div class='card-footer'>"+
	"			<p>"+owner+"</p>"+
	"		</div>"+
	"</div>";

	return html;
}

function createKanbanCardHtmlBacklog(id, title,desc,date,duration) {
	var html =
	"<div id='"+id+"' class='card js--item"+id+"' draggable='true' ondragstart='dragStart(event)' ondragend='dragEnd(event)'>"+
	"<div class='cardBacklogTitle'>"+
	"    <label>"+title+"</label>"+
	"</div>"+
	"    <div class='cardBacklog-content'>"+
	"        <p id='deadline-label'><strong>Deadline:</strong> "+date+"</p>"+
	"        <p><strong>Description:</strong> "+desc+"</p>"+
	"        <p><strong>Duration:</strong> "+duration+"</p>"+
	"    </div>"+
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

var actualBurndownChart;
var burndownChart;

function loadBurndownChart () {
	if (actualBurndownChart != null) {
		console.log('Destroying previous burndown chart');
		burndownChart.destroyChart();
	}
	burndownChart = new BurndownChart(sessionStorage.currentSprintId, sessionStorage.currentTeamId);
}

var actualSpeedChart;
var speedChart;

function loadSpeedChart () {
	if (actualSpeedChart != null) {
		console.log('Destroying previous speed chart');
		speedChart.destroyChart();
        alert("Previous speed chart destroyed.")
	}
    var id_sprint = $("#sprint_select").val();
	speedChart = new SpeedChart(id_sprint);
}

function getActualSpeedChart () {
	actualSpeedChart = speedChart.getChart();
	//console.log('Burndown chart loaded: '+actualBurndownChart);
}

function getActualBurndownChart () {
	actualBurndownChart = burndownChart.getChart();
	//console.log('Burndown chart loaded: '+actualBurndownChart);
}