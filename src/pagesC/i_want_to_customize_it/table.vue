<template>
  <view class="page_diy_table page_i_want_to_customize_it_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>我要定制列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="订单号" name="order_number">
                <uni-easyinput type="text" v-model="query.order_number" placeholder="订单号" />
              </uni-forms-item>
                <uni-forms-item label="商品名称" name="name_of_commodity">
                <uni-easyinput type="text" v-model="query.name_of_commodity" placeholder="商品名称" />
              </uni-forms-item>
                  <uni-forms-item label="生产日期" name="production_date">
                <uni-easyinput type="text" v-model="query.production_date" placeholder="生产日期" />
              </uni-forms-item>
              <uni-forms-item label="保质时间" name="shelf_life_time">
                <uni-easyinput type="text" v-model="query.shelf_life_time" placeholder="保质时间" />
              </uni-forms-item>
                          <uni-forms-item label="用户姓名" name="user_name">
                <uni-easyinput type="text" v-model="query.user_name" placeholder="用户姓名" />
              </uni-forms-item>
                          <uni-forms-item label="审核状态" name="examine_state">
              <uni-data-select placeholder="请选择审核状态"
                               v-model="query['examine_state']"
                               :localdata="list_examine_state"
              ></uni-data-select>
            </uni-forms-item>
            <uni-forms-item label="支付状态" name="pay_state">
              <uni-data-select placeholder="请选择支付状态"
                               v-model="query['pay_state']"
                               :localdata="list_pay_state"
              ></uni-data-select>
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
          <view class="item-row " v-if="0 && $check_field('get','category_name')">
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
          <view class="item-row " v-if="0 && $check_field('get','production_date')">
            <view class="label" v-if="true">
              <span>生产日期</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['production_date'], 'yyyy-MM-dd') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','shelf_life_time')">
            <view class="label" v-if="true">
              <span>保质时间</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['shelf_life_time'], 'yyyy-MM-dd hh:mm:ss') }}</span>
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
          <view class="item-row " v-if="0 && $check_field('get','commodity_album')">
            <view class="label" v-if="true">
              <span>商品相册</span>
            </view>
              <view class="value">
              <span>{{ o['commodity_album'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','customized_commodity_quantity')">
            <view class="label" v-if="true">
              <span>定制商品数量</span>
            </view>
              <view class="value">
              <span>{{ o['customized_commodity_quantity'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','total_price')">
            <view class="label" v-if="true">
              <span>总价格</span>
            </view>
              <view class="value">
              <span>{{ o['total_price'] }}</span>
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
          <view class="item-row " v-if="0 && $check_field('get','user_name')">
            <view class="label" v-if="true">
              <span>用户姓名</span>
            </view>
              <view class="value">
              <span>{{ o['user_name'] }}</span>
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
          <view class="item-row " v-if="0 && $check_field('get','custom_audio')">
            <view class="label" v-if="true">
              <span>定制音频</span>
            </view>
              <view class="value">
              <span>{{ o['custom_audio'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_video')">
            <view class="label" v-if="true">
              <span>定制视频</span>
            </view>
              <view class="value">
              <span>{{ o['custom_video'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','customized_accessories')">
            <view class="label" v-if="true">
              <span>定制附件</span>
            </view>
              <view class="value">
              <span>{{ o['customized_accessories'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','custom_picture')">
            <view class="label" v-if="true">
              <span>定制图片</span>
            </view>
              <view class="value">
              <span>{{ o['custom_picture'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','regional_location')">
            <view class="label" v-if="true">
              <span>地区位置</span>
            </view>
              <view class="value">
              <span>{{ o['regional_location'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/i_want_to_customize_it/table', 'del') || $check_action('/i_want_to_customize_it/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/i_want_to_customize_it/view?' + field + '=' + o[field])"
                  v-if="$check_action('/i_want_to_customize_it/table', 'set') || $check_action('/i_want_to_customize_it/view', 'set') || $check_action('/i_want_to_customize_it/view', 'get')">
              详情
            </view>
              <view width="100%"
                    @click="goto_pay(o)"
                    v-if="o.pay_state === '未支付' && $check_pay('/i_want_to_customize_it/table')"
                    class="me-btn btn-pay">支付</view>
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
      <view class="pay-model" v-if="!!model">
        <view class="mask" @click="closemodel"></view>
        <view class="pay-model-inn">
          <view class="pay_tab">
            <view @click="choosepayway(idx)" v-for="(obj, idx) in payway" :key="idx" :class="['pay_tab_one', paywayact == idx ? 'pay_tab_one_act' : '']">{{ obj.name }}</view>
          </view>
          <view v-if="payway[paywayact].id !== 3" class="inclued_pay_image">
            <image mode="widthFix" class="pay_image" :src="payway[paywayact].url"></image>
          </view>
          <view v-else class="inclued_pay_image">
            <view>
              <view style="width: 80%; margin: 0 auto; margin-top: 30px" class="account">
                <view style="width: 80%; margin: 0 auto">
                  <view style="line-height: 40px">请输入网银账号：</view>
                </view>
                <view style="width: 80%; margin: 0 auto">
                  <input v-model="pay_obj.account" placeholder="请输入网银账号" />
                </view>
              </view>
              <view style="width: 80%; margin: 0 auto; margin-top: 20px" class="password">
                <view style="width: 80%; margin: 0 auto">
                  <view style="line-height: 40px">请输入支付密码，6位数字：</view>
                </view>
                <view style="width: 80%; margin: 0 auto">
                  <input placeholder="请输入密码" type="password" v-model="pay_obj.password" maxlength="6" />
                </view>
              </view>
            </view>
          </view>
          <view> <button class="me-btn" type="primary" @click="submit_pay()">确认支付</button></view>
        </view>
      </view>
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
      url_get_list: '~/api/i_want_to_customize_it/get_list?like=0',
      url_del: '~/api/i_want_to_customize_it/del',

      // 字段ID
      field: 'i_want_to_customize_it_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              order_number: "",
                      name_of_commodity: "",
                        production_date: "",
                    shelf_life_time: "",
                                user_name: "",
                          "examine_state":"",
        "pay_state":"",
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
                                                                          // 用户列表
      list_user_business_user: [],
                              	  customized_commodity_quantity_input_timer: null,
                            // 用户列表
      list_user_custom_user: [],
                                                            	  regional_location_region: '',
          list_examine_state: [
        { value: '', text: '全部' },
        { value: '未审核', text: '未审核' },
        { value: '已通过', text: '已通过' },
        { value: '未通过', text: '未通过' },
      ],
      list_pay_state: [
        { value: '', text: '全部' },
        { value: '未支付', text: '未支付' },
        { value: '已支付', text: '已支付' },
      ],
      model:false,
      paywayact:0,
      // 支付方式
      payway:[
        { name: '微信', url: '/static/img/wx.png', id: 1 },
        { name: '支付宝', url: '/static/img/aplipay.png', id: 2 },
        {
          name: '其他',
          url: 'https://dzgj.yuyuebus.com/static/front/dist/static/img/icon-question.png',
          id: 3,
        }
      ],
      pay_obj:{
        payActiveName:"微信",
        account:"",
        password:"",
        id:""
      },
    };
  },
  methods: {
													customized_commodity_quantity_input() {
			this.customized_commodity_quantity_input_timer && clearTimeout(this.customized_commodity_quantity_input_timer);
			this.customized_commodity_quantity_input_timer = setTimeout(() => {
				if((this.query.customized_commodity_quantity_min && this.query.customized_commodity_quantity_max) || (!this.query.customized_commodity_quantity_min && !this.query.customized_commodity_quantity_max)) {
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
                                                                                	  this.regional_location_region = '';
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
		  				  _this.list.map((item) => {
			let param = {
			  source_table: "i_want_to_customize_it",
			  source_id: item.i_want_to_customize_it_id,
			  source_user_id: _this.user.user_id
			};
			if(item.evaluation_feedback_limit_times > 0){
			  _this.$get("~/api/evaluation_feedback/count?",param,(result)=>{
			  	if(result){
			  	  if(result.result >= item.evaluation_feedback_limit_times){
			  		_this.$set(item,'evaluation_feedback_limit',true);
			  	  }else{
			  		_this.$set(item,'evaluation_feedback_limit',false);
			  	  }
				}
			  })
			}else{
			  _this.$set(item,'evaluation_feedback_limit',false);
			}
			Object.assign(item, param)
		  })
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
                                                            	regional_location_pcaCodeChange(val) {
      this.query.regional_location = val.detail.value.map(item => item.value).join('/');
    },
      /**
     * 打开支付
     */
    goto_pay(v) {
      //打开选择支付方式
      this.pay_obj.id = v.i_want_to_customize_it_id;
      this.model = true;
    },
    choosepayway(idx) {
      switch (idx) {
        case 0:
          this.pay_obj.payActiveName = '微信';
          break;
        case 1:
          this.pay_obj.payActiveName = '支付宝';
          break;
        case 2:
          this.pay_obj.payActiveName = '网银';
          break;
      }
      this.paywayact = idx;
    },
    closemodel() {
      //关闭选择支付方式
      this.model = false;
    },
    /**
     * 支付
     */
    submit_pay() {
      let _this = this;
      let url = this.$toUrl(
              this.query,
              '~/api/i_want_to_customize_it/set?i_want_to_customize_it_id=' + this.pay_obj.id
      );
      let param = { pay_state: '已支付', pay_type: this.pay_obj.payActiveName };
      this.$post(url, param, (res) => {
        if (res.result) {
          _this.$toast('支付成功');
          setTimeout(() => {
            _this.$nav('/pagesC/i_want_to_customize_it/table');
          }, 700);
        } else if (res.error) {
          _this.$toast(res.error.message);
          console.log(res.error);
        }
      });
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
  }
</style>