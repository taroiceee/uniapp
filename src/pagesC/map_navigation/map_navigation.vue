<!-- // 地图导航功能开始 -->
<template>
  <view
    id="map_navigation"
    class="map_navigation"
    :style="{
      paddingTop: vuex_custom_bar_height + 'px',
      paddingBottom: vuex_safe_area_bottom + 'px',
    }"
  >
    <tn-nav-bar>地图导航</tn-nav-bar>
    <view class="">
      <view class="tab-pane">
        <!-- 地图 -->
        <view class="warp">
          <view class="container-fluid">
            <view class="view">
              <view class="diy_title">
                <view class="addressSearch" @click="openLocation">{{address ? address : '地址搜索'}}</view>
              </view>
            </view>
            <map
              id="map"
              style="width: 100%; height: calc(100vh - 90px);"
              :latitude="latitude"
              :longitude="longitude"
              :markers="markers"
            >
            </map>
          </view>
          <view @click="navigation" class="navigation">导航</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      address: '',
      latitude: 22.556481,
      longitude: 113.946782,
      markers: [{
        id: 1,
        width: 30,
        height: 30,
        latitude: 22.556481,
        longitude: 113.946782,
        iconPath: '../../static/map_marker.png',
      }]
    }
  },
  methods: {
    openLocation() {
      const that = this;
      uni.chooseLocation({
        latitude: that.latitude,
        longitude: that.longitude,
        success: function(res) {
          console.log(res,'搜索调用成功');
          that.address = res.address;
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          let marker = [{
            id: 1,
            width: 30,
            height: 30,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '../../static/map_marker.png',
          }]
          // 存入本地存储marker
          uni.setStorageSync('markerData', marker);
        },
        fail: function(err) {
          console.log(err,'搜索调用失败');
        }
      })
    },
    navigation() {
      // 调用导航
      const that = this;
      uni.openLocation({
        latitude: that.latitude,
        longitude: that.longitude,
        scale: 18,
        name: that.address,
        success: function(res) {
          console.log(res,'导航调用成功');
        },
        fail: function(err) {
          console.log(err,'导航调用失败');
        }
      })
    },
    getLocation() {
      // uni.getLocation
      const that = this;
      uni.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log(res,'当前定位调用成功');
          that.address = '';
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          let marker = [{
            id: 1,
            width: 30,
            height: 30,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '../../static/map_marker.png',
          }]
          // 存入本地存储marker
          uni.setStorageSync('markerData', marker);
        }
      })
    }
  },
  created() {
    
  },
  mounted() {
    this.getLocation();
  },
  onShow() {
    let markerData = uni.getStorageSync('markerData');
    if(markerData) {
      this.markers = markerData;
    }
  },
  onHide() {
    this.getLocation();
  }
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesC/index.scss';
.diy_title {
  padding: 5px 10px;
  width: 100%;
}
.addressSearch {
  width: 100%;
  height: 35px;
  line-height: 26px;
  padding: 4px 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  font-size: 14px;
  color: #807878;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.navigation {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #0079fe;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  z-index: 999;
}
</style>
<!-- // 地图导航功能结束 -->
