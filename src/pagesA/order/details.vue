<template>
  <view id="page_order_details" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar back-url="/pagesA/order/list">订单详情</tn-nav-bar>
    <view class="page_order_details" id="order_details">
      <!-- 订单细节模块(开始) -->

      <view v-if="$check_action('/order/details', 'get')">
        <view class="order-state">
          {{ state }}
        </view>
        <view class="contact-info">
          <view class="info">
            <uni-icons class="icon-address" size="16" type="location-filled"> </uni-icons>
            <text class="name">{{ contact_name }}</text>
            <text class="phone"> {{ contact_phone }}</text>
          </view>
          <text class="address-info">{{ contact_address }}</text>
        </view>

        <view class="goods-list" v-for="(obj, idx) in list" :key="idx">
          <view
            @click="$navTo('/pagesA/order/details?order_number=' + o.order_number)"
            class="goods-item"
          >
            <view class="goods-img">
              <image
                :src="$fullImgUrl(obj.img) || '../../static/img/default.png'"
                mode="scaleToFill"
              >
              </image>
            </view>
            <view class="goods-info">
              <view class="title text-ellipsis-2">
                {{ obj.title }}
              </view>
              <view class="total-info">
			  				<view class="price" v-if="integral == undefined"> ￥{{ obj.price }} </view>
				<view class="price" v-else>{{ integral }}积分</view>
			                  <view class="num"> ×{{ obj.num }} </view>
              </view>
            </view>
          </view>
        </view>
		<view class="after-sale-line" v-if="state == '售后/退款'">
		  <view class="cell after_sale_type">
		    <view class="label">售后类型：</view>
			<view class="value">{{ type }}</view>
		  </view>
		  <view class="cell after_sale_content">
		    <view class="label">售后内容：</view>
			<view class="value">{{ content_desc }}</view>
		  </view>
		  <view class="after-sale-line-imgs">
		    <view class="label">售后凭证：</view>
			<view class="all-imgs">
			  <image
			    class="one-img"
			    mode="heightFix"
			    v-for="(item, index) in imgs"
			    :key="index"
			    :src="$fullImgUrl(item)"
			  ></image>
			</view>
		  </view>
		  <view class="cell after_sale_state">
		    <view class="label">售后状态：</view>
		  	<view class="value">{{ !!after_state ? after_state : '-' }}</view>
		  </view>
		  <view class="cell after_sale_reply">
		    <view class="label">审核回复：</view>
		  	<view class="value">{{ !!after_state_reply ? after_state_reply : '-' }}</view>
		  </view>
		</view>

		<view class="cell coupon" v-if="state === '待付款'  && integral == undefined ">
          <view class="label"> 优惠券</view>
          <view class="value">
            <view v-if="use_coupon_list.length > 0" @click="showCoupon = true">
              {{ selected_coupon_index[0]==0 ? '请选择优惠券' : use_coupon_list[selected_coupon_index[0]].coupon_name }}
            </view>

            <view v-else>无可使用的优惠券</view>
            <tn-picker
              :range="use_coupon_list"
              mode="selector"
              rangeKey="coupon_name"
              v-model="showCoupon"
              :defaultSelector="defaultSelector"
              @confirm="bindPickerChange"
            ></tn-picker>
          </view>
        </view>
        <view v-if="vip_discount > 0  && integral == undefined " class="cell discount">
          <view class="label">会员折扣</view>
          <view class="value">￥{{ vip_discount }}</view>
        </view>
        <view v-if="vip_discount > 0" class="cell origin">
          <view class="label">原价</view>
          <view class="value">￥{{ sum_price_ago }}</view>
        </view>
        <view class="cell total">
          <view class="label">需付款</view>
		  <view v-if="integral == undefined" class="value">￥{{ sum_price }}</view>
		  <view v-else class="value">{{ integral_total }}积分</view>
        </view>
        <view class="cell order_no">
          <view class="label">订单编号：</view><view class="value">{{ order_number }}</view>
        </view>
        <view class="cell create_time">
          <view class="label">下单时间：</view><view class="value">{{ create_time }}</view>
        </view>
        <view class="cell remark border-none">
          <view class="label">订单备注：</view>
          <view class="value">
            <view class="textarea-wrap" v-if="state === '待付款'">
              <tn-input
                v-model="remark"
                type="textarea"
                :border="true"
                :height="100"
                :autoHeight="true"
              />
            </view>
            <text v-else>{{ remark }}</text>
          </view>
        </view>
		<view class="pay-wrap" v-if="$check_action('/order/details', 'set')">
		  <view class="me-btn btn-pay" v-if="state === '待付款'" @click="goto_pay()"> 
			{{
			  integral != undefined ? '兑换' : '去支付'
			}}
		  </view>
		</view>
      </view>
    </view>
	<view class="goods_recommend">
		<view class="title">商品推荐</view>
		<view class="goods_item">
			<view class="goods-img">
				<image :src="$fullImgUrl(recommend_goods.img) || '../../static/img/default.png'" mode="scaleToFill">
				</image>
			</view>
			<view class="goods-info">
				<view class="title text-ellipsis-2">
					{{ recommend_goods.title }}
				</view>
				<view class="desc text-ellipsis-2">
					{{ recommend_goods.description }}
				</view>
				<view class="price-wrapper">
				      <view class="price"> ￥{{ recommend_goods.price | keepTwoNum }} </view>
				      <view class="price_ago"> ￥{{ recommend_goods.price_ago | keepTwoNum }} </view>
				</view>
				<view class="info">
					<view class="sales">销量<text>{{ recommend_goods.sales }}</text></view>
					<view class="inventory">库存<text>{{ recommend_goods.inventory }}</text></view>
				</view>
			</view>
		</view>
	</view>
    <!-- 订单细节模块(结束) -->
    <view class="pay-model" v-if="!!model">
      <view class="mask" @click="closemodel"></view>
      <view class="pay-model-inn">
        <view class="inclued-pay-image">
          <image mode="widthFix" class="pay-image" :src="pay_qrcode"></image>
        </view>
        <view>
          <view class="me-btn btn-main-pay" @click="submit_pay()">确认支付</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderListApi } from '@/api/order';
