<template>
  <view class="page_diy_table page_classification_information_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>分类信息列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="分类名称" name="classification_name">
                <uni-easyinput type="text" v-model="query.classification_name" placeholder="分类名称" />
              </uni-forms-item>
              </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/classification_information/view?')" v-if="$check_action('/classification_information/table', 'add') || $check_action('/classification_information/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','classification_name')">
            <view class="label" v-if="true">
              <span>分类名称</span>
            </view>
              <view class="value">
              <span>{{ o['classification_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','description_and_explanation')">
            <view class="label" v-if="true">
              <span>描述说明</span>
            </view>
              <view class="value">
              <span>{{ o['description_and_explanation'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','location_information')">
            <view class="label" v-if="true">
              <span>地点信息</span>
            </view>
              <view class="value">
              <span>{{ o['location_information'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/classification_information/table', 'del') || $check_action('/classification_information/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/classification_information/view?' + field + '=' + o[field])"
                  v-if="$check_action('/classification_information/table', 'set') || $check_action('/classification_information/view', 'set') || $check_action('/classification_information/view', 'get')">
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
export default {
  mixins: [mixin],
  data() {
    return {
      // 获取数据地址
      url_get_list: '~/api/classification_information/get_list?like=0',
      url_del: '~/api/classification_information/del',

      // 字段ID
      field: 'classification_information_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              classification_name: "",
                  login_time: '',
        create_time: '',
      },
			      // 数据
      list: [],
                            };
  },
  methods: {
			    search_() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 重置
     */
    reset: function reset() {
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
            _this.delAll(list);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
	get_list_after(param){
	      let _this = this;
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