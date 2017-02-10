import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  accountId: attr(),
  amount: attr(),
  transactionId: attr(),
  responseCode: attr(),
  responseDescription: attr()
});

