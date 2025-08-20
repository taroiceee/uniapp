<template>
  <view class="page_diy_view page_schedule_of_sessions_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>场次安排详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','name_of_session') || ($check_field('add','name_of_session') || $check_field('set','name_of_session'))" label="场次名称" name="name_of_session">
                      <uni-easyinput type="text" v-model="form['name_of_session']" v-if="(form['schedule_of_sessions_id'] && $check_field('set','name_of_session')) || (!form['schedule_of_sessions_id'] && $check_field('add','name_of_session'))" :disabled="disabledObj['name_of_session_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','name_of_session')">
            {{ form['name_of_session'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','schedule_of_sessions') || ($check_field('add','schedule_of_sessions') || $check_field('set','schedule_of_sessions'))" label="场次安排" name="schedule_of_sessions">
                      <uni-easyinput type="text" v-model="form['schedule_of_sessions']" v-if="(form['schedule_of_sessions_id'] && $check_field('set','schedule_of_sessions')) || (!form['schedule_of_sessions_id'] && $check_field('add','schedule_of_sessions'))" :disabled="disabledObj['schedule_of_sessions_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','schedule_of_sessions')">
            {{ form['schedule_of_sessions'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','activity_arrangement') || ($check_field('add','activity_arrangement') || $check_field('set','activity_arrangement'))" label="活动安排" name="activity_arrangement">
              <ld-select :multiple="true" :list="list_activity_arrangement"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['activity_arrangement_isDisabled']"
              :disabled="disabledObj['activity_arrangement_isDisabled']"
              v-model="activity_arrangement_multiple_value"
              v-if="(form['schedule_of_sessions_id'] && $check_field('set', 'activity_arrangement')) || (!form['schedule_of_sessions_id'] && $check_field('add', 'activity_arrangement'))"
              @confirm="select_activity_arrangement_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'activity_arrangement')">
            {{ form['activity_arrangement'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','activity_location') || ($check_field('add','activity_location') || $check_field('set','activity_location'))" label="活动地点" name="activity_location">
              <ld-select :multiple="true" :list="list_activity_location"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['activity_location_isDisabled']"
              :disabled="disabledObj['activity_location_isDisabled']"
              v-model="activity_location_multiple_value"
              v-if="(form['schedule_of_sessions_id'] && $check_field('set', 'activity_location')) || (!form['schedule_of_sessions_id'] && $check_field('add', 'activity_location'))"
              @confirm="select_activity_location_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'activity_location')">
            {{ form['activity_location'] }}
          </text>
            </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/schedule_of_sessions/view','set') || ($check_action('/schedule_of_sessions/view','add') || $check_option('/schedule_of_sessions/table','examine'))">
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
                        import ldSelect from "@/components/ld-select/ld-select.vue";
import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  mixins: [mixin],
  components: {ldSelect},
  data() {
    return {
	  today: new Date().toISOString().split('T')[0],
      field: "schedule_of_sessions_id",
      url_add: "~/api/schedule_of_sessions/add?",
      url_set: "~/api/schedule_of_sessions/set?",
      url_get_obj: "~/api/schedule_of_sessions/get_obj?",
      url_upload: "~/api/schedule_of_sessions/upload?",
      name_of_session: null,
	      schedule_of_sessions: null,
	      activity_arrangement: null,
	      activity_location: null,
					      query: {
        "schedule_of_sessions_id": 0,
      },
      form: {
          "name_of_session":  '', // 场次名称
            "schedule_of_sessions":  '', // 场次安排
            "activity_arrangement":  '', // 活动安排
            "activity_location":  '', // 活动地点
          "schedule_of_sessions_id": 0, // ID
      },
      disabledObj:{
          "name_of_session_isDisabled": false,
            "schedule_of_sessions_isDisabled": false,
            "activity_arrangement_isDisabled": false,
            "activity_location_isDisabled": false,
        },
                                  activity_arrangement_multiple_value:[],
              // 活动安排选项列表
      list_activity_arrangement: [],
                          activity_location_multiple_value:[],
              // 活动地点选项列表
      list_activity_location: [],
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
        url: this.$fullUrl('~/api/schedule_of_sessions/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'name_of_session') this['name_of_session'] = this.form['name_of_session'] = "";
      if (type == 'schedule_of_sessions') this['schedule_of_sessions'] = this.form['schedule_of_sessions'] = "";
      if (type == 'activity_arrangement') this['activity_arrangement'] = this.form['activity_arrangement'] = "";
      if (type == 'activity_location') this['activity_location'] = this.form['activity_location'] = "";
    },
    submit_() {
      if (this['name_of_session'] !== null) this.form['name_of_session'] = this['name_of_session']
      if (this['schedule_of_sessions'] !== null) this.form['schedule_of_sessions'] = this['schedule_of_sessions']
      if (this['activity_arrangement'] !== null) this.form['activity_arrangement'] = this['activity_arrangement']
      if (this['activity_location'] !== null) this.form['activity_location'] = this['activity_location']
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
            '/schedule_of_sessions/upload',
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
          uploadFilePathApi('/schedule_of_sessions/upload',filePath,undefined,undefined,
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
     * 获取活动安排列表
     */
    async get_list_activity_arrangement() {
              var json = await this.$get("~/api/offline_activities/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_activity_arrangement.push({value:o.activity_type,text:o.activity_type}));
        if(!this.form["schedule_of_sessions_id"]) {
                      this.form["activity_arrangement"] = this.list_activity_arrangement[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
            select_activity_arrangement_multiple(v){
      this.form.activity_arrangement = "";
      if (v && v.length > 0) {
        this.form.activity_arrangement = v.toString();
      }
    },
          
        /**
     * 获取活动地点列表
     */
    async get_list_activity_location() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_activity_location.push({value:o.location_information,text:o.location_information}));
        if(!this.form["schedule_of_sessions_id"]) {
                      this.form["activity_location"] = this.list_activity_location[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
            select_activity_location_multiple(v){
      this.form.activity_location = "";
      if (v && v.length > 0) {
        this.form.activity_location = v.toString();
      }
    },
          
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	                  if (this.form.activity_arrangement){
        this.activity_arrangement_multiple_value = this.form.activity_arrangement.split(",")
      }
    	                  if (this.form.activity_location){
        this.activity_location_multiple_value = this.form.activity_location.split(",")
      }
    	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/schedule_of_sessions/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/schedule_of_sessions/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/schedule_of_sessions/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/schedule_of_sessions/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/schedule_of_sessions/view', 'get');
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
              this.get_list_activity_arrangement();
          this.get_list_activity_location();
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
