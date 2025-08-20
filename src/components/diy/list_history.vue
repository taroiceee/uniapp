<!-- // 增加前台用户的浏览记录开始 -->
<template>
  <view class="list_history">
    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
    <view class="item_history" v-for="(o, i) in historyList" :key="i">
      <view @click="navHandle(o)" class="history_box">
        <view class="left_block">
          <image
            style="width: 3rem; height: 3rem"
            :src="$fullImgUrl(o[vm.img]) || '/static/img/avatar.jpg'"
          ></image>
        </view>
        <view class="right_block">
          <view class="top_comment">
            <view class="title">
              {{ o[vm.title] }}
            </view>
          </view>
        </view>
      </view>
      <view class="me-btn btn_del" @click="del_collect(o[vm.history_id], i)"> 删除 </view>
      <view class="time">
        {{ $toTime(o[vm.update_time], 'yyyy-MM-dd hh:mm:ss') }}
      </view>
    </view>
    <o-empty v-if="!historyList.length" text="暂无记录" />
  </view>
</template>

<script>
import { historyList } from "@/router/historyList.js";
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    vm: {
      type: Object,
      default: function () {
        return {
          img: 'img',
          title: 'title',
          update_time: 'update_time',
          history_id: 'history_id',
          source_table: 'source_table',
          source_field: 'source_field',
          source_id: 'source_id',
        };
      },
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  computed: {
    tabs() {
      let tabs = historyList.filter((item, index, self) => {
        return self.findIndex((t) => t.type === item.type) === index;
      }).map((item) => {
        return item.type;
      });
      return tabs;
    },
    historyList() {
      let list = this.list.filter((item) => {
        return item.type == this.tabs[this.current];
      });
      return list;
    }
  },
  methods: {
    changeTab(index) {
      console.log('当前选中的项：' + index)
    },
    del_collect(history_id, index) {
      this.$get(
        '~/api/history/del',
        {
          history_id,
        },
        (res) => {
          this.list.splice(index, 1);
        }
      );
    },
    navHandle(h) {
      if(h.path == 'audio') return
      const specialList = ['/novel_chapters/read','/movie_episode/play']
      if(h.path.indexOf('?') == -1){
        this.$navTo(
          h.path
        );
      }else {
        let pathArr = h.path.split('?')
        let path = pathArr[0].replace(/^\/pages[A-Z]?/, '')
        if(specialList.indexOf(path)!= -1) {
          let params = JSON.parse(h.params)
          if(params.currentChapterIndex) {
            let toPath = h.path + '&currentChapterIndex=' + params.currentChapterIndex
            this.$navTo(
              toPath
            );
            return
          }
        }
        this.$navTo(
          h.path
        );
      }
    
    },
  },
};
</script>

<style lang="scss" scoped>
// @import 'styles/components/index.scss';
</style>
<!-- // 增加前台用户的浏览记录结束 -->
