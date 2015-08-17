<?php
/**
 * @file
 * views_pages_mini_panels.panels_default.inc
 */

/**
 * Implements hook_default_panels_mini().
 */
function views_pages_mini_panels_default_panels_mini() {
  $export = array();

  $mini = new stdClass();
  $mini->disabled = FALSE; /* Edit this to true to make a default mini disabled initially */
  $mini->api_version = 1;
  $mini->name = 'user_info';
  $mini->category = 'User';
  $mini->admin_title = 'User info';
  $mini->admin_description = '';
  $mini->requiredcontexts = array();
  $mini->contexts = array();
  $mini->relationships = array();
  $display = new panels_display();
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'ced67df6-39c5-4b0a-b947-cb7c6db537ed';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-dbf72793-43c9-41dd-8057-a2c1eae4202a';
    $pane->panel = 'center';
    $pane->type = 'views';
    $pane->subtype = 'user_info';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 1,
      'nodes_per_page' => '0',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'default',
      'override_title' => 0,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'dbf72793-43c9-41dd-8057-a2c1eae4202a';
    $display->content['new-dbf72793-43c9-41dd-8057-a2c1eae4202a'] = $pane;
    $display->panels['center'][0] = 'new-dbf72793-43c9-41dd-8057-a2c1eae4202a';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = 'new-dbf72793-43c9-41dd-8057-a2c1eae4202a';
  $mini->display = $display;
  $export['user_info'] = $mini;

  return $export;
}
