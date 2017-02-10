import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  countryItem: null,
  currentRate: null,
  valuesRate: null,
  allCountries: null,
  countrySide: '',
  actions: {
    countryRate() { 
    }
  }
});
