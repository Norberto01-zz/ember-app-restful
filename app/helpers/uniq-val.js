import Ember from 'ember';

export default Ember.Helper.helper(function(params) {

  let newArr = [],
  oriArr = params[0],
  origLen = oriArr.length,
  found, x, y;
  for (x = 0; x < origLen; x++) {
    found = undefined;
    for (y = 0; y < newArr.length; y++) {
      if (parseInt(oriArr[x].id) === parseInt(newArr[y].id)) {
        found = true;
        break;
      }
    }
    if (!found) {
      newArr.push(oriArr[x]);
    }
  } 
  return newArr;
});
