<template>
  <view id="page_diy_details" class="page_diy_details page_fresh_goods_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>生鲜商品</tn-nav-bar>
    <view class="page_diy page_fresh_goods" id="fresh_goods_details">
          
      <view class="score_wrapper" v-if="$check_option('/fresh_goods/details','can_show_score') || $check_option('/fresh_goods/details','can_score')">
        <view class="score_statistics_chart">
          <view class="score_num_text">{{ score_num }}</view>
          <view @click="go_score_num(obj)">
            <tn-rate
              :disabled="true"
              v-model="score_num"
              allowHalf
              activeColor="#f7ba2a"
              inactiveColor="#f7ba2a"
            ></tn-rate>
            <view class="score_person_num">{{score_total}}人评价</view>
          </view>
        </view>
        <score_statistics_chart
          :obj="obj"
          sourcetable="fresh_goods"
          sourcefield="fresh_goods_id"
          :refresh="scoreRefresh"
          @scorePersonTotal="scorePersonTotal"
        ></score_statistics_chart>
      </view>
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'commodity_number')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>商品编号</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["commodity_number"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'order_rules')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>下单规则</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["order_rules"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'seller_user')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>卖家用户</span>
                </view>
                    <view class="diy_field diy_uid">
                  {{ get_user_seller_user(obj['seller_user']) }}
                </view>
                </view>
                <view v-if="$check_field('get', 'store_address')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>店铺地址</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["store_address"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'shop_name')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>店铺名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["shop_name"] }}                  </span>
                </view>
                </view>
            </view>
        </view>
        <view class="row count">
  
              <view class="score view">
              <span>评分</span>
              <span>{{ obj["score"] }}</span>
            </view>
  
          </view>
      </view>

	<view class="kb-row">


	</view>





    </view>
  </view>
</template>

<script>
import score_statistics_chart from '../components/score_statistics_chart.vue';
  import mixin from '@/libs/mixins/page.js';

  export default {
    mixins: [mixin],
    components: {
      score_statistics_chart,
    },
    data() {
      return {
        url_get_obj: '~/api/fresh_goods/get_obj?',
        field: 'fresh_goods_id',
        query: {
                fresh_goods_id: 0,
        },
        // 商品详情初始化
        obj: {
          fresh_goods_id: 0,
              commodity_number: "",
                  order_rules: "",
                  seller_user: 0,
                  store_address: "",
                  shop_name: "",
            },
              // 用户列表
        list_user_seller_user: [],
              score_num: 0,
        score_total: 0,
        scoreRefresh: false,
      };
    },
    methods: {
    // #ifdef MP-WEIXIN
    preview_file(flie) {
      uni.downloadFile({
        url: flie,
        success: function (res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log('打开文档成功');
            }
          });
        }
      });
    },
    // #endif
    scorePersonTotal(total) {
      this.score_total = total
      this.scoreRefresh = false;
    },
      openUrl(url) {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${url}`,
        });
      },
      /**
       * 获取对象之后
       * @param {Object} json 结果对象
       */
      get_obj_after(json) {
        // 判断是否获取到数据
        if (this.obj) {
          var obj = this.obj;
		  // 获取评分
		  this.get_score_num(obj);
        }
      },
                  /**
       * 获取商家用户用户列表
       */
      async get_list_user_seller_user() {
        var json = await this.$get("~/api/user/get_list?user_group=商家用户");
        if(json.result && json.result.list){
          this.list_user_seller_user = json.result.list;
        }
        else if(json.error){
          console.error(json.error);
        }
      },
      get_user_seller_user(id){
        let obj = this.list_user_seller_user;
        let ret = "";
        for(let i=0;i<obj.length;i++){
          if(obj[i].user_id==id){
            ret = obj[i].nickname+"-"+obj[i].username;
          }
        }
        return ret;
      },
                  async get_score_num(obj) {
        const url = `~/api/score/avg`;
        const params = {
          field: 'score_num',
          source_table: 'fresh_goods',
          source_field: 'fresh_goods_id',
          source_id: obj['fresh_goods_id'],
        };
        const res = await this.$get(url, params);
        if (res.result) {
          this.score_num = parseFloat(res.result.toFixed(1));
        }
      },
      go_score_num(obj) {
		  if(this.$check_option('/fresh_goods/details','can_score')){
			  this.$navTo(
			      '/pages/score/edit?source_table=fresh_goods&source_field=fresh_goods_id&source_id=' +
			      obj['fresh_goods_id'] + '&product_name=' + obj['product_name'] + '&followUser_id=' + this.obj.create_by
			  );
		  }
      },
    },
    created() {
                  this.get_list_user_seller_user();
                },

    mounted() {
    },
    onShow() {
      this.scoreRefresh = true;
    },
  };
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .score_statistics_chart {
    display: flex;
    padding: 0 10px;
  }
  .score_num_text {
    font-size: 24px;
    margin-right: 5px;
  }
  .score_person_num {
    font-size: 12px;
    color: #6195bd;
    text-align: left;
  }
  .user_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user_avatar {
    width: 40px !important;
    height: 40px !important;
    border-radius: 100%;
    margin-right: 10px
  }

  .user_info {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .user_nickname {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  .user_fans {
    font-size: 12px;
    color: #999;
  }

  .item-btn {
    height: 26px;
    padding: 0 20px;
    border-radius: 4px;
    margin-right: 6px;
  }
  .item-btn-radius {
    height: 26px;
    padding: 0 10px;
    border-radius: 26px;
    margin-right: 6px;
  }
  .plain {
    color: #0079fe;
    background-color: transparent;
    border: 1px solid #0079fe;
  }
</style>