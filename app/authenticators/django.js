import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';
import fetch from 'ember-network/fetch';
// import Cookies from 'ember-cli-js-cookie';
const { RSVP: { Promise }, $: { ajax }, run } = Ember;

function isSecureUrl(url) {
  var link  = document.createElement('a');
  link.href = url;
  link.href = link.href;
  return link.protocol === 'https:';
}

export default Base.extend({
  init() {
    var globalConfig = ENV['ember-simple-auth'] || {};
    this.serverAuthEndpoint = globalConfig.serverAuthEndpoint;
    this.apiHost = ENV.APP.API_HOST_V1;
  },

  ajax: Ember.inject.service(),

  authenticate(credentials){
    const data =  JSON.stringify({
      username: credentials.identification,
      password: credentials.password
    });

    return this.makeRequest(`${this.serverAuthEndpoint}`, data);
  },

  restore(data) {
    return new Promise((resolve, reject) => {
      fetch(`${this.apiHost}/accounts/`).then((/* response */) => {
        resolve(data);
      }, (/* xhr , status, error */) => {
        reject();
        this.invalidate();
      });
    });
  },

  invalidate(/* data */) {
    function success(resolve) {
      resolve();
    }
    return new Promise((resolve /*, reject */) => {
      this.makeRequest(`${this.apiHost}/logout/`, {}).then((/* response */) => {
        run(() => {
          success(resolve);
        });
      }, (/* xhr, status, error */) => {
        run(() => {
          success(resolve);
        });
      });
    });
  },

  makeRequest(url, data) {
    const requestOptions = {
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return this.get('ajax').request(url, requestOptions).then(response => {
      return response;
    }).catch(fail => {
      return fail;
    });
  },
});
