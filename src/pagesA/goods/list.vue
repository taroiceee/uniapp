<template>
  <view id="page_goods_list" class="page_goods_list" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
    <tn-nav-bar>产品展示</tn-nav-bar>

    <view class="search-wrapper">
      <Search
        v-model="query.title"
        placeholder="搜索产品"
        @input="(val) => inputValue(val, 'title')"
        @search="search_"
        @cancel="cancel"
      />
    </view>
    <view class="goods-wrapper">
      <scroll-view scroll-y class="left-aside">
        <!-- :class="{ active: index === selected }" -->
        <view
          v-for="(item, index) in types"
          :key="item.id"
          class="f-item"
          :class="{ active: index === selected }"
          @click="searchType(item, index)"
        >
          {{ item.text }}
        </view>
      </scroll-view>
      <scroll-view scroll-with-animation scroll-y class="right-aside" @scrolltolower="lowerBottom">
        <view class="goods-list">
          <view class="guess-section">
							    <view
		      v-for="(item, index) in productList"
		      :key="index"
		      class="guess-item"
		      @click="goodsClickFn('/pagesA/goods/details?goods_id=' + item[vm.goods_id], item)"
		    >
												              <view class="image-wrapper">
                <image :src="$fullImgUrl(item[vm.img])" mode="aspectFill"></image>
              </view>
              <text class="title clamp text-ellipsis-2">{{ item[vm.title] }}</text>
              <text class="title2 clamp text-ellipsis-2">{{ item.description }}</text>
              <view class="price-wrapper">
		            <view class="price"> ￥{{ item[vm.price] | keepTwoNum }} </view>
	                <view class="price_ago"> ￥{{ item[vm.price_ago] | keepTwoNum }} </view>
              </view>
									<view class="item-row item-rate">
					<view class="value rate">
						<tn-rate
							:disabled="true"
							v-model="item['score_num']"
							allowHalf
							activeColor="#f7ba2a"
							inactiveColor="#f7ba2a"
							:size="24"
							:gutter="0"
						></tn-rate>
						<text class="score_num_text" style="margin-left: 5px">{{ item['score_num'] }}</text>
					</view>
				</view>
												
			  <view class="info">
			  	<view class="sales">销量<text>{{ item[vm.sales] }}</text></view>
			  	<view class="inventory">库存<text>{{ item[vm.inventory] }}</text></view>
			  </view>
			  <view class="operation">
			  	<view class="add_cart" v-if="$check_cart_page('/' + item.source_table + '/details')" @click.native.stop="add_cart(item)">
			  		<image src="@/static/img/cart_b.png"></image>
			  	</view>
			  </view>
								  <view class="checkbox-container">
			  	<checkbox-group @change="handleChecked(item)">
			  		<label>
			  			<checkbox :checked="item.checked"
			  				style="transform:scale(0.7)" />
			  			<text>对比</text>
			  		</label>
			  	</checkbox-group>
			  </view>
												            </view>
          </view>
          <view class="medicine-title">
            {{ no_data ? '没有更多数据了～' : '下拉加载更多' }}
          </view>
        </view>
      </scroll-view>
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
import { setGoodsApi } from '@/api/goods';
import { getCartListApi, setCartApi, addCartApi } from '@/api/cart';

