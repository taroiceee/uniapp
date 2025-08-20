<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>答题记录</tn-nav-bar>
    <view class="page_answer_wrong_table" id="answer_wrong_table">
      <template>
        <uni-table ref="table" border emptyText="暂无更多数据">
          <uni-tr>
            <uni-th align="center">提交人</uni-th>
            <uni-th align="center">客观题得分</uni-th>
            <uni-th align="center">主观题得分</uni-th>
            <uni-th align="center">总分</uni-th>
            <uni-th align="center">评分状态</uni-th>
            <uni-th align="center">提交时间</uni-th>
            <uni-th align="center">评分时间</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(o, i) in list" :key="i">
            <uni-td>{{ o.nickname }}</uni-td>
            <uni-td>{{ o.objective_score }}</uni-td>
            <uni-td>{{ o.subjective_score }}</uni-td>
            <uni-td>{{ o.score }}</uni-td>
            <uni-td>{{ o.score_state == 1 ? "已评分" : "未评分" }}</uni-td>
            <uni-td>{{ $toTime(o['create_time'], 'yyyy-MM-dd hh:mm:ss') }}</uni-td>
            <uni-td>{{ $toTime(o['update_time'], 'yyyy-MM-dd hh:mm:ss') }}</uni-td>
            <uni-td>
              <view
                @click="
                  $navTo(
                    '/pagesA/exam/log_view?user_answer_id=' + o.user_answer_id
                  )
                "
                class="answer_link"
              >
                查看
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>

        <uni-pagination
          style="padding: 10px"
          show-icon="true"
          :total="count"
          :pageSize="query.size"
          :current="query.page"
          @change="page_change"
        ></uni-pagination>
      </template>
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
      url_get_list: '~/api/user_answer/get_list?like=0',
      // 字段ID
      field: 'user_answer_id',
      // 查询
      query: {
        size: 10,
        page: 1,
        exam_id: 0,
        nickname:"",
        score_state:""
      },
      user: {},
    };
  },
  created() {
    this.query.user_id = this.userInfo.user_id;
    setTimeout(() => {
      console.log(this.list);
      
    },500)
  },
  methods: {
    search_() {
      this.query.page = 1;
      this.get_list();
    },
    input(e, key) {
      this.query[key] = e;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
