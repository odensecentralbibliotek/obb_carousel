(function ($) {
    Drupal.behaviors.obbMaterialInformation = {
    attach: function(context) {
      $('.carousel').on('slide.bs.carousel', function (element) {
          debugger;
        var direction  = element.direction;
        var slide_item = $(element.relatedTarget);
        var carousel = slide_item.parent().parent().parent().parent().parent();
        var options = carousel.find('.obb-carousel-active-tab');
        var carouselOptions = options.find('#carousel-options').val();
        if(options != undefined)
        {
            carouselOptions = jQuery.parseJSON(carouselOptions);
            
            //fetch the next row of items.
            $.ajax({
                method: "GET",
                url: carouselOptions['loadMoreUrl'],
              })
                .done(function( msg ) {
                    debugger;
                    var response = JSON.parse(msg);
                    
                    carousel.find('.carousel-inner').append(response.items);
                    options.find('#carousel-options').val(JSON.stringify(response.options))
                });
        }
        
      })
    }
  }
})(jQuery);