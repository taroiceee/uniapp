<template>
  <view class="page_diy_view page_feedback_on_opinions_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>意见反馈详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','title_name') || ($check_field('add','title_name') || $check_field('set','title_name'))" label="标题名" name="title_name">
                      <uni-easyinput type="text" v-model="form['title_name']" v-if="(form['feedback_on_opinions_id'] && $check_field('set','title_name')) || (!form['feedback_on_opinions_id'] && $check_field('add','title_name'))" :disabled="disabledObj['title_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','title_name')">
            {{ form['title_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','type_of_feedback_information') || ($check_field('add','type_of_feedback_information') || $check_field('set','type_of_feedback_information'))" label="反馈信息类型" name="type_of_feedback_information">
              <uni-data-select
              v-model="form.type_of_feedback_information"
              :localdata="list_type_of_feedback_information"
              :clear="!disabledObj['type_of_feedback_information_isDisabled']"
              :disabled="disabledObj['type_of_feedback_information_isDisabled']"
              v-if="(form['feedback_on_opinions_id'] && $check_field('set','type_of_feedback_information')) || (!form['feedback_on_opinions_id'] && $check_field('add','type_of_feedback_information'))"
			  style="width: 100%;"
                        ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get','type_of_feedback_information')">
            {{ form['type_of_feedback_information'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','feedback_user') || ($check_field('add','feedback_user') || $check_field('set','feedback_user'))" label="反馈用户" name="feedback_user">
              <uni-data-select
              id="form_feedback_user"
              v-model="form['feedback_user']"
              :localdata="list_user_feedback_user"
              :clear="!disabledObj['feedback_user_isDisabled']"
              :disabled="disabledObj['feedback_user_isDisabled']"
              v-if="(form['feedback_on_opinions_id'] && $check_field('set', 'feedback_user')) || (!form['feedback_on_opinions_id'] && $check_field('add', 'feedback_user'))"
			   style="width: 100%;"
          ></uni-data-select>
          <uni-data-select
              v-model="form['feedback_user']"
              :localdata="list_user_feedback_user"
              :clear="false"
              :disabled="true"
              v-else-if="$check_field('get', 'feedback_user')"
              id="feedback_user"
			  style="width: 100%;"
          ></uni-data-select>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','refund_type') || ($check_field('add','refund_type') || $check_field('set','refund_type'))" label="退款类型" name="refund_type">
              <uni-data-select
              v-model="form.refund_type"
              :localdata="list_refund_type"
              :clear="!disabledObj['refund_type_isDisabled']"
              :disabled="disabledObj['refund_type_isDisabled']"
              v-if="(form['feedback_on_opinions_id'] && $check_field('set', 'refund_type')) || (!form['feedback_on_opinions_id'] && $check_field('add', 'refund_type'))"
			  style="width: 100%;"
          ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'refund_type')">
            {{ form['refund_type'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','refund_goods') || ($check_field('add','refund_goods') || $check_field('set','refund_goods'))" label="退款商品" name="refund_goods">
              <ld-select :multiple="true" :list="list_refund_goods"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['refund_goods_isDisabled']"
              :disabled="disabledObj['refund_goods_isDisabled']"
              v-model="refund_goods_multiple_value"
              v-if="(form['feedback_on_opinions_id'] && $check_field('set', 'refund_goods')) || (!form['feedback_on_opinions_id'] && $check_field('add', 'refund_goods'))"
              @confirm="select_refund_goods_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'refund_goods')">
            {{ form['refund_goods'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','upload_credential') || ($check_field('add','upload_credential') || $check_field('set','upload_credential'))" label="上传凭证" name="upload_credential">
              <!-- 修改权限 -->
          <view class="from-img" v-if="form['upload_credential'] && $check_field('set', 'upload_credential')">
            <image v-if="disabledObj['upload_credential_isDisabled']" :src="$fullImgUrl(form['upload_credential'])" />
            <image v-if="!disabledObj['upload_credential_isDisabled']" :src="$fullImgUrl(form['upload_credential'])" @click="change_img('upload_credential')" />
          </view>
          <!-- 添加权限 -->
          <view class="from-img" v-else-if="!form['upload_credential'] && ($check_field('add','upload_credential') || $check_field('set','upload_credential'))">
            <view v-if="disabledObj['upload_credential_isDisabled']" class="add-img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['upload_credential_isDisabled']" class="add-img" @click="change_img('upload_credential')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="from-img" v-else-if="$check_field('get', 'upload_credential')">
            <image :src="$fullImgUrl(form['upload_credential'])" />
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','more_vouchers') || ($check_field('add','more_vouchers') || $check_field('set','more_vouchers'))" label="更多凭证" name="more_vouchers">
                      <uni-easyinput type="text" v-model="form['more_vouchers']" v-if="(form['feedback_on_opinions_id'] && $check_field('set','more_vouchers')) || (!form['feedback_on_opinions_id'] && $check_field('add','more_vouchers'))" :disabled="disabledObj['more_vouchers_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','more_vouchers')">
            {{ form['more_vouchers'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','upload_file') || ($check_field('add','upload_file') || $check_field('set','upload_file'))" label="上传文件" name="upload_file">
              <!-- 查询权限 -->
          <view class="diy_file" v-if="$check_field('get', 'upload_file')">
            <button v-if="form['upload_file']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['upload_file']))">下载文件</button>
            <text v-else>无文件</text>
          </view>
          <button v-else-if="$check_field('add', 'upload_file') || $check_field('set', 'upload_file')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('upload_file')">
            上传文件
          </button>
          <view class="file-url" v-if="upload_file || form['upload_file']">
            <view class="close_" @click="close_('upload_file')">x</view>
            {{ upload_file }}
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','upload_audio') || ($check_field('add','upload_audio') || $check_field('set','upload_audio'))" label="上传音频" name="upload_audio">
              <!-- 查询权限 -->
          <view class="field-value">
            <view class="diy_audio" v-if="!upload_audio && $check_field('get', 'upload_audio') && form['upload_audio']">
              <view class="me-btny" @click="close_('upload_audio')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['upload_audio'])" controls></video>
            </view>
            <view v-else-if=" $check_field('add', 'upload_audio') || $check_field('set', 'upload_audio')">
              <view class="me-btn" @click="uploadFile_('upload_audio')"> 上传音频 </view></view>
            <view class="file-url" v-if="upload_audio">{{ upload_audio }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','upload_video') || ($check_field('add','upload_video') || $check_field('set','upload_video'))" label="上传视频" name="upload_video">
              <view class="field-value">
            <!-- 查询权限 -->
            <view class="diy_video" v-if="!upload_video && $check_field('get', 'upload_video') && form['upload_video']">
              <view class="me-btn" style="margin-bottom: 8rpx" @click="close_('upload_video')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['upload_video'])" controls></video>
            </view>
            <view v-else-if="$check_field('add', 'upload_video') || $check_field('set', 'upload_video')">
              <view class="me-btn" @click="uploadFile_('upload_video')"> 上传视频 </view>
            </view>
            <view class="file-url" v-if="upload_video">{{ upload_video }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','feedback_content') || ($check_field('add','feedback_content') || $check_field('set','feedback_content'))" label="反馈内容" name="feedback_content">
              <uni-easyinput type="textarea" v-model="form['feedback_content']" v-if="(form['feedback_on_opinions_id'] && $check_field('set', 'feedback_content')) || (!form['feedback_on_opinions_id'] && $check_field('add', 'feedback_content'))" :disabled="disabledObj['feedback_content_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'feedback_content')">
            {{ form['feedback_content'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','detailed_description') || ($check_field('add','detailed_description') || $check_field('set','detailed_description'))" label="详细描述" name="detailed_description">
              <uni-easyinput type="textarea" v-model="form['detailed_description']" v-if="(form['feedback_on_opinions_id'] && $check_field('set', 'detailed_description')) || (!form['feedback_on_opinions_id'] && $check_field('add', 'detailed_description'))" :disabled="disabledObj['detailed_description_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'detailed_description')">
            {{ form['detailed_description'] }}
          </text>
            </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/feedback_on_opinions/view','set') || ($check_action('/feedback_on_opinions/view','add') || $check_option('/feedback_on_opinions/table','examine'))">
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
      field: "feedback_on_opinions_id",
      url_add: "~/api/feedback_on_opinions/add?",
      url_set: "~/api/feedback_on_opinions/set?",
      url_get_obj: "~/api/feedback_on_opinions/get_obj?",
      url_upload: "~/api/feedback_on_opinions/upload?",
      title_name: null,
	      type_of_feedback_information: null,
	      feedback_user: null,
	      refund_type: null,
	      refund_goods: null,
	      upload_credential: null,
	      more_vouchers: null,
	      upload_file: null,
	      upload_audio: null,
	      upload_video: null,
	      feedback_content: null,
	      detailed_description: null,
													      query: {
        "feedback_on_opinions_id": 0,
      },
      form: {
          "title_name":  '', // 标题名
            "type_of_feedback_information":  '', // 反馈信息类型
            "feedback_user": 0, // 反馈用户
            "refund_type":  '', // 退款类型
            "refund_goods":  '', // 退款商品
            "upload_credential":  '', // 上传凭证
            "more_vouchers":  '', // 更多凭证
            "upload_file":  '', // 上传文件
            "upload_audio":  '', // 上传音频
            "upload_video":  '', // 上传视频
            "feedback_content":  '', // 反馈内容
            "detailed_description":  '', // 详细描述
          "feedback_on_opinions_id": 0, // ID
      },
      disabledObj:{
          "title_name_isDisabled": false,
            "type_of_feedback_information_isDisabled": false,
            "feedback_user_isDisabled": false,
            "refund_type_isDisabled": false,
            "refund_goods_isDisabled": false,
            "upload_credential_isDisabled": false,
            "more_vouchers_isDisabled": false,
            "upload_file_isDisabled": false,
            "upload_audio_isDisabled": false,
            "upload_video_isDisabled": false,
            "feedback_content_isDisabled": false,
            "detailed_description_isDisabled": false,
        },
                          // 反馈信息类型选项列表
      list_type_of_feedback_information: [],
                      // 用户列表
      list_user_feedback_user: [],
                  // 用户组
      group_user_feedback_user: "",
                              // 退款类型选项列表
      list_refund_type: [],
                          refund_goods_multiple_value:[],
              // 退款商品选项列表
      list_refund_goods: [],
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
        url: this.$fullUrl('~/api/feedback_on_opinions/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'title_name') this['title_name'] = this.form['title_name'] = "";
      if (type == 'type_of_feedback_information') this['type_of_feedback_information'] = this.form['type_of_feedback_information'] = "";
      if (type == 'feedback_user') this['feedback_user'] = this.form['feedback_user'] = "";
      if (type == 'refund_type') this['refund_type'] = this.form['refund_type'] = "";
      if (type == 'refund_goods') this['refund_goods'] = this.form['refund_goods'] = "";
      if (type == 'upload_credential') this['upload_credential'] = this.form['upload_credential'] = "";
      if (type == 'more_vouchers') this['more_vouchers'] = this.form['more_vouchers'] = "";
      if (type == 'upload_file') this['upload_file'] = this.form['upload_file'] = "";
      if (type == 'upload_audio') this['upload_audio'] = this.form['upload_audio'] = "";
      if (type == 'upload_video') this['upload_video'] = this.form['upload_video'] = "";
      if (type == 'feedback_content') this['feedback_content'] = this.form['feedback_content'] = "";
      if (type == 'detailed_description') this['detailed_description'] = this.form['detailed_description'] = "";
    },
    submit_() {
      if (this['title_name'] !== null) this.form['title_name'] = this['title_name']
      if (this['type_of_feedback_information'] !== null) this.form['type_of_feedback_information'] = this['type_of_feedback_information']
      if (this['feedback_user'] !== null) this.form['feedback_user'] = this['feedback_user']
      if (this['refund_type'] !== null) this.form['refund_type'] = this['refund_type']
      if (this['refund_goods'] !== null) this.form['refund_goods'] = this['refund_goods']
      if (this['upload_credential'] !== null) this.form['upload_credential'] = this['upload_credential']
      if (this['more_vouchers'] !== null) this.form['more_vouchers'] = this['more_vouchers']
      if (this['upload_file'] !== null) this.form['upload_file'] = this['upload_file']
      if (this['upload_audio'] !== null) this.form['upload_audio'] = this['upload_audio']
      if (this['upload_video'] !== null) this.form['upload_video'] = this['upload_video']
      if (this['feedback_content'] !== null) this.form['feedback_content'] = this['feedback_content']
      if (this['detailed_description'] !== null) this.form['detailed_description'] = this['detailed_description']
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
            '/feedback_on_opinions/upload',
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
          uploadFilePathApi('/feedback_on_opinions/upload',filePath,undefined,undefined,
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
     * 获取反馈信息类型列表
     */
    async get_list_type_of_feedback_information() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_type_of_feedback_information.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["feedback_on_opinions_id"]) {
                      this.form["type_of_feedback_information"] = this.list_type_of_feedback_information[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
              
          /**
     * 获取注册用户用户列表
     */
    async get_list_user_feedback_user() {
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_feedback_user.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
        /**
     * 获取注册用户用户组
     */
    async get_group_user_feedback_user() {
      this.form["feedback_user"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_feedback_user = json.result.obj;
        this.get_user_session_feedback_user(this.form['feedback_user'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_feedback_user(id){
      var _this = this;
      var user_id = {"user_id":_this.user.user_id}
      var url = "~/api/"+_this.group_user_feedback_user.source_table+"/get_obj"
      this.$get(url, user_id, function(res) {
        if (res.result && res.result.obj) {
          var arr = []
          for (let key in res.result.obj) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in _this.form) {
            arrForm.push(key)
          }
          _this.form["feedback_user"] = _this.user.user_id
          _this.disabledObj['feedback_user' + '_isDisabled'] = true
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "feedback_user") {
                    _this.form[arrForm[j]] = res.result.obj[arr[i]]
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                    break;
                  } else {
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  }
                }
              }
            }
          }
        }
      });
    },
        
        /**
     * 获取退款类型列表
     */
    async get_list_refund_type() {
          ['其他','退款退货','仅退款','部分退款'].map((o) => this.list_refund_type.push({value:o,text:o}));
      if(!this.form["feedback_on_opinions_id"]) {
                  this.form["refund_type"] = this.list_refund_type[0].value;
              }
            },
              
        /**
     * 获取退款商品列表
     */
    async get_list_refund_goods() {
              var json = await this.$get("~/api/customized_products/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_refund_goods.push({value:o.name_of_commodity,text:o.name_of_commodity}));
        if(!this.form["feedback_on_opinions_id"]) {
                      this.form["refund_goods"] = this.list_refund_goods[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
            select_refund_goods_multiple(v){
      this.form.refund_goods = "";
      if (v && v.length > 0) {
        this.form.refund_goods = v.toString();
      }
    },
          
        
        
        
        
        
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	            	            	                  if (this.form.refund_goods){
        this.refund_goods_multiple_value = this.form.refund_goods.split(",")
      }
    	            	            	            	            	            	            	            	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/feedback_on_opinions/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/feedback_on_opinions/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/feedback_on_opinions/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/feedback_on_opinions/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/feedback_on_opinions/view', 'get');
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
          this.get_list_type_of_feedback_information();
            this.get_list_user_feedback_user();
          this.get_group_user_feedback_user();
              this.get_list_refund_type();
          this.get_list_refund_goods();
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
