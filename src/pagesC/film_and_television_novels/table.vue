<template>
  <view class="page_diy_table page_film_and_television_novels_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>影视小说列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="专辑名称" name="album_name">
                <uni-easyinput type="text" v-model="query.album_name" placeholder="专辑名称" />
              </uni-forms-item>
                <uni-forms-item label="作者姓名" name="authors_name">
                <uni-easyinput type="text" v-model="query.authors_name" placeholder="作者姓名" />
              </uni-forms-item>
              </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/film_and_television_novels/view?')" v-if="$check_action('/film_and_television_novels/table', 'add') || $check_action('/film_and_television_novels/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','album_name')">
            <view class="label" v-if="true">
              <span>专辑名称</span>
            </view>
              <view class="value">
              <span>{{ o['album_name'] }}</span>
            </view>
            </view>
          <view class="item-row diy-image" v-if="1 && $check_field('get','album_cover')">
            <view class="label" v-if=" false">
              <span>专辑封面</span>
            </view>
              <view class="value diy_img">
              <image :src="$fullImgUrl(o['album_cover'])" width="100%" height="100" />
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','authors_name')">
            <view class="label" v-if="true">
              <span>作者姓名</span>
            </view>
              <view class="value">
              <span>{{ o['authors_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','audio_content')">
            <view class="label" v-if="true">
              <span>音频内容</span>
            </view>
              <view class="value">
              <span>{{ o['audio_content'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','album_file')">
            <view class="label" v-if="true">
              <span>专辑文件</span>
            </view>
              <view class="value">
              <span>{{ o['album_file'] }}</span>
            </view>
            </view>
          <view class="content">
            <view class="item-row">
              <view class="value">点赞数{{ o['praise_len'] }}</view>
            </view>
            <view class="item-row">
              <view class="value">点击数{{ o['hits'] }}</view>
            </view>
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/film_and_television_novels/table', 'del') || $check_action('/film_and_television_novels/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/film_and_television_novels/view?' + field + '=' + o[field])"
                  v-if="$check_action('/film_and_television_novels/table', 'set') || $check_action('/film_and_television_novels/view', 'set') || $check_action('/film_and_television_novels/view', 'get')">
              详情
            </view>
              <view width="100%" @click=" $navTo('/pagesA/novel_chapters/table?novel_reading_id=' + o[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id')"class="me-btn btn-pay">
                内容设置
              </view>
			  <view width="100%" @click=" $navTo('/pagesA/movie_episode/table?move_info_id=' + o[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id')"class="me-btn btn-pay">
			    视频设置
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
      url_get_list: '~/api/film_and_television_novels/get_list?like=0',
      url_del: '~/api/film_and_television_novels/del',

      // 字段ID
      field: 'film_and_television_novels_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              album_name: "",
                      authors_name: "",
                  login_time: '',
        create_time: '',
      },
					      // 数据
      list: [],
                                            };
  },
  methods: {
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