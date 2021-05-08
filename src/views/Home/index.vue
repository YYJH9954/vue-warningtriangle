<template>
  <el-row class="home">
    <el-col :span="8">
      <el-card shadow="hover" body-style="height: 290px">
        <!-- 个人名片展示 -->
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">文穗</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>座右铭：<span>过去的成就是你能力的最有力的证据。</span></p>
          <p>TEL：<span>17350228201</span></p>
          <p>Email：<span>17350228201@163.com</span></p>
          <p>创建时间：<span>2021-03-28 23:59:59</span></p>
        </div>
      </el-card>
      <el-card
        shadow="hover"
        style="margin-top: 20px"
        body-style="height: 400px"
      >
        <echart :chartData="echartData.pressureChart"></echart>
      </el-card>
    </el-col>
    <el-col :span="16">
      <!-- 6个总数展示 -->
      <div class="num">
        <el-card
          shadow="hover"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i class="el-icon-user-solid icon"></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].user_count }}</p>
            <p class="txt">总用户数量</p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i
            class="el-icon-s-custom icon"
            style="background-color: rgba(175, 80, 51, 0.781)"
          ></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].administrator_count }}</p>
            <p class="txt">总管理员数量</p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i
            class="el-icon-s-opportunity icon"
            style="background-color: rgba(62, 114, 211, 0.822)"
          ></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].equip_count }}</p>
            <p class="txt">总硬件数量</p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          style="margin-top: 20px"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i class="el-icon-s-data icon"></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].ifuse_count }}</p>
            <p class="txt">已使用数量</p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          style="margin-top: 20px"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i
            class="el-icon-location icon"
            style="background-color: rgba(175, 80, 51, 0.781)"
          ></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].onoff_count }}</p>
            <p class="txt">正在使用数量</p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          style="margin-top: 20px"
          body-style="width: 250px;height:80px;display:flex;padding:0"
        >
          <i
            class="el-icon-s-marketing icon"
            style="background-color: rgba(62, 114, 211, 0.822)"
          ></i>
          <div class="detail">
            <p class="number">{{ this.countData[0].user_equip_count }}</p>
            <p class="txt">用户绑定数量</p>
          </div>
        </el-card>
      </div>
      <!-- <div class="self">
        <el-card shadow="hover">
          <div style="height: 280px">
            <div class="block">
              <span class="demonstration">三角牌与二次车祸</span>
              <el-carousel :interval="4000" type="card" height="260px">
                <el-carousel-item v-for="item in pics" :key="item.url">
                  <img
                    :src="item.url"
                    style="width: 100%;height=100%; background-size: cover"
                  />
                </el-carousel-item>
              </el-carousel>
            </div></div
        ></el-card>
      </div> -->
      <div class="self">
        <el-card shadow="hover">
          <echart
            style="height: 280px"
            :chartData="echartData.lineChart"
          ></echart>
        </el-card>
      </div>
      <div class="graph">
        <el-card shadow="hover">
          <echart
            style="height: 260px; width: 350px"
            :chartData="echartData.barChart"
          ></echart>
        </el-card>
        <el-card shadow="hover">
          <echart
            style="height: 260px; width: 350px"
            :chartData="echartData.pieChart"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

import Echart from '../../components/Echarts/index'
export default {
  components: {
    Echart,
  },
  data () {
    return {
      userImg: require('../../assets/logo.gif'),
      countData: [{
        user_count: '',
        administrator_count: '',
        user_equip_count: '',
        equip_count: '',
        ifuse_count: '',
        onoff_count: '',
        user_count_man: '',
        user_count_woman: ''
      }],
      pics: [
        { url: require("../../assets/img/Carousel/1.jpg") },
        { url: require("../../assets/img/Carousel/2.jpg") },
        { url: require("../../assets/img/Carousel/3.jpg") },
        { url: require("../../assets/img/Carousel/4.jpg") },
      ],
      lineChartData: [],
      echartData: {
        lineChart: {
          title: '',
          trigger: '',
          legend: [],
          xData: [],
          series: []
        },
        barChart: {
          title: '',
          xData: [],
          series: []
        },
        pieChart: {
          title: '',
          series: []
        },
        pressureChart: {
          title: '',
          series: []
        }
      }
    }
  },
  created () {
    this.getCount();
    this.getLineChart();
    this.getPieChart();
  },
  mounted () {

  },
  methods: {
    getCount () {
      this.$axios({
        url: "/api/getCount",
        method: 'get',//method默认是get请求
      }).then(res => {
        this.countData = res.data.list
        //用户柱状图
        // 第一步取出series中的name部分键名
        let keyArr = Object.keys(this.countData[0])
        // console.log(keyArr)
        // this.echartData.barChart
        this.echartData.barChart.xData = ["硬件总数", "已使用数量", "正在使用"];// 柱状图x轴
        this.echartData.barChart.title = '详情'
        this.echartData.barChart.series.push({
          name: "总数",
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          data: [
            this.countData[0].equip_count,
            this.countData[0].ifuse_count,
            this.countData[0].onoff_count]
        })
        const user_equip_percent = (this.countData[0].user_equip_count / this.countData[0].user_count) * 100
        //用户仪表盘图
        this.echartData.pressureChart.title = '用户使用率'
        this.echartData.pressureChart.series.push({
          name: '用户使用率',
          type: 'gauge',

          progress: {
            show: true
          },
          data: [{
            value: user_equip_percent,
            name: '用户使用率'
          }]
        })

        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    getLineChart () {
      this.$axios({
        url: "/api/getLineChart",
        method: 'get',//method默认是get请求
      }).then(res => {
        const lineChart = res.data
        // console.log(lineChart)
        //折线图
        this.echartData.lineChart.xData = lineChart.date // 折线图x轴
        this.echartData.lineChart.title = '增长率'
        this.echartData.lineChart.trigger = 'axis'
        this.echartData.lineChart.legend = ['用户增加数', '设备增加数']
        // 第一步取出series中的name部分键名
        let keyArr = Object.keys(lineChart.list[0])
        keyArr.forEach(key => {
          if (key === 'user_months_count') {
            this.echartData.lineChart.series.push({
              name: '用户增加数',
              type: 'line',
              data: lineChart.list.map(item => item[key]),
            })
          }
          if (key === 'equip_months_count') {
            this.echartData.lineChart.series.push({
              name: '设备增加数',
              type: 'line',
              data: lineChart.list.map(item => item[key]),

            })
          }

        })
      }).catch(err => {
        console.log(err)
      })
    },
    getPieChart () {
      this.$axios({
        url: "/api/getPieChart",
        method: 'get',//method默认是get请求
      }).then(res => {
        // this.lineChartData = res.data.list
        const PieChart = res.data.list
        //饼状图
        this.echartData.pieChart.title = '用户男女比例'
        this.echartData.pieChart.series.push({
          data: [{
            name: "男",
            value: PieChart[0].user_count_man,
          },
          {
            name: "女",
            value: PieChart[0].user_count_woman
          }
          ],
          type: 'pie',
          radius: ['40%', '70%'],
        })
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

