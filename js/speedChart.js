function SpeedChart (sprint) {
	this.sprint = sprint;
    
    this.getDurationFromSprint();
    
}




SpeedChart.prototype.getDurationFromSprint = function (){
    var id_sprint=this.sprint
    $.get('http://trelloagilprueba.esy.es/agiltrello/api/getdetailsprint', {id_sprint}, function (data) {
    var totalDuration=0;
      var totalCompleted=0;
      var duration=0;
        
    $.each(data, function (i, current) {
      //console.log(data);
        
      if(current['column_state']=="backlog"){
        //Do Nothing
      }else{
          
          console.log("Current duration: "+current['duration']);
          console.log("Current column: "+getColumn(current['column_state']));
          
                      
                      
          var colHtml = getColumn(current['column_state']);
          if(colHtml==".inProgressCol" || colHtml==".readyCol") {
              totalDuration = totalDuration + parseInt(current['duration']);;
              console.log("Total duration: "+totalDuration);
          }else{
              totalDuration = totalDuration + parseInt(current['duration']);;
              totalCompleted = totalCompleted + parseInt(current['duration']);;
              console.log("Total Completed: "+totalCompleted);
          }
        
      }
    });
      console.log("TotalDuration: "+totalDuration);
      console.log("TotalCompleted: "+totalCompleted);
      createSpeedChart(totalDuration,totalCompleted); 
  });
}


/*function getDurationFromSprint(id_sprint){
  $.get('http://trelloagilprueba.esy.es/agiltrello/api/getdetailsprint', {id_sprint}, function (data) {
    
    $.each(data, function (i, current) {
      //console.log(data);
        
      if(current['column_state']=="backlog"){
        //Do Nothing
      }else{
          
          console.log("Current duration: "+current['duration']);
          parseInt(current['duration']);
          var colHtml = getColumn(current['column_state']);
          if(colHtml=="inprogress" || colHtml=="ready") {
              console.log("Card in inprogress or ready.");
              totalDuration = totalDuration + parseInt(current['duration']);;
              console.log("Total duration: "+totalDuration);
          }else{
              totalDuration = totalDuration + parseInt(current['duration']);;
              totalCompleted = totalCompleted + parseInt(current['duration']);;
              console.log("Card in finished.");
              console.log("Total Completed: "+totalCompleted);
          }
        
      }
    });
      console.log("TotalDuration: "+totalDuration);
      console.log("TotalCompleted: "+totalCompleted);
      createSpeedChart(); 
  });

}*/

function createSpeedChart (totalDuration,totalCompleted) {
    var ctx = document.getElementById("speedChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Total","Completado"],
            datasets: [{
                label: 'Trabajo Completado',
                data: [totalDuration, totalCompleted],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

SpeedChart.prototype.destroyChart = function () {
	this.currentChart.destroy();
}
SpeedChart.prototype.getChart = function() {
	return this.currentChart;
}