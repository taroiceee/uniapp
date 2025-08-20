<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_schedule_of_sessions_list container">
	<view class="content">
	  <tn-nav-bar>场次安排列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.name_of_session" placeholder="搜索场次名称" @search="search_" @cancel="search_cancel('name_of_session')" @input="(val) => inputValue(val, 'name_of_session')" />
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
	              @click=" $navTo('/pagesC/schedule_of_sessions/details?schedule_of_sessions_id=' + o['schedule_of_sessions_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'name_of_session')">
	                <view class="label" v-if="true">
	                  <span>场次名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['name_of_session'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'schedule_of_sessions')">
	                <view class="label" v-if="true">
	                  <span>场次安排</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['schedule_of_sessions'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'activity_arrangement')">
	                <view class="label" v-if="true">
	                  <span>活动安排</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['activity_arrangement'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'activity_location')">
	                <view class="label" v-if="true">
	                  <span>活动地点</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['activity_location'] }}</span>
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
      url_get_list: '~/api/schedule_of_sessions/get_list?like=0',
                        				      query: {
                name_of_session: "", // 场次名称
                      schedule_of_sessions_id: 0, // ID
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