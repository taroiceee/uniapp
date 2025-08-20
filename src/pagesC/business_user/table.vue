<template>
  <view class="page_diy_table page_business_user_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>商家用户列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="负责人" name="person_in_charge">
                <uni-easyinput type="text" v-model="query.person_in_charge" placeholder="负责人" />
              </uni-forms-item>
                  <uni-forms-item label="店铺电话" name="shop_phone">
                <uni-easyinput type="text" v-model="query.shop_phone" placeholder="店铺电话" />
              </uni-forms-item>
              <uni-forms-item label="店铺地址" name="store_address">
    			<uni-data-picker v-model="store_address_region" :localdata="pcaCodeData" :map="pcaCodeMap" popup-title="请选择店铺地址" @change="store_address_pcaCodeChange"></uni-data-picker>
              </uni-forms-item>
              <uni-forms-item label="注册资金" name="registered_capital">
                <view class="num_range">
              <uni-easyinput type="number" v-model="query.registered_capital_min" placeholder="注册资金开始" @input="registered_capital_input" />
              <span>-</span>
              <uni-easyinput type="number" v-model="query.registered_capital_max" placeholder="注册资金结束" @input="registered_capital_input" />
            </view>
              </uni-forms-item>
                <uni-forms-item label="审核状态" name="examine_state">
              <uni-data-select placeholder="请选择审核状态"
                               v-model="query['examine_state']"
                               :localdata="list_examine_state"
              ></uni-data-select>
            </uni-forms-item>
        </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/business_user/view?')" v-if="$check_action('/business_user/table', 'add') || $check_action('/business_user/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','person_in_charge')">
            <view class="label" v-if="true">
              <span>负责人</span>
            </view>
              <view class="value">
              <span>{{ o['person_in_charge'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','head_gender')">
            <view class="label" v-if="true">
              <span>负责人性别</span>
            </view>
              <view class="value">
              <span>{{ o['head_gender'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','shop_name')">
            <view class="label" v-if="true">
              <span>店铺名称</span>
            </view>
              <view class="value">
              <span>{{ o['shop_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','shop_phone')">
            <view class="label" v-if="true">
              <span>店铺电话</span>
            </view>
              <view class="value">
              <span>{{ o['shop_phone'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','store_address')">
            <view class="label" v-if="true">
              <span>店铺地址</span>
            </view>
              <view class="value">
              <span>{{ o['store_address'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','registered_capital')">
            <view class="label" v-if="true">
              <span>注册资金</span>
            </view>
              <view class="value">
              <span>{{ o['registered_capital'] }}万元</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','number_of_companies')">
            <view class="label" v-if="true">
              <span>公司人数</span>
            </view>
              <view class="value">
              <span>{{ o['number_of_companies'] }}人</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/business_user/table', 'del') || $check_action('/business_user/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/business_user/view?' + field + '=' + o[field])"
                  v-if="$check_action('/business_user/table', 'set') || $check_action('/business_user/view', 'set') || $check_action('/business_user/view', 'get')">
              详情
            </view>
          </view>
        </view>
      </view>
      <!-- /列表 -->
      <!-- 分页器 -->
      <uni-pagination
        class="pager"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
      ></uni-pagination>
      <!-- /分页器 -->
    </view>
  </view>
</template>
<script>
import mixin from '@/libs/mixins/page.js';
import pcaCodeData from '@/json/pca-code.json';
export default {
  mixins: [mixin],
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/business_user/get_list?like=0',
      url_del: '~/api/business_user/del',

      // 字段ID
      field: 'business_user_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              person_in_charge: "",
                        shop_phone: "",
                    store_address: "",
                    "registered_capital_min": '', // 注册资金
				"registered_capital_max": '', // 注册资金
                "examine_state":"",
        login_time: '',
        create_time: '',
      },
						  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	      // 数据
      list: [],
                                      	  store_address_region: '',
            	  registered_capital_input_timer: null,
          	  number_of_companies_input_timer: null,
        list_examine_state: [
        { value: '', text: '全部' },
        { value: '未审核', text: '未审核' },
        { value: '已通过', text: '已通过' },
        { value: '未通过', text: '未通过' },
      ],
    };
  },
  methods: {
								registered_capital_input() {
			this.registered_capital_input_timer && clearTimeout(this.registered_capital_input_timer);
			this.registered_capital_input_timer = setTimeout(() => {
				if((this.query.registered_capital_min && this.query.registered_capital_max) || (!this.query.registered_capital_min && !this.query.registered_capital_max)) {
					this.search_();
				}
			}, 300);
		},
				number_of_companies_input() {
			this.number_of_companies_input_timer && clearTimeout(this.number_of_companies_input_timer);
			this.number_of_companies_input_timer = setTimeout(() => {
				if((this.query.number_of_companies_min && this.query.number_of_companies_max) || (!this.query.number_of_companies_min && !this.query.number_of_companies_max)) {
					this.search_();
				}
			}, 300);
		},
	    search_() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 重置
     */
    reset: function reset() {
                    	  this.store_address_region = '';
	              uni.clear(this.query);
      uni.push(this.query, this.config);
      this.get_list();
    },
    delInfo(v) {
      let _this = this;
      uni.showModal({
        title: '删除',
        content: '此操作将永久删除该文件, 是否继续?',
        success: function (res) {
          if (res.confirm) {
            let list = [v];
            _this.delInfoSub(list);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    async delInfoSub(list) {
      let _this = this;
      await this.delAll(list, async (list) => {
        var bl = true;
        for (var i = 0; i < list.length; i++) {
          var user_id = _this.list[list[i]].user_id;
          var res = await this.$get('~/api/user/del', { user_id });
          if (res.result) {
            console.log('删除成功' + i);
          } else {
            console.log('删除失败' + i);
            bl = false;
            break;
          }
        }
        if (bl) {
          _this.$toast('删除成功!', 'success');
          this.get_list();
        }
      });
    },
    get_list_after(param){
      let _this = this;
      for (let i = 0;i<this.list.length;i++){
        let user_id = _this.list[i].user_id
        _this.$get("~/api/user/get_obj", {
          user_id
        }, (json) => {
          if (json.result.obj){
            _this.$delete(_this.list[i],'username');
            _this.$set(_this.list[i],'username',json.result.obj.username);
            _this.$delete(_this.list[i],'nickname');
            _this.$set(_this.list[i],'nickname',json.result.obj.nickname);
          }
        });
      }
    },
                                        	store_address_pcaCodeChange(val) {
      this.query.store_address = val.detail.value.map(item => item.value).join('/');
    },
                    },
  created() {
                              },
};
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .num_range {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
</style>