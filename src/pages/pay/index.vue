<template>
  <view class="page_pay" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>支付</tn-nav-bar>
    <view class="pay_wrapper" id="page_pay">
      <view class="warp">
        <view class="container">
          <view class="row">
            <view class="col-12 col-md-6">
              <view class="card">
                <view style="margin-top: 20rpx">
                  <h4 class="text-center">总支付：￥{{ query.sum_price }}</h4>
                </view>
                <view
                  class="pay-type-nav tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-center"
                >
                  <view
                    @click="type = '微信'"
                    class="pay-type-one tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"
                  >
                    <text>微信</text>
                    <i :class="['underline', type == '微信' ? 'undeline-act' : '']"></i>
                  </view>
                  <view
                    @click="type = '支付宝'"
                    class="pay-type-one tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"
                  >
                    <text>支付宝</text>
                    <i :class="['underline', type == '支付宝' ? 'undeline-act' : '']"></i>
                  </view>
                  <view
                    @click="setAccountPay"
                    class="pay-type-one tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"
                  >
                    <text>网银</text>
                    <i :class="['underline', type == '网银' ? 'undeline-act' : '']"></i>
                  </view>
                  <view
                    @click="type = 'wallet'"
                    v-if="walletStatus == null"
                    class="pay-type-one tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center"
                  >
                    <text>钱包</text>
                    <i :class="['underline', type == 'wallet' ? 'undeline-act' : '']"></i>
                  </view>
                </view>
                <view class="tn-flex pay-type-content">
                  <view
                    v-if="type == '微信'"
                    class="width-box tn-flex tn-flex-col-center tn-flex-row-center"
                  >
                    <img class="pay-img" src="/static/img/wx.png" alt="" />
                  </view>
                  <view
                    v-if="type == '支付宝'"
                    class="width-box tn-flex tn-flex-col-center tn-flex-row-center"
                  >
                    <img class="pay-img" src="/static/img/aplipay.png" alt="" />
                  </view>

                  <view
                    v-if="type == '网银'"
                    class="width-box tn-flex tn-flex-col-center tn-flex-row-center"
                  >
                    <tn-form
                      :labelWidth="180"
                      :model="pay_obj"
                      ref="form"
                      :errorType="['message']"
                      class="account-pay"
                    >
                      <tn-form-item label="网银账号" prop="account">
                        <tn-input
                          v-model="pay_obj.account"
                          type="text"
                          placeholder="请输入网银账号"
                        />
                      </tn-form-item>
                      <tn-form-item label="支付密码" prop="password">
                        <tn-input
                          v-model="pay_obj.password"
                          type="password"
                          placeholder="请输入支付密码，6位数字："
                        />
                      </tn-form-item>
                    </tn-form>
                  </view>
                </view>
                <button type="primary" @click="pay">支付</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
export default {
  mixins: [mixin],

  components: {},
  data() {
    return {
      type: '微信',
      query: {
        sum_price: '',
        order_number: '',
        remark: '',
        selected: '',
      },
      pay_obj: {
        payActiveName: '微信',
        account: '',
        password: '',
        id: '',
      },
      balance: 0,
      walletStatus: null,
      // 验证规则
      rules: {
        account: [{ required: true, message: '网银账号不能为空' }],
        password: [
          { required: true, message: '支付密码不能为空' },
          { len: 6, message: '支付密码必须为6位数字' },
        ],
      },
    };
  },

  methods: {
    recharged() {
      let _this = this;
      if (this.type == '网银') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log('验证通过');
            _this.setAccount();
          } else {
            console.log('验证失败');
            return false;
          }
        });
      } else {
        _this.setAccount();
      }
    },
    setAccount() {
      let _this = this;
      _this.$post(
        '~/api/user/set?user_id=' + _this.$store.state.app.userInfo.user_id,
        {
          balance: (Number(_this.walletStatus) + Number(_this.balance)).toFixed(2),
        },
        (res) => {
          _this.$toast('充值成功');
          setTimeout(function () {
            _this.$Router.back(1);
          }, 2000);
        }
      );
    },
    setAccountPay() {
      let _this = this;
      _this.type = '网银';
      setTimeout(function () {
        _this.$refs.form.setRules(_this.rules);
      }, 500);
    },
    pay() {
      let _this = this;
      if (this.walletStatus != null) {
        _this.recharged();
      }
    },
  },
  onLoad(option) {
    this.walletStatus = option.moneyNow;
    this.balance=this.$store.state.app.userInfo.balance;
    if (this.walletStatus != undefined) {
      this.query.sum_price = this.walletStatus;
    }
  },
};
</script>
<style lang="scss" scoped>
.pay_wrapper {
  width: 94%;
  margin-left: 3%;
}
.width-box {
  width: 100%;
}
.pay-img {
  width: 60%;
  margin-bottom: 20rpx;
}
.pay-type-nav {
  width: 100%;
  border-bottom: 1px solid #eee;
  margin-top: 10px;
  .pay-type-one {
    width: 25%;

    .underline {
      width: 50%;
      height: 4rpx;
      margin-top: 10rpx;
      background: #fff;
      display: inline-block;
      border-radius: 4rpx;
    }
    .undeline-act {
      background: #0079fe;
    }
  }
}

.pay-type-content {
  margin-top: 30rpx;
}
.account-pay {
  margin-bottom: 20rpx;
  width: 94%;
}
</style>
