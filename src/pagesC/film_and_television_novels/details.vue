<template>
  <view id="page_diy_details" class="page_diy_details page_film_and_television_novels_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>影视小说</tn-nav-bar>
    <view class="page_diy page_film_and_television_novels" id="film_and_television_novels_details">
          <view class="warp cover_wrapper" v-if="$check_field('get', 'album_cover')">
        <image class="diy_img diy-image" :src="$fullImgUrl(obj['album_cover'])"/>
      </view>
        
      <view class="score_wrapper" v-if="$check_option('/film_and_television_novels/details','can_show_score') || $check_option('/film_and_television_novels/details','can_score')">
        <view class="score_statistics_chart">
          <view class="score_num_text">{{ score_num }}</view>
          <view @click="go_score_num(obj)">
            <tn-rate
              :disabled="true"
              v-model="score_num"
              allowHalf
              activeColor="#f7ba2a"
              inactiveColor="#f7ba2a"
            ></tn-rate>
            <view class="score_person_num">{{score_total}}人评价</view>
          </view>
        </view>
        <score_statistics_chart
          :obj="obj"
          sourcetable="film_and_television_novels"
          sourcefield="film_and_television_novels_id"
          :refresh="scoreRefresh"
          @scorePersonTotal="scorePersonTotal"
        ></score_statistics_chart>
      </view>
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'album_name')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>专辑名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["album_name"] }}                  </span>
                </view>
                </view>
                  <view v-if="$check_field('get', 'authors_name')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>作者姓名</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["authors_name"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'audio_content')" class="info-item field_file ">
                <view class="diy_title">
                  <span>音频内容</span>
                </view>
                    <view class="diy_field diy_music">
                  <video
                          style="text-align: left"
                          :src="$fullImgUrl(obj['audio_content'])"
                          controls
                          v-if="obj['audio_content']"
                  ></video>
                </view>
                </view>
                <view v-if="$check_field('get', 'album_file')" class="info-item field_file ">
                <view class="diy_title">
                  <span>专辑文件</span>
                </view>
                    <view class="diy_field diy_file">
                  <button @click="download_file($fullImgUrl(obj['album_file']))" class="btn" v-if="obj['album_file']">
                    下载文件
                  </button>
                  <!-- #ifdef MP-WEIXIN -->
                  <button
                    @click="preview_file($fullImgUrl(obj['album_file']))"
                    class="btn"
                    v-if="obj['album_file']"
                  >
                  预览
                  </button>
                  <!-- #endif -->
                </view>
                </view>
            </view>
        </view>
        <view class="row count">
              <view class="praise view">
              <span>点赞</span>
              <span>{{ obj["praise_len"] }}</span>
            </view>
  
              <view class="score view">
              <span>评分</span>
              <span>{{ obj["score"] }}</span>
            </view>
  
              <view class="hits view">
              <span>点击数</span>
              <span>{{ obj["hits"] }}</span>
            </view>
          </view>
      </view>

	<view class="kb-row">
      <view class="kb-wrap">
        <view class="me-btn"
              @click="to_form('/pagesA/novel_chapters/read?novel_reading_id=' + obj[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id')">
          阅读全文
        </view>
      </view>

	  <view class="kb-wrap">
	    <view class="me-btn btn_play"
	      @click="to_form('/pagesA/movie_episode/play?move_info_id=' + obj[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id')">
	      观看全集
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
              <view class="go-comment" @click="goComment('/pagesB/comment/edit?source_table=film_and_television_novels&source_field=film_and_television_novels_id&source_id=' + obj['film_and_television_novels_id'])">
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
        
                  </view>
            </view>
      </view>


    </view>
  </view>
</template>

<script>
  import list_comment from '@/components/diy/list_comment.vue';
