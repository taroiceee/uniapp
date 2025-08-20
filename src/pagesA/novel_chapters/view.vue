<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>章节详情</tn-nav-bar>
    <view id="page_diy_view" class="page_novel_chapters_view">
      <uni-forms :modelValue="form" labelWidth="70px">
        <uni-forms-item label="小说章节" name="chapter_name">
          <uni-easyinput type="text" v-model="form['chapter_name']" />
        </uni-forms-item>

        <uni-forms-item label="排序" name="sort">
          <uni-easyinput type="number" v-model="form['sort']" />
        </uni-forms-item>

        <uni-forms-item label="章节内容" name="chapter_content">
          <uni-easyinput type="textarea" v-model="form['chapter_content']" />
        </uni-forms-item>
      </uni-forms>

      <view class="form-footer">
        <view class="me-btn btn-submit" @click="submit()"> 提交 </view>

        <view class="me-btn btn-cancel" @click="cancel()">取消</view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';

export default {
  mixins: [mixin],
  data() {
    return {
      field: 'novel_chapters_id',
      url_add: '~/api/novel_chapters/add?',
      url_set: '~/api/novel_chapters/set?',
      url_get_obj: '~/api/novel_chapters/get_obj?',
      query: {
        novel_chapters_id: 0,
      },
      form: {
        chapter_name: '', // 章节名称
        sort: '', // 排序
        chapter_content: '', // 章节内容
        novel_chapters_id: 0,
        source_table: '',
        source_field: '',
      },
    };
  },
  onLoad(e) {
    console.log(e);
    if (e.novel_reading_id) {
      this.form.novel_reading_id = e.novel_reading_id;
    } else {
      this.form.novel_chapters_id = e.novel_chapters_id;
    }
    if (e.source_table) {
      this.form.source_table = e.source_table;
    } else {
      this.form.novel_chapters_id = e.novel_chapters_id;
    }
    if (e.source_field) {
      this.form.source_field = e.source_field;
    } else {
      this.form.source_field = e.source_field;
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
