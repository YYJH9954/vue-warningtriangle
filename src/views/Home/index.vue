<template>
  <div class="home">
    首页到了
    <el-button @click="submitForm"> getAdmin </el-button>
    <el-button @click="logout"> 退出 </el-button>
  </div>
</template>

<script>


export default {
  methods: {
    submitForm () {

      console.log(' submit!!');
      this.$axios({
        url: "/api/getAdmin",
        method: 'get',//method默认是get请求
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }

      }).then(function (res) {
        console.log(res)
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    //退出
    logout () {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
  }
}
</script>
