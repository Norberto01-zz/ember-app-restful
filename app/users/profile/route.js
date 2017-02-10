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
  model(params) {
    let uid = String(params.account_id);
    let store = this.store;
    // console.log(params);
    return Ember.RSVP.hash({
      profile: store.findRecord('account', 1).then(
        (account) => {
          if(account.get('statusProfile') === true && account.get('signupToken') === uid){
            return account;
          }
        }
      ),
    });

  },
});
