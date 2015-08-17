<?php
/**
 * @file
 * Contains the Reply class.
 */

/**
 * Implements Class Reply.
 */
class Reply extends Entity {

  /**
   * Determines the publication status.
   *
   * @var int
   */
  public $status = REPLY_STATUS_ENABLED;

  /**
   * Determines whether the Reply is deleted.
   *
   * @var int
   */
  public $deleted = 0;

  /**
   * Permanently saves the entity.
   *
   * @see entity_save()
   */
  public function save() {

    // In case created timestamp is missing we create it.
    if (!isset($this->created) || empty($this->created)) {
      $this->created = REQUEST_TIME;
    }

    // If we are creating a new entity we need to prepare other entities
    // by changing their position so the new entity could be attached
    // at the end of list or put within the list.
    reply_positions_add($this);

    // We always save timestamp of last action.
    $this->changed = REQUEST_TIME;

    return entity_get_controller($this->entityType)->save($this);
  }
}
