import Ember from 'ember'; 

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel() {
    const token = this.get('session.data.authenticated.token');
    if (Ember.isEmpty(token)) {
      this.transitionTo('/users/signin/');
    }
  },
  model(){
    // return this.get('store').findAll('prepyge');
  },

});
