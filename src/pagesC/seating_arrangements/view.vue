<template>
  <view class="page_diy_view page_seating_arrangements_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>座位安排详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','name_of_session') || ($check_field('add','name_of_session') || $check_field('set','name_of_session'))" label="场次名称" name="name_of_session">
                      <uni-easyinput type="text" v-model="form['name_of_session']" v-if="(form['seating_arrangements_id'] && $check_field('set','name_of_session')) || (!form['seating_arrangements_id'] && $check_field('add','name_of_session'))" :disabled="disabledObj['name_of_session_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','name_of_session')">
            {{ form['name_of_session'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','date_of_session') || ($check_field('add','date_of_session') || $check_field('set','date_of_session'))" label="场次日期" name="date_of_session">
              <uni-datetime-picker v-if="(form['seating_arrangements_id'] && $check_field('set', 'date_of_session')) || (!form['seating_arrangements_id'] && $check_field('add', 'date_of_session'))" v-model="form['date_of_session']" type="date" :disabled="disabledObj['date_of_session_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'date_of_session')">
            {{ form['date_of_session'] }}
          </text>
	        </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','schedule_of_sessions') || ($check_field('add','schedule_of_sessions') || $check_field('set','schedule_of_sessions'))" label="场次安排" name="schedule_of_sessions">
                      <uni-easyinput type="text" v-model="form['schedule_of_sessions']" v-if="(form['seating_arrangements_id'] && $check_field('set','schedule_of_sessions')) || (!form['seating_arrangements_id'] && $check_field('add','schedule_of_sessions'))" :disabled="disabledObj['schedule_of_sessions_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','schedule_of_sessions')">
            {{ form['schedule_of_sessions'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','arrange_person_times') || ($check_field('add','arrange_person_times') || $check_field('set','arrange_person_times'))" label="安排人次" name="arrange_person_times">
              <ld-select :multiple="true" :list="list_arrange_person_times"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['arrange_person_times_isDisabled']"
              :disabled="disabledObj['arrange_person_times_isDisabled']"
              v-model="arrange_person_times_multiple_value"
              v-if="(form['seating_arrangements_id'] && $check_field('set', 'arrange_person_times')) || (!form['seating_arrangements_id'] && $check_field('add', 'arrange_person_times'))"
              @confirm="select_arrange_person_times_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'arrange_person_times')">
            {{ form['arrange_person_times'] }}
          </text>
            </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/seating_arrangements/view','set') || ($check_action('/seating_arrangements/view','add') || $check_option('/seating_arrangements/table','examine'))">
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
      field: "seating_arrangements_id",
      url_add: "~/api/seating_arrangements/add?",
      url_set: "~/api/seating_arrangements/set?",
      url_get_obj: "~/api/seating_arrangements/get_obj?",
      url_upload: "~/api/seating_arrangements/upload?",
      name_of_session: null,
	      date_of_session: null,
	      schedule_of_sessions: null,
	      arrange_person_times: null,
					      query: {
        "seating_arrangements_id": 0,
      },
      form: {
          "name_of_session":  '', // 场次名称
            "date_of_session": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "schedule_of_sessions":  0 , // 场次安排
            "arrange_person_times":  '', // 安排人次
          "seating_arrangements_id": 0, // ID
      },
      disabledObj:{
          "name_of_session_isDisabled": false,
            "date_of_session_isDisabled": false,
                "arrange_person_times_isDisabled": false,
        },
                                          arrange_person_times_multiple_value:[],
              // 安排人次选项列表
      list_arrange_person_times: [],
            };
  },
  methods: {
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                          if (!param.date_of_session){
        return "场次日期不能为空";
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
        url: this.$fullUrl('~/api/seating_arrangements/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'date_of_session') this['date_of_session'] = this.form['date_of_session'] = "";
      if (type == 'schedule_of_sessions') this['schedule_of_sessions'] = this.form['schedule_of_sessions'] = "";
      if (type == 'arrange_person_times') this['arrange_person_times'] = this.form['arrange_person_times'] = "";
    },
    submit_() {
      if (this['name_of_session'] !== null) this.form['name_of_session'] = this['name_of_session']
      if (this['date_of_session'] !== null) this.form['date_of_session'] = this['date_of_session']
      if (this['schedule_of_sessions'] !== null) this.form['schedule_of_sessions'] = this['schedule_of_sessions']
      if (this['arrange_person_times'] !== null) this.form['arrange_person_times'] = this['arrange_person_times']
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
            '/seating_arrangements/upload',
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
          uploadFilePathApi('/seating_arrangements/upload',filePath,undefined,undefined,
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
              if (this.form["date_of_session"] && JSON.stringify(this.form["date_of_session"]).indexOf("-")===-1) {
        this.form["date_of_session"] = this.$toTime(parseInt(this.form["date_of_session"]), "yyyy-MM-dd")
      }
                  uni.db.del('form');

      return param;
    },
      
        
        
        /**
     * 获取安排人次列表
     */
    async get_list_arrange_person_times() {
            },
            select_arrange_person_times_multiple(v){
      this.form.arrange_person_times = "";
      if (v && v.length > 0) {
        this.form.arrange_person_times = v.toString();
      }
    },
          
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	              if (this.form["date_of_session"] && JSON.stringify(this.form["date_of_session"]).indexOf("-")===-1) {
        this.form["date_of_session"] = this.$toTime(parseInt(this.form["date_of_session"]),"yyyy-MM-dd")
      }
        	            	                  if (this.form.arrange_person_times){
        this.arrange_person_times_multiple_value = this.form.arrange_person_times.split(",")
      }
    	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/seating_arrangements/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/seating_arrangements/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/seating_arrangements/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/seating_arrangements/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/seating_arrangements/view', 'get');
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
                  this.get_list_arrange_person_times();
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
