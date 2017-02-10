import Ember from 'ember';

export default Ember.Helper.helper(function(results) {
  let [arg1, arg2] = results;

  Ember.$(arg1).each(function (key, val) {

      console.log(key);
      console.log('<----key');
      console.log(val.parseOptions);
      console.log('<----val');
      console.log(arg2);
      console.log('<----Flag');

      console.log('Inside prefix values {} mas flag...'+arg2);
      console.log('.....');
      console.log('....');
      console.log('...');
      console.log('..');
      console.log('.');
  });
});
