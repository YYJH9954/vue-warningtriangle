<template>
  <!-- //面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户详情</el-breadcrumb-item>
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
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- //用户信息表格 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="user_psd" label="密码"> </el-table-column>
      <el-table-column prop="user_tel" label="手机号"> </el-table-column>
      <el-table-column prop="user_email" label="邮箱"> </el-table-column>
      <!-- <el-table-column prop="user_birth" label="生日"> </el-table-column>
      <el-table-column prop="user_sex" label="性别"> </el-table-column>
      <el-table-column prop="user_job" label="职业"> </el-table-column>
      <el-table-column prop="user_path" label="地址"> </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
</style>