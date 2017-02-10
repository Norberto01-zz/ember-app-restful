import Ember from 'ember';

const { inject: { service } } = Ember;
export default Ember.Component.extend({
  // positionalParams: 'params',
  store: service(),
  ajax: service('ajax'),
  billing: Ember.computed('billing', function() {
    return this.get('billing') === '';
  }),
  actions:{

  },
});
