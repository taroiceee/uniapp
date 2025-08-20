<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>章节阅读</tn-nav-bar>
    <view class="page_novel_chapters_read" v-if="list.length > 0">
      <uni-drawer ref="showLeft" mode="left">
        <scroll-view class="left_drawer" scroll-y="true">
          <text class="chapter_list_title">章节列表</text>
          <view class="chapter_list">
            <view
              @click="changeChapter(index)"
              v-for="(item, index) in list"
              :key="index"
              class="chapter_item"
              :class="{ active: currentChapterIndex === index }"
            >
              <text class="chapter_index">第{{ index + 1 }}章</text>
              <view class="chapter_name">{{ item.chapter_name }}</view>
            </view>
          </view>
        </scroll-view>
      </uni-drawer>
      <view class="chapter_content" :style="{ color: fontColor,backgroundColor: bgColor }">
        <text class="chapter_content_title">
          {{ list[currentChapterIndex].chapter_name }}
        </text>
        <rich-text
          :style="{ fontSize: fontSize + 'px' }"
          style="padding: 0 5px"
          :nodes="list[currentChapterIndex].chapter_content"
        ></rich-text>
      </view>
      <view class="chapter_font_wrapper">
        <text class="label">字体大小</text>
        <view class="input">
          <uni-easyinput v-model="fontSize"></uni-easyinput>
        </view>
      </view>
      <view class="chapter_font_wrapper">
        <text class="label">字体颜色</text>
        <view class="input">
          <uni-data-select
            v-model="fontColor"
            :localdata="fontColorOptions"
          ></uni-data-select>
        </view>
      </view>
      <view class="chapter_font_wrapper">
        <text class="label">背景颜色</text>
        <view class="input">
          <uni-data-select
            v-model="bgColor"
            :localdata="bgColorOptions"
          ></uni-data-select>
        </view>
      </view>
      <view class="chapter_font_wrapper">
        <view class="me-btn" style="margin-right: 10px" @click="bgColor !== 'rgb(204, 232, 207)'? bgColor = 'rgb(204, 232, 207)': bgColor = '#ffffff';fontColor='#000000'">护眼</view>
        <view class="me-btn" @click="douseGlim">{{bgColor === 'rgb(17, 17, 17)'? '开灯':'关灯'}}</view>
      </view>
      <view class="chapter_button">
        <view :disabled="currentChapterIndex <= 0" class="me-btn" @click="changeChapter('prev')">
          上一章
        </view>
        <view class="me-btn" @click="$refs.showLeft.open()">小说目录</view>
        <view
          :disabled="currentChapterIndex >= list.length - 1"
          class="me-btn"
          @click="changeChapter('next')"
        >
          下一章
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
      field: 'novel_reading_id',
      url_get_list: '~/api/novel_chapters/get_list?',
      query: {
        size: 7,
        page: 1,
        chapter_name: '',
        source_table: '',
        source_field: '',
        novel_reading_id: 0,
        orderby: `sort`,
      },
      list: [],
      currentChapterIndex: 0,
      fontSize: 16,
      fontColor: '#000000',
      fontColorOptions: [
        {
          value: '#000000',
          text: '默认'
        }, {
          value: '#9370db',
          text: '暗紫'
        }, {
          value: '#2e8b57',
          text: '藻绿'
        }, {
          value: '#2f4f4f',
          text: '深灰'
        }, {
          value: '#800000',
          text: '栗色'
        }, {
          value: '#6a5acd',
          text: '青蓝'
        }, {
          value: '#f5f5dc',
          text: '米色'
        }, {
          value: '#f5f5f5',
          text: '雾白'
        }
      ],
      bgColor: "#ffffff",
      bgColorOptions: [{
        value: '#ffffff',
        text: '默认'
      }, {
        value: 'rgb(255, 255, 237)',
        text: '明黄'
      }, {
        value: 'rgb(238, 250, 238)',
        text: '淡绿'
      }, {
        value: 'rgb(204, 232, 207)',
        text: '草绿'
      }, {
        value: 'rgb(239, 239, 239)',
        text: '深灰'
      }, {
        value: 'rgb(245, 245, 220)',
        text: '米色'
      }, {
        value: 'rgb(210, 180, 140)',
        text: '茶色'
      }, {
        value: 'rgb(192, 192, 192)',
        text: '银色'
      }, {
        value: 'rgb(17, 17, 17)',
        text: '暗黑'
      }]
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
    douseGlim() {
      if (this.bgColor !== 'rgb(17, 17, 17)') {
        this.bgColor = 'rgb(17, 17, 17)';
        this.fontColor = '#f5f5dc';
      } else {
        this.bgColor = '#ffffff';
        this.fontColor = '#000000';
      }
    }
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
              title: this.list[this.currentChapterIndex]?.chapter_name || ''
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