export default {
  filters: {
    //过滤器 保留两位
    keepTwoNum: function (value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
  data() {
    return {
      query: {
        order_number: '',
      },
      contact_name: '',
      contact_phone: '',
      contact_address: '',
      order_number: '',
      create_time: '',
      state: '',
      remark: '',
      paywayact: 0,
      model: false,
      pay_obj: {
        payActiveName: '微信',
        account: '',
        password: '',
        id: '',
      },
      pay_qrcode: '',
      defaultSelector: [0],
      selected_coupon_index: [0],
      use_coupon_list: [],
      coupon_list: [],
      showCoupon: false,
	  coupon_price: 0,
      vip_discount: 0,
      list: [],
	  // 支付方式
	  payway: [
	    { name: "微信", url: "/static/img/wx.png", id: 1 },
	    { name: "支付宝", url: "/static/img/aplipay.png", id: 2 },
	    { name: "其他", url: "", id: 3 },
		{ name: '钱包', url: '', id: 4 },
	  ],
	  balance: 0,
	  coupon_id: undefined,
	  integral: undefined,
	  integralHave: 0,
	  type: '',
	  content_desc: '',
	  imgs: [],
	  after_state_reply: '',
	  after_state: '',
    issuer_id: "",
	  recommend_goods: [],
    };
  },
  onLoad(options) {
    this.query.order_number = options.order_number;
    this.issuer_id = options.issuer_id
    this.getOrderList();
	if (options.integral != undefined) {
	  this.integral = Number(options.integral);
	  this.integralHave = Number(this.$store.state.app.userInfo.integral);
	}
  },
  methods: {
    /**
     * 获取订单列表数据
     */
    getOrderList() {
      getOrderListApi(this.query)
        .then((res) => {
          this.list = res.result.list;
          let {
            contact_name,
            contact_phone,
            contact_address,
            order_number,
            create_time,
            state,
            remark,
          } = this.list[0];
          this.contact_name = contact_name;
          this.contact_phone = contact_phone;
          this.contact_address = contact_address;
          this.order_number = order_number;
          if (create_time && JSON.stringify(create_time).indexOf('-') === -1) {
            this.create_time = this.$toTime(create_time, 'yyyy-MM-dd hh:mm:ss');
          } else {
            this.create_time = create_time;
          }
          this.state = state;
          this.remark = remark;
          this.get_list_after();
        })
        .catch(() => {});
    },
    choosepayway(idx) {
      this.paywayact = idx;
    },
	// 获取推荐商品
	async get_recommend_goods(){
		// 获取订单第一个商品的分类
		let type = this.list[0].type;
		await this.$get('~/api/goods/get_list', {
			orderby: 'hits desc'
		}, (json) => {
			let types_goods = json.result.list;
			for(var i = 0;i < types_goods.length;i ++){
				if(types_goods[i].goods_id != this.list[0].goods_id && types_goods[i].type == this.list[0].type){
					this.recommend_goods = types_goods[i];
					break;
				}
			}
			// 如果同类下没有可推荐商品，推荐热度最高的
			if(this.recommend_goods.length == 0){
				for(var i = 0;i < types_goods.length;i ++){
					if(types_goods[i].goods_id != this.list[0].goods_id){
						this.recommend_goods = types_goods[i];
						break;
					}
				}
			}
		})
	},
    async get_list_after() {
	  this.get_recommend_goods();
      this.vip_discount = this.userInfo.vip_discount;
      await this.get_coupon_user_list();

      let tempCouponlist = JSON.parse(JSON.stringify(this.coupon_list));
      tempCouponlist = tempCouponlist.map((item) => {
        return {
          ...item,
          sum: 0,
        };
      });
      tempCouponlist.forEach((item) => {
        this.list.forEach((goods) => {
          if (goods.merchant_id === item.coupon_user_id || item.coupon_user_auth === '管理员') {
            item.sum += goods.price_count;
          }
        });
      });

      const now = new Date().getTime();
      for (let i = 0; i < tempCouponlist.length; i++) {
        if (tempCouponlist[i].coupon_id) {
          const time = tempCouponlist[i].coupon_time.split(',');

          const start = new Date(time[0]);
          const end = new Date(time[1]);
          const is_effective = start <= now && now <= end;

          if (
            tempCouponlist[i].sum < tempCouponlist[i].coupon_price ||
            !is_effective ||
            tempCouponlist[i].is_use == 1
          ) {
            tempCouponlist.splice(i, 1);
            --i;
          }
        }
      }

      this.use_coupon_list = tempCouponlist;
      this.use_coupon_list.unshift({
        coupon_name: '选择优惠券',
        coupon_id: '',
        coupon_price1: 0,
        id: 0
      })
	  if (this.state == '售后/退款') {
	    let afterSaleJson = await this.$get(
	      '~/api/order_after_sale/get_obj?order_number=' + this.order_number
	    );
	    this.after_state = afterSaleJson.result.obj.after_state;
	    this.after_state_reply = afterSaleJson.result.obj.after_state_reply;
	    this.type = afterSaleJson.result.obj.type;
	    this.content_desc = afterSaleJson.result.obj.content_desc;
	    this.imgs = JSON.parse(afterSaleJson.result.obj.imgs);
	  }
    },
    closemodel() {
      //关闭选择支付方式
      this.model = false;
    },
    /**
     * 打开支付
     */
    goto_pay() {
	  //打开选择支付方式
	  let _this = this;
	  if (_this.integral != undefined) {
	    //积分支付
	    if (_this.integralHave < _this.integral_total) {
	      //钱包支付
	      _this.$toast('积分不足，兑换失败');
	      return false;
	    }
	    _this.$post(
	      '~/api/order/set?order_number=' + _this.order_number,
	      {
	        state: '已付款',
	        remark: _this.remark,
	        buy_type: 2,
	      },
	      (res) => {
	        if (res.result) {
	          console.log(res.result);
	          _this.$get('~/api/order/get_list', { order_number: _this.order_number }, (json) => {
	            if (json.result && json.result.list) {
	              //修改数量
	              for (let i = 0; i < json.result.list.length; i++) {
	                _this.update_order_price_count(json.result.list[i]);
	                _this.update_goods_inventory(json.result.list[i]);
	              }
	            }
	          });
	          _this.$toast('兑换成功');
	          let paramsUserSet = {
	            integral: _this.integralHave - _this.integral_total,
	          };
	  
	          _this.$post(
	            '~/api/user/set?user_id=' + _this.$store.state.app.userInfo.user_id,
	            paramsUserSet,
	            (res) => {
	              _this.$Router.push('/pagesA/order/list?state=已付款');
	            }
	          );
	        }
	      }
	    );
	  } else {
	    this.model = true;
				      if (this.list.length > 0) {
		        let goods_name = '';
		        if (this.list.length === 1) {
		          goods_name = this.list[0].title;
		        } else {
		          goods_name = this.list[0].title + '等多件';
		        }
		        this.$get(
		          '~/api/order/alipay?goods_name=' + goods_name + '&pay_money=' + this.sum_price,
		          {},
		          (json) => {
		            if (json.result) {
		              this.pay_qrcode = 'https://api.mhjz1.cn/qr/?size=250&text=' + json.result;
		            } else if (json.error) {
		              console.error(json.error);
		            }
		          }
		        );
		      }
			  }
    },
    async update_order_price_count(o) {
	  if (this.coupon_price > 0) {
	    await this.$post(
	      '~/api/order/set?order_id=' + o.order_id,
	      {
	        price_count: o.price_count,
	      },
	      (res) => {
	        if (res.result) {
	          console.log(res);
	        } else if (res.error) {
	          this.$toast(res.error.message);
	          console.log(res.error);
	        }
	      }
	    );
	  }
    },
    async update_goods_inventory(o) {
      await this.$get('~/api/goods/get_obj', { goods_id: o.goods_id }, (json) => {
        if (json.result && json.result.obj) {
                  let sum = Number(json.result.obj.inventory) - Number(o.num)
                  let inventory = { inventory: json.result.obj.inventory - o.num };
		  let data = {
		  	inventory: json.result.obj.inventory - o.num,
		  	sales: json.result.obj.sales + o.num
		  }
          this.$post('~/api/goods/set?goods_id=' + o.goods_id, data, (res) => {
            if (
              res.result &&
              json.result.obj.source_table &&
              json.result.obj.source_field &&
              json.result.obj.source_id
            ) {
              let inventory_sub = { cart_inventory: inventory.inventory };
              this.$post(
                '~/api/' +
                  json.result.obj.source_table +
                  '/set?' +
                  json.result.obj.source_field +
                  '=' +
                  json.result.obj.source_id,
                inventory_sub,
                (res_sub) => {
                  console.log(res_sub);
                }
              );
            }
          });
                  if(sum<=5){
            let message_inform = {
              title: '商品库存不足',
              type: '通知',
              content: `商品ID${json.result.obj.goods_id}的测试商品库存不足5件，请尽快进行补货`,
              state: 1,
              user_id: json.result.obj.user_id
            }
            this.$post("~/api/message_inform/add",message_inform)
          }
                }
      });
    },
    /**
     * 支付
     */
    submit_pay() {
      var _this = this;
	  let type = Number(_this.paywayact);
	  if (type == 3 && _this.userInfo.balance < _this.sum_price) {
	    //钱包支付
	    this.$toast('余额不足，支付失败');
	    return false;
	  }
	  if( _this.payway[_this.paywayact].id == 3){
	    const passwordRegex = /^\d{6}$/;
	   if(!_this.pay_obj.account){
	    return this.$toast('请输入网银账号');
	   }else if(!passwordRegex.test(_this.pay_obj.password)){
	    return this.$toast('网银密码格式为6位数字');
	   }
	  }
	  
      let params = {
        state: '已付款',
        remark: _this.remark,
		buy_type: type == 3 ? 3 : 1,
      }
      this.$post(
        '~/api/order/set?order_number=' + this.order_number,
        params,
        (res) => {
          if (res.result) {
            //修改数量
            for (let i = 0; i < _this.list.length; i++) {
              _this.update_order_price_count(_this.list[i]);
              _this.update_goods_inventory(_this.list[i]);
            }

                          let message_inform = {
                title: '用户支付订单成功',
                type: '通知',
                content: `订单 #${_this.query.order_number} 已支付成功，金额 ¥${_this.sum_price}。请在24小时内发货！`,
                state: 1,
                user_id: _this.issuer_id
              }
              this.$post("~/api/message_inform/add",message_inform)
                        _this.$toast('支付成功');
			if(this.selected_coupon_index[0] != 0){
				const id = this.use_coupon_list[this.selected_coupon_index[0]].id;
				if (id) {
				  this.$post('~/api/coupon_user/set?id=' + id, {
					is_use: 1,
				  });
				}
			}
			let paramsUserSet = {}
				paramsUserSet.integral = parseInt(this.$store.state.app.userInfo.integral)+parseInt(_this.sum_price)
					if (type == 3) {
			  paramsUserSet.balance = (Number(_this.userInfo.balance) - Number(_this.sum_price)).toFixed(2);
			}
				this.$post(
			  '~/api/user/set?user_id=' + _this.$store.state.app.userInfo.user_id,
			  paramsUserSet,
			  (res) => {
			    setTimeout(() => {
			      _this.$nav('/pagesA/order/list?order_number='+this.order_number);
			    }, 700);
			  }
			);
          } else if (res.error) {
            _this.$toast(res.error.message);
            console.log(res.error);
          }
        }
      );
    },
    /**
     *  当前用户的优惠券
     */
    async get_coupon_user_list() {
      const result = await this.$get('~/api/coupon_user/get_list', {
        user_id: this.userInfo.user_id,
        is_use: 0,
      });

      for (let i = 0; i < result.result.list.length; i++) {
        const res = await this.$get('~/api/coupon/get_obj', {
          coupon_id: result.result.list[i].coupon_id,
        });

        this.coupon_list.push({
          ...res.result.obj,
          id: result.result.list[i].id,
          is_use: result.result.list[i].is_use,
        });
      }
    },
    /**
     *  选择优惠券
     */
    bindPickerChange(v) {
      this.selected_coupon_index = v;
    },
  },
  computed: {
	integral_total() {
	  //计算总积分
	  let integral_total = 0;
	  this.list.map((o) => (integral_total = o.num * this.integral));
	  return integral_total;
	},
    sum_price() {
      var sum_price = 0;
      this.list.map((o) => (sum_price += parseFloat(o.price_count)));
      let coupon_price = 0;
      if (this.use_coupon_list && this.use_coupon_list.length>0){
        const coupon_id = this.use_coupon_list[this.selected_coupon_index[0]].coupon_id
        for (let i = 0; i < this.use_coupon_list.length; i++) {
          if (coupon_id == this.use_coupon_list[i].coupon_id) {
            coupon_price = this.use_coupon_list[i].coupon_price1
			this.coupon_price = coupon_price
          }
        }
      }
      this.list.map((o) => {
        if (coupon_price>0){
          o.price_count = (o.price_count - ((o.price_count/sum_price)*coupon_price)).toFixed(2);
        }
      });
      sum_price = 0;
      this.list.map((o) => (sum_price += parseFloat(o.price_count)));
      return sum_price.toFixed(2);
    },
    /**
     * 计算原价
     */
    sum_price_ago() {
      var sum_price_ago = 0;
      this.list.map((o) => (sum_price_ago += parseFloat(o.price) * parseInt(o.num)));
      return sum_price_ago.toFixed(2);
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
.pay_model_inn {
  background: #fff;
  box-shadow: 0 0.25rem 0.5rem 0 #ddd;
  width: 80%;
  padding: 20rpx;
  position: relative;
  z-index: 10;
  border-radius: 10rpx;
}
.pay_tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.pay_tab_one {
  width: 29.3%;
  padding: 10px 2%;
  text-align: center;
  border-bottom: 2px solid #fff;
}
.pay_tab_one_act {
  border-bottom: 2px solid #0000ff;
  color: #0000ff;
}
.assure-btn {
  margin-bottom: 20rpx;
}
.detail-balance-title {
  margin-top: 40rpx;
}
.detail-balance {
  color: #ff0000;
  margin: 20rpx 0 40rpx 0;
  font-size: 32rpx;
  font-weight: bold;
}
.inclued_pay_image uni-image{
  width:100% !important;
}
.inclued_pay_image img,.inclued_pay_image image{
  max-width: 100%;
}
.after-sale-line .after-sale-line-imgs {
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.after-sale-line .all-imgs {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.after-sale-line .all-imgs.one-img {
  margin-right: 10px;
}
.after-sale-line uni-image{
  height: 240rpx !important;
}
.goods_recommend{
	width: 92%;
	border: 1px solid #f2f2f2;
	margin: 20px 4%;
	padding: 4%;
	border-radius: 5px;
	> .title{
		font-weight: bold;
		margin-bottom: 15px;
	}
	.goods_item{
		position: relative;
		display: flex;
		.goods-img{
			width: 110px;
			height: 110px;
			image{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.goods-info{
			width: calc(100% - 110px);
			padding-left: 15px;
			position: relative;
			height: 110px;
			.desc{
				font-size: 12px;
				margin-top: 5px;
				color: #999;
			}
			.price-wrapper{
				margin-top: 10px;
				.price{
					display: inline;
					color: #dc3545;
					font-size: 16px;
				}
				.price_ago{
					display: inline;
					margin-left: 10px;
					font-size: 12px;
					text-decoration: line-through;
					color: #999;
				}
			}
			.info{
				display: flex;
				position: absolute;
				left: 15px;
				bottom: 0;
				width: 100%;
				font-size: 12px;
				color: #999;
				view{
					margin-right: 15px;			
				}
			}
		}
	}
}
</style>
