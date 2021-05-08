<template>
  <!-- //面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户信息</el-breadcrumb-item>
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
            <el-button @click="getUserMessageList()">
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
      :data="UserMessageList"
      stripe
      border
      style="width: 100%"
      ref="UserMessageListRef"
    >
      <!-- 展开列 -->
      <el-table-column type="expand" label="#">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="经度">
              <span>{{ props.row.lon }}</span>
            </el-form-item>
            <el-form-item label="经度半球">
              <span>{{ props.row.lon_h }}</span>
            </el-form-item>
            <el-form-item label="纬度">
              <span>{{ props.row.lat }}</span>
            </el-form-item>
            <el-form-item label="纬度半球">
              <span>{{ props.row.lat_h }}</span>
            </el-form-item>
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
      <el-table-column prop="user_name" label="姓名"> </el-table-column>
      <el-table-column prop="user_tel" label="手机号"> </el-table-column>
      <el-table-column prop="equip_id" label="设备编号" width="200px">
      </el-table-column>
      <el-table-column prop="ifuse" label="是否使用" width="80px">
        <template #default="scope">
          <el-button type="success" size="mini" v-if="scope.row.ifuse == '1'">
            <i class="el-icon-arrow-right el-icon-circle-check"></i>使用
          </el-button>
          <el-button v-else type="danger" size="mini">
            <i class="el-icon-arrow-right el-icon-circle-close"></i>禁用
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="onoff" label="开关" width="80px">
        <template #default="scope">
          <el-switch
            v-model="scope.row.onoff"
            active-value="1"
            active-color="#13ce66"
            inactive-value="0"
            @change="editOnoff(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="incident_site" label="事故发生大道">
      </el-table-column>
      <el-table-column prop="address" label="事故发生地"> </el-table-column>
      <el-table-column prop="time" label="事故时间">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template v-slot="scope">
          <!-- 地图按钮 -->
          <el-button
            type="info"
            icon="el-icon-map-location"
            plain
            @click="showMap(scope.row)"
          ></el-button>
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="editUserEquipDialog(scope.row)"
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
  <!-- 编辑用户设备和id的对话框 -->
  <el-dialog
    title="编辑用户设备id"
    v-model="editDialogVisible"
    @close="editDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="editUserEquipForm"
      :rules="editUserEquipFormRules"
      ref="editUserEquipRef"
    >
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
        prop="user_name"
        clearable
      >
        <el-input v-model="editUserEquipForm.user_name" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="formLabelWidth"
        prop="user_tel"
      >
        <el-input v-model="editUserEquipForm.user_tel" disabled></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item
            label="添加设备id"
            :label-width="formLabelWidth"
            prop="equip_id"
          >
            <!-- <template #default="scope"> -->

            <el-select
              v-model="editUserEquipForm.equip_id"
              clearable
              filterable
              placeholder="请选择设备id"
            >
              <el-option
                v-for="item in this.Equip_idList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
            <!-- </template> -->
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-button @click="editDialogClosed">取 消</el-button>
          <el-button type="primary" @click="editUserEquip('editUserEquipRef')"
            >确 定</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
  <!-- 地图 -->
  <el-drawer title="地图显示" v-model="map">
    <span>事故发生大道： {{ this.mapData.incident_site }}<br /></span>
    <span>事故发生地： {{ this.mapData.address }}</span>
    <img :src="this.mapData.imgsrc" />
  </el-drawer>
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
      UserMessageList: [],
      formLabelWidth: '100px',
      Equip_idList: [],//得到equip_id和是否被使用
      searchInfo: '',//搜索内容
      addDialogVisible: false,
      editDialogVisible: false,
      mapData: [{
        imgsrc: '',// 地图地址
        incident_site: '',//事故发生大道
        address: '',//事故发生地
      }],
      map: false,
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
      editUserEquipForm: {//编辑用户设备id
        user_name: '',
        user_tel: '',
        equip_id: ''
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
      editUserEquipFormRules: {
        user_name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }

  },
  created () {
    this.getUserMessageList();
    this.getEquip_id();
  },
  methods: {
    // 得到用户信息
    getUserMessageList () {
      this.$axios({
        url: "/api/getUser?search=" + this.searchInfo,
        method: 'get',//method默认是get请求
      }).then(res => {
        this.UserMessageList = res.data.list
        this.UserMessageList.forEach(ele => {
          if (ele.onoff == 1) {
            ele.onoff = '1';
          }
          else {
            ele.onoff = '0';
          }
          if (ele.ifuse == 1) {
            ele.ifuse = '1';
          }
          else {
            ele.ifuse = '0';
          }
        })
        // console.log(this.UserMessageList)
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    //得到三角牌的equip_id和
    getEquip_id () {
      this.$axios({
        url: "/api/getEquip_id",
        method: 'get',//method默认是get请求
      }).then(res => {
        this.Equip_idList = res.data.list;
        this.Equip_idList.forEach(ele => {
          if (ele.disabled == 1) {
            ele.disabled = true;
          }
          else {
            ele.disabled = false;
          }
        })
        // console.log(this.Equip_idList)
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    editUserEquipDialog (value) {
      this.editUserEquipForm = value
      this.editDialogVisible = true
    },
    /* 点击修改——和修改成功后的提示 */
    editUserEquip (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/admins/editUserEquip?equip_id=' + this.editUserEquipForm.equip_id +
            '&user_name=' + this.editUserEquipForm.user_name +
            '&user_tel=' + this.editUserEquipForm.user_tel)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.editDialogVisible = false
                // 清除数据
                this.$refs.editUserEquipRef.resetFields()
                // 重新获取用户信息列表数据
                this.getUserMessageList()
              }
              else {
                this.$message.warning(res.data.msg)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          console.log('editUserEquip fail !!');
          return false;
        }
      })

    },
    /* 修改开关状态 */
    editOnoff (value) {
      // console.log(value.equip_id)
      this.$axios.put('/api/admins/editOnoff?equip_id=' + value.equip_id)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg)
            // 重新获取用户信息列表数据
            this.getUserMessageList()

          }
          else {
            this.$message.warning(res.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showMap (value) {
      this.map = true;
      this.mapData.address = value.address
      this.mapData.incident_site = value.incident_site
      this.mapData.imgsrc = "https://restapi.amap.com/v3/staticmap?zoom=15&size=500*500&paths=10,0x0000ff,1,,:" + value.lon + "," + value.lat + "&&labels=%E6%99%BA%E8%83%BD%E4%B8%89%E8%A7%92%E7%89%8C,2,0,16,0xFFFFFF,0x008000:" + value.lon + "," + value.lat + "&markers=mid,,%E8%BD%A6:" + value.lon + "," + value.lat + "&traffic=1&key=bd2cd1732c79dd66ce66da37ebe00ed0";
      console.log(this.mapData)
    },
    //监听添加管理员对话框的关闭事件
    addDialogClosed () {
      this.$refs.addUserInfoRef.resetFields()
      this.addDialogVisible = false
    },
    //监听编辑管理员对话框的关闭事件
    editDialogClosed () {
      this.$refs.editUserEquipRef.resetFields()
      this.editDialogVisible = false
    },
  }
}
</script>


<style>
</style>