import Ember from 'ember';

export default Ember.Route.extend({
  checkReg: 'actived pros',
  checkLog: '',
  didTransition: function() {
    console.log("Hola Register");
    return true; // Bubble the didTransition event
  }
});
