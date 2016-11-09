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
	this.currentChart;
	
	this.startDateAndDurationDone = false;
	this.sprintTasksDurationDone = false;
	this.sprintTeamEffortHistoryDone = false;
	
	/*this.setStartDate(this.sprint);
	console.log('startDate on prototype: '+this.startDate);
	setDaysQuantity(this.sprint);
	setTotalDuration(this.sprint, this.team);
	setTeamDailyEffort();
	getHistory(this.sprint, this.team);
	
	buildTendencyArray();
	buildCRWArray();
	buildChartArrays();*/
	//buildChart();
	
	this.getDataFromDB();
}

BurndownChart.prototype.getDataFromDB = function (){
	getSprintStartDateAndDuration(this);
	console.log('Getting sprint start date from DB');
	getSprintTasksDuration(this);
	console.log('Getting sprint current remaining work from DB');
	getSprintTeamEffortHistory (this);
	console.log('Getting sprint history from DB');
}

BurndownChart.prototype.done = function (string){
	if (string=='startDateAndDuration') {
		this.startDateAndDurationDone = true;
	} else if (string == 'tasksDuration') {
		this.sprintTasksDurationDone = true;
	} else if (string == 'teamEffortHistory') {
		this.sprintTeamEffortHistoryDone = true;
	}
	
	if (this.startDateAndDurationDone & this.sprintTasksDurationDone & this.sprintTeamEffortHistoryDone) {
		this.setTeamDailyEffort();
		this.buildTendencyArray();
		this.buildCRWArray();
		this.buildChartArrays();
	}
}

BurndownChart.prototype.setStartDate = function (date) {
	this.startDate = new Date (date);
	console.log('Result from DB on startDate:', this.startDate);
}

BurndownChart.prototype.setDays = function (duration) {
	this.days = duration;
	console.log('Result from DB on days:', this.days);
	this.tendency = new Array (this.days);
	this.actualCRW = new Array (this.days);
}

BurndownChart.prototype.setTotalDuration = function (totalDuration) {
	this.totalDuration = totalDuration;
	console.log('Result from DB on totalDuration:', this.totalDuration);
}

BurndownChart.prototype.setTeamDailyEffort = function () {
	this.dailyEffort = this.totalDuration/this.days;
	console.log('calculated dailyEffort:', this.dailyEffort);
	//this.dailyEffort = getTeamSprintDailyEffort(this.sprint, this.team);
}

BurndownChart.prototype.setHistory = function (x) {
	/*this.history = new Array (1);
	this.history[0] = getSprintTeamEffortHistory (sprint, team);
	console.log(this.history[0][0][0], this.history[0][0][1].getTime());
	console.log(this.history[0][1][0], this.history[0][1][1].getTime());*/
	this.history = x;
	console.log('Result from DB on History:',this.history);
}

BurndownChart.prototype.buildTendencyArray = function () {
	console.log("Tendency");
	var actualCRW = this.totalDuration;
	console.log(actualCRW-this.dailyEffort);
	for (i=0; i<this.days; i++) {
		this.tendency[i] = actualCRW = actualCRW - this.dailyEffort;
		console.log(i+": ",this.tendency[i]);
	}
}

BurndownChart.prototype.buildCRWArray = function () {
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
		if (x[i][1].getTime() == this.history[j][1].getTime()) {
			this.actualCRW[i] = this.history[j][0];
			crw = this.actualCRW[i];
			if (j+1 < this.history[0].length)
				j++;
		} else {
			this.actualCRW[i] = crw;
		}
		console.log(i+": ",this.actualCRW[i]);
	}
}

BurndownChart.prototype.buildChartArrays = function () {
	var newTendency = [{x: 0, y: this.totalDuration}];
	for (i=1; i<=this.days; i++) {
		newTendency.push({x: i, y: Math.round(this.tendency[i-1] * 100) / 100});
	}
	
	var newCRW = [{x: 0, y: this.totalDuration}];
	for (i=1; i<=this.days; i++) {
		newCRW.push({x: i, y: this.actualCRW[i-1]});
	}
	this.buildChart(newTendency, newCRW);
}

BurndownChart.prototype.buildChart = function (newTendency, newCRW) {
	/*if (sessionStorage.currentChart != null || sessionStorage.currentChart != "null") {
		console.log('Trying to destroy previous burndown chart');
		this.destroyChart();
	}*/
	var ctx = document.getElementById("BurndownChart");
	this.currentChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Tendency',
				lineTension: 0,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: 'rgba(255, 206, 86, 0.2)',
				pointHoverBorderWidth: 2,
				pointRadius: 4,
				pointHitRadius: 10,
				data: newTendency
			}, {
				label: 'Remaining Work',
				fill: false,
				lineTension: 0,
				borderColor: "rgba(255,99,132,1)",
				pointBorderColor: "rgba(255,99,132,1)",
				pointBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: "rgba(255,99,132,1)",
				pointHoverBorderColor: 'rgba(255, 206, 86, 0.2)',
				pointHoverBorderWidth: 2,
				pointRadius: 4,
				pointHitRadius: 10,
				data: newCRW
			}]
		},
		options: {
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}]
			}
		}
	});
	
	getActualBurndownChart();
	/*var chart = new CanvasJS.Chart("burndownContainer", {
		theme: "theme2",//theme1
		title:{
			text: "Burndown Chart - Sprint "+this.sprint+"; Team "+this.team
		},
		animationEnabled: true,   // change to true
		data: [              
			{
				type: "line",
				dataPoints: newTendency
			}
		]
	});
	chart.render();*/ // ESTO ERA PARA CANVASJS
}

BurndownChart.prototype.destroyChart = function () {
	this.currentChart.destroy();
}

BurndownChart.prototype.getChart = function() {
	return this.currentChart;
}