<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_i_want_to_customize_it_list container">
	<view class="content">
	  <tn-nav-bar>我要定制列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.order_number" placeholder="搜索订单号" @search="search_" @cancel="search_cancel('order_number')" @input="(val) => inputValue(val, 'order_number')" />
	      	    	  	    	  	    	      	          <Search v-model="query.name_of_commodity" placeholder="搜索商品名称" @search="search_" @cancel="search_cancel('name_of_commodity')" @input="(val) => inputValue(val, 'name_of_commodity')" />
	      	    	  	    	  	    	  	    	      	    	  	    	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	      	          <Search v-model="query.user_name" placeholder="搜索用户姓名" @search="search_" @cancel="search_cancel('user_name')" @input="(val) => inputValue(val, 'user_name')" />
	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	  	    	      	    	  	    	  	    	      	    	  	    	  	    	  	    	      					<view class="date_select" @click="production_date_date_range_picker_show = true">{{production_date_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="production_date_date_select_clear"/>

          </view>
					    	  	    	      					<view class="date_select" @click="shelf_life_time_date_range_picker_show = true">{{shelf_life_time_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="shelf_life_time_date_select_clear"/>

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
	              @click=" $navTo('/pagesC/i_want_to_customize_it/details?i_want_to_customize_it_id=' + o['i_want_to_customize_it_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'order_number')">
	                <view class="label" v-if="true">
	                  <span>订单号</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['order_number'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_number')">
	                <view class="label" v-if="true">
	                  <span>商品编号</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_number'] }}</span>
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
	  	              <view class="item-row diy-image " v-if="1 && $check_field('get', 'commodity_cover')">
	                <view class="label" v-if=" false">
	                  <span>商品封面</span>
	                </view>
	    	                <view class="value diy_img">
	                  <image :src="$fullImgUrl(o['commodity_cover'])" width="100%" height="100" />
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'production_date')">
	                <view class="label" v-if="true">
	                  <span>生产日期</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['production_date'], 'yyyy-MM-dd') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'shelf_life_time')">
	                <view class="label" v-if="true">
	                  <span>保质时间</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['shelf_life_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
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
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_album')">
	                <view class="label" v-if="true">
	                  <span>商品相册</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_album'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'customized_commodity_quantity')">
	                <view class="label" v-if="true">
	                  <span>定制商品数量</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['customized_commodity_quantity'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'total_price')">
	                <view class="label" v-if="true">
	                  <span>总价格</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['total_price'] }}</span>
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
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'user_name')">
	                <view class="label" v-if="true">
	                  <span>用户姓名</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['user_name'] }}</span>
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
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_audio')">
	                <view class="label" v-if="true">
	                  <span>定制音频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_audio'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_video')">
	                <view class="label" v-if="true">
	                  <span>定制视频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_video'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'customized_accessories')">
	                <view class="label" v-if="true">
	                  <span>定制附件</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['customized_accessories'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_picture')">
	                <view class="label" v-if="true">
	                  <span>定制图片</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_picture'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'regional_location')">
	                <view class="label" v-if="true">
	                  <span>地区位置</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['regional_location'] }}</span>
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
      :show="production_date_date_range_picker_show"
      :minYear="2022"
      @close="production_date_date_range_picker_show=false"
      @confirm="production_date_date_range_picker_confirm"
    />
				<dateRangePicker
      style="z-index: 9999;"
      :show="shelf_life_time_date_range_picker_show"
      :minYear="2022"
      @close="shelf_life_time_date_range_picker_show=false"
      @confirm="shelf_life_time_date_range_picker_confirm"
    />
											<dateRangePicker
      style="z-index: 9999;"
      :show="delivery_date_date_range_picker_show"
      :minYear="2022"
      @close="delivery_date_date_range_picker_show=false"
      @confirm="delivery_date_date_range_picker_confirm"
    />
							</view>
</template>

<script>
import Search from '@/components/businessCp/search.vue';
import mixin from '@/libs/mixins/page.js';
import MeDropdown from '@/components/me-dropdown/index.vue';
import dateRangePicker from '@/components/date-range-picker/date-range-picker.vue';
import pcaCodeData from '@/json/pca-code.json';
export default {
  mixins: [mixin],
  components: {
    Search,
    MeDropdown,
    dateRangePicker,
  },
  data() {
    return {
      url_get_list: '~/api/i_want_to_customize_it/get_list?like=0',
                                                      // 用户列表
      list_user_business_user: [],
                                          // 用户列表
      list_user_custom_user: [],
                                                	  regional_location_region: '',
    																					  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	      query: {
                order_number: "", // 订单号
                          name_of_commodity: "", // 商品名称
                    				production_date_min: '',
        production_date_max: '',
                				shelf_life_time_min: '',
        shelf_life_time_max: '',
                                    user_name: "", // 用户姓名
                            examine_state: "已通过", // 审核状态
        examine_reply: "", // 审核状态
        i_want_to_customize_it_id: 0, // ID
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
						 									 									 									 									 									 						production_date_date_range_picker_show: false,
      production_date_date_text: '请选择生产日期',
										 						shelf_life_time_date_range_picker_show: false,
      shelf_life_time_date_text: '请选择保质时间',
										 									 									 									 			customized_commodity_quantity_input_timer: null,
													 									 									 									 						delivery_date_date_range_picker_show: false,
      delivery_date_date_text: '请选择交付日期',
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
																					production_date_date_range_picker_confirm(date) {
				this.query.production_date_min = date[0];
				this.query.production_date_max = date[1];
				this.production_date_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			production_date_date_select_clear() {
				this.query.production_date_min = '';
				this.query.production_date_max = '';
				this.production_date_date_text = '请选择生产日期';
				this.search_();
			},
								shelf_life_time_date_range_picker_confirm(date) {
				this.query.shelf_life_time_min = date[0];
				this.query.shelf_life_time_max = date[1];
				this.shelf_life_time_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			shelf_life_time_date_select_clear() {
				this.query.shelf_life_time_min = '';
				this.query.shelf_life_time_max = '';
				this.shelf_life_time_date_text = '请选择保质时间';
				this.search_();
			},
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
													customized_commodity_quantity_input() {
			this.customized_commodity_quantity_input_timer && clearTimeout(this.customized_commodity_quantity_input_timer);
			this.customized_commodity_quantity_input_timer = setTimeout(() => {
				if((this.query.customized_commodity_quantity_min && this.query.customized_commodity_quantity_max) || (!this.query.customized_commodity_quantity_min && !this.query.customized_commodity_quantity_max)) {
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
                                                                    		regional_location_pcaCodeChange(val) {
		  this.query.regional_location = val.detail.value.map(item => item.value).join('/');
		  this.search_();
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