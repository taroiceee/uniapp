<template>
  <view class="page_diy_view page_classification_information_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>分类信息详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','classification_name') || ($check_field('add','classification_name') || $check_field('set','classification_name'))" label="分类名称" name="classification_name">
                      <uni-easyinput type="text" v-model="form['classification_name']" v-if="(form['classification_information_id'] && $check_field('set','classification_name')) || (!form['classification_information_id'] && $check_field('add','classification_name'))" :disabled="disabledObj['classification_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','classification_name')">
            {{ form['classification_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','description_and_explanation') || ($check_field('add','description_and_explanation') || $check_field('set','description_and_explanation'))" label="描述说明" name="description_and_explanation">
                      <uni-easyinput type="text" v-model="form['description_and_explanation']" v-if="(form['classification_information_id'] && $check_field('set','description_and_explanation')) || (!form['classification_information_id'] && $check_field('add','description_and_explanation'))" :disabled="disabledObj['description_and_explanation_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','description_and_explanation')">
            {{ form['description_and_explanation'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','location_information') || ($check_field('add','location_information') || $check_field('set','location_information'))" label="地点信息" name="location_information">
                      <uni-easyinput type="text" v-model="form['location_information']" v-if="(form['classification_information_id'] && $check_field('set','location_information')) || (!form['classification_information_id'] && $check_field('add','location_information'))" :disabled="disabledObj['location_information_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','location_information')">
            {{ form['location_information'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item label="当前位置" name="location_address">
            <uni-easyinput type="text" placeholder="当前位置" :disabled="true" v-model="form['location_address']"/>
            <view class="me-btn" @click="getLongitudeLatitude()" style="margin-left: 10rpx" >定位</view>
        </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/classification_information/view','set') || ($check_action('/classification_information/view','add') || $check_option('/classification_information/table','examine'))">
        <view class="me-btn btn-submit" @click="submit_()"> 提交 </view>
        <view class="me-btn btn-cancel" @click="cancel()">取消</view>
      </view>
      <view class="form_button" v-else>
        <view class="me-btn btn-cancel" @click="cancel()">返回</view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
            import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  mixins: [mixin],
  data() {
    return {
	  today: new Date().toISOString().split('T')[0],
      field: "classification_information_id",
      url_add: "~/api/classification_information/add?",
      url_set: "~/api/classification_information/set?",
      url_get_obj: "~/api/classification_information/get_obj?",
      url_upload: "~/api/classification_information/upload?",
      classification_name: null,
	      description_and_explanation: null,
	      location_information: null,
				      query: {
        "classification_information_id": 0,
      },
      form: {
          "classification_name":  '', // 分类名称
            "description_and_explanation":  '', // 描述说明
            "location_information":  '', // 地点信息
          "classification_information_id": 0, // ID
        "location_address": "", // 定位地址
        "location_lng": "", // 定位地址经度
        "location_lat": "", // 定位地址纬度
      },
      disabledObj:{
          "classification_name_isDisabled": false,
            "description_and_explanation_isDisabled": false,
            "location_information_isDisabled": false,
        },
                            };
  },
  methods: {
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                                                      return null;
    },
    changeLog(v, value) {
      this.form[value] = v;
    },
    uploadFile_(type) {
      // #ifdef APP-VUE
      uni.chooseFile({
        count: 1,
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          this.successChoose(tempFilePaths[0], type);
        },
      });
      // #endif
      // #ifdef !APP-VUE
      if (
        uni.getSystemInfoSync().uniPlatform != 'mp-weixin' ||
        uni.getSystemInfoSync().platform == 'devtools'
      ) {
        uni.chooseImage({
          count: 1,
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            this.successChoose(tempFilePaths[0], type);
          },
        });
      } else {
        wx.chooseMessageFile({
          count: 1,
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFiles;
            this.successChoose(tempFilePaths[0].path, type);
          },
        });
      }
      // #endif
    },
    successChoose(filePath, type) {
      uni.uploadFile({
        url: this.$fullUrl('~/api/classification_information/upload?'), //仅为示例，非真实的接口地址
        filePath,
        name: 'file',
        success: (uploadFileRes) => {
          if (uploadFileRes.data.error) {
            uni.showToast({ title: uploadFileRes.data.error.message, icon: 'none' });
          } else {
            this[type] = JSON.parse(uploadFileRes.data).result.url;
          }
        },
      });
    },
    close_(type) {
      if (type == 'classification_name') this['classification_name'] = this.form['classification_name'] = "";
      if (type == 'description_and_explanation') this['description_and_explanation'] = this.form['description_and_explanation'] = "";
      if (type == 'location_information') this['location_information'] = this.form['location_information'] = "";
    },
    submit_() {
      if (this['classification_name'] !== null) this.form['classification_name'] = this['classification_name']
      if (this['description_and_explanation'] !== null) this.form['description_and_explanation'] = this['description_and_explanation']
      if (this['location_information'] !== null) this.form['location_information'] = this['location_information']
      console.log(this.form)
      this.submit();
    },
    /**
     * 上传文件
     * @param {Object} param文件参数
     */
    change_file(key_name) {
      var _self = this;
      // 选择图像方法
      uni.chooseFile({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (file) => {
          const tempFilePaths = file.tempFilePaths;
          const filePath = tempFilePaths[0];
          uploadFilePathApi(
            '/classification_information/upload',
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
            this.form[key_name] = filename;
          });
        },
        error: function (e) {
          console.log(e);
        },
      });
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
        // sourceType: ['album'], //从相册选择
        success: (file) => {
          const tempFilePaths = file.tempFilePaths;
          const filePath = tempFilePaths[0];
          uploadFilePathApi('/classification_information/upload',filePath,undefined,undefined,
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
            this.form[key_name] = filename;
          });
        },
        error: function (e) {
          console.log(e);
        },
      });
    },
    /**
     * 获取对象后获取缓存表单
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_before(param) {
      var form = uni.db.get('form');
      if (form) {
        delete form.examine_state;
        delete form.examine_reply;
        this.obj = uni.push(this.obj, form);
        this.form = uni.push(this.form, form);
      }
      var arr = [];
      for (let key in form) {
        arr.push(key);
      }
      for (var i = 0; i < arr.length; i++) {
        this.disabledObj[arr[i] + '_isDisabled'] = true;
		if(arr[i] === "source_table"){
			this.form['source_table'] = form[arr[i]]
		}
		if(arr[i] === "source_id"){
			this.form['source_id'] = form[arr[i]]
		}
		if(arr[i] === "source_user_id"){
			this.form['source_user_id'] = form[arr[i]]
		}
      }
                  uni.db.del('form');

      return param;
    },
      
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	            	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/classification_information/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/classification_information/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/classification_information/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/classification_information/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/classification_information/view', 'get');
        console.log(bl ? '你有视图查询权限视作有查询权限' : '你没有视图查询权限');
      }

      console.log(
        bl
          ? '具有当前页面的查看权，请注意这不代表你有字段的查看权'
          : '无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行'
      );

      return bl;
    },
    getLongitudeLatitude() {
        let _this = this;
        _this.form.location_address = '广东省深圳市南山区科技园';
        _this.form.location_lng = '113.946782';
        _this.form.location_lat = '22.556481';
        uni.getLocation({
          type: 'gcj02',
          success: function (res) {
            let lat = res.latitude; //当前位置的纬度
            let lng = res.longitude; //当前位置精度
            let location = lng + ',' + lat;
            let url ='http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location=' + location;
            uni.request({
              url,
              method: 'GET',
              dataType: 'json',
              success: function (res) {
                if (res.statusCode === 200) {
                  let data = res.data;
                  if (data.status === '1') {
                    _this.form.location_address = data.regeocode.formatted_address;
                    _this.form.location_lng = JSON.stringify(lng);
                    _this.form.location_lat = JSON.stringify(lat);
                  } else {
                    console.log(data.info);
                  }
                }
              },
              error: function (err) {
                console.log(err);
              },
            });
          },
          error: function (err) {
            console.log(err);
          },
        });
    },
  },
  created() {
              },
};
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .detailed_address {
    width: 100%;
    background-color: #f7f6f6;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding: 8px;
  }
</style>
