<template>
  <view class="cp-list-wrap">
    <!-- 视图 -->
    <view class="cp-list-item" v-for="(o, i) in list" :key="i">
        <view class="item-row  " v-if="0 && $check_index_field('get', 'commodity_number', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>商品编号</span>
        </view>
            <view class="value text">
          <span>{{ o['commodity_number'] }}</span>
        </view>
          </view>
          <view class="item-row  diy-main-title " v-if="1 && $check_index_field('get', 'name_of_commodity', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>商品名称</span>
        </view>
            <view class="value text">
          <span>{{ o['name_of_commodity'] }}</span>
        </view>
          </view>
          <view class="item-row  " v-if="1 && $check_index_field('get', 'category_name', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>分类名称</span>
        </view>
            <view class="value text">
          <span>{{ o['category_name'] }}</span>
        </view>
          </view>
          <view class="item-row diy-image " v-if="1 && $check_index_field('get', 'commodity_cover', '/customized_products/list')">
        <view class="label" v-if=" false">
          <span>商品封面</span>
        </view>
            <view class="value">
          <image :src="$fullImgUrl(o['commodity_cover']) || '/static/img/default.png'" mode="scaleToFill" />
        </view>
          </view>
          <view class="item-row  " v-if="0 && $check_index_field('get', 'commodity_album', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>商品相册</span>
        </view>
            <view class="value text">
          <span>{{ o['commodity_album'] }}</span>
        </view>
          </view>
              <view class="item-row  " v-if="0 && $check_index_field('get', 'custom_inventory', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>定制库存</span>
        </view>
            <view class="value text">
          <span>{{ o['custom_inventory'] }}</span>
        </view>
          </view>
          <view class="item-row  " v-if="0 && $check_index_field('get', 'product_production_date', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>产品生产日期</span>
        </view>
            <view class="value time">
          <span>{{ $toTime(o['product_production_date'], 'yyyy-MM-dd') }}</span>
        </view>
          </view>
          <view class="item-row  diy-create-by " v-if="1 && $check_index_field('get', 'business_user', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>商家用户</span>
        </view>
            <view class="value time">
		  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_business_user(o['business_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
          <span>{{ get_user_business_user(o['business_user']).nickname }}</span>
        </view>
          </view>
          <view class="item-row  diy-list-time " v-if="1 && $check_index_field('get', 'shelf_life_time', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>保质时间</span>
        </view>
            <view class="value time">
          <span>{{ $toTime(o['shelf_life_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
        </view>
          </view>
              <view class="item-row  " v-if="0 && $check_index_field('get', 'custom_type', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>定制类型</span>
        </view>
            <view class="value text">
          <span>{{ o['custom_type'] }}</span>
        </view>
          </view>
          <view class="item-row  " v-if="0 && $check_index_field('get', 'custom_requirements', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>定制要求</span>
        </view>
            <view class="value text">
          <span>{{ o['custom_requirements'] }}</span>
        </view>
          </view>
          <view class="item-row  diy-list-price " v-if="1 && $check_index_field('get', 'customized_price', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>定制价格</span>
        </view>
            <view class="value text">
          <span>{{ o['customized_price'] }}</span>
        </view>
          </view>
          <view class="item-row  " v-if="0 && $check_index_field('get', 'notes', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>说明备注</span>
        </view>
            <view class="value text">
          <span>{{ o['notes'] }}</span>
        </view>
          </view>
          <view class="item-row  " v-if="0 && $check_index_field('get', 'commodity_details', '/customized_products/list')">
        <view class="label" v-if="true">
          <span>商品详情</span>
        </view>
            <view class="value text">
          <span>{{ o['commodity_details'] }}</span>
        </view>
          </view>
        <view class="content">
        <view class="item-row">
          <view class="value">
            <text class="icon iconfont icon-chakan"></text>
            <text class="text">{{ o['praise_len'] }}</text>
          </view>
        </view>
        <view class="item-row">
          <view class="value">
            <text class="icon iconfont icon-dianzan"></text><text>{{ o['hits'] }}</text>
          </view>
        </view>
      </view>

      <view class="item-row">
        <view class="create_time_block value number">
          <span>{{ $toTime(o.create_time, 'yyyy-MM-dd hh:mm:ss') }}</span>
        </view>
      </view>

      <view class="me-btn btn-see" @click="
          $navTo('/pagesC/customized_products/details?customized_products_id=' +
              o['customized_products_id']
          )
        "
        >查看详情</view
      >
    </view>
    <!-- /视图 -->
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
                        // 用户列表
      list_user_business_user: [],
                    };
  },
  methods: {
                      /**
     * 获取商家用户用户列表
     */
    async get_list_user_business_user() {
      var json = await this.$get('/user/get_list', {
        user_group: '商家用户'
      });
      if(json.result && json.result.list){
        this.list_user_business_user = json.result.list;
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_business_user(id){
      let obj = this.list_user_business_user;
      let ret = {nickname: "未知用户", avatar: ""};
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i];
        }
      }
      return ret;
    },
                  },
  created() {
                      this.get_list_user_business_user();
                  },
};
</script>

<style lang="scss" scoped>
</style>