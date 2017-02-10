import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // return this.get('store').findAll('prepyge');
    var store = this.store;
    return Ember.RSVP.hash({
        regions: store.findAll('prepyge').then(
          results => results.filter(
            (page) => {
              return page.get('cat') === 4;
            }
          )
        ), 
    });
  }
});
