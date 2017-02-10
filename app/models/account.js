import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  username: attr(),
  firstName: attr(),
  lastName: attr(),
  email: attr(),
  smsVerified: attr(),
  statusProfile: attr(),
  zipcode: attr(),
  addressLine: attr(),
  mobile: attr(),
  city: attr(),
  country: attr(),
  channel: attr(),
  cardId: attr(),
  pin: attr(),
  signupToken: attr()
});

