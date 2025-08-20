<template>
  <view class="page_diy_table page_registered_user_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>注册用户列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="用户会员卡号" name="user_membership_card_number">
                <uni-easyinput type="text" v-model="query.user_membership_card_number" placeholder="用户会员卡号" />
              </uni-forms-item>
              <uni-forms-item label="真实姓名" name="real_name">
                <uni-easyinput type="text" v-model="query.real_name" placeholder="真实姓名" />
              </uni-forms-item>
                        <uni-forms-item label="用户标签" name="user_label">
                <uni-easyinput type="text" v-model="query.user_label" placeholder="用户标签" />
              </uni-forms-item>
                      </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/registered_user/view?')" v-if="$check_action('/registered_user/table', 'add') || $check_action('/registered_user/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="0 && $check_field('get','user_membership_card_number')">
            <view class="label" v-if="true">
              <span>用户会员卡号</span>
            </view>
              <view class="value">
              <span>{{ o['user_membership_card_number'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','real_name')">
            <view class="label" v-if="true">
              <span>真实姓名</span>
            </view>
              <view class="value">
              <span>{{ o['real_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','user_gender')">
            <view class="label" v-if="true">
              <span>用户性别</span>
            </view>
              <view class="value">
              <span>{{ o['user_gender'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','user_age')">
            <view class="label" v-if="true">
              <span>用户年龄</span>
            </view>
              <view class="value">
              <span>{{ o['user_age'] }}岁</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','height')">
            <view class="label" v-if="true">
              <span>身高</span>
            </view>
              <view class="value">
              <span>{{ o['height'] }}CM</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','user_weight')">
            <view class="label" v-if="true">
              <span>用户体重</span>
            </view>
              <view class="value">
              <span>{{ o['user_weight'] }}KG</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','region')">
            <view class="label" v-if="true">
              <span>所属地区</span>
            </view>
              <view class="value">
              <span>{{ o['region'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','user_label')">
            <view class="label" v-if="true">
              <span>用户标签</span>
            </view>
              <view class="value">
              <span>{{ o['user_label'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','user_preferences')">
            <view class="label" v-if="true">
              <span>用户喜好</span>
            </view>
              <view class="value">
              <span>{{ o['user_preferences'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','description_description')">
            <view class="label" v-if="true">
              <span>描述说明</span>
            </view>
              <view class="value">
              <span>{{ o['description_description'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','certificate_number')">
            <view class="label" v-if="true">
              <span>证件号</span>
            </view>
              <view class="value">
              <span>{{ o['certificate_number'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','portfolio')">
            <view class="label" v-if="true">
              <span>作品集</span>
            </view>
              <view class="value">
              <span>{{ o['portfolio'] }}</span>
            </view>
            </view>
          <view class="item-row diy-image" v-if="1 && $check_field('get','user_photos')">
            <view class="label" v-if=" false">
              <span>用户照片</span>
            </view>
              <view class="value diy_img">
              <image :src="$fullImgUrl(o['user_photos'])" width="100%" height="100" />
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','user_notes')">
            <view class="label" v-if="true">
              <span>用户备注</span>
            </view>
              <view class="value">
              <span>{{ o['user_notes'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/registered_user/table', 'del') || $check_action('/registered_user/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/registered_user/view?' + field + '=' + o[field])"
                  v-if="$check_action('/registered_user/table', 'set') || $check_action('/registered_user/view', 'set') || $check_action('/registered_user/view', 'get')">
              详情
            </view>
          </view>
        </view>
      </view>
      <!-- /列表 -->
      <!-- 分页器 -->
      <uni-pagination
        class="pager"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
      ></uni-pagination>
      <!-- /分页器 -->
    </view>
  </view>
</template>
<script>
import mixin from '@/libs/mixins/page.js';
import pcaCodeData from '@/json/pca-code.json';
export default {
  mixins: [mixin],
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/registered_user/get_list?like=0',
      url_del: '~/api/registered_user/del',

      // 字段ID
      field: 'registered_user_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              user_membership_card_number: "",
                    real_name: "",
                              user_label: "",
                          login_time: '',
        create_time: '',
      },
								  pcaCodeData,
	  pcaCodeMap: {
	    text: 'name',
	    value: 'name',
	  },
	      // 数据
      list: [],
                                	  user_age_input_timer: null,
          	  height_input_timer: null,
          	  user_weight_input_timer: null,
        	  region_region: '',
                                                                };
  },
  methods: {
						user_age_input() {
			this.user_age_input_timer && clearTimeout(this.user_age_input_timer);
			this.user_age_input_timer = setTimeout(() => {
				if((this.query.user_age_min && this.query.user_age_max) || (!this.query.user_age_min && !this.query.user_age_max)) {
					this.search_();
				}
			}, 300);
		},
				height_input() {
			this.height_input_timer && clearTimeout(this.height_input_timer);
			this.height_input_timer = setTimeout(() => {
				if((this.query.height_min && this.query.height_max) || (!this.query.height_min && !this.query.height_max)) {
					this.search_();
				}
			}, 300);
		},
				user_weight_input() {
			this.user_weight_input_timer && clearTimeout(this.user_weight_input_timer);
			this.user_weight_input_timer = setTimeout(() => {
				if((this.query.user_weight_min && this.query.user_weight_max) || (!this.query.user_weight_min && !this.query.user_weight_max)) {
					this.search_();
				}
			}, 300);
		},
									    search_() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 重置
     */
    reset: function reset() {
                            	  this.region_region = '';
	                                  uni.clear(this.query);
      uni.push(this.query, this.config);
      this.get_list();
    },
    delInfo(v) {
      let _this = this;
      uni.showModal({
        title: '删除',
        content: '此操作将永久删除该文件, 是否继续?',
        success: function (res) {
          if (res.confirm) {
            let list = [v];
            _this.delInfoSub(list);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
    async delInfoSub(list) {
      let _this = this;
      await this.delAll(list, async (list) => {
        var bl = true;
        for (var i = 0; i < list.length; i++) {
          var user_id = _this.list[list[i]].user_id;
          var res = await this.$get('~/api/user/del', { user_id });
          if (res.result) {
            console.log('删除成功' + i);
          } else {
            console.log('删除失败' + i);
            bl = false;
            break;
          }
        }
        if (bl) {
          _this.$toast('删除成功!', 'success');
          this.get_list();
        }
      });
    },
    get_list_after(param){
      let _this = this;
      for (let i = 0;i<this.list.length;i++){
        let user_id = _this.list[i].user_id
        _this.$get("~/api/user/get_obj", {
          user_id
        }, (json) => {
          if (json.result.obj){
            _this.$delete(_this.list[i],'username');
            _this.$set(_this.list[i],'username',json.result.obj.username);
            _this.$delete(_this.list[i],'nickname');
            _this.$set(_this.list[i],'nickname',json.result.obj.nickname);
          }
        });
      }
    },
                                                        	region_pcaCodeChange(val) {
      this.query.region = val.detail.value.map(item => item.value).join('/');
    },
                                                            },
  created() {
                                                          },
};
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .num_range {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
</style>