<template>
  <view class="page_diy_edit page_feedback_on_opinions_edit" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>意见反馈</tn-nav-bar>
    <view class="page-custom " id="page_diy_edit" ref="scroll">
      <view class="custom-from">
          <view v-if="$check_field('set', 'title_name') || $check_field('add', 'title_name') ||  $check_field('get', 'title_name')" class="custom-from-item">
          <view class="label">
            <text>
              标题名
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['title_name'] && $check_field('set','title_name')) || (!form['title_name'] && $check_field('add','title_name'))">
				<input type="text" id="form_title_name" v-model="form['title_name']" placeholder="请输入标题名" :disabled="disabledObj['title_name_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','title_name')">{{ form['title_name'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'type_of_feedback_information') || $check_field('add', 'type_of_feedback_information') ||  $check_field('get', 'type_of_feedback_information')" class="custom-from-item">
          <view class="label">
            <text>
              反馈信息类型
            </text>
          </view>
              <!-- 选项 -->
          <view class="content">
            <uni-data-select
                    id="form_type_of_feedback_information"
                    v-model="form['type_of_feedback_information']"
                    :localdata="list_type_of_feedback_information"
                    v-if="(form['type_of_feedback_information'] && $check_field('set','type_of_feedback_information')) || (!form['type_of_feedback_information'] && $check_field('add','type_of_feedback_information'))"
				    style="width: 100%;"
                                ></uni-data-select>
            <text v-else-if="$check_field('get','type_of_feedback_information')">{{ form['type_of_feedback_information'] }}</text>
          </view>
            </view>
            <view v-if="$check_field('set', 'feedback_user') || $check_field('add', 'feedback_user') ||  $check_field('get', 'feedback_user')" class="custom-from-item">
          <view class="label">
            <text>反馈用户</text>
          </view>
          <view class="content">
            <uni-data-select
                    id="form_feedback_user" v-model="form['feedback_user']"
                    :localdata="list_user_feedback_user"
                    :clear="!disabledObj['feedback_user_isDisabled']"
                    :disabled="disabledObj['feedback_user_isDisabled']"
                    v-if="(form['feedback_user'] && $check_field('set', 'feedback_user')) || (!form['feedback_user'] && $check_field('add', 'feedback_user'))" style="width: 100%;">
            </uni-data-select>
            <text v-else-if="$check_field('get', 'feedback_user')">
              {{form['feedback_user']}}
            </text>
          </view>
        </view>
            <view v-if="$check_field('set', 'refund_type') || $check_field('add', 'refund_type') ||  $check_field('get', 'refund_type')" class="custom-from-item">
          <view class="label">
            <text>
              退款类型
            </text>
          </view>
              <!-- 选项 -->
          <view class="content">
            <uni-data-select
                    id="form_refund_type"
                    v-model="form['refund_type']"
                    :localdata="list_refund_type"
                    v-if="(form['refund_type'] && $check_field('set','refund_type')) || (!form['refund_type'] && $check_field('add','refund_type'))"
				    style="width: 100%;"
            ></uni-data-select>
            <text v-else-if="$check_field('get','refund_type')">{{ form['refund_type'] }}</text>
          </view>

            </view>
            <view v-if="$check_field('set', 'refund_goods') || $check_field('add', 'refund_goods') ||  $check_field('get', 'refund_goods')" class="custom-from-item">
          <view class="label">
            <text>
              退款商品
            </text>
          </view>
              <!-- 选项 -->
          <view class="content">
            <ld-select :multiple="true" :list="list_refund_goods"
                       label-key="text" value-key="value"
                       placeholder="请选择"
                       :clearable="!disabledObj['refund_goods_isDisabled']"
                       :disabled="disabledObj['refund_goods_isDisabled']"
                       v-model="refund_goods_multiple_value"
                       v-if="(form['refund_goods'] && $check_field('set','refund_goods')) || (!form['refund_goods'] && $check_field('add','refund_goods'))"
                       @confirm="select_refund_goods_multiple"></ld-select>
            <text v-else-if="$check_field('get','refund_goods')">{{ form['refund_goods'] }}</text>
          </view>
            </view>
            <view v-if="$check_field('set', 'upload_credential') || $check_field('add', 'upload_credential') ||  $check_field('get', 'upload_credential')" class="custom-from-item">
          <view class="label">
            <text>
              上传凭证
            </text>
          </view>
              <!-- 图片 -->
          <!-- 修改权限 -->
          <view class="content" v-if="form['upload_credential'] && $check_field('set', 'upload_credential')">
            <image v-if="disabledObj['upload_credential_isDisabled']" :src="$fullImgUrl(form['upload_credential'])" />
            <image v-if="!disabledObj['upload_credential_isDisabled']" :src="$fullImgUrl(form['upload_credential'])" @click="change_img('upload_credential')" />
          </view>
          <!-- 添加权限 -->
          <view class="content" v-else-if="!form['upload_credential'] && $check_field('add', 'upload_credential')">
            <view v-if="disabledObj['upload_credential_isDisabled']" class="btn_add_img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['upload_credential_isDisabled']" class="btn_add_img diy_text_row" @click="change_img('upload_credential')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="content" v-else-if="$check_field('get', 'upload_credential')">
            <image :src="$fullImgUrl(form['upload_credential'])" />
          </view>
          <uni-icons style="display: none" class="forward" type="forward" id="form_img_upload_credential"></uni-icons>
            </view>
            <view v-if="$check_field('set', 'more_vouchers') || $check_field('add', 'more_vouchers') ||  $check_field('get', 'more_vouchers')" class="custom-from-item">
          <view class="label">
            <text>
              更多凭证
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['more_vouchers'] && $check_field('set','more_vouchers')) || (!form['more_vouchers'] && $check_field('add','more_vouchers'))">
				<input type="text" id="form_more_vouchers" v-model="form['more_vouchers']" placeholder="请输入更多凭证" :disabled="disabledObj['more_vouchers_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','more_vouchers')">{{ form['more_vouchers'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'upload_file') || $check_field('add', 'upload_file') ||  $check_field('get', 'upload_file')" class="custom-from-item">
          <view class="label">
            <text>
              上传文件
            </text>
          </view>
              <!-- 文件 -->
          <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'upload_file')">
            <button @click="download_file($fullUrl(form['upload_file']))" class="btn" v-if="form['upload_file']">下载文件</button>
          </view>
            </view>
            <view v-if="$check_field('set', 'upload_audio') || $check_field('add', 'upload_audio') ||  $check_field('get', 'upload_audio')" class="custom-from-item">
          <view class="label">
            <text>
              上传音频
            </text>
          </view>
              <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'upload_audio')">
            <audio style="text-align: left" :src="$fullImgUrl(form['upload_audio'])"
                   :poster="$fullImgUrl(form['upload_audio'])" name="暂无" author="暂无" :action="{ method: 'pause' }" controls
                   v-if="form['upload_audio']"></audio>
          </view>
            </view>
            <view v-if="$check_field('set', 'upload_video') || $check_field('add', 'upload_video') ||  $check_field('get', 'upload_video')" class="custom-from-item">
          <view class="label">
            <text>
              上传视频
            </text>
          </view>
              <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'upload_video')">
            <video :src="$fullImgUrl(form['upload_video'])" controls v-if="form['upload_video']"></video>
          </view>
            </view>
            <view v-if="$check_field('set', 'feedback_content') || $check_field('add', 'feedback_content') ||  $check_field('get', 'feedback_content')" class="custom-from-item">
          <view class="label">
            <text>
              反馈内容
            </text>
          </view>
              <!-- 多文本 -->
          <view class="content">
            <textarea id="form_feedback_content" v-model="form['feedback_content']" v-if="(form['feedback_content'] && $check_field('set','feedback_content')) || (!form['feedback_content'] && $check_field('add','feedback_content'))" :disabled="disabledObj['feedback_content_isDisabled']"/>
            <text v-else-if="$check_field('get','feedback_content')">{{ form['feedback_content'] }}</text>
          </view>
            </view>
            <view v-if="$check_field('set', 'detailed_description') || $check_field('add', 'detailed_description') ||  $check_field('get', 'detailed_description')" class="custom-from-item">
          <view class="label">
            <text>
              详细描述
            </text>
          </view>
              <!-- 多文本 -->
          <view class="content">
            <textarea id="form_detailed_description" v-model="form['detailed_description']" v-if="(form['detailed_description'] && $check_field('set','detailed_description')) || (!form['detailed_description'] && $check_field('add','detailed_description'))" :disabled="disabledObj['detailed_description_isDisabled']"/>
            <text v-else-if="$check_field('get','detailed_description')">{{ form['detailed_description'] }}</text>
          </view>
            </view>
          <view class="form-footer">
                  <view class="me-btn" @click="submit()">提交</view>
                </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
