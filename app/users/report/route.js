import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  beforeModel() {
    const token = this.get('session.data.authenticated.token');
    if (Ember.isEmpty(token)) {
      this.transitionTo('/users/signin/');
    }
  }, 
  model() {
    // return this.get('store').findAll('prepyge');
  }
});
