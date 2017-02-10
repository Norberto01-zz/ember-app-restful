import Ember from 'ember';
import DRFAdapter from 'ember-django-adapter/adapters/drf';
import ENV from '../config/environment';

export default DRFAdapter.extend({
  host: Ember.computed(function() {
    return ENV.APP.API_HOST;
    // Ember.$.loqueme
  }),
  namespace: Ember.computed(function() {
    return ENV.APP.API_NAMESPACE_V1;
  }),
  authorizer: 'authorizer:django'
});
























