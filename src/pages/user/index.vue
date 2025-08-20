<template>
  <view id="page_user" class="page_user" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar :isBack="false" :bottomShadow="false">个人中心</tn-nav-bar>
    <!-- 用户栏模块(开始) -->
    <view class="user">
      <!-- 头像 -->
      <view class="left">
        <view class="avatar">
          <image :src="$fullImgUrl(userInfo.avatar) || '/static/img/default.png'"></image>
        </view>
        <view class="base-info" v-if="token">
          <view class="username">{{ userInfo.nickname }}</view>
          <view class="signature">{{ userInfo.user_group }}</view>
        </view>
        <view class="base-info" v-else @click="toLogin">
          <view class="username">游客</view>
        </view>
              <uni-badge size="small" :text="msgSum" absolute="rightTop" type="error" :offset="[4,4]">
          <uni-icons @click="$navTo('/pages/user/releasing_notices?follower_id=' + userInfo.user_id)" type="notification" size="28" style="color: #333"></uni-icons>
        </uni-badge>
            </view>
      <!-- 右侧其它 -->
      <view class="other">
        <view class="user-info-btn" @click="$navTo('/pages/user/info')">
          <text class="iconfont icon-jinggao"></text>
          基本信息
        </view>
      </view>
    </view>
    <!-- 用户栏模块(结束) -->
    <view class="menu-group my-order">
      <view class="menu-row user-statistics" @click="$navTo('/pages/user/my_home_page?follower_id=' + userInfo.user_id)">
        <view class="menu-item">
          <view class="user-sum">{{dynamicList.length}}</view>
          <view class="user-sum-name">发布</view>
        </view>
        <view class="menu-item">
          <view class="user-sum">{{myFollow.length}}</view>
          <view class="user-sum-name">关注</view>
        </view>
        <view class="menu-item">
          <view class="user-sum">{{followSelf.length}}</view>
          <view class="user-sum-name">粉丝</view>
        </view>
      </view>
    </view>
    <view class="split"></view>
      <view class="menu-group my-money">
      <view class="title-wrap">
        <text class="title">我的资产</text>
      </view>
      <view class="menu-scroll">
        <scroll-view class="scroll-view" scroll-x="true">
		          <view class="menu-item coupon" @click="$navTo('/pages/user/coupon')">
            <view class="left">
              <image class="menu-img" :src="'/static/img/default.png'"></image>
            </view>
            <view class="right">
              <view class="name">优惠券</view>
              <view class="info"><text>{{ couponNumber }}</text>张未使用</view>
            </view>
          </view>
						  <view class="menu-item coupon" @click="$navTo('/pages/user/wallet')">
		    <view class="left">
		      <image class="menu-img" :src="'/static/img/default.png'"></image>
		    </view>
		    <view class="right">
		      <view class="name">钱包</view>
		      <view class="info"><text>{{ userInfo.balance }}</text>元余额</view>
		    </view>
		  </view>
						  <view class="menu-item coupon">
		    <view class="left">
		      <image class="menu-img" :src="'/static/img/default.png'"></image>
		    </view>
		    <view class="right">
		      <view class="name">积分</view>
		      <view class="info"><text>{{ userInfo.integral==undefined?0:userInfo.integral}}</text>积分可用</view>
		    </view>
		  </view>
		        </scroll-view>
      </view>
    </view>
      <view class="split"></view>
    <view class="menu-group my-order">
      <view class="title-wrap">
        <view class="title">我的订单</view>
        <view class="more" @click="$navTo('/pagesA/order/list')">
          查看全部
          <text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="menu-row">
        <view class="menu-item" @click="$navTo('/pagesA/order/list?type=1')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">待付款</view>
        </view>
        <view class="menu-item" @click="$navTo('/pagesA/order/list?type=2')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">已付款</view>
        </view>
        <view class="menu-item" @click="$navTo('/pagesA/order/list?type=3')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">已取消</view>
        </view>
          <view class="menu-item" @click="$navTo('/pagesA/order/list?type=4')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">售后/退款</view>
        </view>
        </view>
    </view>
    <view class="split"></view>
    <view class="menu-group my-data">
      <view class="menu-row-sm">
          <view class="menu-item address" @click="$navTo('/pages/user/address')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">收货地址</view>
        </view>
  		<view class="menu-item schedule" @click="$navTo('/pagesB/schedule/view')">
		  <image class="menu-img" :src="'/static/img/default.png'"></image>
		  <view class="name">日程管理</view>
		</view>
        <view v-if="$check_action('/collect/list', 'get')" class="menu-item collect" @click="$navTo('/pages/user/collect')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">收藏</view>
        </view>
        <view v-if="$check_action('/comment/table', 'get')" class="menu-item comment" @click="$navTo('/pages/user/comment')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">评论</view>
        </view>
        <view class="menu-item data" v-if="chartAble" @click="$navTo('/pagesA/user_center/index')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">统计</view>
        </view>
        <view class="menu-item data" @click="$navTo('/pagesA/history/list')">
          <image class="menu-img" :src="'/static/img/default.png'"></image>
          <view class="name">浏览记录</view>
        </view>
      </view>
    </view>

    <view class="split"></view>
    <!-- 自定义栏模块(开始) -->
    <view class="nav-list">
      <view v-for="(item, index) in cellList" :key="index" v-if="$check_action(item.auth, 'get')">
        <tn-list-cell
            @click="$navTo(item.url)"
            :arrow="true"
        >
          <view class="nav-list-row">
            <image class="menu-img" :src="'/static/img/default.png'"></image>
            <text>{{ item.title }}</text>
          </view>
        </tn-list-cell>
      </view>
    </view>

    <!-- 自定义栏模块(结束) -->

    <!-- 按钮模块(开始) -->
    <view class="user-center-footer">
      <view class="me-btn logout-btn" v-if="token" @click="sign_out">退出登录</view>
      <view v-else class="me-btn login-btn" @click="toLogin">立即登录</view>
    </view>
    <!-- 按钮模块(结束) -->
    <tn-tabbar
        :value="tabbarIndex"
        :list="tabbarList"
        @change="switchTabbar"
        :animation="true"
        :safeAreaInsetBottom="true"
    ></tn-tabbar>
  </view>
