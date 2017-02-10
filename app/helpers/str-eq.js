import Ember from 'ember';

const eq = (params) =>  String(params[0])=== String(params[1]);

export default Ember.Helper.helper(eq);