export default {
  mixins: [mixin],
  data() {
    return {
      url_get_obj: '~/api/feedback_on_opinions/get_obj?',
      url_add: '~/api/feedback_on_opinions/add?',
      url_set: '~/api/feedback_on_opinions/set?',
	  today: new Date().toISOString().split('T')[0],
      // 查询条件
      query: {
        feedback_on_opinions_id: 0,
          title_name: "",
            type_of_feedback_information: "",
            feedback_user: 0,
            refund_type: "",
            refund_goods: "",
            upload_credential: "",
            more_vouchers: "",
            upload_file: "",
            upload_audio: "",
            upload_video: "",
            feedback_content: "",
            detailed_description: "",
        },
      obj: {
        feedback_on_opinions_id: 0,
          title_name:  '', // 标题名
            type_of_feedback_information:  '', // 反馈信息类型
            feedback_user: 0, // 反馈用户
            refund_type:  '', // 退款类型
            refund_goods:  '', // 退款商品
            upload_credential:  '', // 上传凭证
            more_vouchers:  '', // 更多凭证
            upload_file:  '', // 上传文件
            upload_audio:  '', // 上传音频
            upload_video:  '', // 上传视频
            feedback_content:  '', // 反馈内容
            detailed_description:  '', // 详细描述
        },

      // 表单字段
      form: {
        feedback_on_opinions_id: 0,
          title_name:  '', // 标题名
            type_of_feedback_information:  '', // 反馈信息类型
            feedback_user: 0, // 反馈用户
            refund_type:  '', // 退款类型
            refund_goods:  '', // 退款商品
            upload_credential:  '', // 上传凭证
            more_vouchers:  '', // 更多凭证
            upload_file:  '', // 上传文件
            upload_audio:  '', // 上传音频
            upload_video:  '', // 上传视频
            feedback_content:  '', // 反馈内容
            detailed_description:  '', // 详细描述
        },
      disabledObj: {
          title_name_isDisabled: false,
            type_of_feedback_information_isDisabled: false,
            feedback_user_isDisabled: false,
            refund_type_isDisabled: false,
            refund_goods_isDisabled: false,
            upload_credential_isDisabled: false,
            more_vouchers_isDisabled: false,
            upload_file_isDisabled: false,
            upload_audio_isDisabled: false,
            upload_video_isDisabled: false,
            feedback_content_isDisabled: false,
            detailed_description_isDisabled: false,
        },
												    	                      list_type_of_feedback_information: [],
    	        	          // 用户列表
      list_user_feedback_user: [],
                      list_refund_type: [],
    	                      refund_goods_multiple_value:[],
              list_refund_goods: [],
    	        	        	        	        	        	        	        	          field: 'feedback_on_opinions_id',
      table_key: 'feedback_on_opinions',

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

    	                    /**
    * 获取反馈信息类型列表
    */
    async get_list_type_of_feedback_information() {
                    var json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
          json.result.list.map((o) => this.list_type_of_feedback_information.push({value:o.classification_name,text:o.classification_name}));
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
            async get_user_session_feedback_user(){
        var _this = this;
        var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
        if(json.result && json.result.obj){
          var source_table = json.result.obj.source_table;
          var user_id = _this.userInfo.user_id;
          if (user_id){
            var url = "~/api/"+source_table+"/get_obj"
            this.$get(url, { user_id: _this.userInfo.user_id }, function (res) {
              if (res.result && res.result.obj) {
                var arr = []
                for (let key in res.result.obj) {
                  arr.push(key)
                }
                var arrForm = []
                for (let key in _this.form) {
                  arrForm.push(key)
                }
                _this.form["feedback_user"] = user_id
                _this.disabledObj['feedback_user' + '_isDisabled'] = true
                for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "feedback_user") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
                }
              }
            });
          }
        }
        else if(json.error){
          console.error(json.error);
        }
    },
                /**
    * 获取退款类型列表
    */
    async get_list_refund_type() {
              ['其他','退款退货','仅退款','部分退款'].map((o) => this.list_refund_type.push({value:o,text:o}));
                },
                    	                    /**
    * 获取退款商品列表
    */
    async get_list_refund_goods() {
                    var json = await this.$get("~/api/customized_products/get_list?");
        if(json.result && json.result.list){
          json.result.list.map((o) => this.list_refund_goods.push({value:o.name_of_commodity,text:o.name_of_commodity}));
        }
        else if(json.error){
          console.error(json.error);
        }
          },
                    select_refund_goods_multiple(v){
        this.form.refund_goods = "";
        if (v && v.length>0){
          this.form.refund_goods = v.toString();
        }
    },
            	                	                	                	                	                	                	                	                change_img(key_name) {
      var _self = this;
      _self.upload_img_flag = false;
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['album'], //从相册选择
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: _self.$fullUrl('~/api/feedback_on_opinions/upload?'),
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              feedback_on_opinions: 'test',
            },
            header: {
              'x-auth-token': _self.$store.state.app.userInfo.token,
            },
            success: function (uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url;
              var img_url = filename;
              _self.form[key_name] = img_url;
            },
          });

          uploadTask.onProgressUpdate(function (res) {
            _self.percent = res.progress;
            console.log('上传进度' + res.progress);
            console.log('已经上传的数据长度' + res.totalBytesSent);
            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
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
     * 获取对象后获取缓存表单
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
      var form = uni.db.get('form');
      var obj = Object.assign({}, form, this.obj);
      if (form) {
        this.obj = uni.push(this.obj, obj);
      }
      if (form) {
        this.form = uni.push(this.form, form);
      }
      if (func) {
        func(json);
      }
    },

  },
  onLoad() {
            this.get_list_type_of_feedback_information();
              this.get_user_session_feedback_user();
        this.get_list_user_feedback_user();
        this.get_list_refund_type();
            this.get_list_refund_goods();
                                                  },
};
</script>

