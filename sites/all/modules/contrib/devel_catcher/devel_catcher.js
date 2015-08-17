(function ($) {

/**
 * Attach toggling behavior and notify the overlay of the catcher.
 */
Drupal.behaviors.devel_catcher = {
  attach: function(context) {
    // Set the initial state of the catcher.
    $('#devel_catcher', context).once('devel_catcher', Drupal.devel_catcher.init);

    // Toggling catcher drawer.
    $('#devel_catcher a.toggle', context).once('devel_catcher-toggle').click(function(e) {
      Drupal.devel_catcher.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });

    Drupal.devel_catcher.wrap_devel();
    Drupal.devel_catcher.handle_overlay();
    Drupal.devel_catcher.make_selection();
  }
};

Drupal.devel_catcher = Drupal.devel_catcher || {
  needsOverlayExpand: false
};

Drupal.devel_catcher.handle_query_text = function(query_element) {
  var query = query_element.text().replace('Queries exceeding 5 ms are highlighted. ', '');
  $('.devel_catcher-snapshot p').replaceWith('<p>' + query + '</p>');
  query_element.hide();
};

Drupal.devel_catcher.handle_query_log = function(query_log_elements, ctx) {
  if (query_log_elements.length) {
    query_log_elements.wrapAll('<div class="devel_catcher-tab" id="devel_catcher-tab-querylog"><div class="devel-querylog-wrapper"></div></div>');
    $(ctx).find('.devel-querylog-wrapper').prepend('<div class="devel-querylog-filter"></div>');
    $('#devel_catcher-tabs').append($(ctx).find('#devel_catcher-tab-querylog'));
    $('#devel_catcher-handles').append('<div class="devel_catcher-tab-handle"><a href="#devel_catcher-tab-querylog">Query Log</a></div>');

    Drupal.devel_catcher.make_filterable();
    Drupal.devel_catcher.make_sortable();
    Drupal.devel_catcher.make_searchable();
  }
}

/**
 * Pull devel content out of the overlay and feed it in to the catcher.
 */
Drupal.devel_catcher.overlay_devel = function() {
  // Get rid of old tabs.
  $('#devel_catcher-tabs').text('');
  $('#devel_catcher-handles').text('');

  // Load the dev-query div, grab the text from it then remove it from the DOM.
  var query_element = $('.overlay-active').contents().find('.dev-query');
  Drupal.devel_catcher.handle_query_text(query_element);
  $(query_element).remove();

  var query_log_elements = $('.overlay-active').contents().find('.devel-querylog');
  Drupal.devel_catcher.handle_query_log(query_log_elements, $('.overlay-active').contents());

  // Make sure a tab is selected.
  Drupal.devel_catcher.make_selection();

  // The catcher was expanded before clicking an overlay link, expand it again.
  if (Drupal.devel_catcher.needsOverlayExpand) {
    Drupal.devel_catcher.expand();
  }
};

Drupal.devel_catcher.wrap_devel = function() {
  Drupal.devel_catcher.handle_query_text($('.dev-query'));
  Drupal.devel_catcher.handle_query_log($('.devel-querylog'), document);

  if (Drupal.settings.devel_catcher
      && typeof Drupal.settings.devel_catcher.context_output === "string"
      && Drupal.settings.devel_catcher.context_output.length) {
    $('#devel_catcher-tabs').append('<div class="devel_catcher-tab" id="devel_catcher-tab-context"><div class="devel-context-wrapper">' + Drupal.settings.devel_catcher.context_output + '</div></div>');
    $('#devel_catcher-handles').append('<div class="devel_catcher-tab-handle"><a href="#devel_catcher-tab-context">Context</a></div>');
  }

  if (Drupal.settings.devel_catcher
      && typeof Drupal.settings.devel_catcher.node_access_output === "string"
      && Drupal.settings.devel_catcher.node_access_output.length) {
    $('#devel_catcher-tabs').append('<div class="devel_catcher-tab" id="devel_catcher-tab-node_access"><div class="devel-node_access-wrapper">' + Drupal.settings.devel_catcher.node_access_output + '</div></div>');
    $('#devel_catcher-handles').append('<div class="devel_catcher-tab-handle"><a href="#devel_catcher-tab-node_access">Node Access</a></div>');
  }

  /*
  // Prototype populating tabs via AJAX.
  if (typeof Drupal.settings.devel_catcher.node_access_output === "boolean"
      && Drupal.settings.devel_catcher.node_access_output) {
    $.ajax({
      url: '/devel_catcher/block/devel_node_access/dna_node',
      beforeSend: function ( xhr ) {
        xhr.setRequestHeader('Content-Type', 'plain');
      },
      success: function(data) {
        //console.log(data);
      }
    });
  }
  */
};

Drupal.devel_catcher.make_filterable = function() {
  var opts = {};
  var key  = '';
  var options = [];
  var time = 0;

  $('.cell-3 a').each(function() {
    key = $(this).text();
    opts[key] = (typeof opts[key] === 'undefined') ? 1 : opts[key] + 1;
  });

  options.push('<option value="All">All</option>');

  for (var k in opts) {
    if (opts.hasOwnProperty(k)) {
      options.push('<option value="' + k + '">' + k + ' (' + opts[k] + ')</option>');
    }
  }

  $('.devel-querylog-filter').append('<label for="querylog-filter">Filter by:</label><select name="querylog-filter" class="querylog-filter-input" id="querylog-filter">' + options.join('') + '</select><span id="querylog-filter-timer"></span>');
  $('#querylog-filter').bind('change', function() {
    time = 0;
    var target = $(this).val();
    if (target === 'All') {
      $('.devel-querylog').show();
      $('#querylog-filter-timer').html('');
    } else {
      $('.devel-querylog').each(function() {
        if ($(this).find('.cell-3 a').text() != target) {
          $(this).not('.devel-querylog-header').hide();
        } else {
          time += parseFloat($(this).find('.cell-1').text());
          $(this).show();
        }
      });
      $('#querylog-filter-timer').html('&nbsp;' + time.toPrecision(2) + ' ms');
    }
  });
};

Drupal.devel_catcher.make_sortable = function() {
  var list = $('.devel-querylog-wrapper');
  $('.devel-querylog-header .cell-1, .devel-querylog-header .cell-2, .devel-querylog-header .cell-3')
    .wrapInner('<span style="cursor:pointer;" alt="sort this column" title="sort this column"/>')
    .each(function(){
      var th = $(this),
          thIndex = th.index(),
          inverse = false;
      th.click(function() {
        list.find('.devel-querylog-odd > div, .devel-querylog-even > div').filter(function() {
          return $(this).index() === thIndex;
        }).sortElements(function(a, b){
          var a = (parseInt($.text([a]))) ? parseInt($.text([a])) : $.text([a]).toLowerCase();
          var b = (parseInt($.text([b]))) ? parseInt($.text([b])) : $.text([b]).toLowerCase();
          return a > b ?
            inverse ? -1 : 1
          : inverse ? 1 : -1;
        }, function(){
          // parentNode is the element we want to move
          return this.parentNode;
        });
        inverse = !inverse;
      });
  });
};

Drupal.devel_catcher.make_searchable = function() {
  $('.devel-querylog-filter').append('<label for="querylog-search">Search for:</label><input name="querylog-search" class="querylog-filter-input" id="querylog-search" />');
  $('#querylog-search').bind('change', function() {
    var value = $(this).val();
    if (value.length) {
      $('.devel-querylog-odd, .devel-querylog-even').hide();

      $('.devel-querylog-wrapper').find('.devel-querylog-odd > div, .devel-querylog-even > div').each(function() {
        if (!!~$(this).text().toLowerCase().indexOf(value.toLowerCase())) {
          $(this).parent().show();
        }
      });
    }
    else {
      $('.devel-querylog-odd, .devel-querylog-even').show();
    }
  });
};

Drupal.devel_catcher.make_selection = function() {
  var hash = window.location.hash;

  // Hide all the tab contents.
  $('.devel_catcher-tab').not(':hidden').hide();

  // If there's a URI hash that coincides with a tab make that one active.
  if ($(hash).length > 0) {
    Drupal.devel_catcher.expand();
    $(hash).show();
    $('a[href=' + hash + ']').addClass('active');
  }
  // Make the first tab active otherwise.
  else {
    $('div.devel_catcher-tab').first().show();
    $('div.devel_catcher-tab-handle').first().children('a').addClass('active');
  }

  // Make the tabs work.
  $('div.devel_catcher-tab-handle a').click(function(evt) {
    evt.preventDefault();
    var tab = $(this).attr('href');
    if ($(tab).length > 0) {
      // Change the active tab.
      $('div.devel_catcher-tab-handle a.active').removeClass('active');
      $(this).addClass('active');

      // Hide the old tab and show the new tab.
      $('.devel_catcher-tab').not(':hidden').hide();
      $(tab).show();
    }
  });
};

/**
 * This function makes devel_catcher play nice with the overlay by checking to
 * see if it's present on the page or being loaded as a result of a click on an
 * admin menu link.
 */
Drupal.devel_catcher.handle_overlay = function() {
  // Local function which does some set up then starts waiting for the overlay.
  var check_overlay_content = function() {
    // Let the user know what's happening.
    $('.devel_catcher-snapshot p').replaceWith('<p>Waiting for overlay...</p>');

    if (!$('#devel_catcher div.devel_catcher-drawer').hasClass('collapsed')) {
      Drupal.devel_catcher.collapse();
      Drupal.devel_catcher.needsOverlayExpand = true;
    }

    // Let the overlay know that it needs to refresh the page when closed.
    Drupal.overlay.refreshPage = true;
  };

  // In this case, the overlay is already open, i.e. a page refresh.
  if (typeof Drupal.overlay != "undefined" && Drupal.overlay.isOpen) {
    check_overlay_content();
  }
  // Listen for the overlay opening.
  else {
    $(document).bind('drupalOverlayBeforeLoad', function() {
      check_overlay_content();
    });
  }

  $(document).bind('drupalOverlayLoad', Drupal.devel_catcher.overlay_devel);
};

/**
 * Retrieve last saved cookie settings and set up the initial catcher state.
 */
Drupal.devel_catcher.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.devel_catcher.collapsed');

  // Expand or collapse the catcher based on the cookie value.
  if (collapsed == 1) {
    Drupal.devel_catcher.collapse();
  }
  else {
    Drupal.devel_catcher.expand();
  }
};

/**
 * Collapse the catcher.
 */
Drupal.devel_catcher.collapse = function() {
  Drupal.devel_catcher.needsOverlayExpand = false;

  var toggle_text = Drupal.t('Show devel catcher');
  $('#devel_catcher div.devel_catcher-drawer').addClass('collapsed');
  $('#devel_catcher a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('devel_catcher-drawer').css('paddingBottom', Drupal.devel_catcher.height());
  $.cookie(
    'Drupal.devel_catcher.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the catcher.
 */
Drupal.devel_catcher.expand = function() {
  var toggle_text = Drupal.t('Hide devel shortcut');
  $('#devel_catcher div.devel_catcher-drawer').removeClass('collapsed');
  $('#devel_catcher a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('devel_catcher-drawer').css('paddingBottom', Drupal.devel_catcher.height());
  $.cookie(
    'Drupal.devel_catcher.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the catcher.
 */
Drupal.devel_catcher.toggle = function() {
  if ($('#devel_catcher div.devel_catcher-drawer').hasClass('collapsed')) {
    Drupal.devel_catcher.expand();
  }
  else {
    Drupal.devel_catcher.collapse();
  }
};

Drupal.devel_catcher.height = function() {
  var height = $('#devel_catcher').outerHeight();
  // In IE, Shadow filter adds some extra height, so we need to remove it from
  // the returned height.
  if ($('#devel_catcher').css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) {
    height -= $('#devel_catcher').get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);