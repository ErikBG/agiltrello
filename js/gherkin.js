function test_situation(str){
var patt = /(GIVEN|given|Given)(\s)(.*?)(\s)(WHEN|when|When)(\s)(.*?)(\s)(THEN|then|Then)(\s)(.*?)/g;
var res = patt.exec(str);
var status = false;
if (res !== null) {
$("#gherkin_div").removeClass("has-error ").addClass("has-success ");
 status = true;
}
else{
 alert ("Sintaxis incorrecta");
 $("#gherkin_div").addClass("has-error");
}
console.log(status);
}
