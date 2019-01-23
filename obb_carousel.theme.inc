<?php
function template_preprocess_obb_carousel(&$vars) {
    
    //make sure bootstrap is loaded ?
    $carousel = $vars['carousel'];
    $vars['items'] = array();
    $vars['carousel_id'] = $carousel['#carousel_id'];
  // Wrap items in ding_carousel_item.
  foreach ($carousel['#items'] as $item) {
    $vars['items'][] = array(
      '#type' => 'obb_carousel_item',
      '#content' => $item,
    );
  }
}

function template_preprocess_obb_tabbed_carousel(&$vars)
{
    
    $tabbed_carousel = $vars['tabbed_carousel'];

    $vars['tabs'] = array();
    foreach ($tabbed_carousel['#tabs'] as $index => $tab) {
      if ($index !== 0) {
        $tab['#hidden'] = TRUE;
      }
      $vars['tabs'][] = $tab;
    }

    $vars['transition'] = $tabbed_carousel['#transition'];
}

/**
 * Preprocess variables for ding_carousel_item.tpl.php.
 */
function template_preprocess_obb_carousel_item(&$vars) {
    
  $item = $vars['item'];
  $vars['itemwidth_percentage'] = (100/9);
  if ($item['#placeholder']) {
    $vars['classes_array'][] = 'placeholder';
  }

  $content = array(
    '#type' => 'markup',
    '#markup' => '<span class="icon-spinner"></span>',
  );

  $vars['content'] = !empty($item['#content']) ? $item['#content'] : $content;
}