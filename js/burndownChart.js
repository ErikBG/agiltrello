function BurndownChart (sprint, team) {
	this.sprint = sprint;
	this.team = team;
	this.tendency;
	this.history;
	this.actualCRW;
	this.days;
	this.dailyEffort;
	this.totalDuration;
	this.startDate;
	this.endDate;
	
	setStartDate();
	setTeamDailyEffort();
	setDaysQuantity();
	setTotalDuration();
	getHistory();
	
	buildTendencyArray();
	buildCRWArray();
}

function setStartDate () {
	this.startDate = new Date (getSprintStartDate(this.sprint));
	console.log(this.startDate);
}

function setTeamDailyEffort() {
	this.dailyEffort = getTeamSprintDailyEffort(this.sprint, this.team);
}

function setDaysQuantity () {
	this.days = getSprintDuration(this.sprint);
	this.tendency = new Array (this.days);
	this.actualCRW = new Array (this.days);
}

function setTotalDuration () {
	this.totalDuration = getSprintTasksDuration(this.sprint, this.team);
}

function getHistory () {
	this.history = new Array (1);
	this.history[0] = getSprintTeamEffortHistory (this.sprint, this.team);
	console.log(this.history[0][0][0], this.history[0][0][1].getTime());
	console.log(this.history[0][1][0], this.history[0][1][1].getTime());
}

function buildTendencyArray() {
	console.log("Tendency");
	var actualCRW = this.totalDuration;
	console.log(actualCRW-this.dailyEffort);
	for (i=0; i<this.days; i++) {
		this.tendency[i] = actualCRW = actualCRW - this.dailyEffort;
		console.log(i+": ",this.tendency[i]);
	}
}

function buildCRWArray (history) {
	console.log("CRW");
	var currentDate = this.startDate;
	var crw = this.totalDuration;
	var x = new Array(this.days);
	var j = 0;
	for (var i = 0; i < this.days; i++) {
		x[i] = new Array(2);
		x[i][1] = currentDate;
		x[i][1].setDate(currentDate.getDate()+1);
		//x[i][1] = this.startDate;
		//x[i][1].setDate(this.startDate.getDate()+i);
		//console.log ("Current time: "+x[i][1])
		if (x[i][1].getTime() == this.history[0][j][1].getTime()) {
			this.actualCRW[i] = this.history[0][j][0];
			crw = this.actualCRW[i];
			if (j+1 < this.history[0].length)
				j++;
		} else {
			this.actualCRW[i] = crw;
		}
		console.log(i+": ",this.actualCRW[i]);
	}
}