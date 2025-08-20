<template>
	<view :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
		<tn-nav-bar>数据对比</tn-nav-bar>
		<view class="leis_box">
			<uni-table :data="getValues" border>
				<uni-tr v-for="(row, rowIndex) in getValues" :key="rowIndex">
					<uni-td v-for="(item, index) in getHeaders" :key="index"
						:class="{'first-column': index === 0, centered: true}">
						<view v-if="row.img === 1 && index" class="diy_field diy_img">
							<image v-if="row[item]" :src="$fullImgUrl(row[item])" style="width: 100%; height: 100%;" />
						</view>
						<view v-else>
							{{ row[item] }}
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	import mixin from '@/libs/mixins/page.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				tableData: [],
				rows: [],
				columns: [
				  { title: "封面图",name: "img",img_top: 1},
				  { title: "标题",name: "title"},
				  { title: "描述",name: "description"},
				  { title: "原价",name: "price_ago"},
				  { title: "卖价",name: "price"},
				  { title: "销量",name: "sales"},
				  { title: "库存",name: "inventory"},
				  { title: "分类",name: "type"}
							  , {title: "商品编号", name: "commodity_number", customize: 1}
									  , {title: "下单规则", name: "order_rules", customize: 1}
												  , {title: "店铺地址", name: "store_address", customize: 1}
									  , {title: "店铺名称", name: "shop_name", customize: 1}
							]
			}
		},
		computed: {
			getHeaders() {
				return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
			},
			getValues() {
				return this.columns.map(item => {
					return this.tableData.reduce((pre, cur, index) => Object.assign(pre, {
						['value' + index]: cur[item.name]
					}), {
						'title': item.title,
						'img': item.img_top
					});
				});
			},
		},
		methods: {
			getData(data) {
				if (data) {
					this.rows = this.columns.map((col, index) => {
						let row = {
							title: col.title
						};
						data.forEach((item, i) => {
							row['col' + i] = item[col.name];
						});
						return row;
					});
				}
			}
		},
		created() {
			this.tableData = this.$store.state.goods.goods;
			this.getData(this.tableData);
		}
	}
</script>

<style scoped>
	.leis_box {
		display: flex;
		overflow-x: auto;
	}

	/* 商品功能对比-bugfix（开始） */
	.first-column {
		position: sticky;
		left: 0;
		background-color: #F5F7FA;
		z-index: 1;
	}
	.first-column uni-view {
		width: 140rpx !important;
	}
	/* 商品功能对比-bugfix（结束） */

	.diy_img {
		width: 540rpx;
		height: 480rpx;
		padding: 10px;
		margin-bottom: 10px;
	}

	.centered {
	  text-align: center !important;
	}
</style>