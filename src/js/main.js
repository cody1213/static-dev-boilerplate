$(function() {
  $('.nav-item-test-javascript').on("click", function() {
    var test = [true];
    var es = false;
    test.forEach(v => {
      es = v;
    }); 
    bootbox.alert("JavaScript is working and you "+(es?"can":"cannot")+" use ES2015 in the src folder.");
  })
  $('.menu-button').on('click', function() {
    $('.menu').animate({
      right: "0px"
    }, 500);

    $('body').animate({
      right: "100vw"
    }, 500);
  });

  /* Then push them back */
  $('.close-menu').on('click', function() {
    $('.menu').animate({
      right: "-100vw"
    }, 500);

    $('body').animate({
      right: "0px"
    }, 500);
  });
});