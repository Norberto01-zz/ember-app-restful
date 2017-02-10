import Ember from 'ember';

export default Ember.Helper.helper(function([ lhs, rhs, type ]) {
  if(type === 'f'){
    return parseFloat(lhs) + parseFloat(rhs);
  }
  return parseInt(lhs) + parseInt(rhs);
});
