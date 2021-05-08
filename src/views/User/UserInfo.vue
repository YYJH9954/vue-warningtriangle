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
        <el-input placeholder="请输入搜索内容" v-model="searchInfo" clearable>
          <template #append>
            <el-button @click="getUserInfoList()">
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
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- //用户信息表格 -->
    <el-table
      :data="UserInfoList"
      border
      style="width: 100%"
      ref="UserInfoListRef"
    >
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.user_tel }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.user_email }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.user_createdtime }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.user_birth }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.user_sex }}</span>
            </el-form-item>
            <el-form-item label="职业">
              <span>{{ props.row.user_job }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.user_path }}</span>
            </el-form-item>
            <el-form-item-other>
              <!-- 删除按钮 -->
              <el-button
                size="small"
                type="danger"
                plain
                @click="deleteUserInfo(props.row.user_id)"
                >删除用户详情</el-button
              >
            </el-form-item-other>
          </el-form>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index" label="id" width="50px"> </el-table-column>
      <el-table-column prop="" label="头像"
        ><el-avatar
          size="medium"
          src="https://th.bing.com/th/id/R24592b4b02b99062fb5c5dccdf96f324?rik=Thpz9L1Z9RFUhA&riu=http%3a%2f%2fimg2.woyaogexing.com%2f2017%2f06%2f20%2f0815e76a1cc58ed4!400x400_big.jpg&ehk=nPRSfK5y2gBZHGmS69ITcYss761YOj49qR8ZnSdwtAg%3d&risl=&pid=ImgRaw"
        ></el-avatar
      ></el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        width="150px"
      ></el-table-column>
      <el-table-column prop="user_psd" label="密码"> </el-table-column>
      <el-table-column prop="user_tel" label="手机号"> </el-table-column>
      <el-table-column prop="user_email" label="邮箱"> </el-table-column>
      <el-table-column prop="user_createdtime" label="创建时间">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.user_createdtime
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template v-slot="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editUserInfoDialog(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteUserAll(scope.row.user_tel)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 添加用户的对话框 -->
  <el-dialog
    title="添加用户"
    v-model="addDialogVisible"
    @close="addDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="addUserInfoForm"
      :rules="addUserInfoFormRules"
      ref="addUserInfoRef"
    >
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
        prop="user_name"
        clearable
      >
        <el-input v-model="addUserInfoForm.user_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="user_psd">
        <el-input v-model="addUserInfoForm.user_psd" show-password clearable>
        </el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        :label-width="formLabelWidth"
        prop="checkPsd"
      >
        <el-input v-model="addUserInfoForm.checkPsd" clearable show-password>
        </el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="user_tel"
      >
        <el-input v-model="addUserInfoForm.user_tel" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="user_email"
      >
        <el-input v-model="addUserInfoForm.user_email" clearable></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item
            label="性别"
            prop="user_sex"
            :label-width="formLabelWidth"
            size="small"
          >
            <el-radio v-model="addUserInfoForm.user_sex" label="男" border
              >男</el-radio
            >
            <el-radio v-model="addUserInfoForm.user_sex" label="女" border
              >女</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="生日"
            prop="user_birth"
            :label-width="formLabelWidth"
          >
            <div class="block">
              <el-date-picker
                v-model="addUserInfoForm.user_birth"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item
            label="职业"
            :label-width="formLabelWidth"
            prop="user_job"
          >
            <el-input v-model="addUserInfoForm.user_job" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="地址"
            :label-width="formLabelWidth"
            prop="user_path"
          >
            <el-input v-model="addUserInfoForm.user_path" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span>
        <el-button @click="addDialogClosed">取 消</el-button>
        <el-button type="primary" @click="addUserInfo('addUserInfoRef')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 编辑用户的对话框 -->
  <el-dialog
    title="编辑用户"
    v-model="editDialogVisible"
    @close="editDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="editUserInfoForm"
      :rules="editUserInfoFormRules"
      ref="editUserInfoRef"
    >
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
        prop="user_name"
        clearable
      >
        <el-input v-model="editUserInfoForm.user_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="user_psd">
        <el-input v-model="editUserInfoForm.user_psd" show-password disabled>
        </el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="user_tel"
      >
        <el-input v-model="editUserInfoForm.user_tel" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="user_email"
      >
        <el-input v-model="editUserInfoForm.user_email" clearable></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item
            label="性别"
            prop="user_sex"
            :label-width="formLabelWidth"
            size="small"
          >
            <el-radio v-model="editUserInfoForm.user_sex" label="男" border
              >男</el-radio
            >
            <el-radio v-model="editUserInfoForm.user_sex" label="女" border
              >女</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="生日"
            prop="user_birth"
            :label-width="formLabelWidth"
          >
            <div class="block">
              <el-date-picker
                v-model="editUserInfoForm.user_birth"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item
            label="职业"
            :label-width="formLabelWidth"
            prop="user_job"
          >
            <el-input v-model="editUserInfoForm.user_job" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="地址"
            :label-width="formLabelWidth"
            prop="user_path"
          >
            <el-input v-model="editUserInfoForm.user_path" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span>
        <el-button @click="editDialogClosed">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserInfo('editUserInfoRef', editUserInfoForm.user_id)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>


