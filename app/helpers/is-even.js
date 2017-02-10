import Ember from 'ember';

export function isEvenHelper(params) {
  if (typeof params[0] !== 'number'){
    Ember.assert(`Expected number: get ${typeof params[0]} instead`);
  }
  return params[0] % 2 === 0;
}

export default Ember.Helper.helper(isEvenHelper);
