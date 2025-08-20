<template>
  <view class="page_diy_view page_offline_activities_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>线下活动详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','activity_name') || ($check_field('add','activity_name') || $check_field('set','activity_name'))" label="活动名称" name="activity_name">
                      <uni-easyinput type="text" v-model="form['activity_name']" v-if="(form['offline_activities_id'] && $check_field('set','activity_name')) || (!form['offline_activities_id'] && $check_field('add','activity_name'))" :disabled="disabledObj['activity_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','activity_name')">
            {{ form['activity_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','activity_type') || ($check_field('add','activity_type') || $check_field('set','activity_type'))" label="活动类型" name="activity_type">
                      <uni-easyinput type="text" v-model="form['activity_type']" v-if="(form['offline_activities_id'] && $check_field('set','activity_type')) || (!form['offline_activities_id'] && $check_field('add','activity_type'))" :disabled="disabledObj['activity_type_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','activity_type')">
            {{ form['activity_type'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','activity_date') || ($check_field('add','activity_date') || $check_field('set','activity_date'))" label="活动日期" name="activity_date">
    	      <uni-datetime-picker v-if="(form['offline_activities_id'] && $check_field('set', 'activity_date')) || (!form['offline_activities_id'] && $check_field('add', 'activity_date'))" v-model="form['activity_date']" type="date" :disabled="disabledObj['activity_date_isDisabled']" :start="today"/>
	      <!-- 仅查看 -->
	      <text v-else-if="$check_field('get', 'activity_date')">
	        {{ form['activity_date'] }}
	      </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','number_of_enrolment') || ($check_field('add','number_of_enrolment') || $check_field('set','number_of_enrolment'))" label="报名人数" name="number_of_enrolment">
                      <uni-easyinput type="text" v-model="form['number_of_enrolment']" v-if="(form['offline_activities_id'] && $check_field('set','number_of_enrolment')) || (!form['offline_activities_id'] && $check_field('add','number_of_enrolment'))" :disabled="disabledObj['number_of_enrolment_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','number_of_enrolment')">
            {{ form['number_of_enrolment'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','promotional_vuser_ideo') || ($check_field('add','promotional_vuser_ideo') || $check_field('set','promotional_vuser_ideo'))" label="宣传视频" name="promotional_vuser_ideo">
              <view class="field-value">
            <!-- 查询权限 -->
            <view class="diy_video" v-if="!promotional_vuser_ideo && $check_field('get', 'promotional_vuser_ideo') && form['promotional_vuser_ideo']">
              <view class="me-btn" style="margin-bottom: 8rpx" @click="close_('promotional_vuser_ideo')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['promotional_vuser_ideo'])" controls></video>
            </view>
            <view v-else-if="$check_field('add', 'promotional_vuser_ideo') || $check_field('set', 'promotional_vuser_ideo')">
              <view class="me-btn" @click="uploadFile_('promotional_vuser_ideo')"> 上传视频 </view>
            </view>
            <view class="file-url" v-if="promotional_vuser_ideo">{{ promotional_vuser_ideo }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','activity_description') || ($check_field('add','activity_description') || $check_field('set','activity_description'))" label="活动描述" name="activity_description">
              <uni-easyinput type="textarea" v-model="form['activity_description']" v-if="(form['offline_activities_id'] && $check_field('set', 'activity_description')) || (!form['offline_activities_id'] && $check_field('add', 'activity_description'))" :disabled="disabledObj['activity_description_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'activity_description')">
            {{ form['activity_description'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item label="详细地址">
          <view class="detailed_address" @click="getAddress">{{form['mark_address']}}</view>
        </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/offline_activities/view','set') || ($check_action('/offline_activities/view','add') || $check_option('/offline_activities/table','examine'))">
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
      field: "offline_activities_id",
      url_add: "~/api/offline_activities/add?",
      url_set: "~/api/offline_activities/set?",
      url_get_obj: "~/api/offline_activities/get_obj?",
      url_upload: "~/api/offline_activities/upload?",
      activity_name: null,
	      activity_type: null,
	      activity_date: null,
	      number_of_enrolment: null,
	      promotional_vuser_ideo: null,
	      activity_description: null,
							      query: {
        "offline_activities_id": 0,
      },
      form: {
          "activity_name":  '', // 活动名称
            "activity_type":  '', // 活动类型
            "activity_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "number_of_enrolment":  0 , // 报名人数
            "promotional_vuser_ideo":  '', // 宣传视频
            "activity_description":  '', // 活动描述
          "offline_activities_id": 0, // ID
        "mark_address": '', // 地址
        "mark_lng": '', // 地址经度
        "mark_lat": '', // 地址纬度
      },
      disabledObj:{
          "activity_name_isDisabled": false,
            "activity_type_isDisabled": false,
            "activity_date_isDisabled": false,
                "promotional_vuser_ideo_isDisabled": false,
            "activity_description_isDisabled": false,
        },
                          // 活动类型选项列表
      list_activity_type: [],
                                            };
  },
  methods: {
        getAddress() {
      const that = this;
      uni.chooseLocation({
        latitude: that.form.location_lat || 22.556481,
        longitude: that.form.location_lng || 113.946782,
        success: function(res) {
          console.log(res,'搜索调用成功');
          let addressData = {
            mark_address: res.address,
            mark_lat: res.latitude,
            mark_lng: res.longitude,
          }
          // 存入本地存储marker
          uni.setStorageSync('addressData', addressData);
        },
        fail: function(err) {
          console.log(err,'搜索调用失败');
        }
      })
    },
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                                          if (!param.activity_date){
        return "活动日期不能为空";
      }
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
        url: this.$fullUrl('~/api/offline_activities/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'activity_name') this['activity_name'] = this.form['activity_name'] = "";
      if (type == 'activity_type') this['activity_type'] = this.form['activity_type'] = "";
      if (type == 'activity_date') this['activity_date'] = this.form['activity_date'] = "";
      if (type == 'number_of_enrolment') this['number_of_enrolment'] = this.form['number_of_enrolment'] = "";
      if (type == 'promotional_vuser_ideo') this['promotional_vuser_ideo'] = this.form['promotional_vuser_ideo'] = "";
      if (type == 'activity_description') this['activity_description'] = this.form['activity_description'] = "";
    },
    submit_() {
      if (this['activity_name'] !== null) this.form['activity_name'] = this['activity_name']
      if (this['activity_type'] !== null) this.form['activity_type'] = this['activity_type']
      if (this['activity_date'] !== null) this.form['activity_date'] = this['activity_date']
      if (this['number_of_enrolment'] !== null) this.form['number_of_enrolment'] = this['number_of_enrolment']
      if (this['promotional_vuser_ideo'] !== null) this.form['promotional_vuser_ideo'] = this['promotional_vuser_ideo']
      if (this['activity_description'] !== null) this.form['activity_description'] = this['activity_description']
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
            '/offline_activities/upload',
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
          uploadFilePathApi('/offline_activities/upload',filePath,undefined,undefined,
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
                  if (this.form["activity_date"] && JSON.stringify(this.form["activity_date"]).indexOf("-")===-1) {
        this.form["activity_date"] = this.$toTime(parseInt(this.form["activity_date"]), "yyyy-MM-dd")
      }
                      uni.db.del('form');

      return param;
    },
      
        /**
     * 获取活动类型列表
     */
    async get_list_activity_type() {
            },
              
        
        
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	              if (this.form["activity_date"] && JSON.stringify(this.form["activity_date"]).indexOf("-")===-1) {
        this.form["activity_date"] = this.$toTime(parseInt(this.form["activity_date"]),"yyyy-MM-dd")
      }
        	            	            	            	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/offline_activities/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/offline_activities/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/offline_activities/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/offline_activities/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/offline_activities/view', 'get');
        console.log(bl ? '你有视图查询权限视作有查询权限' : '你没有视图查询权限');
      }

      console.log(
        bl
          ? '具有当前页面的查看权，请注意这不代表你有字段的查看权'
          : '无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行'
      );

      return bl;
    },
  },
  created() {
          this.get_list_activity_type();
                      },
  onShow() {
    let addressData = uni.getStorageSync('addressData');
    if(addressData) {
      setTimeout(() => {
        this.form.mark_address = addressData.mark_address;
        this.form.mark_lng = addressData.mark_lng;
        this.form.mark_lat = addressData.mark_lat;
        uni.removeStorageSync('addressData');
      }, 1000)
    }
  }
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
