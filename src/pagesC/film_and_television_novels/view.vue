<template>
  <view class="page_diy_view page_film_and_television_novels_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>影视小说详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','album_name') || ($check_field('add','album_name') || $check_field('set','album_name'))" label="专辑名称" name="album_name">
                      <uni-easyinput type="text" v-model="form['album_name']" v-if="(form['film_and_television_novels_id'] && $check_field('set','album_name')) || (!form['film_and_television_novels_id'] && $check_field('add','album_name'))" :disabled="disabledObj['album_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','album_name')">
            {{ form['album_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','album_cover') || ($check_field('add','album_cover') || $check_field('set','album_cover'))" label="专辑封面" name="album_cover">
              <!-- 修改权限 -->
          <view class="from-img" v-if="form['album_cover'] && $check_field('set', 'album_cover')">
            <image v-if="disabledObj['album_cover_isDisabled']" :src="$fullImgUrl(form['album_cover'])" />
            <image v-if="!disabledObj['album_cover_isDisabled']" :src="$fullImgUrl(form['album_cover'])" @click="change_img('album_cover')" />
          </view>
          <!-- 添加权限 -->
          <view class="from-img" v-else-if="!form['album_cover'] && ($check_field('add','album_cover') || $check_field('set','album_cover'))">
            <view v-if="disabledObj['album_cover_isDisabled']" class="add-img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['album_cover_isDisabled']" class="add-img" @click="change_img('album_cover')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="from-img" v-else-if="$check_field('get', 'album_cover')">
            <image :src="$fullImgUrl(form['album_cover'])" />
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','authors_name') || ($check_field('add','authors_name') || $check_field('set','authors_name'))" label="作者姓名" name="authors_name">
                      <uni-easyinput type="text" v-model="form['authors_name']" v-if="(form['film_and_television_novels_id'] && $check_field('set','authors_name')) || (!form['film_and_television_novels_id'] && $check_field('add','authors_name'))" :disabled="disabledObj['authors_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','authors_name')">
            {{ form['authors_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','audio_content') || ($check_field('add','audio_content') || $check_field('set','audio_content'))" label="音频内容" name="audio_content">
              <!-- 查询权限 -->
          <view class="field-value">
            <view class="diy_audio" v-if="!audio_content && $check_field('get', 'audio_content') && form['audio_content']">
              <view class="me-btny" @click="close_('audio_content')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['audio_content'])" controls></video>
            </view>
            <view v-else-if=" $check_field('add', 'audio_content') || $check_field('set', 'audio_content')">
              <view class="me-btn" @click="uploadFile_('audio_content')"> 上传音频 </view></view>
            <view class="file-url" v-if="audio_content">{{ audio_content }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','album_file') || ($check_field('add','album_file') || $check_field('set','album_file'))" label="专辑文件" name="album_file">
              <!-- 查询权限 -->
          <view class="diy_file" v-if="$check_field('get', 'album_file')">
            <button v-if="form['album_file']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['album_file']))">下载文件</button>
            <text v-else>无文件</text>
          </view>
          <button v-else-if="$check_field('add', 'album_file') || $check_field('set', 'album_file')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('album_file')">
            上传文件
          </button>
          <view class="file-url" v-if="album_file || form['album_file']">
            <view class="close_" @click="close_('album_file')">x</view>
            {{ album_file }}
          </view>
            </uni-forms-item>
        <uni-forms-item label="当前位置" name="location_address">
            <uni-easyinput type="text" placeholder="当前位置" :disabled="true" v-model="form['location_address']"/>
            <view class="me-btn" @click="getLongitudeLatitude()" style="margin-left: 10rpx" >定位</view>
        </uni-forms-item>
        <uni-forms-item label="详细地址">
          <view class="detailed_address" @click="getAddress">{{form['mark_address']}}</view>
        </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/film_and_television_novels/view','set') || ($check_action('/film_and_television_novels/view','add') || $check_option('/film_and_television_novels/table','examine'))">
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
      field: "film_and_television_novels_id",
      url_add: "~/api/film_and_television_novels/add?",
      url_set: "~/api/film_and_television_novels/set?",
      url_get_obj: "~/api/film_and_television_novels/get_obj?",
      url_upload: "~/api/film_and_television_novels/upload?",
      album_name: null,
	      album_cover: null,
	      authors_name: null,
	      audio_content: null,
	      album_file: null,
						      query: {
        "film_and_television_novels_id": 0,
      },
      form: {
          "album_name":  '', // 专辑名称
            "album_cover":  '', // 专辑封面
            "authors_name":  '', // 作者姓名
            "audio_content":  '', // 音频内容
            "album_file":  '', // 专辑文件
          "film_and_television_novels_id": 0, // ID
        "location_address": "", // 定位地址
        "location_lng": "", // 定位地址经度
        "location_lat": "", // 定位地址纬度
        "mark_address": '', // 地址
        "mark_lng": '', // 地址经度
        "mark_lat": '', // 地址纬度
      },
      disabledObj:{
          "album_name_isDisabled": false,
            "album_cover_isDisabled": false,
            "authors_name_isDisabled": false,
            "audio_content_isDisabled": false,
            "album_file_isDisabled": false,
        },
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
        url: this.$fullUrl('~/api/film_and_television_novels/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'album_name') this['album_name'] = this.form['album_name'] = "";
      if (type == 'album_cover') this['album_cover'] = this.form['album_cover'] = "";
      if (type == 'authors_name') this['authors_name'] = this.form['authors_name'] = "";
      if (type == 'audio_content') this['audio_content'] = this.form['audio_content'] = "";
      if (type == 'album_file') this['album_file'] = this.form['album_file'] = "";
    },
    submit_() {
      if (this['album_name'] !== null) this.form['album_name'] = this['album_name']
      if (this['album_cover'] !== null) this.form['album_cover'] = this['album_cover']
      if (this['authors_name'] !== null) this.form['authors_name'] = this['authors_name']
      if (this['audio_content'] !== null) this.form['audio_content'] = this['audio_content']
      if (this['album_file'] !== null) this.form['album_file'] = this['album_file']
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
            '/film_and_television_novels/upload',
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
          uploadFilePathApi('/film_and_television_novels/upload',filePath,undefined,undefined,
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
        bl = this.$check_action('/film_and_television_novels/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/film_and_television_novels/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/film_and_television_novels/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/film_and_television_novels/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/film_and_television_novels/view', 'get');
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