import score_statistics_chart from '../components/score_statistics_chart.vue';
  import mixin from '@/libs/mixins/page.js';

  export default {
    mixins: [mixin],
    components: {
      list_comment,
      score_statistics_chart,
    },
    data() {
      return {
        active:  0 ,
        url_get_obj: '~/api/film_and_television_novels/get_obj?',
        field: 'film_and_television_novels_id',
        query: {
                film_and_television_novels_id: 0,
        },
        // 商品详情初始化
        obj: {
          film_and_television_novels_id: 0,
              album_name: "",
                  album_cover: "",
                  authors_name: "",
                  audio_content: "",
                  album_file: "",
              hits: 0,
          praise_len: 0,
          collect_len: 0,
          location_address: "", // 定位地址
          location_lng: 0, // 定位地址经度
          location_lat: 0, // 定位地址纬度
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
                  map_location: {
          location_lng: '', // 定位地址经度
          location_lat: '', // 定位地址纬度
        },
        score_num: 0,
        score_total: 0,
        scoreRefresh: false,
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
    scorePersonTotal(total) {
      this.score_total = total
      this.scoreRefresh = false;
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
              source_table: 'film_and_television_novels',
              source_field: 'film_and_television_novels_id',
              source_id: obj['film_and_television_novels_id'],
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
              source_table: 'film_and_television_novels',
              source_field: 'film_and_television_novels_id',
              source_id: obj['film_and_television_novels_id'],
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
          source_table: 'film_and_television_novels',
          source_field: 'film_and_television_novels_id',
          source_id: this.obj['film_and_television_novels_id'],
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
              this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj['film_and_television_novels_id'],
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
              this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj['film_and_television_novels_id'],
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
          source_table: 'film_and_television_novels',
          source_field: 'film_and_television_novels_id',
          source_id: obj['film_and_television_novels_id'],
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
          source_table: 'film_and_television_novels',
          source_field: 'film_and_television_novels_id',
          source_id: this.obj['film_and_television_novels_id'],
          user_id,
        };

        // 收藏状态
		var _this = this;
        if (this.state_collect) {
          this.state_collect = false;
          this.$get('~/api/collect/del', query, (res) => {
            if (res.result) {
			  var collect_len = _this.obj.collect_len - 1;
			  this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj['film_and_television_novels_id'],
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
              query.title = this.obj.album_name
                          query.img = this.obj.album_cover
                                      this.$post('~/api/collect/add?', query, (res) => {
            if (res.result) {
			  var collect_len = _this.obj.collect_len + 1;
			  this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj['film_and_television_novels_id'],
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
          source_table: 'film_and_television_novels',
          source_field: 'film_and_television_novels_id',
          source_id: obj['film_and_television_novels_id'],
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
                  source_table: 'film_and_television_novels',
                  source_field: 'film_and_television_novels_id',
                  source_id: obj['film_and_television_novels_id'],
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
            '~/api/film_and_television_novels/set?film_and_television_novels_id=' + obj['film_and_television_novels_id'],
            {
              hits,
            },
            (res) => {
              if (res.result) {
                console.log('添加访问量状态：', res.result);
                var body = {
                  source_table: 'film_and_television_novels',
                  source_field: 'film_and_television_novels_id',
                  source_id: this.obj.film_and_television_novels_id,
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
		  // 获取评分
		  this.get_score_num(obj);
        }
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
      async get_score_num(obj) {
        const url = `~/api/score/avg`;
        const params = {
          field: 'score_num',
          source_table: 'film_and_television_novels',
          source_field: 'film_and_television_novels_id',
          source_id: obj['film_and_television_novels_id'],
        };
        const res = await this.$get(url, params);
        if (res.result) {
          this.score_num = parseFloat(res.result.toFixed(1));
        }
      },
      go_score_num(obj) {
		  if(this.$check_option('/film_and_television_novels/details','can_score')){
			  this.$navTo(
			      '/pages/score/edit?source_table=film_and_television_novels&source_field=film_and_television_novels_id&source_id=' +
			      obj['film_and_television_novels_id'] + '&product_name=' + obj['product_name'] + '&followUser_id=' + this.obj.create_by
			  );
		  }
      },
    },
    created() {
                        },

    mounted() {
      this.getMapLocation();
    },
    onShow() {
      this.scoreRefresh = true;
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