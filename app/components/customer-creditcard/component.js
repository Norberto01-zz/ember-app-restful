import Ember from 'ember';
import ENV from '../../config/environment';
const { inject: { service }, observer } = Ember;
export default Ember.Component.extend({
  store: service(),
  ajax: service(),
  billing: null,
  billingAddress: 'catchBilling',
  selectedCC: null,
  init(){
    this._super(...arguments);
    // this.set('billing', null);
  },
  actions:{
    pickCCAddress(cc, addr){
      //ccNum=item.id billAddr=item.addressLine
      this.set('selectedCC', cc);
      this.set('billing', addr);
      console.log(addr);
      console.log("HOLA");
      this.sendAction('billingAddress', addr);
    },
    insertCreditCard(items){
      let ajax = this.get('ajax');
      let URL = ENV.APP.API_NAMESPACE_V1+'/creditcards/';
      let opt = {
        method: 'POST', 
        data: items
      };
      ajax.makeRequest(URL, opt).then((resp) => {
        console.log("Inserting New CC");
        console.log(resp);
      });

      console.log("CC DATA!");
      console.log(items);

    }
  }
});
