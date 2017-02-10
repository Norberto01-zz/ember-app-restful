import Ember from 'ember';
const { inject: { service }, run: { later } } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),
  userNameField: '',
  firstNameField: '',
  lastNameField: '',
  addressLineField: '',
  countryField: '',
  cityField: '',
  stateField: '',
  zipcodeField: '',
  phoneField: '',
  emailField: '',
  passwordField: '',
  confirmPasswordField: '',
  responseMessage: null,
  init(){
    this._super(...arguments);
    this.set('userNameField', this.get('sessionAccount').account.data.username || null);
    this.set('firstNameField', this.get('sessionAccount').account.data.firstName || null);
    this.set('lastNameField', this.get('sessionAccount').account.data.lastName || null);

    this.set('addressLineField', this.get('sessionAccount').account.data.addressLine || null);
    this.set('countryField', this.get('sessionAccount').account.data.country || null);
    this.set('cityField', this.get('sessionAccount').account.data.city || null);

    this.set('zipcodeField', this.get('sessionAccount').account.data.zipcode || null);
    this.set('phoneField', this.get('sessionAccount').account.data.mobile || null);
    this.set('emailField', this.get('sessionAccount').account.data.email || null);
  },
  // didInsertElement(){
  //   this.set('responseMessage', null);
  // },
  actions:{
    updateProfile(profile){
      profile.save().then(() => {
        let that = this;
        that.set('responseMessage', 'We have just updated your profile.');
        later((() => {
          Ember.$('div.alert').fadeOut();
        }), 3000);
        // later((() => {
        //   window.location.reload(true);
        // }), 4000);
      });
    },
    changePassword(){
      console.log("Changing password!");
    }
  }

});
