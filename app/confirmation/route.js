import Ember from 'ember';

export default Ember.Route.extend({
  msgPin: 'HOLA',
  msgClass: 'MUNDO!',
  model() {
    // return this.get('store').findAll('prepyge');
  },
  actions:{
    confirmOrder(msgPin, msgClass){
      this.set('msgPin', msgPin);
      this.set('msgClass', msgClass);
      console.log("CONFIRM ORDER");
      this.transitionTo('order.confirmation');
    }
  }
});
