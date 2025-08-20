<template>
  <view id="page_exam_details" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>在线考试详情</tn-nav-bar>
    <view class="page_exam_details" id="exam_details">
      <view class="details_view">
        <view v-if="!if_answered && form.duration > 0" class="countdown">
          距离考试结束还有：<span>{{ minutes + ':' + seconds }}</span>
        </view>
        <!-- // 考试优化开始 -->
        <view v-if="if_answered && reuse_state" class="countdown">
            <text type="text" @click="reset" style="margin-right: 6px;">重新答题</text>
            <text type="text" @click="toLogPage">答题记录</text>
        </view>
        <!-- // 考试优化结束 -->
        <view>
          <view v-if="if_answered" class="col-24 col-lg-24 col-md-24">
            <view class="title_margin" style="margin-bottom: 20px" v-if="score_state === 0"
              >未评分</view
            >
            <view class="title_margin" style="margin-bottom: 20px" v-else
              >已评分，得分：<span style="color: red">{{ answer_form.score }}</span></view
            >
          </view>
        </view>
        <view v-for="(o, i) in question_list" :key="i">
          <view class="title_margin" v-if="o.type === '单选题'">
            {{ o.question_order + '.单选题：' + o.title + '   (' + o.score + '分)' }}
            <span v-if="if_answered" class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '多选题'">
            {{ o.question_order + '.多选题：' + o.title + '   (' + o.score + '分)' }}
            <span v-if="if_answered" class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '判断题'">
            {{ o.question_order + '.判断题：' + o.title + '   (' + o.score + '分)' }}
            <span v-if="if_answered" class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '填空题'">
            {{ o.question_order + '.填空题：' + o.title + '   (' + o.score + '分)' }}
            <span v-if="if_answered" class="score_show">
              <span v-if="score_state === 0">--------未评分</span>
              <span v-else>--------{{ answer_scores[i] }}分</span>
            </span>
          </view>
          <view class="title_margin" v-else>
            {{ o.question_order + '.主观题：' + o.title + '   (' + o.score + '分)' }}
            <span v-if="if_answered" class="score_show">
              <span v-if="score_state === 0">--------未评分</span>
              <span v-else>--------{{ answer_scores[i] }}分</span>
            </span>
          </view>
          <view v-if="o.type === '单选题'">
            <view class="uni-list">
              <radio-group v-model="answers[i]" @change="set_radio($event, i)">
                <label
                  style="margin-right: 20px"
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <radio :disabled="if_answered" :value="q" :checked="answers[i] == q" />{{ q }}
                </label>
              </radio-group>
            </view>
            <view class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
            <!-- // 考试优化开始 -->
            <view class="score_show" v-if="if_answered && answer_analysis[i]">
                答案解析：{{answer_analysis[i]}}
            </view>
            <!-- // 考试优化结束 -->
          </view>
          <view v-else-if="o.type === '多选题'">
            <view class="uni-list">
              <checkbox-group v-model="answers[i]" @change="set_checkbox($event, i)">
                <label
                  style="margin-right: 20px"
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <checkbox
                    :disabled="if_answered"
                    :value="q"
                    :checked="check_checkbox(answers[i], q)"
                  />{{ q }}
                </label>
              </checkbox-group>
            </view>
            <view class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
            <!-- // 考试优化开始 -->
            <view class="score_show" v-if="if_answered && answer_analysis[i]">
                答案解析：{{answer_analysis[i]}}
            </view>
            <!-- // 考试优化结束 -->
          </view>
          <view v-if="o.type === '判断题'">
            <view class="uni-list">
              <radio-group v-model="answers[i]" @change="set_radio($event, i)">
                <label
                  style="margin-right: 20px"
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <radio :disabled="if_answered" :value="q" :checked="answers[i] == q" />{{ q }}
                </label>
              </radio-group>
            </view>
            <view class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
            <!-- // 考试优化开始 -->
            <view class="score_show" v-if="if_answered && answer_analysis[i]">
                答案解析：{{answer_analysis[i]}}
            </view>
            <!-- // 考试优化结束 -->
          </view>
          <view v-else-if="o.type === '填空题'">
            <uni-easyinput
              type="text"
              :disabled="if_answered"
              class="answer_input"
              v-model="answers[i]"
            />
            <view class="score_show" v-if="if_answered">参考答案：{{ reference_answers[i] }}</view>
            <!-- // 考试优化开始 -->
            <view class="score_show" v-if="if_answered && answer_analysis[i]">
                答案解析：{{answer_analysis[i]}}
            </view>
            <!-- // 考试优化结束 -->
          </view>
          <view v-else-if="o.type === '主观题'">
            <textarea
              class="answer_textarea"
              :disabled="if_answered"
              v-model="answers[i]"
            ></textarea>
            <view class="score_show" v-if="if_answered">参考答案：{{ reference_answers[i] }}</view>
            <!-- // 考试优化开始 -->
            <view class="score_show" v-if="if_answered && answer_analysis[i]">
                答案解析：{{answer_analysis[i]}}
            </view>
            <!-- // 考试优化结束 -->
          </view>
        </view>
        <view v-if="if_answered" class="title_margin">
          <view class="answer_submit_user_str">
            <span>评语：</span>
            <textarea
              class="answer_textarea"
              :disabled="true"
              v-model="answer_form.comment_desc"
            ></textarea>
          </view>
        </view>
        <view class="title_margin">
          <view class="answer_submit_user_str">
            <span>提交人：</span>
            <uni-easyinput type="text" :disabled="true" v-model="submit_user_str" />
          </view>
        </view>
        <view class="answer_submit_button">
          <view class="answer_btn_box">
            <button v-if="!if_answered" class="answer_btn_submit" @click="submit()">提交</button>
            <button class="answer_btn_cancel" @click="cancel()">取消</button>
            <view class="clear"> </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';

