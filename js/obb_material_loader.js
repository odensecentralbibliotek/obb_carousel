(function ($) {
    Drupal.behaviors.obbMaterialloader = {
    attach: function(context) {
      
      $('.carousel').on('slide.bs.carousel', function (element) {
 
        var direction  = element.direction;
        var slide_item = $(element.relatedTarget);
        var carousel_wrap = slide_item.parent().parent().parent().parent().parent();
        var carousel = slide_item.parent().parent().parent();
        var options = carousel_wrap.find('.obb-carousel-active-tab');
        var carouselOptions = options.find('#carousel-options').val();    
        var active_item = carousel.find('.item.active');
        var preloader = Drupal.settings.obb_tabbed_carousel.material_preloader;
        
        if(active_item.find('.preloader').length != 0 && direction == "left")
        {
            return false;
        }
        if(active_item.find('.preloader').length != 0 && direction == "right")
        {
            return true;
        }
        if($(active_item).is(':first-child') && direction == "right")
        {
            return false;
        }
        //only do ajax get if we are done with the previous one.
        if(carouselOptions != undefined && direction == "left" && carousel.find('.carousel-inner').find('.preloader').length == 0 )
        {
            var cancel_slide = false;
            
            if($(active_item).is(':last-child'))
            {
                debugger;
                cancel_slide = true;
                active_item.removeClass('active');
                carousel.find('.carousel-inner').append($(preloader).addClass('active'));
            }
            else
            {
                carousel.find('.carousel-inner').append(preloader);
            }
            carouselOptions = jQuery.parseJSON(carouselOptions);
            
            var preloader_ref = carousel.find('.carousel-inner').find('.preloader').parent();
           
            //fetch the next row of items.
            $.ajax({
                method: "GET",
                url: carouselOptions['loadMoreUrl'],
              })
                .done(function( msg ) {
                    //debugger;
                    var response = JSON.parse(msg);
                    var active = preloader_ref.hasClass('active');
                    preloader_ref.empty();
                    
                    if(active)
                    {
                      preloader_ref.replaceWith($(response.items).addClass('active'));  
                    }
                    else
                    {
                        preloader_ref.replaceWith(response.items);
                    }
                    options.find('#carousel-options').val(JSON.stringify(response.options))
                    myLazyLoad.update();
                });
            if(cancel_slide)
            {
                return false;
            }
        }
      })
    }
  }
})(jQuery);