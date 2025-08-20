<!-- // 地图标点开始 -->
<template>
	<view :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
		<tn-nav-bar>影视小说地图</tn-nav-bar>
    <view class="map">
      <map
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      :include-points="markers"
      style="width: 100%; height: 100vh;">
      </map>
    </view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				vuex_custom_bar_height: this.$store.state.custom_bar_height,
				vuex_safe_area_bottom: this.$store.state.safe_area_bottom,
        latitude: 22.556481,
        longitude: 113.946782,
        markers: [],
        
			}
		},
		methods: {
      async get_list() {
        let res = await this.$get('~/api/film_and_television_novels/get_list',{
          page: 1,
          size: 9999,
        });
        this.markers = res.result.list.map((item) => {
          return {
            id: item.film_and_television_novels_id,
            width: 30,
            height: 30,
            latitude: Number(item.mark_lat),
            longitude: Number(item.mark_lng),
            iconPath: '../../static/map_marker.png',
            callout: {
              content: ''
                            	                + '专辑名称：' + item.album_name + '\n'
                                            	                            	                + '作者姓名：' + item.authors_name + '\n'
                                            	                            	                            ,
              // `${item.product_name}\n${item.classification_name}\n定制库存${item.customized_inventory}`,
              color: '#000',
              fontSize: 12,
              padding: 5,
              borderRadius: 4,
              bgColor: '#fff',
              textAlign: 'center',
              display: 'ALWAYS',
            }
          }
        })
      }
		},
		created() {
			this.get_list();
		}
	}
</script>

<style scoped>

</style>
<!-- // 地图标点结束 -->