</template>

<script>
  import tabbar from '@/libs/mixins/tabbar.js';

  export default {
    mixins: [tabbar],
    data() {
      return {
        tabbarIndex: 0,
        chartAble: false,
        cellList: [
            {
            title: this.$page_title("/registered_user/table") || '注册用户',
            auth: '/registered_user/table',
            url: '/pagesC/registered_user/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/business_user/table") || '商家用户',
            auth: '/business_user/table',
            url: '/pagesC/business_user/table',
            icon: 'icon-yonghu',
          },
                {
            title: this.$page_title("/classification_information/table") || '分类信息',
            auth: '/classification_information/table',
            url: '/pagesC/classification_information/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/customized_products/table") || '定制商品',
            auth: '/customized_products/table',
            url: '/pagesC/customized_products/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/i_want_to_customize_it/table") || '我要定制',
            auth: '/i_want_to_customize_it/table',
            url: '/pagesC/i_want_to_customize_it/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/evaluation_feedback/table") || '评价反馈',
            auth: '/evaluation_feedback/table',
            url: '/pagesC/evaluation_feedback/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/film_and_television_novels/table") || '影视小说',
            auth: '/film_and_television_novels/table',
            url: '/pagesC/film_and_television_novels/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/offline_activities/table") || '线下活动',
            auth: '/offline_activities/table',
            url: '/pagesC/offline_activities/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/schedule_of_sessions/table") || '场次安排',
            auth: '/schedule_of_sessions/table',
            url: '/pagesC/schedule_of_sessions/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/seating_arrangements/table") || '座位安排',
            auth: '/seating_arrangements/table',
            url: '/pagesC/seating_arrangements/table',
            icon: 'icon-yonghu',
          },
              {
            title: this.$page_title("/feedback_on_opinions/table") || '意见反馈',
            auth: '/feedback_on_opinions/table',
            url: '/pagesC/feedback_on_opinions/table',
            icon: 'icon-yonghu',
          },
            {
            title: '错题列表',
            auth: '/user_answer_wrong/table',
            url: '/pagesA/exam_subject/answer_wrong_table',
            icon: 'icon-cuotiben',
          },
          {
            title: this.$page_title("/message/table") || '留言板管理',
            auth: '/message/table',
            url: '/pagesB/message/table',
            icon: 'icon-liuyanban',
          },
          {
            title: this.$page_title("/forum/table") || '论坛管理',
            auth: '/forum/table',
            url: '/pagesA/forum/table',
            icon: 'icon-luntan',
          },
            {
            title: '订单配送',
            auth: '/logistics_delivery/table',
            url: '/pages/logistics_delivery/table',
            icon: 'icon-dingdanguanli',
          },
          ],
        couponNumber: 0,
        followList: [],
        myFollow: [],
        followSelf: [],
        dynamicList: [],
        msgSum: 0,
        msgList: [],
        messageInformListAll: [],
      };
    },
    onLoad() {
                              if (this.user_group !== '管理员' && !this.$check_option('/subject_exam/table','teacher') && this.$check_figure("/subject_exam/table")){
        this.chartAble = true
      }
      if (this.$check_figure("/order/table")){
        this.chartAble = true
      }
      if (this.token) {
        this.get_coupon_user_list();
      }
    },
    methods: {
      async getMessageInformList() {
        if(this.userInfo.user_group == '管理员') {
          let list = await this.$get("~/api/message_inform/get_list",{type: '消息'})
          this.msgList = list.result.list
        }
        let listAll = await this.$get("~/api/message_inform/get_list?user_id=" + this.userInfo.user_id)
        this.messageInformListAll = [...listAll.result.list,...this.msgList]
        this.msgSum = 0
        this.messageInformListAll.forEach(item => {
          if(item.state == 1) {
            this.msgSum++
          }
        })
      },
      async getFollowList() {
        let res = await this.$get('~/api/follow/get_list',{orderby: `create_time desc`})
        this.followList = res.result.list;
        this.myFollow = res.result.list.filter(item => item.follower_id == this.userInfo.user_id);
        this.followSelf = res.result.list.filter(item => item.followed_id == this.userInfo.user_id).map(item => {
          // 根据myFollow遍历是否互相关注
          let isFollow = this.myFollow.some(item2 => item2.follower_id === item.followed_id && item2.followed_id === item.follower_id);
          return {
          ...item,
            isFollow: isFollow
          }
        });
        console.log(this.myFollow,'我的关注');
        console.log(this.followSelf,'我的粉丝');
      },
      async getDynamicList(userId) {
        let params = Object.assign({}, {orderby: `create_time desc`}, {
          user_id: userId
        });
        let forum = await this.$get('~/api/forum/get_list', params);
        let forumList = forum.result.list.map(item => ({
          ...item,
          type: 'forum'
        }));
					        let params5 = Object.assign({}, {orderby: `create_time desc`}, {
          business_user: userId
        });
        let customized_productsProducts = await this.$get('~/api/customized_products/get_list', params5);
        let customized_productsProductsList = customized_productsProducts.result.list.map(item => ({
          ...item,
          type: 'customized_productsProducts'
        }));
  							        
        this.dynamicList = [
        ...forumList,
					        ...customized_productsProductsList
  							        ];
      },
      sign_out() {
        this.$store.dispatch('auth/logOut').then((res) => {
        this.$Router.replaceAll('/pagesB/account/login');
        });
      },
      toLogin() {
        this.$Router.replace('/pagesB/account/login');
      },
      /**
       *  当前用户未使用的优惠券
       */
      async get_coupon_user_list() {
        const result = await this.$get('~/api/coupon_user/get_list', {
          user_id: this.userInfo.user_id,
		  is_use: 0
        });
        this.couponNumber = result.result.count;
      },
    },
    mounted() {
      for (let i = 0;i<this.tabbarList.length;i++){
        if (this.tabbarList[i].pagePath === "/pages/user/index") {
          this.tabbarIndex = i;
        }
      }
      this.getFollowList();
      this.getDynamicList(this.userInfo.user_id);
      this.getMessageInformList();
    }
  };
</script>

<style lang="scss" scoped>
.user-statistics {
  justify-content: space-around !important;
}
.user-sum {
  font-size: 24px;
  font-weight: 600;
}
</style>
