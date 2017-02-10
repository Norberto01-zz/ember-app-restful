import Ember from 'ember';
import ENV from '../config/environment';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({
  currentPath: '',
  sessionAccount: service('session-account'),
  session: service('session'),
  ajax: service('ajax'),
  host: undefined,
  updateCurrentPath: computed('currentPath', function(){
    this.set('currentPath', this.get('currentPath'));
  }),
  userBalance: 0,
  init(){
    this._super(...arguments);

    let host = ENV.APP.API_LARAVEL;
    let uid = parseInt(this.get('sessionAccount').uid);
    let balance = this.get("ajax").makeRequest(String(host+'/account/'+uid+'/getBalance'));
    balance.then((res)=>{
      if(res.balance){
        this.set('currentBalance', res.balance);
      }
    });

  },
  actions: {
    invalidate(){
      this.get('session').invalidate();
      this.transitionTo('home');
    }
  }
});
