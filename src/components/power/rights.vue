<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- //卡片试图区域 -->
  <el-card class="box-card">
    <!-- //权限信息表格 -->
    <el-table :data="rightsList" stripe style="width: 100%">
      <el-table-column prop="right_id" label="序号" width="100px">
      </el-table-column>
      <el-table-column prop="right_name" label="权限名称"></el-table-column>
      <el-table-column prop="right_level" label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.right_level == '1'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.right_level == '2'"
            >二级</el-tag
          >
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      //权限 
      rightsList: []
    }
  },

  created () {
    this.getRightList()
  },
  methods: {
    //获取权限列表
    getRightList () {
      this.$axios.get("/api/getRight?form=list").then((res) => {
        console.log(res)
        this.rightsList = res.data.list
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
</style>