import Ember from 'ember';
import ENV from '../../config/environment';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  ajax: service(),
  host: undefined,
  prefixNumber: undefined,
  countryList: null,
  init(){
    this._super(...arguments);
    this.host = ENV.APP.API_LARAVEL;
  },
  model(){
    let ajax = this.get('ajax');

    let url = String(this.host + '/country/list');
    const requestOpt = {
      "method": "GET",
      "Content-Type": "application/json"
    };
    let countries = ajax.makeRequest(url, requestOpt);

    return Ember.RSVP.hash({
      countries: countries.then((item) => {
        if(200 === parseInt(item.responseCode)){
          return item.countryList;
        }
      }),
    });
  },
  actions: {
    setPrefix: function(prefix){
      this.set('prefixNumber', prefix);
    },
    getPrefix: function(){
      this.get('prefixNumber');
    },
  }
});
