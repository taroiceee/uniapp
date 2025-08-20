<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_exam_subject_list" id="exam_list">
    <tn-nav-bar>考试列表</tn-nav-bar>
    <view class="page_exam_subject_list" v-if="$check_action('/subject_exam/list', 'get')">
      <view class="wrapper-exam">
        <Search
          :value="query.name"
          placeholder="搜索名称"
          @input="(val) => inputValue(val, 'name')"
          @search="search_"
          @cancel="cancel"
        />

        <view class="split-line-10"></view>
        <view class="exam-category">
          <tn-grid :col="5">
            <block v-for="(item, index) in category_list" :key="index">
              <!-- #ifndef MP-WEIXIN -->
              <tn-grid-item>
                <view @click="clickCategory(item)" class="exam-category-item" hover-class="hover">
                  <image class="image" :src="'/static/img/default.png'" mode="widthFix"></image>
                  <text class="name">{{ item.name }}</text>
                </view>
              </tn-grid-item>
              <!-- #endif-->
              <!-- #ifdef MP-WEIXIN -->
              <tn-grid-item :style="{ width: gridItemWidth }">
                <view @click="clickCategory(item)" class="exam-category-item" hover-class="hover">
                  <image class="image" :src="'/static/img/default.png'" mode="widthFix"></image>
                  <text class="name">{{ item.name }}</text>
                </view>
              </tn-grid-item>
              <!-- #endif-->
            </block>
          </tn-grid>
        </view>

        <view class="error-record">
          <view class="left">
            <image class="image" :src="'/static/img/default.png'" mode="widthFix"></image>
            <text class="name">错题记录</text>
          </view>
          <view class="right">
            <view class="see-record" @click="$navTo('/pagesA/exam_subject/answer_wrong_table')"
              >立即查看<text class="iconfont icon-right"></text
            ></view>
          </view>
        </view>
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
                @click="$navTo('/pagesA/exam_subject/details?exam_id=' + item.exam_id)"
                v-if="answered_list[item.exam_id] && item.status === '启用'"
              >
                查看分数</view
              >
              <view
                class="me-btn btn-dt"
                v-else-if="$check_option('/subject_exam/list', 'answers') && item.status === '启用'"
                @click="$navTo('/pagesA/exam_subject/details?exam_id=' + item.exam_id)"
              >
                答题</view
              >
            </view>
          </view>
        </view>
      </view>

      <!-- <uni-table ref="table" border emptyText="暂无更多数据">
        <uni-tr>
          <uni-th align="center">科目</uni-th>
          <uni-th align="center">名称</uni-th>
          <uni-th align="center">答题时长</uni-th>
          <uni-th align="center">总分</uni-th>
          <uni-th align="center">操作</uni-th>
        </uni-tr>
        <uni-tr v-for="(o, i) in list" :key="i">
          <uni-td>{{ o.subject_name }}</uni-td>
          <uni-td>{{ o.name }}</uni-td>
          <uni-td>{{ o.duration }}</uni-td>
          <uni-td>{{ o.score }}</uni-td>
          <uni-td>
            <view
              @click="$navTo('/pagesA/exam_subject/details?exam_id=' + o.exam_id)"
              class="answer_link"
              v-if="answered_list[o.exam_id]"
            >
              查看分数
            </view>
            <view
              v-else-if="$check_option('/subject_exam/list', 'answers') && o.status === '启用'"
              @click="$navTo('/pagesA/exam_subject/details?exam_id=' + o.exam_id)"
              class="answer_link"
            >
              答题
            </view>
          </uni-td>
        </uni-tr>
      </uni-table> -->

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
      url_get_list: '~/api/subject_exam/get_list?like=0',
      url_del: '~/api/subject_exam/del?',

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
        '~/api/subject_user_answer/get_obj?user_id=' + this.userInfo.user_id + '&exam_id=' + exam_id
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
    clickCategory(item) {
      //  this.query.name = '';
      if (item.key > -1) {
        this.query.subject_name = item.value;
        this.search_();
      } else {
		delete this.query.subject_name
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
