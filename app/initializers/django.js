import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';
// import ENV from '../config/environment';

// const { inject: { service } } = Ember;

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

export function initialize(/* application */) {
  // just in case someone wants to us window.$
  // instead of fetch
  /*
  let sessionAccount = service('session-account');
  let ajax = service('ajax');

  let host = ENV.APP.API_LARAVEL;
  let uid = parseInt(sessionAccount.uid);
  if (uid){
    let balance = ajax.makeRequest(String(host+'/account/'+uid+'/getBalance'));
    balance.then((res)=>{
      if(res.balance){
        this.set('currentBalance', res.balance);
        console.log('Initial Balance : ', res.balance);
      }
    });
  }
  */
  if (window.$) {
    let csrftoken = Cookies.get('csrftoken');
    window.$.ajaxSetup({
      beforeSend(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      },
      complete(/* xhr, status */) {
        const tmp_csrftoken = Cookies.get('csrftoken');
        if (tmp_csrftoken !== undefined && tmp_csrftoken.length) {
          csrftoken = tmp_csrftoken;
        }
        const tmp_sessionid = Cookies.get('sessionid');
        if (tmp_sessionid !== undefined && tmp_sessionid) {
          Cookies.set('sessionid', tmp_sessionid);
        }
      }
    });
  }
}

export default {
  name: 'django',
  initialize
};
