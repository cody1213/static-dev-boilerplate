$(function() {
  $('.nav-item-test-javascript').on("click", function() {
    var test = [true];
    var es = false;
    test.forEach(v => {
      es = v;
    });
    bootbox.alert("JavaScript is working and you "+(es?"can":"cannot")+" use ES2015 in the src folder.");
  })
});