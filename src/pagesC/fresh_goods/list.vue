<template>
  <view :style="{ paddingTop: vuex_custom_bar_height + 'px' }" class="page_diy_list page_fresh_goods_list container">
	<view class="content">
	  <tn-nav-bar>生鲜商品列表</tn-nav-bar>
	  <view class="page-list" id="page_diy_list">
	        <!-- 筛选模块(开始) -->
	        <view class="search-wrap">
	  	    	      	          <Search v-model="query.commodity_number" placeholder="搜索商品编号" @search="search_" @cancel="search_cancel('commodity_number')" @input="(val) => inputValue(val, 'commodity_number')" />
	      	    	  	    	  	    	  	    	      	          <Search v-model="query.store_address" placeholder="搜索店铺地址" @search="search_" @cancel="search_cancel('store_address')" @input="(val) => inputValue(val, 'store_address')" />
	      	    	  	    	      	          <Search v-model="query.shop_name" placeholder="搜索店铺名称" @search="search_" @cancel="search_cancel('shop_name')" @input="(val) => inputValue(val, 'shop_name')" />
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
	              @click=" $navTo('/pagesC/fresh_goods/details?fresh_goods_id=' + o['fresh_goods_id'])">
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'commodity_number')">
	                <view class="label" v-if="true">
	                  <span>商品编号</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['commodity_number'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'order_rules')">
	                <view class="label" v-if="true">
	                  <span>下单规则</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['order_rules'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'seller_user')">
	                <view class="label" v-if="true">
	                  <span>卖家用户</span>
	                </view>
	    	                <view class="value">
	                  <image class="diy-create-avatar" :src="$fullImgUrl(get_user_seller_user(o['seller_user']).avatar) || '/static/img/default.png'" mode="scaleToFill" />
	                  <span>{{ get_user_seller_user(o['seller_user']).nickname }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'store_address')">
	                <view class="label" v-if="true">
	                  <span>店铺地址</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['store_address'] }}</span>
	                </view>
	    	              </view>
	  	              <view class="item-row  " v-if="0 && $check_field('get', 'shop_name')">
	                <view class="label" v-if="true">
	                  <span>店铺名称</span>
	                </view>
	    	                <view class="value">
	                  <span>{{ o['shop_name'] }}</span>
	                </view>
	    	              </view>
	  	  	  			<view class="item-row item-rate" v-if="$check_option('/fresh_goods/details','can_show_score')">
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
      url_get_list: '~/api/fresh_goods/get_list?like=0',
                        // 用户列表
      list_user_seller_user: [],
                  					      query: {
                commodity_number: "", // 商品编号
                            store_address: "", // 店铺地址
                        shop_name: "", // 店铺名称
                fresh_goods_id: 0, // ID
        page: 1,
        size: 10,
      },
      list: [],
	  imgList: [
	  	  ],
	  itemList: [
	  	  	{
	  		title: "商品编号",
	  		name: "commodity_number",
	  		},
	  	  	{
	  		title: "下单规则",
	  		name: "order_rules",
	  		},
	  	  	{
	  		title: "卖家用户",
	  		name: "seller_user",
	  		},
	  	  	{
	  		title: "店铺地址",
	  		name: "store_address",
	  		},
	  	  	{
	  		title: "店铺名称",
	  		name: "shop_name",
	  		},
	  	  ],
	  goods: [],
	  productList: [],
	  isDrawerOpen: false,
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
		const realIndex = this.productList.findIndex(p => p.fresh_goods_id === product.fresh_goods_id);
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
		const realIndex = newList.findIndex(item => item.fresh_goods_id === val.fresh_goods_id);
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
		this.$navTo('/pagesC/fresh_goods/vs_detail');
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
      if (func) {
        func(json);
      }
    },
	/**
	* 获取评分数
	* @param {Object} list
	*/
	async get_score(list) {
		const url = `~/api/score/avg`;
		const params = {
			field: 'score_num',
			source_table: 'fresh_goods',
			source_field: 'fresh_goods_id',
		};
		for (let i = 0; i < list.length; i++) {
			list[i].score_num = 0;
			params.source_id = list[i]['fresh_goods_id'];
			const res1 = await this.$get(url, params);
			if (res1.result && res1.result > 0) {
				list[i].score_num = parseFloat(res1.result.toFixed(1));
			} else if (res1.error) {
				console.error(res1.error);
			}
		}
	},
					                                    /**
     * 获取商家用户用户列表
     */
    async get_list_user_seller_user() {
      var json = await this.$get("~/api/user/get_list?user_group=商家用户");
      if(json.result && json.result.list){
        this.list_user_seller_user = json.result.list;
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_seller_user(id){
      let obj = this.list_user_seller_user;
      let ret = {nickname: "未知用户", avatar: ""};
      for(let i=0;i<obj.length;i++){
        if(obj[i].user_id==id){
          ret = obj[i];
        }
      }
      return ret;
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
            source_table: "fresh_goods",
            source_field: "fresh_goods_id",
            source_id: item.fresh_goods_id,
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
                this.get_list_user_seller_user();
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