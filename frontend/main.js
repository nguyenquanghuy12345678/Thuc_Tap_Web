(function($) {
  "use strict";

  // Mobile dropdown
  $('.has-dropdown>a').on('click', function() {
    $(this).parent().toggleClass('active');
  });

  // Aside Nav
  $(document).click(function(event) {
    if (!$(event.target).closest($('#nav-aside')).length) {
      if ($('#nav-aside').hasClass('active')) {
        $('#nav-aside').removeClass('active');
        $('#nav').removeClass('shadow-active');
      } else {
        if ($(event.target).closest('.aside-btn').length) {
          $('#nav-aside').addClass('active');
          $('#nav').addClass('shadow-active');
        }
      }
    }
  });

  $('.nav-aside-close').on('click', function() {
    $('#nav-aside').removeClass('active');
    $('#nav').removeClass('shadow-active');
  });

  $('.search-btn').on('click', function() {
    $('#nav-search').toggleClass('active');
  });

  $('.search-close').on('click', function() {
    $('#nav-search').removeClass('active');
  });

  // Parallax Background
  $.stellar({
    responsive: true
  });

  // Smooth scroll for nav links
  $('a.nav-link[href*="#"]').not('[href="#"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && location.hostname == this.hostname
    ) {
      event.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
})(jQuery);