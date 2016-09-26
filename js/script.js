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
    
});