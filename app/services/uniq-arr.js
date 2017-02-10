import Ember from 'ember';
 
var uniq = function(params){
    let newArr = [],
    oriArr = [0],
    origLen = 0,
    found, x, y;
    let iParam = [];
    iParam.push(params);
    try {
      origLen = oriArr.length;
    }catch (e) {
      console.log("PARAMS");
      console.log(params);
      console.log("IPARAMS");
      console.log(iParam);
      params.forEach((item) => {
          console.log(item);
      });

      return;
    }
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
};
export default Ember.Service.extend({
  review(params){
    return uniq(params);
  }
});
