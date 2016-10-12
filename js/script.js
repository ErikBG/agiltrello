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

    //Block card function for current cards MUST BE MODIFIED ONCE "ADD CARD" FEATURE IS CREATED
    //Item1
    $('#blockBtn1').click(function() {
        var blockStatus = ($('#item1').attr('draggable'));
        $('.js--item1').toggleClass('blocked');
        $('#blockBtn1').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item1').attr('draggable', false);
        }else{
            $('#item1').attr('draggable', true);
        }
    });
    //Item2
    $('#blockBtn2').click(function() {
        var blockStatus = ($('#item2').attr('draggable'));
        $('.js--item2').toggleClass('blocked');
        $('#blockBtn2').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item2').attr('draggable', false);
        }else{
            $('#item2').attr('draggable', true);
        }
    });
    //Item3
    $('#blockBtn3').click(function() {
        var blockStatus = ($('#item3').attr('draggable'));
        $('.js--item3').toggleClass('blocked');
        $('#blockBtn3').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item3').attr('draggable', false);
        }else{
            $('#item3').attr('draggable', true);
        }
    });
    //Item4
    $('#blockBtn4').click(function() {
        var blockStatus = ($('#item4').attr('draggable'));
        $('.js--item4').toggleClass('blocked');
        $('#blockBtn4').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item4').attr('draggable', false);
        }else{
            $('#item4').attr('draggable', true);
        }
    });
    //Item5
    $('#blockBtn5').click(function() {
        var blockStatus = ($('#item5').attr('draggable'));
        $('.js--item5').toggleClass('blocked');
        $('#blockBtn5').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item5').attr('draggable', false);
        }else{
            $('#item5').attr('draggable', true);
        }
    });
    //Item6
    $('#blockBtn6').click(function() {
        var blockStatus = ($('#item6').attr('draggable'));
        $('.js--item6').toggleClass('blocked');
        $('#blockBtn6').toggleClass('unblocked');

        if(blockStatus=="true"){
          $('#item6').attr('draggable', false);
        }else{
            $('#item6').attr('draggable', true);
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
        }else{
            $('#item'+n).attr('draggable', true);
        }
    }


