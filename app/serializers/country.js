import DRFSerializer from './drf';

export default DRFSerializer.extend({
  attrs: {
    printName: 'print_name',
    numCode: 'country_code',
    isoCode2: 'iso2',
    isoCode3: 'iso3'
  }
});
