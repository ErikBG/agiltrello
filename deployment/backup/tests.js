QUnit.module("Cards");
QUnit.test("HTML String Generation", function( assert ) {
	var id = 1000, title = "task", date = "2016-10-12", desc = "Test this", crw = 6, owner = "Roger";
	var theString = createKanbanCardHtml(id, title, date, desc, crw, owner);
	var html = $.parseHTML(theString), nodeNames = [];
	
	$.each( html, function( i, el ) {
		nodeNames[i] = el.nodeName;
	});
	
	var expected = 
		"<div id='1000' class='card js--item1000' draggable='true' ondragstart='dragStart(event)' ondragend='dragEnd(event)'>"+
		"<div class='cardTitle'>"+
		"    <label>task</label>"+
		"		<button id='configBtn1000' class='configBtn' data-toggle='modal' data-target='#cardModal' onclick='setSelectedID(1000)'>"+
		"			<span class='glyphicon glyphicon-time'></span>"+
		"		</button>"+
		"        <button id='blockBtn1000' class='blockBtn' OnClick='blockCard(1000);' >B</button>"+
		"</div>"+
		"    <div class='card-content'>"+
		"        <p id='deadline-label'><strong>Deadline:</strong> 2016-10-12</p>"+
		"        <p><strong>Description:</strong> Test this</p>"+
		"        <p><strong>Duration:</strong> 6</p>"+
		"    </div>"+
		"    <div class='card-footer'>"+
		"			<p>Roger</p>"+
		"		</div>"+
		"</div>";
	
	assert.equal(theString, expected, "Expected html string returned");
	assert.equal(nodeNames[0], "DIV", "First tag recognized as div tag");
});

QUnit.test("Column State", function( assert ) {
	assert.equal(getColumn("ready"), ".readyCol", "Got expected column id: .readyCol");
	assert.equal(getColumn("inProgress"), ".inProgressCol", "Got expected column id: .inProgressCol");
	assert.equal(getColumn("finished"), ".finishedCol", "Got expected column id: .finishedCol");
	assert.equal(getColumn("backlog"), ".backlogCol", "Got expected column id: .backlogCol");
});