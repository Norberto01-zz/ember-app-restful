import Ember from 'ember';
const { inject: { controller }, computed } = Ember;
export default Ember.Service.extend({
  applicationController: controller("application"),
  routeName :  computed('controllers.application.currentPath', () => {
    return this.get('controllers.application.currentPath');
  })
});

