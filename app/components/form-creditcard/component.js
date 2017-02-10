import Ember from 'ember';

const { inject: { service } } = Ember;
export default Ember.Component.extend({
  // positionalParams: 'params',
  store: service(),
  ajax: service('ajax'),
  account: service('session-account'),

  cardHolderField: null,
  creditCardField: null,
  expDateField: null,
  typeField: null,
  insertCC: 'insertCreditCard',
  actions:{
    addCreditCard(){
      let type = Ember.$('#typeField').val();
      let expired = this.get('expDateField').split("-");
      console.log("Month and years....");
      console.log(expired[0]);
      console.log(expired[1]);
      const ccData = {
        "profile_id": this.get('account').uid,
        "expired_year": expired[0],
        "expired_month": expired[1],
        "card_holder_name": this.get('cardHolderField'),
        "cc_number": this.get('creditCardField'),
        "cc_type_id": type,
        "address_line": 1,
        "status_cc": true
      };
      this.sendAction('insertCC', ccData);
    }
  },
});

