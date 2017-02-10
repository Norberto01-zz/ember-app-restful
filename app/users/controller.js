import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),
  linkPay: null,
  linkReport: null,
  linkProfile: null, 
  didInsertElement(){
    this._super(...arguments);
    this.set('linkPay', null);
    this.set('linkReport', true);
    this.set('linkProfile', null);
  }
});
