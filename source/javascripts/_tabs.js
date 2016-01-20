(function($) {
  "strict";
  var $arrowTabs = $('.arrow-tabs');

  function loadTabContent() {
    var $this = $(this),
        url = $this.find('a').attr('href');
    $arrowTabs.attr('data-current-tab', $this.index() + 1);  // index start from 0
    $('<div>').load(url, function() {
      var $this = $(this),
          page_title = $this.find('#_page_title').text();
      document.title = page_title;
      history.pushState(null, page_title, url);
      $('.main-content').replaceWith($this.find('.main-content'));
      $(window).trigger('_tabload');
    });
  }

  $arrowTabs.on('click', '.arrow-tab', function(e) {
    e.preventDefault();
    $('a').each(function() {
      var $this = $(this),
          url = $this.attr('href');
      if (url[0] !== '#') {
        $this.attr('href', getAbsoluteUrl(url));
      }
    });
    loadTabContent.call(this);
  });

  var getAbsoluteUrl = (function() {
    var a;
    return function(url) {
      if(!a) {
        a = document.createElement('a');
      }
      a.href = url;
      return a.href;
    };
  })();
})(jQuery);
