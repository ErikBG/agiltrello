// Sidebar opening when window is resized fix.
$(document).ready(function () {
    
    var flag = true;
    var sidebar = $('#wrapper');

    $(window).resize(function(){

        if($(window).width()<768 && true){
            sidebar.removeClass('toggled');
            flag=false;
        }else{
            sidebar.addClass('toggled');
        }

    });

  /*  $('.iColumn').droppable({
	drop: function (event, ui) {
		$(ui.draggable).css('background-color','red');
         alert("lol");
     
	}
});*/
    /*
    $( ".card" ).draggable({
  stop: function( event, ui ) {
      alert("Dropped....");
  }
});
    
    
    $( ".iColumn" ).droppable({
  drop: function() {
    alert( "dropped" );
  }
});
    
    $( "#inprogress" ).droppable({
  drop: function() {
    alert( "dropped" );
  }
});
    $("#finished").droppable({
	drop: function (event, ui) {
        alert( "dropped" );
   // $(ui.draggable).css("background-color","yellow");
	}
});
      */

  /*  $("#finished").droppable({
     drop: function(event, ui) {
               // do something with the dock
              // $(this).doSomething();

               // do something with the draggable item
               $(ui.draggable).css('font-size','200%');
    
           }
});*/
    
    
    
   
  //  $('.iColumn').click( function() { alert('clicked'); });
    
 /*$('.card').on('click', function(){
     var cardId=$(this).attr('id');
    alert("Tarjeta ID: "+cardId);
});*/
    
    

    
    //var elemId = $(this).closest('div').attr('id');
    //var cardId=$(this).attr('id');
    
    
    //Block card function for current cards MUST BE MODIFIED ONCE "ADD CARD" FEATURE IS CREATED
    //Item1
    $('#blockBtn1').click(function() {
        var blockStatus = ($('#item1').attr('draggable'));
        $('.js--item1').toggleClass('blocked');
        $('#blockBtn1').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item1').attr('draggable', false);
          $('#item1').removeClass('card');     
        }else{
            $('#item1').attr('draggable', true);
            $('#item1').addClass('card');
        }
    });
    
    //Item2
    $('#blockBtn2').click(function() {
        var blockStatus = ($('#item2').attr('draggable'));
        $('.js--item2').toggleClass('blocked');
        $('#blockBtn2').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item2').attr('draggable', false);
            $('#item2').removeClass('card');
        }else{
            $('#item2').attr('draggable', true);
            $('#item2').addClass('card');
        }
    });
    //Item3
    $('#blockBtn3').click(function() {
        var blockStatus = ($('#item3').attr('draggable'));
        $('.js--item3').toggleClass('blocked');
        $('#blockBtn3').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item3').attr('draggable', false);
            $('#item3').removeClass('card');
        }else{
            $('#item3').attr('draggable', true);
            $('#item3').addClass('card');
        }
    });
    //Item4
    $('#blockBtn4').click(function() {
        var blockStatus = ($('#item4').attr('draggable'));
        $('.js--item4').toggleClass('blocked');
        $('#blockBtn4').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item4').attr('draggable', false);
            $('#item4').removeClass('card');
        }else{
            $('#item4').attr('draggable', true);
            $('#item4').addClass('card');
        }
    });
    //Item5
    $('#blockBtn5').click(function() {
        var blockStatus = ($('#item5').attr('draggable'));
        $('.js--item5').toggleClass('blocked');
        $('#blockBtn5').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item5').attr('draggable', false);
            $('#item5').removeClass('card');
        }else{
            $('#item5').attr('draggable', true);
            $('#item5').addClass('card');
        }
    });
    //Item6
    $('#blockBtn6').click(function() {
        var blockStatus = ($('#item6').attr('draggable'));
        $('.js--item6').toggleClass('blocked');
        $('#blockBtn6').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item6').attr('draggable', false);
            $('#item6').removeClass('card');
        }else{
            $('#item6').attr('draggable', true);
            $('#item6').addClass('card');
            
        }
    });
    
        

    
});

//Block card. 
function blockCard (n){
        var blockStatus = ($('#item'+n).attr('draggable'));
        $('.js--item'+n).toggleClass('blocked');
        $('#blockBtn'+n).toggleClass('unblocked');
        if(blockStatus=="true"){
          $('#item'+n).attr('draggable', false);
          $('#item'+n).removeClass('card');
        }else{
            $('#item'+n).attr('draggable', true);
            $('#item'+n).addClass('card');
        }
    }

function checkColumn () {
    $('#1').click(function(){
    var elemId = $(this).closest('div').attr('id');
    alert("elemId: "+elemId);
});
}

function callAlert() {
    alert("Called Alert");
}
