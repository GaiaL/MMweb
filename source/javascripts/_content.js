(function($) {
  "strict";
  $(window).on('load _tabload', function() {
    $('.general-content').find('.collapsible').each(function() {
      var $this = $(this),
          $more = $('<a class="collapsible-more" href="#">[more]</a>');
      $this.prev().append($more);
    });
  });
  $('body').on('click', 'a.collapsible-more', function(e) {
    var $this = $(this),
        $target = $this.parent().next();
    $target.toggleClass('expanded');
    e.preventDefault();
  });
})(jQuery);
