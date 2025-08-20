<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_feedback_on_opinions_list container">
	<view class="content">
	  <tn-nav-bar>意见反馈列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.title_name" placeholder="搜索标题名" @search="search_" @cancel="search_cancel('title_name')" @input="(val) => inputValue(val, 'title_name')" />
	      	    	  	    	      	    	  	    	  	    	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	  	  	    	      	    	  	    	      	        	          <view class="drop_down">
	            <uni-data-select
	                    @change="change_type_of_feedback_information"
	                    v-model="query.type_of_feedback_information"
	                    :localdata="list_type_of_feedback_information"
	  				  :placeholder="placeholder_type_of_feedback_information"
	            ></uni-data-select>
	          </view>
	        	      	    	  	    	  	    	      	        	          <view class="drop_down">
	            <uni-data-select
	                    @change="change_refund_type"
	                    v-model="query.refund_type"
	                    :localdata="list_refund_type" 
	  				  :placeholder="placeholder_refund_type"
	            ></uni-data-select>
	          </view>
	        	      	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	  	    	  	  			          <MeDropdown
	            :menuList.sync="menuList"
	            themeColor="#0079fe"
	            :duration="300"
	            :isCeiling="true"
	            @onConfirm="onConfirmDropdown"
	            @onChange="onChangeDropdown"
	          ></MeDropdown>
	        </view>
	  
	        <!-- 筛选模块(结束) -->
	  <!-- 列表 -->
	        <view class="customized-list">
	  	          <view v-for="(o, i) in list" :key="i" class="customized-item">
	  	  	            <view
	              class="customized-item-body"
	              @click=" $navTo('/pagesC/feedback_on_opinions/details?feedback_on_opinions_id=' + o['feedback_on_opinions_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'title_name')">
	                <view class="label" v-if="true">
	                  <span>标题名</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['title_name'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'type_of_feedback_information')">
	                <view class="label" v-if="true">
	                  <span>反馈信息类型</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['type_of_feedback_information'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'feedback_user')">
	                <view class="label" v-if="true">
	                  <span>反馈用户</span>
	                </view>
	    	                <view class="value">
	                  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_feedback_user(o['feedback_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
	                  <span>{{ get_user_feedback_user(o['feedback_user']).nickname }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'refund_type')">
	                <view class="label" v-if="true">
	                  <span>退款类型</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['refund_type'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'refund_goods')">
	                <view class="label" v-if="true">
	                  <span>退款商品</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['refund_goods'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row diy-image " v-if="0 && $check_field('get', 'upload_credential')">
	                <view class="label" v-if=" false">
	                  <span>上传凭证</span>
	                </view>
	    	                <view class="value diy_img">
	                  <image :src="$fullImgUrl(o['upload_credential'])" width="100%" height="100" />
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'more_vouchers')">
	                <view class="label" v-if="true">
	                  <span>更多凭证</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['more_vouchers'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'upload_file')">
	                <view class="label" v-if="true">
	                  <span>上传文件</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['upload_file'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'upload_audio')">
	                <view class="label" v-if="true">
	                  <span>上传音频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['upload_audio'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'upload_video')">
	                <view class="label" v-if="true">
	                  <span>上传视频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['upload_video'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'feedback_content')">
	                <view class="label" v-if="true">
	                  <span>反馈内容</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['feedback_content'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'detailed_description')">
	                <view class="label" v-if="true">
	                  <span>详细描述</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['detailed_description'] }}</span>
	                </view>
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
													</view>
</template>

<script>
import Search from '@/components/businessCp/search.vue';
import mixin from '@/libs/mixins/page.js';
import MeDropdown from '@/components/me-dropdown/index.vue';
import dateRangePicker from '@/components/date-range-picker/date-range-picker.vue';
export default {
  mixins: [mixin],
  components: {
    Search,
    MeDropdown,
    dateRangePicker,
  },
  data() {
    return {
      url_get_list: '~/api/feedback_on_opinions/get_list?like=0',
              // 反馈信息类型选项列表
      list_type_of_feedback_information: [{value:"全部",text:"全部"}],
	  placeholder_type_of_feedback_information: "请选择反馈信息类型",
                  // 用户列表
      list_user_feedback_user: [],
              // 退款类型选项列表
      list_refund_type: [{value:"全部",text:"全部"}],
	  placeholder_refund_type: "请选择退款类型",
                                                      												      query: {
                title_name: "", // 标题名
                        type_of_feedback_information: "", // 反馈信息类型
                          refund_type: "", // 退款类型
                                feedback_on_opinions_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
      count: 50,
      menuList: [
                                {
            title: '发布时间',
            type: 'sort',
            command: '`create_time`',
            value: 0,
        }
      ],
						 									 									 									 									 									 									 									 									 									 									 									 						    };
  },

  watch: {
  	list: {
  		handler(val) {
								  		},
  		deep: true
  	},
  },
  methods: {
																																					    onConfirmDropdown(val) {
      if (val.value) {
        this.query.orderby = val.command + ' ' + val.value;
      } else {
        this.query.orderby = '';
      }
      this.search_();
    },
    onChangeDropdown(v) {},
    /**
     * 获取列表后
     * @param {Object} json
     * @param {Object} func
     */
    get_list_after(json, func) {
      let list = json.result.list;
      if (func) {
        func(json);
      }
    },
												                                // 改变分类标签
        change_type_of_feedback_information(val) {
          if (val === "全部" || val === "") {
            this.query.type_of_feedback_information = "";
          }else{
            this.query.type_of_feedback_information = val
          }
          this.search_();
        },
                /**
     * 获取反馈信息类型列表
     */
    async get_list_type_of_feedback_information() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_type_of_feedback_information.push({value:o.classification_name,text:o.classification_name}));
          }
          else if(json.error){
            $.toast(json.error.message);
            console.error(json.error);
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
      let ret = {nickname: "未知用户", avatar: ""};
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i];
        }
      }
      return ret;
    },
                        // 改变分类标签
        change_refund_type(val) {
          if (val === "全部" || val === "") {
            this.query.refund_type = "";
          }else{
            this.query.refund_type = val
          }
          this.search_();
        },
                /**
     * 获取退款类型列表
     */
    async get_list_refund_type() {
                  ['其他','退款退货','仅退款','部分退款'].map((o) => this.list_refund_type.push({value:o,text:o}));
                    },
                                                                        search_() {
      this.query.page = 1;
      this.get_list();
    },
    search_cancel(key) {
      this.query[key] = '';
      this.search_();
    },
	inputValue(val, key) {
	  this.query[key] = val;
	  this.search_();
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
		margin-bottom: 10px;
	}
	.date_select {
		position: relative;
		text-align: center;
		padding: 8px;
		border: 1px solid #e5e5e5;
		border-radius: 50px;
		color: #6a6a6a;
		margin-bottom: 10px;
	}

.date_select_clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>