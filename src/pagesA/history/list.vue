<!-- // 增加前台用户的浏览记录开始 -->
<template>
  <view class="page_user_history" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>浏览记录</tn-nav-bar>
    <view class="user_history_wrapper" id="user_history_wrapper">
      <view class="list_wrapper">
        <list_history :list="list"></list_history>
      </view>
    </view>
  </view>
</template>

<script>
import list_history from '@/components/diy/list_history.vue';
import mixin from '@/libs/mixins/page.js';

export default {
  mixins: [mixin],
  components: {
    list_history,
  },
  data() {
    return {
      // 登录权限
      oauth: {
        signIn: true,
        user_group: [],
      },
      url_get_list: '~/api/history/get_list?',
      query: {
        user_id: 0,
      },
      list: [],
      type_names: [
        {
          name: '全部',
          value: 0,
        },
        {
          name: '文章',
          value: 'article',
        },
        {
          name: '商品',
          value: 'goods',
        },
        {
          name: '论坛',
          value: 'forum',
        },
      ],
      filter_title: '排序',
    };
  },
  methods: {
    get_list_before(param) {
      param.user_id = this.user.user_id;
      return param;
    },
    page_change(e) {
      console.log(e);
    },
    search_() {
      this.query.page = 1;
      this.get_list();
    },
    cancel() {
      this.title = '';
      this.search_();
    },
    input(e, key) {
      this.query[key] = e;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import 'styles/pages/index.scss';
</style>
<!-- // 增加前台用户的浏览记录结束 -->