<script>

export default {
  data () {
    //验证密码规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.addUserInfoForm.checkPsd !== '') {
          this.$refs.addUserInfoRef.validateField('checkPsd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addUserInfoForm.user_psd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    //验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

      if (regEmail.test(value)) {
        //合法邮箱
        // console.log(regEmail.test(value))
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    };
    //验证手机规则
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      const regTel = /^[1]([3-9])[0-9]{9}$/
      if (regTel.test(value)) {
        //合法邮箱
        return callback()
      }
      callback(new Error('请输入合法手机号'))
    };
    return {
      UserInfoList: [],
      searchInfo: '',//搜索内容
      addDialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: '100px',
      addUserInfoForm: {//添加用户详情
        user_name: '',
        user_psd: '',
        checkPsd: '',
        user_tel: '',
        user_email: '',
        user_birth: '',
        user_sex: '男',
        user_job: '',
        user_path: ''
      },
      editUserInfoForm: {//编辑用户详情
        user_name: '',
        user_psd: '',
        user_tel: '',
        user_email: '',
        user_birth: '',
        user_sex: '',
        user_job: '',
        user_path: ''
      },
      //添加表单验证规则对象
      addUserInfoFormRules: {
        user_name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        user_psd: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        checkPsd: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        user_tel: [
          { required: true, validator: checkTel, trigger: 'blur' },
        ],
        user_email: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
      },
      //编辑表单的验证规则对象
      editUserInfoFormRules: {
        user_name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        user_email: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
        // user_tel: [
        //   { required: true, validator: checkTel, trigger: 'blur' },
        // ],

      },

    }
  },
  created () {
    this.getUserInfoList()
  },
  methods: {
    // 得到用户详情信息
    getUserInfoList () {
      console.log(this.searchInfo)
      this.$axios({
        url: "/api/getUserInfo?search=" + this.searchInfo,
        method: 'get',//method默认是get请求
      }).then(res => {
        this.UserInfoList = res.data.list
        console.log(this.UserInfoList)
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    //点击按钮，添加新用户
    addUserInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/users/regUser?user_name=' + this.addUserInfoForm.user_name +
            '&user_psd=' + this.addUserInfoForm.user_psd +
            '&user_tel=' + this.addUserInfoForm.user_tel +
            '&user_email=' + this.addUserInfoForm.user_email +
            '&user_birth=' + this.addUserInfoForm.user_birth +
            '&user_sex=' + this.addUserInfoForm.user_sex +
            '&user_job=' + this.addUserInfoForm.user_job +
            '&user_path=' + this.addUserInfoForm.user_path)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.addDialogVisible = false
                // 清除数据
                this.$refs.addUserInfoRef.resetFields()
                // 重新获取用户信息列表数据
                this.getUserInfoList()
              }
              else if (res.data.code == 400) {
                this.$message.warning(res.data.msg)
              }
              else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          console.log('addUserInfo fail !!');
          return false;
        }
      });
    },
    //点击按钮，编辑用户信息
    editUserInfo (formName, value) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/admins/editUserInfo?user_id=' + value +
            '&user_name=' + this.editUserInfoForm.user_name +
            '&user_tel=' + this.editUserInfoForm.user_tel +
            '&user_email=' + this.editUserInfoForm.user_email +
            '&user_birth=' + this.editUserInfoForm.user_birth +
            '&user_sex=' + this.editUserInfoForm.user_sex +
            '&user_job=' + this.editUserInfoForm.user_job +
            '&user_path=' + this.editUserInfoForm.user_path)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.editDialogVisible = false
                // 清除数据
                this.$refs.editUserInfoRef.resetFields()
                // 重新获取用户信息列表数据
                this.getUserInfoList()
              }
              else if (res.data.code == 400) {
                this.$message.warning(res.data.msg)
              }
              else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          console.log('addUserInfo fail !!');
          return false;
        }
      });
    },
    //编辑用户信息
    editUserInfoDialog (value) {
      this.editUserInfoForm = value
      this.editDialogVisible = true
    },
    //监听添加管理员对话框的关闭事件
    addDialogClosed () {
      this.$refs.addUserInfoRef.resetFields()
      this.addDialogVisible = false
    },
    //监听编辑管理员对话框的关闭事件
    editDialogClosed () {
      this.$refs.editUserInfoRef.resetFields()
      this.editDialogVisible = false
    },
    //删除用户信息全部
    deleteUserAll (value) {
      this.$confirm('此操作将永久删除该用户所有信息,真的删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/admins/deleteUserAll?user_tel=' + value)
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              });
              // 重新获取用户信息列表数据
              this.getUserInfoList()
            }
          })
          .catch(function (error) {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //删除用户详情
    deleteUserInfo (value) {
      this.$confirm('此操作将永久删除该用户详情信息,真的删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/admins/deleteUserInfo?user_id=' + value)
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              });
              // 重新获取用户信息列表数据
              this.getUserInfoList()
            }
          })
          .catch(function (error) {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}

</script>

<style>
</style>