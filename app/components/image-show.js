import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement(){
      this._super(...arguments);
      // console.log('Hola mundo que tal!! ' + Ember.$.fn.jquery);
      Ember.run.scheduleOnce('afterRender', this, function() { 
          console.log('Desde que fui construido 2.0 ' + Ember.$.fn.jquery);
          Ember.$('.bxslider').bxSlider({
              auto: true,
              autoControls: true,
              mode: 'fade'
          });
      });
    }
});
