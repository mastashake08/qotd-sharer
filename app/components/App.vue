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
     let that = this
     axios.get('https://quotes.rest/qod.json').then(data => data{
      that.msg = `${data.contents.quotes[0].quote} - ${data.contents.quotes[0].author}`
      that.isReady = true
     })   
    },
  methods:{
    ...mapActions(['shareQuote'])
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
