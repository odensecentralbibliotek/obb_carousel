<div class="obb-carousel <?php echo $carousel['#hidden'] ? "js-hide" : "obb-active-carousel" ?>">
  <?php if ($items) : ?>
    
    <div id="<?php echo $carousel_id ?>" class="carousel slide" data-ride="carousel" data-interval="false">

  
  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
  <?php
    $chunks = array_chunk($items,8);
    foreach($chunks as $index => $chunk)
    {
     ?>
      <div class="item <?php echo $index == 0 ? 'active' : '' ?>" >
        <?php echo render($chunk); ?>
      </div>
     <?php
    }
  ?>
  </div>

  <!-- Controls -->
  <div class="oc-carousel-control-wrapper">
    <a class="oc-carousel-control" href="#<?php echo $carousel_id ?>" role="button" data-slide="prev" onclick="return false;">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="oc-carousel-control" href="#<?php echo $carousel_id ?>" role="button" data-slide="next" onclick="return false;">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
  <?php else : ?>
    <div class="no-results-this-period">
      <?php print t('Your search yielded no results'); ?>
    </div>
  <?php endif; ?>
</div>