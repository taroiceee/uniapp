<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>错题详情</tn-nav-bar>
    <view class="page_answer_wrong_detail" id="answer_wrong_detail">
      <view class="warp">
        <view class="container-fluid">
          <view class="row">
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>科目</span>
                </view>
                <view class="diy_field diy_text">
                  <span>
                    {{ obj.subject_name }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>标题</span>
                </view>
                <view class="diy_field diy_text">
                  <span>
                    {{ obj.title }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>类型</span>
                </view>
                <view class="diy_field diy_text">
                  <span>
                    {{ obj.type }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>提交时间</span>
                </view>
                <view class="diy_field diy_datetime">
                  <span>
                    {{ $toTime(obj.create_time, 'yyyy-MM-dd hh:mm:ss') }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>参考答案</span>
                </view>
                <view class="diy_field diy_datetime">
                  <span>
                    {{ obj.answer }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>答案选项</span>
                </view>
                <view class="diy_field diy_datetime">
                  <span>
                    {{ obj.question_item }}
                  </span>
                </view>
              </view>
            </view>
            <view class="col-12 col-6">
              <view class="view">
                <view class="diy_title">
                  <span>提交答案</span>
                </view>
                <view class="diy_field diy_datetime">
                  <span>
                    {{ obj.answers }}
                  </span>
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
import list_comment from '@/components/diy/list_comment.vue';
import bar_title from '@/components/diy/bar_title.vue';

import mixin from '@/libs/mixins/page.js';
export default {
  mixins: [mixin],
  components: {
    list_comment,
    bar_title,
  },
  data() {
    return {
      url_get_obj: '~/api/user_answer_wrong/get_obj?',
      field: 'user_answer_id',
      query: {
        user_answer_id: 0,
      },
      // 商品详情初始化
      obj: {
        title: '',
        subject_name: '',
        create_time: '',
        type: '',
        answer: '',
        answers: '',
        question_item: '',
      },
    };
  },
  methods: {
    openUrl(url) {
      console.log(1111);
      uni.navigateTo({
        url: `/pages/webview/webview?url=${url}`,
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
