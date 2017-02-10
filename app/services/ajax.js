import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

const { inject: { service } } = Ember;

export default AjaxService.extend({
  session: service(),
  ajax: service(),
  // container: null,
  // init(){
  //   this._super(...arguments);
  //   this.set('container', []);
  // },
  makeRequest(url, opt){
    return this.get('ajax').request(url, opt);
  }
});
