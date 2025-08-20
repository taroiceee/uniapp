<template>
  <view class="page_diy_table page_offline_activities_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>线下活动列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="活动名称" name="activity_name">
                <uni-easyinput type="text" v-model="query.activity_name" placeholder="活动名称" />
              </uni-forms-item>
              <uni-forms-item label="活动类型" name="activity_type">
                        </uni-forms-item>
              <uni-forms-item label="活动日期" name="activity_date">
                <uni-easyinput type="text" v-model="query.activity_date" placeholder="活动日期" />
              </uni-forms-item>
                </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/offline_activities/view?')" v-if="$check_action('/offline_activities/table', 'add') || $check_action('/offline_activities/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','activity_name')">
            <view class="label" v-if="true">
              <span>活动名称</span>
            </view>
              <view class="value">
              <span>{{ o['activity_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','activity_type')">
            <view class="label" v-if="true">
              <span>活动类型</span>
            </view>
              <view class="value">
              <span>{{ o['activity_type'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','activity_date')">
            <view class="label" v-if="true">
              <span>活动日期</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['activity_date'], 'yyyy-MM-dd') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','number_of_enrolment')">
            <view class="label" v-if="true">
              <span>报名人数</span>
            </view>
              <view class="value">
              <span>{{ o['number_of_enrolment'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','promotional_vuser_ideo')">
            <view class="label" v-if="true">
              <span>宣传视频</span>
            </view>
              <view class="value">
              <span>{{ o['promotional_vuser_ideo'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','activity_description')">
            <view class="label" v-if="true">
              <span>活动描述</span>
            </view>
              <view class="value">
              <span>{{ o['activity_description'] }}</span>
            </view>
            </view>
          <view class="content">
            <view class="item-row">
              <view class="value">点赞数{{ o['praise_len'] }}</view>
            </view>
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/offline_activities/table', 'del') || $check_action('/offline_activities/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/offline_activities/view?' + field + '=' + o[field])"
                  v-if="$check_action('/offline_activities/table', 'set') || $check_action('/offline_activities/view', 'set') || $check_action('/offline_activities/view', 'get')">
              详情
            </view>
          </view>
        </view>
      </view>
      <!-- /列表 -->
      <!-- 分页器 -->
      <uni-pagination
        class="pager"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
      ></uni-pagination>
      <!-- /分页器 -->
    </view>
  </view>
</template>
<script>
import mixin from '@/libs/mixins/page.js';
export default {
  mixins: [mixin],
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/offline_activities/get_list?like=0',
      url_del: '~/api/offline_activities/del',

      // 字段ID
      field: 'offline_activities_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              activity_name: "",
                    activity_type: "",
                    activity_date: "",
                    login_time: '',
        create_time: '',
      },
						      // 数据
      list: [],
                    // 活动类型列表
      list_activity_type: [{value:"",text:"全部"}],
                        	  number_of_enrolment_input_timer: null,
                      };
  },
  methods: {
						number_of_enrolment_input() {
			this.number_of_enrolment_input_timer && clearTimeout(this.number_of_enrolment_input_timer);
			this.number_of_enrolment_input_timer = setTimeout(() => {
				if((this.query.number_of_enrolment_min && this.query.number_of_enrolment_max) || (!this.query.number_of_enrolment_min && !this.query.number_of_enrolment_max)) {
					this.search_();
				}
			}, 300);
		},
			    search_() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 重置
     */
    reset: function reset() {
                              uni.clear(this.query);
      uni.push(this.query, this.config);
      this.get_list();
    },
    delInfo(v) {
      let _this = this;
      uni.showModal({
        title: '删除',
        content: '此操作将永久删除该文件, 是否继续?',
        success: function (res) {
          if (res.confirm) {
            let list = [v];
            _this.delAll(list);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
	get_list_after(param){
	      let _this = this;
		},
              /**
     * 获取活动类型列表
     */
    async get_list_activity_type() {
                },
                                          },
  created() {
          // 初始化活动类型列表
    this.get_list_activity_type();
                      },
};
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .num_range {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
</style>