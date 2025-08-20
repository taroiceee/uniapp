<template>
  <view class="page_diy_edit page_i_want_to_customize_it_edit" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>我要定制</tn-nav-bar>
    <view class="page-custom " id="page_diy_edit" ref="scroll">
      <view class="custom-from">
          <view v-if="$check_field('set', 'order_number') || $check_field('add', 'order_number') ||  $check_field('get', 'order_number')" class="custom-from-item">
          <view class="label">
            <text>
              订单号
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['order_number'] && $check_field('set','order_number')) || (!form['order_number'] && $check_field('add','order_number'))">
				<input type="text" id="form_order_number" v-model="form['order_number']" placeholder="请输入订单号" :disabled="true" />
							</view>
            <text v-else-if="$check_field('get','order_number')">{{ form['order_number'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'commodity_number') || $check_field('add', 'commodity_number') ||  $check_field('get', 'commodity_number')" class="custom-from-item">
          <view class="label">
            <text>
              商品编号
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['commodity_number'] && $check_field('set','commodity_number')) || (!form['commodity_number'] && $check_field('add','commodity_number'))">
				<input type="text" id="form_commodity_number" v-model="form['commodity_number']" placeholder="请输入商品编号" :disabled="disabledObj['commodity_number_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','commodity_number')">{{ form['commodity_number'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'name_of_commodity') || $check_field('add', 'name_of_commodity') ||  $check_field('get', 'name_of_commodity')" class="custom-from-item">
          <view class="label">
            <text>
              商品名称
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['name_of_commodity'] && $check_field('set','name_of_commodity')) || (!form['name_of_commodity'] && $check_field('add','name_of_commodity'))">
				<input type="text" id="form_name_of_commodity" v-model="form['name_of_commodity']" placeholder="请输入商品名称" :disabled="disabledObj['name_of_commodity_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','name_of_commodity')">{{ form['name_of_commodity'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'category_name') || $check_field('add', 'category_name') ||  $check_field('get', 'category_name')" class="custom-from-item">
          <view class="label">
            <text>
              分类名称
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['category_name'] && $check_field('set','category_name')) || (!form['category_name'] && $check_field('add','category_name'))">
				<input type="text" id="form_category_name" v-model="form['category_name']" placeholder="请输入分类名称" :disabled="disabledObj['category_name_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','category_name')">{{ form['category_name'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'commodity_cover') || $check_field('add', 'commodity_cover') ||  $check_field('get', 'commodity_cover')" class="custom-from-item">
          <view class="label">
            <text>
              商品封面
            </text>
          </view>
              <!-- 图片 -->
          <!-- 修改权限 -->
          <view class="content" v-if="form['commodity_cover'] && $check_field('set', 'commodity_cover')">
            <image v-if="disabledObj['commodity_cover_isDisabled']" :src="$fullImgUrl(form['commodity_cover'])" />
            <image v-if="!disabledObj['commodity_cover_isDisabled']" :src="$fullImgUrl(form['commodity_cover'])" @click="change_img('commodity_cover')" />
          </view>
          <!-- 添加权限 -->
          <view class="content" v-else-if="!form['commodity_cover'] && $check_field('add', 'commodity_cover')">
            <view v-if="disabledObj['commodity_cover_isDisabled']" class="btn_add_img">
              <text>+</text>
            </view>
            <view v-if="!disabledObj['commodity_cover_isDisabled']" class="btn_add_img diy_text_row" @click="change_img('commodity_cover')">
              <text>+</text>
            </view>
          </view>
          <!-- 查询权限 -->
          <view class="content" v-else-if="$check_field('get', 'commodity_cover')">
            <image :src="$fullImgUrl(form['commodity_cover'])" />
          </view>
          <uni-icons style="display: none" class="forward" type="forward" id="form_img_commodity_cover"></uni-icons>
            </view>
            <view v-if="$check_field('set', 'production_date') || $check_field('add', 'production_date') ||  $check_field('get', 'production_date')" class="custom-from-item">
          <view class="label">
            <text>
              生产日期
            </text>
          </view>
              <!-- 日期 -->
          <view class="content">
            <uni-datetime-picker :disabled="disabledObj['production_date_isDisabled']" type="date"
                     id="form_production_date" v-model="form['production_date']" placeholder="请输入生产日期"
                     v-if="(form['production_date'] && $check_field('set', 'production_date')) || (!form['production_date'] && $check_field('add', 'production_date'))" />
            <text v-else-if="$check_field('get', 'production_date')">
              {{form['production_date']}}
            </text>
          </view>
	        </view>
            <view v-if="$check_field('set', 'shelf_life_time') || $check_field('add', 'shelf_life_time') ||  $check_field('get', 'shelf_life_time')" class="custom-from-item">
          <view class="label">
            <text>
              保质时间
            </text>
          </view>
              <!-- 日长 -->
          <view class="content">
            <uni-datetime-picker :disabled="disabledObj['shelf_life_time_isDisabled']" type="datetime" id="form_shelf_life_time"
                                 v-model="form['shelf_life_time']" placeholder="请输入保质时间" v-if="
                    (form['shelf_life_time'] && $check_field('set', 'shelf_life_time')) ||
                    (!form['shelf_life_time'] && $check_field('add', 'shelf_life_time'))
                    " />
            <text v-else-if="$check_field('get', 'shelf_life_time')">{{ form['shelf_life_time'] }}</text>
          </view>
            </view>
            <view v-if="$check_field('set', 'business_user') || $check_field('add', 'business_user') ||  $check_field('get', 'business_user')" class="custom-from-item">
          <view class="label">
            <text>商家用户</text>
          </view>
          <view class="content">
            <uni-data-select
                    id="form_business_user" v-model="form['business_user']"
                    :localdata="list_user_business_user"
                    :clear="!disabledObj['business_user_isDisabled']"
                    :disabled="disabledObj['business_user_isDisabled']"
                    v-if="(form['business_user'] && $check_field('set', 'business_user')) || (!form['business_user'] && $check_field('add', 'business_user'))" style="width: 100%;">
            </uni-data-select>
            <text v-else-if="$check_field('get', 'business_user')">
              {{form['business_user']}}
            </text>
          </view>
        </view>
            <view v-if="$check_field('set', 'customized_price') || $check_field('add', 'customized_price') ||  $check_field('get', 'customized_price')" class="custom-from-item">
          <view class="label">
            <text>
              定制价格
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['customized_price'] && $check_field('set','customized_price')) || (!form['customized_price'] && $check_field('add','customized_price'))">
				<input type="text" id="form_customized_price" v-model="form['customized_price']" placeholder="请输入定制价格" :disabled="disabledObj['customized_price_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','customized_price')">{{ form['customized_price'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'commodity_album') || $check_field('add', 'commodity_album') ||  $check_field('get', 'commodity_album')" class="custom-from-item">
          <view class="label">
            <text>
              商品相册
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['commodity_album'] && $check_field('set','commodity_album')) || (!form['commodity_album'] && $check_field('add','commodity_album'))">
				<input type="text" id="form_commodity_album" v-model="form['commodity_album']" placeholder="请输入商品相册" :disabled="disabledObj['commodity_album_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','commodity_album')">{{ form['commodity_album'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'customized_commodity_quantity') || $check_field('add', 'customized_commodity_quantity') ||  $check_field('get', 'customized_commodity_quantity')" class="custom-from-item">
          <view class="label">
            <text>
              定制商品数量
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['customized_commodity_quantity'] && $check_field('set','customized_commodity_quantity')) || (!form['customized_commodity_quantity'] && $check_field('add','customized_commodity_quantity'))">
				<input type="text" id="form_customized_commodity_quantity" v-model="form['customized_commodity_quantity']" placeholder="请输入定制商品数量" :disabled="disabledObj['customized_commodity_quantity_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','customized_commodity_quantity')">{{ form['customized_commodity_quantity'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'total_price') || $check_field('add', 'total_price') ||  $check_field('get', 'total_price')" class="custom-from-item">
          <view class="label">
            <text>
              总价格
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['total_price'] && $check_field('set','total_price')) || (!form['total_price'] && $check_field('add','total_price'))">
				<input type="text" id="form_total_price" v-model="form['total_price']" placeholder="请输入总价格" @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']" />
				            </view>
			<text v-else-if="$check_field('get','total_price')">{{ form['total_price'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'custom_user') || $check_field('add', 'custom_user') ||  $check_field('get', 'custom_user')" class="custom-from-item">
          <view class="label">
            <text>定制用户</text>
          </view>
          <view class="content">
            <uni-data-select
                    id="form_custom_user" v-model="form['custom_user']"
                    :localdata="list_user_custom_user"
                    :clear="!disabledObj['custom_user_isDisabled']"
                    :disabled="disabledObj['custom_user_isDisabled']"
                    v-if="(form['custom_user'] && $check_field('set', 'custom_user')) || (!form['custom_user'] && $check_field('add', 'custom_user'))" style="width: 100%;">
            </uni-data-select>
            <text v-else-if="$check_field('get', 'custom_user')">
              {{form['custom_user']}}
            </text>
          </view>
        </view>
            <view v-if="$check_field('set', 'user_name') || $check_field('add', 'user_name') ||  $check_field('get', 'user_name')" class="custom-from-item">
          <view class="label">
            <text>
              用户姓名
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['user_name'] && $check_field('set','user_name')) || (!form['user_name'] && $check_field('add','user_name'))">
				<input type="text" id="form_user_name" v-model="form['user_name']" placeholder="请输入用户姓名" :disabled="disabledObj['user_name_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','user_name')">{{ form['user_name'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'delivery_date') || $check_field('add', 'delivery_date') ||  $check_field('get', 'delivery_date')" class="custom-from-item">
          <view class="label">
            <text>
              交付日期
            </text>
          </view>
    	      <!-- 日期 -->
	      <view class="content">
	        <uni-datetime-picker :disabled="disabledObj['delivery_date_isDisabled']" type="date"
	                 id="form_delivery_date" v-model="form['delivery_date']" placeholder="请输入交付日期"
	                 v-if="(form['delivery_date'] && $check_field('set', 'delivery_date')) || (!form['delivery_date'] && $check_field('add', 'delivery_date'))" :start="today"/>
	        <text v-else-if="$check_field('get', 'delivery_date')">
	          {{form['delivery_date']}}
	        </text>
	      </view>
            </view>
            <view v-if="$check_field('set', 'custom_audio') || $check_field('add', 'custom_audio') ||  $check_field('get', 'custom_audio')" class="custom-from-item">
          <view class="label">
            <text>
              定制音频
            </text>
          </view>
              <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'custom_audio')">
            <audio style="text-align: left" :src="$fullImgUrl(form['custom_audio'])"
                   :poster="$fullImgUrl(form['custom_audio'])" name="暂无" author="暂无" :action="{ method: 'pause' }" controls
                   v-if="form['custom_audio']"></audio>
          </view>
            </view>
            <view v-if="$check_field('set', 'custom_video') || $check_field('add', 'custom_video') ||  $check_field('get', 'custom_video')" class="custom-from-item">
          <view class="label">
            <text>
              定制视频
            </text>
          </view>
              <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'custom_video')">
            <video :src="$fullImgUrl(form['custom_video'])" controls v-if="form['custom_video']"></video>
          </view>
            </view>
            <view v-if="$check_field('set', 'customized_accessories') || $check_field('add', 'customized_accessories') ||  $check_field('get', 'customized_accessories')" class="custom-from-item">
          <view class="label">
            <text>
              定制附件
            </text>
          </view>
              <!-- 文件 -->
          <!-- 查询权限 -->
          <view class="content" v-if="$check_field('get', 'customized_accessories')">
            <button @click="download_file($fullUrl(form['customized_accessories']))" class="btn" v-if="form['customized_accessories']">下载文件</button>
          </view>
            </view>
            <view v-if="$check_field('set', 'custom_picture') || $check_field('add', 'custom_picture') ||  $check_field('get', 'custom_picture')" class="custom-from-item">
          <view class="label">
            <text>
              定制图片
            </text>
          </view>
              <!-- 文本 -->
                  <view class="content">
			<view class="input-block" v-if="(form['custom_picture'] && $check_field('set','custom_picture')) || (!form['custom_picture'] && $check_field('add','custom_picture'))">
				<input type="text" id="form_custom_picture" v-model="form['custom_picture']" placeholder="请输入定制图片" :disabled="disabledObj['custom_picture_isDisabled']" />
							</view>
            <text v-else-if="$check_field('get','custom_picture')">{{ form['custom_picture'] }}</text>
          </view>
                    </view>
            <view v-if="$check_field('set', 'regional_location') || $check_field('add', 'regional_location') ||  $check_field('get', 'regional_location')" class="custom-from-item">
          <view class="label">
            <text>
              地区位置
            </text>
          </view>
    		  <view class="content">
			<uni-data-picker v-model="regional_location_pcaCodeRegion" v-if="(form['i_want_to_customize_it_id'] && $check_field('set', 'regional_location')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'regional_location'))" :disabled="disabledObj['regional_location_isDisabled']" :localdata="pcaCodeData" :map="pcaCodeMap" popup-title="请选择地区位置" @change="regional_location_pcaCodeChange"></uni-data-picker>
			<text v-else-if="$check_field('get','regional_location')">{{ form['regional_location'] }}</text>
		  </view>
	        </view>
          <view v-if="user_group === '管理员' || $check_examine()" class="custom-from-item">
          <view class="label">
            <text> 审核状态 </text>
          </view>
          <view class="content ">
            <uni-data-select v-model="form['examine_state']" :localdata="list_examine_state"></uni-data-select>
            <text style="margin-left: 10rpx;">
              {{ form['examine_state'] }}
            </text>
          </view>
        </view>
        <view v-if="user_group === '管理员' || $check_examine()" class="custom-from-item">
          <view class="label">
            <text>审核回复 </text>
          </view>
          <view class="content">
            <textarea v-model="form['examine_reply']"> </textarea>
          </view>
        </view>
        <!-- 座位 -->
        <view class="custom-from-item">
          <view class="content" >
            <view class="seat-wrapper" >
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
                  <view v-for="(col, j) in seatCol" :key="j" v-if="seatArray.length > 0" class="seat"
                    :style="{ width: seatSize + 'px', height: seatSize + 'px' }">
                    <view class="inner-seat" @click="handleChooseSeat(i, j)" v-if="seatArray[i][j] !== -1" :class="seatArray[i][j] === 2
                      ? 'bought-seat'
                      : seatArray[i][j] === 1
                        ? 'selected-seat'
                        : 'unselected-seat'
                      "></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="form-footer">
                  <view class="me-btn" @click="openModel">提交</view>
                </view>
      </view>
      <view class="pay-model" v-if="!!model">
        <view class="mask" @click="closemodel"></view>
        <view class="pay-model-inn">
          <view class="pay_tab">
            <view
              @click="choosepayway(idx)"
              v-for="(obj, idx) in payway"
              :key="idx"
              :class="['pay_tab_one', paywayact == idx ? 'pay_tab_one_act' : '']"
              >{{ obj.name }}</view
            >
          </view>
          <view v-if="payway[paywayact].id !== 3" class="inclued_pay_image">
            <image mode="widthFix" class="pay_image" :src="payway[paywayact].url"></image>
          </view>
          <view v-else class="inclued_pay_image">
            <view>
              <view style="width: 80%; margin: 0 auto; margin-top: 30px" class="account">
                <view style="width: 80%; margin: 0 auto">
                  <view style="line-height: 40px">请输入网银账号：</view>
                </view>
                <view style="width: 80%; margin: 0 auto">
                  <input v-model="pay_obj.account" placeholder="请输入网银账号" />
                </view>
              </view>
              <view style="width: 80%; margin: 0 auto; margin-top: 20px" class="password">
                <view style="width: 80%; margin: 0 auto">
                  <view style="line-height: 40px">请输入支付密码，6位数字：</view>
                </view>
                <view style="width: 80%; margin: 0 auto">
                  <input
                    placeholder="请输入密码"
                    type="password"
                    v-model="pay_obj.password"
                    maxlength="6"
                  />
                </view>
              </view>
            </view>
          </view>
          <view>
            <button class="me-btn" type="primary" @click="submit('pay')">确认支付</button>
            <button class="me-btn" type="info" style="margin-top: 10px;" @click="submit('notPay')">暂不支付</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
import pcaCodeData from '@/json/pca-code.json';
export default {
  mixins: [mixin],
  data() {
    return {
      url_get_obj: '~/api/i_want_to_customize_it/get_obj?',
      url_add: '~/api/i_want_to_customize_it/add?',
      url_set: '~/api/i_want_to_customize_it/set?',
	  today: new Date().toISOString().split('T')[0],
      // 查询条件
      query: {
        i_want_to_customize_it_id: 0,
          order_number: "",
            commodity_number: "",
            name_of_commodity: "",
            category_name: "",
            commodity_cover: "",
            production_date: "",
            shelf_life_time: "",
            business_user: 0,
            customized_price: "",
            commodity_album: "",
            customized_commodity_quantity: 0,
            total_price: "",
            custom_user: 0,
            user_name: "",
            delivery_date: "",
            custom_audio: "",
            custom_video: "",
            customized_accessories: "",
            custom_picture: "",
            regional_location: "",
        },
      obj: {
        i_want_to_customize_it_id: 0,
          order_number: this.$get_stamp(), // 订单号
            commodity_number:  '', // 商品编号
            name_of_commodity:  '', // 商品名称
            category_name:  '', // 分类名称
            commodity_cover:  '', // 商品封面
            production_date: this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            shelf_life_time: this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
            business_user: 0, // 商家用户
            customized_price:  '', // 定制价格
            commodity_album:  '', // 商品相册
            customized_commodity_quantity:  0 , // 定制商品数量
            total_price:  '', // 总价格
            custom_user: 0, // 定制用户
            user_name:  '', // 用户姓名
            delivery_date: this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            custom_audio:  '', // 定制音频
            custom_video:  '', // 定制视频
            customized_accessories:  '', // 定制附件
            custom_picture:  '', // 定制图片
            regional_location:  '', // 地区位置
          examine_state: "未审核",
        examine_reply: "",
        seat: "", // 座位
      },

      // 表单字段
      form: {
        i_want_to_customize_it_id: 0,
          order_number: this.$get_stamp(), // 订单号
            commodity_number:  '', // 商品编号
            name_of_commodity:  '', // 商品名称
            category_name:  '', // 分类名称
            commodity_cover:  '', // 商品封面
            production_date: this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            shelf_life_time: this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
            business_user: 0, // 商家用户
            customized_price:  '', // 定制价格
            commodity_album:  '', // 商品相册
            customized_commodity_quantity:  0 , // 定制商品数量
            total_price:  '', // 总价格
            custom_user: 0, // 定制用户
            user_name:  '', // 用户姓名
            delivery_date: this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
            custom_audio:  '', // 定制音频
            custom_video:  '', // 定制视频
            customized_accessories:  '', // 定制附件
            custom_picture:  '', // 定制图片
            regional_location:  '', // 地区位置
          examine_state: "未审核",
        examine_reply: "",
        seat: "", // 座位
      },
      disabledObj: {
          order_number_isDisabled: false,
            commodity_number_isDisabled: false,
            name_of_commodity_isDisabled: false,
            category_name_isDisabled: false,
            commodity_cover_isDisabled: false,
            production_date_isDisabled: false,
            shelf_life_time_isDisabled: false,
            business_user_isDisabled: false,
            customized_price_isDisabled: false,
            commodity_album_isDisabled: false,
                total_price_isDisabled: false,
            custom_user_isDisabled: false,
            user_name_isDisabled: false,
            delivery_date_isDisabled: false,
            custom_audio_isDisabled: false,
            custom_video_isDisabled: false,
            customized_accessories_isDisabled: false,
            custom_picture_isDisabled: false,
            regional_location_isDisabled: false,
        },
																					  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	    	        	        	        	        	        	        	        	          // 用户列表
      list_user_business_user: [],
        	        	        	        	        	          // 用户列表
      list_user_custom_user: [],
        	        	        	        	        	        	        		  regional_location_pcaCodeRegion: '',
	          field: 'i_want_to_customize_it_id',
      table_key: 'i_want_to_customize_it',

      //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
      seatArray: [],
      //影院座位行数
      seatRow: 5,
      //影院座位列数
      seatCol: 8,
      //座位尺寸
      seatSize: '',
      seatArr: [],
      list_: [],
      seatList: '',
      size: '',
      list_examine_state: [
        { value: '未审核', text: '未审核' },
        { value: '已通过', text: '已通过' },
        { value: '未通过', text: '未通过' },
      ],
      model: false,
      paywayact: 0,
      // 支付方式
      payway: [
        { name: '微信', url: '/static/img/wx.png', id: 1 },
        { name: '支付宝', url: '/static/img/aplipay.png', id: 2 },
        {
          name: '其他',
          url: 'https://dzgj.yuyuebus.com/static/front/dist/static/img/icon-question.png',
          id: 3,
        },
      ],
      pay_obj: {
        payActiveName: '微信',
        account: '',
        password: '',
        id: '',
      },
      pay_qrcode: '',
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
    openModel() {
      this.model = true
      // 返回顶部
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },
    choosepayway(idx) {
      switch (idx) {
        case 0:
          this.pay_obj.payActiveName = '微信';
          break;
        case 1:
          this.pay_obj.payActiveName = '支付宝';
          break;
        case 2:
          this.pay_obj.payActiveName = '网银';
          break;
      }
      this.paywayact = idx;
    },
    closemodel() {
      //关闭选择支付方式
      this.model = false;
    },

    async submit(payTyep) {
      let param = undefined;
      let func = undefined;
      if (!param) {
        param = this.form;
      }
      if (payTyep == "pay") {
        param.pay_state = '已支付';
        param.pay_type = this.pay_obj.payActiveName;
      }
      // 跨表可以直接支付结束
      var pm = this.events("submit_before", Object.assign({}, param)) || param;
      var msg = await this.events("submit_check", pm);
      var ret;
      if (msg) {
        this.$toast(msg, "danger");
      } else {
        if (pm["product_album"]) {
          pm["product_album"] = JSON.stringify(pm["product_album"]);
        }
        if (pm["customization_requirements"]) {
          pm["customization_requirements"] = JSON.stringify(
            pm["customization_requirements"]
          );
        }
        ret = this.events("submit_main", pm, func);
            }
      return ret;
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
                    		// 自动计算精度处理
		toFixed: function(num){
			if (!isNaN(num)) {
				return ((num + '').indexOf('.') == -1) ? num : num.toFixed(2);
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
            async get_user_session_custom_user(){
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
                _this.form["custom_user"] = user_id
                _this.disabledObj['custom_user' + '_isDisabled'] = true
                for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "custom_user") {
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
            	                	                	                	                	                	                			regional_location_pcaCodeChange(val) {
			this.form.regional_location = val.detail.value.map(item => item.value).join('/');
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
            url: _self.$fullUrl('~/api/i_want_to_customize_it/upload?'),
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              i_want_to_customize_it: 'test',
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
      this.get_list();
      return param;
    },
	
																															delivery_dateDateChange(value) {
		if (value) {
			// 转换为只有日期的值
			this.form.delivery_date = this.formatDateValue(value);
		}
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
      console.log(json);
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
      uni
        .createSelectorQuery()
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
  onLoad() {
                                                    this.get_list_user_business_user();
                                  this.get_user_session_custom_user();
        this.get_list_user_custom_user();
                                              },
};
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';

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
      .input-block{
    display: flex;
    align-items: center;
    .units{
      font-size: 14px;
      color: #666;
    }
  }
</style>
