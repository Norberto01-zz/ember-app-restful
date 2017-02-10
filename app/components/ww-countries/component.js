import Ember from 'ember';
import ENV from '../../config/environment';

const { inject: { service }, observer } = Ember;

export default Ember.Component.extend({
  store: service(),
  ajax: service(),
  host: undefined,
  prefixNumber: undefined,
  flagClass: undefined,
  flag: undefined,
  iso: undefined,
  inFlag: 525,
  operator: null,
  operatorList: null,
  topupAmounts: 'findTopupAmounts',
  phoneNumber: null,
  setCustomerPhone: 'setClientPhone',
  init(){
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function() {
    });
    this.host = ENV.APP.API_LARAVEL;
  },
  actions: {
    findOperator(){
      let prefix = this.get("flag");
      let phone = this.get('phoneNumber');
      let prefixPhone = prefix+phone;
      let ajax = this.get('ajax');
      let url = String(this.host + '/operator/phone/' + prefixPhone);
      let that = this;
      const requestOpt = {
        "method": "GET",
        "Content-Type": "application/json"
      };
      let operator = ajax.makeRequest(url, requestOpt);
      operator.then((item) => {
        if(200 === parseInt(item.responseCode)){
          this.set('operator', item.operator.name);
          let code = String(item.operator.country.code);
          let amountUrl = String(that.host+'/operator/list/country/'+code);
          ajax.makeRequest(amountUrl, requestOpt).then((resp) => {
            if(200 === parseInt(resp.responseCode)){
              resp.operatorList.filter(function(opt) {
                // if(parseInt(opt.id) === parseInt(item.operator.id)){
                if(parseInt(opt.id) === 329){
                  return that.sendAction('topupAmounts', opt, item.operator);
                }
              });
            }
          });
        }
      });
      this.sendAction('setCustomerPhone', prefixPhone);
    },
    changeOperator(){
      this.set("operatorList", [{id:1, title:'Claro'}, {id:2, title:'Orange'}, {id:3, title:'Viva'}, {id:4, title:'Tricom'}]);
    },
    checkPrefix() {
      const whoto = this.$("#whoto option:selected");
      const fg = whoto.attr('data-prefix');
      this.set("flag", fg);
      this.set("iso", whoto.text());
      // const prefix = this.get('store').findAll('operator');

      if (whoto.attr('value') === '0'){
        this.set("flagClass", '');
      }else{
        let flag = String(whoto.text().toLowerCase());
        this.set("flagClass",
          'dn-flag-rounded-small dn-flag-rounded-small-'+flag+
          ' dn-flag-rounded-small-'+flag.substring(0, 2));
      }

      // this.set("prefixNumber", prefix);
      // this.sendAction('stateSetPrefix', prefix);
    },
    setNewOperator(key, val){
      console.log(key);
      this.set("operator", val);
      this.set("operatorList", null);

      this.sendAction('topupAmounts', [{id: 1, amount: 4, currency: 'CAD'},
                                       {id: 2, amount: 8, currency: 'CAD'},
                                       {id: 3, amount: 16, currency: 'CAD'},
                                       {id: 4, amount: 32, currency: 'CAD'},
                                       {id: 5, amount: 64, currency: 'CAD'}]);
    }
  }
});
