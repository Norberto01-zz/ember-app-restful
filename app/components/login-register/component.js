import Ember from 'ember';

export default Ember.Component.extend({
    attributeBindings: ['checkedLog'],
    checkReg: '',
    checkLog: '',
    routerName: '',
    actions: {
      checkMyLog() {
        console.log("HOLA LOGIN ");
        this.set('checkLog', 'actived');
        this.set('checkReg', 'inactive');
        // Ember.$("#login").addClass('actived');
      },
      checkMyReg() {
        console.log("HOLA Register ");
        this.set('checkLog', 'inactive');
        this.set('checkReg', 'actived');
      }
    }
});
