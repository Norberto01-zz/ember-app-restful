import Ember from 'ember';

export default Ember.Controller.extend({
  message: null,
  classPin: null,
  actions: {
    goHome(){ 
      Ember.getOwner(this).lookup('router:main').transitionTo('confirmation');
    }
  }
});
