<template>
  <!-- //面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>管理员</el-breadcrumb-item>
    <el-breadcrumb-item>管理员详情</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- //卡片试图区域 -->
  <el-card class="box-card">
    <!-- 搜索与添加区域 -->
    <!-- 见习0 -->
    <el-row :gutter="20">
      <!-- 占地7栅栏 -->
      <el-col :span="7">
        <el-input placeholder="请输入搜索内容" clearable>
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
        <el-button
          @click="addDialogVisible = true"
          type="primary"
          icon="el-icon-circle-plus-outline"
          >添加管理员</el-button
        >
      </el-col>
    </el-row>
    <!-- //管理员信息表格 -->
    <el-table :data="adminlist" stripe style="width: 100%">
      <el-table-column type="index" label="id" width="50px"> </el-table-column>
      <el-table-column prop="administrator_name" label="姓名"></el-table-column>
      <el-table-column prop="administrator_psd" label="密码" width="180px">
      </el-table-column>
      <el-table-column prop="administrator_tel" label="手机号">
      </el-table-column>
      <el-table-column prop="administrator_email" label="邮箱">
      </el-table-column>
      <el-table-column prop="administrator_right" label="管理权限">
      </el-table-column>
      <el-table-column label="操作" width="200px">
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

          <!-- 权限按钮+上边文字注释 -->
          <el-tooltip
            effect="dark"
            content="分配角色"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination layout="prev, pager, next" :total="total" :page-size="8">
      </el-pagination>
    </div>
  </el-card>
  <!-- 添加管理员的对话框 -->
  <el-dialog
    title="添加管理员"
    v-model="addDialogVisible"
    @close="addDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form :model="addAdminForm" :rules="addAdminFormRules" ref="addAdminRef">
      <el-form-item
        label="管理员名称"
        :label-width="formLabelWidth"
        prop="administrator_name"
        clearable
      >
        <el-input
          v-model="addAdminForm.administrator_name"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        :label-width="formLabelWidth"
        prop="administrator_psd"
      >
        <el-input
          v-model="addAdminForm.administrator_psd"
          autocomplete="off"
          show-password
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        :label-width="formLabelWidth"
        prop="checkPsd"
      >
        <el-input
          v-model="addAdminForm.checkPsd"
          autocomplete="off"
          clearable
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="administrator_tel"
      >
        <el-input
          v-model="addAdminForm.administrator_tel"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
        prop="administrator_email"
      >
        <el-input
          v-model="addAdminForm.administrator_email"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="管理权限" :label-width="formLabelWidth">
        <el-select
          v-model="addAdminForm.administrator_right"
          placeholder="请选择管理权限"
        >
          <el-option label="测试角色" value="测试角色"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="超级管理员" value="超级管理员"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
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
        if (this.addAdminForm.checkPsd !== '') {
          this.$refs.addAdminForm.validateField('checkPsd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addAdminForm.administrator_psd) {
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
      //获取管理员列表的参数对象
      adminlist: [],
      total: 0,
      //控制添加管理员的对话框的显示
      addDialogVisible: false,
      //控制编辑管理员的对话框的显示
      editDialogVisible: false,
      formLabelWidth: '100px',
      //添加管理员表单数据
      addAdminForm: {
        administrator_name: '',
        administrator_psd: '',
        checkPsd: '',
        administrator_tel: '',
        administrator_email: '',
        administrator_right: '',
      },
      //编辑管理员表单数据
      editAdminForm: {
        administrator_id: '',
        administrator_name: '',
        administrator_psd: '',
        administrator_tel: '',
        administrator_email: '',
        administrator_right: '',
      },
      //添加表单验证规则对象
      addAdminFormRules: {
        administrator_name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        administrator_psd: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },

        ],
        checkPsd: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },

        ],
        administrator_tel: [
          { required: true, validator: checkTel, trigger: 'blur' },
        ],
        administrator_email: [
          { required: true, validator: checkEmail, trigger: 'blur' },

        ],
        administrator_right: [
          { required: true, message: '请输入管理权限', trigger: 'blur' },

        ]
      },
      //添加编辑表单的验证规则对象
      editAdminFormRules: {
        administrator_name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        administrator_email: [
          { required: true, validator: checkEmail, trigger: 'blur' },

        ],
        administrator_right: [
          { required: true, message: '请输入管理权限', trigger: 'blur' },

        ]
      },
    }
  },
  created () {
    this.getAdminList()
  },
  methods: {
    getAdminList () {
      this.$axios({
        url: "/api/getAdmin",
        method: 'get',//method默认是get请求
      }).then((res) => {
        console.log(res)
        this.adminlist = res.data.list
        this.total = res.data.list.length
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    //监听添加管理员对话框的关闭事件
    addDialogClosed () {
      this.$refs.addAdminRef.resetFields()
    },
    //监听编辑管理员对话框的关闭事件
    editDialogClosed () {
      this.$refs.editAdminRef.resetFields()
    },
    //点击按钮，添加新用户
    addUser () {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/admins/regAdmin?administrator_name=' +
            this.addAdminForm.administrator_name + '&administrator_psd=' +
            this.addAdminForm.administrator_psd + '&administrator_tel=' +
            this.addAdminForm.administrator_tel + '&administrator_email=' +
            this.addAdminForm.administrator_email + '&administrator_right=' +
            this.addAdminForm.administrator_right)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.addDialogVisible = false
                // 清除数据
                this.$refs.addAdminRef.resetFields()
                // 重新获取用户列表数据
                this.getAdminList()
              }
              else if (res.data.code == 201) {
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    editAdminDialog (value) {
      this.editAdminForm = value
      this.editDialogVisible = true
    },
    //点击确定按钮后
    editAdmin (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/admins/editAdmin?administrator_name=' +
            this.editAdminForm.administrator_name + '&administrator_tel=' +
            this.editAdminForm.administrator_tel + '&administrator_email=' +
            this.editAdminForm.administrator_email + '&administrator_right=' +
            this.editAdminForm.administrator_right)
            .then(res => {
              console.log(res)
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.editDialogVisible = false
                // 清除数据
                this.$refs.editAdminRef.resetFields()
                // 重新获取用户列表数据
                this.getAdminList()
              }
              else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log('修改管理员出错!!');
          return false;
        }
      });
      console.log(this.$refs[formname])
    },
    deleteAdmin (value) {
      this.$confirm('此操作将永久删除该管理员,真的删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/admins/deleteAdmin?administrator_tel=' + value)
          .then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 重新获取用户列表数据
              this.getAdminList()
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
      console.log(value)

    }
  }
}
</script>

<style>
</style>