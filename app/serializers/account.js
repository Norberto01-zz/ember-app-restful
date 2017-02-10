import DRFSerializer from './drf';

export default DRFSerializer.extend({
  attrs: {
    firstName: 'first_name',
    lastName: 'last_name',
    cardId: 'card_id',
    smsVerified: 'sms_verified',
    statusProfile: 'status_profile',
    addressLine: 'address_line',
    signupToken: 'signup_token'
  }
});

