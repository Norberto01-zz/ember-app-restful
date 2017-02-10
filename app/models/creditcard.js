import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  expiredOn: attr(),
  holderName: attr(),
  cvv: attr(),
  ccNumber: attr(),
  ccType: attr(),
  status: attr(),
  addressLine: attr(),
});

