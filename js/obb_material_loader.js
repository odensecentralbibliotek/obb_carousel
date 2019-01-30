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
        if($(active_item).is(':first-child') && direction == "right" && carouselOptions != "")
        {
            return false;
        }
        //only do ajax get if we are done with the previous one.
        if(carouselOptions != "" && direction == "left" && carousel.find('.carousel-inner').find('.preloader').length == 0 )
        {
            var cancel_slide = false;
            
            if($(active_item).is(':last-child'))
            {
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
                    if(msg != "")
                    {
                       var response = JSON.parse(msg); 
                    }
                    else
                    {
                        debugger;
                        preloader_ref.remove();
                        options.find('#carousel-options').val('');
                        return;
                    }
                    
                    var items = $(response.items);
                    if(items.children().length != 0)
                    {   
                        var active = preloader_ref.hasClass('active');
                        preloader_ref.empty();

                        if(active)
                        {

                          preloader_ref.replaceWith(items.addClass('active'));  
                        }
                        else
                        {
                            // append children because sometimes we load so fast we are mid slide change ,thus using replaceWith does not reall work optimal
                            // optimize data returned from api to better fit.
                            preloader_ref.append(items.children()); 

                        }
                        myLazyLoad.update();
                    }
                    else
                    {
                        preloader_ref.remove();
                        
                    }
                    options.find('#carousel-options').val(JSON.stringify(response.options))
                    
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