<template>
  <view id="page_diy_details" class="page_diy_details page_schedule_of_sessions_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>场次安排</tn-nav-bar>
    <view class="page_diy page_schedule_of_sessions" id="schedule_of_sessions_details">
        
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'name_of_session')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>场次名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["name_of_session"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'schedule_of_sessions')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>场次安排</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["schedule_of_sessions"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'activity_arrangement')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>活动安排</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["activity_arrangement"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'activity_location')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>活动地点</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["activity_location"] }}                  </span>
                </view>
                </view>
            </view>
        </view>
      </view>

	<view class="kb-row">


	</view>





    </view>
  </view>
</template>

<script>
  import mixin from '@/libs/mixins/page.js';

  export default {
    mixins: [mixin],
    components: {
    },
    data() {
      return {
        url_get_obj: '~/api/schedule_of_sessions/get_obj?',
        field: 'schedule_of_sessions_id',
        query: {
                schedule_of_sessions_id: 0,
        },
        // 商品详情初始化
        obj: {
          schedule_of_sessions_id: 0,
              name_of_session: "",
                  schedule_of_sessions: "",
                  activity_arrangement: "",
                  activity_location: "",
            },
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
      openUrl(url) {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${url}`,
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
        }
      },
                    },
    created() {
                    },

    mounted() {
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