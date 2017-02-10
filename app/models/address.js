import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  profileId: attr(),
  detail: attr(),
  status: attr()
});
