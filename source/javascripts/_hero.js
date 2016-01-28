(function($) {
  "strict";
  $(window).on('smoothload', function() {
    $('.hero-container:not(.slick-slider)').slick({
      dots: true,
      pauseOnDotsHover: true,
      autoplay: true,
      autoplaySpeed: 4200
    });
  });
})(jQuery);
