<template>
  <view class="page_diy_table page_evaluation_feedback_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>评价反馈列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="订单号" name="order_number">
                <uni-easyinput type="text" v-model="query.order_number" placeholder="订单号" />
              </uni-forms-item>
                          <uni-forms-item label="评价时间" name="evaluation_time">
                <uni-easyinput type="text" v-model="query.evaluation_time" placeholder="评价时间" />
              </uni-forms-item>
              <uni-forms-item label="评价等级" name="evaluation_grade">
                      <uni-data-select
                    placeholder="请选择评价等级"
                    v-model="query['evaluation_grade']"
                    :localdata="list_evaluation_grade"
            ></uni-data-select>
                    </uni-forms-item>
                    <uni-forms-item label="外貌外观评分" name="appearance_appearance_rating">
                <view class="num_range">
              <uni-easyinput type="number" v-model="query.appearance_appearance_rating_min" placeholder="外貌外观评分开始" @input="appearance_appearance_rating_input" />
              <span>-</span>
              <uni-easyinput type="number" v-model="query.appearance_appearance_rating_max" placeholder="外貌外观评分结束" @input="appearance_appearance_rating_input" />
            </view>
              </uni-forms-item>
            </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
						</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','order_number')">
            <view class="label" v-if="true">
              <span>订单号</span>
            </view>
              <view class="value">
              <span>{{ o['order_number'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','name_of_commodity')">
            <view class="label" v-if="true">
              <span>商品名称</span>
            </view>
              <view class="value">
              <span>{{ o['name_of_commodity'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','category_name')">
            <view class="label" v-if="true">
              <span>分类名称</span>
            </view>
              <view class="value">
              <span>{{ o['category_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','business_user')">
            <view class="label" v-if="true">
              <span>商家用户</span>
            </view>
              <view class="value">
              <span>{{ get_user_business_user(o['business_user']) }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','customized_price')">
            <view class="label" v-if="true">
              <span>定制价格</span>
            </view>
              <view class="value">
              <span>{{ o['customized_price'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_user')">
            <view class="label" v-if="true">
              <span>定制用户</span>
            </view>
              <view class="value">
              <span>{{ get_user_custom_user(o['custom_user']) }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','delivery_date')">
            <view class="label" v-if="true">
              <span>交付日期</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['delivery_date'], 'yyyy-MM-dd') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','evaluation_time')">
            <view class="label" v-if="true">
              <span>评价时间</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['evaluation_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','evaluation_grade')">
            <view class="label" v-if="true">
              <span>评价等级</span>
            </view>
              <view class="value">
              <span>{{ o['evaluation_grade'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','optimization_recommendations')">
            <view class="label" v-if="true">
              <span>优化建议</span>
            </view>
              <view class="value">
              <span>{{ o['optimization_recommendations'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','performance_score')">
            <view class="label" v-if="true">
              <span>性能评分</span>
            </view>
              <view class="value">
              <span>{{ o['performance_score'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','practicality_score')">
            <view class="label" v-if="true">
              <span>实用性评分</span>
            </view>
              <view class="value">
              <span>{{ o['practicality_score'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','appearance_appearance_rating')">
            <view class="label" v-if="true">
              <span>外貌外观评分</span>
            </view>
              <view class="value">
              <span>{{ o['appearance_appearance_rating'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','cost_effective')">
            <view class="label" v-if="true">
              <span>性价比</span>
            </view>
              <view class="value">
              <span>{{ o['cost_effective'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/evaluation_feedback/table', 'del') || $check_action('/evaluation_feedback/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/evaluation_feedback/view?' + field + '=' + o[field])"
                  v-if="$check_action('/evaluation_feedback/table', 'set') || $check_action('/evaluation_feedback/view', 'set') || $check_action('/evaluation_feedback/view', 'get')">
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
export default {
  mixins: [mixin],
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/evaluation_feedback/get_list?like=0',
      url_del: '~/api/evaluation_feedback/del',

      // 字段ID
      field: 'evaluation_feedback_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              order_number: "",
                                evaluation_time: "",
                    evaluation_grade: "",
                          "appearance_appearance_rating_min": '', // 外貌外观评分
				"appearance_appearance_rating_max": '', // 外貌外观评分
                login_time: '',
        create_time: '',
      },
														      // 数据
      list: [],
                                          // 用户列表
      list_user_business_user: [],
                                // 用户列表
      list_user_custom_user: [],
                                  // 评价等级列表
      list_evaluation_grade: [{value:"",text:"全部"}],
                        	  performance_score_input_timer: null,
          	  practicality_score_input_timer: null,
          	  appearance_appearance_rating_input_timer: null,
          	  cost_effective_input_timer: null,
      };
  },
  methods: {
													performance_score_input() {
			this.performance_score_input_timer && clearTimeout(this.performance_score_input_timer);
			this.performance_score_input_timer = setTimeout(() => {
				if((this.query.performance_score_min && this.query.performance_score_max) || (!this.query.performance_score_min && !this.query.performance_score_max)) {
					this.search_();
				}
			}, 300);
		},
				practicality_score_input() {
			this.practicality_score_input_timer && clearTimeout(this.practicality_score_input_timer);
			this.practicality_score_input_timer = setTimeout(() => {
				if((this.query.practicality_score_min && this.query.practicality_score_max) || (!this.query.practicality_score_min && !this.query.practicality_score_max)) {
					this.search_();
				}
			}, 300);
		},
				appearance_appearance_rating_input() {
			this.appearance_appearance_rating_input_timer && clearTimeout(this.appearance_appearance_rating_input_timer);
			this.appearance_appearance_rating_input_timer = setTimeout(() => {
				if((this.query.appearance_appearance_rating_min && this.query.appearance_appearance_rating_max) || (!this.query.appearance_appearance_rating_min && !this.query.appearance_appearance_rating_max)) {
					this.search_();
				}
			}, 300);
		},
				cost_effective_input() {
			this.cost_effective_input_timer && clearTimeout(this.cost_effective_input_timer);
			this.cost_effective_input_timer = setTimeout(() => {
				if((this.query.cost_effective_min && this.query.cost_effective_max) || (!this.query.cost_effective_min && !this.query.cost_effective_max)) {
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
                                                              uni.clear(this.query);
      uni.push(this.query, this.config);
      this.get_list();
    },
    get_list_before(param){
      var user_group = this.user.user_group;
      if(user_group != "管理员"){
          let sqlwhere = "(";
                                                if(user_group=="商家用户"){
          sqlwhere+= "business_user = " + this.user.user_id + " or ";
        }
                                  if(user_group=="注册用户"){
          sqlwhere+= "custom_user = " + this.user.user_id + " or ";
        }
                                                                                                  if (sqlwhere.length>1){
          sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
          sqlwhere += ")";
          param["sqlwhere"] = sqlwhere;
        }
        }
      return param;
    },
    delInfo(v) {
      let _this = this;
      uni.showModal({
        title: '删除',
        content: '此操作将永久删除该文件, 是否继续?',
        success: function (res) {
          if (res.confirm) {
            let list = [v];
            _this.delAll(list);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
	get_list_after(param){
	      let _this = this;
		},
                                  /**
     * 获取商家用户用户列表
     */
    async get_list_user_business_user() {
      var json = await this.$get("~/api/user/get_list?user_group=商家用户");
      if(json.result && json.result.list){
        this.list_user_business_user = json.result.list;
      }
      else if(json.error){
        console.error(json.error);
      }
    },

    get_user_business_user(id){
      let obj = this.list_user_business_user;
      let ret = "";
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i].nickname+"-"+obj[i].username;
        }
      }
      return ret;
    },
                      /**
     * 获取注册用户用户列表
     */
    async get_list_user_custom_user() {
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        this.list_user_custom_user = json.result.list;
      }
      else if(json.error){
        console.error(json.error);
      }
    },

    get_user_custom_user(id){
      let obj = this.list_user_custom_user;
      let ret = "";
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i].nickname+"-"+obj[i].username;
        }
      }
      return ret;
    },
                          /**
     * 获取评价等级列表
     */
    async get_list_evaluation_grade() {
              ['优','良','中','差'].map((o) => this.list_evaluation_grade.push({value:o,text:o}));
                },
                                                  },
  created() {
                        this.get_list_user_business_user();
                  this.get_list_user_custom_user();
                // 初始化评价等级列表
    this.get_list_evaluation_grade();
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