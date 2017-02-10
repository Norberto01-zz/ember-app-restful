import DRFSerializer from './drf';

export default DRFSerializer.extend({
  attrs: {
    countryCurrency: 'country_currency_id',
    channelPage: 'channel_page'
  }
});

