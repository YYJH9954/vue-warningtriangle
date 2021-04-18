<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>硬件管理</el-breadcrumb-item>
    <el-breadcrumb-item>三角警告牌列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- //卡片试图区域 -->
  <el-card class="box-card">
    <!-- 搜索与添加区域 -->
    <!-- 见习0 -->
    <el-row :gutter="20">
      <!-- 占地7栅栏 -->
      <el-col :span="7">
        <el-input placeholder="请输入搜索内容">
          <template #append>
            <el-button>
              <span class="svg-container">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-search"></use>
                </svg>
              </span>
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          >添加三角警告牌</el-button
        >
      </el-col>
    </el-row>
    <!-- //用户信息表格 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="equip_id" label="设备id"> </el-table-column>
      <el-table-column prop="lon" label="经度（半球）"> </el-table-column>
      <!-- <el-table-column prop="lon_h" label="经度半球"> </el-table-column> -->
      <el-table-column prop="lat" label="纬度（半球）"> </el-table-column>
      <!-- <el-table-column prop="lat_h" label="纬度半球"> </el-table-column> -->
      <el-table-column prop="switch" label="开关"> </el-table-column>
      <el-table-column prop="incident_site" label="事故发生大道">
      </el-table-column>
      <el-table-column prop="address" label="事故发生地"> </el-table-column>
      <el-table-column prop="time" label="时间"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editAdminDialog(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteAdmin(scope.row.administrator_tel)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="user_birth" label="生日"> </el-table-column>
      <el-table-column prop="user_sex" label="性别"> </el-table-column>
      <el-table-column prop="user_job" label="职业"> </el-table-column>
      <el-table-column prop="user_path" label="地址"> </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },
  methods: {

  }
}
</script>

<style>
</style>