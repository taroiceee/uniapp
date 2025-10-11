<template>
  <view class="page_diy_view page_registered_user_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>注册用户详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">
        <uni-forms-item label="头像" name="avatar">
          <view class="from-img" v-if="form_user['avatar']">
            <image :src="$fullImgUrl(form_user['avatar'])" @click="change_avatar()" />
          </view>
          <view class="from-img" v-else-if="!form_user['avatar']">
            <view class="add-img" @click="change_avatar()">
              <text>+</text>
            </view>
          </view>
          <uni-icons style="display: none" class="forward" type="forward" id="form_user_img_avatar"></uni-icons>
        </uni-forms-item>

        <uni-forms-item label="账号" name="username">
          <span v-if="obj_user.username">{{ obj_user.username }}</span>
          <uni-easyinput v-else type="text" v-model="form_user.username" placeholder="请输入账号" />
        </uni-forms-item>

        <uni-forms-item v-if="!obj_user.password" label="密码" name="password">
          <uni-easyinput type="password" v-model="form_user.password" placeholder="请输入密码" />
        </uni-forms-item>

        <uni-forms-item label="昵称" name="nickname">
          <uni-easyinput type="text" v-model="form_user.nickname" placeholder="请输入昵称" />
        </uni-forms-item>

        <uni-forms-item label="邮箱" name="email">
          <uni-easyinput type="text" v-model="form_user.email" placeholder="请输入邮箱" />
        </uni-forms-item>

        <uni-forms-item label="状态" name="state">
          <uni-data-select
            v-model="form_user.state"
            :localdata="list_user_state"
            :disabled="user_group !== '管理员'"
			:clear="user_group=='管理员'"
			 style="width: 100%;"
          ></uni-data-select>
        </uni-forms-item>

          <uni-forms-item label="会员等级" name="vip_level">
          <uni-data-select
            v-model="form_user.vip_level"
            :localdata="list_user_vip_level"
            :disabled="user_group !== '管理员'"
			:clear="user_group=='管理员'"
            @change="vip_level_change"
			 style="width: 100%;"
          ></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="会员折扣" name="vip_discount">
          <uni-easyinput
            :disabled="true"
            type="text"
            v-model="form_user.vip_discount"
            placeholder="请输入会员折扣"
          />
        </uni-forms-item>
    
        <uni-forms-item v-if="$check_field('get','user_membership_card_number') || ($check_field('add','user_membership_card_number') || $check_field('set','user_membership_card_number'))" label="用户会员卡号" name="user_membership_card_number">
                      <uni-easyinput type="text" v-model="form['user_membership_card_number']" v-if="(form['registered_user_id'] && $check_field('set','user_membership_card_number')) || (!form['registered_user_id'] && $check_field('add','user_membership_card_number'))" :disabled="disabledObj['user_membership_card_number_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','user_membership_card_number')">
            {{ form['user_membership_card_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','real_name') || ($check_field('add','real_name') || $check_field('set','real_name'))" label="真实姓名" name="real_name">
                      <uni-easyinput type="text" v-model="form['real_name']" v-if="(form['registered_user_id'] && $check_field('set','real_name')) || (!form['registered_user_id'] && $check_field('add','real_name'))" :disabled="disabledObj['real_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','real_name')">
            {{ form['real_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_gender') || ($check_field('add','user_gender') || $check_field('set','user_gender'))" label="用户性别" name="user_gender">
              <uni-data-select
              v-model="form.user_gender"
              :localdata="list_user_gender"
              :clear="!disabledObj['user_gender_isDisabled']"
              :disabled="disabledObj['user_gender_isDisabled']"
              v-if="(form['registered_user_id'] && $check_field('set', 'user_gender')) || (!form['registered_user_id'] && $check_field('add', 'user_gender'))"
			  style="width: 100%;"
          ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'user_gender')">
            {{ form['user_gender'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_age') || ($check_field('add','user_age') || $check_field('set','user_age'))" label="用户年龄" name="user_age">
                      <uni-easyinput type="text" v-model="form['user_age']" v-if="(form['registered_user_id'] && $check_field('set','user_age')) || (!form['registered_user_id'] && $check_field('add','user_age'))" :disabled="disabledObj['user_age_isDisabled']">
                    	<template #right><text style="margin-right: 24rpx;">岁</text></template>
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','user_age')">
            {{ form['user_age'] }}岁          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','height') || ($check_field('add','height') || $check_field('set','height'))" label="身高" name="height">
                      <uni-easyinput type="text" v-model="form['height']" v-if="(form['registered_user_id'] && $check_field('set','height')) || (!form['registered_user_id'] && $check_field('add','height'))" :disabled="disabledObj['height_isDisabled']">
                    	<template #right><text style="margin-right: 24rpx;">CM</text></template>
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','height')">
            {{ form['height'] }}CM          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_weight') || ($check_field('add','user_weight') || $check_field('set','user_weight'))" label="用户体重" name="user_weight">
                      <uni-easyinput type="text" v-model="form['user_weight']" v-if="(form['registered_user_id'] && $check_field('set','user_weight')) || (!form['registered_user_id'] && $check_field('add','user_weight'))" :disabled="disabledObj['user_weight_isDisabled']">
                    	<template #right><text style="margin-right: 24rpx;">KG</text></template>
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','user_weight')">
            {{ form['user_weight'] }}KG          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','region') || ($check_field('add','region') || $check_field('set','region'))" label="所属地区" name="region">
    		  <uni-data-picker v-model="region_pcaCodeRegion" v-if="(form['registered_user_id'] && $check_field('set', 'region')) || (!form['registered_user_id'] && $check_field('add', 'region'))" :disabled="disabledObj['region_isDisabled']" :localdata="pcaCodeData" :map="pcaCodeMap" popup-title="请选择所属地区" @change="region_pcaCodeChange"></uni-data-picker>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'region')">
            {{ form['region'] }}
          </text>
	        </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_label') || ($check_field('add','user_label') || $check_field('set','user_label'))" label="用户标签" name="user_label">
              <ld-select :multiple="true" :list="list_user_label"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['user_label_isDisabled']"
              :disabled="disabledObj['user_label_isDisabled']"
              v-model="user_label_multiple_value"
              v-if="(form['registered_user_id'] && $check_field('set', 'user_label')) || (!form['registered_user_id'] && $check_field('add', 'user_label'))"
              @confirm="select_user_label_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'user_label')">
            {{ form['user_label'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_preferences') || ($check_field('add','user_preferences') || $check_field('set','user_preferences'))" label="用户喜好" name="user_preferences">
              <uni-data-select class="yonghuxihao uni-data-select"
              v-model="form.user_preferences"
              :localdata="list_user_preferences"
              :clear="!disabledObj['user_preferences_isDisabled']"
              :disabled="disabledObj['user_preferences_isDisabled']"
              v-if="(form['registered_user_id'] && $check_field('set','user_preferences')) || (!form['registered_user_id'] && $check_field('add','user_preferences'))"
			  style="width: 100%;"
              @change="select_user_preferences_field"          ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get','user_preferences')">
            {{ form['user_preferences'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','description_description') || ($check_field('add','description_description') || $check_field('set','description_description'))" label="描述说明" name="description_description">
              <uni-easyinput type="text" v-model="form['description_description']" v-if="(form['registered_user_id'] && $check_field('set', 'description_description')) || (!form['registered_user_id'] && $check_field('add', 'description_description'))" :disabled="true">
				  </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'description_description')">
            {{ form['description_description'] }}          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','certificate_number') || ($check_field('add','certificate_number') || $check_field('set','certificate_number'))" label="证件号" name="certificate_number">
                      <uni-easyinput type="text" v-model="form['certificate_number']" v-if="(form['registered_user_id'] && $check_field('set','certificate_number')) || (!form['registered_user_id'] && $check_field('add','certificate_number'))" :disabled="disabledObj['certificate_number_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','certificate_number')">
            {{ form['certificate_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','portfolio') || ($check_field('add','portfolio') || $check_field('set','portfolio'))" label="作品集" name="portfolio">
                      <uni-easyinput type="text" v-model="form['portfolio']" v-if="(form['registered_user_id'] && $check_field('set','portfolio')) || (!form['registered_user_id'] && $check_field('add','portfolio'))" :disabled="disabledObj['portfolio_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','portfolio')">
            {{ form['portfolio'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_photos') || ($check_field('add','user_photos') || $check_field('set','user_photos'))" label="用户照片" name="user_photos">
              <!-- 修改权限 -->
          <view class="from-img" v-if="form['user_photos'] && $check_field('set', 'user_photos')">
            <image v-if="disabledObj['user_photos_isDisabled']" :src="$fullImgUrl(form['user_photos'])" />
            <image v-if="!disabledObj['user_photos_isDisabled']" :src="$fullImgUrl(form['user_photos'])" @click="change_img('user_photos')" />
          </view>
          <!-- 添加权限 -->
          <view class="from-img" v-else-if="!form['user_photos'] && ($check_field('add','user_photos') || $check_field('set','user_photos'))">
            <view v-if="disabledObj['user_photos_isDisabled']" class="add-img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['user_photos_isDisabled']" class="add-img" @click="change_img('user_photos')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="from-img" v-else-if="$check_field('get', 'user_photos')">
            <image :src="$fullImgUrl(form['user_photos'])" />
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','user_notes') || ($check_field('add','user_notes') || $check_field('set','user_notes'))" label="用户备注" name="user_notes">
              <uni-easyinput type="textarea" v-model="form['user_notes']" v-if="(form['registered_user_id'] && $check_field('set', 'user_notes')) || (!form['registered_user_id'] && $check_field('add', 'user_notes'))" :disabled="disabledObj['user_notes_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'user_notes')">
            {{ form['user_notes'] }}
          </text>
            </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/registered_user/view','set') || ($check_action('/registered_user/view','add') || $check_option('/registered_user/table','examine'))">
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
import pcaCodeData from '@/json/pca-code.json';
import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  mixins: [mixin],
  components: {ldSelect},
  data() {
    return {
	  today: new Date().toISOString().split('T')[0],
      field_user: "user_id",
      url_add_user: "~/api/user/register?",
      url_set_user: "~/api/user/set?",
      url_get_obj_user: "~/api/user/get_obj?",
      url_upload_user: "~/api/user/upload?",
      form_user:{
        user_id: 0,
        username: '',
        nickname: '',
        password: '',
        avatar: '',
        // phone: '',
        email: '',
        user_group: "注册用户",
        // phone_state: 0,
        // email_state: 0,
        state: 1,
          vip_level: '',
        vip_discount: 0
        },
      obj_user: {
        user_id: 0,
        username: '',
        nickname: '',
        password: '',
        avatar: '',
        // phone: '',
        email: '',
        user_group: "注册用户",
        // phone_state: 0,
        // email_state: 0,
        state: 1,
          vip_level: '',
        vip_discount: 0
        },
      query_user: {
        "user_id": 0,
      },
      list_state: [{value:0,text:"未认证"},{value:1,text:"审核中"},{value:2,text:"已认证"}],
      list_user_state: [{value: 1,text: "可用"},{value: 2,text: "禁用"}],
      group_table: "registered_user",
      is_password: true,
        list_user_vip_level:[{value:"",text:""}],
      list_user_vip_level_data:[],
        field: "registered_user_id",
      url_add: "~/api/registered_user/add?",
      url_set: "~/api/registered_user/set?",
      url_get_obj: "~/api/registered_user/get_obj?",
      url_upload: "~/api/registered_user/upload?",
      user_membership_card_number: null,
	      real_name: null,
	      user_gender: null,
	      user_age: null,
	      height: null,
	      user_weight: null,
	      region: null,
		  region_pcaCodeRegion: '',
	      user_label: null,
	      user_preferences: null,
	      description_description: null,
	      certificate_number: null,
	      portfolio: null,
	      user_photos: null,
	      user_notes: null,
									  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	      query: {
        "registered_user_id": 0,
      },
      form: {
          "user_membership_card_number":  '', // 用户会员卡号
            "real_name":  '', // 真实姓名
            "user_gender":  '', // 用户性别
            "user_age":  0 , // 用户年龄
            "height":  0 , // 身高
            "user_weight":  0 , // 用户体重
            "region":  '', // 所属地区
            "user_label":  '', // 用户标签
            "user_preferences":  '', // 用户喜好
            "description_description":  '', // 描述说明
            "certificate_number":  '', // 证件号
            "portfolio":  '', // 作品集
            "user_photos":  '', // 用户照片
            "user_notes":  '', // 用户备注
          "user_id": 0,
        "registered_user_id": 0, // ID
      },
      disabledObj:{
          "user_membership_card_number_isDisabled": false,
            "real_name_isDisabled": false,
            "user_gender_isDisabled": false,
                        "region_isDisabled": false,
            "user_label_isDisabled": false,
            "user_preferences_isDisabled": false,
            "description_description_isDisabled": false,
            "certificate_number_isDisabled": false,
            "portfolio_isDisabled": false,
            "user_photos_isDisabled": false,
            "user_notes_isDisabled": false,
        },
                                  // 用户性别选项列表
      list_user_gender: [],
                                                          user_label_multiple_value:[],
              // 用户标签选项列表
      list_user_label: [],
                          // 用户喜好选项列表
      list_user_preferences: [],
                                                    };
  },
  methods: {
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                                                                                                                                                                                      let certificate_number_id_regular = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(param.certificate_number && !certificate_number_id_regular.test(param.certificate_number)){
        return "身份证号格式错误"
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
        url: this.$fullUrl('~/api/registered_user/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'user_membership_card_number') this['user_membership_card_number'] = this.form['user_membership_card_number'] = "";
      if (type == 'real_name') this['real_name'] = this.form['real_name'] = "";
      if (type == 'user_gender') this['user_gender'] = this.form['user_gender'] = "";
      if (type == 'user_age') this['user_age'] = this.form['user_age'] = "";
      if (type == 'height') this['height'] = this.form['height'] = "";
      if (type == 'user_weight') this['user_weight'] = this.form['user_weight'] = "";
      if (type == 'region') this['region'] = this.form['region'] = "";
      if (type == 'user_label') this['user_label'] = this.form['user_label'] = "";
      if (type == 'user_preferences') this['user_preferences'] = this.form['user_preferences'] = "";
      if (type == 'description_description') this['description_description'] = this.form['description_description'] = "";
      if (type == 'certificate_number') this['certificate_number'] = this.form['certificate_number'] = "";
      if (type == 'portfolio') this['portfolio'] = this.form['portfolio'] = "";
      if (type == 'user_photos') this['user_photos'] = this.form['user_photos'] = "";
      if (type == 'user_notes') this['user_notes'] = this.form['user_notes'] = "";
    },
    submit_() {
      if (this['user_membership_card_number'] !== null) this.form['user_membership_card_number'] = this['user_membership_card_number']
      if (this['real_name'] !== null) this.form['real_name'] = this['real_name']
      if (this['user_gender'] !== null) this.form['user_gender'] = this['user_gender']
      if (this['user_age'] !== null) this.form['user_age'] = this['user_age']
      if (this['height'] !== null) this.form['height'] = this['height']
      if (this['user_weight'] !== null) this.form['user_weight'] = this['user_weight']
      if (this['region'] !== null) this.form['region'] = this['region']
      if (this['user_label'] !== null) this.form['user_label'] = this['user_label']
      if (this['user_preferences'] !== null) this.form['user_preferences'] = this['user_preferences']
      if (this['description_description'] !== null) this.form['description_description'] = this['description_description']
      if (this['certificate_number'] !== null) this.form['certificate_number'] = this['certificate_number']
      if (this['portfolio'] !== null) this.form['portfolio'] = this['portfolio']
      if (this['user_photos'] !== null) this.form['user_photos'] = this['user_photos']
      if (this['user_notes'] !== null) this.form['user_notes'] = this['user_notes']
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
            '/registered_user/upload',
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
          uploadFilePathApi('/registered_user/upload',filePath,undefined,undefined,
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
     * 获取用户性别列表
     */
    async get_list_user_gender() {
          ['男','女'].map((o) => this.list_user_gender.push({value:o,text:o}));
      if(!this.form["registered_user_id"]) {
                  this.form_sub["user_gender"] = this.list_user_gender[0].value;
              }
            },
              
        
        
        
        	region_pcaCodeChange(val) {
		this.form.region = val.detail.value.map(item => item.value).join('/');
	},
  
        /**
     * 获取用户标签列表
     */
    async get_list_user_label() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_label.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["registered_user_id"]) {
                      this.form_sub["user_label"] = this.list_user_label[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
            select_user_label_multiple(v){
      this.form.user_label = "";
      if (v && v.length > 0) {
        this.form.user_label = v.toString();
      }
    },
          
        /**
     * 获取用户喜好列表
     */
    async get_list_user_preferences() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_preferences.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["registered_user_id"]) {
                      this.form_sub["user_preferences"] = this.list_user_preferences[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
        select_user_preferences_field(v){
      if (v) {
        this.$get('~/api/classification_information/get_obj?classification_name=' + v, {}, (res) => {
          if (res.result && res.result.obj) {
                                                                                                                                                                                                                                                                                                                                                    this.form.description_description = res.result.obj.description_description;
                                                                                                                                                                          } else {
            console.error(res.error);
          }
        })
      }
    },
              
        
        
        
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
      let user_id = this.form.user_id;
      this.$get('~/api/user/get_obj', { user_id }, (res) => {
        if (res.result && res.result.obj) {
          let o = res.result.obj;
          delete o['create_time'];
          delete o['login_time'];
          this.form_user = o;
          this.obj_user = o;
          this.is_password = this.obj_user.password ? false : true;
          this.query_user.user_id = user_id;
        } else if (res.error) {
          console.log(res.error);
          console.log('获取不到相关信息');
        }
      });
            	            	            	            	            	            	            		  if (this.form.region) {
        const region = this.form['region'].split("/");
        this.region_pcaCodeRegion = region[region.length - 1];
      }
	                  if (this.form.user_label){
        this.user_label_multiple_value = this.form.user_label.split(",")
      }
    	            	            	            	            	            	            	    },
    /**
     * 修改头像
     * @param {Object} param文件参数
     */
    change_avatar() {
      var _self = this;
      _self.upload_img_flag = false;
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择

        success: (file) => {
          const tempFilePaths = file.tempFilePaths;
          const filePath = tempFilePaths[0];
          uploadFilePathApi(
            undefined,
            filePath,
            undefined,
            undefined,
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
            this.form_user.avatar = filename;
          });
        },
        error: function (e) {
          console.log(e);
        },
      });
    },
    async submit(param, func) {
      if (!param) {
        param = this.form_user;
      }
      var pm = this.events('submit_before', Object.assign({}, param)) || param;
      var msg = await this.events('submit_check', pm);
      var ret;
      if (msg) {
        this.$toast(msg, 'danger');
      } else {
        ret = this.events('submit_main', pm, func);
      }
      return ret;
    },

    // 提交前校验
    async submit_check(param) {
      var ret = null;

      var email_regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var { username, password, nickname, user_group, email } = param;

      var confirm_password = this.confirm_password;

      console.log(
        '表单校验username ,password ,email ,nickname ,user_group',
        username,
        password,
        email,
        nickname,
        user_group
      );

      if (!username) {
        ret = '账号不能为空';
      } else if (username.length > 16 || username.length < 5) {
        ret = '账号长度应为5到16个字符之间！';
      } else if (!password) {
        ret = '密码不能为空!';
      } else if (this.is_password && (password.length > 16 || password.length < 5)) {
        ret = '密码长度应为5到16个字符之间！';
      } else if ((nickname && nickname.length > 12) || nickname.length < 2) {
        ret = '昵称长度应为2个字符到12个字符之间';
      } else if (email && !email_regular.test(email)) {
        ret = '请输入正确的邮箱地址 例：test@test.com!';
      }
      else if (!user_group) {
        ret = '请选择用户组!';
      }

      var p = { username: param.username };

      let form_sub = Object.assign({}, this.form);
          if(!ret && !form_sub["user_membership_card_number"]){
        ret = "用户会员卡号不能为空!";
      } else if (!ret && !form_sub["registered_user_id"]) {
        let res = await this.$get("~/api/registered_user/count", {"user_membership_card_number": form_sub["user_membership_card_number"]});
        if(res.result){
          ret = "用户会员卡号已存在!";
        }
      }
                                                                                                                                                                                      let certificate_number_id_regular = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(form_sub.certificate_number && !certificate_number_id_regular.test(form_sub.certificate_number)){
        return "身份证号格式错误"
      }
                                                          return ret;
    },

    submit_main(param, func) {
      var url = this.url;
      if (url) {
        if (this.field_user) {
          var id = param[this.field_user];
          if (id) {
            var q = {
              method: 'set',
            };
            q[this.field_user] = id;
            url = this.toUrl(q, url);
          } else {
            url += 'method=add';
          }
        } else {
          url += 'method=submit';
        }
      } else if (this.url_submit) {
        url = this.url_submit;
      } else if (this.field_user) {
        var id = param[this.field_user];
        if (id) {
          url = this.url_set_user;
        } else {
          url = this.url_add_user;
        }
      }

      // console.log('提交', url);
      if (url) {
        var _this = this;
        this.$post(this.$toUrl(this.query_user, url), param, function (json, status) {
          if (json.result === 0 || json.result) {
            _this.events('submit_after', json, func);
          } else if (json.error) {
            _this.$toast(json.error.message, 'danger');
          } else {
            _this.$toast('服务器连接失败！', 'danger');
          }
        });
      }
    },

    // 提交成功后
    submit_after(json, func) {
      var form = Object.assign({}, this.form_user);
      console.log('查询表单form', form);
      this.get_register(form);
    },

    /**
     * 获取注册表信息
     * @param {Object} form
     * @param {Object} table
     */
    get_register(form) {
      var form = this.form;
      var form_user = this.form_user;
      delete form_user.password;
      if (!form['registered_user_id']) {
        delete form_user.user_id;
      }
      this.$get('~/api/user/get_obj', form_user, (res) => {
        console.log('注册表信息res', res);
        if (res.result && res.result.obj) {
          form.user_id = res.result.obj.user_id;
          this.submit_sub(form);
        } else if (res.error) {
          console.error(res.error);
          this.$toast(res.error.message, 'error');
        }
      });
    },

    submit_sub(form_sub) {
      if (form_sub['registered_user_id']) {
        // 提交事件
        this.$post('~/api/' + this.group_table + '/set?registered_user_id=' + form_sub['registered_user_id'], form_sub, (res) => {
            console.log('提交结果：', res);
            if (res.result) {
              this.$toast('修改成功!', 'success');
              uni.navigateBack({
                delta: 1,
              });
            } else if (res.error) {
              console.error(res.error);
              this.$toast(res.error.message, 'error');
            }
          }
        );
      } else {
        // 提交事件
        this.$post('~/api/' + this.group_table + '/add?', form_sub, (res) => {
          console.log('提交结果：', res);
          if (res.result) {
            this.$toast('添加成功!', 'success');
            uni.navigateBack({
              delta: 1,
            });
          } else if (res.error) {
            var user_id = form_sub['user_id'];
            this.$get('~/api/user/del', { user_id });
            console.error(res.error);
            this.$toast(res.error.message, 'error');
          }
        });
      }
    },
        async get_list_vip_level() {
      var list = await this.$get('~/api/vip_level/get_list?');
      if (list.result && list.result.list) {
        this.list_user_vip_level_data = list.result.list;
        list.result.list.map((o) => this.list_user_vip_level.push({ value: o.name, text: o.name }));
      }
    },
    vip_level_change(v) {
      for (let i = 0; i < this.list_user_vip_level_data.length; i++) {
        if (v == this.list_user_vip_level_data[i].name) {
          this.form_user.vip_level = this.list_user_vip_level_data[i].name;
          this.obj_user.vip_level = this.list_user_vip_level_data[i].name;
          this.form_user.vip_discount = this.list_user_vip_level_data[i].discount;
          this.obj_user.vip_discount = this.list_user_vip_level_data[i].discount;
          break;
        }
      }
    },
    
    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/registered_user/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/registered_user/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/registered_user/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/registered_user/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/registered_user/view', 'get');
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
              this.get_list_user_gender();
                          this.get_list_user_label();
          this.get_list_user_preferences();
                            this.get_list_vip_level();
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
