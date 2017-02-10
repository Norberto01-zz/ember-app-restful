import Ember from 'ember';
const { inject: { service }, computed:{ alias } } = Ember;
import ENV from '../../config/environment';

export default Ember.Component.extend({
  store: service(),
  account: service('session-account'),
  ajax: service(),
  billing: null,
  container: null,
  attrClass: 'success',
  messagePin: null,
  confirmationAction: 'confirmMsg',
  accountBalance: 0,
  product: 'pinless',
  actions:{
    catchBilling(addr){
      if(addr){
        this.set('billing', addr);
      }
    },
    //accountId, amount, operatorId, countryId, phoneNumber
    proceedToPay(amount, type){
      this.set('product', type);
      console.log("TIPO:::",type);
      var classPin = 'success';
      var msgPin = null;
      let host = ENV.APP.API_HOST_V1;
      let url = host+'/proceed/';
      let opt = {accountId: this.get('account').uid, amount: amount, type: 'pinless'};
      if(type === 'topup'){
        opt = this.get('orderTopupArgs');
      }

      console.log(opt);
      console.log('OPT');

      this.get("ajax").makeRequest(url, {
        method: 'POST',
        data: opt
      }).then((gen) => {
        msgPin = String(gen.responseDescription);
        this.set('attrClass', classPin);
        this.set('messagePin', msgPin);
      }).catch((fail) => {
          msgPin = String(fail.errors[0].detail.responseDescription);
          classPin = 'danger';
          console.log(fail.errors[0].detail.responseDescription);
          this.set('attrClass', classPin);
          this.set('messagePin', msgPin);
      });
      Ember.$('.modal').modal();
    },
    goHome(){
      Ember.getOwner(this).lookup('router:main').transitionTo('home');
    }
  }
});
