<template>
  <view class="diy_register">
      <view v-if="$check_register_field('add', 'user_membership_card_number', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户会员卡号 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_user_membership_card_number" v-model="form['user_membership_card_number']" @blur="handleBlur($event.target.value,'user_membership_card_number')"  placeholder="请输入用户会员卡号" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'real_name', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 真实姓名 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_real_name" v-model="form['real_name']" @blur="handleBlur($event.target.value,'real_name')"  placeholder="请输入真实姓名" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'user_gender', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户性别 </text>
      </view>
          <!-- 选项 -->
      <view class="diy_field diy_down">
        <uni-data-select
                id="form_user_gender"
                v-model="form['user_gender']"
                :localdata="list_user_gender"
                @change="change_user_gender"
        ></uni-data-select>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'user_age', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户年龄 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_user_age" v-model="form['user_age']" @blur="handleBlur($event.target.value,'user_age')"  placeholder="请输入用户年龄" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'height', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 身高 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_height" v-model="form['height']" @blur="handleBlur($event.target.value,'height')"  placeholder="请输入身高" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'user_weight', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户体重 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_user_weight" v-model="form['user_weight']" @blur="handleBlur($event.target.value,'user_weight')"  placeholder="请输入用户体重" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'region', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 所属地区 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_region" v-model="form['region']" @blur="handleBlur($event.target.value,'region')"  placeholder="请输入所属地区" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'user_label', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户标签 </text>
      </view>
          <!-- 选项 -->
      <view class="diy_field diy_down">
        <ld-select :multiple="true" :list="list_user_label"
                label-key="text" value-key="value"
                placeholder="请选择"
                v-model="user_label_multiple_value"
                @confirm="change_user_label"></ld-select>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'user_preferences', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户喜好 </text>
      </view>
          <!-- 选项 -->
      <view class="diy_field diy_down">
        <uni-data-select
                id="form_user_preferences"
                v-model="form['user_preferences']"
                :localdata="list_user_preferences"
                @change="change_user_preferences"
        ></uni-data-select>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'description_description', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 描述说明 </text>
      </view>
          <!-- 仅查看 -->
      <view class="diy_field diy_disabled">
        <text>
          {{ form['description_description'] || "" }}
        </text>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'certificate_number', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 证件号 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_certificate_number" v-model="form['certificate_number']" @blur="handleBlur($event.target.value,'certificate_number')"  placeholder="请输入证件号" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'portfolio', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 作品集 </text>
      </view>
                  <!-- 文本 -->
        <view class="diy_field diy_text">
          <input type="text" id="form_portfolio" v-model="form['portfolio']" @blur="handleBlur($event.target.value,'portfolio')"  placeholder="请输入作品集" />
        </view>
              </view>
        <view v-if="$check_register_field('add', 'user_photos', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户照片 </text>
      </view>
          <!-- 图片 -->
      <!-- 修改权限 -->
      <view class="diy_img" v-if="form['user_photos']">
        <image style="width: 200rpx; height: 200rpx" :src="$fullImgUrl(form['user_photos'])" @click="change_img('user_photos')"/>
      </view>
      <!-- 添加权限 -->
      <view class="diy_img" v-else-if="!form['user_photos']">
        <view class="btn_add_img" @click="change_img('user_photos')">
          <text>+</text>
        </view>
      </view>
        </view>
        <view v-if="$check_register_field('add', 'user_notes', '/registered_user/view')" class="diy_register_field col-md-6">
      <view class="diy_title">
        <text> 用户备注 </text>
      </view>
          <!-- 多文本 -->
      <view class="diy_field diy_desc">
        <textarea id="form_user_notes" v-model="form['user_notes']" />
      </view>
        </view>
    </view>
</template>

<script>
                              import ldSelect from '@/components/ld-select/ld-select.vue';
import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  components: {ldSelect},
  model: {
    prop: 'form',
    event: 'change',
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          url_upload: '~/api/registered_user/upload?',
        };
      },
    },
  },
  data() {
    return {
                "list_user_gender": [],
                                user_label_multiple_value:[],
            "list_user_label": [],
                        "list_user_preferences": [],
                    };
  },
  methods: {
          /**
     * 获取用户性别列表
     */
    async get_list_user_gender() {
          ['男','女'].map((o) => this.list_user_gender.push({value:o,text:o}));
      this.form["user_gender"] = this.list_user_gender[0].value;
            },
    change_user_gender(val) {
      if (val === "全部" || val === "") {
        this.$emit('change',{"value":"","type":"user_gender"})
      }else{
        this.$emit('change',{"value":val,"type":"user_gender"})
      }
            },
                /**
     * 获取用户标签列表
     */
    async get_list_user_label() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_label.push({value:o.classification_name,text:o.classification_name}));
        this.form["user_label"] = this.list_user_label[0].value;
      }
      else if(json.error){
        console.error(json.error);
      }
        },
    change_user_label(val) {
      if (val === "全部" || val === "") {
        this.$emit('change',{"value":"","type":"user_label"})
      }else{
        this.$emit('change',{"value":val,"type":"user_label"})
      }
                this.form.user_label = "";
        if (this.user_label_multiple_value && this.user_label_multiple_value.length>0){
          this.form.user_label = this.user_label_multiple_value.toString();
        }
        },
        /**
     * 获取用户喜好列表
     */
    async get_list_user_preferences() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_preferences.push({value:o.classification_name,text:o.classification_name}));
        this.form["user_preferences"] = this.list_user_preferences[0].value;
      }
      else if(json.error){
        console.error(json.error);
      }
        },
    change_user_preferences(val) {
      if (val === "全部" || val === "") {
        this.$emit('change',{"value":"","type":"user_preferences"})
      }else{
        this.$emit('change',{"value":val,"type":"user_preferences"})
      }
            if (val){
          this.$get('~/api/classification_information/get_obj?classification_name='+val,{},(res)=>{
            if(res.result && res.result.obj){
                                                                                                                                                                                                                                                                                                                                                this.$set(this.form, "description_description", res.result.obj.description_description);
				  // 触发 change 事件，通知父组件数据更新
				  this.$emit('change', { 
				    value: res.result.obj.description_description, 
				    type: "description_description" 
				  });
                                                                                                                                                                  }else{
              console.error(res.error);
            }
          })
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
              this.get_list_user_gender();
                          this.get_list_user_label();
          this.get_list_user_preferences();
                          },
};
</script>
