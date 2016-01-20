$(function() {
  $('.nav-item-test-javascript').on("click", function() {
    var test = [true];
    var es = false;
    test.forEach(v => {
      es = v;
    });
    bootbox.alert("JavaScript is working and ES2015 status is: "+es);
  })
});