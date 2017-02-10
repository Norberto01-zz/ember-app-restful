import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var store = this.store;
    return Ember.RSVP.hash({
        pictures: store.findAll('image').then(
          results => results.filter( 
            (img) => {
              return img.get('snip') === 1;
            }

          )
        ),
        banners: store.findAll('image').then(
          results => results.filter(
            (img) => {
              return img.get('snip') === 2;
            }
          )
        ),
        welcome: store.findAll('prepyge').then(
          results => results.filter(
            (cats) => {
              return cats.get('cat') === 1;
            }
          )
        )
    });
  }
});
