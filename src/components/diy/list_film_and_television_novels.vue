<template>
  <view class="cp-list-wrap">
    <!-- 视图 -->
    <view class="cp-list-item" v-for="(o, i) in list" :key="i">
        <view class="item-row  " v-if="1 && $check_index_field('get', 'album_name', '/film_and_television_novels/list')">
        <view class="label" v-if="true">
          <span>专辑名称</span>
        </view>
            <view class="value text">
          <span>{{ o['album_name'] }}</span>
        </view>
          </view>
          <view class="item-row diy-image " v-if="1 && $check_index_field('get', 'album_cover', '/film_and_television_novels/list')">
        <view class="label" v-if=" false">
          <span>专辑封面</span>
        </view>
            <view class="value">
          <image :src="$fullImgUrl(o['album_cover']) || '/static/img/default.png'" mode="scaleToFill" />
        </view>
          </view>
          <view class="item-row  " v-if="1 && $check_index_field('get', 'authors_name', '/film_and_television_novels/list')">
        <view class="label" v-if="true">
          <span>作者姓名</span>
        </view>
            <view class="value text">
          <span>{{ o['authors_name'] }}</span>
        </view>
          </view>
                <view class="content">
        <view class="item-row">
          <view class="value">
            <text class="icon iconfont icon-chakan"></text>
            <text class="text">{{ o['praise_len'] }}</text>
          </view>
        </view>
        <view class="item-row">
          <view class="value">
            <text class="icon iconfont icon-dianzan"></text><text>{{ o['hits'] }}</text>
          </view>
        </view>
      </view>

      <view class="item-row">
        <view class="create_time_block value number">
          <span>{{ $toTime(o.create_time, 'yyyy-MM-dd hh:mm:ss') }}</span>
        </view>
      </view>

      <view class="me-btn btn-see" @click="
          $navTo('/pagesC/film_and_television_novels/details?film_and_television_novels_id=' +
              o['film_and_television_novels_id']
          )
        "
        >查看详情</view
      >
    </view>
    <!-- /视图 -->
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
              };
  },
  methods: {
            },
  created() {
            },
};
</script>

<style lang="scss" scoped>
</style>