import Ember from 'ember';
import ENV from '../../config/environment';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  countryRates: null,
  store: service(),
  ajax: service(),
  host: undefined,
  init() {
    this._super(...arguments);
    this.set('countryRates', null);
    this.host = ENV.APP.API_HOST_V1;
  },
  actions:{
    filterRates(value){
      let ratesValues = [];
      let relChannel = [];
      let cId = parseInt(this.get("channelId"));

      /*
      let ajax = this.get('ajax');
      const requestOpt = {
        "method": "GET",
        "Content-Type": "application/json"
      };*/

      this.set("countryRates", null);
      if (value === ''){
        console.log(value);
        console.log("Something is wrong...");
        this.set("countryRates", null);
      }else{
        this.get('store').findAll('rate').then(
          // console.log?
          results => results.filter((result) => {
            if(parseInt(result.get('id')) === parseInt(value)){
              result.get('children').forEach((rate) => {
                rate.related_channel_page.forEach((channels) => {
                  if(cId === parseInt(channels.channel.id)){
                    relChannel = channels;
                  }
                });
                if(relChannel){
                  ratesValues.pushObject({
                    id: rate.id,
                    title: rate.title,
                    relChannel
                  });
                }
              });
            }
          })
        );
      }
      console.log(ratesValues);
      this.set("countryRates", ratesValues);
    }
  }
});
