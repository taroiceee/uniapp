<template>
  <view id="page_statistics" class="page_user_center" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>统计图</tn-nav-bar>
    <view class="warp">
      <view class="container">
        <view class="row justify-content-between">
          <view class="col-12 col-md-3">
            <view class="card_menu">
              <!-- 左侧边栏 -->
            </view>
          </view>
          <view class="col-12 col-md-9">
            <view class="card_addres">
              <view class="warp">
                <view class="container-fluid">
                  <view class="d-row-line">
                    <view class="title">数据统计中心</view>
                  </view>
                  <view class="d-row" style="height: 300px">
                    <view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
                      <view class="card chart">
                        <h5 class="title">销售金额统计图</h5>
                        <uni-datetime-picker
                            v-model="line_obj_shop_money.month"
                            type="daterange"
                            @change="changeMonth($event, line_obj_shop_money)"
                            :disabled="line_obj_shop_money.loading"
                        />
                        <view style="margin-top: 10px">
                          销售金额总数：{{ line_obj_shop_money.total }}
                        </view>
                        <newLineChart
                            v-if="line_obj_shop_money.values.length > 0"
                            id="line_shop_money_chart"
                            :vm="line_obj_shop_money"
                            :title="'销售金额统计'"
                        >
                        </newLineChart>
                        <view v-else style="text-align: center; margin-top: 20px">
                          正在加载数据...请稍后
                        </view>
                      </view>
                    </view>
                    <view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
                      <view class="card chart">
                        <h5 class="title">销售数量统计图</h5>
                        <uni-datetime-picker
                            v-model="bar_obj_shop_num.month"
                            type="daterange"
                            @change="changeMonth($event, bar_obj_shop_num)"
                            :disabled="bar_obj_shop_num.loading"
                        />
                        <view style="margin-top: 10px">
                          销售数量总数：{{ bar_obj_shop_num.total }}
                        </view>
                        <newBarChart
                            v-if="bar_obj_shop_num.values.length > 0"
                            id="bar_obj_bar_chart"
                            :vm="bar_obj_shop_num"
                            :title="'销售数量统计'"
                        >
                        </newBarChart>
                        <view v-else style="text-align: center; margin-top: 20px">
                          正在加载数据...请稍后
                        </view>
                      </view>
                    </view>
                      <view class="d-col" v-if="user_group == '管理员' || $check_figure('/registered_user/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/business_user/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/fresh_goods/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/classification_information/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/customized_products/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/i_want_to_customize_it/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/evaluation_feedback/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/film_and_television_novels/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/offline_activities/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/schedule_of_sessions/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/seating_arrangements/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                        <view class="d-col" v-if="user_group == '管理员' || $check_figure('/feedback_on_opinions/table')" :span="8">
                      <view class="card chart">
                          </view>
                    </view>
                      <view class="d-col" v-if=" user_group !== '管理员' && !$check_option('/subject_exam/table', 'teacher') && $check_figure('/subject_exam/table')" :span="8">
                      <view class="card chart">
                        <h5 class="title">用户考试成绩统计</h5>
                        <subjectExamCharts
                            v-if="bar_obj_subject_exam.values.length > 0"
                            id="bar_obj_subject_exam"
                            :vm="bar_obj_subject_exam"
                            :title="'用户考试成绩统计统计'"
                            @changeTab="get_url_subject_exam_list"
                        >
                        </subjectExamCharts>
                        <view v-if="!bar_obj_subject_exam.values.length">
                          用户考试成绩统计没有符合条件的数据
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import mixin from '@/libs/mixins/page.js';
    import newBarChart from "./charts/new_bar_chart";
    import newLineChart from "./charts/new_line_chart";
    import subjectExamCharts from "./charts/subject_exam_charts.vue";

  export default {
    mixins: [mixin],
    data() {
      return {
                                                        line_obj_shop_money: {
          type: 'money',
          names: ['销售金额'],
          xAxis: [],
          values: [],
          month: [],
          loading: false,
          total: 0,
        },
        bar_obj_shop_num: {
          type: 'num',
          names: ['销售数量'],
          xAxis: [],
          values: [],
          month: [],
          loading: false,
          total: 0,
        },
        bar_obj_subject_exam: {
          names: [],
          xAxis: [],
          values: [],
          tabs: [],
        },
      };
    },
    mounted() {
    },
    methods: {
      async get_nickname(list, flag) {
        if (flag) {
          for (let i = 0; i < list.length; i++) {
            await this.$get('~/api/user/get_obj?user_id=' + list[i], null, (json) => {
              if (json.result) {
                list[i] = json.result.obj.nickname;
              }
            });
          }
        } else {
          for (let i = 0; i < list.length; i++) {
            await this.$get('~/api/user/get_obj?user_id=' + list[i].name, null, (json) => {
              if (json.result) {
                list[i].name = json.result.obj.nickname;
              }
            });
          }
        }
      },
      // 获取注册用户统计图数据
    get_list_registered_user() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_registered_user_sub(this.list_registered_user, i);
      }
    },
                                                                                                                                                        // 获取商家用户统计图数据
    get_list_business_user() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_business_user_sub(this.list_business_user, i);
      }
    },
                                                                                  // 获取生鲜商品统计图数据
    get_list_fresh_goods() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_fresh_goods_sub(this.list_fresh_goods, i);
      }
    },
                                                              // 获取分类信息统计图数据
    get_list_classification_information() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_classification_information_sub(this.list_classification_information, i);
      }
    },
                                          // 获取定制商品统计图数据
    get_list_customized_products() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_customized_products_sub(this.list_customized_products, i);
      }
    },
                                                                                                                                                                            // 获取我要定制统计图数据
    get_list_i_want_to_customize_it() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_i_want_to_customize_it_sub(this.list_i_want_to_customize_it, i);
      }
    },
                                                                                                                                                                                                                    // 获取评价反馈统计图数据
    get_list_evaluation_feedback() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_evaluation_feedback_sub(this.list_evaluation_feedback, i);
      }
    },
                                                                                                                                                        // 获取影视小说统计图数据
    get_list_film_and_television_novels() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_film_and_television_novels_sub(this.list_film_and_television_novels, i);
      }
    },
                                                              // 获取线下活动统计图数据
    get_list_offline_activities() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_offline_activities_sub(this.list_offline_activities, i);
      }
    },
                                                                        // 获取场次安排统计图数据
    get_list_schedule_of_sessions() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_schedule_of_sessions_sub(this.list_schedule_of_sessions, i);
      }
    },
                                                    // 获取座位安排统计图数据
    get_list_seating_arrangements() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_seating_arrangements_sub(this.list_seating_arrangements, i);
      }
    },
                                                    // 获取意见反馈统计图数据
    get_list_feedback_on_opinions() {
      for (var i = 6; i >= 0; i--) {
        this.get_list_feedback_on_opinions_sub(this.list_feedback_on_opinions, i);
      }
    },
                                                                                                                                    // 获取指定日期的数据
      async get_order_month_some_price(date, o) {
        function getDateBetween(start, end) {
          var result = [];
          //使用传入参数的时间
          var startTime = new Date(start);
          var endTime = new Date(end);
          while (endTime - startTime >= 0) {
            let year = startTime.getFullYear();
            let month = startTime.getMonth();
            month = month < 9 ? '0' + (month + 1) : month + 1;
            let day =
                startTime.getDate().toString().length === 1
                    ? '0' + startTime.getDate()
                    : startTime.getDate();
            //加入数组
            result.push(year + '-' + month + '-' + day);
            //更新日期
            startTime.setDate(startTime.getDate() + 1);
          }
          return result;
        }

        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1;
        const nowDate = now.getDate();
        let days = [];
        if (date) {
          days = getDateBetween(date[0], date[1]);
        } else {
          o.month[0] = new Date(nowYear, nowMonth - 1, 1, 0, 0, 0).toStr('yyyy-MM-dd');
          o.month[1] = new Date(nowYear, nowMonth - 1, nowDate, 23, 59, 59).toStr('yyyy-MM-dd');
          days = getDateBetween(o.month[0], o.month[1]);
        }

        o.xAxis = [];
        o.values = [];
        o.loading = true;
        let list = {
          result: [],
          total: 0,
        };
        let field = o.type === 'money' ? 'price_count' : 'num';
        for (let i = 0; i < days.length; i++) {
          const t = new Date(days[i]);
          const time = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
          o.xAxis.push(t.getMonth() + 1 + '-' + t.getDate());
          await this.get_order_sum_price_sub(list, time, i, field);
        }
        o.loading = false;
        o.values = list.result;
        o.total = list.total;
      },

      // 获取某一天的销售数量
      async get_order_sum_price_sub(list, date, index, field) {
        let user_group = this.userGroup;
        let user_id = this.userInfo.user_id;
        let time = new Date(date).toStr('yyyy-MM-dd');
        var $where = '';
        if (user_group != '管理员') $where = '&merchant_id=' + user_id;
        const json = await this.$get(
            `~/api/order/sum?field=${field}&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59&state=已付款` +
                    $where,
            null
        );
        list.result[index] = [];
        if (json.result) {
          list.total += json.result;
          list.result[index].push(json.result);
        } else {
          list.result[index].push(0);
        }
      },

      // 选择日期
      changeMonth(e, o) {
        this.get_order_month_some_price(e, o);
      },
      async get_url_subject_list() {
        const result = await this.$get('~/api/subject/get_list', null);
        for (let i = 0; i < result.result.list.length; i++) {
          this.bar_obj_subject_exam.tabs.push(result.result.list[i].name);
        }
        await this.get_url_subject_exam_list(this.bar_obj_subject_exam.tabs[0]);
        this.bar_obj_subject_exam.names = [this.bar_obj_subject_exam.tabs[0]];
      },
      async get_url_subject_exam_list(e) {
        const json = await this.$get('~/api/subject_exam/get_list?subject_name=' + e);
        const allResult = [];
        this.bar_obj_subject_exam.xAxis = [];
        for (let j = 0; j < json.result.list.length; j++) {
          this.bar_obj_subject_exam.xAxis.push(json.result.list[j].name);
          const value = await this.$get('~/api/subject_user_answer/get_list', {
            user_id: this.userInfo.user_id,
            exam_id: json.result.list[j].exam_id,
          });
          if (value.result.list.length <= 0) {
            allResult.push([]);
          } else {
            for (let k = 0; k < value.result.list.length; k++) {
              allResult.push([value.result.list[k].score]);
            }
          }
        }
        this.bar_obj_subject_exam.values = allResult;
        this.bar_obj_subject_exam.names = [e];
      },
    },
    created() {
        // 执行注册用户数据获取
      this.get_list_registered_user();
          // 执行商家用户数据获取
      this.get_list_business_user();
          // 执行生鲜商品数据获取
      this.get_list_fresh_goods();
          // 执行分类信息数据获取
      this.get_list_classification_information();
          // 执行定制商品数据获取
      this.get_list_customized_products();
          // 执行我要定制数据获取
      this.get_list_i_want_to_customize_it();
          // 执行评价反馈数据获取
      this.get_list_evaluation_feedback();
          // 执行影视小说数据获取
      this.get_list_film_and_television_novels();
          // 执行线下活动数据获取
      this.get_list_offline_activities();
          // 执行场次安排数据获取
      this.get_list_schedule_of_sessions();
          // 执行座位安排数据获取
      this.get_list_seating_arrangements();
          // 执行意见反馈数据获取
      this.get_list_feedback_on_opinions();
        this.get_order_month_some_price(null, this.line_obj_shop_money)
      this.get_order_month_some_price(null, this.bar_obj_shop_num)
      this.get_url_subject_list()
    },
    components: {
      newBarChart,
      newLineChart,
      subjectExamCharts,
    },
  };
</script>
<style lang="scss" scoped>
  @import 'styles/pagesA/index.scss';
</style>
