import Vue from 'vue';
import Vuex from 'vuex';
import * as SocialShare from "nativescript-social-share";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {
   shareQuote(state){
    console.log("Share successful!")
   }
  },
  actions: {
   shareQuote(context,msg){
    SocialShare.shareText("Check this quote from QOTD Sharer: " + msg)
    context.commit('shareQuote')
   },
  }
});
