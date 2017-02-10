import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return Ember.String.htmlSafe(`<p>${params[0]}</p>`);
});
