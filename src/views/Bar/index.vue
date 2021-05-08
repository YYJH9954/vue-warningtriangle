x<template>
  <el-container class="bar-container">
    <!-- 头部区域 -->
    <el-header height="5rem">
      <div>
        <img src="../../assets/img/Top_logo.png" alt="" />
        <span>智能三角牌后台管理系统</span>
      </div>
      <div>
        <el-dropdown trigger="click">
          <span>
            <img :src="userImg" class="userImg" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="AdminInfoDialog = true"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左边菜单栏 -->
      <el-aside :width="isCollapse ? '64px' : '12rem'">
        <!-- 左侧栏收缩按钮 -->
        <div class="togle-button" @click="togleCollapse">
          <!-- 点击之后变换图标 -->
          <i class="el-icon-s-fold" v-show="isCollapse == false"></i>
          <i class="el-icon-s-unfold" v-show="isCollapse == true"></i>
        </div>
        <!-- 左侧栏菜单区域 -->
        <!-- //collapse-判断点击按钮进行折叠
        // collapse-transitio取消时的折叠动画 -->
        <el-menu
          :uniqueOpened="true"
          default-active="2"
          text-color=" #ffffff"
          active-text-color="#06afaff1"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color=" #0a504b"
          :router="true"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-s-home"></i>
              <span>系统</span>
            </template>
            <el-menu-item-group>
              <template #title>系统主页</template>
              <el-menu-item index="/home">系统主页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-s-promotion"></i>
              <span>硬件管理</span>
            </template>
            <el-menu-item-group>
              <template #title>硬件管理</template>
              <el-menu-item index="/warningTriangle"
                >三角警告牌列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="3">
            <!-- 一级菜单模板区域 -->
            <template #title>
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group>
              <template #title>用户管理</template>
              <el-menu-item index="/userMessage">用户信息</el-menu-item>
              <el-menu-item index="/userInfo">用户详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <!-- 一级菜单模板区域 -->
            <template #title>
              <!-- 图标 -->
              <i class="el-icon-s-custom"></i>
              <!-- 文本 -->
              <span>管理员</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group>
              <template #title>管理员管理</template>
              <el-menu-item index="/admin">管理员详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-s-check"></i>
              <span>权限列表</span>
            </template>
            <el-menu-item-group>
              <template #title>权限列表</template>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

  <!-- 管理员个人信息 -->
  <el-dialog
    title="管理员信息表"
    v-model="AdminInfoDialog"
    @close="AdminInfoClosed"
  >
    <!-- 内容主体区域 -->
    <el-form :model="AdminInfoForm">
      <el-form-item label="管理员头像" :label-width="formLabelWidth">
        <img :src="userImg" alt="" />
      </el-form-item>
      <el-form-item label="管理员名称" :label-width="formLabelWidth">
        <el-input
          v-model="AdminInfoForm.administrator_name"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          v-model="AdminInfoForm.administrator_psd"
          show-password
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="AdminInfoForm.administrator_tel" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="administrator_email"
      >
        <el-input
          v-model="AdminInfoForm.administrator_email"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="创建时间"
        :label-width="formLabelWidth"
        prop="administrator_createdtime"
      >
        <el-tag type="success"> 2021-03-28 23:59:59</el-tag>
      </el-form-item>
      <el-form-item
        label="身份"
        :label-width="formLabelWidth"
        prop="administrator_right"
      >
        <el-tag type="warning"> 超级管理员</el-tag>
      </el-form-item>
      <el-form-item
        label="管理权限"
        :label-width="formLabelWidth"
        prop="administrator_right"
      >
        <el-tag>修改管理员数据</el-tag>
        <el-tag>添加管理员数据</el-tag>
        <el-tag>删除管理员数据</el-tag>
        <el-tag>修改三角警告牌信息</el-tag>
        <el-tag>删除三角警告牌信息</el-tag>
        <el-tag>添加三角警告牌信息</el-tag>
        <el-tag>修改用户数据</el-tag>
        <el-tag>删除用户数据</el-tag>
        <el-tag>添加用户数据</el-tag>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {

    return {
      userImg: require('../../assets/logo.gif'),
      formLabelWidth: "100px",
      AdminInfoForm: {
        administrator_name: '',
        administrator_psd: '',
        administrator_tel: '',
        administrator_email: '',
        administrator_right: '',
        administrator_createdtime: ''
      },
      AdminInfoDialog: false,

      userImg: require("../../assets/logo.gif"),
      //是否折叠
      isCollapse: false
    }
  },
  created () {
    this.getAdminInfo()
  },
  methods: {
    //点击按钮切换按钮折叠与展开
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    getAdminInfo () {
      this.$axios({
        url: "/api/getAdminInfo",
        method: 'get',//method默认是get请求
      }).then(res => {
        this.AdminInfoForm = res.data.list[0]
        console.log(this.AdminInfoForm)
      })
    },
    AdminInfoClosed () {
      this.AdminInfoDialog = false
    },
    //退出
    logout () {
      localStorage.clear()
      this.$router.push("/login")
    },
  }
}
</script>


<style lang="scss" scoped>
.bar-container {
  height: 100%;
}
.el-header {
  justify-content: space-between; //两端布局
  position: relative;
  background: linear-gradient(to bottom right, #3c8888f1, #1c5658e1);
  display: flex;
  padding-left: 1rem;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      height: 2.5rem;
    }
    span {
      margin-left: 1rem;
      color: #e0e0e0;
      text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
        0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
        0px 8px 7px #393c42;
    }
    .userImg {
      border: 2px solid #014b4b71; //边框
      width: 3rem;
      height: 3rem;
      border-radius: 5px; //圆角
    }
  }
}
.el-aside {
  position: relative;
  background: linear-gradient(to bottom, #042b20e8, #0a504be8);
  .el-menu {
    border-right: none;
    .el-submenu {
      position: relative;
      background: linear-gradient(
        to bottom right,
        #0a504be8,
        rgba(11, 59, 61, 0.781) e8,
        #137e77e8
      );
      .el-popper is-light is-pure {
        background: linear-gradient(to bottom, #042b20e8, #0a504be8);
      }
      .el-menu-item {
        position: relative;
        background: linear-gradient(to bottom right, #1c6063, #2f7e7eea);
      }
    }
  }
}
.el-main {
  background-color: #f4f4f8da;
}

.togle-button {
  cursor: pointer;
  color: #ffffff;
  text-align: center;
}
</style>