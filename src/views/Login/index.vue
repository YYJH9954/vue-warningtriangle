<template>
  <!-- //登陆组件 -->
  <div class="login_container">
    <!-- //引入粒子背景 -->
    <Particles
      id="tsparticles"
      :options="{
        background: {
          color: {
            value: '#ffffff',
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#0a504b',
          },
          links: {
            color: '#0a504b',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 500,
            },
            value: 60,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'triangle',
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }"
    />
    <div class="login_box">
      <!-- 头像 -->
      <div class="logo_box">
        <img src="../../assets/logo.gif" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        status-icon
        :rules="loginFormRules"
        size="medium"
      >
        <!-- //用户名——手机号 -->
        <!-- prop=""指定名字规则验证 -->
        <el-form-item prop="administrator_tel">
          <el-input
            placeholder="请输入手机号"
            v-model="loginForm.administrator_tel"
            clearable
          >
            <template #prefix>
              <span class="svg-container">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-administrater1"></use>
                </svg>
              </span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="administrator_psd">
          <el-input
            v-model="loginForm.administrator_psd"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <span class="svg-container">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-password"></use>
                </svg>
              </span>
            </template>
          </el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginFormRef')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data () {
    //验证手机号规则
    var checkTel = (rule, value, callback) => {
      let reg = /^[1]([3-9])[0-9]{9}$/;
      if (value === '') {
        return callback(new Error('手机号不能为空'));
      }
      else if (!reg.test(value)) {
        return callback(new Error('手机号格式有误'));
      }
      else {
        //验证手机的正则表达式
        // alert('submit!');
        callback();
      }

    };
    //验证密码规则
    var checkPsd = (rule, value, callback) => {
      //字母＋数字：/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      let reg = /^[A-Za-z0-9]{6,20}$/;
      if (value === '') {
        return callback(new Error('密码不能为空'));
      }
      else if (!reg.test(value)) {
        return callback(new Error('密码为6-20数字+字母'));
      }
      else {
        callback();
      }
    };

    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        administrator_tel: '17350228201',
        administrator_psd: '123456',
        // administrator_tel: '',
        // administrator_psd: '',
      },
      //表单验证规则
      loginFormRules: {

        //验证用户名是否合法
        administrator_tel: [
          { validator: checkTel, trigger: 'blur' },
        ],
        //验证密码是否合法
        administrator_psd: [
          { validator: checkPsd, trigger: 'blur' },
        ],
      },
    }
  },
  //方法@click绑定使用
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          console.log(' submit!!');
          this.$axios.post('/api/admins/login?administrator_tel=' + this.loginForm.administrator_tel + '&administrator_psd=' + this.loginForm.administrator_psd)
            .then(res => {
              this.$message({
                type: 'success',
                message: '管理员登陆成功'
              })
              console.log(res);
              localStorage.setItem("Token", "Bearer " + res.data.token);
              this.$router.push('/home');
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          console.log('error submit!!');
          this.$message({
            type: 'warning',
            message: '管理员登陆失败'
          })
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};



</script>



<style lang="scss" scoped>
.login_container {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 100%;
  width: 100%;
}
#tsparticles {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1; //这个z-index 要是不设置 会对登录表单的点击产生干扰
}
.login_box {
  display: flex;
  justify-content: center; /* 水平居中 */
  background-color: #76aaaa5e;
  width: 20rem;
  height: 15rem;
  border-radius: 5px; //圆角
  box-shadow: 0 0 10px 0 #337e7eea;

  .logo_box {
    $back: #70f8cfd2;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 5px solid #edf0f3ed;
    position: absolute;
    box-shadow: 0 0 10px 0 #2f7e7eea;
    transform: translate(0, -50%);
    background-color: $back;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: $back;
    }
  }
}
.login_form {
  position: absolute;
  margin: 65px;
}
</style>