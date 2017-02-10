import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement(){
      this._super(...arguments);
      Ember.run.scheduleOnce('afterRender', this, function() {
          Ember.$('.menu-wrapper').find('.navbar-nav li.dropdown').each(function(){
              if(!Ember.$(this).find('li.submenu_option').length){
                  Ember.$(this).find('a').removeAttr('data-toggle');
                  Ember.$(this).find('ul').remove();
              }else{
                  Ember.$(this).find('.listing > a').removeAttr('href');
              }
          });
          Ember.$('.menu-wrapper').find('.navbar-nav li.dropdown').mouseenter(function(){
              var par = this;
              if(Ember.$(par).find('li.submenu_option').length){
                Ember.$(par).addClass('open');
              }
          }).mouseleave(function(){
              var par = this;
              if(Ember.$(par).find('li.submenu_option').length){
                Ember.$(par).removeClass('open');
              }
          });
      });
    }
});
