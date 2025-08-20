<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar back-url="/pages/user/index">我的订单</tn-nav-bar>

    <view class="page_order_list" id="order_list">
      <view class="top-warp">
		<Search v-model="query.title" placeholder="查询订单" @search="search_" @cancel="cancel" />
        <!-- <me-search @search="searchData"></me-search> -->
        <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :height="80"></me-tabs>
      </view>
      <view class="order-list">
        <view class="order-item" v-for="(o, i) in list" :key="i">
          <view class="header" style="">
            <view class="state">{{ o.state }}</view>
          </view>
          <view class="goods-list" v-for="(obj, idx) in o.list" :key="idx">
			    <view @click="go_order_detail(obj)" class="goods-item">
	              <view class="goods-img">
                <image
                  :src="$fullImgUrl(obj[vm.img]) || '../../static/img/default.png'"
                  mode="scaleToFill"
                >
                </image>
              </view>
              <view class="goods-info">
                <view class="title text-ellipsis-2">
                  {{ obj[vm.title] }}
                </view>
                <view class="time">
                  <text>订单提交成功</text>
                  <text>{{ $toTime(o.create_time, 'yyyy-MM-dd hh:mm:ss') }}</text>
                </view>
              </view>

              <view class="right-info">
					<view class="price" v-if="!!o.integral"> {{ o.integral }}积分</view>
				<view class="price" v-else> ￥{{ obj[vm.price] }} </view>
	                <view class="num"> ×{{ obj[vm.num] }} </view>
              </view>
            </view>
          </view>

          <view class="footer">
            <view class="sum-price">
              <text>{{ o.state == '待付款' ? '需付款' : '实付' }}：</text>
				  <text v-if="!!o.integral" class="price">{{ o.integral_total }}积分</text>
			  <text v-else class="price">￥{{ o.sum_price.toFixed(2) }}</text>
	            </view>

            <view class="btn-wrap">
			  <view
			    width="100%"
			    @click="cancel_order(o.order_number, i)"
			    v-if="o.state == '待付款'" 
			    class="me-btn btn-cancel"
			    >取消订单</view
			  >
				  <view
			    @click="aftersale_order(o, i)"
			    v-if="o.state == '已付款'"
			    class="me-btn btn-cancel aftersale-btn"
			    >售后申请
			  </view>
	              <view
                width="100%"
                @click="del_order(o.order_number, i)"
                v-if="$check_action('/order/list', 'del')"
                class="me-btn btn-del"
                >删除订单</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
	<view  v-if="afterSaleDialog" class="after-sal-form-model tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
	  <view  class="after-sale-form">
	    <view class="after-sale-form-title">售后申请</view>
	    <tn-form
	      class="after-sale-form-inn"
	      ref="form"
	      :rules="rules"
	      :label-width="180"
	      :model="form"
	    >
	      <tn-form-item class="user_group" name="type" label="售后类型" required>
	        <text
	          @click="openAfterSaleType"
	          :style="{ color: !!aftersaleLabel ? '#080808' : 'rgb(170, 170, 170)' }"
	          >{{ !!aftersaleLabel ? aftersaleLabel : '请选择售后类型' }}</text
	        >
	      </tn-form-item>
	
	      <tn-form-item label="售后内容" name="content_desc" required>
	        <tn-input
	          type="textarea"
	          :show-border="true"
	          v-model="form.content_desc"
	          placeholder="请输入售后内容"
	        ></tn-input>
	      </tn-form-item>
	
	      <tn-form-item label="相关凭证" required>
	        <view class="upload_imgs_container">
							<button class='choose-img-btn' @click="chooseImages" v-if="imgList.length<5">选择图片</button>
							<view class="image-list">
								<block v-for="(img, index) in imgList" :key="index">
									<image :src="$fullImgUrl(img)" class="image-item"></image>
									<button class='del-image-btn' @click="deleteImage(index)">删除</button>
								</block>
							</view>
						</view>
	
	      </tn-form-item>
	    </tn-form>
	    <view class="dialog_btn">
	      <button @click="cancel_aftersale" class="search_btn_reset">取消</button>
	      <button type="primary" @click="submitAftersale" class="handin-after-sale-btn">
	        立即提交
	      </button>
	    </view>
	  </view>
	</view>
	
	<tn-picker
	  mode="selector"
	  :range="afterSaleStateArr"
	  range-key="value"
	  v-model="showTypePicker"
	  @confirm="select_type"
	>
	</tn-picker>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import Search from '@/components/businessCp/search.vue';
