<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>视频详情</tn-nav-bar>
    <view id="page_diy_view" class="page_novel_chapters_view">
      <uni-forms :modelValue="form" labelWidth="70px">
        <uni-forms-item label="视频集数" name="episode_name">
          <uni-easyinput type="text" v-model="form['episode_name']" />
        </uni-forms-item>

        <uni-forms-item label="排序" name="sort">
          <uni-easyinput type="number" v-model="form['sort']" />
        </uni-forms-item>

        <uni-forms-item label="集数内容" name="episode_url">
		  <view>
		    <view class="me-btn" @click="uploadFile_('episode_url')"> 上传视频 </view>
		  </view>
		  <video v-if="form['episode_url']" style="text-align: left" :src="$fullImgUrl(form['episode_url'])" controls></video>
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
      field: 'movie_episode_id',
      url_add: '~/api/movie_episode/add?',
      url_set: '~/api/movie_episode/set?',
      url_get_obj: '~/api/movie_episode/get_obj?',
      query: {
        movie_episode_id: 0,
      },
      form: {
        episode_name: '', // 技术名称
        sort: '', // 排序
        episode_url: '', // 集数内容
        movie_episode_id: 0,
        source_table: '',
        source_field: '',
      },
    };
  },
  onLoad(e) {
    console.log(e);
    if (e.move_info_id) {
      this.form.move_info_id = e.move_info_id;
    } else {
      this.form.movie_episode_id = e.movie_episode_id;
    }
    if (e.source_table) {
      this.form.source_table = e.source_table;
    } else {
      this.form.movie_episode_id = e.movie_episode_id;
    }
    if (e.source_field) {
      this.form.source_field = e.source_field;
    } else {
      this.form.source_field = e.source_field;
    }
  },
  methods: {
	  uploadFile_(type) {
	    // #ifdef APP-VUE
	    uni.chooseFile({
	      count: 1,
	      success: (chooseImageRes) => {
	        const tempFilePaths = chooseImageRes.tempFilePaths;
	        this.successChoose(tempFilePaths[0], type);
	      },
	    });
	    // #endif
	    // #ifdef !APP-VUE
	    if (
	      uni.getSystemInfoSync().uniPlatform != 'mp-weixin' ||
	      uni.getSystemInfoSync().platform == 'devtools'
	    ) {
	      uni.chooseImage({
	        count: 1,
	        success: (chooseImageRes) => {
	          const tempFilePaths = chooseImageRes.tempFilePaths;
	          this.successChoose(tempFilePaths[0], type);
	        },
	      });
	    } else {
	      wx.chooseMessageFile({
	        count: 1,
	        success: (chooseImageRes) => {
	          const tempFilePaths = chooseImageRes.tempFiles;
	          this.successChoose(tempFilePaths[0].path, type);
	        },
	      });
	    }
	    // #endif
	  },
	  successChoose(filePath, type) {
	    uni.uploadFile({
	      url: this.$fullUrl('~/api/movie_episode/upload?'), //仅为示例，非真实的接口地址
	      filePath,
	      name: 'file',
	      success: (uploadFileRes) => {
	        if (uploadFileRes.data.error) {
	          uni.showToast({ title: uploadFileRes.data.error.message, icon: 'none' });
	        } else {
	          this.form[type] = JSON.parse(uploadFileRes.data).result.url;
	        }
	      },
	    });
	  },
  },
};
</script>
<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
</style>
