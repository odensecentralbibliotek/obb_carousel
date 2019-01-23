(function ($) {
  Drupal.behaviors.obbCarousel = {
    attach: function(context) {
      $('.obb-tab-btn').click(function(e){
          debugger;
          var target_tab = $(this);
          var current_tab = target_tab.parent().parent().find('.obb-carousel-active-tab');
          var next_carousel_id = target_tab.attr('obb-carousel-id');
          var current_carousel = target_tab.parent().parent().parent().find('.obb-active-carousel');
          var next_carousel = target_tab.parent().parent().parent().find('#' + next_carousel_id).parent();
          
          current_tab.removeClass('obb-carousel-active-tab');
          target_tab.addClass('obb-carousel-active-tab');
          
          current_carousel.fadeOut('slow',function(){
              current_carousel.removeClass('obb-active-carousel');
              //next_carousel.removeClass('js-hide');
              next_carousel.fadeIn('slow',function(){
                  next_carousel.addClass('obb-active-carousel');
              });
          });          
      });
    }
  }
  
})(jQuery);