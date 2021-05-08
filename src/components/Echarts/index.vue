<template>
  <div style="height: 100%" ref="echart">echart</div>
</template>

<script>
import { handleError } from 'vue'
import * as echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          title: '',
          trigger: '',
          legend: [],
          xData: [],
          series: {},
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    options () {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    },
  },
  data () {
    return {
      echart: null,
      axisOption: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: ''
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          data: []
        },
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          }
        }],
        series: []
      },

      normalOption: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: ''
        },
        legend: {
          data: []
        },
        series: []
      }
    }
  },
  methods: {
    initChart () {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options)
      }
      else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.tooltip.trigger = this.chartData.trigger
        this.axisOption.legend.data = this.chartData.legend
        this.axisOption.title.text = this.chartData.title
        this.axisOption.series = this.chartData.series
      }
      else {
        this.normalOption.legend = this.chartData.legend
        this.normalOption.title = this.chartData.title
        this.normalOption.series = this.chartData.series
      }
    }
  },
}
</script>

<style>
</style>