<?php
/**
 * @file
 * Default template for admin toolbar.
 *
 * Available variables:
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default value has the following:
 *   - toolbar: The current template type, i.e., "theming hook".
 * - $toolbar['toolbar_user']: User account / logout links.
 * - $toolbar['toolbar_menu']: Top level management menu links.
 * - $toolbar['toolbar_drawer']: A place for extended toolbar content.
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_toolbar()
 */
?>
<div id="devel_catcher" class="<?php print $classes; ?> overlay-displace-bottom clearfix">
  <div class="<?php echo $devel_catcher['devel_catcher_drawer_classes']; ?>">
    <div id="devel_catcher-handles">
    </div>
    <div id="devel_catcher-tabs">
    </div>

    <?php print render($devel_catcher['devel_catcher_drawer']); ?>
  </div>

  <div class="devel_catcher-menu clearfix">
    <?php if ($devel_catcher['devel_catcher_drawer']):?>
      <?php print render($devel_catcher['devel_catcher_toggle']); ?>
    <?php endif; ?>

    <div class="devel_catcher-snapshot">
      <p>&nbsp;</p>
    </div>
  </div>
</div>
<div id="devel_catcher_positioner" class="overlay-displace-bottom"></div>