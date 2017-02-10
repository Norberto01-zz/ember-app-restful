import Ember from 'ember';
const { inject: { service }, RSVP } = Ember;
import ENV from '../config/environment';
export default Ember.Service.extend({
  session: service('session'),
  ajax: service('ajax'),
  store: service(),
  host: undefined,
  // apiLaravel: 'http://192.168.1.244/prepymerest/public/index.php/api/',
  loadCurrentUser() {
    this.host = ENV.APP.API_LARAVEL;
    return new RSVP.Promise((resolve, reject) => {
      const token = this.get('session.data.authenticated.token');
      // console.log(token);
      if (!Ember.isEmpty(token)) {
        return this.get('store').findRecord('account', 1).then((user) => {
          // console.log(user);
          this.set('token', token);
          this.set('authenticated', this.get('session.isAuthenticated'));
          this.set('account', user);
          this.set('uid', user.id);

          let host = ENV.APP.API_LARAVEL;
          let uid = parseInt(user.id);
          let balance = this.get("ajax").makeRequest(String(host+'/account/'+uid+'/getBalance'));
          let val = 0;
          balance.then((res)=>{
            if(res.balance){
              this.set('balance', res.balance);
              val = res.balance;
            }
          });
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
