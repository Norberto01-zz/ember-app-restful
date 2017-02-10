import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  topupFound: null,
  entity: null,
  btnClass: "btn-block",
  topupAmount: 0,
  channelWrap: [],
  operator: null,
  cid: 'USD',
  oid: null,
  pid: 0,
  topupArgs: null,
  topupItem: null,
  clientPhone: null,
  session: service('session'),
  sessionAccount: service('session-account'),
  didReceiveAttrs(){
    this._super(...arguments);
    this.set("btnClass", "btn-block");
    this.set("entity", null);
  },
  actions:{
    setClientPhone(phone){
      this.set('clientPhone', phone);
    },
    findTopupAmounts(args, item){
      let cId = 'USD'; // Channel ID
      const token = this.get('session.data.authenticated.token');

      this.set("oid", item.id);
      this.set("pid", 1);
      this.set("topupArgs", args);
      this.set("topupItem", item);

      console.log(args);
      console.log("ARGsSSS PHONE!!!");
      // let channelWrapper = [];
      if(!Ember.isEmpty(token)){
        let chan = this.get('sessionAccount').account.data.channel;
        if(2 === chan){
          cId = 'CAD';
        }
        console.log("CHAN ::: ",chan);
      }
      if(1 === parseInt(args.amountsFixedFlag)){
        this.set("topupFound", args.amountsArray[cId]);
        this.set("topupCurrency", String(cId));
      }
    },
    pickAndSend(id, amount){
      this.set("isDisabled", false);
      this.set("btnClass", null);
      // this.set("entity", item);
      this.set("topupAmount", {id:id, amount:amount});
      Ember.$(".item").removeClass("active");
      Ember.$(".amount-item-"+id).addClass("active");
    },
    sendTopup(){
      Ember.getOwner(this).lookup("router:main").transitionTo("order",{
        queryParams:{
          amount: this.get("topupAmount").id,
          pid: this.get("pid"),
          oid: this.get("oid")
        }
      });
    }
  }
});

