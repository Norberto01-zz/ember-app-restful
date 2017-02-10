/**
 * Created by Developers on 7/21/2016.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  // login: Ember.inject.controller(),
  checking: '',
  actions: {
    checked() {
      console.log('Register mundo');
      this.set('checkedReg', 'actived');
    }
  }
});
