<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>测评问卷详情</tn-nav-bar>
    <view class="page_evaluation_details" id="evaluation_details">
      <view class="details_view" v-if="question_list.length > 0">
        <view v-if="!if_answered && !is_see" class="countdown">
          距离答题结束还有：<span>{{ minutes + ':' + seconds }}</span>
        </view>

        <view v-if="is_see" class="comment_state">
          <view v-if="comment_state == 0"> 未点评 </view>
          <view v-else> 已点评 </view>
        </view>
        <view v-for="(o, i) in question_list" :key="i" class="question_list">
          <view class="question_item" v-if="o.type === '单选题'">
            {{ o.question_order + '.单选题：' + o.title }}
          </view>
          <view class="question_item" v-else-if="o.type === '多选题'">
            {{ o.question_order + '.多选题：' + o.title }}
          </view>
          <view class="question_item" v-else-if="o.type === '判断题'">
            {{ o.question_order + '.判断题：' + o.title }}
          </view>
          <view class="question_item" v-else-if="o.type === '填空题'">
            {{ o.question_order + '.填空题：' + o.title }}
          </view>
          <view class="question_item" v-else>
            {{ o.question_order + '.主观题：' + o.title }}
          </view>
          <view v-if="o.type === '单选题'">
            <view class="answer_list">
              <radio-group
                class="uni_radio_group"
                v-model="answers[i]"
                @change="set_radio($event, i)"
              >
                <label
                  class="uni_radio_group_item"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <radio :disabled="if_answered" :value="q" :checked="answers[i] == q" />
                  <!-- // 测评优化开始 -->
                  {{ q.split('|')[0] }}
                  <!-- // 测评优化结束 -->
                </label>
              </radio-group>
            </view>
          </view>
          <view v-else-if="o.type === '多选题'">
            <view class="answer_list">
              <checkbox-group
                class="uni_checkbox_group"
                v-model="answers[i]"
                @change="set_checkbox($event, i)"
              >
                <label
                  class="uni_checkbox_group_item"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <checkbox
                    :disabled="if_answered"
                    :value="q"
                    :checked="check_checkbox(answers[i], q)"
                  />
                  <!-- // 测评优化开始 -->
                  {{ q.split('|')[0] }}
                  <!-- // 测评优化结束 -->
                </label>
              </checkbox-group>
            </view>
          </view>
          <view v-if="o.type === '判断题'">
            <view class="answer_list">
              <radio-group
                class="uni_radio_group"
                v-model="answers[i]"
                @change="set_radio($event, i)"
              >
                <label
                  class="uni_radio_group_item"
                  v-for="q in get_question_list(o.question_item)"
                  :key="q"
                >
                  <radio :disabled="if_answered" :value="q" :checked="answers[i] == q" />
                  <!-- // 测评优化开始 -->
                  {{ q.split('|')[0] }}
                  <!-- // 测评优化结束 -->
                </label>
              </radio-group>
            </view>
          </view>
          <view v-else-if="o.type === '填空题'">
            <uni-easyinput
              type="text"
              :disabled="if_answered"
              class="answer_input"
              v-model="answers[i]"
            />
          </view>
          <view v-else-if="o.type === '主观题'">
            <textarea
              class="answer_textarea"
              :disabled="if_answered"
              v-model="answers[i]"
            ></textarea>
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
        <view class="submit_info">
          <span>提交人：</span>
          <span>{{ submit_user_str }}</span>
        </view>
        <view class="answer_btn_box">
          <view v-if="!if_answered" class="me-btn answer_btn_submit" @click="submit()">提交</view>
          <view class="me-btn answer_btn_cancel" @click="cancel()">取消</view>
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
      url_add: '~/api/evaluation_user_answer/add?',
      url_set: '~/api/evaluation_user_answer/set?',
      url_get_obj: '~/api/evaluation/get_obj?',
      url_upload: '~/api/evaluation_user_answer/upload?',
      url_get_exam_question: '~/api/evaluation_question/get_obj?',
      url_add_user_answer_wrong: '~/api/user_answer_wrong/add?',
      is_see: true,
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
      url_get_question_list: '~/api/evaluation_question/get_list?',
      question_list: [],
      answers: [],
      submit_user_str: '',
      answer_form: {
        user_answer_id: 0,
        user_id: 0,
        exam_id: 0,
        answers: [],
        nickname: '',
        comment_desc: '',
      },
      if_answered: false,
      maxtime: 0,
      minutes: 0,
      seconds: 0,
      timer: '',
      comment_state: 0,
    };
  },
  methods: {
    // 测评优化开始
    findClosestInterval(arr, target) {
      if (arr.length === 0) return null;
      
      // 将目标值转换为数字（如果可以）
      const targetNum = typeof target === 'string' ? parseFloat(target) : Number(target);
      if (isNaN(targetNum)) {
          throw new Error('Target value cannot be converted to a number');
      }
      
      let closestObj = null;
      let smallestDistance = Infinity;
      
      for (const obj of arr) {
          // 尝试将 score_min 和 score_max 转换为数字
          const scoreMin = typeof obj.score_min === 'string' ? parseFloat(obj.score_min) : Number(obj.score_min);
          const scoreMax = typeof obj.score_max === 'string' ? parseFloat(obj.score_max) : Number(obj.score_max);
          
          // 检查转换是否有效
          if (isNaN(scoreMin) || isNaN(scoreMax)) {
          continue; // 跳过无效的区间
          }
          
          // 如果目标在区间内，直接返回这个对象
          if (targetNum >= scoreMin && targetNum <= scoreMax) {
          return obj;
          }
          
          // 计算到区间两端的距离
          const distanceToMin = Math.abs(scoreMin - targetNum);
          const distanceToMax = Math.abs(scoreMax - targetNum);
          const minDistance = Math.min(distanceToMin, distanceToMax);
          
          // 如果比当前最小距离更小，更新结果
          if (minDistance < smallestDistance) {
          smallestDistance = minDistance;
          closestObj = obj;
          }
      }
      
      return closestObj;
    },
    // 测评优化结束
    async get_obj_after() {
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
      let answerJson = await this.$get(
        '~/api/evaluation_user_answer/get_obj?user_id=' +
          this.answer_form.user_id +
          '&exam_id=' +
          this.query.exam_id
      );
      if (answerJson.result && answerJson.result.obj != null) {
        this.answer_form = answerJson.result.obj;
        this.answer_form.answers = JSON.parse(this.answer_form.answers);
        this.comment_state = answerJson.result.obj.comment_state;
        // 测评优化开始
        let sum = 0;
        for (let i = 0; i < this.answer_form.answers.length; i++) {
          this.answers[i] = this.answer_form.answers[i].answer;
          if (Array.isArray(this.answer_form.answers[i].answer)) {
            this.answer_form.answers[i].answer.forEach(item => {
              sum += Number(item.split("|")[1]) || 0;
            });
          }else {
            sum += Number(this.answer_form.answers[i].answer.split("|")[1]) || 0;
          }
        }
        let evaluationObj = await this.$get("~/api/evaluation/get_obj?exam_id="+this.query.exam_id);
        let comment_desc_list = evaluationObj.result.obj.evaluation_result ? JSON.parse(evaluationObj.result.obj.evaluation_result) : [];
        let comment_desc = this.findClosestInterval(comment_desc_list, sum);
        if(!this.answer_form.comment_desc) {
          this.answer_form.comment_desc = comment_desc.result;
          await this.$post("~/api/evaluation_user_answer/set?user_answer_id=" + this.answer_form.user_answer_id,{comment_desc: this.answer_form.comment_desc});
        }
        // 测评优化结束
        this.if_answered = true;
      } else if (answerJson.error) {
        console.error(answerJson.error);
      }
      // 测评优化开始
      if (!this.if_answered && this.form.duration > 0) {
        this.maxtime = this.form.duration * 60;
        this.timer = setInterval(() => {
          this.$nextTick(() => {
            this.set_countdown();
          });
        }, 1000);
      }
      // 测评优化结束
    },
    get_question_list(question_str) {
      let question_list = question_str.split('\n');
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

    submit_main() {
      let _this = this;
      _this.answer_form.exam_id = _this.query.exam_id;
      for (let i = 0; i < _this.answers.length; i++) {
        let obj = {
          exam_question_id: _this.question_list[i].exam_question_id,
          answer: _this.answers[i],
        };
        _this.answer_form.answers[i] = obj;
      }
      _this.answer_form.answers = JSON.stringify(_this.answer_form.answers);

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
    submit_after(json, func) {
      this.$toast('提交成功！', 'success');
      setTimeout(() => {
        this.$Router.back(1);
      }, 1000);
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
      // 测评优化开始
      // for (let i = 0; i < answer_list.length; i++) {
      //   if (answer_list[i] === choice) {
      //     return true;
      //   }
      // }
      // return false;
      if (!answer_list || !Array.isArray(answer_list)) {
        return false;
      }
      const choiceText = choice.split('|')[0].trim();
      for (let i = 0; i < answer_list.length; i++) {
        const answerText = answer_list[i].split('|')[0].trim();
        if (answerText === choiceText) {
          return true;
        }
      }
      return false;
      // 测评优化结束
    },
    set_radio(e, answer_index) {
      this.answers[answer_index] = e.detail.value;
    },
    set_checkbox(e, answer_index) {
      this.answers[answer_index] = e.detail.value;
    },
  },
  onLoad(e) {
    if (e.is_see) {
      if (e.is_see !== '0') {
        this.is_see = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
