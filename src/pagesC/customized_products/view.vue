<template>
  <view class="page_diy_view page_customized_products_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>定制商品详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','commodity_number') || ($check_field('add','commodity_number') || $check_field('set','commodity_number'))" label="商品编号" name="commodity_number">
                      <uni-easyinput type="text" v-model="form['commodity_number']" v-if="(form['customized_products_id'] && $check_field('set','commodity_number')) || (!form['customized_products_id'] && $check_field('add','commodity_number'))"  :disabled="true">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','commodity_number')">
            {{ form['commodity_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','name_of_commodity') || ($check_field('add','name_of_commodity') || $check_field('set','name_of_commodity'))" label="商品名称" name="name_of_commodity">
                      <uni-easyinput type="text" v-model="form['name_of_commodity']" v-if="(form['customized_products_id'] && $check_field('set','name_of_commodity')) || (!form['customized_products_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','name_of_commodity')">
            {{ form['name_of_commodity'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','category_name') || ($check_field('add','category_name') || $check_field('set','category_name'))" label="分类名称" name="category_name">
              <uni-data-select
              v-model="form.category_name"
              :localdata="list_category_name"
              :clear="!disabledObj['category_name_isDisabled']"
              :disabled="disabledObj['category_name_isDisabled']"
              v-if="(form['customized_products_id'] && $check_field('set','category_name')) || (!form['customized_products_id'] && $check_field('add','category_name'))"
			  style="width: 100%;"
                        ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get','category_name')">
            {{ form['category_name'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_cover') || ($check_field('add','commodity_cover') || $check_field('set','commodity_cover'))" label="商品封面" name="commodity_cover">
              <!-- 修改权限 -->
          <view class="from-img" v-if="form['commodity_cover'] && $check_field('set', 'commodity_cover')">
            <image v-if="disabledObj['commodity_cover_isDisabled']" :src="$fullImgUrl(form['commodity_cover'])" />
            <image v-if="!disabledObj['commodity_cover_isDisabled']" :src="$fullImgUrl(form['commodity_cover'])" @click="change_img('commodity_cover')" />
          </view>
          <!-- 添加权限 -->
          <view class="from-img" v-else-if="!form['commodity_cover'] && ($check_field('add','commodity_cover') || $check_field('set','commodity_cover'))">
            <view v-if="disabledObj['commodity_cover_isDisabled']" class="add-img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['commodity_cover_isDisabled']" class="add-img" @click="change_img('commodity_cover')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="from-img" v-else-if="$check_field('get', 'commodity_cover')">
            <image :src="$fullImgUrl(form['commodity_cover'])" />
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_album') || ($check_field('add','commodity_album') || $check_field('set','commodity_album'))" label="商品相册" name="commodity_album">
                      <uni-easyinput type="text" v-model="form['commodity_album']" v-if="(form['customized_products_id'] && $check_field('set','commodity_album')) || (!form['customized_products_id'] && $check_field('add','commodity_album'))" :disabled="disabledObj['commodity_album_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','commodity_album')">
            {{ form['commodity_album'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_vuser_ideo') || ($check_field('add','commodity_vuser_ideo') || $check_field('set','commodity_vuser_ideo'))" label="商品视频" name="commodity_vuser_ideo">
              <view class="field-value">
            <!-- 查询权限 -->
            <view class="diy_video" v-if="!commodity_vuser_ideo && $check_field('get', 'commodity_vuser_ideo') && form['commodity_vuser_ideo']">
              <view class="me-btn" style="margin-bottom: 8rpx" @click="close_('commodity_vuser_ideo')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['commodity_vuser_ideo'])" controls></video>
            </view>
            <view v-else-if="$check_field('add', 'commodity_vuser_ideo') || $check_field('set', 'commodity_vuser_ideo')">
              <view class="me-btn" @click="uploadFile_('commodity_vuser_ideo')"> 上传视频 </view>
            </view>
            <view class="file-url" v-if="commodity_vuser_ideo">{{ commodity_vuser_ideo }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_inventory') || ($check_field('add','custom_inventory') || $check_field('set','custom_inventory'))" label="定制库存" name="custom_inventory">
                      <uni-easyinput type="text" v-model="form['custom_inventory']" v-if="(form['customized_products_id'] && $check_field('set','custom_inventory')) || (!form['customized_products_id'] && $check_field('add','custom_inventory'))" :disabled="disabledObj['custom_inventory_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','custom_inventory')">
            {{ form['custom_inventory'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','product_production_date') || ($check_field('add','product_production_date') || $check_field('set','product_production_date'))" label="产品生产日期" name="product_production_date">
              <uni-datetime-picker v-if="(form['customized_products_id'] && $check_field('set', 'product_production_date')) || (!form['customized_products_id'] && $check_field('add', 'product_production_date'))" v-model="form['product_production_date']" type="date" :disabled="disabledObj['product_production_date_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'product_production_date')">
            {{ form['product_production_date'] }}
          </text>
	        </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','business_user') || ($check_field('add','business_user') || $check_field('set','business_user'))" label="商家用户" name="business_user">
              <uni-data-select
              id="form_business_user"
              v-model="form['business_user']"
              :localdata="list_user_business_user"
              :clear="!disabledObj['business_user_isDisabled']"
              :disabled="disabledObj['business_user_isDisabled']"
              v-if="(form['customized_products_id'] && $check_field('set', 'business_user')) || (!form['customized_products_id'] && $check_field('add', 'business_user'))"
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
        <uni-forms-item v-if="$check_field('get','shelf_life_time') || ($check_field('add','shelf_life_time') || $check_field('set','shelf_life_time'))" label="保质时间" name="shelf_life_time">
              <uni-datetime-picker v-if="(form['customized_products_id'] && $check_field('set', 'shelf_life_time')) || (!form['customized_products_id'] && $check_field('add', 'shelf_life_time'))" @change="changeLog($event, 'shelf_life_time')" v-model="form['shelf_life_time']" type="datetime" :disabled="disabledObj['shelf_life_time_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'shelf_life_time')">
            {{ form['shelf_life_time'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_statement_content') || ($check_field('add','custom_statement_content') || $check_field('set','custom_statement_content'))" label="定制声明内容" name="custom_statement_content">
              <!-- 查询权限 -->
          <view class="diy_file" v-if="$check_field('get', 'custom_statement_content')">
            <button v-if="form['custom_statement_content']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['custom_statement_content']))">下载文件</button>
            <text v-else>无文件</text>
          </view>
          <button v-else-if="$check_field('add', 'custom_statement_content') || $check_field('set', 'custom_statement_content')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('custom_statement_content')">
            上传文件
          </button>
          <view class="file-url" v-if="custom_statement_content || form['custom_statement_content']">
            <view class="close_" @click="close_('custom_statement_content')">x</view>
            {{ custom_statement_content }}
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_type') || ($check_field('add','custom_type') || $check_field('set','custom_type'))" label="定制类型" name="custom_type">
              <uni-data-select
              v-model="form.custom_type"
              :localdata="list_custom_type"
              :clear="!disabledObj['custom_type_isDisabled']"
              :disabled="disabledObj['custom_type_isDisabled']"
              v-if="(form['customized_products_id'] && $check_field('set','custom_type')) || (!form['customized_products_id'] && $check_field('add','custom_type'))"
			  style="width: 100%;"
              @change="select_custom_type_field"          ></uni-data-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get','custom_type')">
            {{ form['custom_type'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_requirements') || ($check_field('add','custom_requirements') || $check_field('set','custom_requirements'))" label="定制要求" name="custom_requirements">
              <ld-select :multiple="true" :list="list_custom_requirements"
              label-key="text" value-key="value"
              placeholder="请选择"
              :clearable="!disabledObj['custom_requirements_isDisabled']"
              :disabled="disabledObj['custom_requirements_isDisabled']"
              v-model="custom_requirements_multiple_value"
              v-if="(form['customized_products_id'] && $check_field('set', 'custom_requirements')) || (!form['customized_products_id'] && $check_field('add', 'custom_requirements'))"
              @confirm="select_custom_requirements_multiple"
          ></ld-select>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'custom_requirements')">
            {{ form['custom_requirements'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','customized_price') || ($check_field('add','customized_price') || $check_field('set','customized_price'))" label="定制价格" name="customized_price">
              <uni-easyinput type="text" v-model="form['customized_price']" v-if="(form['customized_products_id'] && $check_field('set', 'customized_price')) || (!form['customized_products_id'] && $check_field('add', 'customized_price'))" :disabled="true">
				  </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'customized_price')">
            {{ form['customized_price'] }}          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','notes') || ($check_field('add','notes') || $check_field('set','notes'))" label="说明备注" name="notes">
              <uni-easyinput type="textarea" v-model="form['notes']" v-if="(form['customized_products_id'] && $check_field('set', 'notes')) || (!form['customized_products_id'] && $check_field('add', 'notes'))" :disabled="disabledObj['notes_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'notes')">
            {{ form['notes'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_details') || ($check_field('add','commodity_details') || $check_field('set','commodity_details'))" label="商品详情" name="commodity_details">
              <uni-easyinput type="textarea" v-model="form['commodity_details']" v-if="(form['customized_products_id'] && $check_field('set', 'commodity_details')) || (!form['customized_products_id'] && $check_field('add', 'commodity_details'))" :disabled="disabledObj['commodity_details_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'commodity_details')">
            {{ form['commodity_details'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item label="审核状态" name="examine_state">
          <uni-data-select
              v-model="form['examine_state']"
              :localdata="list_examine_state"
              v-if="(form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())"
			  style="width: 100%;"
          ></uni-data-select>
          <text v-else>{{form["examine_state"]}}</text>
        </uni-forms-item>
        <uni-forms-item label="计时器标题" name="timer_title">
            <uni-easyinput v-if="(form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['timer_title']" type="text" :disabled="disabledObj['timer_title_isDisabled']" />
            <text v-else-if="$check_field('get','timer_title')">
              {{ form['timer_title'] }}
            </text>
        </uni-forms-item>
        <uni-forms-item label="计时开始时间" name="timing_start_time">
            <uni-datetime-picker v-if="(form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_start_time')" v-model="form['timing_start_time']" type="datetime" :disabled="disabledObj['timing_start_time_isDisabled']" />
            <text v-else-if="$check_field('get','timing_start_time')">
              {{ form['timing_start_time'] }}
            </text>
        </uni-forms-item>
        <uni-forms-item label="计时结束时间" name="timing_end_time">
            <uni-datetime-picker v-if="(form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_end_time')" v-model="form['timing_end_time']" type="datetime" :disabled="disabledObj['timing_end_time_isDisabled']" />
            <text v-else-if="$check_field('get','timing_end_time')">
              {{ form['timing_end_time'] }}
            </text>
        </uni-forms-item>
        <uni-forms-item label="当前位置" name="location_address">
            <uni-easyinput type="text" placeholder="当前位置" :disabled="true" v-model="form['location_address']"/>
            <view class="me-btn" @click="getLongitudeLatitude()" style="margin-left: 10rpx" >定位</view>
        </uni-forms-item>
        <uni-forms-item label="详细地址">
          <view class="detailed_address" @click="getAddress">{{form['mark_address']}}</view>
        </uni-forms-item>
        <uni-forms-item label="限制次数" name="limit_times">
          <uni-easyinput v-if="(form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['limit_times']" type="number" :disabled="disabledObj['limit_times_isDisabled']" />
          <text v-else-if="$check_action('/customized_products/view','get')">
            {{ form['limit_times'] }}
          </text>
        </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/customized_products/view','set') || ($check_action('/customized_products/view','add') || $check_option('/customized_products/table','examine'))">
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
      field: "customized_products_id",
      url_add: "~/api/customized_products/add?",
      url_set: "~/api/customized_products/set?",
      url_get_obj: "~/api/customized_products/get_obj?",
      url_upload: "~/api/customized_products/upload?",
      commodity_number: null,
	      name_of_commodity: null,
	      category_name: null,
	      commodity_cover: null,
	      commodity_album: null,
	      commodity_vuser_ideo: null,
	      custom_inventory: null,
	      product_production_date: null,
	      business_user: null,
	      shelf_life_time: null,
	      custom_statement_content: null,
	      custom_type: null,
	      custom_requirements: null,
	      customized_price: null,
	      notes: null,
	      commodity_details: null,
																	      query: {
        "customized_products_id": 0,
      },
      form: {
          "commodity_number": this.$get_stamp(), // 商品编号
            "name_of_commodity":  '', // 商品名称
            "category_name":  '', // 分类名称
            "commodity_cover":  '', // 商品封面
            "commodity_album":  '', // 商品相册
            "commodity_vuser_ideo":  '', // 商品视频
            "custom_inventory":  0 , // 定制库存
            "product_production_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "business_user": 0, // 商家用户
            "shelf_life_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
            "custom_statement_content":  '', // 定制声明内容
            "custom_type":  '', // 定制类型
            "custom_requirements":  '', // 定制要求
            "customized_price":  '', // 定制价格
            "notes":  '', // 说明备注
            "commodity_details":  '', // 商品详情
          "examine_state": "未审核",
        "customized_products_id": 0, // ID
        "timer_title":'', // 计时器标题
        "timing_start_time":'', // 计时开始时间
        "timing_end_time":'', // 计时结束时间
        "limit_times": "", // 限制次数
          "limit_type":1,
          "location_address": "", // 定位地址
        "location_lng": "", // 定位地址经度
        "location_lat": "", // 定位地址纬度
        "mark_address": '', // 地址
        "mark_lng": '', // 地址经度
        "mark_lat": '', // 地址纬度
      },
      disabledObj:{
          "commodity_number_isDisabled": false,
            "name_of_commodity_isDisabled": false,
            "category_name_isDisabled": false,
            "commodity_cover_isDisabled": false,
            "commodity_album_isDisabled": false,
            "commodity_vuser_ideo_isDisabled": false,
                "product_production_date_isDisabled": false,
            "business_user_isDisabled": false,
            "shelf_life_time_isDisabled": false,
            "custom_statement_content_isDisabled": false,
            "custom_type_isDisabled": false,
            "custom_requirements_isDisabled": false,
            "customized_price_isDisabled": false,
            "notes_isDisabled": false,
            "commodity_details_isDisabled": false,
          "timer_title_isDisabled": false, // 计时器标题
        "timing_start_time_isDisabled": false, // 计时开始时间
        "timing_end_time_isDisabled": false, // 计时结束时间
        "limit_times_isDisabled": false, // 限制次数
      },
                                  // 分类名称选项列表
      list_category_name: [],
                                                              // 用户列表
      list_user_business_user: [],
                  // 用户组
      group_user_business_user: "",
                                              // 定制类型选项列表
      list_custom_type: [],
                          custom_requirements_multiple_value:[],
              // 定制要求选项列表
      list_custom_requirements: [],
                                      list_examine_state:[{value:"未审核",text:"未审核"},{value:"已通过",text:"已通过"},{value:"未通过",text:"未通过"}],
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
                                                                                                                          if (!param.product_production_date){
        return "产品生产日期不能为空";
      }
                                          if (!param.shelf_life_time){
        return "保质时间不能为空";
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
        url: this.$fullUrl('~/api/customized_products/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'commodity_number') this['commodity_number'] = this.form['commodity_number'] = "";
      if (type == 'name_of_commodity') this['name_of_commodity'] = this.form['name_of_commodity'] = "";
      if (type == 'category_name') this['category_name'] = this.form['category_name'] = "";
      if (type == 'commodity_cover') this['commodity_cover'] = this.form['commodity_cover'] = "";
      if (type == 'commodity_album') this['commodity_album'] = this.form['commodity_album'] = "";
      if (type == 'commodity_vuser_ideo') this['commodity_vuser_ideo'] = this.form['commodity_vuser_ideo'] = "";
      if (type == 'custom_inventory') this['custom_inventory'] = this.form['custom_inventory'] = "";
      if (type == 'product_production_date') this['product_production_date'] = this.form['product_production_date'] = "";
      if (type == 'business_user') this['business_user'] = this.form['business_user'] = "";
      if (type == 'shelf_life_time') this['shelf_life_time'] = this.form['shelf_life_time'] = "";
      if (type == 'custom_statement_content') this['custom_statement_content'] = this.form['custom_statement_content'] = "";
      if (type == 'custom_type') this['custom_type'] = this.form['custom_type'] = "";
      if (type == 'custom_requirements') this['custom_requirements'] = this.form['custom_requirements'] = "";
      if (type == 'customized_price') this['customized_price'] = this.form['customized_price'] = "";
      if (type == 'notes') this['notes'] = this.form['notes'] = "";
      if (type == 'commodity_details') this['commodity_details'] = this.form['commodity_details'] = "";
    },
    submit_() {
      if (this['commodity_number'] !== null) this.form['commodity_number'] = this['commodity_number']
      if (this['name_of_commodity'] !== null) this.form['name_of_commodity'] = this['name_of_commodity']
      if (this['category_name'] !== null) this.form['category_name'] = this['category_name']
      if (this['commodity_cover'] !== null) this.form['commodity_cover'] = this['commodity_cover']
      if (this['commodity_album'] !== null) this.form['commodity_album'] = this['commodity_album']
      if (this['commodity_vuser_ideo'] !== null) this.form['commodity_vuser_ideo'] = this['commodity_vuser_ideo']
      if (this['custom_inventory'] !== null) this.form['custom_inventory'] = this['custom_inventory']
      if (this['product_production_date'] !== null) this.form['product_production_date'] = this['product_production_date']
      if (this['business_user'] !== null) this.form['business_user'] = this['business_user']
      if (this['shelf_life_time'] !== null) this.form['shelf_life_time'] = this['shelf_life_time']
      if (this['custom_statement_content'] !== null) this.form['custom_statement_content'] = this['custom_statement_content']
      if (this['custom_type'] !== null) this.form['custom_type'] = this['custom_type']
      if (this['custom_requirements'] !== null) this.form['custom_requirements'] = this['custom_requirements']
      if (this['customized_price'] !== null) this.form['customized_price'] = this['customized_price']
      if (this['notes'] !== null) this.form['notes'] = this['notes']
      if (this['commodity_details'] !== null) this.form['commodity_details'] = this['commodity_details']
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
            '/customized_products/upload',
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
          uploadFilePathApi('/customized_products/upload',filePath,undefined,undefined,
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
                                      if (this.form["product_production_date"] && JSON.stringify(this.form["product_production_date"]).indexOf("-")===-1) {
        this.form["product_production_date"] = this.$toTime(parseInt(this.form["product_production_date"]), "yyyy-MM-dd")
      }
                  if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1) {
        this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                  uni.db.del('form');

      return param;
    },
      
        
        /**
     * 获取分类名称列表
     */
    async get_list_category_name() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_category_name.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["customized_products_id"]) {
                      this.form["category_name"] = this.list_category_name[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
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
     * 获取商家用户用户组
     */
    async get_group_user_business_user() {
      this.form["business_user"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=商家用户");
      if(json.result && json.result.obj){
        this.group_user_business_user = json.result.obj;
        this.get_user_session_business_user(this.form['business_user'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_business_user(id){
      var _this = this;
      var user_id = {"user_id":_this.user.user_id}
      var url = "~/api/"+_this.group_user_business_user.source_table+"/get_obj"
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
          _this.form["business_user"] = _this.user.user_id
          _this.disabledObj['business_user' + '_isDisabled'] = true
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "business_user") {
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
     * 获取定制类型列表
     */
    async get_list_custom_type() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_custom_type.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["customized_products_id"]) {
                      this.form["custom_type"] = this.list_custom_type[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
        select_custom_type_field(v){
      if (v) {
        this.$get('~/api/classification_information/get_obj?classification_name=' + v, {}, (res) => {
          if (res.result && res.result.obj) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    this.form.customized_price = res.result.obj.customized_price;
                                                                                                          } else {
            console.error(res.error);
          }
        })
      }
    },
              
        /**
     * 获取定制要求列表
     */
    async get_list_custom_requirements() {
              var json = await this.$get("~/api/classification_information/get_list?");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_custom_requirements.push({value:o.classification_name,text:o.classification_name}));
        if(!this.form["customized_products_id"]) {
                      this.form["custom_requirements"] = this.list_custom_requirements[0].value;
                  }
      }
      else if(json.error){
        console.error(json.error);
      }
        },
            select_custom_requirements_multiple(v){
      this.form.custom_requirements = "";
      if (v && v.length > 0) {
        this.form.custom_requirements = v.toString();
      }
    },
          
        
        
        
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	            	            	            	            	            	              if (this.form["product_production_date"] && JSON.stringify(this.form["product_production_date"]).indexOf("-")===-1) {
        this.form["product_production_date"] = this.$toTime(parseInt(this.form["product_production_date"]),"yyyy-MM-dd")
      }
        	            	          if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1) {
        this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]), "yyyy-MM-dd hh:mm:ss")
      }
            	            	            	                  if (this.form.custom_requirements){
        this.custom_requirements_multiple_value = this.form.custom_requirements.split(",")
      }
    	            	            	            	    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/customized_products/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/customized_products/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/customized_products/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/customized_products/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/customized_products/view', 'get');
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
              this.get_list_category_name();
                                this.get_list_user_business_user();
          this.get_group_user_business_user();
                      this.get_list_custom_type();
          this.get_list_custom_requirements();
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
