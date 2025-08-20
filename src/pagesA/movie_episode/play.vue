<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>视频播放</tn-nav-bar>
    <view class="page_movie_episode_play" v-if="list.length > 0">
      <uni-drawer ref="showLeft" mode="left">
        <scroll-view class="left_drawer" scroll-y="true">
          <text class="chapter_list_title">播放列表</text>
          <view class="chapter_list">
            <view
              @click="changeChapter(index)"
              v-for="(item, index) in list"
              :key="index"
              class="chapter_item"
              :class="{ active: currentChapterIndex === index }"
            >
              <text class="chapter_index">第{{ index + 1 }}集</text>
              <view class="chapter_name">{{ item.episode_name }}</view>
            </view>
          </view>
        </scroll-view>
      </uni-drawer>
      <view class="chapter_content">
        <text class="chapter_content_title">
          {{ list[currentChapterIndex].episode_name }}
        </text>
        <video
          class="video"
          id="myVideo"
          :autoplay="autoplay"
          :src="$fullImgUrl(list[currentChapterIndex].episode_url)"
          @error="videoErrorCallback"
          @ended="videoEndedCallback"
          controls
        ></video>
      </view>

      <view class="chapter_button">
        <view :disabled="currentChapterIndex <= 0" class="me-btn" @click="changeChapter('prev')">
          上一集
        </view>
        <view class="me-btn" @click="$refs.showLeft.open()">播放目录</view>
        <view
          :disabled="currentChapterIndex >= list.length - 1"
          class="me-btn"
          @click="changeChapter('next')"
        >
          下一集
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';

export default {
  mixins: [mixin],
  data() {
    return {
      field: 'move_info_id',
      url_get_list: '~/api/movie_episode/get_list?',
      query: {
        size: 7,
        page: 1,
        chapter_name: '',
        source_table: '',
        source_field: '',
        move_info_id: 0,
        orderby: `sort`,
      },
      list: [],
      currentChapterIndex: 0,
      fontSize: 16,
      autoplay: true,
    };
  },
  methods: {
    changeChapter(operate) {
      switch (operate) {
        case 'prev': {
          this.currentChapterIndex--;
          break;
        }
        case 'next': {
          this.currentChapterIndex++;
          break;
        }
        default: {
          this.currentChapterIndex = operate;
        }
      }
    },
    videoErrorCallback(e) {
      uni.showModal({
        content: e.target.errMsg || "播放失败",
        showCancel: false,
      });
    },
    videoEndedCallback() {
      console.log('videoEndedCallback', this.currentChapterIndex);
      console.log(this.list.length);
      if (this.currentChapterIndex < this.list.length - 1) {
        this.changeChapter('next');
      }
    },
  },
  watch: {
    currentChapterIndex(val) {
      // 获取当前路由
      const fullPath = this.$route.fullPath;
      const path = fullPath.replace(/&currentChapterIndex=\d+/, '').replace(/^\/pages[A-Z]?/, '');
      const params = {
        user_id: this.$store.state.app.userInfo.user_id,
        path: path,
      };
      this.$get(
        '~/api/history/get_list',
        params,
        (res) => {
          if (res.result) {
            let data = JSON.parse(JSON.stringify(res.result.list[0]));
            let params = JSON.parse(data.params);
            params.currentChapterIndex = val;
            const param = {
              params: JSON.stringify(params),
              title: this.list[this.currentChapterIndex]?.episode_name || ''
            };
            this.$post(`~/api/history/set?history_id=${data.history_id}`,param,(res) => {
              console.log("更新历史结果：", res);
            });
          }
        }
      );
      
    }
  },
  mounted() {
    if(this.$route.query.currentChapterIndex){
      this.currentChapterIndex = Number(this.$route.query.currentChapterIndex);
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
