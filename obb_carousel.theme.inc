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
    drupal_add_js('https://cdn.jsdelivr.net/npm/vanilla-lazyload@10.19.0/dist/lazyload.min.js','external');
    drupal_add_js(array(
    'obb_tabbed_carousel' => array(
      'material_preloader' => '<div class="item">' . theme('obb_carousel_preloader') . "</div>",
    ),
  ), 'setting');
}

/**
 * Preprocess variables for ding_carousel_item.tpl.php.
 */
function template_preprocess_obb_carousel_item(&$vars) {
  $settings = obb_carousel_init_settings();
  
  $item = $vars['item'];
  $vars['itemwidth_percentage'] = (100/($settings['chunk_size']+1)); //we need this count from somewhere
  if ($item['#placeholder']) {
    $vars['classes_array'][] = 'placeholder';
  }

  $content = array(
    '#type' => 'markup',
    '#markup' => '<span class="icon-spinner"></span>',
  );

  $vars['content'] = !empty($item['#content']) ? $item['#content'] : $content;
}
/*
 * 
 */
function template_preprocess_obb_carousel_preloader(&$vars) {
   $settings = obb_carousel_init_settings();
   
   $vars['itemwidth_percentage'] = (100/($settings['chunk_size']+1)); //we need this count from somewhere
}
/*
 * 
 * 
 */
function template_preprocess_obb_carousel_cover_lazy(&$variables)
{
    $object = $variables['object'] = $variables['elements']['#object'];
    $variables['image_style'] = $variables['elements']['#image_style'];

    //Set initial values required by the template
    $variables['lazy_classes'] = array(
      'ting-cover',
      'ting-cover-object-id-' . $object->id,
      'ting-cover-style-' . $variables['image_style'],
      'ting-cover-owner-id-' . $object->ownerId,
    );
    $variables['image'] = '';

    //If we already have the image available locally then just use it
    $path = ting_covers_object_path($object->id);
    if (file_exists($path)) {
      //Generate an alt tag
      $alt = implode(', ', $object->creators) . ': ' . $object->title;

      //$variables['image'] = theme('image_style', array('style_name' => $variables['image_style'], 'path' => $path, 'alt' => $alt));
      
      $dimensions = array(
        'width' => null,
        'height' => null,
      );
      image_style_transform_dimensions( $variables['image_style'], $dimensions);
      $variables['width'] = $dimensions['width'];
      $variables['height'] = $dimensions['height'];
      $variables['image_url'] = image_style_url($variables['image_style'], $path);
      $variables['alt'] = $alt;
      $variables['lazy_image'] = '<img class="lazy" alt="'.$variables['alt'].'" data-src="'.image_style_url($variables['image_style'],$path).' " width="'.$variables['width'].'" height=="'.$variables['height'].'">'; 
      //Avoid further javascript processing
      $variables['lazy_classes'][] = 'ting-cover-processed';
    }
    elseif (cache_get('ting_covers:' . $object->id)) {
      //We know that there is no cover available for this object so avoid
      //further javascript processing
      $variables['lazy_classes'][] = 'ting-cover-processed';
    }
}