export default {
  components: {
    Search,
  },
  filters: {
    //过滤器 保留两位
    keepTwoNum: function (value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
  data() {
    return {
      list: [],
      selected: 0,
      query: {
        title: '',
        page: 1,
        size: 10,
		like: 0,
        type: '',
        orderby: 'hits desc',
      },
      // 分类
      types: [{ value: '', text: '全部' }],
      vm: {
        goods_id: 'goods_id',
        img: 'img',
        title: 'title',
        price: 'price',
		integral: 'integral',
        price_ago: 'price_ago',
        sales: 'sales',
        hits: 'hits',
        source_table: 'source_table',
        description: 'description',
		inventory: 'inventory',
      },
      no_data: false,
      		  imgList: [
	  	{
	  		title: "封面图",
	  		name: "img",
	  	},
	  ],
	  itemList: [
	  	{
	  		title: "标题",
	  		name: "title",
	  		},
	  ],
	  goods: [],
	  productList: [],
	  isDrawerOpen: false,
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
		// 阻止事件冒泡
		event.stopPropagation();
		
		const realIndex = this.productList.findIndex(p => p.goods_id === product.goods_id);
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
		const realIndex = newList.findIndex(item => item.goods_id === val.goods_id);
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
		    async getScore() {
      const arr = JSON.parse(JSON.stringify(this.list));
      Promise.all(
        arr.map(async (item) => {
          const url = `~/api/score/avg`;
          const params = {
            field: "score_num",
            source_table: "goods",
            source_field: "goods_id",
            source_id: item.goods_id,
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
											this.productList = this.list;
					        });
    },
		                        /**
     * 触底加载
     */
    lowerBottom() {
      if (this.no_data) {
        return;
      }
      this.query.page++;
      this.get_list();
    },
    /**
     * 跳转商品详情
     */
    goodsClickFn(url, o) {
      setGoodsApi(o.goods_id, {
        hits: parseInt(o.hits) + 1,
      }).then((res) => {
        if (res.result) {
          uni.navigateTo({
            url,
          });
        } else {
          this.$toast(res.error.message);
        }
      });
    },
    /**
     * 获取商品列表
     */
    get_list() {
      this.$get('/goods/get_list', this.query, (res) => {
        if (this.query.page === 1) {
          this.list = [];
          this.no_data = false;
        }
        this.list = this.list.concat(res.result.list);
        if (this.list.length >= res.result.count) {
          this.no_data = true;
        }
      });
    },
    /**
     * 添加商品过滤
     */
    get_goods_type() {
      this.$get('/goods_type/get_list', {}, (res) => {
        if (res.result) {
          let list = res.result.list;
          list.map((obj) => {
            this.types.push({ value: obj.name, text: obj.name });
          });
        }
      });
    },
	/**
	 * 添加购物车
	 */
	add_cart(obj) {
	  var { title, img, price, price_ago, num_buy: num, description, goods_id, type } = obj;
	  var body = {
	    title,
	    img,
	    price,
	    price_ago,
	    num,
	    price_count: price,
	    description,
	    goods_id,
	    type,
	    user_id: this.userInfo.user_id,
	  };
	  body.num = 1;
	  getCartListApi({
	    goods_id: obj.goods_id,
	    user_id: body.user_id,
	  }).then((res) => {
	    if (res.result.count) {
	      var { cart_id, num, price, price_count } = res.result.list[0];
	      num += 1;
	      price_count += price;
	
	      setCartApi(cart_id, {
	        num,
	        price,
	        price_count,
	      }).then((res) => {
	        this.$toast('已加入购物车', 'success');
	        console.log('更改值');
	      });
	    } else {
	      addCartApi(body).then((res) => {
	        this.$toast('已加入购物车', 'success');
	      });
	    }
	  });
	},

    /**
     * 搜索
     */

    search_() {
      this.query.page = 1;
      this.get_list();
    },
    /**
     * 取消搜索
     */
    cancel() {
      this.query.title = '';
      this.search_();
    },
    // 改变分类标签
    searchType(v, index) {
      this.selected = index;
	  this.query.type = this.types[index]['value'];
      this.query.page = 1;
      this.get_list();
    },
	inputValue(val, key) {
	  this.query[key] = val;
	},
  },
  mounted() {
    this.get_goods_type();
    this.get_list();
  },
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesA/index.scss';
.container {
  	position: relative;
  	height: 100vh;
  }
  .content {
  	padding-bottom: 80rpx;
  	/* 留出底部按钮的空间 */
  }
  .checkbox-container{
  	width: 50%;
  	text-align: center;
  	border: 1px solid #ebeef5;
  	position: absolute;
  	background: #ffffff90;
	top: 5px;
	right: 5px;
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
</style>
