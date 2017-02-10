// import RESTAdapter from 'ember-data/adapters/rest';
// import RESTAdapter from 'ember-data/adapters/rest';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';
import Ember from 'ember';

export default JSONAPIAdapter.extend({
  host: Ember.computed(function() {
    return ENV.APP.API_HOST_V3;
  }),
  namespace:  Ember.computed(function() {
    return ENV.APP.API_NAMESPACE_V3;
  }),
});
