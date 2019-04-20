<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Quote Of The Day Sharer!"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Menu"/>

                <Label class="drawer-item" text="Twitter"/>
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="*">
                <Label class="message" :text="msg" col="0" row="0"/>
                <Button text="Share Quote" @onTap="shareQuote(msg)" />
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
import {mapActions} from 'vuex'
import axios from 'axios'
  export default {
    data() {
      return {
        msg: '',
	isReady: false
      }
    },
    created(){
//     initFirebase()
     let that = this
     axios.get('https://quotes.rest/qod.json').then(data => {
      that.msg = `${data.contents.quotes[0].quote} - ${data.contents.quotes[0].author}`
      that.isReady = true
     })   
    },
  methods:{
    ...mapActions(['shareQuote']),
   initFirebase: function(){
   var firebase = require("nativescript-plugin-firebase");
 
firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs. 
}).then(
    function () {
        firebase.admob.showBanner({
    size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
    margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
      bottom: 10,
      top: -1
    },
    androidBannerId: "ca-app-pub-7023023584987784/9683705443",
    iosBannerId: "ca-app-pub-7023023584987784/2982565725",
    testing: true, // when not running in production set this to true, Google doesn't like it any other way
    iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
       // "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
       // "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
    ],
    keywords: ["motivation", "life coaching"] // add keywords for ad targeting
  }).then(
      function () {
        console.log("AdMob banner showing");
      },
      function (errorMessage) {
        dialogs.alert({
          title: "AdMob error",
          message: errorMessage,
          okButtonText: "Hmmkay"
        });
      }
  );
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
    );
   }
   }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
