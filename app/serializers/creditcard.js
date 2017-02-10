import DRFSerializer from './drf';

export default DRFSerializer.extend({
  attrs: {
    expiredOn: 'expired_on',
    holderName: 'card_holder_name',
    cvv: 'cvv_number',
    ccNumber: 'cc_number',
    ccType: 'cc_type_id',
    status: 'status_cc',
    addressLine: 'address_line'
  }
});

