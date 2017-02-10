import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// import ENV from '../config/environment';

// const { service } = Ember.inject;
const { inject: { service }, run: { later } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  authenticator: 'authenticator:django',
  sessionAccount: service('session-account'),
  ajax: service('ajax'),
  currentBalance: 0,
  previousPath: null,
  beforeModel(){
    return this._loadCurrentUser();
  },

  sessionAuthenticated(){
    this._loadCurrentUser().then(()=>{
      let previosPath = this.get('previousPath');
      if (previosPath){
        this.set('previousPath', null);
        previosPath.retry();
      }else{
        // console.log("Session account!");
        // console.log(this.get('sessionAccount').account.data.signupToken);
        this.transitionTo('/users/profile/'+String(this.get('sessionAccount').account.data.signupToken));
        window.location.reload(true);
      }
    }).catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser(){
    // console.log(this.get('sessionAccount'));
    return this.get('sessionAccount').loadCurrentUser();
  },

  model(){
    var store = this.store;
    return Ember.RSVP.hash({
      menu: store.findAll('prepyge').then(results => results.filter((pages) => {
        return pages.get('showInMenus') === true && pages.get('cat') === 6;
      }))
    });
  },

  actions: {
    authenticate(credentials, previousPath){
      const session = this.get('session');
      let that = this;
      if (credentials.identification && credentials.password) {
        session.authenticate(this.get('authenticator'), credentials).then(() => {
          session.set('loginError', false);
          if (previousPath){
            that.set('previousPath', previousPath);
          }
        }, () => {
          session.set('loginError', "Invalid credentials. Please retry.");
        });
      }

    },

  }
});
