import Ember from 'ember';

const { inject: { service, controller }, computed:{ alias } } = Ember;

export default Ember.Controller.extend({
  //Amount Id, Product Id, Operator Id
  queryParams: ['amount', 'pid', 'oid', 'phone'],
  sessionAccount: service('session-account'),
  order: null,
  msgPin: 'HOLA MUNDO!',
  appControl: controller('application'),
  topupControl: controller('products.topup'),
  rateControl: controller('rates'),
  newBalance: 0,
  orderTopupArgs: 0,
  type: 'pinless',
  init(){
    this._super(...arguments);
    let topup = this.get('topupControl');
    let currentAccount = this.get('sessionAccount');
    let cId = 'CAD';
    if (1 === topup.pid){
      this.set('type', 'topup');
      if(1 === currentAccount.account.data.channel){
        cId = 'USD';
      }
      let currentAmount = topup.topupArgs.amountsArray[cId][topup.topupAmount.id];
      console.log("TOP UP EXCHANGE RATE 1 ==> ", topup.topupArgs.amountsArray);
      console.log(topup.clientPhone);
      this.set('orderAmount', currentAmount);
      this.set('orderTopupArgs',
                {accountId: currentAccount.uid,
                    amount: currentAmount,
                operatorId: topup.topupItem.id,
                 countryId: topup.topupItem.country.code,
               phoneNumber: topup.clientPhone,
                      type:'topup'});
    }else{
      this.set('orderAmount', this.get('amount'));
    }

    let newBal = parseFloat(this.get('amount')) + parseFloat(this.get('appControl').currentBalance);

    this.set('newBalance', newBal);
  },
  didInsertElement(){
    this._super(...arguments);
  }
});
