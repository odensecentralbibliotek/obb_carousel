(function ($) {
    Drupal.behaviors.obbMaterialInformation = {
    attach: function(context) {
        
       $('.carousel-inner').on('click','.item div',function(event){
            debugger;
            var item = $(this).parent().parent();
            var data = item.find('.ting-material-id');
            var materialId = data.val();
            var modal = $('#obb-material-modal');
            modal.modal(); //show modal with preloader.
            $.ajax({
                url: "/obb/carousel/ajax/get/preview/" +materialId ,
              })
                .done(function( data ) {
                 
                 modal.find('.modal-body').html(data);
                 
                });
            
            event.preventDefault();
            return false;
        })
       $('#obb-material-modal').on('hidden.bs.modal', function () {
            $(this).find('.modal-body').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>');
            
        })
        
     }
    }
    

})(jQuery);



