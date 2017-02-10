import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr(),
  printName: attr(),
  isoCode2: attr(),
  isoCode3: attr(),
  numCode: attr(),
  region: attr()
});
