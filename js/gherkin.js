function test_situation(str){
var patt = /(GIVEN|given|Given)(\s)(.*?)(\s)(WHEN|when|When)(\s)(.*?)(\s)(THEN|then|Then)(\s)(.*?)/g;
var res = patt.exec(str);
var status = false;
  if (res !== null) {
    status = true;
  }
console.log(status);
}
