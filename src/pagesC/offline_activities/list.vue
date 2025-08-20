<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_offline_activities_list container">
	<view class="content">
	  <tn-nav-bar>线下活动列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.activity_name" placeholder="搜索活动名称" @search="search_" @cancel="search_cancel('activity_name')" @input="(val) => inputValue(val, 'activity_name')" />
	      	    	  	    	      	    	  	    	      	    	  	    	  	    	  	    	  	  	    	      	    	  	    	      	        	      	    	  	    	      					<view class="date_select" @click="activity_date_date_range_picker_show = true">{{activity_date_date_text}}
            <icon class="date_select_clear" type="clear" size="14" @click.stop="activity_date_date_select_clear"/>

          </view>
					    	  	    	  	    	  	    	  	  				<view class="map_btn" @click="$navTo('/pagesC/offline_activities/map')">查看地图</view>
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
	              @click=" $navTo('/pagesC/offline_activities/details?offline_activities_id=' + o['offline_activities_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'activity_name')">
	                <view class="label" v-if="true">
	                  <span>活动名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['activity_name'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'activity_type')">
	                <view class="label" v-if="true">
	                  <span>活动类型</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['activity_type'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'activity_date')">
	                <view class="label" v-if="true">
	                  <span>活动日期</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ $toTime(o['activity_date'], 'yyyy-MM-dd') }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'number_of_enrolment')">
	                <view class="label" v-if="true">
	                  <span>报名人数</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['number_of_enrolment'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'promotional_vuser_ideo')">
	                <view class="label" v-if="true">
	                  <span>宣传视频</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['promotional_vuser_ideo'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'activity_description')">
	                <view class="label" v-if="true">
	                  <span>活动描述</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['activity_description'] }}</span>
	                </view>
	    	              </view>
	  	  	  			<view class="item-row item-rate" v-if="$check_option('/offline_activities/details','can_show_score')">
	  				<view class="label" v-if="true">
	  					<span>评分</span>
	  				</view>
	  				<view class="value rate">
	  					<tn-rate
	  					    :disabled="true"
	  					    v-model="o['score_num']"
	  					    allowHalf 
	  					    activeColor="#f7ba2a"
	  					    inactiveColor="#f7ba2a"
	  					    :size="24"  
	  						:gutter="0"
	  					></tn-rate>
	  					<text class="score_num_text" style="margin-left: 5px;">{{ o['score_num']}}</text>
	  				</view>
	  			</view>
	  	            </view>
	  
	  	            <view class="customized-item-footer">
	    	              <view class="praise">
	                <text class="icon iconfont icon-dianzan"></text>
	                {{ o['praise_len'] || 0 }}
	              </view>
	    	    	    	              <view class="comment">
	                <text class="icon iconfont icon-pinglun"></text>
	                {{ o['comment_len'] || 0 }}
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
					<dateRangePicker
      style="z-index: 9999;"
      :show="activity_date_date_range_picker_show"
      :minYear="2022"
      @close="activity_date_date_range_picker_show=false"
      @confirm="activity_date_date_range_picker_confirm"
    />
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
      url_get_list: '~/api/offline_activities/get_list?like=0',
              // 活动类型选项列表
      list_activity_type: [{value:"全部",text:"全部"}],
	  placeholder_activity_type: "请选择活动类型",
                              						      query: {
                activity_name: "", // 活动名称
                        activity_type: "", // 活动类型
                				activity_date_min: '',
        activity_date_max: '',
                      offline_activities_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
      count: 50,
      menuList: [
                    {
            title: '点赞数',
            type: 'sort',
            command: '`praise_len`',
            value: 0,
        },
        {
            title: '发布时间',
            type: 'sort',
            command: '`create_time`',
            value: 0,
        }
      ],
						 									 									 						activity_date_date_range_picker_show: false,
      activity_date_date_text: '请选择活动日期',
										 			number_of_enrolment_input_timer: null,
													 									 						    };
  },

  watch: {
  	list: {
  		handler(val) {
								        setTimeout(() => {
          this.getScore();
        }, 500);
          		},
  		deep: true
  	},
  },
  methods: {
												activity_date_date_range_picker_confirm(date) {
				this.query.activity_date_min = date[0];
				this.query.activity_date_max = date[1];
				this.activity_date_date_text = `${date[0]} - ${date[1]}`;
				this.search_();
			},
			activity_date_date_select_clear() {
				this.query.activity_date_min = '';
				this.query.activity_date_max = '';
				this.activity_date_date_text = '请选择活动日期';
				this.search_();
			},
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
      this.get_praise(list);
      if (func) {
        func(json);
      }
    },
    /**
     * 获取点赞数
     * @param {Object} list
     */
    get_praise(list) {
		for (let i = 0; i < list.length; i++) {
			list[i].praise_len = 0;
		}
		this.$get('~/api/praise/list_group?groupby=source_id&source_table=offline_activities',{},(res) => {
		    if (res.result && res.result.list) {
		      res.result.list.map((o) => {
		        for (var i = 0; i < list.length; i++) {
		          var oj = list[i];
		          if (oj['offline_activities_id'] === o['source_id']) {
		            oj['praise_len'] = o['count'];
		            // break;
		          }
		        }
		      });
		    } else if (res.error) {
		      console.error(res.error);
		    }
		  }
		);
    },
	/**
	* 获取评分数
	* @param {Object} list
	*/
	async get_score(list) {
		const url = `~/api/score/avg`;
		const params = {
			field: 'score_num',
			source_table: 'offline_activities',
			source_field: 'offline_activities_id',
		};
		for (let i = 0; i < list.length; i++) {
			list[i].score_num = 0;
			params.source_id = list[i]['offline_activities_id'];
			const res1 = await this.$get(url, params);
			if (res1.result && res1.result > 0) {
				list[i].score_num = parseFloat(res1.result.toFixed(1));
			} else if (res1.error) {
				console.error(res1.error);
			}
		}
	},
						number_of_enrolment_input() {
			this.number_of_enrolment_input_timer && clearTimeout(this.number_of_enrolment_input_timer);
			this.number_of_enrolment_input_timer = setTimeout(() => {
				if((this.query.number_of_enrolment_min && this.query.number_of_enrolment_max) || (!this.query.number_of_enrolment_min && !this.query.number_of_enrolment_max)) {
					this.search_();
				}
			}, 300);
		},
			                                // 改变分类标签
        change_activity_type(val) {
          if (val === "全部" || val === "") {
            this.query.activity_type = "";
          }else{
            this.query.activity_type = val
          }
          this.search_();
        },
                /**
     * 获取活动类型列表
     */
    async get_list_activity_type() {
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
		    async getScore() {
      const arr = JSON.parse(JSON.stringify(this.productList));
      Promise.all(
        arr.map(async (item) => {
          const url = `~/api/score/avg`;
          const params = {
            field: "score_num",
            source_table: "offline_activities",
            source_field: "offline_activities_id",
            source_id: item.offline_activities_id,
          };
          const res = await this.$get(url, params);
          const num = res.result || 0.0;
          item.score_num = Number(num.toFixed(2));
          return item;
        })
      )
        .then((res) => {
									this.list = res || this.list;
				        })
        .catch((err) => {
											this.list = res || this.list;
					        });
    },
		  },
  created() {
          // 初始化活动类型列表
    this.get_list_activity_type();
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