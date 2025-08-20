<template>
  <view class="page_diy_table page_seating_arrangements_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>座位安排列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="场次名称" name="name_of_session">
                <uni-easyinput type="text" v-model="query.name_of_session" placeholder="场次名称" />
              </uni-forms-item>
                </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/seating_arrangements/view?')" v-if="$check_action('/seating_arrangements/table', 'add') || $check_action('/seating_arrangements/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','name_of_session')">
            <view class="label" v-if="true">
              <span>场次名称</span>
            </view>
              <view class="value">
              <span>{{ o['name_of_session'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','date_of_session')">
            <view class="label" v-if="true">
              <span>场次日期</span>
            </view>
              <view class="value">
              <span>{{ $toTime(o['date_of_session'], 'yyyy-MM-dd') }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','schedule_of_sessions')">
            <view class="label" v-if="true">
              <span>场次安排</span>
            </view>
              <view class="value">
              <span>{{ o['schedule_of_sessions'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','arrange_person_times')">
            <view class="label" v-if="true">
              <span>安排人次</span>
            </view>
              <view class="value">
              <span>{{ o['arrange_person_times'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/seating_arrangements/table', 'del') || $check_action('/seating_arrangements/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/seating_arrangements/view?' + field + '=' + o[field])"
                  v-if="$check_action('/seating_arrangements/table', 'set') || $check_action('/seating_arrangements/view', 'set') || $check_action('/seating_arrangements/view', 'get')">
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
      url_get_list: '~/api/seating_arrangements/get_list?like=0',
      url_del: '~/api/seating_arrangements/del',

      // 字段ID
      field: 'seating_arrangements_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              name_of_session: "",
                    login_time: '',
        create_time: '',
      },
				      // 数据
      list: [],
                        	  schedule_of_sessions_input_timer: null,
              };
  },
  methods: {
					schedule_of_sessions_input() {
			this.schedule_of_sessions_input_timer && clearTimeout(this.schedule_of_sessions_input_timer);
			this.schedule_of_sessions_input_timer = setTimeout(() => {
				if((this.query.schedule_of_sessions_min && this.query.schedule_of_sessions_max) || (!this.query.schedule_of_sessions_min && !this.query.schedule_of_sessions_max)) {
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
                                  },
  created() {
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