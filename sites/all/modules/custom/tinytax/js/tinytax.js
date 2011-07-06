(function($){
  Drupal.behaviors.tinytax = {
    attach: function(context, settings){
      $('img.click', context).click(function(){
        var img_clicked = $(this);
        // If we're clicking a plus
        if(img_clicked.attr('src') == Drupal.settings.tinytax.plus){
          if(img_clicked.parent('li').children('ul').length){
            img_clicked.parent('li').children('ul').show();
            img_clicked.attr('src', Drupal.settings.tinytax.minus);
          } else {
            // Check if we already have the children data, if so, we just show it
            img_clicked.attr('src', Drupal.settings.tinytax.load);
            $.getJSON(Drupal.settings.tinytax.callback+"/"+$(this).attr('id'), function(data){
              img_clicked.parent('li').append(data[1]['data']);
              Drupal.attachBehaviors(img_clicked.parent('li').children('ul'));
              img_clicked.attr('src', Drupal.settings.tinytax.minus);
            });
          }
        }
        // If we're clicking a minus
        else if(img_clicked.attr('src') == Drupal.settings.tinytax.minus){
          img_clicked.parent('li').children('ul').hide();
          img_clicked.attr('src', Drupal.settings.tinytax.plus);
        }
      });
    }
  }
})(jQuery);