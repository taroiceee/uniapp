<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>考试详情</tn-nav-bar>
    <view class="page_exam_subject_details" id="exam_details">
      <view class="details_view">
        <view>
          <view class="col-24 col-lg-24 col-md-24">
            <view class="title_margin" style="margin-bottom: 20px" v-if="form.score_state === 1"
              >已评分，得分：<span style="color: red">{{ form.score }}</span></view
            >
          </view>
        </view>
        <view v-for="(o, i) in question_list" :key="i">
          <view class="title_margin" v-if="o.type === '单选题'">
            {{ o.question_order + '.单选题：' + o.title + '   (' + o.score + '分)' }}
            <span class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '多选题'">
            {{ o.question_order + '.多选题：' + o.title + '   (' + o.score + '分)' }}
            <span class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '判断题'">
            {{ o.question_order + '.判断题：' + o.title + '   (' + o.score + '分)' }}
            <span class="score_show">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else-if="o.type === '填空题'">
            {{ o.question_order + '.填空题：' + o.title + '   (' + o.score + '分)' }}
            <span class="score_show" v-if="if_scored">--------{{ answer_scores[i] }}分</span>
          </view>
          <view class="title_margin" v-else>
            {{ o.question_order + '.主观题：' + o.title + '   (' + o.score + '分)' }}
            <span class="score_show" v-if="if_scored">--------{{ answer_scores[i] }}分</span>
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
                  <radio :disabled="true" :value="q" :checked="answers[i] == q" />
                  {{ q }}
                </label>
              </radio-group>
            </view>
            <view v-if="if_scored && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
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
                    :disabled="true"
                    :value="q"
                    :checked="check_checkbox(answers[i], q)"
                  />
                  {{ q }}
                </label>
              </checkbox-group>
            </view>
            <view v-if="if_scored && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
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
                  <radio :disabled="true" :value="q" :checked="answers[i] == q" />
                  {{ q }}
                </label>
              </radio-group>
            </view>
            <view v-if="if_scored && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
          </view>
          <view v-else-if="o.type === '填空题'">
            <uni-easyinput
              type="text"
              :disabled="true"
              class="answer_input"
              v-model="answers[i]"
            />
            <view v-if="if_scored && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
          </view>
          <view v-else-if="o.type === '主观题'">
            <textarea
              class="answer_textarea"
              :disabled="true"
              v-model="answers[i]"
            ></textarea>
            <view v-if="if_scored && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </view>
          </view>
        </view>
        <view class="title_margin" v-if="if_scored && form.comment_desc">
          <view class="answer_submit_user_str">
            <span>评语：</span>
            <textarea
              class="answer_textarea"
              :disabled="true"
              v-model="form.comment_desc"
            ></textarea>
          </view>
        </view>
        <view class="title_margin">
          <view class="answer_submit_user_str">
            <span>提交人：</span>
            <uni-easyinput type="text" :disabled="true" v-model="form.nickname" />
          </view>
        </view>
        <view class="answer_submit_button">
          <view class="answer_btn_box">
            <button class="answer_btn_cancel" @click="cancel()">返回</button>
            <view class="clear"></view>
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
      field: 'user_answer_id',
      url_add: '~/api/subject_user_answer/add?',
      url_set: '~/api/subject_user_answer/set?',
      url_get_obj: '~/api/subject_user_answer/get_obj?',
      url_upload: '~/api/subject_user_answer/upload?',
      url_get_exam_question: '~/api/subject_exam_question/get_obj?',
      url_add_user_answer_wrong: '~/api/user_answer_wrong/add?',

      query: {
        user_answer_id: 0,
      },

      form: {
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
        comment_desc: null,
      },
      url_get_question_list: '~/api/subject_exam_question/get_list?',
      question_list: [],
      answers: [],
      if_scored: false,
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
      reference_answers: []
    };
  },
  methods: {
    async get_obj_after(json_back, func) {
      this.form = json_back.result.obj;
      if (this.form.score_state === 1 && this.form.comment_desc != null) {
        this.if_scored = true;
      }
      let json = await this.$get(
        this.url_get_question_list + 'exam_id=' + this.form.exam_id + '&orderby=question_order'
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
      this.form.answers = JSON.parse(this.form.answers);
      this.form.score_detail = JSON.parse(this.form.score_detail);
      for (let i = 0; i < this.form.answers.length; i++) {
        this.answers[i] = this.form.answers[i].answer;
        this.answer_scores[i] = this.form.score_detail[i].score;
        if (
          this.question_list[i].type === '单选题' ||
          this.question_list[i].type === '判断题' ||
          this.question_list[i].type === '多选题'
        ) {
          if (this.answer_scores[i] !== this.question_list[i].score) {
            this.reference_answers[i] = this.question_list[i].answer;
          }
        } else {
          this.reference_answers[i] = this.question_list[i].answer;
        }
      }
      // 设置提交人信息
      this.submit_user_str = this.form.nickname;
    },
    get_question_list(question_str) {
      // 考试优化开始
      let question_list = question_str ? question_str.replace(/\\n/g, '\n').split(/\n/).filter(item => item.trim() !== '') : [];
      // 考试优化结束
      return question_list;
    },
    //根据问题ID从json列表中取出答案对象
    get_answer_wrong_by_id(jsonList, exam_question_id) {
      let list = JSON.parse(jsonList);
      for (let i = 0; i < list.length; i++) {
        let answer = list[i];
        if (answer.exam_question_id == exam_question_id) {
          console.log(answer);
          return answer;
        }
      }
      return null;
    },
    //提交错题记录，把user_answer表中的answers字段json解析出来，转存到user_answer_wrong表中
    async post_user_answer_wrong() {
      for (let i = 0; i < this.question_list.length; i++) {
        let exam_question = this.question_list[i];

        if (exam_question.exam_question_id) {
          let json = await this.$get(
            this.url_get_exam_question + 'exam_question_id=' + exam_question.exam_question_id
          );

          if (json.result) {
            let obj = this.get_answer_wrong_by_id(
              this.answer_form.answers,
              exam_question.exam_question_id
            );

            let questionObj = json.result.obj;

            //填空题和主观题不列入错记录
            if (questionObj.type == '填空题' || questionObj.type == '主观题') {
              continue;
            }

            let answer_wrong_form = {
              subject_name: json.result.obj.subject_name,
              type: json.result.obj.type,
              title: json.result.obj.title,
              question_item: json.result.obj.question_item,
              answers: JSON.stringify(obj.answer),
              answer: json.result.obj.answer.length > 0 ? json.result.obj.answer : '',
              nickname: this.answer_form.nickname,
              user_id: this.userInfo.user_id,
			  exam_id: this.query.exam_id
            };

            let submitAnswer = obj.answer;
            if (json.result.obj.type == '多选题') {
              submitAnswer = obj.answer.join('|');
            }

            if (exam_question.answer.toString() != submitAnswer) {
              this.$post(
                this.url_add_user_answer_wrong,
                answer_wrong_form,
                function (json, status) {
                  console.log('提交错题结果：', json);
                }
              );
            }
          }
        }
      }
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
      //提交错题记录
      this.post_user_answer_wrong();

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
