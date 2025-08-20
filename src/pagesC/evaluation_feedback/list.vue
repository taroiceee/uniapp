<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_evaluation_feedback_list container">
	<view class="content">
	  <tn-nav-bar>评价反馈列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.order_number" placeholder="搜索订单号" @search="search_" @cancel="search_cancel('order_number')" @input="(val) => inputValue(val, 'order_number')" />
	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	      	    	  	    	      	    	  	    	  	    	  	    	  	    	      	    	  	    	  	  	    	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	      					<view class="date_select" @click="evaluation_time_date_range_picker_show = true">{{evaluation_time_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="evaluation_time_date_select_clear"/>

          </view>
					    	  	    	      	        	          <view class="drop_down">
	            <uni-data-select
	                    @change="change_evaluation_grade"
	                    v-model="query.evaluation_grade"
	                    :localdata="list_evaluation_grade" 
	  				  :placeholder="placeholder_evaluation_grade"
	            ></uni-data-select>
	          </view>
	        	      	    	  	    	  	    	  	    	  	    	      				<view class="num_range">
					<uni-easyinput type="text" v-model="query.appearance_appearance_rating_min" placeholder="外貌外观评分开始" @input="appearance_appearance_rating_input" />
					<span>-</span>
					<uni-easyinput type="text" v-model="query.appearance_appearance_rating_max" placeholder="外貌外观评分结束" @input="appearance_appearance_rating_input" />
				</view>
					    	  	    	  	  			          <MeDropdown
	            :menuList.sync="menuList"
	            themeColor="#0079fe"
	            :duration="300"
	            :isCeiling="true"
	            @onConfirm="onConfirmDropdown"
	            @onChange="onChangeDropdown"
	          ></MeDropdown>
	        </view>
	  
	        <!-- 筛选模块(结束) -->
	  <!-- 列表 -->
	        <view class="customized-list">
	  	          <view v-for="(o, i) in list" :key="i" class="customized-item">
	  	  	            <view
	              class="customized-item-body"
	              @click=" $navTo('/pagesC/evaluation_feedback/details?evaluation_feedback_id=' + o['evaluation_feedback_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'order_number')">
	                <view class="label" v-if="true">
	                  <span>订单号</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['order_number'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'name_of_commodity')">
	                <view class="label" v-if="true">
	                  <span>商品名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['name_of_commodity'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'category_name')">
	                <view class="label" v-if="true">
	                  <span>分类名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['category_name'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'business_user')">
	                <view class="label" v-if="true">
	                  <span>商家用户</span>
	                </view>
	    	                <view class="value">
	                  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_business_user(o['business_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
	                  <span>{{ get_user_business_user(o['business_user']).nickname }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'customized_price')">
	                <view class="label" v-if="true">
	                  <span>定制价格</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['customized_price'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_user')">
	                <view class="label" v-if="true">
	                  <span>定制用户</span>
	                </view>
	    	                <view class="value">
	                  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_custom_user(o['custom_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
	                  <span>{{ get_user_custom_user(o['custom_user']).nickname }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'delivery_date')">
	                <view class="label" v-if="true">
	                  <span>交付日期</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['delivery_date'], 'yyyy-MM-dd') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'evaluation_time')">
	                <view class="label" v-if="true">
	                  <span>评价时间</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['evaluation_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'evaluation_grade')">
	                <view class="label" v-if="true">
	                  <span>评价等级</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['evaluation_grade'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'optimization_recommendations')">
	                <view class="label" v-if="true">
	                  <span>优化建议</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['optimization_recommendations'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'performance_score')">
	                <view class="label" v-if="true">
	                  <span>性能评分</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['performance_score'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'practicality_score')">
	                <view class="label" v-if="true">
	                  <span>实用性评分</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['practicality_score'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'appearance_appearance_rating')">
	                <view class="label" v-if="true">
	                  <span>外貌外观评分</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['appearance_appearance_rating'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'cost_effective')">
	                <view class="label" v-if="true">
	                  <span>性价比</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['cost_effective'] }}</span>
	                </view>
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
									<dateRangePicker
      style="z-index: 9999;"
      :show="delivery_date_date_range_picker_show"
      :minYear="2022"
      @close="delivery_date_date_range_picker_show=false"
      @confirm="delivery_date_date_range_picker_confirm"
    />
				<dateRangePicker
      style="z-index: 9999;"
      :show="evaluation_time_date_range_picker_show"
      :minYear="2022"
      @close="evaluation_time_date_range_picker_show=false"
      @confirm="evaluation_time_date_range_picker_confirm"
    />
								</view>
</template>

<script>
import Search from '@/components/businessCp/search.vue';
import mixin from '@/libs/mixins/page.js';
import MeDropdown from '@/components/me-dropdown/index.vue';
import dateRangePicker from '@/components/date-range-picker/date-range-picker.vue';
export default {
  mixins: [mixin],
  components: {
    Search,
    MeDropdown,
    dateRangePicker,
  },
  data() {
    return {
      url_get_list: '~/api/evaluation_feedback/get_list?like=0',
                              // 用户列表
      list_user_business_user: [],
                        // 用户列表
      list_user_custom_user: [],
                          // 评价等级选项列表
      list_evaluation_grade: [{value:"全部",text:"全部"}],
	  placeholder_evaluation_grade: "请选择评价等级",
                                    														      query: {
                order_number: "", // 订单号
                            				evaluation_time_min: '',
        evaluation_time_max: '',
                        evaluation_grade: "", // 评价等级
                      				"appearance_appearance_rating_min": '', // 外貌外观评分
				"appearance_appearance_rating_max": '', // 外貌外观评分
			            evaluation_feedback_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
      count: 50,
      menuList: [
                                    {
            title: '发布时间',
            type: 'sort',
            command: '`create_time`',
            value: 0,
        }
      ],
						 									 									 									 									 									 									 						delivery_date_date_range_picker_show: false,
      delivery_date_date_text: '请选择交付日期',
										 						evaluation_time_date_range_picker_show: false,
      evaluation_time_date_text: '请选择评价时间',
										 									 									 			performance_score_input_timer: null,
													 			practicality_score_input_timer: null,
													 			appearance_appearance_rating_input_timer: null,
													 			cost_effective_input_timer: null,
										    };
  },

  watch: {
  	list: {
  		handler(val) {
								  		},
  		deep: true
  	},
  },
  methods: {
																								delivery_date_date_range_picker_confirm(date) {
				this.query.delivery_date_min = date[0];
				this.query.delivery_date_max = date[1];
				this.delivery_date_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			delivery_date_date_select_clear() {
				this.query.delivery_date_min = '';
				this.query.delivery_date_max = '';
				this.delivery_date_date_text = '请选择交付日期';
				this.search_();
			},
								evaluation_time_date_range_picker_confirm(date) {
				this.query.evaluation_time_min = date[0];
				this.query.evaluation_time_max = date[1];
				this.evaluation_time_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			evaluation_time_date_select_clear() {
				this.query.evaluation_time_min = '';
				this.query.evaluation_time_max = '';
				this.evaluation_time_date_text = '请选择评价时间';
				this.search_();
			},
																					    onConfirmDropdown(val) {
      if (val.value) {
        this.query.orderby = val.command + ' ' + val.value;
      } else {
        this.query.orderby = '';
      }
      this.search_();
    },
    onChangeDropdown(v) {},
    /**
     * 获取列表后
     * @param {Object} json
     * @param {Object} func
     */
    get_list_after(json, func) {
      let list = json.result.list;
      if (func) {
        func(json);
      }
    },
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
      let ret = {nickname: "未知用户", avatar: ""};
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i];
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
      let ret = {nickname: "未知用户", avatar: ""};
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i];
        }
      }
      return ret;
    },
                                                // 改变分类标签
        change_evaluation_grade(val) {
          if (val === "全部" || val === "") {
            this.query.evaluation_grade = "";
          }else{
            this.query.evaluation_grade = val
          }
          this.search_();
        },
                /**
     * 获取评价等级列表
     */
    async get_list_evaluation_grade() {
                  ['优','良','中','差'].map((o) => this.list_evaluation_grade.push({value:o,text:o}));
                    },
                                                        search_() {
      this.query.page = 1;
      this.get_list();
    },
    search_cancel(key) {
      this.query[key] = '';
      this.search_();
    },
	inputValue(val, key) {
	  this.query[key] = val;
	  this.search_();
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
		margin-bottom: 10px;
	}
	.date_select {
		position: relative;
		text-align: center;
		padding: 8px;
		border: 1px solid #e5e5e5;
		border-radius: 50px;
		color: #6a6a6a;
		margin-bottom: 10px;
	}

.date_select_clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>