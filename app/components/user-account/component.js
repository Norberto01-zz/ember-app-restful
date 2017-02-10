import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  right: false,
  login: null,
  password: null,
  errorMessage: null,
  authenticateAction: 'authenticate',
  invalidateAction: 'invalidate',

  actions: {
    authenticate() {
      let previousPath = null;
      if(this.get('previousPath')){
        previousPath = this.get('previousPath');
      }
      var credentials = {
        identification: this.get('login'),
        password: this.get('password')
      };
      this.sendAction('authenticateAction', credentials, previousPath);
    },
    invalidate() {
      this.sendAction('invalidateAction');
    }
  }
});
