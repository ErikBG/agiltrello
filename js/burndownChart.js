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
	buildChartArrays();
	//buildChart();
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

function buildChartArrays () {
	var newTendency = [{x: 0, y: this.totalDuration}];
	for (i=1; i<=this.days; i++) {
		newTendency.push({x: i, y: Math.round(this.tendency[i-1] * 100) / 100});
	}
	
	var newCRW = [{x: 0, y: this.totalDuration}];
	for (i=1; i<=this.days; i++) {
		newCRW.push({x: i, y: this.actualCRW[i-1]});
	}
	buildChart(newTendency, newCRW);
}

function buildChart (newTendency, newCRW) {
	var ctx = document.getElementById("BurndownChart");
	var scatterChart = new Chart(ctx, {
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