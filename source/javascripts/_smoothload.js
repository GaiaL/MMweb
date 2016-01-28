(function($) {
  "strict";
  var $body = $(document.body),
      _smoothLoadCaches = {},
      _smoothLoadHandlers = {};

  window.addSmoothLoadHandler = function addSmoothLoadHandler(selector, callback) {
    if (selector in _smoothLoadHandlers) {
      _smoothLoadHandlers[selector].push(callback);
    }
    else {
      _smoothLoadHandlers[selector] = [callback];
    }
  };

  function loadContent() {
    var $this = $(this),
        url = getAbsoluteUrl($this.attr('href'));
    //$arrowTabs.attr('data-current-tab', $this.index() + 1);  // index start from 0

    var loadCallback = function() {
      var $this = $(this),
          page_title = $this.find('title').text();
      document.title = page_title;

      $.each(_smoothLoadHandlers, function(selector, callbacks) {
        var oldContent = $(selector).get(0),
            newContent = $this.find(selector).get(0);
        if (oldContent) {
          $.each(callbacks, function(_, cb) {
            cb.call(oldContent, newContent);
          });
        }
      });

      history.pushState(null, page_title, url);
      $(window).trigger('smoothload');
      if (window.onload && typeof(window.onload) == 'function') {
        window.onload();
      }
    };

    if (url in _smoothLoadCaches) {
      var data = _smoothLoadCaches[url];
      $('<div>').html(data).each(loadCallback);
    }
    else {
      $.get(url).success(function(data) {
        data = data.replace(/<script.*? src=.+?><\/script>/g, '');
        data = data.replace(/<link.*? rel="stylesheet".*?>/g, '');
        data = data.split(/<body/);
        data[0] = data[0].replace(/<script.*?>[\s\S]*?<\/script>/g, '');
        data = data.join('<body');
        _smoothLoadCaches[url] = data;
        $('<div>').html(data).each(loadCallback);
      });
    }

  }

  var getAbsoluteUrl = (function() {
    var a;
    return function getAbsoluteUrl(url) {
      if(!a) {
        a = document.createElement('a');
      }
      a.href = url;
      return a.href;
    };
  })();

  function replaceOnly(newContent) {
    $(this).replaceWith(newContent);
  }
  addSmoothLoadHandler('meta[name="x-unique-key"]', replaceOnly);
  addSmoothLoadHandler('link[rel="canonical"]', replaceOnly);
  addSmoothLoadHandler('header', replaceOnly);
  addSmoothLoadHandler('footer', replaceOnly);
  addSmoothLoadHandler('article', function(newContent) {
    var $this = $(this),
        $new = $(newContent);

    $this.find('a:internal').each(function() {
      var $this = $(this),
          url = $this.attr('href');
      if (url[0] !== '#') {
        $this.attr('href', getAbsoluteUrl(url));
      }
    });

    if ($this.find('section.hero-container').length === 1 &&
        $new.find('section.hero-container').length === 1) {
      $this.find('section.arrow-tabs').attr(
        'data-current-tab', $new.find('section.arrow-tabs').data('current-tab'));
      $this.find('section.main-content').replaceWith($new.find('section.main-content'));
    }
    else {
      $this.replaceWith(newContent);
    }
  });

  // create a custom internal selector for finding internal links
  // inspired by http://stackoverflow.com/a/18042302/2644759
  $.expr[':'].internal = function(obj) {
    return (
      !$(obj).attr('target')
      &&
      obj.hostname == location.hostname)
  };

  $body.on('click', 'a:internal', function(e) {
    e.preventDefault();
    loadContent.call(this);
  });

  $(window).on('load', function() {
    $(this).trigger('smoothload');
  });

})(jQuery);
