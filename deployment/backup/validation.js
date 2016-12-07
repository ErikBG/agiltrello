var name_signup_valid = false;
var lastname_signup_valid = false;
var email_signup_valid = false;
var password_signup_valid=false;
var  password2_signup_valid=false;
var email_login_valid = false;
var password_login = false;

////////////////////////Sign up
$(document).ready(function () {
      $("#name_signup").focusout(function () {
      var name = $("#name_signup").val();
      var reg = /^([a-z ñáéíóú]{2,18})$/i;

      if(reg.test(name)) {
     $("#error_name").hide();
     $("#empty_name").hide();
    name_signup_valid=true;

   }else if (name==""){
     $("#error_name").hide();
     $("#empty_name").show();
   name_signup_valid=false;

   }else{
          $("#empty_name").hide();
          $("#error_name").show();
          name_signup_valid=false;
        }
    });
  });
  $(document).ready(function () {
        $("#lastname_signup").focusout(function () {
        var lastname = $("#lastname_signup").val();
        var reg = /^([a-z ñáéíóú]{2,25})$/i;
        if(reg.test(lastname) ) {
          $("#error_lastname").hide();
         $("#empty_lastname").hide();
         lastname_signup_valid=true;
     }else if (lastname==""){
       $("#error_lastname").hide();
       $("#empty_lastname").show();
       lastname_signup_valid=false;
     }else{
            $("#empty_lastname").hide();
            $("#error_lastname").show();
            lastname_signup_valid=false;
          }
      });
    });

    $(document).ready(function () {
          $("#email_signup").focusout(function () {
          var email = $("#email_signup").val();
          var reg = /^([a-z0-9.@_]{5,60})$/i;
          var i=false;
          var a=0;
         if(reg.test(email)) {
         
            $("#error_email").hide();
           $("#empty_email").hide();
           email_signup_valid=true;
       }else if (email==""){
         $("#error_email").hide();
         $("#empty_email").show();
         email_signup_valid=false;
       }else{
              $("#empty_email").hide();
              $("#error_email").show();
              email_signup_valid=false;
            }
        });
      });
      $(document).ready(function () {
            $("#password_signup").focusout(function () {
            var password = $("#password_signup").val();
            if(password.length>7 ) {
              $("#error_password").hide();
             $("#empty_password").hide();
             password_signup_valid=true;
         }else if (password==""){
           $("#error_password").hide();
           $("#empty_password").show();
        password_signup_valid=false;
         }else{
                $("#empty_password").hide();
                $("#error_password").show();
                password_signup_valid=false;
              }
          });
        });
        $(document).ready(function () {
              $("#password2_signup").focusout(function () {
              var password2 = $("#password2_signup").val();
              var password = $("#password_signup").val();
              if(password2==password ) {
                $("#error_password2").hide();
               $("#empty_password2").hide();
               password2_signup_valid=true;
           }else if (password2==""){
             $("#error_password2").hide();
             $("#empty_password2").show();
          password2_signup_valid=false;
           }else{
                  $("#empty_password2").hide();
                  $("#error_password2").show();
                  password2_signup_valid=false;
                }
            });
          });


//login

$(document).ready(function () {
      $("#email").focusout(function () {
      var email = $("#email").val();
      var reg = /^([a-z0-9.@_]{5,60})$/i;
      var i=0;
      if(reg.test(email) ) {

        $("#error_email_login").hide();
       $("#empty_email_login").hide();
       email_login_valid=true;
   }else if (email==""){
     $("#error_email_login").hide();
     $("#empty_email_login").show();
     email_login_valid=false;
   }else{
          $("#empty_email_login").hide();
          $("#error_email_login").show();
          email_login_valid=false;
        }
    });
  });
  $(document).ready(function () {
        $("#pwd").focusout(function () {
        var password = $("#pwd").val();
        if(password.length>7 ) {
          $("#error_password_login").hide();
         $("#empty_password_login").hide();
         password_login_valid=true;
     }else if (password==""){
       $("#error_password_login").hide();
       $("#empty_password_login").show();
    password_login_valid=false;
     }else{
            $("#empty_password_login").hide();
            $("#error_password_login").show();
            password_login_valid=false;
          }
      });
    });


