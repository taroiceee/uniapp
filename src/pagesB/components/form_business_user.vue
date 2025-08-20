<template>
  <view class="diy_register">
      <view v-if="$check_register_field('add', 'person_in_charge', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 负责人 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_person_in_charge" v-model="form['person_in_charge']" @blur="handleBlur($event.target.value,'person_in_charge')"  placeholder="请输入负责人" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'head_gender', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 负责人性别 </text>
      </view>
          <!-- 选项 -->
      <view class="diy_field diy_down">
        <uni-data-select
                id="form_head_gender"
                v-model="form['head_gender']"
                :localdata="list_head_gender"
                @change="change_head_gender"
        ></uni-data-select>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'shop_name', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 店铺名称 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_shop_name" v-model="form['shop_name']" @blur="handleBlur($event.target.value,'shop_name')"  placeholder="请输入店铺名称" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'shop_phone', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 店铺电话 </text>
      </view>
          <!-- 手机 -->
      <view class="diy_field diy_phone">
        <input type="text" id="form_shop_phone" v-model="form['shop_phone']" @blur="handleBlur($event.target.value, 'shop_phone')" placeholder="请输入店铺电话"/>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'store_address', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 店铺地址 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_store_address" v-model="form['store_address']" @blur="handleBlur($event.target.value,'store_address')"  placeholder="请输入店铺地址" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'registered_capital', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 注册资金 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_registered_capital" v-model="form['registered_capital']" @blur="handleBlur($event.target.value,'registered_capital')"  placeholder="请输入注册资金" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'number_of_companies', '/business_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 公司人数 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_number_of_companies" v-model="form['number_of_companies']" @blur="handleBlur($event.target.value,'number_of_companies')"  placeholder="请输入公司人数" />
        </view>
              </view>
    </view>
</template>

<script>
              import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  model: {
    prop: 'form',
    event: 'change',
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          url_upload: '~/api/business_user/upload?',
        };
      },
    },
  },
  data() {
    return {
              "list_head_gender": [],
                    };
  },
  methods: {
        /**
     * 获取负责人性别列表
     */
    async get_list_head_gender() {
          ['男','女'].map((o) => this.list_head_gender.push({value:o,text:o}));
      this.form["head_gender"] = this.list_head_gender[0].value;
            },
    change_head_gender(val) {
      if (val === "全部" || val === "") {
        this.$emit('change',{"value":"","type":"head_gender"})
      }else{
        this.$emit('change',{"value":val,"type":"head_gender"})
      }
            },
                /**
     * 上传图片
     * @param {Object} param文件参数
     */
    change_img(key_name) {
      var _self = this;
      _self.upload_img_flag = false;
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          console.log('开始上传图片');
          console.log(tempFilePaths);
          const tempFilePaths = res.tempFilePaths;
          const filePath = tempFilePaths[0];
          uploadFilePathApi(
                  undefined,
                  filePath,
                  undefined,
                  {
                    i_want_to_customize: 'test',
                  },
                  (task) => {
                    task.onProgressUpdate((res) => {
                      this.percent = res.progress;
                      console.log('上传进度' + res.progress);
                      console.log('已经上传的数据长度' + res.totalBytesSent);
                      console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
                    });
                  }
          ).then((res) => {
            const filename = res.result.url;
            _self.$delete(this.form, key_name);
            _self.$set(this.form, key_name, filename);
            _self.handleBlur(filename, key_name);
          });
        },
        error: function (e) {
          console.log(e);
        },
      });
    },
    handleBlur(value, type) {
      this.$emit('change', { value, type });
    },
  },
  mounted() {
          this.get_list_head_gender();
                          },
};
</script>
