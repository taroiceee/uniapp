<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_customized_products_list container">
	<view class="content">
	  <tn-nav-bar>定制商品列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	  	    	      	          <Search v-model="query.name_of_commodity" placeholder="搜索商品名称" @search="search_" @cancel="search_cancel('name_of_commodity')" @input="(val) => inputValue(val, 'name_of_commodity')" />
	      	    	  	    	      	    	  	    	  	    	  	    	  	    	      	    	  	    	      	    	  	    	  	    	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	  	    	  	    	      	    	  	    	      	        	          <view class="drop_down">
	            <uni-data-select
	                    @change="change_category_name"
	                    v-model="query.category_name"
	                    :localdata="list_category_name"
	  				  :placeholder="placeholder_category_name"
	            ></uni-data-select>
	          </view>
	        	      	    	  	    	  	    	  	    	  	    	      				<view class="num_range">
					<uni-easyinput type="text" v-model="query.custom_inventory_min" placeholder="定制库存开始" @input="custom_inventory_input" />
					<span>-</span>
					<uni-easyinput type="text" v-model="query.custom_inventory_max" placeholder="定制库存结束" @input="custom_inventory_input" />
				</view>
					    	  	    	      					<view class="date_select" @click="product_production_date_date_range_picker_show = true">{{product_production_date_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="product_production_date_date_select_clear"/>

          </view>
					    	  	    	  	    	      					<view class="date_select" @click="shelf_life_time_date_range_picker_show = true">{{shelf_life_time_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="shelf_life_time_date_select_clear"/>

          </view>
					    	  	    	  	    	  	    	  	    	  	    	  	    	  	  	    	      	    	      	    	      	          <view class="split-line-10"></view>
	          <view class="classification-list">
	            <scroll-view class="scroll-view" scroll-x="true">
	              <view
	                :class="['category-item', active == item.value ? 'active' : '']"
	                @click="on_click_category_name(item.value)"
	                v-for="(item, index) in list_type_category_name"
	                :key="index">
	                {{ item.value }}
	              </view>
	            </scroll-view>
	          </view>
	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	      	    	  				<view class="map_btn" @click="$navTo('/pagesC/customized_products/map')">查看地图</view>
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
	              @click=" $navTo('/pagesC/customized_products/details?customized_products_id=' + o['customized_products_id'])">
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_number')">
	                <view class="label" v-if="true">
	                  <span>商品编号</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_number'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  diy-main-title " v-if="1 && $check_field('get', 'name_of_commodity')">
	                <view class="label" v-if="true">
	                  <span>商品名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['name_of_commodity'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'category_name')">
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
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_album')">
	                <view class="label" v-if="true">
	                  <span>商品相册</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_album'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_vuser_ideo')">
	                <view class="label" v-if="true">
	                  <span>商品视频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_vuser_ideo'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_inventory')">
	                <view class="label" v-if="true">
	                  <span>定制库存</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_inventory'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'product_production_date')">
	                <view class="label" v-if="true">
	                  <span>产品生产日期</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['product_production_date'], 'yyyy-MM-dd') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  diy-create-by " v-if="1 && $check_field('get', 'business_user')">
	                <view class="label" v-if="true">
	                  <span>商家用户</span>
	                </view>
	    	                <view class="value">
	                  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_business_user(o['business_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
	                  <span>{{ get_user_business_user(o['business_user']).nickname }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  diy-list-time " v-if="1 && $check_field('get', 'shelf_life_time')">
	                <view class="label" v-if="true">
	                  <span>保质时间</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['shelf_life_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_statement_content')">
	                <view class="label" v-if="true">
	                  <span>定制声明内容</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_statement_content'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_type')">
	                <view class="label" v-if="true">
	                  <span>定制类型</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_type'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'custom_requirements')">
	                <view class="label" v-if="true">
	                  <span>定制要求</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['custom_requirements'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  diy-list-price " v-if="1 && $check_field('get', 'customized_price')">
	                <view class="label" v-if="true">
	                  <span>定制价格</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['customized_price'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'notes')">
	                <view class="label" v-if="true">
	                  <span>说明备注</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['notes'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_details')">
	                <view class="label" v-if="true">
	                  <span>商品详情</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_details'] }}</span>
	                </view>
	    	              </view>
	  	  	            </view>
	  
	  	            <view class="customized-item-footer">
	    	              <view class="praise">
	                <text class="icon iconfont icon-dianzan"></text>
	                {{ o['praise_len'] || 0 }}
	              </view>
	    	    	              <view class="collect">
	                <text class="icon iconfont icon-shoucang"></text>
	                {{ o['collect_len'] || 0 }}
	              </view>
	    	    	              <view class="comment">
	                <text class="icon iconfont icon-pinglun"></text>
	                {{ o['comment_len'] || 0 }}
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
      :show="product_production_date_date_range_picker_show"
      :minYear="2022"
      @close="product_production_date_date_range_picker_show=false"
      @confirm="product_production_date_date_range_picker_confirm"
    />
					<dateRangePicker
      style="z-index: 9999;"
      :show="shelf_life_time_date_range_picker_show"
      :minYear="2022"
      @close="shelf_life_time_date_range_picker_show=false"
      @confirm="shelf_life_time_date_range_picker_confirm"
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
      url_get_list: '~/api/customized_products/get_list?like=0',
                        list_type_category_name: [{ value: '全部', text: '全部' }],
                                                                                                        // 分类名称选项列表
      list_category_name: [{value:"全部",text:"全部"}],
	  placeholder_category_name: "请选择分类名称",
                                                // 用户列表
      list_user_business_user: [],
                                                																      query: {
                  name_of_commodity: "", // 商品名称
                        category_name: "", // 分类名称
                      				"custom_inventory_min": '', // 定制库存
				"custom_inventory_max": '', // 定制库存
			          				product_production_date_min: '',
        product_production_date_max: '',
                  				shelf_life_time_min: '',
        shelf_life_time_max: '',
                            examine_state: "已通过", // 审核状态
        customized_products_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
      count: 50,
                        active: '全部',
                                                                                          menuList: [
                                        {
            title: '点赞数',
            type: 'sort',
            command: '`praise_len`',
            value: 0,
        },
        {
            title: '点击数',
            type: 'sort',
            command: '`hits`',
            value: 0,
        },
        {
            title: '收藏数',
            type: 'sort',
            command: '`collect_len`',
            value: 0,
        },
        {
            title: '发布时间',
            type: 'sort',
            command: '`create_time`',
            value: 0,
        }
      ],
						 									 									 									 									 									 									 			custom_inventory_input_timer: null,
													 						product_production_date_date_range_picker_show: false,
      product_production_date_date_text: '请选择产品生产日期',
										 									 						shelf_life_time_date_range_picker_show: false,
      shelf_life_time_date_text: '请选择保质时间',
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
																											product_production_date_date_range_picker_confirm(date) {
				this.query.product_production_date_min = date[0];
				this.query.product_production_date_max = date[1];
				this.product_production_date_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			product_production_date_date_select_clear() {
				this.query.product_production_date_min = '';
				this.query.product_production_date_max = '';
				this.product_production_date_date_text = '请选择产品生产日期';
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
      this.get_praise(list);
      if (func) {
        func(json);
      }
    },
    /**
     * 获取点赞数
     * @param {Object} list
     */
    get_praise(list) {
		for (let i = 0; i < list.length; i++) {
			list[i].praise_len = 0;
		}
		this.$get('~/api/praise/list_group?groupby=source_id&source_table=customized_products',{},(res) => {
		    if (res.result && res.result.list) {
		      res.result.list.map((o) => {
		        for (var i = 0; i < list.length; i++) {
		          var oj = list[i];
		          if (oj['customized_products_id'] === o['source_id']) {
		            oj['praise_len'] = o['count'];
		            // break;
		          }
		        }
		      });
		    } else if (res.error) {
		      console.error(res.error);
		    }
		  }
		);
    },
									custom_inventory_input() {
			this.custom_inventory_input_timer && clearTimeout(this.custom_inventory_input_timer);
			this.custom_inventory_input_timer = setTimeout(() => {
				if((this.query.custom_inventory_min && this.query.custom_inventory_max) || (!this.query.custom_inventory_min && !this.query.custom_inventory_max)) {
					this.search_();
				}
			}, 300);
		},
										                      on_click_category_name(val) {
      this.active = val;
      this.change_tab_category_name(val);
    },
    change_tab_category_name(val) {
      if (val === '全部' || val === '') {
        this.query.category_name = '';
      } else {
        this.query.category_name = val;
      }
      this.search_();
    },
    async get_list_type_category_name() {
      var json = await this.$get('~/api/customized_products/get_list?groupby=category_name');
      if (json.result && json.result.list) {
        json.result.list.map((o) =>
            this.list_type_category_name.push({
              value: o.category_name,
              text: o.category_name,
            })
        );
      } else if (json.error) {
        $.toast(json.error.message);
        console.error(json.error);
      }
    },
                                                                                                                            // 改变分类标签
        change_category_name(val) {
          if (val === "全部" || val === "") {
            this.query.category_name = "";
          }else{
            this.query.category_name = val
          }
          this.search_();
        },
                /**
     * 获取分类名称列表
     */
    async get_list_category_name() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_category_name.push({value:o.classification_name,text:o.classification_name}));
          }
          else if(json.error){
            $.toast(json.error.message);
            console.error(json.error);
          }
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
                                                                            search_() {
      this.query.page = 1;
      this.get_list();
    },
    search_cancel(key) {
      this.query[key] = '';
      this.search_();
    },
    dateFormat(fmt) {
      var myDate = new Date();
      var o = {
        'M+': myDate.getMonth() + 1, // 月份
        'd+': myDate.getDate(), // 日
        'h+': myDate.getHours(), // 小时
        'm+': myDate.getMinutes(), // 分
        's+': myDate.getSeconds(), // 秒
        'q+': Math.floor((myDate.getMonth() + 3) / 3), // 季度
        S: myDate.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
          );
      return fmt;
    },
	inputValue(val, key) {
	  this.query[key] = val;
	  this.search_();
	},
		  },
  created() {
              // 初始化分类名称列表
    this.get_list_category_name();
                                this.get_list_user_business_user();
                                                                this.get_list_type_category_name();
                                                                                                                    var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss")+"";
    var url_get_list = "~/api/customized_products/get_list?timing_start_time_max=" + oNowDate +
        "&timing_end_time_min=" + oNowDate + "&like=0";
    this.url_get_list= url_get_list;
    this.get_list();
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