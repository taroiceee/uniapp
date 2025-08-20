<template>
  <view id="page_exam_list" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>在线考试列表</tn-nav-bar>
    <view class="page_exam_list" v-if="$check_action('/exam/list', 'get')">
      <view class="wrapper-exam">
        <Search
          :value="query.name"
          placeholder="搜索名称"
          @input="(val) => inputValue(val, 'name')"
          @search="search_"
          @cancel="cancel"
        />

        <view class="split-line-10"></view>
        <!-- <view class="exam-category">
          <tn-grid :col="5">
            <block v-for="(item, index) in category_list" :key="index">
              #ifndef MP-WEIXIN
              <tn-grid-item>
                <view @click="clickCategory(item)" class="exam-category-item" hover-class="hover">
                  <image class="image" :src="'/static/img/default.png'" mode="widthFix"></image>
                  <text class="name">{{ item.name }}</text>
                </view>
              </tn-grid-item>
              #endif
              #ifdef MP-WEIXIN
              <tn-grid-item :style="{ width: gridItemWidth }">
                <view @click="clickCategory(item)" class="exam-category-item" hover-class="hover">
                  <image class="image" :src="'/static/img/default.png'" mode="widthFix"></image>
                  <text class="name">{{ item.name }}</text>
                </view>
              </tn-grid-item>
              #endif
            </block>
          </tn-grid>
        </view> -->
        <view class="split-line-10"></view>
        <view class="exam-list">
          <view class="exam-item" v-for="(item, index) in list" :key="index">
            <view class="exam-item-left">
              <view class="title-wrap">
                <view class="exam-status open" v-if="item.status === '启用'">{{
                  item.status
                }}</view>
                <view class="exam-status disable" v-else>{{ item.status }}</view>
                <view class="title">{{ item.name }} </view>
              </view>

              <view class="info-row">
                <view class="info-row-item">
                  <view><text class="icon iconfont icon-shijian"></text> 答题时长</view>
                  <view>{{ item.duration }}</view>
                </view>
                <view class="info-row-item">
                  <view> <text class="icon iconfont icon-tongjitubiao"></text> 总分</view>
                  <view>{{ item.score }}</view>
                </view>
              </view>
            </view>

            <view class="exam-item-right">
              <view
                class="me-btn btn-dt"
                @click="$navTo('/pagesA/exam/details?exam_id=' + item.exam_id)"
                v-if="answered_list[item.exam_id] && item.status === '启用'"
              >
                查看分数</view
              >
              <view
                class="me-btn btn-dt"
                v-else-if="$check_exam('/exam/list', 'answers') && item.status === '启用'"
                @click="$navTo('/pagesA/exam/details?exam_id=' + item.exam_id)"
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
import Search from '@/components/businessCp/search.vue';
import mixin from '@/libs/mixins/page.js';

export default {
  mixins: [mixin],
  components: {
    Search,
  },
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/exam/get_list?like=0',
      url_del: '~/api/exam/del?',

      // 字段ID
      field: 'exam_id',

      // 查询
      query: {
        size: 10,
        page: 1,
        name: '',
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
        '~/api/user_answer/get_obj?user_id=' + this.userInfo.user_id + '&exam_id=' + exam_id
      ).then((res) => {
        console.log(res);
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
    clickCategory(item) {
      //  this.query.name = '';
      if (item.key > -1) {
        this.query.subject_name = item.value;
        this.search_();
      } else {
        this.get_list();
      }
    },
    getCategoryList() {
      this.$get('~/api/subject/get_list', null).then((res) => {
        console.log(res);

        const list = res.result.list.map((item) => {
          return {
            key: item.subject_id,
            name: item.name,
            value: item.name,
          };
        });
        this.category_list.push(...list);
      });
    },
  },
  mounted() {},
  created() {
    this.getCategoryList();
  },
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
