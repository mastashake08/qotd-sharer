import Vue from 'vue';
import Vuex from 'vuex';
import * as SocialShare from "nativescript-social-share";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: '',
    isReady: false

  },
  mutations: {
   shareQuote(state){
     SocialShare.shareText("Check this quote from QOTD Sharer app created by @mastashake08: " + state.msg)
   },
   getQuote(state,data){
     let tags = data.data.contents.quotes[0].tags;
      state.msg = `${data.data.contents.quotes[0].quote} - ${data.data.contents.quotes[0].author}`
       tags.forEach(tag => {
         tag = tag.replace('-','')
        state.msg += ' #'+tag
       })
      state.isReady = true
   }
  },
  actions: {
   shareQuote(context){

    context.commit('shareQuote')
   },
   getQuote(context){
     axios.get('https://quotes.rest/qod.json').then(data => {
	      context.commit('getQuote',data)
     })
   }
 },
 getters: {
   isReady: state => {
     return state.isReady
   },
   msg: state => {
     return state.msg
   }
 }
});
