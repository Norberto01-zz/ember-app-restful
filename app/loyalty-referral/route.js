import Ember from 'ember';

export default Ember.Route.extend({
  init(){
    console.log("LOYALTY REFERRAL!!!");
  },
  beforeModel(){
    // alert("HOLA MUNDO!@!!!!");
  },
  model() {
    // return this.get('store').findAll('prepyge');
  }
});
