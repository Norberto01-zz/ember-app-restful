/**
 * Created by Developers on 7/21/2016.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  checking: '',
  actions: {
    checked() {
      this.set('checking', 'actived login');
    }
  }
});
