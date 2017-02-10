import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isDisabled: true,
  entity: null,
  btnClass: "btn-block",
  ordersAmount: "sendOrderAmount",
  channelAmounts: null,
  init(){
    this._super(...arguments);
    // this.set("channelAmounts", null);
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.set("isDisabled", true);
    this.set("entity", null);
    this.set("btnClass", "btn-block");
  },
  actions:{
    pickAndSend(item){
      this.set("isDisabled", false);
      this.set("btnClass", null);
      this.set("entity", item);
      Ember.$(".item").removeClass("active");
      Ember.$(".amount-item-"+item.id).addClass("active");
    },
    buyMinutes(){
      this.sendAction('ordersAmount', this.get("entity").amount);
    }
  }
});
