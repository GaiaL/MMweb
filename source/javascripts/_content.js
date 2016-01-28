(function($) {
  "strict";
  $(window).on('smoothload', function() {
    $('.general-content').find('.collapsible').each(function() {
      var $this = $(this),
          $more = $('<a class="collapsible-more" href="#">[more]</a>');
      $this.prev().append($more);
    });

    $('#rbox-loader-script').each(function() {
      var url_prefix = '//w.recruiterbox.com/static/client-src-served/widget/',
          client_id = 43199;

      if (!window._rbox) {
        window._rbox = {
          host_protocol: document.location.protocol,
          ready: function(cb) {
            this.onready = cb;
          }
        };
        $.getScript(url_prefix + client_id + '/rbox_api.js');
      }

      window._rbox_exec_impl = false;
      $.getScript(url_prefix + client_id + '/rbox_impl.js');

      var expand_hash = $(this).data('expand-hash');
      if (expand_hash) {
        location.hash = expand_hash;
      }

    });

    $('meta[name="x-unique-key"]').each(function() {
      var page_unique_key = JSON.stringify($(this).prop('content'));
      $('.main-content-sidebar a').removeClass('current');
      $('.main-content-sidebar a[data-unique-key=' + page_unique_key + ']')
      .addClass('current');
    });

  });

  $(document.body).on('click', 'a.collapsible-more', function(e) {
    var $this = $(this),
        $target = $this.parent().next();
    $target.toggleClass('expanded');
    e.preventDefault();
  });
})(jQuery);
