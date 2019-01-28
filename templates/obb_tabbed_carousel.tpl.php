<style>
    .carousel-inner{padding:0px;}
    .obb-carousel-wrap{min-width:100%;display:inline-block;}
</style>
<div class="obb-carousel-wrap" style="">
    <div id="carousel-tab-wrapper">
    <?php 
    foreach($tabs as $index => $tab)
    {
        $tabs[$index]['#carousel_id'] = "carousel-id-" . rand(); // generate a random carousel id.
    ?>
    <div id="<?php echo "obb-carousel-tab-" .$index ?>" class="obb-carousel-tab <?php echo $index == 0 ? "obb-carousel-active-tab" : '' ?>" >
        <div obb-carousel-id="<?php echo $tabs[$index]['#carousel_id'] ?>" class="obb-tab-btn"><h3><?php echo $tab['#title'] ?></h3></div>
        <div id="tab-search-carousel-settings">
            <input type="hidden" id="carousel-options" value='<?php echo isset($tab['#carousel_options']) ? json_encode($tab['#carousel_options']) : '' ?>'>
        </div>
    </div>
    <?php
    }
    ?>
    </div>
    <div>
         <?php
            echo render($tabs);
         ?>
    </div>
</div>
<div id='obb-material-modal' class="modal fade-scale" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Resaver</button>
        <button type="button" class="btn btn-primary">Se mere</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->