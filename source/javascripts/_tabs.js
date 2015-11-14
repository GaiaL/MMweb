(function($) {
  "strict";
  var $arrowTabs = $('.arrow-tabs');

  function loadTabContent() {
    var $this = $(this);
    $arrowTabs.attr('data-current-tab', $this.index() + 1);  // index start from 0
  }

  $arrowTabs.on('click', '.arrow-tab', function(e) {
    e.preventDefault();
    loadTabContent.call(this);
  });
})(jQuery);
