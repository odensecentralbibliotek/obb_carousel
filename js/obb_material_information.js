(function ($) {
    Drupal.behaviors.obbMaterialInformation = {
    attach: function(context) {
        debugger;
        var items = $('.carousel-inner').find('.item');
        items.find('a').click(function(event){
            debugger;
            var item = $(this).parent().parent();;
            var data = item.find('.ting-material-id');
            var materialId = data.val();
            $.ajax({
                url: "/obb/carousel/ajax/get/preview/" +materialId ,
              })
                .done(function( data ) {
                 var modal = $('#obb-material-modal');
                 modal.find('.modal-body').html(data);
                 modal.modal();
                });
            
            event.preventDefault();
            return false;
        });
     }
    }
    

})(jQuery);



