import Ember from 'ember';
import config from '../config/environment';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  isoCountry: null,
  currentRate: null,
  ratesAmount: null,
  amount: null,
  isoVal: null,
  channelId: null,
  channelAmounts: null,
  countryRates: null,
  ajax: service('ajax'),
  session: service('session'),
  currentChannel: null,
  sessionAccount: service('session-account'),
  init(){
    const token = this.get('session.data.authenticated.token');
    const backoffice = config.API || {};
    this.api_v1 = backoffice.API_HOST_V1 || 'http://localhost:4200/api/v1';
    if (!Ember.isEmpty(token)){
      let chan = this.get('sessionAccount').account.data.channel;
      this.set('currentChannel', chan);
      if(chan){
        this.send('filterByIso', chan);
      }
    }else{
      this.set('channelAmounts', null);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    const token = this.get('session.data.authenticated.token');
    const backoffice = config.API || {};
    this.api_v1 = backoffice.API_HOST_V1 || 'http://localhost:4200/api/v1';
    if (!Ember.isEmpty(token)){
      let chan = this.get('sessionAccount').account.data.channel;
      this.set('currentChannel', chan);
      if(chan){
        this.send('filterByIso', chan);
      }
    }else{
      this.set('channelAmounts', null);
    }
  },
  actions:{
    sendOrderAmount(amount){
      this.set('ratesAmount', amount);
      Ember.getOwner(this).lookup('router:main').transitionTo('order', {queryParams: {amount: amount}});
    },
    filterByIso(value){
      this.set("ratesAmount", null);
      this.set("channelId", null);
      this.set("countryRates", null);
      if (value === ''){
        this.set("isoCountry", null);
        this.set("currentRate", null);
      } else {
        const requestOpt = {
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json'
        };
        this.makeRequest(`${this.api_v1}/channels/get-countries/?channel=${value}`, requestOpt, "isoCountry");
        this.set("channelId", value);
        this.set("currentRate", value);

        //Loading Channel Amounts...
        let channelId = parseInt(this.get("channelId"));
        let channelEntities = [];
        this.get('store').findAll('amount').then(
          results => results.filter((amount) => {
            amount.get('relChannelAmounts').forEach((channel) => {
              if(parseInt(channel.channel.id) === channelId){
                channelEntities.pushObject({
                  id: amount.id,
                  amount: channel.amount,
                  channel: channel.id,
                  currency: channel.channel.country_currency_id.currency_id
                });
              }
            });
          })
        );
        this.set("channelAmounts", channelEntities);
      }
    }
  },
  makeRequest(url, options, container){
    console.log(url);
    return this.get('ajax').raw(url, options).then(response => {
      this.set(container, response.payload);
      return response;
    }).catch(fail => {
      return fail;
    });
  },
});
