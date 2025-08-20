<!-- // 二维码生成开始 -->
<template>
  <view class="qrcodeDetails">
    <view class="qrcodeBox">
      <view class="qrcodeTitle">扫码结果</view>
      <view class="qrcodeCard">
                                                            <view class="detailsTitle">{{obj.name_of_commodity}}</view>
                    <view class="detailsContent">
          <view class="detailsImg">
                                                                                                                                                                                                      <image style="width: 100%;height:100%;" :src="$fullUrl(obj.commodity_cover)" mode="aspectFill"></image>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </view>
          <view class="detailsInfo">
                                                                                      <view class="detailsInfoItem">
                    <text class="InfoItemTitle">商品名称：</text>
                    <text class="InfoItemConten">{{obj.name_of_commodity}}</text>
                  </view>
                                                                                          <view class="detailsInfoItem">
                    <text class="InfoItemTitle">分类名称：</text>
                    <text class="InfoItemConten">{{obj.category_name}}</text>
                  </view>
                                                                                                                                                                                                                                                                          <view class="detailsInfoItem">
                    <text class="InfoItemTitle">商家用户：</text>
                    <text class="InfoItemConten">{{obj.business_user}}</text>
                  </view>
                                                                                          <view class="detailsInfoItem">
                    <text class="InfoItemTitle">保质时间：</text>
                    <text class="InfoItemConten">{{obj.shelf_life_time}}</text>
                  </view>
                                                                                                                                                                        <view class="detailsInfoItem">
                    <text class="InfoItemTitle">定制价格：</text>
                    <text class="InfoItemConten">{{obj.customized_price}}</text>
                  </view>
                                                                                                        </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      obj: {},
      url_get_obj: "~/api/customized_products/get_obj",
    }
  },
  methods: {
    get_obj() {
      let customized_products_id = this.getQueryString('customized_products_id');
      
      this.$get(this.url_get_obj + "?customized_products_id=" + customized_products_id,{},(res) => {
        this.obj = res.result.obj;
      });
    },
    // uniapp获取url参数的方法
    getQueryString(name) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      return options[name];
    }
  },
  mounted() {
    this.get_obj();
  }
}
</script>

<style>
/* uniapp不需要scoped属性 */
.qrcodeDetails {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcodeBox {
  align-items: center;
  width: 80%;
  height: 80%;
}
.qrcodeTitle {
  font-size: 36rpx;
  text-align: center;
  margin-bottom: 80rpx;
}
.qrcodeCard {
  width: 100%;
  height: 90%;
  border: 1rpx solid #ccc;
  border-radius: 12rpx;
  overflow: hidden;
}
.detailsTitle {
  width: 100%;
  height: 8%;
  padding: 20rpx;
  font-size: 48rpx;
  font-weight: 600;
  text-align: center;
  background-color: #f4f4f4;
  border-bottom: 1rpx solid #ccc;
}
.detailsContent {
  width: 100%;
  height: 92%;
  padding: 20rpx;
}
.detailsImg {
  width: 100%;
  height: 70%;
  background-color: #ccc;
}
.detailsInfo {
  width: 100%;
  height: 30%;
  padding: 20rpx 0;
  box-sizing: border-box;
}
.detailsInfoItem {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20rpx;
}
.InfoItemTitle {
  width: 160rpx;
}
.InfoItemConten {
  flex: 1;
}
</style>
<!-- // 二维码生成结束 -->
