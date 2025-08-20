<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_film_and_television_novels_list container">
	<view class="content">
	  <tn-nav-bar>影视小说列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.album_name" placeholder="搜索专辑名称" @search="search_" @cancel="search_cancel('album_name')" @input="(val) => inputValue(val, 'album_name')" />
	      	    	  	    	  	    	      	          <Search v-model="query.authors_name" placeholder="搜索作者姓名" @search="search_" @cancel="search_cancel('authors_name')" @input="(val) => inputValue(val, 'authors_name')" />
	      	    	  	    	  	    	  	  	    	      	    	  	    	  	    	      	    	  	    	  	    	  	  				<view class="map_btn" @click="$navTo('/pagesC/film_and_television_novels/map')">查看地图</view>
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
	  	  		<view v-for="(o, i) in productList" :key="i" class="customized-item">
	  	  	            <view
	              class="customized-item-body"
	              @click=" $navTo('/pagesC/film_and_television_novels/details?film_and_television_novels_id=' + o['film_and_television_novels_id'])">
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'album_name')">
	                <view class="label" v-if="true">
	                  <span>专辑名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['album_name'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row diy-image " v-if="1 && $check_field('get', 'album_cover')">
	                <view class="label" v-if=" false">
	                  <span>专辑封面</span>
	                </view>
	    	                <view class="value diy_img">
	                  <image :src="$fullImgUrl(o['album_cover'])" width="100%" height="100" />
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="1 && $check_field('get', 'authors_name')">
	                <view class="label" v-if="true">
	                  <span>作者姓名</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['authors_name'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'audio_content')">
	                <view class="label" v-if="true">
	                  <span>音频内容</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['audio_content'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'album_file')">
	                <view class="label" v-if="true">
	                  <span>专辑文件</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['album_file'] }}</span>
	                </view>
	    	              </view>
	  	  	  			<view class="item-row item-rate" v-if="$check_option('/film_and_television_novels/details','can_show_score')">
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
	    	    	              <view class="collect">
	                <text class="icon iconfont icon-shoucang"></text>
	                {{ o['collect_len'] || 0 }}
	              </view>
	    	    	              <view class="comment">
	                <text class="icon iconfont icon-pinglun"></text>
	                {{ o['comment_len'] || 0 }}
	              </view>
	    	            </view>
	  	  	  		  <view class="checkbox-container">
	  		  	<checkbox-group @change="handleChecked(o)">
	  		  		<label>
	  		  			<checkbox :checked="o.checked"
	  		  				style="transform:scale(0.7)" />
	  		  			<text>对比</text>
	  		  		</label>
	  		  	</checkbox-group>
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
	  <button v-if="!isDrawerOpen" type="primary" size="mini" class="fixed-button" @click="toggleDrawer">数据对比</button>
	  <!-- 背景蒙板 -->
	  <view v-if="isDrawerOpen" class="overlay" @click="toggleDrawer"></view>
	  <!-- 抽屉 -->
	  <view v-if="isDrawerOpen" :class="['drawer', { 'drawer-open': isDrawerOpen }]" @click="toggleDrawer">
		<view class="drawer-content" @click.stop>
			<button v-if="isDrawerOpen" type="primary" size="mini" style="width: 100%" @click="toggleDrawer">数据对比</button>
			<!-- 抽屉内容 -->
			<view class="drawer-body">
				<view class="list">
					<view v-for="o in goods" :key="o.id" class="li">
						<view v-if="o[itemList[0].name]" class="diy_list_img_box">
							<!-- 图片 -->
							<view class="diy_row">
								<view class="diy_img_sub diy_img">
									<image :src="$fullImgUrl(o[imgList[0].name])" style="width: 240rpx; height: 160rpx"/>
								</view>
								<view class="diy_product_name">{{ o[itemList[0].name] }}</view>
							</view>
							<view class="delete-container">
								<text class="iconfont icon-quxiao1" style="" @click="handleDel(o)"></text>
							</view>
						</view>
						<view v-else class="goods-other">
							<view>您还可以继续添加</view>
						</view>
						<view class="dashed-line"></view>
					</view>
				</view>
				<view class="footer">
					<button type="default" size="mini" @click="clear">清空</button>
					<button type="primary" size="mini" @click="vs">对比</button>
				</view>
			</view>
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
      url_get_list: '~/api/film_and_television_novels/get_list?like=0',
                              					      query: {
                album_name: "", // 专辑名称
                          authors_name: "", // 作者姓名
                    film_and_television_novels_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
	  imgList: [
	  	  	{
	  		title: "专辑封面",
	  		name: "album_cover",
	  	},
	  	  ],
	  itemList: [
	  	  	{
	  		title: "专辑名称",
	  		name: "album_name",
	  		},
	  	  	{
	  		title: "作者姓名",
	  		name: "authors_name",
	  		},
	  	  	{
	  		title: "音频内容",
	  		name: "audio_content",
	  		},
	  	  	{
	  		title: "专辑文件",
	  		name: "album_file",
	  		},
	  	  ],
	  goods: [],
	  productList: [],
	  isDrawerOpen: false,
      count: 50,
      menuList: [
                  {
            title: '点赞数',
            type: 'sort',
            command: '`praise_len`',
            value: 0,
        },
        {
            title: '点击数',
            type: 'sort',
            command: '`hits`',
            value: 0,
        },
        {
            title: '收藏数',
            type: 'sort',
            command: '`collect_len`',
            value: 0,
        },
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
				  			this.productList = val.map(l => ({
  				...l,
  				checked: false
  			}));
  			this.getGoods(this.productList)
								        setTimeout(() => {
          this.getScore();
        }, 500);
          		},
  		deep: true
  	},
  },
  methods: {
																	toggleDrawer() {
		this.isDrawerOpen = !this.isDrawerOpen;
	},
	handleChecked(product) {
		const realIndex = this.productList.findIndex(p => p.film_and_television_novels_id === product.film_and_television_novels_id);
		this.$set(this.productList[realIndex], 'checked', true)
		if (this.productList.filter(p => p.checked).length > 4) {
			alert('最多只能选择4个');
			// 解决checkbox视图不更新问题
			setTimeout(() => {
				this.$set(this.productList[realIndex], 'checked', false);
				this.getGoods(this.productList);
			}, 5)
			return;
		} else {
			this.getGoods(this.productList);
		}
	},
	getGoods(list) {
		const checkArr = list.filter(el => el.checked);
		const arr = []
		for (let i = 0; i < 4; i++) {
			if (checkArr[i]) {
				arr.push({
					...checkArr[i],
					id: 'goods' + i
				});
			} else {
				arr.push({
					id: 'goods' + i
				})
			}
		}
		this.goods = arr;
	},
	handleDel(val) {
		const newList = [...this.productList];
		const realIndex = newList.findIndex(item => item.film_and_television_novels_id === val.film_and_television_novels_id);
		if (realIndex !== -1) {
			newList[realIndex].checked = false; // 标记为未选中
		}
		this.getGoods(newList);
		this.productList = [...newList];
	},
	clear() {
		const newList = this.productList.map(item => ({
			...item,
			checked: false
		}));
		this.getGoods(newList);
		this.productList = [...newList];
	},
	vs() {
				this.$store.commit('goods/SET_GOODS', this.goods);
		this.$navTo('/pagesC/film_and_television_novels/vs_detail');
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
		this.$get('~/api/praise/list_group?groupby=source_id&source_table=film_and_television_novels',{},(res) => {
		    if (res.result && res.result.list) {
		      res.result.list.map((o) => {
		        for (var i = 0; i < list.length; i++) {
		          var oj = list[i];
		          if (oj['film_and_television_novels_id'] === o['source_id']) {
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
			source_table: 'film_and_television_novels',
			source_field: 'film_and_television_novels_id',
		};
		for (let i = 0; i < list.length; i++) {
			list[i].score_num = 0;
			params.source_id = list[i]['film_and_television_novels_id'];
			const res1 = await this.$get(url, params);
			if (res1.result && res1.result > 0) {
				list[i].score_num = parseFloat(res1.result.toFixed(1));
			} else if (res1.error) {
				console.error(res1.error);
			}
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
		    async getScore() {
      const arr = JSON.parse(JSON.stringify(this.productList));
      Promise.all(
        arr.map(async (item) => {
          const url = `~/api/score/avg`;
          const params = {
            field: "score_num",
            source_table: "film_and_television_novels",
            source_field: "film_and_television_novels_id",
            source_id: item.film_and_television_novels_id,
          };
          const res = await this.$get(url, params);
          const num = res.result || 0.0;
          item.score_num = Number(num.toFixed(2));
          return item;
        })
      )
        .then((res) => {
				          this.productList = res || this.productList;
				        })
        .catch((err) => {
											this.productList = this.productList;
					        });
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
  .container {
  	position: relative;
  	height: 100vh;
  }
  .content {
  	padding-bottom: 80rpx;
  	/* 留出底部按钮的空间 */
  }
  .checkbox-container{
  	width: 100%;
  	text-align: center;
  	border-top: 1px solid #ebeef5;
  }
  .fixed-button {
  	position: fixed;
  	bottom: 0;
  	left: 0;
  	width: 100%;
  	color: #fff;
  	z-index: 1000;
  }
  
  .overlay {
  	position: fixed;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background-color: rgba(0, 0, 0, 0.5);
  	z-index: 998;
  }
  
  .drawer {
  	position: fixed;
  	left: 0;
  	width: 100%;
  	background-color: #fff;
  	transition: bottom 0.3s;
  	z-index: 999;
  }
  
  .drawer-open {
  	bottom: 0;
  }
  
  .drawer-header {
  	padding: 40rpx;
  	background-color: #f5f5f5;
  	border-bottom: 1px solid #ddd;
  }
  
  .drawer-body {
  	padding: 30rpx;
  	flex: 1;
  	overflow: auto;
  }
  
  .li {
  	min-height: 180rpx;
  	margin: 10rpx;
  	padding: 10rpx;
  	text-align: center;
  }
  
  .diy_list_img_box {
  	width: 100%;
  	height: 100%;
  	position: relative;
  }
  .diy_row {
  	display: flex;
  }
  
  .diy_img_sub {
  	margin: 0 20rpx;
  }
  
  .diy_product_name {
  	text-align: left;
  	margin-bottom: 10px;
  }
  
  .delete-container {
  	width: 30rpx;
  	height: 30rpx;
  	position: absolute;
  	top: -2px;
  	right: -3px;
  }
  
  .goods-other {
  	color: #909399;
  	width: 100%;
  	height: 100rpx;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	margin-bottom: 20rpx;
  }
  
  .dashed-line {
  	margin: 20rpx;
  	border-top: 1px dashed #000;
  }
  
  .footer {
  	display: flex;
  	justify-content: center;
  }
	.map_btn {
		text-align: center;
		padding: 8px;
		border: 1px solid #e5e5e5;
		border-radius: 50px;
		color: #6a6a6a;
	}
</style>