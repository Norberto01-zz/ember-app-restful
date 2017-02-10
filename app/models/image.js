import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr(),
  file: attr(),
  caption: attr(),
  snip: attr()
});

