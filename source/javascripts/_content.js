(function($) {
  "strict";
  $(window).on('load _tabload', function() {
    $('.general-content').find('.collapsible').each(function() {
      var $this = $(this),
          $more = $('<a class="collapsible-more" href="#">[more]</a>');
      $this.prev().append($more);
    });

    $('#rbox-loader-script').each(function() {
      if (!window._rbox) {
        var url_prefix = '//w.recruiterbox.com/static/client-src-served/widget/',
            client_id = 43199;

        window._rbox = {
          host_protocol: document.location.protocol,
          ready: function(cb) {
            console.log(cb);
            this.onready = cb;
          }
        };

        $.each(['/rbox_api.js', '/rbox_impl.js'], function(idx, name) {
          $.getScript(url_prefix + client_id + name);
        });
      }

      var expand_hash = $(this).data('expand-hash');
      if (expand_hash) {
        location.hash = expand_hash;
      }

    });

  });
  $('body').on('click', 'a.collapsible-more', function(e) {
    var $this = $(this),
        $target = $this.parent().next();
    $target.toggleClass('expanded');
    e.preventDefault();
  });
})(jQuery);
