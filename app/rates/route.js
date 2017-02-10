import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
  prefixNumber: undefined,
  currentRate: undefined,
  countryItem: undefined,
  isoCountry: undefined,
  allCountries: undefined,
  currentChannel: null,
  session: service('session'),
  sessionAccount: service('session-account'),
  model(){
    let store = this.store;
    const token = this.get('session.data.authenticated.token');
    return Ember.RSVP.hash({
      channels: store.findAll('channel').then(
        results => results.filter(
          (channel) => {
              // let chan = this.get('currentChannel');
            if(!Ember.isEmpty(token)){
              let chan = this.get('sessionAccount').account.data.channel;
              this.set('currentChannel', chan);
              if(parseInt(channel.get('id')) === parseInt(chan)){
                return channel;
              }
            }else{
              if(channel.get('active') === true){
                return channel;
              }
            }
          }
        )
      ),
      currencies: store.findAll('channel').then(
        results => results.filter(
          (channel) => {
            if(channel.get('active') === true){
              return channel;
            }
          }
        )
      ),
    });
  },
  actions: {
    setCountryRate: function(country){
      this.set('currentRate', country);
      this.set('countryItem', 'HOLA HOLA HOLA');
      console.log(this.get('countryItem'));
      console.log('Paises getCountryRate...');
    },
    getCountryRate: function(){
      this.get('countryItem');
      this.get('currentRate');
      console.log(this.get('countryItem'));
      console.log('Paises getCountryRate...');
    }
  }
});
