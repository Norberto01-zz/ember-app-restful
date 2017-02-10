import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('products.topup');
  },
  model() {
    // return this.get('store').findAll('prepyge');

    let store = this.store;
    return Ember.RSVP.hash({
        countries: store.findAll('country').then(results => results.filter((pages) => {
            return pages.get('prefix') !== null;
        }))
    });
  }
});
