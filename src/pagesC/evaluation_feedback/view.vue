<template>
  <view class="page_diy_view page_evaluation_feedback_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>评价反馈详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','order_number') || ($check_field('add','order_number') || $check_field('set','order_number'))" label="订单号" name="order_number">
                      <uni-easyinput type="text" v-model="form['order_number']" v-if="(form['evaluation_feedback_id'] && $check_field('set','order_number')) || (!form['evaluation_feedback_id'] && $check_field('add','order_number'))" :disabled="disabledObj['order_number_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','order_number')">
            {{ form['order_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','name_of_commodity') || ($check_field('add','name_of_commodity') || $check_field('set','name_of_commodity'))" label="商品名称" name="name_of_commodity">
                      <uni-easyinput type="text" v-model="form['name_of_commodity']" v-if="(form['evaluation_feedback_id'] && $check_field('set','name_of_commodity')) || (!form['evaluation_feedback_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','name_of_commodity')">
            {{ form['name_of_commodity'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','category_name') || ($check_field('add','category_name') || $check_field('set','category_name'))" label="分类名称" name="category_name">
                      <uni-easyinput type="text" v-model="form['category_name']" v-if="(form['evaluation_feedback_id'] && $check_field('set','category_name')) || (!form['evaluation_feedback_id'] && $check_field('add','category_name'))" :disabled="disabledObj['category_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','category_name')">
            {{ form['category_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','business_user') || ($check_field('add','business_user') || $check_field('set','business_user'))" label="商家用户" name="business_user">
              <uni-data-select
              id="form_business_user"
              v-model="form['business_user']"
              :localdata="list_user_business_user"
              :clear="!disabledObj['business_user_isDisabled']"
              :disabled="disabledObj['business_user_isDisabled']"
              v-if="(form['evaluation_feedback_id'] && $check_field('set', 'business_user')) || (!form['evaluation_feedback_id'] && $check_field('add', 'business_user'))"
			   style="width: 100%;"
          ></uni-data-select>
          <uni-data-select
              v-model="form['business_user']"
              :localdata="list_user_business_user"
              :clear="false"
              :disabled="true"
              v-else-if="$check_field('get', 'business_user')"
              id="business_user"
			  style="width: 100%;"
          ></uni-data-select>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','customized_price') || ($check_field('add','customized_price') || $check_field('set','customized_price'))" label="定制价格" name="customized_price">
                      <uni-easyinput type="text" v-model="form['customized_price']" v-if="(form['evaluation_feedback_id'] && $check_field('set','customized_price')) || (!form['evaluation_feedback_id'] && $check_field('add','customized_price'))" :disabled="disabledObj['customized_price_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','customized_price')">
            {{ form['customized_price'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_user') || ($check_field('add','custom_user') || $check_field('set','custom_user'))" label="定制用户" name="custom_user">
              <uni-data-select
              id="form_custom_user"
              v-model="form['custom_user']"
              :localdata="list_user_custom_user"
              :clear="!disabledObj['custom_user_isDisabled']"
              :disabled="disabledObj['custom_user_isDisabled']"
              v-if="(form['evaluation_feedback_id'] && $check_field('set', 'custom_user')) || (!form['evaluation_feedback_id'] && $check_field('add', 'custom_user'))"
			   style="width: 100%;"
          ></uni-data-select>
          <uni-data-select
              v-model="form['custom_user']"
              :localdata="list_user_custom_user"
              :clear="false"
              :disabled="true"
              v-else-if="$check_field('get', 'custom_user')"
              id="custom_user"
			  style="width: 100%;"
          ></uni-data-select>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','delivery_date') || ($check_field('add','delivery_date') || $check_field('set','delivery_date'))" label="交付日期" name="delivery_date">
    	      <uni-datetime-picker v-if="(form['evaluation_feedback_id'] && $check_field('set', 'delivery_date')) || (!form['evaluation_feedback_id'] && $check_field('add', 'delivery_date'))" v-model="form['delivery_date']" type="date" :disabled="disabledObj['delivery_date_isDisabled']" :start="today"/>
	      <!-- 仅查看 -->
	      <text v-else-if="$check_field('get', 'delivery_date')">
	        {{ form['delivery_date'] }}
	      </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','evaluation_time') || ($check_field('add','evaluation_time') || $check_field('set','evaluation_time'))" label="评价时间" name="evaluation_time">
              <uni-datetime-picker v-if="(form['evaluation_feedback_id'] && $check_field('set', 'evaluation_time')) || (!form['evaluation_feedback_id'] && $check_field('add', 'evaluation_time'))" @change="changeLog($event, 'evaluation_time')" v-model="form['evaluation_time']" type="datetime" :disabled="disabledObj['evaluation_time_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'evaluation_time')">
            {{ form['evaluation_time'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','evaluation_grade') || ($check_field('add','evaluation_grade') || $check_field('set','evaluation_grade'))" label="评价等级" name="evaluation_grade">
              <uni-data-select
              v-model="form.evaluation_grade"
              :localdata="list_evaluation_grade"
              :clear="!disabledObj['evaluation_grade_isDisabled']"
              :disabled="disabledObj['evaluation_grade_isDisabled']"
              v-if="(form['evaluation_feedback_id'] && $check_field('set', 'evaluation_grade')) || (!form['evaluation_feedback_id'] && $check_field('add', 'evaluation_grade'))"
			  style="width: 100%;"
          ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'evaluation_grade')">
            {{ form['evaluation_grade'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','optimization_recommendations') || ($check_field('add','optimization_recommendations') || $check_field('set','optimization_recommendations'))" label="优化建议" name="optimization_recommendations">
              <uni-easyinput type="textarea" v-model="form['optimization_recommendations']" v-if="(form['evaluation_feedback_id'] && $check_field('set', 'optimization_recommendations')) || (!form['evaluation_feedback_id'] && $check_field('add', 'optimization_recommendations'))" :disabled="disabledObj['optimization_recommendations_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'optimization_recommendations')">
            {{ form['optimization_recommendations'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','performance_score') || ($check_field('add','performance_score') || $check_field('set','performance_score'))" label="性能评分" name="performance_score">
                      <uni-easyinput type="text" v-model="form['performance_score']" v-if="(form['evaluation_feedback_id'] && $check_field('set','performance_score')) || (!form['evaluation_feedback_id'] && $check_field('add','performance_score'))" :disabled="disabledObj['performance_score_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','performance_score')">
            {{ form['performance_score'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','practicality_score') || ($check_field('add','practicality_score') || $check_field('set','practicality_score'))" label="实用性评分" name="practicality_score">
                      <uni-easyinput type="text" v-model="form['practicality_score']" v-if="(form['evaluation_feedback_id'] && $check_field('set','practicality_score')) || (!form['evaluation_feedback_id'] && $check_field('add','practicality_score'))" :disabled="disabledObj['practicality_score_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','practicality_score')">
            {{ form['practicality_score'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','appearance_appearance_rating') || ($check_field('add','appearance_appearance_rating') || $check_field('set','appearance_appearance_rating'))" label="外貌外观评分" name="appearance_appearance_rating">
                      <uni-easyinput type="text" v-model="form['appearance_appearance_rating']" v-if="(form['evaluation_feedback_id'] && $check_field('set','appearance_appearance_rating')) || (!form['evaluation_feedback_id'] && $check_field('add','appearance_appearance_rating'))" :disabled="disabledObj['appearance_appearance_rating_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','appearance_appearance_rating')">
            {{ form['appearance_appearance_rating'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','cost_effective') || ($check_field('add','cost_effective') || $check_field('set','cost_effective'))" label="性价比" name="cost_effective">
                      <uni-easyinput type="text" v-model="form['cost_effective']" v-if="(form['evaluation_feedback_id'] && $check_field('set','cost_effective')) || (!form['evaluation_feedback_id'] && $check_field('add','cost_effective'))" :disabled="disabledObj['cost_effective_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','cost_effective')">
            {{ form['cost_effective'] }}          </text>
                    </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/evaluation_feedback/view','set') || ($check_action('/evaluation_feedback/view','add') || $check_option('/evaluation_feedback/table','examine'))">
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
      field: "evaluation_feedback_id",
      url_add: "~/api/evaluation_feedback/add?",
      url_set: "~/api/evaluation_feedback/set?",
      url_get_obj: "~/api/evaluation_feedback/get_obj?",
      url_upload: "~/api/evaluation_feedback/upload?",
      order_number: null,
	      name_of_commodity: null,
	      category_name: null,
	      business_user: null,
	      customized_price: null,
	      custom_user: null,
	      delivery_date: null,
	      evaluation_time: null,
	      evaluation_grade: null,
	      optimization_recommendations: null,
	      performance_score: null,
	      practicality_score: null,
	      appearance_appearance_rating: null,
	      cost_effective: null,
															      query: {
        "evaluation_feedback_id": 0,
      },
      form: {
          "order_number":  '', // 订单号
            "name_of_commodity":  '', // 商品名称
            "category_name":  '', // 分类名称
            "business_user": 0, // 商家用户
            "customized_price":  '', // 定制价格
            "custom_user": 0, // 定制用户
            "delivery_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "evaluation_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
            "evaluation_grade":  '', // 评价等级
            "optimization_recommendations":  '', // 优化建议
            "performance_score":  0 , // 性能评分
            "practicality_score":  0 , // 实用性评分
            "appearance_appearance_rating":  0 , // 外貌外观评分
            "cost_effective":  0 , // 性价比
          "evaluation_feedback_id": 0, // ID
      },
      disabledObj:{
          "order_number_isDisabled": false,
            "name_of_commodity_isDisabled": false,
            "category_name_isDisabled": false,
            "business_user_isDisabled": false,
            "customized_price_isDisabled": false,
            "custom_user_isDisabled": false,
            "delivery_date_isDisabled": false,
            "evaluation_time_isDisabled": false,
            "evaluation_grade_isDisabled": false,
            "optimization_recommendations_isDisabled": false,
                        },
                                      // 用户列表
      list_user_business_user: [],
                                  // 用户列表
      list_user_custom_user: [],
                                              // 评价等级选项列表
      list_evaluation_grade: [],
                                                    };
  },
  methods: {
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                                                                                                          if (!param.delivery_date){
        return "交付日期不能为空";
      }
                          if (!param.evaluation_time){
        return "评价时间不能为空";
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
        url: this.$fullUrl('~/api/evaluation_feedback/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'order_number') this['order_number'] = this.form['order_number'] = "";
      if (type == 'name_of_commodity') this['name_of_commodity'] = this.form['name_of_commodity'] = "";
      if (type == 'category_name') this['category_name'] = this.form['category_name'] = "";
      if (type == 'business_user') this['business_user'] = this.form['business_user'] = "";
      if (type == 'customized_price') this['customized_price'] = this.form['customized_price'] = "";
      if (type == 'custom_user') this['custom_user'] = this.form['custom_user'] = "";
      if (type == 'delivery_date') this['delivery_date'] = this.form['delivery_date'] = "";
      if (type == 'evaluation_time') this['evaluation_time'] = this.form['evaluation_time'] = "";
      if (type == 'evaluation_grade') this['evaluation_grade'] = this.form['evaluation_grade'] = "";
      if (type == 'optimization_recommendations') this['optimization_recommendations'] = this.form['optimization_recommendations'] = "";
      if (type == 'performance_score') this['performance_score'] = this.form['performance_score'] = "";
      if (type == 'practicality_score') this['practicality_score'] = this.form['practicality_score'] = "";
      if (type == 'appearance_appearance_rating') this['appearance_appearance_rating'] = this.form['appearance_appearance_rating'] = "";
      if (type == 'cost_effective') this['cost_effective'] = this.form['cost_effective'] = "";
    },
    submit_() {
      if (this['order_number'] !== null) this.form['order_number'] = this['order_number']
      if (this['name_of_commodity'] !== null) this.form['name_of_commodity'] = this['name_of_commodity']
      if (this['category_name'] !== null) this.form['category_name'] = this['category_name']
      if (this['business_user'] !== null) this.form['business_user'] = this['business_user']
      if (this['customized_price'] !== null) this.form['customized_price'] = this['customized_price']
      if (this['custom_user'] !== null) this.form['custom_user'] = this['custom_user']
      if (this['delivery_date'] !== null) this.form['delivery_date'] = this['delivery_date']
      if (this['evaluation_time'] !== null) this.form['evaluation_time'] = this['evaluation_time']
      if (this['evaluation_grade'] !== null) this.form['evaluation_grade'] = this['evaluation_grade']
      if (this['optimization_recommendations'] !== null) this.form['optimization_recommendations'] = this['optimization_recommendations']
      if (this['performance_score'] !== null) this.form['performance_score'] = this['performance_score']
      if (this['practicality_score'] !== null) this.form['practicality_score'] = this['practicality_score']
      if (this['appearance_appearance_rating'] !== null) this.form['appearance_appearance_rating'] = this['appearance_appearance_rating']
      if (this['cost_effective'] !== null) this.form['cost_effective'] = this['cost_effective']
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
            '/evaluation_feedback/upload',
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
          uploadFilePathApi('/evaluation_feedback/upload',filePath,undefined,undefined,
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
                                  if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1) {
        this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]), "yyyy-MM-dd")
      }
              if (this.form["evaluation_time"] && JSON.stringify(this.form["evaluation_time"]).indexOf("-")===-1) {
        this.form["evaluation_time"] = this.$toTime(parseInt(this.form["evaluation_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                  uni.db.del('form');

      return param;
    },
      
        
        
          /**
     * 获取商家用户用户列表
     */
    async get_list_user_business_user() {
      var json = await this.$get("~/api/user/get_list?user_group=商家用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_business_user.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
        
        
          /**
     * 获取注册用户用户列表
     */
    async get_list_user_custom_user() {
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_custom_user.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
        
        
        
        /**
     * 获取评价等级列表
     */
    async get_list_evaluation_grade() {
          ['优','良','中','差'].map((o) => this.list_evaluation_grade.push({value:o,text:o}));
      if(!this.form["evaluation_feedback_id"]) {
                  this.form["evaluation_grade"] = this.list_evaluation_grade[0].value;
              }
            },
              
        
        
        
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	            	            	            	            	              if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1) {
        this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]),"yyyy-MM-dd")
      }
        	          if (this.form["evaluation_time"] && JSON.stringify(this.form["evaluation_time"]).indexOf("-")===-1) {
        this.form["evaluation_time"] = this.$toTime(parseInt(this.form["evaluation_time"]), "yyyy-MM-dd hh:mm:ss")
      }
            	            	            	            	            	            	            	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/evaluation_feedback/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/evaluation_feedback/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/evaluation_feedback/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/evaluation_feedback/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/evaluation_feedback/view', 'get');
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
                    this.get_list_user_business_user();
                    this.get_list_user_custom_user();
                      this.get_list_evaluation_grade();
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
