<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>测评问卷</tn-nav-bar>
    <view
      class="page_evaluation_list"
      id="evaluation_list"
      v-if="$check_action('/evaluation/list', 'get')"
    >
      <view class="evaluation_wrapper">
        <Search
          :value="query.name"
          placeholder="搜索名称"
          @input="(val) => inputValue(val, 'name')"
          @search="search_"
          @cancel="cancel"
        />

        <view class="split-line-10"></view>
        <view class="evaluation_list">
          <view class="evaluation_item" v-for="(item, index) in list" :key="index">
            <view class="evaluation_item_left">
              <view class="title_wrap">
                <view class="evaluation_status open" v-if="item.status === '启用'">{{
                  item.status
                }}</view>
                <view class="evaluation_status disable" v-else>{{ item.status }}</view>
                <view class="title">{{ item.name }} </view>
              </view>

              <view class="info_row">
                <view class="info_row_item">
                  <view><text class="icon iconfont icon-shijian"></text> 答题时长</view>
                  <view>{{ item.duration }}</view>
                </view>
                <!-- <view class="info-row-item">
                  <view> <text class="icon iconfont icon-tongjitubiao"></text> 总分</view>
                  <view>{{ item.score }}</view>
                </view> -->
              </view>
            </view>

            <view class="evaluation_item_right">
              <view
                class="me-btn btn_dt"
                @click="$navTo('/pagesA/evaluation/details?is_see=0&exam_id=' + item.exam_id)"
                v-if="answered_list[item.exam_id] && item.status === '启用'"
              >
                查看</view
              >
              <view
                class="me-btn btn_dt"
                v-else-if="$check_option('/evaluation/list', 'answers') && item.status === '启用'"
                @click="$navTo('/pagesA/evaluation/details?is_see=1&exam_id=' + item.exam_id)"
              >
                答题</view
              >
            </view>
          </view>
        </view>
      </view>

      <uni-pagination
        style="padding: 10px"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
      ></uni-pagination>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
import Search from '@/components/businessCp/search.vue';
export default {
  mixins: [mixin],
  components: {
    Search,
  },
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/evaluation/get_list?like=0',
      url_del: '~/api/evaluation/del?',

      // 字段ID
      field: 'exam_id',

      // 查询
      query: {
        size: 10,
        page: 1,
        name: '',
        subject_name: '',
      },

      // 数据
      list: [],
      answered_list: [],
      category_list: [
        {
          name: '全部科目',
          value: '全部科目',
          key: -1,
        },
      ],
    };
  },
  methods: {
    get_list_after() {
      for (let i = 0; i < this.list.length; i++) {
        this.get_user_answer_state(this.list[i].exam_id);
      }
    },
    get_user_answer_state(exam_id) {
      let _this = this;
      this.$get(
        '~/api/evaluation_user_answer/get_obj?user_id=' +
          this.userInfo.user_id +
          '&exam_id=' +
          exam_id
      ).then((res) => {
        if (res.result && res.result.obj != null) {
          _this.$set(_this.answered_list, exam_id, true);
        } else {
          _this.$set(_this.answered_list, exam_id, false);
        }
      });
    },
    inputValue(val, key) {
      this.query[key] = val;
    },
    search_() {
      this.query.page = 1;
      this.get_list();
    },
    cancel() {
      this.query.name = '';
      this.search_();
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
