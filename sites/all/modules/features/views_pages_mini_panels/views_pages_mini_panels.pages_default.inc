<?php
/**
 * @file
 * views_pages_mini_panels.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function views_pages_mini_panels_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'user_view__user_page';
  $handler->task = 'user_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'User page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'user-page',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'user_page',
  );
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
  $display->uuid = '9a4af469-9add-4656-8ad1-53283baa24b4';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-4f3fbe12-d336-48a9-adc5-cedb985f7373';
    $pane->panel = 'center';
    $pane->type = 'user_picture';
    $pane->subtype = 'user_picture';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_entity_id:user_1',
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
    $pane->uuid = '4f3fbe12-d336-48a9-adc5-cedb985f7373';
    $display->content['new-4f3fbe12-d336-48a9-adc5-cedb985f7373'] = $pane;
    $display->panels['center'][0] = 'new-4f3fbe12-d336-48a9-adc5-cedb985f7373';
    $pane = new stdClass();
    $pane->pid = 'new-6f7c22f8-5361-4271-8d02-6474fb07a6a5';
    $pane->panel = 'center';
    $pane->type = 'token';
    $pane->subtype = 'user:name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'sanitize' => 1,
      'context' => 'argument_entity_id:user_1',
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
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '6f7c22f8-5361-4271-8d02-6474fb07a6a5';
    $display->content['new-6f7c22f8-5361-4271-8d02-6474fb07a6a5'] = $pane;
    $display->panels['center'][1] = 'new-6f7c22f8-5361-4271-8d02-6474fb07a6a5';
    $pane = new stdClass();
    $pane->pid = 'new-0441d383-5800-465d-b340-bc68dea09198';
    $pane->panel = 'center';
    $pane->type = 'entity_field';
    $pane->subtype = 'user:field_second_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_plain',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:user_1',
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '0441d383-5800-465d-b340-bc68dea09198';
    $display->content['new-0441d383-5800-465d-b340-bc68dea09198'] = $pane;
    $display->panels['center'][2] = 'new-0441d383-5800-465d-b340-bc68dea09198';
    $pane = new stdClass();
    $pane->pid = 'new-817fb705-c75c-4d74-bfa6-4d46c84a0ff8';
    $pane->panel = 'center';
    $pane->type = 'entity_field';
    $pane->subtype = 'user:field_country';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'taxonomy_term_reference_link',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:user_1',
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '817fb705-c75c-4d74-bfa6-4d46c84a0ff8';
    $display->content['new-817fb705-c75c-4d74-bfa6-4d46c84a0ff8'] = $pane;
    $display->panels['center'][3] = 'new-817fb705-c75c-4d74-bfa6-4d46c84a0ff8';
    $pane = new stdClass();
    $pane->pid = 'new-6605f886-2648-40a9-b8b0-33e55475a993';
    $pane->panel = 'center';
    $pane->type = 'entity_field';
    $pane->subtype = 'user:field_city';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'taxonomy_term_reference_link',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:user_1',
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '6605f886-2648-40a9-b8b0-33e55475a993';
    $display->content['new-6605f886-2648-40a9-b8b0-33e55475a993'] = $pane;
    $display->panels['center'][4] = 'new-6605f886-2648-40a9-b8b0-33e55475a993';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-4f3fbe12-d336-48a9-adc5-cedb985f7373';
  $handler->conf['display'] = $display;
  $export['user_view__user_page'] = $handler;

  return $export;
}
