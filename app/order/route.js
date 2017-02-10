import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from '../config/environment';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  sessionAccount: service('session-account'),
  ajax: service(),
  orderAmount: null,
  channelId: null,
  message: '',
  attrClass: '',
  confirmAction2: 'confirmOrder',
  currentBalance: null,
  init(){
    this._super(...arguments);
    console.log("Current BALANCE ===> ", this.get('currentBalance'));
  },
  beforeModel(transition) {
    const token = this.get('session.data.authenticated.token');
    if(Ember.isEmpty(token)){
      var loginController = this.controllerFor('users.signin');
      loginController.set('previousPath', transition);
      return this.transitionTo('/users/signin/');
    }
    let host = ENV.APP.API_LARAVEL;
    let uid = parseInt(this.get('sessionAccount').uid);
    let balance = this.get("ajax").makeRequest(String(host+'/account/'+uid+'/getBalance'));
    balance.then((res)=>{
      if(res.balance){
        this.set('currentBalance', res.balance);
      }
    }); 
  },
  model() {
    let store = this.store;
    /*
    let pinItems = store.createRecord('pinless', {
      accountId: 1,
      amount: 3
    }).save();
    pinItems.then(record => {
      console.log("Success", record);
      console.log(record.data.transactionId);
    }, reason => {
      console.log("error", reason);
    });
    */

    return Ember.RSVP.hash({
      creditCards: store.findAll('creditcard').then(results => results.filter((cc) => {
        return cc;
      })),
      addressLines: store.findAll('address').then(results => results.filter((entity) => {
        return entity;
      })),
      pinlessItems: ''
    });
  },
  actions:{
    confirmMsg(msgPin, msgClass){
      this.sendAction('confirmAction2', msgPin, msgClass);
    }
  }
});