import { getOrderListApi } from '@/api/order';
export default {
  mixins: [MescrollMixin],
  components: {
	Search
  },
  data() {
    return {
      query: {
        user_id: '',
        state: '',
        like: 0,
      },
      vm: {
        order_number: 'order_number',
        title: 'title',
        img: 'img',
        price: 'price',
        price_ago: 'price_ago',
        price_count: 'price_count',
        num: 'num',
        goods_id: 'goods_id',
        description: 'description',
        contact_name: 'contact_name',
        contact_phone: 'contact_phone',
        contact_address: 'contact_address',
        postal_code: 'postal_code',
        user_id: 'user_id',
        state: 'state',
      },
      list: [],
      tabs: [
        {
          name: '全部',
          type: '1',
        },
        {
          name: '待付款',
          type: '2',
          state: '待付款',
        },
        {
          name: '已付款',
          type: '3',
          state: '已付款',
        },
		{
		  name: '已取消',
		  type: '4',
		  state: '已取消',
		},
		{
		  name: '售后/退款',
		  type: '5',
		  state: '售后/退款',
		},
      ],
      tabIndex: 0,
	  showTypePicker: false,
	  afterSaleStateArr: [
	    {
	      label: '仅退款',
	      value: '仅退款',
	    },
	    {
	      label: '退货退款',
	      value: '退货退款',
	    },
	    {
	      label: '其他',
	      value: '其他',
	    },
	  ],
	  form: {
	    type: '',
	    content_desc: '',
	  },
	  rules: {
	    type: [{ required: true, message: '请选择售后类型'}],
	    content_desc: [
	      { required: true, message: '请输入售后内容',trigger: 'blur'},
	    ],
	  },
	  imageAccept: '.jpg,.jpeg,.png,.gif,.bmp',
	  imgList: [],
	  url_upload: '~/api/order_after_sale/upload?',
	  order_number: '',
	  order_id: '',
	  goods_id: '',
	  afterSaleIdx: '',
	  afterSaleDialog: false,
	  aftersaleLabel: '',
    };
  },
  onLoad(e) {
    this.query.user_id = this.userInfo.user_id;
    /*#ifdef H5 || APP-PLUS*/
    let type = this.$route.query.type;
    /*#endif*/
    /*#ifdef  MP-WEIXIN*/
    let type = e.type;
    /*#endif*/
    if (type){
      this.tabIndex = parseInt(type)
    }
    this.getOrderList();
  },
  methods: {
	go_order_detail(obj) {
	  if (!!obj.integral) {
	    this.$Router.push(
	      `/pagesA/order/details?order_number=${obj.order_number}&integral=${obj.integral}`
	    );
	  } else {
	    this.$Router.push(`/pagesA/order/details?order_number=${obj.order_number}`);
	  }
	},
    /**
     * 获取订单列表数据
     */
    getOrderList() {
      let curTab = this.tabs[this.tabIndex];
      let state = curTab.state;

      if (state) {
        this.query.state = state;
      }
      getOrderListApi(this.query)
        .then((res) => {
          this.list = this.get_list_after(res.result.list);
        })
        .catch(() => {});
    },
    // 切换菜单
    tabChange() {
      if (this.tabIndex === 1) {
        this.query.state = '待付款';
      } else if (this.tabIndex === 2) {
        this.query.state = '已付款';
      } else {
        delete this.query.state;
      }
      this.list = []; // 先置空列表,显示加载进度
      this.getOrderList();
    },
    // 删除订单
    del_order(order_number, i) {
      this.$get(
        '~/api/order/del',
        {
          order_number,
        },
        (res) => {
          this.list.splice(i, 1);
        }
      );
    },
	// 取消订单
	cancel_order(order_number, i) {
	  var _this = this;
	  uni.showModal({
	    title: '取消订单',
	    content: '是否要取消订单?',
	    success: async (res) => {
	      if (res.confirm) {
	        _this.$post(
	          "~/api/order/set?order_number=" + order_number,
	          {
	            state: "已取消",
	          },
	          (res) => {
	            _this.$toast('取消订单成功！', 'success');
	            _this.list[i].state = "已取消"
	          }
	        );
	      } else if (res.cancel) {
	        console.log('用户点击取消');
	      }
		},
	  })
	},
	openAfterSaleType() {
	  this.showTypePicker = true;
	},
	aftersale_order(item, idx) {
	  //售后申请
	  let _this = this;
	  this.order_number = item.order_number;
	  this.order_id = item.list[0].order_id;
	  this.goods_id = item.list[0].goods_id;
	  this.afterSaleIdx = idx;
	  this.afterSaleDialog = true;
	},
	submitAftersale() {
	  //提交售后服务填写
	  let that=this;
	  if(!this.form.type){
	    return this.$toast(`请选择售后类型`, 'error');
	  }else if(!this.form.content_desc){
	    return this.$toast(`请填写售后内容`, 'error');
	  }else if (this.imgList.length == 0) {
	    return this.$toast(`请上传凭证图片`, 'error');
	  } 
	  let beforeListOneMsg = that.list[Number(that.afterSaleIdx)];
	  let queryDatas = Object.assign(this.form, {
	    imgs: JSON.stringify(this.imgList),
	    order_number: this.order_number,
	    order_id: this.order_id,
	    goods_id: this.goods_id,
	  });
	  queryDatas.state = beforeListOneMsg.state;
	  queryDatas.merchant_id = beforeListOneMsg.list[0].merchant_id;
	  queryDatas.user_id = beforeListOneMsg.list[0].user_id;
	  queryDatas.price_count = beforeListOneMsg.list[0].price_count;
	  queryDatas.num = beforeListOneMsg.list[0].num;
	  queryDatas.price = beforeListOneMsg.list[0].price;
	  queryDatas.title = beforeListOneMsg.list[0].title;
	  queryDatas.buy_type = beforeListOneMsg.list[0].buy_type;
		  queryDatas.integral = beforeListOneMsg.list[0].integral==undefined?0:beforeListOneMsg.list[0].integral;
		  console.log('queryDatas',queryDatas)
	  that.$post('~/api/order_after_sale/add?', queryDatas, (res) => {
	    if (res.result) {
	      // 修改订单状态
	      that.$post(
	        '~/api/order/set?order_number=' + that.order_number,
	        {
	          state: '售后/退款',
	        },
	        (result) => {
	          that.$toast(`添加成功`, 'success');
	          that.cancel_aftersale();
	          that.list[Number(that.afterSaleIdx)].state = '售后/退款';
	        }
	      );
              let message_inform = {
          title: '用户提交售后申请',
          type: '通知',
          content: `订单 #${this.order_number} 已申请售后退款，请尽快处理！`,
          state: 1,
          user_id: queryDatas.merchant_id
        }
        this.$post("~/api/message_inform/add",message_inform)
      	    } else if (res.error) {
	      that.$toast(`${res.error.message}`, 'error');
	      console.error(res.error);
	    }
	  });
	  
	
	},
	cancel_aftersale() {
	  //取消售后服务填写
	  this.afterSaleDialog = false;
	  // 还原form表单的值
	  this.form = {
	    type: '',
	    content_desc: '',
	  };
	  this.imgList = [];
	},
	// 选择退款类型
	select_type(e) {
	  let i = e[0]; // 将根据索引将你选中的学校名称在数组中找出来
	  let list = JSON.parse(JSON.stringify(this.afterSaleStateArr));
	  this.form.type=list[i].value;
	  this.aftersaleLabel = list[i].label;
	  this.showTypePicker = false;
	},
	chooseImages() {
	  // 使用uni-app的API选择图片
	  uni.chooseImage({
	    count: 5, // 默认为9，表示调用时显示的图片张数
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: (res) => {
	      // 将选择的图片追加到images数组中
	      if (this.imgList.length + res.tempFilePaths.length > 5) {
	        this.$toast('最多可添加5张图片！', 'error');
	      } else {
	        // 遍历数组，上传每张图片
	        this.uploadImages(res.tempFilePaths);
	      }
	    },
	  });
	},
	uploadImages(imagePaths) {
	  // 并行上传所有图片
	
	  const uploadPromises = imagePaths.map((imagePath) => this.uploadImage(imagePath));
	  Promise.all(uploadPromises)
	    .then((results) => {
	      // 所有图片上传成功后的处理
	      console.log('所有图片上传成功', results);
	      // 解析服务器端返回的数据
	      this.imgList = this.imgList.concat(results);
	      // this.imgList = [...this.imgList, ...res.tempFilePaths];
	    })
	    .catch((error) => {
	      // 如果有图片上传失败
	      console.error('图片上传失败', error);
	    });
	},
	uploadImage(imagePath) {
	  // 这里是上传单张图片的逻辑
	  // 假设你的服务器接口为 https://yourserver.com/upload
	  // 并且服务器需要接收 file 字段作为图片数据
	  let _this=this;
	  console.log(1111)
	  return new Promise((resolve, reject) => {
	    uni.uploadFile({
	      url: _this.$fullUrl('~/api/order_after_sale/upload?'),
	      filePath: imagePath,
	      name: 'file', // 后端接收的参数名
	      success: (uploadRes) => {
	        console.log(uploadRes);
	        if (!!uploadRes.data) {
	          let data = JSON.parse(uploadRes.data);
	          if (!!data.result && !!data.result.url) {
	            resolve(data.result.url); // 假设data是服务器返回的图片信息
	          }
	        } else {
	          reject(new Error('上传失败'));
	        }
	      },
	      fail: (err) => {
	        reject(err);
	      },
	    });
	  });
	},
	deleteImage(index) {
	  // 从images数组中删除指定索引的图片
	  this.imgList.splice(index, 1);
	},
    /**
     * 搜索
     */
	search_() {
	  this.query.page = 1;
	  this.get_list();
	},
	cancel() {
	  console.log('eer');
	  this.query.title = '';
	  this.search_();
	},
    searchData(v) {
      this.query.page = 1;
      this.query.title = v;
      this.getOrderList();
    },
    input(e, key) {
      this.query[key] = e;
    },
    // 改变分类标签
    changeTab(val) {
      if (val === '全部') {
        this.query.state = '';
      } else {
        this.query.state = val;
      }
      this.search_();
    },
    get_list_before(param) {
      param.user_id = this.userInfo.user_id;
      return param;
    },
    get_list_after(list) {
      // 根据订单号区分列表
      let list_diff = [];
      let order_num = '';
      let index = -1;

      list.map((o) => {
        if (o.order_number === order_num) {
          list_diff[index]['list'].push(o);
          list_diff[index]['sum_price'] =
            parseFloat(o.price_count) + parseFloat(list_diff[index]['sum_price']);
        } else {
          index += 1;
          order_num = o.order_number;
          list_diff[index] = {};
          var obj_diff = list_diff[index];
          obj_diff['create_time'] = o.create_time;
          obj_diff['order_number'] = order_num;
          obj_diff['list'] = [];
          obj_diff['list'].push(o);
          obj_diff['sum_price'] = o.price_count;
          obj_diff['state'] = o.state;
		  obj_diff['integral'] = o.integral;
		  obj_diff['buy_type'] = o.buy_type;
		  obj_diff['integral_total'] = Number(o.integral) * Number(o.num);
        }
      });
      return list_diff;
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
.btn_block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.aftersale-btn,
.cancel-btn {
  color: #e13a0c;
  border: 1px solid #e13a0c;
  background: #fff;
  margin-left: 5px;
}

.cancel-btn {
  color: #666;
  background: #fff;
  border: 1px solid #666;
}
.after-sal-form-model{
  position: fixed;
  left:0;
  top:0;
  width:100vw;
  height: 100vh;
  background:rgba(0,0,0,.4);
  z-index:5;
}
.after-sale-form {
  max-height: 70vh;
  overflow-y: scroll;
  background-color: #fff !important;
  width: 90%;
}
.after-sale-form-title {
  text-align: center;
  font-weight: bold;
  font-size: 30rpx;
  margin-top: 40rpx;
}
.after-sale-form-inn {
  width: 90%;
  margin-left: 5%;
}

.after-sale-form .dialog_btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.after-sale-form .handin-after-sale-btn,
.after-sale-form .search_btn_reset {
  width: 40%;
}

.upload_imgs_container {
  padding: 20px;
  width:calc(100% - 10rpx);
}

.upload_imgs_container .choose-img-btn {
  margin-top: -8px;
  margin-bottom: 10px;
}

.upload_imgs_container .image-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: -10px;
  /* 根据实际情况调整 */
}

.upload_imgs_container .image-item {
  max-height: 100px;
  max-width: 200px;
  /* 示例高度 */
  margin: 10px;
}
.upload_imgs_container img{
  max-width:50px !important;
}
.upload_imgs_container .del-image-btn {
  font-size: 12px;
  margin-left: 10px;
}
.picker-model {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
</style>
