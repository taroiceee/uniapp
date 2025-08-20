<template>
  <view id="page_diy_details" class="page_diy_details page_customized_products_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>定制商品</tn-nav-bar>
    <view class="page_diy page_customized_products" id="customized_products_details">
              <view class="qrcode" @click="dialogShow('qrcode')">
        <text class="iconfont icon-qrcode"></text>
      </view>
            <view class="warp countdown" v-if="timeTypeShow">
          <view class="container-fluid">
            <view class="row">
              <view class="col">
                <view class="time_type">
              <span>
                {{ obj['timer_title'] }}
              </span>
                  <view>
                    <span>{{ timer_start_day }}</span>天
                    <span>{{ timer_start_hour }}</span>小时
                    <span>{{ timer_start_min }}</span>分
                    <span>{{ timer_start_sec }}</span>秒
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      <view v-if="followUserInfo" @click="$navTo('/pages/user/my_home_page?follower_id=' + followUserInfo.user_id)" class="user_box">
        <view style="display: flex;">
          <image class="user_avatar" :src="followUserInfo.avatar?$fullUrl(followUserInfo.avatar):'http://192.168.1.4:5000/upload/default_avatar.jpg'" />
          <view class="user_info" style="display: flex;flex-direction: column;margin-right: 20px">
            <span class="user_nickname">{{ followUserInfo.nickname }}</span>
            <span class="user_fans">共{{followList.length}}个粉丝关注</span>
          </view>
        </view>
        <button v-if="followUserInfo.user_id != user.user_id" @click.stop="attention(followUserInfo)" class="me-btn item-btn-radius plain" type="primary">{{followState?'已关注':'+ 关注'}}</button>
      </view>
              <view class="warp cover_wrapper" v-if="$check_field('get', 'commodity_cover')">
        <image class="diy_img diy-image" :src="$fullImgUrl(obj['commodity_cover'])"/>
      </view>
                          
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'commodity_number')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>商品编号</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["commodity_number"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'name_of_commodity')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>商品名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["name_of_commodity"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'category_name')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>分类名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["category_name"] }}                  </span>
                </view>
                </view>
                  <view v-if="$check_field('get', 'commodity_album')" class="info-item field_img_multiple ">
                <view class="diy_title">
                  <span>商品相册</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["commodity_album"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'commodity_vuser_ideo')" class="info-item field_file ">
                <view class="diy_title">
                  <span>商品视频</span>
                </view>
                    <view class="diy_field diy_video">
                  <video
                          style="text-align: left"
                          :src="$fullImgUrl(obj['commodity_vuser_ideo'])"
                          controls
                          v-if="obj['commodity_vuser_ideo']"
                  ></video>
                </view>
                </view>
                <view v-if="$check_field('get', 'custom_inventory')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>定制库存</span>
                </view>
                    <view class="diy_field diy_number">
                    <span>
                        {{ obj['custom_inventory'] }}                    </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'product_production_date')" class="info-item field_time ">
                <view class="diy_title">
                  <span>产品生产日期</span>
                </view>
                    <view class="diy_field diy_date">
                  <span>
                    {{ $toTime(obj['product_production_date'], 'yyyy-MM-dd') }}
                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'business_user')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>商家用户</span>
                </view>
                    <view class="diy_field diy_uid">
                  {{ get_user_business_user(obj['business_user']) }}
                </view>
                </view>
                <view v-if="$check_field('get', 'shelf_life_time')" class="info-item field_time ">
                <view class="diy_title">
                  <span>保质时间</span>
                </view>
                    <view class="diy_field diy_datetime">
                  <span>
                      {{ $toTime(obj["shelf_life_time"],"yyyy-MM-dd hh:mm:ss") }}
                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'custom_statement_content')" class="info-item field_file ">
                <view class="diy_title">
                  <span>定制声明内容</span>
                </view>
                    <view class="diy_field diy_file">
                  <button @click="download_file($fullImgUrl(obj['custom_statement_content']))" class="btn" v-if="obj['custom_statement_content']">
                    下载文件
                  </button>
                  <!-- #ifdef MP-WEIXIN -->
                  <button
                    @click="preview_file($fullImgUrl(obj['custom_statement_content']))"
                    class="btn"
                    v-if="obj['custom_statement_content']"
                  >
                  预览
                  </button>
                  <!-- #endif -->
                </view>
                </view>
                <view v-if="$check_field('get', 'custom_type')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>定制类型</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["custom_type"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'custom_requirements')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>定制要求</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["custom_requirements"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'customized_price')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>定制价格</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["customized_price"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'notes')" class="info-item field_text ">
                <view class="diy_title">
                  <span>说明备注</span>
                </view>
                    <view class="diy_field diy_desc">
                  <span>
                      {{ obj["notes"] }}
                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'commodity_details')" class="info-item field_text ">
                <view class="diy_title">
                  <span>商品详情</span>
                </view>
                    <view class="diy_field diy_html">
                  <rich-text class="rich_text" :nodes="obj['commodity_details']"></rich-text>
                </view>
                </view>
            </view>
        </view>
        <view class="row count">
              <view class="praise view">
              <span>点赞</span>
              <span>{{ obj["praise_len"] }}</span>
            </view>
  
  
              <view class="hits view">
              <span>点击数</span>
              <span>{{ obj["hits"] }}</span>
            </view>
          </view>
      </view>

      <view class="warp">
        <view class="container-fluid">
          <view class="row limit">
            <view class="col">
              <span>限制次数：{{ obj['limit_times'] }}</span>
            </view>
          </view>
        </view>
      </view>
	<view class="kb-row">


        <view class="kb-wrap">
                  <view class="me-btn" v-if="$check_action('/i_want_to_customize_it/edit', 'add') && !i_want_to_customize_it_limit" @click="to_form('/pagesC/i_want_to_customize_it/edit')">
            定制
          </view>
            </view>
    	</view>
      <view class="tabs">
        <view class="tabs-split"></view>
          <view :class="['tabs-item', active === 0 ? 'active' : '']" @click="onClickTab(0)">
          <view class="title">地图</view>
        </view>
            <view :class="['tabs-item', active === 1 ? 'active' : '']" @click="onClickTab(1)">
          <view class="title">定位</view>
        </view>
        </view>

      <view class="tab-pane" v-show="active === 0">
        <!-- 地图 -->
        <view class="warp">
          <view class="container-fluid" style="margin: 10px 0">
            <map style="width: 100%; height: 300px" :latitude="map_location.location_lat" :longitude="map_location.location_lng">
            </map>
          </view>
        </view>
      </view>
      <view class="tab-pane" v-show="active === 1">
        <!-- 地图 -->
        <view class="warp">
          <view class="container-fluid">
            <view class="view">
              <view class="diy_title">
                <span>当前定位</span>
              </view>
              <view class="diy_field diy_datetime">
                <span>
                  {{ obj['location_address'] }}
                </span>
              </view>
            </view>
            <map
                style="width: 100%; height: 300px"
                :latitude="obj.location_lat"
                :longitude="obj.location_lng"
                :markers="[
                {
                  id: 1,
                  width: 20,
                  height: 30,
                  latitude: obj.location_lat,
                  longitude: obj.location_lng,
                  iconPath: '../../static/map_marker.png',
                },
              ]"
            >
            </map>
          </view>
        </view>
      </view>

      <!-- 评论区列表 -->
      <view class="comment-title">评论区</view>
      <list_comment :list="list_comment" @refresh="get_comment"></list_comment>

      <view :style="'height: 100rpx'"></view>
      <view class="footer" :style="{ paddingBottom: vuex_safe_area_bottom + 'px' }">
        <view class="footer-wrap">
              <view class="go-comment" @click="goComment('/pagesB/comment/edit?source_table=customized_products&source_field=customized_products_id&source_id=' + obj['customized_products_id'])">
            评论点什么...
          </view>
    
              <view class="more">
                    <view class="more-item praise" @click="change_praise()">
              <text class="iconfont icon-praise iconfont--active" v-if="state_praise"></text>
              <text class="iconfont icon-praise" v-else></text>
              <text>点赞</text>
            </view>
        
                    <view class="more-item collect" @click="change_collect()">
              <text :class="{iconfont: true, 'icon-collect': true, 'iconfont--active': state_collect,}"></text>
              <text>收藏</text>
            </view>
        
                    <view class="more-item share" @click="openShare">
              <text class="iconfont icon-fenxiang"></text>
              <text>分享</text>
            </view>
                  </view>
            </view>
      </view>

      <view>
        <view class="dialog" @click="dialogClose" v-if="isShowDialog">
          <view class="dialog-content" @click.stop="" :class="isShowMaskContent ? 'show-dialog' : 'hide-dialog'">
                                <canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
                      <view class="dialog-close iconfont iconfabu-guanbi1" @click="dialogClose"></view>
          </view>
        </view>
      </view>

      <uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
        <uni-popup-share @select="share_select"></uni-popup-share>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import list_comment from '@/components/diy/list_comment.vue';
