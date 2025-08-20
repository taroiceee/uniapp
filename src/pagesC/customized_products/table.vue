<template>
  <view class="page_diy_table page_customized_products_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>定制商品列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
              <uni-forms-item label="商品名称" name="name_of_commodity">
                <uni-easyinput type="text" v-model="query.name_of_commodity" placeholder="商品名称" />
              </uni-forms-item>
              <uni-forms-item label="分类名称" name="category_name">
                      <uni-data-select
                    placeholder="请选择分类名称"
                    v-model="query['category_name']"
                    :localdata="list_category_name"
            ></uni-data-select>
                    </uni-forms-item>
                    <uni-forms-item label="定制库存" name="custom_inventory">
                <view class="num_range">
              <uni-easyinput type="number" v-model="query.custom_inventory_min" placeholder="定制库存开始" @input="custom_inventory_input" />
              <span>-</span>
              <uni-easyinput type="number" v-model="query.custom_inventory_max" placeholder="定制库存结束" @input="custom_inventory_input" />
            </view>
              </uni-forms-item>
              <uni-forms-item label="产品生产日期" name="product_production_date">
                <uni-easyinput type="text" v-model="query.product_production_date" placeholder="产品生产日期" />
              </uni-forms-item>
                <uni-forms-item label="保质时间" name="shelf_life_time">
                <uni-easyinput type="text" v-model="query.shelf_life_time" placeholder="保质时间" />
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
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/customized_products/view?')" v-if="$check_action('/customized_products/table', 'add') || $check_action('/customized_products/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="0 && $check_field('get','commodity_number')">
            <view class="label" v-if="true">
              <span>商品编号</span>
            </view>
              <view class="value">
              <span>{{ o['commodity_number'] }}</span>
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
          <view class="item-row " v-if="1 && $check_field('get','category_name')">
            <view class="label" v-if="true">
              <span>分类名称</span>
            </view>
              <view class="value">
              <span>{{ o['category_name'] }}</span>
            </view>
            </view>
          <view class="item-row diy-image" v-if="1 && $check_field('get','commodity_cover')">
            <view class="label" v-if=" false">
              <span>商品封面</span>
            </view>
              <view class="value diy_img">
              <image :src="$fullImgUrl(o['commodity_cover'])" width="100%" height="100" />
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','commodity_album')">
            <view class="label" v-if="true">
              <span>商品相册</span>
            </view>
              <view class="value">
              <span>{{ o['commodity_album'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','commodity_vuser_ideo')">
            <view class="label" v-if="true">
              <span>商品视频</span>
            </view>
              <view class="value">
              <span>{{ o['commodity_vuser_ideo'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_inventory')">
            <view class="label" v-if="true">
              <span>定制库存</span>
            </view>
              <view class="value">
              <span>{{ o['custom_inventory'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','product_production_date')">
            <view class="label" v-if="true">
              <span>产品生产日期</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['product_production_date'], 'yyyy-MM-dd') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','business_user')">
            <view class="label" v-if="true">
              <span>商家用户</span>
            </view>
              <view class="value">
              <span>{{ get_user_business_user(o['business_user']) }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','shelf_life_time')">
            <view class="label" v-if="true">
              <span>保质时间</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['shelf_life_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_statement_content')">
            <view class="label" v-if="true">
              <span>定制声明内容</span>
            </view>
              <view class="value">
              <span>{{ o['custom_statement_content'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_type')">
            <view class="label" v-if="true">
              <span>定制类型</span>
            </view>
              <view class="value">
              <span>{{ o['custom_type'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_requirements')">
            <view class="label" v-if="true">
              <span>定制要求</span>
            </view>
              <view class="value">
              <span>{{ o['custom_requirements'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','customized_price')">
            <view class="label" v-if="true">
              <span>定制价格</span>
            </view>
              <view class="value">
              <span>{{ o['customized_price'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','notes')">
            <view class="label" v-if="true">
              <span>说明备注</span>
            </view>
              <view class="value">
              <span>{{ o['notes'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','commodity_details')">
            <view class="label" v-if="true">
              <span>商品详情</span>
            </view>
              <view class="value">
              <span>{{ o['commodity_details'] }}</span>
            </view>
            </view>
          <view class="content">
            <view class="item-row">
              <view class="value">点赞数{{ o['praise_len'] }}</view>
            </view>
            <view class="item-row">
              <view class="value">点击数{{ o['hits'] }}</view>
            </view>
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/customized_products/table', 'del') || $check_action('/customized_products/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/customized_products/view?' + field + '=' + o[field])"
                  v-if="$check_action('/customized_products/table', 'set') || $check_action('/customized_products/view', 'set') || $check_action('/customized_products/view', 'get')">
              详情
            </view>
      <!--跨表按钮-->
					      <view width="100%" class="me-btn btn-pay"
		            v-if="$check_action('/i_want_to_customize_it/view', 'add') && o.examine_state == '已通过' && !o.i_want_to_customize_it_limit"
		            @click="to_form('/pagesC/i_want_to_customize_it/view', o)">
		        <span>定制</span>
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
      url_get_list: '~/api/customized_products/get_list?like=0',
      url_del: '~/api/customized_products/del',

      // 字段ID
      field: 'customized_products_id',

      // 查询
      query: {
        size: 7,
        page: 1,
                name_of_commodity: "",
                    category_name: "",
                          "custom_inventory_min": '', // 定制库存
				"custom_inventory_max": '', // 定制库存
                    product_production_date: "",
                      shelf_life_time: "",
                          "examine_state":"",
        login_time: '',
        create_time: '',
      },
																      // 数据
      list: [],
                            // 分类名称列表
      list_category_name: [{value:"",text:"全部"}],
                                        	  custom_inventory_input_timer: null,
                            // 用户列表
      list_user_business_user: [],
                                                                    list_examine_state: [
        { value: '', text: '全部' },
        { value: '未审核', text: '未审核' },
        { value: '已通过', text: '已通过' },
        { value: '未通过', text: '未通过' },
      ],
    };
  },
  methods: {
									custom_inventory_input() {
			this.custom_inventory_input_timer && clearTimeout(this.custom_inventory_input_timer);
			this.custom_inventory_input_timer = setTimeout(() => {
				if((this.query.custom_inventory_min && this.query.custom_inventory_max) || (!this.query.custom_inventory_min && !this.query.custom_inventory_max)) {
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
		  				  _this.list.map((item) => {
			let param = {
			  source_table: "customized_products",
			  source_id: item.customized_products_id,
			  source_user_id: _this.user.user_id
			};
			if(item.i_want_to_customize_it_limit_times > 0){
			  _this.$get("~/api/i_want_to_customize_it/count?",param,(result)=>{
			  	if(result){
			  	  if(result.result >= item.i_want_to_customize_it_limit_times){
			  		_this.$set(item,'i_want_to_customize_it_limit',true);
			  	  }else{
			  		_this.$set(item,'i_want_to_customize_it_limit',false);
			  	  }
				}
			  })
			}else{
			  _this.$set(item,'i_want_to_customize_it_limit',false);
			}
			Object.assign(item, param)
		  })
			  		},
                      /**
     * 获取分类名称列表
     */
    async get_list_category_name() {
                    var json = await this.$get("~/api/classification_information/get_list");
        if(json.result){
          json.result.list.map((o) => this.list_category_name.push({value:o.classification_name,text:o.classification_name}));
        }else if (json.error){
          console.log(json.error);
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
      let ret = "";
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i].nickname+"-"+obj[i].username;
        }
      }
      return ret;
    },
                                                              },
  created() {
              // 初始化分类名称列表
    this.get_list_category_name();
                                    this.get_list_user_business_user();
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