export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      field: 'exam_id',
      url_add: '~/api/user_answer/add?',
      url_set: '~/api/user_answer/set?',
      url_get_obj: '~/api/exam/get_obj?',
      url_upload: '~/api/user_answer/upload?',

      query: {
        exam_id: 0,
      },

      form: {
        exam_id: 0,
        name: '',
        duration: 0,
        score: 0,
        status: '启用',
      },
      url_get_question_list: '~/api/exam_question/get_list?',
      question_list: [],
      answers: [],
      submit_user_str: '',
      answer_form: {
        user_answer_id: 0,
        user_id: 0,
        exam_id: 0,
        score: 0,
        score_state: 0,
        answers: [],
        score_detail: [],
        objective_score: 0,
        subjective_score: 0,
        nickname: '',
        comment_desc: '',
      },
      if_answered: false,
      maxtime: 0,
      minutes: 0,
      seconds: 0,
      timer: '',
      score_state: 0,
      answer_scores: [],
      reference_answers: [],
      // 考试优化开始
      answer_analysis: [],
      reuse_state: false,
      // 考试优化结束
    };
  },
  methods: {
    // 考试优化开始
    reset() {
      // 重置答案数组，需要区分多选题和其他题型
      this.answers = this.question_list.map(q => q.type === '多选题' ? [] : '');
      // 重置分数数组
      this.answer_scores = new Array(this.question_list.length).fill(0);
      // 重置参考答案数组
      this.reference_answers = new Array(this.question_list.length).fill('');
      // 重置答题状态
      this.if_answered = false;
      // 重置答题表单，确保包含所有必要字段
      this.answer_form = {
          user_id: this.user.user_id,
          exam_id: this.query.exam_id,
          answers: [],
          score_detail: [],
          score: 0,
          score_state: 0,
          objective_score: 0,
          subjective_score: 0,
          nickname: this.user.nickname,
          comment_desc: ''
      };
      // 重置评分状态
      this.score_state = 0;
      // 重置倒计时
      if (this.form.duration > 0) {
        clearInterval(this.timer);
        this.maxtime = this.form.duration * 60;
        this.timer = window.setInterval(() => {
            setTimeout(this.set_countdown(), 0)
        }, 1000);
      }
    },
    toLogPage() {
      uni.navigateTo({
        url: "/pagesA/exam/log_table?exam_id=" + this.query.exam_id
      })
    },
    // 考试优化结束
    async get_obj_after() {
      // 考试优化开始
      const exam = await this.$get("~/api/exam/get_obj?exam_id=" + this.query.exam_id);
      if (exam.result.obj.reuse_state == '启用'){
          this.reuse_state = true;
      }else{
          this.reuse_state = false;
      }
      // 考试优化结束
      let userJson = await this.$get('~/api/user/get_obj?user_id=' + this.userInfo.user_id);
      if (userJson.result) {
        this.submit_user_str = userJson.result.obj.username + '-' + userJson.result.obj.nickname;
        this.answer_form.user_id = userJson.result.obj.user_id;
        this.answer_form.nickname = userJson.result.obj.nickname;
        this.answer_form.comment_desc = userJson.result.obj.comment_desc;
      } else if (userJson.error) {
        console.error(userJson.error);
      }
      let json = await this.$get(
        this.url_get_question_list + 'exam_id=' + this.query.exam_id + '&orderby=question_order'
      );
      if (json.result) {
        this.question_list = json.result.list;
        for (let i = 0; i < this.question_list.length; i++) {
          if (this.question_list[i].type === '多选题') {
            this.answers[i] = [];
          } else {
            this.answers[i] = '';
          }
        }
      } else if (json.error) {
        console.error(json.error);
      }
      // 考试优化开始
      let answerJsonList = await this.$get(
        '~/api/user_answer/get_list?user_id=' +
          this.answer_form.user_id +
          '&exam_id=' +
          this.query.exam_id
      );
      
      let answerJson = {
					result:{
						obj:null
					}
				}
      // 遍历answerJsonList.result.list获取最新create_time时间数据
      answerJson.result.obj = answerJsonList.result.list.sort((a, b) => {
        return new Date(b.create_time) - new Date(a.create_time)
      })[0];
      // 考试优化结束
      if (answerJson.result && answerJson.result.obj != null) {
        this.answer_form = answerJson.result.obj;
        this.score_state = answerJson.result.obj.score_state;
        this.answer_form.answers = JSON.parse(this.answer_form.answers);
        this.answer_form.score_detail = JSON.parse(this.answer_form.score_detail);
        for (let i = 0; i < this.answer_form.answers.length; i++) {
          this.answers[i] = this.answer_form.answers[i].answer;
          this.answer_scores[i] = this.answer_form.score_detail[i].score;
          if (
            this.question_list[i].type === '单选题' ||
            this.question_list[i].type === '判断题' ||
            this.question_list[i].type === '多选题'
          ) {
            if (this.answer_scores[i] !== this.question_list[i].score) {
              this.reference_answers[i] = this.question_list[i].answer;
              // 考试优化开始
              this.answer_analysis[i]=this.question_list[i].answer_analysis;
              // 考试优化结束
            }
          } else {
            this.reference_answers[i] = this.question_list[i].answer;
            // 考试优化开始
            this.answer_analysis[i]=this.question_list[i].answer_analysis;
            // 考试优化结束
          }
        }
        this.if_answered = true;
      } else if (answerJson.error) {
        console.error(answerJson.error);
      }
      if (!this.if_answered && this.form.duration > 0) {
        this.maxtime = this.form.duration * 60;
        this.timer = setInterval(() => {
          this.$nextTick(() => {
            this.set_countdown();
          });
        }, 1000);
      }
    },
    get_question_list(question_str) {
      // 考试优化开始
      let question_list = question_str ? question_str.replace(/\\n/g, '\n').split(/\n/).filter(item => item.trim() !== '') : [];

      // 考试优化结束
      return question_list;
    },
    submit_main() {
      let _this = this;
      _this.answer_form.exam_id = _this.query.exam_id;
	  let objective = true;
      for (let i = 0; i < _this.answers.length; i++) {
        let obj = {
          exam_question_id: _this.question_list[i].exam_question_id,
          answer: _this.answers[i],
        };
        _this.answer_form.answers[i] = obj;
        if (_this.question_list[i].type === '单选题' || _this.question_list[i].type === '判断题') {
          if (_this.answers[i] === _this.question_list[i].answer) {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: _this.question_list[i].score,
            };
            _this.answer_form.score_detail[i] = obj;
            _this.answer_form.objective_score =
              _this.answer_form.objective_score + _this.question_list[i].score;
          } else {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: 0,
            };
            _this.answer_form.score_detail[i] = obj;
          }
        } else if (_this.question_list[i].type === '多选题') {
          let flag = true;
          let question_answer_list = _this.question_list[i].answer.split('|');
          if (_this.answers[i].length !== question_answer_list.length) {
            flag = false;
          } else {
            for (let j = 0; j < question_answer_list.length; j++) {
              if (_this.answers[i].indexOf(question_answer_list[j]) === -1) {
                flag = false;
                break;
              }
            }
          }
          if (flag) {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: _this.question_list[i].score,
            };
            _this.answer_form.score_detail[i] = obj;
            _this.answer_form.objective_score =
              _this.answer_form.objective_score + _this.question_list[i].score;
          } else {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: 0,
            };
            _this.answer_form.score_detail[i] = obj;
          }
        } else {
          let obj = {
            exam_question_id: _this.question_list[i].exam_question_id,
            score: 0,
          };
          _this.answer_form.score_detail[i] = obj;
		  objective = false;
        }
      }
      _this.answer_form.answers = JSON.stringify(_this.answer_form.answers);
      _this.answer_form.score_detail = JSON.stringify(_this.answer_form.score_detail);
      _this.answer_form.score =
        _this.answer_form.subjective_score + _this.answer_form.objective_score;
	  _this.answer_form.score_state = objective ? 1 : 0;
      let url = _this.url_add;
      this.$post(url, _this.answer_form, function (json, status) {
        console.log('提交结果：', json);
        if (json.result) {
          _this.events('submit_after', json, null);
        } else if (json.error) {
          _this.$toast(json.error.message, 'danger');
        }
      });
    },
    set_countdown() {
      if (this.maxtime >= 0) {
        this.minutes = Math.floor(this.maxtime / 60);
        this.seconds = Math.floor(this.maxtime % 60);
        --this.maxtime;
      } else {
        clearInterval(this.timer);
        alert('时间到，结束!');
        this.submit();
      }
    },
    check_checkbox(answer_list, choice) {
      for (let i = 0; i < answer_list.length; i++) {
        if (answer_list[i] === choice) {
          return true;
        }
      }
      return false;
    },
    set_radio(e, answer_index) {
      this.answers[answer_index] = e.detail.value;
    },
    set_checkbox(e, answer_index) {
      this.answers[answer_index] = e.detail.value;
    },
  },
  onLoad() {},
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
