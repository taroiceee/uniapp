<template>
  <view class="charts-box">
    <cc-newsTabs :tabArr="tabs" @tabChange="tabChange"></cc-newsTabs>
    <qiun-data-charts type="column" :opts="opts" :chartData="chartData" style="margin-top: 20rpx" />
  </view>
</template>

<script>
import ccNewsTabs from '../../components/cc-newsTabs/cc-newsTabs.vue';
import qiunDataCharts from '../../components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';

export default {
  name: 'Home',
  components: {
    ccNewsTabs,
    qiunDataCharts,
  },
  props: {
    vm: {
      type: Object,
      default: function () {
        return {
          xAxis: 'xAxis',
          names: 'names',
          values: 'values',
        };
      },
    },
  },
  data() {
    return {
      timer: null,
      tabs: [],
      chartData: null,
      opts: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
          rotateLabel: true,
          rotateAngle: -90,
          marginTop: 10,
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },
    };
  },
  created() {
    for (var i = 0; i < this.vm.tabs.length; i++) {
      this.tabs.push({
        name: this.vm.tabs[i],
        id: i,
      });
    }
  },
  methods: {
    tabChange(currentIndex) {
      this.$emit('changeTab', this.tabs[currentIndex].name);
    },
    setData() {
      const categories = this.vm.xAxis;
      const res = {
        categories,
        series: [],
      };
      this.vm.names.forEach((value, index) => {
        const data = [];
        this.vm.values.forEach((v, i) => {
          data.push(parseFloat(v[index]));
        });
        res.series.push({
          name: value,
          data: data,
        });
      });
      this.chartData = JSON.parse(JSON.stringify(res));
    },
  },
  watch: {
    vm: {
      immediate: true,
      handler() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setData();
        }, 300);
      },
    },
  },
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  margin-top: 30px;
}
.charts-box .content {
  background-color: #f8f8f8;
  height: 15% !important;
  overflow: hidden;
}
</style>
