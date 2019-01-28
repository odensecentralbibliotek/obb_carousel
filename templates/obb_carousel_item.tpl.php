<?php
$object = $item['#content']['#object'];
$options = array(
    'html' => TRUE,
    'attributes' => array('title' => $object->title),
    );
$image = theme('obb_carousel_cover_lazy', array('elements' => array('#object' => $object, '#image_style' => 'ting_inspiration_list_cover')));
$uri = entity_uri('ting_object', $object);
$linked_image = l($image, $uri['path'], $options)
?>

<div class="" style="margin:5px;min-width:126px;height:250px;overflow:hidden;width: <?php echo $itemwidth_percentage ."%;" ?>;display:inline-block;">
  <div class="card mb-2">
    <?php  echo $linked_image ?>
    <div class="card-body">
      <h4 class="card-title"> <?php echo $object->type ?></h4>
    </div>
      <div id="material-information" class="js-hide">
          <!-- <input type="hidden" class="ting-object-data" value='<?php //unset($object->reply); echo json_encode($object); ?>'> -->
          <input  type="hidden" class="ting-material-id" value ='<?php echo $object->id ?>'/>
          <?php //echo render($item['#content']); ?>
      </div>
  </div>
</div>
<!-- We got a need for speed...so we use js templates for preview of materials! -->
