<template>
  <view class="charts-box">
    <qiun-data-charts type="rose" :opts="opts" :chartData="chartData" />
  </view>
</template>

<script>
import qiunDataCharts from '../../components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';
export default {
  components: {
    qiunDataCharts,
  },
  props: ['list'],
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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
        padding: [5, 5, 5, 5],
        enableScroll: false,
        legend: {
          show: true,
          position: 'left',
          lineHeight: 25,
        },
        extra: {
          rose: {
            type: 'area',
            minRadius: 50,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 2,
            borderColor: '#FFFFFF',
          },
        },
      },
    };
  },
  created() {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      series: [
        {
          data: this.list,
        },
      ],
    };
    this.chartData = JSON.parse(JSON.stringify(res));
  },
  methods: {},
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 300px;
  margin-top: 30px;
}
</style>
