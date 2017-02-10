import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr(),
  cat: attr(),
  children: attr(),
  country: attr(),
  live: attr(),
  relChannel: attr()
  // document: attr(),
  // currency: attr(),
  // amount: attr(),
});