import UQRCode from 'uqrcodejs';
  import mixin from '@/libs/mixins/page.js';

  export default {
    mixins: [mixin],
    components: {
      list_comment,
    },
    data() {
      return {
        active:  0 ,
        url_get_obj: '~/api/customized_products/get_obj?',
        field: 'customized_products_id',
        query: {
                customized_products_id: 0,
        },
        // 商品详情初始化
        obj: {
          customized_products_id: 0,
              commodity_number: "",
                  name_of_commodity: "",
                  category_name: "",
                  commodity_cover: "",
                  commodity_album: "",
                  commodity_vuser_ideo: "",
                  custom_inventory: 0,
                  product_production_date: "",
                  business_user: 0,
                  shelf_life_time: "",
                  custom_statement_content: "",
                  custom_type: "",
                  custom_requirements: "",
                  customized_price: "",
                  notes: "",
                  commodity_details: "",
              hits: 0,
          praise_len: 0,
          collect_len: 0,
          timer_title:'', // 计时器标题
          timing_start_time:'', // 计时开始时间
          timing_end_time:'', // 计时结束时间
          location_address: "", // 定位地址
          location_lng: 0, // 定位地址经度
          location_lat: 0, // 定位地址纬度
          limit_times:'', // 限制次数
					  
		  i_want_to_customize_it_limit_times: 0,	// 定制限制次数
				  source_table: '', // 来源表名
		  source_field: '', // 来源字段名
		  source_user_id: 0, // 来源用户ID
	        },
        // 点赞状态
        state_praise: false,
        // 点赞
        praise: 0,
        // 收藏
        collect: 0,
        // 收藏状态
        state_collect: false,
        // 评论列表初始化
        list_comment: [],
        isShowDialog: false, // 整个弹窗
        isShowMaskContent: false, // 白色填充区域
        timeTypeShow: true,
                          // 用户列表
        list_user_business_user: [],
                        timer_start_day: 0,
        timer_start_hour: 0,
        timer_start_min: 0,
        timer_start_sec: 0,
        map_location: {
          location_lng: '', // 定位地址经度
          location_lat: '', // 定位地址纬度
        },
							i_want_to_customize_it_limit: false,
			      followUserInfo: {},
      followList: [],
      followState: false,
      oneself: null,
      };
    },
    methods: {
    // #ifdef MP-WEIXIN
    preview_file(flie) {
      uni.downloadFile({
        url: flie,
        success: function (res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log('打开文档成功');
            }
          });
        }
      });
    },
    // #endif
    async getUserInfo() {
      let res = await this.$get("~/api/user/get_obj",{user_id: this.obj.business_user});
      
      this.followUserInfo = res.result.obj;
      
      this.getFollowList(this.followUserInfo);
    },
    async getFollowList(followUserInfo) {
      let res = await this.$get("~/api/follow/get_list", {
        followed_id: followUserInfo.user_id
      });
      this.followList = res.result.list;
      this.oneself = this.followList.find(item => item.follower_id === this.user.user_id);
      
      if(this.oneself) {
        this.followState = true;
      }else {
        this.followState = false;
      }
    },
    async attention(obj) {
      let parnm = {
        follower_id: this.user.user_id,
        follower_avatar: this.user.avatar,
        follower_nickname: this.user.nickname,
        followed_id: obj.user_id,
        followed_avatar: obj.avatar,
        followed_nickname: obj.nickname,
      }
      if(this.followState) {
        uni.showModal({
          title: '提示',
          content: '不再关注该用户？',
          success: async (res) => {
            if (res.confirm) {
              let res = await this.$get("~/api/follow/del", {
                follow_id: this.oneself.follow_id
              });
              if(res.result) {
                this.getUserInfo();
                this.$toast("取消关注");
              }
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          },
        });
      }else {
        let res = await this.$post("~/api/follow/add", parnm);
        if(res.result) {
          this.getUserInfo();
          this.$toast("关注成功");
        }
      }
    },
    goPage() {
      this.$router.push("/pages/user/my_home_page?follower_id=" + this.followUserInfo.user_id);
    },
      goComment(path) {
        if (this.$check_action('/comment/list', 'add')) {
          this.$navTo(path);
        } else {
          this.$toast('暂无权限');
        }
      },
      onClickTab(val) {
        this.active = val;
      },
      openUrl(url) {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${url}`,
        });
      },
      /**
       * 获取点赞
       * @param {Object} obj
       */
      get_praise(obj) {
        var user_id = this.user.user_id;

        this.obj.praise_len = 0;

        this.$get(
            '~/api/praise/count',
            {
              source_table: 'customized_products',
              source_field: 'customized_products_id',
              source_id: obj['customized_products_id'],
            },
            (res) => {
              if (res.result || res.result === 0) {
                this.praise = res.result;
                this.obj.praise_len = res.result;
                console.log('点赞数：', res.result);
              } else if (res.error) {
                this.$toast(res.error.message);
                console.error(res.error);
              }
            }
        );

        this.$get(
            '~/api/praise/count',
            {
              source_table: 'customized_products',
              source_field: 'customized_products_id',
              source_id: obj['customized_products_id'],
              user_id,
            },
            (res) => {
              if (res.result || res.result === 0) {
                this.state_praise = res.result ? true : false;
                console.log('点赞状态：', this.state_praise);
              } else if (res.error) {
                this.$toast(res.error.message);
                console.error(res.error);
              }
            }
        );
      },

      /**
       * 改变点赞数
       */
      change_praise() {
        var user_id = this.userInfo.user_id;

        var query = {
          source_table: 'customized_products',
          source_field: 'customized_products_id',
          source_id: this.obj['customized_products_id'],
          user_id,
        };

        var _this = this;
        _this.obj.praise_len = parseInt(_this.obj.praise_len);
        // 点赞状态
        if (this.state_praise) {
          this.state_praise = false;
          this.$get('~/api/praise/del', query, (res) => {
            if (res.result) {
              var praise_len = _this.obj.praise_len - 1;
              this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj['customized_products_id'],
                  {praise_len},(res) => {
                    if (res.result) {
                      _this.obj.praise_len = praise_len;
                      console.log('添加点赞数状态：', res.result);
                    } else if (res.error) {
                      console.error(res.error);
                    }
                  }
              );
              this.$toast('取消点赞');
            } else if (res.error) {
              this.$toast(res.error.message);
              console.error(res.error);
            }
          });
        } else {
          this.state_praise = true;
          this.$post('~/api/praise/add?', query, (res) => {
            if (res.result) {
              var praise_len = _this.obj.praise_len + 1;
              this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj['customized_products_id'],
                  {praise_len},(res) => {
                    if (res.result) {
                      _this.obj.praise_len = praise_len;
                      console.log('添加点赞数状态：', res.result);
                    } else if (res.error) {
                      console.error(res.error);
                    }
                  }
              );
                          this.$toast('点赞成功');
            } else if (res.error) {
              this.$toast(res.error.message);
              console.error(res.error);
            }
          });
        }
      },
      /**
       * 初始化收藏状态
       * @param {Object} obj
       */
      get_collect(obj) {
        var user_id = this.user.user_id;

        var query = {
          source_table: 'customized_products',
          source_field: 'customized_products_id',
          source_id: obj['customized_products_id'],
          user_id,
        };

        this.$get('~/api/collect/count', query, (res) => {
          if (res.result || res.result === 0) {
            var bl = res.result ? true : false;
            this.state_collect = bl;
            console.log('收藏状态：' + bl);
          } else if (res.error) {
            console.error(res.error);
          }
        });
      },

      /**
       * 改变收藏状态
       */
      change_collect() {
        if (!this.$check_action('/collect/list', 'add')) {
          this.$toast('暂无权限');
          return;
        }
        var user_id = this.user.user_id;

        var query = {
          source_table: 'customized_products',
          source_field: 'customized_products_id',
          source_id: this.obj['customized_products_id'],
          user_id,
        };

        // 收藏状态
		var _this = this;
        if (this.state_collect) {
          this.state_collect = false;
          this.$get('~/api/collect/del', query, (res) => {
            if (res.result) {
			  var collect_len = _this.obj.collect_len - 1;
			  this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj['customized_products_id'],
			      {collect_len},(res) => {
			        if (res.result) {
			          _this.obj.collect_len = collect_len;
			          console.log('添加收藏数状态：', res.result);
			        } else if (res.error) {
			          console.error(res.error);
			        }
			      }
			  );
              this.$toast('取消收藏');
            } else if (res.error) {
              this.$toast(res.error.message);
              console.error(res.error);
            }
          });
        } else {
          this.state_collect = true;
                      query.title = this.obj.name_of_commodity
                                  query.img = this.obj.commodity_cover
                                                                                                              this.$post('~/api/collect/add?', query, (res) => {
            if (res.result) {
			  var collect_len = _this.obj.collect_len + 1;
			  this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj['customized_products_id'],
			      {collect_len},(res) => {
			        if (res.result) {
			          _this.obj.collect_len = collect_len;
			          console.log('添加收藏数状态：', res.result);
			        } else if (res.error) {
			          console.error(res.error);
			        }
			      }
			  );
                          this.$toast('收藏成功');
            } else if (res.error) {
              this.$toast(res.error.message);
              console.error(res.error);
            }
          });
        }
      },
      /**
       * 获取评论
       * @param {Object} obj
       */
      get_comment(obj) {
		if(obj == undefined){
			obj = this.obj
		}
        var query = {
          source_table: 'customized_products',
          source_field: 'customized_products_id',
          source_id: obj['customized_products_id'],
          orderby: 'create_time desc',
          reply_to_id: '0',
        };
        this.$get('/comment/get_list', query, (json) => {
          if (json.result) {
            var list_comment = json.result.list;
            list_comment.map((o) => {
              o.list_reply = [];
            });
            this.add_reply(obj, list_comment).then((list) => {
              this.list_comment = list;
            });
          }
        });
      },
      /**
       * @param { Array } list 评论列表
       * 添加回复到评论列表
       */
      add_reply(obj, list) {
        return new Promise((resolve) => {
          for (let idx = 0; idx < list.length; idx++) {
            const obj = list[idx];
            this.$get('/comment/get_list',
                {
                  source_table: 'customized_products',
                  source_field: 'customized_products_id',
                  source_id: obj['customized_products_id'],
                  orderby: 'create_time desc',
                  reply_to_id: obj.comment_id,
                },
                (res) => {
                  if (res.result) {
                    obj.list_reply = res.result.list;
                  }
                }
            );
          }
          resolve(list);
        }).catch((e) => {
        });
      },
      /**
       * 添加访问量
       */
      add_hits(obj) {
        obj['hits'] = obj['hits'] + 1;
        var hits = obj['hits'];
        this.$post(
            '~/api/customized_products/set?customized_products_id=' + obj['customized_products_id'],
            {
              hits,
            },
            (res) => {
              if (res.result) {
                console.log('添加访问量状态：', res.result);
                var body = {
                  source_table: 'customized_products',
                  source_field: 'customized_products_id',
                  source_id: this.obj.customized_products_id,
                  user_id: this.userInfo.user_id,
                };
                this.$post('~/api/hits/add?', body, (res) => {
                  console.log(res);
                });
              } else if (res.error) {
                console.error(res.error);
              }
            }
        );
      },
      /**
       * 获取对象之后
       * @param {Object} json 结果对象
       */
      get_obj_after(json) {
        // 判断是否获取到数据
        if (this.obj) {
          var obj = this.obj;
          // 获取点赞数
          this.get_praise(obj);
          // 初始化收藏状态
          this.get_collect(obj);
          // 获取评论
          this.get_comment(obj);
          // 增加点击数
          this.add_hits(obj);
					  // 获取定制限制
		  this.get_i_want_to_customize_it_limit();
			          this.runTiming();
        }
      },
      /**
       * 二维码
       */
      dialogClose() {
        this.isShowMaskContent = false;
        setTimeout(() => {
          this.isShowDialog = false;
          this.$forceUpdate();
        }, 100);
      },
      dialogShow(type) {
        if(type === 'selfCode') {
          this.isShowMaskContent = true;
          setTimeout(() => {
            this.isShowDialog = true;
            this.$forceUpdate();
          }, 100);
        }else {
          this.isShowMaskContent = true;
          this.isShowDialog = true;
          setTimeout(() => {
            let qr = new UQRCode();
            let url = '';
            // #ifdef H5
            url = window.location.protocol + '//' + window.location.host + '/#/pagesC/customized_products/qrcodeDetails?customized_products_id=' + this.obj.customized_products_id;
            // #endif

            // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
            // 小程序无法获取全路径，无法正常跳转
            url = '/pagesC/customized_products/qrcodeDetails?customized_products_id=' + this.obj.customized_products_id;
            // #endif
            
            qr.data = url;
            qr.size = 200;
            qr.make();
            // 获取canvas上下文
            let canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
            // 设置uQRCode实例的canvas上下文
            qr.canvasContext = canvasContext;
            // 调用绘制方法将二维码图案绘制到canvas上
            qr.drawCanvas();
          }, 100);
        }
      },
      fillZero(num, digit) {
        var str = '' + num;
        if (str.length < digit) {
          str = '0' + str;
        }
        return str;
      },
      runTiming() {
        var _this = this;
        _this.timer = setInterval(updateTime, 1000);
        updateTime();

        function updateTime() {
          var oEndDate = _this.obj.timing_end_time;
          var seart = _this.obj.timing_start_time;
          if (oEndDate.indexOf('-') != -1) {
            oEndDate = new Date(oEndDate.replace(/-/g, '/')).getTime();
          }
          if (seart.indexOf('-') != -1) {
            seart = new Date(seart.replace(/-/g, '/')).getTime();
          }
          var oNowDate = new Date();
          var iRemain = 0;
          iRemain = parseInt((oNowDate.getTime() - seart) / 1000);
          if (iRemain <= 0) {
            //判断开始时间是否小于或等于今天
            clearInterval(_this.timer);
            iRemain = 0;
            _this.timeTypeShow = false;
          } else {
            iRemain = parseInt((oEndDate - oNowDate.getTime()) / 1000);
            if (iRemain <= 0) {
              //判断结束时间是否小于或等于今天
              clearInterval(_this.timer);
              iRemain = 0;
              _this.timeTypeShow = false;
            } else {
              _this.timeTypeShow = true;
              var iDay = parseInt(iRemain / 86400); //剩余天数

              iRemain %= 86400;
              var iHour = parseInt(iRemain / 3600); //剩余小时

              iRemain %= 3600;
              var iMin = parseInt(iRemain / 60); //剩余分钟

              iRemain %= 60;
              var iSec = iRemain; //剩余秒

              _this.timer_start_day = _this.fillZero(iDay, 2);
              _this.timer_start_hour = _this.fillZero(iHour, 2);
              _this.timer_start_min = _this.fillZero(iMin, 2);
              _this.timer_start_sec = _this.fillZero(iSec, 2);
            }
          }
        }
      },
                                          /**
       * 获取商家用户用户列表
       */
      async get_list_user_business_user() {
        var json = await this.$get("~/api/user/get_list?user_group=商家用户");
        if(json.result && json.result.list){
          this.list_user_business_user = json.result.list;
        }
        else if(json.error){
          console.error(json.error);
        }
      },
      get_user_business_user(id){
        let obj = this.list_user_business_user;
        let ret = "";
        for(let i=0;i<obj.length;i++){
          if(obj[i].user_id==id){
            ret = obj[i].nickname+"-"+obj[i].username;
          }
        }
        return ret;
      },
                                      getMapLocation() {
        let _this = this;
        _this.map_location.location_lng = '113.946782';
        _this.map_location.location_lat = '22.556481';
        uni.getLocation({
          type: 'gcj02',
          success: function (res) {
            console.log(res);
            let lat = res.latitude; //当前位置的纬度
            let lng = res.longitude; //当前位置精度
            _this.map_location.location_lng = JSON.stringify(lng);
            _this.map_location.location_lat = JSON.stringify(lat);
          },
          error: function (err) {
            console.log(err);
          },
        });
      },
      openShare() {
        this.$refs.share.open();
      },
      share_select() {
        uni.showToast({
          title: '分享成功',
        });
        this.$refs.share.close();
      },
			  get_i_want_to_customize_it_limit(){
	  	let param = {
	  		source_table: "customized_products",
	  		source_id: this.obj.customized_products_id,
	  		source_user_id: this.user.user_id
	  	};
	  	if(this.obj.i_want_to_customize_it_limit_times > 0){
	  		this.$get("~/api/i_want_to_customize_it/count?",param,(result)=>{
	  			if(result){
	  				if(result.result >= this.obj.i_want_to_customize_it_limit_times){
	  					this.i_want_to_customize_it_limit = true;
	  				}else{
	  					this.i_want_to_customize_it_limit = false;
	  				}
	  			}
	  		})
	  	}else{
	  		this.i_want_to_customize_it_limit = false;
	  	}
		this.obj.source_table = param.source_table;
		this.obj.source_id = param.source_id;
		this.obj.source_user_id = param.source_user_id;
	  },
		    },
    created() {
                                          this.get_list_user_business_user();
                                    },

    mounted() {
      this.getMapLocation();
      setTimeout(() => {
        this.getUserInfo();
      },100)
    },
    onUnload() {
      clearInterval(this.timer);
    },
    onShow() {
    },
  };
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .score_statistics_chart {
    display: flex;
    padding: 0 10px;
  }
  .score_num_text {
    font-size: 24px;
    margin-right: 5px;
  }
  .score_person_num {
    font-size: 12px;
    color: #6195bd;
    text-align: left;
  }
  .user_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user_avatar {
    width: 40px !important;
    height: 40px !important;
    border-radius: 100%;
    margin-right: 10px
  }

  .user_info {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .user_nickname {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  .user_fans {
    font-size: 12px;
    color: #999;
  }

  .item-btn {
    height: 26px;
    padding: 0 20px;
    border-radius: 4px;
    margin-right: 6px;
  }
  .item-btn-radius {
    height: 26px;
    padding: 0 10px;
    border-radius: 26px;
    margin-right: 6px;
  }
  .plain {
    color: #0079fe;
    background-color: transparent;
    border: 1px solid #0079fe;
  }
</style>