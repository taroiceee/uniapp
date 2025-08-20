<template>
  <view id="page_diy_details" class="page_diy_details page_offline_activities_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>线下活动</tn-nav-bar>
    <view class="page_diy page_offline_activities" id="offline_activities_details">
            
      <view class="score_wrapper" v-if="$check_option('/offline_activities/details','can_show_score') || $check_option('/offline_activities/details','can_score')">
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
          sourcetable="offline_activities"
          sourcefield="offline_activities_id"
          :refresh="scoreRefresh"
          @scorePersonTotal="scorePersonTotal"
        ></score_statistics_chart>
      </view>
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'activity_name')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>活动名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["activity_name"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'activity_type')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>活动类型</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["activity_type"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'activity_date')" class="info-item field_time ">
                <view class="diy_title">
                  <span>活动日期</span>
                </view>
                    <view class="diy_field diy_date">
                  <span>
                    {{ $toTime(obj['activity_date'], 'yyyy-MM-dd') }}
                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'number_of_enrolment')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>报名人数</span>
                </view>
                    <view class="diy_field diy_number">
                    <span>
                        {{ obj['number_of_enrolment'] }}                    </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'promotional_vuser_ideo')" class="info-item field_file ">
                <view class="diy_title">
                  <span>宣传视频</span>
                </view>
                    <view class="diy_field diy_video">
                  <video
                          style="text-align: left"
                          :src="$fullImgUrl(obj['promotional_vuser_ideo'])"
                          controls
                          v-if="obj['promotional_vuser_ideo']"
                  ></video>
                </view>
                </view>
                <view v-if="$check_field('get', 'activity_description')" class="info-item field_text ">
                <view class="diy_title">
                  <span>活动描述</span>
                </view>
                    <view class="diy_field diy_desc">
                  <span>
                      {{ obj["activity_description"] }}
                  </span>
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
  
          </view>
      </view>

	<view class="kb-row">


	</view>


      <!-- 评论区列表 -->
      <view class="comment-title">评论区</view>
      <list_comment :list="list_comment" @refresh="get_comment"></list_comment>

      <view :style="'height: 100rpx'"></view>
      <view class="footer" :style="{ paddingBottom: vuex_safe_area_bottom + 'px' }">
        <view class="footer-wrap">
              <view class="go-comment" @click="goComment('/pagesB/comment/edit?source_table=offline_activities&source_field=offline_activities_id&source_id=' + obj['offline_activities_id'])">
            评论点什么...
          </view>
    
              <view class="more">
                    <view class="more-item praise" @click="change_praise()">
              <text class="iconfont icon-praise iconfont--active" v-if="state_praise"></text>
              <text class="iconfont icon-praise" v-else></text>
              <text>点赞</text>
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
        url_get_obj: '~/api/offline_activities/get_obj?',
        field: 'offline_activities_id',
        query: {
                offline_activities_id: 0,
        },
        // 商品详情初始化
        obj: {
          offline_activities_id: 0,
              activity_name: "",
                  activity_type: "",
                  activity_date: "",
                  number_of_enrolment: 0,
                  promotional_vuser_ideo: "",
                  activity_description: "",
              praise_len: 0,
        },
        // 点赞状态
        state_praise: false,
        // 点赞
        praise: 0,
        // 评论列表初始化
        list_comment: [],
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
              source_table: 'offline_activities',
              source_field: 'offline_activities_id',
              source_id: obj['offline_activities_id'],
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
              source_table: 'offline_activities',
              source_field: 'offline_activities_id',
              source_id: obj['offline_activities_id'],
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
          source_table: 'offline_activities',
          source_field: 'offline_activities_id',
          source_id: this.obj['offline_activities_id'],
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
              this.$post('~/api/offline_activities/set?offline_activities_id=' + _this.obj['offline_activities_id'],
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
              this.$post('~/api/offline_activities/set?offline_activities_id=' + _this.obj['offline_activities_id'],
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
       * 获取评论
       * @param {Object} obj
       */
      get_comment(obj) {
		if(obj == undefined){
			obj = this.obj
		}
        var query = {
          source_table: 'offline_activities',
          source_field: 'offline_activities_id',
          source_id: obj['offline_activities_id'],
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
                  source_table: 'offline_activities',
                  source_field: 'offline_activities_id',
                  source_id: obj['offline_activities_id'],
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
       * 获取对象之后
       * @param {Object} json 结果对象
       */
      get_obj_after(json) {
        // 判断是否获取到数据
        if (this.obj) {
          var obj = this.obj;
          // 获取点赞数
          this.get_praise(obj);
          // 获取评论
          this.get_comment(obj);
		  // 获取评分
		  this.get_score_num(obj);
        }
      },
                              async get_score_num(obj) {
        const url = `~/api/score/avg`;
        const params = {
          field: 'score_num',
          source_table: 'offline_activities',
          source_field: 'offline_activities_id',
          source_id: obj['offline_activities_id'],
        };
        const res = await this.$get(url, params);
        if (res.result) {
          this.score_num = parseFloat(res.result.toFixed(1));
        }
      },
      go_score_num(obj) {
		  if(this.$check_option('/offline_activities/details','can_score')){
			  this.$navTo(
			      '/pages/score/edit?source_table=offline_activities&source_field=offline_activities_id&source_id=' +
			      obj['offline_activities_id'] + '&product_name=' + obj['product_name'] + '&followUser_id=' + this.obj.create_by
			  );
		  }
      },
    },
    created() {
                            },

    mounted() {
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