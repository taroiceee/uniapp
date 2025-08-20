<template>
  <view class="page_diy_view page_i_want_to_customize_it_view" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>我要定制详情</tn-nav-bar>
    <view id="page_diy_view" class="page-from">
      <uni-forms :modelValue="form" v-if="is_view()" labelWidth="70px">

        <uni-forms-item v-if="$check_field('get','order_number') || ($check_field('add','order_number') || $check_field('set','order_number'))" label="订单号" name="order_number">
                      <uni-easyinput type="text" v-model="form['order_number']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','order_number')) || (!form['i_want_to_customize_it_id'] && $check_field('add','order_number'))"  :disabled="true">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','order_number')">
            {{ form['order_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_number') || ($check_field('add','commodity_number') || $check_field('set','commodity_number'))" label="商品编号" name="commodity_number">
                      <uni-easyinput type="text" v-model="form['commodity_number']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','commodity_number')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_number'))" :disabled="disabledObj['commodity_number_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','commodity_number')">
            {{ form['commodity_number'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','name_of_commodity') || ($check_field('add','name_of_commodity') || $check_field('set','name_of_commodity'))" label="商品名称" name="name_of_commodity">
                      <uni-easyinput type="text" v-model="form['name_of_commodity']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','name_of_commodity')) || (!form['i_want_to_customize_it_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','name_of_commodity')">
            {{ form['name_of_commodity'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','category_name') || ($check_field('add','category_name') || $check_field('set','category_name'))" label="分类名称" name="category_name">
                      <uni-easyinput type="text" v-model="form['category_name']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','category_name')) || (!form['i_want_to_customize_it_id'] && $check_field('add','category_name'))" :disabled="disabledObj['category_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','category_name')">
            {{ form['category_name'] }}          </text>
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
        <uni-forms-item v-if="$check_field('get','production_date') || ($check_field('add','production_date') || $check_field('set','production_date'))" label="生产日期" name="production_date">
              <uni-datetime-picker v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'production_date')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'production_date'))" v-model="form['production_date']" type="date" :disabled="disabledObj['production_date_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'production_date')">
            {{ form['production_date'] }}
          </text>
	        </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','shelf_life_time') || ($check_field('add','shelf_life_time') || $check_field('set','shelf_life_time'))" label="保质时间" name="shelf_life_time">
              <uni-datetime-picker v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'shelf_life_time')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'shelf_life_time'))" @change="changeLog($event, 'shelf_life_time')" v-model="form['shelf_life_time']" type="datetime" :disabled="disabledObj['shelf_life_time_isDisabled']"/>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'shelf_life_time')">
            {{ form['shelf_life_time'] }}
          </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','business_user') || ($check_field('add','business_user') || $check_field('set','business_user'))" label="商家用户" name="business_user">
              <uni-data-select
              id="form_business_user"
              v-model="form['business_user']"
              :localdata="list_user_business_user"
              :clear="!disabledObj['business_user_isDisabled']"
              :disabled="disabledObj['business_user_isDisabled']"
              v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'business_user')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'business_user'))"
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
                      <uni-easyinput type="text" v-model="form['customized_price']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','customized_price')) || (!form['i_want_to_customize_it_id'] && $check_field('add','customized_price'))" :disabled="disabledObj['customized_price_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','customized_price')">
            {{ form['customized_price'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','commodity_album') || ($check_field('add','commodity_album') || $check_field('set','commodity_album'))" label="商品相册" name="commodity_album">
                      <uni-easyinput type="text" v-model="form['commodity_album']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','commodity_album')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_album'))" :disabled="disabledObj['commodity_album_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','commodity_album')">
            {{ form['commodity_album'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','customized_commodity_quantity') || ($check_field('add','customized_commodity_quantity') || $check_field('set','customized_commodity_quantity'))" label="定制商品数量" name="customized_commodity_quantity">
                      <uni-easyinput type="text" v-model="form['customized_commodity_quantity']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','customized_commodity_quantity')) || (!form['i_want_to_customize_it_id'] && $check_field('add','customized_commodity_quantity'))" :disabled="disabledObj['customized_commodity_quantity_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','customized_commodity_quantity')">
            {{ form['customized_commodity_quantity'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','total_price') || ($check_field('add','total_price') || $check_field('set','total_price'))" label="总价格" name="total_price">
                      <uni-easyinput type="text" v-model="form['total_price']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','total_price')) || (!form['i_want_to_customize_it_id'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','total_price')">
            {{ form['total_price'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_user') || ($check_field('add','custom_user') || $check_field('set','custom_user'))" label="定制用户" name="custom_user">
              <uni-data-select
              id="form_custom_user"
              v-model="form['custom_user']"
              :localdata="list_user_custom_user"
              :clear="!disabledObj['custom_user_isDisabled']"
              :disabled="disabledObj['custom_user_isDisabled']"
              v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'custom_user')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'custom_user'))"
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
        <uni-forms-item v-if="$check_field('get','user_name') || ($check_field('add','user_name') || $check_field('set','user_name'))" label="用户姓名" name="user_name">
                      <uni-easyinput type="text" v-model="form['user_name']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','user_name')) || (!form['i_want_to_customize_it_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','user_name')">
            {{ form['user_name'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','delivery_date') || ($check_field('add','delivery_date') || $check_field('set','delivery_date'))" label="交付日期" name="delivery_date">
    	      <uni-datetime-picker v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'delivery_date')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'delivery_date'))" v-model="form['delivery_date']" type="date" :disabled="disabledObj['delivery_date_isDisabled']" :start="today"/>
	      <!-- 仅查看 -->
	      <text v-else-if="$check_field('get', 'delivery_date')">
	        {{ form['delivery_date'] }}
	      </text>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_audio') || ($check_field('add','custom_audio') || $check_field('set','custom_audio'))" label="定制音频" name="custom_audio">
              <!-- 查询权限 -->
          <view class="field-value">
            <view class="diy_audio" v-if="!custom_audio && $check_field('get', 'custom_audio') && form['custom_audio']">
              <view class="me-btny" @click="close_('custom_audio')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['custom_audio'])" controls></video>
            </view>
            <view v-else-if=" $check_field('add', 'custom_audio') || $check_field('set', 'custom_audio')">
              <view class="me-btn" @click="uploadFile_('custom_audio')"> 上传音频 </view></view>
            <view class="file-url" v-if="custom_audio">{{ custom_audio }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_video') || ($check_field('add','custom_video') || $check_field('set','custom_video'))" label="定制视频" name="custom_video">
              <view class="field-value">
            <!-- 查询权限 -->
            <view class="diy_video" v-if="!custom_video && $check_field('get', 'custom_video') && form['custom_video']">
              <view class="me-btn" style="margin-bottom: 8rpx" @click="close_('custom_video')">移除</view>
              <video style="width: 100%" :src="$fullImgUrl(form['custom_video'])" controls></video>
            </view>
            <view v-else-if="$check_field('add', 'custom_video') || $check_field('set', 'custom_video')">
              <view class="me-btn" @click="uploadFile_('custom_video')"> 上传视频 </view>
            </view>
            <view class="file-url" v-if="custom_video">{{ custom_video }}</view>
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','customized_accessories') || ($check_field('add','customized_accessories') || $check_field('set','customized_accessories'))" label="定制附件" name="customized_accessories">
              <!-- 查询权限 -->
          <view class="diy_file" v-if="$check_field('get', 'customized_accessories')">
            <button v-if="form['customized_accessories']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['customized_accessories']))">下载文件</button>
            <text v-else>无文件</text>
          </view>
          <button v-else-if="$check_field('add', 'customized_accessories') || $check_field('set', 'customized_accessories')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('customized_accessories')">
            上传文件
          </button>
          <view class="file-url" v-if="customized_accessories || form['customized_accessories']">
            <view class="close_" @click="close_('customized_accessories')">x</view>
            {{ customized_accessories }}
          </view>
            </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','custom_picture') || ($check_field('add','custom_picture') || $check_field('set','custom_picture'))" label="定制图片" name="custom_picture">
                      <uni-easyinput type="text" v-model="form['custom_picture']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','custom_picture')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_picture'))" :disabled="disabledObj['custom_picture_isDisabled']">
                      </uni-easyinput>
		  <!-- 仅查看 -->
          <text v-else-if="$check_field('get','custom_picture')">
            {{ form['custom_picture'] }}          </text>
                    </uni-forms-item>
        <uni-forms-item v-if="$check_field('get','regional_location') || ($check_field('add','regional_location') || $check_field('set','regional_location'))" label="地区位置" name="regional_location">
    		  <uni-data-picker v-model="regional_location_pcaCodeRegion" v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'regional_location')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'regional_location'))" :disabled="disabledObj['regional_location_isDisabled']" :localdata="pcaCodeData" :map="pcaCodeMap" popup-title="请选择地区位置" @change="regional_location_pcaCodeChange"></uni-data-picker>
          <!-- 仅查看 -->
          <text v-else-if="$check_field('get', 'regional_location')">
            {{ form['regional_location'] }}
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
        <uni-forms-item label="审核回复" name="examine_reply">
          <uni-easyinput type="text" placeholder="请输入审核回复" v-model="form['examine_reply']"
                         v-if="(form['examine_reply'] && $check_examine()) || (!form['examine_reply'] && $check_examine())" />
          <!-- 仅查看 -->
          <text v-else>{{form["examine_reply"]}}</text>
        </uni-forms-item>
        <uni-forms-item label="选座" name="choose_seat">
        <!-- 座位 -->
            <view class="seat-wrapper">
              <view class="illustration">
                <view class="illustration-item">
                  <view class="illustration-img-wrapper unselected-seat"></view>
                  <span class="illustration-text">可选</span>
                </view>
                <view class="illustration-item">
                  <view class="illustration-img-wrapper selected-seat"></view>
                  <span class="illustration-text">已选</span>
                </view>
                <view class="illustration-item">
                  <view class="illustration-img-wrapper bought-seat"></view>
                  <span class="illustration-text">不可选</span>
                </view>

                <view class="me-btn btn-buy" @click="buySeat">选定座位</view>
              </view>
              <view class="inner-seat-wrapper" id="innerSeatWrapper">
                <view v-for="(row, i) in seatRow" :key="i">
                  <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
                  <view
                      v-for="(col, j) in seatCol"
                      :key="j"
                      v-if="seatArray.length > 0"
                      class="seat"
                      :style="{ width: seatSize + 'px', height: seatSize + 'px' }"
                  >
                    <view class="inner-seat" @click="handleChooseSeat(i, j)"
                        v-if="seatArray[i][j] !== -1"
                        :class="seatArray[i][j] === 2
                                ? 'bought-seat'
                                : seatArray[i][j] === 1
                                ? 'selected-seat'
                                : 'unselected-seat'"
                    ></view>
                  </view>
                </view>
              </view>
            </view>
        </uni-forms-item>
      </uni-forms>
      <view class="form-footer" v-if="$check_action('/i_want_to_customize_it/view','set') || ($check_action('/i_want_to_customize_it/view','add') || $check_option('/i_want_to_customize_it/table','examine'))">
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
                                                                                import pcaCodeData from '@/json/pca-code.json';
import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
export default {
  mixins: [mixin],
  data() {
    return {
	  today: new Date().toISOString().split('T')[0],
      field: "i_want_to_customize_it_id",
      url_add: "~/api/i_want_to_customize_it/add?",
      url_set: "~/api/i_want_to_customize_it/set?",
      url_get_obj: "~/api/i_want_to_customize_it/get_obj?",
      url_upload: "~/api/i_want_to_customize_it/upload?",
      order_number: null,
	      commodity_number: null,
	      name_of_commodity: null,
	      category_name: null,
	      commodity_cover: null,
	      production_date: null,
	      shelf_life_time: null,
	      business_user: null,
	      customized_price: null,
	      commodity_album: null,
	      customized_commodity_quantity: null,
	      total_price: null,
	      custom_user: null,
	      user_name: null,
	      delivery_date: null,
	      custom_audio: null,
	      custom_video: null,
	      customized_accessories: null,
	      custom_picture: null,
	      regional_location: null,
		  regional_location_pcaCodeRegion: '',
																						  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	      query: {
        "i_want_to_customize_it_id": 0,
      },
      form: {
          "order_number": this.$get_stamp(), // 订单号
            "commodity_number":  '', // 商品编号
            "name_of_commodity":  '', // 商品名称
            "category_name":  '', // 分类名称
            "commodity_cover":  '', // 商品封面
            "production_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "shelf_life_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
            "business_user": 0, // 商家用户
            "customized_price":  '', // 定制价格
            "commodity_album":  '', // 商品相册
            "customized_commodity_quantity":  0 , // 定制商品数量
            "total_price":  '', // 总价格
            "custom_user": 0, // 定制用户
            "user_name":  '', // 用户姓名
            "delivery_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            "custom_audio":  '', // 定制音频
            "custom_video":  '', // 定制视频
            "customized_accessories":  '', // 定制附件
            "custom_picture":  '', // 定制图片
            "regional_location":  '', // 地区位置
          "examine_state": "未审核",
        "examine_reply": "",
        "seat": "", // 座位
        "i_want_to_customize_it_id": 0, // ID
      },
      disabledObj:{
          "order_number_isDisabled": false,
            "commodity_number_isDisabled": false,
            "name_of_commodity_isDisabled": false,
            "category_name_isDisabled": false,
            "commodity_cover_isDisabled": false,
            "production_date_isDisabled": false,
            "shelf_life_time_isDisabled": false,
            "business_user_isDisabled": false,
            "customized_price_isDisabled": false,
            "commodity_album_isDisabled": false,
                "total_price_isDisabled": false,
            "custom_user_isDisabled": false,
            "user_name_isDisabled": false,
            "delivery_date_isDisabled": false,
            "custom_audio_isDisabled": false,
            "custom_video_isDisabled": false,
            "customized_accessories_isDisabled": false,
            "custom_picture_isDisabled": false,
            "regional_location_isDisabled": false,
        },
                                                                      // 用户列表
      list_user_business_user: [],
                                                          // 用户列表
      list_user_custom_user: [],
                  // 用户组
      group_user_custom_user: "",
                                                                          list_examine_state:[{value:"未审核",text:"未审核"},{value:"已通过",text:"已通过"},{value:"未通过",text:"未通过"}],
      //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
      seatArray: [],
      //影院座位行数
      seatRow: 5,
      //影院座位列数
      seatCol: 8,
      //座位尺寸
      seatSize: "",
      seatArr: [],
      list_: [],
      seatList: "",
      size:"",
    };
  },
  methods: {
        /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    async submit_check(param) {
                                                                                          if (!param.production_date){
        return "生产日期不能为空";
      }
                          if (!param.shelf_life_time){
        return "保质时间不能为空";
      }
                                                                                                                                          if (!param.delivery_date){
        return "交付日期不能为空";
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
        url: this.$fullUrl('~/api/i_want_to_customize_it/upload?'), //仅为示例，非真实的接口地址
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
      if (type == 'commodity_number') this['commodity_number'] = this.form['commodity_number'] = "";
      if (type == 'name_of_commodity') this['name_of_commodity'] = this.form['name_of_commodity'] = "";
      if (type == 'category_name') this['category_name'] = this.form['category_name'] = "";
      if (type == 'commodity_cover') this['commodity_cover'] = this.form['commodity_cover'] = "";
      if (type == 'production_date') this['production_date'] = this.form['production_date'] = "";
      if (type == 'shelf_life_time') this['shelf_life_time'] = this.form['shelf_life_time'] = "";
      if (type == 'business_user') this['business_user'] = this.form['business_user'] = "";
      if (type == 'customized_price') this['customized_price'] = this.form['customized_price'] = "";
      if (type == 'commodity_album') this['commodity_album'] = this.form['commodity_album'] = "";
      if (type == 'customized_commodity_quantity') this['customized_commodity_quantity'] = this.form['customized_commodity_quantity'] = "";
      if (type == 'total_price') this['total_price'] = this.form['total_price'] = "";
      if (type == 'custom_user') this['custom_user'] = this.form['custom_user'] = "";
      if (type == 'user_name') this['user_name'] = this.form['user_name'] = "";
      if (type == 'delivery_date') this['delivery_date'] = this.form['delivery_date'] = "";
      if (type == 'custom_audio') this['custom_audio'] = this.form['custom_audio'] = "";
      if (type == 'custom_video') this['custom_video'] = this.form['custom_video'] = "";
      if (type == 'customized_accessories') this['customized_accessories'] = this.form['customized_accessories'] = "";
      if (type == 'custom_picture') this['custom_picture'] = this.form['custom_picture'] = "";
      if (type == 'regional_location') this['regional_location'] = this.form['regional_location'] = "";
    },
    submit_() {
      if (this['order_number'] !== null) this.form['order_number'] = this['order_number']
      if (this['commodity_number'] !== null) this.form['commodity_number'] = this['commodity_number']
      if (this['name_of_commodity'] !== null) this.form['name_of_commodity'] = this['name_of_commodity']
      if (this['category_name'] !== null) this.form['category_name'] = this['category_name']
      if (this['commodity_cover'] !== null) this.form['commodity_cover'] = this['commodity_cover']
      if (this['production_date'] !== null) this.form['production_date'] = this['production_date']
      if (this['shelf_life_time'] !== null) this.form['shelf_life_time'] = this['shelf_life_time']
      if (this['business_user'] !== null) this.form['business_user'] = this['business_user']
      if (this['customized_price'] !== null) this.form['customized_price'] = this['customized_price']
      if (this['commodity_album'] !== null) this.form['commodity_album'] = this['commodity_album']
      if (this['customized_commodity_quantity'] !== null) this.form['customized_commodity_quantity'] = this['customized_commodity_quantity']
      if (this['total_price'] !== null) this.form['total_price'] = this['total_price']
      if (this['custom_user'] !== null) this.form['custom_user'] = this['custom_user']
      if (this['user_name'] !== null) this.form['user_name'] = this['user_name']
      if (this['delivery_date'] !== null) this.form['delivery_date'] = this['delivery_date']
      if (this['custom_audio'] !== null) this.form['custom_audio'] = this['custom_audio']
      if (this['custom_video'] !== null) this.form['custom_video'] = this['custom_video']
      if (this['customized_accessories'] !== null) this.form['customized_accessories'] = this['customized_accessories']
      if (this['custom_picture'] !== null) this.form['custom_picture'] = this['custom_picture']
      if (this['regional_location'] !== null) this.form['regional_location'] = this['regional_location']
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
            '/i_want_to_customize_it/upload',
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
          uploadFilePathApi('/i_want_to_customize_it/upload',filePath,undefined,undefined,
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
                              if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1) {
        this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]), "yyyy-MM-dd")
      }
              if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1) {
        this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                          if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1) {
        this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]), "yyyy-MM-dd")
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
        
        
        
        
        
                      set_total_price(){
      this.form.total_price = parseFloat(this.form.customized_price) * parseFloat(this.form.customized_commodity_quantity)
      let r = /^\+?[1-9][0-9]*$/; // 正整数
      if(!r.test(this.form.total_price) ){
        this.form.total_price = this.form.total_price.toFixed(2);
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
     * 获取注册用户用户组
     */
    async get_group_user_custom_user() {
      this.form["custom_user"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_custom_user = json.result.obj;
        this.get_user_session_custom_user(this.form['custom_user'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_custom_user(id){
      var _this = this;
      var user_id = {"user_id":_this.user.user_id}
      var url = "~/api/"+_this.group_user_custom_user.source_table+"/get_obj"
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
          _this.form["custom_user"] = _this.user.user_id
          _this.disabledObj['custom_user' + '_isDisabled'] = true
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "custom_user") {
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
        
        
        
        
        
        
        
        	regional_location_pcaCodeChange(val) {
		this.form.regional_location = val.detail.value.map(item => item.value).join('/');
	},
  
      /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {
            	            	            	            	            	              if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1) {
        this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]),"yyyy-MM-dd")
      }
        	          if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1) {
        this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]), "yyyy-MM-dd hh:mm:ss")
      }
            	            	            	            	            	            	            	            	              if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1) {
        this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]),"yyyy-MM-dd")
      }
        	            	            	            	            	            		  if (this.form.regional_location) {
        const region = this.form['regional_location'].split("/");
        this.regional_location_pcaCodeRegion = region[region.length - 1];
      }
	      this.get_list();
    },

    is_view() {
      var bl = this.user_group == '管理员';

      if (!bl) {
        bl = this.$check_action('/i_want_to_customize_it/table', 'add');
        console.log(bl ? '你有表格添加权限视作有添加权限' : '你没有表格添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/i_want_to_customize_it/table', 'set');
        console.log(bl ? '你有表格添加权限视作有修改权限' : '你没有表格修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/i_want_to_customize_it/view', 'add');
        console.log(bl ? '你有视图添加权限视作有添加权限' : '你没有视图添加权限');
      }
      if (!bl) {
        bl = this.$check_action('/i_want_to_customize_it/view', 'set');
        console.log(bl ? '你有视图修改权限视作有修改权限' : '你没有视图修改权限');
      }
      if (!bl) {
        bl = this.$check_action('/i_want_to_customize_it/view', 'get');
        console.log(bl ? '你有视图查询权限视作有查询权限' : '你没有视图查询权限');
      }

      console.log(
        bl
          ? '具有当前页面的查看权，请注意这不代表你有字段的查看权'
          : '无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行'
      );

      return bl;
    },
    // 选座
    //选定且购买座位
    buySeat: function () {
        //遍历seatArray，将值为1的座位变为2
        let oldArray = this.seatArray.slice();
        for (let i = 0; i < this.seatRow; i++) {
          for (let j = 0; j < this.seatCol; j++) {
            if (oldArray[i][j] === 1) {
              oldArray[i][j] = 2;
            }
          }
        }
        this.seatArray = oldArray;
        let string = '';
        for (let x = 0; x < oldArray.length; x++) {
          let array = oldArray[x];
          for (let j = 0; j < array.length; j++) {
            if (oldArray[x][j] === 2) {
              if (string == '') {
                string = '' + (x * 8 + j);
              } else {
                string = string + ',' + (x * 8 + j);
              }
            }
          }
        }
        // 对比判断哪些是新增的座位
        let seat = this.obj.seat;
        let seatB = '';
        if (string != '' && string != null) {
          let stringList = string.split(',');
          let seatList = this.seatList;
          if (seatList.length != 0) {
            let seatListArr = seatList.split(',');
            for (let v = 0; v < stringList.length; v++) {
              if (seatListArr.indexOf(stringList[v]) == -1 && seat.indexOf(stringList[v]) == -1) {
                if (seat == '' || seat == null) {
                  seat = stringList[v] + '';
                  seatB = seat;
                } else {
                  if (seat.indexOf(stringList[v]) == -1) {
                    seat = seat + ',' + stringList[v];
                    if (seatB == '' || seatB == null) {
                      seatB = stringList[v];
                    } else {
                      seatB = seatB + ',' + stringList[v];
                    }
                  }
                }
              }
            }
          } else {
            seat = string;
          }
        }

        if (this.form.seat == '') {
          this.form.seat = seat;
        } else {
          if (seatB != '') {
            this.form.seat = this.form.seat + ',' + seatB;
          }
        }
        this.seatList = string;
    },
    //处理座位选择逻辑
    handleChooseSeat: function (row, col) {
        let seatValue = this.seatArray[row][col];
        let newArray = this.seatArray;
        //如果是已购座位，直接返回
        if (seatValue === 2) return;
        //如果是已选座位点击后变未选
        if (seatValue === 1) {
          newArray[row][col] = 0;
        } else if (seatValue === 0) {
          newArray[row][col] = 1;
        }
        //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
        this.seatArray = newArray.slice();
    },
    /**
    * 获取所有坐座位信息
    */
    async get_list() {
        var json = await this.$get('~/api/i_want_to_customize_it/get_list'
				);
        if (json.result && json.result.list) {
          this.list_ = json.result.list;
        } else if (json.error) {
          console.error(json.error);
        }

        let list = json.result.list;
        if (list != null && list.length != 0) {
          let seatArr = '';
          for (let j = 0; j < list.length; j++) {
            let seat = list[j].seat;
            if (seat != null && seat != '') {
              if (seatArr == '') {
                seatArr = seat + '';
              } else {
                seatArr = seatArr + ',' + seat;
              }
            }
          }
          this.seatList = seatArr;
        }
        this.initSeatArray(5, 8);
    },

    //初始座位数组
    initSeatArray: function () {
        let seatList = this.seatList;
        let seatArr = seatList.split(',');
        if (seatList == '' || seatList == null) {
          seatArr = [];
        }
        this.seatArr = seatArr;

        let seatArray = Array(this.seatRow)
            .fill(0)
            .map(() => Array(this.seatCol).fill(0));
        this.seatArray = seatArray;
        for (let j = 0; j < seatArr.length; j++) {
          let i = Math.floor(seatArr[j] / 8);
          let x = seatArr[j] % 8;
          seatArray[i][x] = 2;
        }
        let _this = this;
        uni.createSelectorQuery()
        .in(this)
        .select('#innerSeatWrapper')
        .boundingClientRect(function (data) {
          _this.seatSize = data ? parseInt(parseInt(data.width, 10) / _this.seatCol, 8) : 0;
          _this.size = parseInt(data.width, 9);
        })
        .exec(function (res) {
          // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
        });
    },
  },
  created() {
                                    this.get_list_user_business_user();
                                this.get_list_user_custom_user();
          this.get_group_user_custom_user();
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

      .selected-seat {
    background: url('/static/img/selected2.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .unselected-seat {
    background: url('/static/img/unselected2.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .bought-seat {
    background: url('/static/img/bought2.png') center center no-repeat;
    background-size: 100% 100%;
  }
    </style>
