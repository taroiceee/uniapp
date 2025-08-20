<template>
  <view class="page_diy_table page_feedback_on_opinions_table" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>意见反馈列表</tn-nav-bar>
    <view class="page-list" id="page_diy_table">
      <!-- 筛选模块(开始) -->
      <view class="search-wrap">
        <!-- 搜索栏 -->
        <uni-forms :modelValue="query" labelWidth="70px">
            <uni-forms-item label="标题名" name="title_name">
                <uni-easyinput type="text" v-model="query.title_name" placeholder="标题名" />
              </uni-forms-item>
              <uni-forms-item label="反馈信息类型" name="type_of_feedback_information">
                      <uni-data-select
                    placeholder="请选择反馈信息类型"
                    v-model="query['type_of_feedback_information']"
                    :localdata="list_type_of_feedback_information"
            ></uni-data-select>
                    </uni-forms-item>
                <uni-forms-item label="退款类型" name="refund_type">
                      <uni-data-select
                    placeholder="请选择退款类型"
                    v-model="query['refund_type']"
                    :localdata="list_refund_type"
            ></uni-data-select>
                    </uni-forms-item>
                          </uni-forms>
        <!-- /搜索栏 -->
        <view class="search-btn-wrap">
          <view class="me-btn btn-reset" @click="reset()"> 重置 </view>
          <view class="me-btn btn-search" @click="search_()"> 查询 </view>
        </view>
		<view class="toolbar">
				  <view width="100%" class="me-btn btn-add" @click="$navTo('/pagesC/feedback_on_opinions/view?')" v-if="$check_action('/feedback_on_opinions/table', 'add') || $check_action('/feedback_on_opinions/view', 'add')">添加</view>
				</view>
      </view>
      <!-- 列表 -->
      <view class="list-wrap-row">
        <view v-for="(o, i) in list" :key="i" class="list-item">
          <view class="item-row " v-if="1 && $check_field('get','title_name')">
            <view class="label" v-if="true">
              <span>标题名</span>
            </view>
              <view class="value">
              <span>{{ o['title_name'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','type_of_feedback_information')">
            <view class="label" v-if="true">
              <span>反馈信息类型</span>
            </view>
              <view class="value">
              <span>{{ o['type_of_feedback_information'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','feedback_user')">
            <view class="label" v-if="true">
              <span>反馈用户</span>
            </view>
              <view class="value">
              <span>{{ get_user_feedback_user(o['feedback_user']) }}</span>
            </view>
            </view>
          <view class="item-row " v-if="1 && $check_field('get','refund_type')">
            <view class="label" v-if="true">
              <span>退款类型</span>
            </view>
              <view class="value">
              <span>{{ o['refund_type'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','refund_goods')">
            <view class="label" v-if="true">
              <span>退款商品</span>
            </view>
              <view class="value">
              <span>{{ o['refund_goods'] }}</span>
            </view>
            </view>
          <view class="item-row diy-image" v-if="0 && $check_field('get','upload_credential')">
            <view class="label" v-if=" false">
              <span>上传凭证</span>
            </view>
              <view class="value diy_img">
              <image :src="$fullImgUrl(o['upload_credential'])" width="100%" height="100" />
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','more_vouchers')">
            <view class="label" v-if="true">
              <span>更多凭证</span>
            </view>
              <view class="value">
              <span>{{ o['more_vouchers'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','upload_file')">
            <view class="label" v-if="true">
              <span>上传文件</span>
            </view>
              <view class="value">
              <span>{{ o['upload_file'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','upload_audio')">
            <view class="label" v-if="true">
              <span>上传音频</span>
            </view>
              <view class="value">
              <span>{{ o['upload_audio'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','upload_video')">
            <view class="label" v-if="true">
              <span>上传视频</span>
            </view>
              <view class="value">
              <span>{{ o['upload_video'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','feedback_content')">
            <view class="label" v-if="true">
              <span>反馈内容</span>
            </view>
              <view class="value">
              <span>{{ o['feedback_content'] }}</span>
            </view>
            </view>
          <view class="item-row " v-if="0 && $check_field('get','detailed_description')">
            <view class="label" v-if="true">
              <span>详细描述</span>
            </view>
              <view class="value">
              <span>{{ o['detailed_description'] }}</span>
            </view>
            </view>
          <view class="content">
          </view>
          <view class="operate-bar">
            <view width="100%" class="me-btn btn-delete" @click="delInfo(i)"
                  v-if="$check_action('/feedback_on_opinions/table', 'del') || $check_action('/feedback_on_opinions/view', 'del')">
              删除
            </view>
            <view width="100%" class="me-btn btn-info" @click="$navTo('/pagesC/feedback_on_opinions/view?' + field + '=' + o[field])"
                  v-if="$check_action('/feedback_on_opinions/table', 'set') || $check_action('/feedback_on_opinions/view', 'set') || $check_action('/feedback_on_opinions/view', 'get')">
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
      url_get_list: '~/api/feedback_on_opinions/get_list?like=0',
      url_del: '~/api/feedback_on_opinions/del',

      // 字段ID
      field: 'feedback_on_opinions_id',

      // 查询
      query: {
        size: 7,
        page: 1,
              title_name: "",
                    type_of_feedback_information: "",
                      refund_type: "",
                              login_time: '',
        create_time: '',
      },
												      // 数据
      list: [],
                    // 反馈信息类型列表
      list_type_of_feedback_information: [{value:"",text:"全部"}],
                          // 用户列表
      list_user_feedback_user: [],
                  // 退款类型列表
      list_refund_type: [{value:"",text:"全部"}],
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
    get_list_before(param){
      var user_group = this.user.user_group;
      if(user_group != "管理员"){
          let sqlwhere = "(";
                                      if(user_group=="注册用户"){
          sqlwhere+= "feedback_user = " + this.user.user_id + " or ";
        }
                                                                                                            if (sqlwhere.length>1){
          sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
          sqlwhere += ")";
          param["sqlwhere"] = sqlwhere;
        }
        }
      return param;
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
              /**
     * 获取反馈信息类型列表
     */
    async get_list_type_of_feedback_information() {
                    var json = await this.$get("~/api/classification_information/get_list");
        if(json.result){
          json.result.list.map((o) => this.list_type_of_feedback_information.push({value:o.classification_name,text:o.classification_name}));
        }else if (json.error){
          console.log(json.error);
        }
          },
                  /**
     * 获取注册用户用户列表
     */
    async get_list_user_feedback_user() {
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        this.list_user_feedback_user = json.result.list;
      }
      else if(json.error){
        console.error(json.error);
      }
    },

    get_user_feedback_user(id){
      let obj = this.list_user_feedback_user;
      let ret = "";
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i].nickname+"-"+obj[i].username;
        }
      }
      return ret;
    },
          /**
     * 获取退款类型列表
     */
    async get_list_refund_type() {
              ['其他','退款退货','仅退款','部分退款'].map((o) => this.list_refund_type.push({value:o,text:o}));
                },
                                                                          },
  created() {
          // 初始化反馈信息类型列表
    this.get_list_type_of_feedback_information();
                this.get_list_user_feedback_user();
        // 初始化退款类型列表
    this.get_list_refund_type();
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