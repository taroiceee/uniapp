<template>
  <view class="intelligent-customer-service" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>智能机器人</tn-nav-bar>
    <view class="vw1">
      <view class="title-s">
        <image src="../../static/robot.png" style="width: 35px; height: 35px" mode=""></image>
        <text class="tiles-text">{{ Custom }}</text>
      </view>
      <view class="vw2">
        <input class="ip1" placeholder="请输入要发送的信息" v-model="text" />
        <button id="demox" class="bt1" type="primary" @click="click1">发送</button>
      </view>
      <view id="lf" class="vw4 vw4-l const" v-for="(item, index) in msglist" :key="index">
        <view class="nones-l">
          <image class="nones-imgse" mode="" style="width: 35px; height: 35px"></image>
          <view class="centers-ft">
            <text class="centers">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import int from '../../libs/ints/inst.js'
export default {
  data() {
    return {
      text: '你好啊', //用户输入框中输入的内容
      msglist: [], //用于存放对话内容的列表
      Custom: '我是智能机器人小智，有什么可以帮到您的吗!',
    };
  },
  methods: {
    click1() {
      //定义一个click1函数来实现存入对话及api请求
      if (this.text === '') {
        return undefined;
      }
      let rights = this.msglist.push(this.text); //将输入框中内容传入存放对话的列表
      uni.request({
        //发起api请求
        url: 'https://v.api.aa1.cn/api/api-xiaoai/talk.php?msg=' + this.text,
        //将用户输入框中的内容放入api的url中
        success: (res) => {
          this.text = ''; //清空输入框，方便用户下次输入
          this.msglist.push(res.data); //将机器人回复内容传入列表
        },
      });
    },
  },

  // onPageScroll(e) {
  // 	this.show = e.scrollBottom >= this.scroBottom
  // 	console.log(this.show)
  // 	let query =uni.createSelectorQuery().in(this);
  // 	query.select("#lf").boundingClientRect(data =>{
  // 		let cm = data.bottom
  // 		if(cm < 0){
  // 			uni.pageScrollTo({

  // 			})
  // 		}

  // 	}).exec()

  // },
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesB/index.scss';
</style>
