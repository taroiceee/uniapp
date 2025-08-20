<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>视频列表</tn-nav-bar>
    <view class="page_movie_episode_table" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
          <uni-forms-item label="集数名称" name="episode_name">
            <uni-easyinput type="text" v-model="query.episode_name" placeholder="集数名称" />
          </uni-forms-item>
        </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search()"> 查询 </view>
        </view>
		<view class="toolbar">
		  <view
		    width="100%"
		    class="me-btn btn-add"
		    @click="
		      $navTo(
		        '/pagesA/movie_episode/view?move_info_id=' +
		          query.move_info_id +
		          '&source_table=' +
		          query.source_table +
		          '&source_field=' +
		          query.source_field
		      )
		    "
		  >
		    添加</view
		  >
		</view>
      </view>
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row">
            <view class="label">
              <span>集数名称</span>
            </view>
            <view class="value">
              <span>
                {{ o['episode_name'] }}
              </span>
            </view>
          </view>
          <view class="item-row">
            <view class="label">
              <span>排序</span>
            </view>
            <view class="value">
              <span>
                {{ o['sort'] }}
              </span>
            </view>
          </view>
          <view class="operate-bar">
            <view class="me-btn btn-delete" @click="delInfo(i)">删除</view>
            <view
              width="100%"
              @click="
                $navTo('/pagesA/movie_episode/view?movie_episode_id=' + o['movie_episode_id'])
              "
              class="me-btn btn-info"
              >详情</view
            >
          </view>
        </view>
      </view>
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
      url_get_list: '~/api/movie_episode/get_list?like=0',
      url_del: '~/api/movie_episode/del?',

      // 字段ID
      field: 'movie_episode_id',

      // 查询
      query: {
        size: 7,
        page: 1,
        episode_name: '',
        source_table: '',
        source_field: '',
        movie_episode_id: 0,
		move_info_id: 0,
        orderby: 'sort',
      },

      // 数据
      list: [],
    };
  },
  methods: {
    search() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 重置
     */
    reset() {
      this.query.episode_name = '';
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
  },
  created() {},
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
