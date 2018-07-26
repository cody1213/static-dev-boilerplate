'use strict'

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  $('.menu-button').on('click', function() {
    $('.nav-menu').animate({
      right: "0px"
    }, 500);

    $('body').animate({
      right: "100vw"
    }, 500);
  });

  /* Then push them back */
  $('.close-menu').on('click', function() {
    $('.nav-menu').animate({
      right: "-100vw"
    }, 500);

    $('body').animate({
      right: "0px"
    }, 500);
  });

  //mixitup
  var containerEl = document.querySelectorAll('.mixitup');
  if (typeof mixitup !== "undefined" && containerEl && containerEl.length) {
    var mixer = mixitup(containerEl, {})
  }
})