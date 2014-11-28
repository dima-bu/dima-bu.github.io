    $(document).ready(function() {
  
if ($(document.body).hasClass("grey-title-page") ) {
    
var h = $('#content').height();
var h2 =(Math.ceil(h/7)*7);
$('#content').outerHeight(h2);
}  else {

if ($(document.body).hasClass("contact-page") ) {
    
} else {

var h3 = $('#content').height();
var h4 =(Math.ceil(h3/7)*7)+1;
$('#content').outerHeight(h4);
}
}
    });