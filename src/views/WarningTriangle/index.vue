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
        <el-input placeholder="请输入搜索内容" v-model="searchInfo" clearable>
          <template #append>
            <el-button @click="getWarningTriangleList()">
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
          >添加三角警告牌</el-button
        >
      </el-col>
    </el-row>
    <!-- //用户信息表格 -->
    <el-table
      :data="warningTriangleList"
      stripe
      border
      style="width: 99%"
      ref="warningTriangleRef"
    >
      <el-table-column prop="equip_id" label="设备id"> </el-table-column>
      <el-table-column prop="lon" label="经度（半球）">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>经度: {{ scope.row.lon }}</p>
              <p>经度半球: {{ scope.row.lon_h }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium" v-if="scope.row.lon != ''">{{
                  scope.row.lon + "(" + scope.row.lon_h + ")"
                }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="lat" label="纬度（半球）">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>纬度: {{ scope.row.lat }}</p>
              <p>纬度半球: {{ scope.row.lat_h }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag
                  size="medium"
                  v-if="scope.row.lat != ''"
                  type="success"
                  >{{ scope.row.lat + "(" + scope.row.lat_h + ")" }}</el-tag
                >
              </div>
            </template>
          </el-popover>
        </template>
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
      <el-table-column
        prop="incident_site"
        label="事故发生大道"
      ></el-table-column>
      <el-table-column prop="address" label="事故发生地"> </el-table-column>
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button size="mini" @click="editWarningTriangleDialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteWarningTriangle(scope.row.equip_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination layout="prev, pager, next" :total="total" :page-size="15">
      </el-pagination>
    </div>
  </el-card>
  <!-- 添加三角牌的对话框 -->
  <el-dialog
    title="添加三角警告牌"
    v-model="addDialogVisible"
    @close="addDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="addWarningTriangleForm"
      :rules="addWarningTriangleFormRules"
      ref="addWarningTriangleRef"
      label-width="100px"
    >
      <el-form-item label="设备编号id" prop="equip_id">
        <el-input
          v-model="addWarningTriangleForm.equip_id"
          placeholder="数字15位"
          clearable
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经度" prop="lon">
            <el-input
              v-model="addWarningTriangleForm.lon"
              placeholder="度度格式[0,180]"
              clearable
            >
              <template #append>°</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经度半球" prop="lon_h">
            <el-select
              v-model="addWarningTriangleForm.lon_h"
              placeholder="请选择经度半球"
            >
              <el-option label="东半球🌎E" value="E"></el-option>
              <el-option label="西半球🌎W" value="W"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="纬度" prop="lat" clearable>
            <el-input
              v-model="addWarningTriangleForm.lat"
              placeholder="度度格式[0,90]"
              clearable
            >
              <template #append>°</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度半球" prop="lat_h">
            <el-select
              v-model="addWarningTriangleForm.lat_h"
              placeholder="请选择纬度半球"
            >
              <el-option label="北半球🌎N" value="N"></el-option>
              <el-option label="南半球🌎S" value="S"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-form-item label="是否使用" prop="ifuse">
        <el-radio-group v-model="addWarningTriangleForm.ifuse" size="medium">
          <el-radio-button label="1"
            ><i class="el-icon-arrow-right el-icon-circle-check"></i
            >使用</el-radio-button
          >
          <el-radio-button label="0"
            >禁用<i class="el-icon-arrow-right el-icon-circle-close"></i
          ></el-radio-button>
        </el-radio-group>
         </el-form-item
      >
      <el-form-item prop="onoff">
        <el-switch
          v-model="addWarningTriangleForm.onoff"
          active-text="开"
          active-value="1"
          active-color="#13ce66"
          inactive-text="关"
          inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="事故发生大道" prop="incident_site">
        <el-input
          v-model="addWarningTriangleForm.incident_site"
          type="textarea"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="事故发生地" prop="address">
        <el-input
          v-model="addWarningTriangleForm.address"
          type="textarea"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span>
        <el-button @click="addDialogClosed">取 消</el-button>
        <el-button
          type="primary"
          @click="addWarningTriangle('addWarningTriangleRef')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
    <!-- 编辑三角牌的对话框 -->
  <el-dialog
    title="编辑三角牌"
    v-model="editDialogVisible"
    @close="editDialogClosed"
  >
    <!-- 内容主体区域 -->
    <el-form
      :model="editWarningTriangleForm"
      :rules="editWarningTriangleFormRules"
      ref="editWarningTriangleRef"
      label-width="100px"
    >
      <el-form-item label="设备编号id" prop="equip_id">
        <el-input
          v-model="editWarningTriangleForm.equip_id"
          placeholder="数字15位"
          clearable
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经度" prop="lon">
            <el-input
              v-model="editWarningTriangleForm.lon"
              placeholder="度度格式[0,180]"
              clearable
            >
              <template #append>°</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经度半球" prop="lon_h">
            <el-select
              v-model="editWarningTriangleForm.lon_h"
              placeholder="请选择经度半球"
            >
              <el-option label="东半球🌎E" value="E"></el-option>
              <el-option label="西半球🌎W" value="W"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="纬度" prop="lat" clearable>
            <el-input
              v-model="editWarningTriangleForm.lat"
              placeholder="度度格式[0,90]"
              clearable
            >
              <template #append>°</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度半球" prop="lat_h">
            <el-select
              v-model="editWarningTriangleForm.lat_h"
              placeholder="请选择纬度半球"
            >
              <el-option label="北半球🌎N" value="N"></el-option>
              <el-option label="南半球🌎S" value="S"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-form-item label="是否使用" prop="ifuse">
        <el-radio-group v-model="editWarningTriangleForm.ifuse" size="medium">
          <el-radio-button label="1"
            ><i class="el-icon-arrow-right el-icon-circle-check"></i
            >使用</el-radio-button
          >
          <el-radio-button label="0"
            >禁用<i class="el-icon-arrow-right el-icon-circle-close"></i
          ></el-radio-button>
        </el-radio-group>
         </el-form-item
      >
      <el-form-item prop="onoff">
        <el-switch
          v-model="editWarningTriangleForm.onoff"
          active-text="开"
          active-value="1"
          active-color="#13ce66"
          inactive-text="关"
          inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="事故发生大道" prop="incident_site">
        <el-input
          v-model="editWarningTriangleForm.incident_site"
          type="textarea"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="事故发生地" prop="address">
        <el-input
          v-model="editWarningTriangleForm.address"
          type="textarea"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span>
        <el-button @click="editDialogClosed">取 消</el-button>
        <el-button
          type="primary"
          @click="editWarningTriangle('editWarningTriangleRef')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>

export default {
  data () {
    //验证经度规则
    var validateLon = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else {
        const regLon = /^(0|[1-9][0-9]*)(\.\d+)?$/
        //正数
        if (regLon.test(value) && value >= 0 && value <= 180) {
          return callback()
        }
        callback(new Error('请输入合法经度'))
      }
    };
    //验证纬度规则
    var validateLat = (rule, value, callback) => {
      if (value === '') {
        return callback();
      } else {
        const regLat = /^(0|[1-9][0-9]*)(\.\d+)?$/
        //正数
        if (regLat.test(value) && value >= 0 && value <= 90) {
          return callback()
        } else {
          return callback(new Error('请输入合法纬度'))
        }
      }
    };

    return {
      warningTriangleList: [],
      addWarningTriangleForm: {//添加三角牌
        equip_id: '',
        lon: '',
        lon_h: '',
        lat: '',
        lat_h: '',
        ifuse: '0',
        onoff: '0',
        incident_site: '',
        address: ''
      },
      editWarningTriangleForm: {//编辑三角牌
        equip_id: '',
        lon: '',
        lon_h: '',
        lat: '',
        lat_h: '',
        ifuse: '',
        onoff: '',
        incident_site: '',
        address: ''
      },
      searchInfo: '',//搜索内容
      //控制添加三角牌的对话框的显示
      addDialogVisible: false,
      //控制编辑三角牌的对话框的显示
      editDialogVisible: false,
      total: 0,
      //添加表单验证规则对象
      addWarningTriangleFormRules: {
        equip_id: [
          { required: true, message: '请输入设备编号id', trigger: 'blur' },
          { pattern: /^[0-9]*$/, len: 15, message: '长度为 15 个字符', trigger: 'blur' }
        ],
        lon: [//经度
          { required: false, validator: validateLon, message: '请输入0~180', trigger: 'blur' }
        ],
        lat: [//纬度
          { required: false, validator: validateLat, message: '请输入0~90', trigger: 'blur' }
        ],

      },
      //添加表单验证规则对象
      editWarningTriangleFormRules: {
        equip_id: [
          { required: true, message: '请输入设备编号id', trigger: 'blur' },
          { pattern: /^[0-9]*$/, len: 15, message: '长度为 15 个字符', trigger: 'blur' }
        ],
        lat: [
          { required: false, validator: validateLat, message: '请输入0~90', trigger: 'blur' }
        ],
        lon: [
          { required: false, validator: validateLon, message: '请输入0~180', trigger: 'blur' }
        ],
      }
    }
  },

  created () {
    this.getWarningTriangleList()
  },
  methods: {
    // 得到三角牌硬件信息
    getWarningTriangleList () {
      this.$axios({
        url: "/api/getWarningTriangle?search=" + this.searchInfo,
        method: 'get',//method默认是get请求
      }).then(res => {
        this.warningTriangleList = res.data.list
        this.warningTriangleList.forEach(ele => {
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
        // console.log(this.warningTriangleList)
        // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
      }).catch(err => {
        console.log(err)
      })
    },
    //点击按钮，添加新三角牌
    addWarningTriangle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/admins/regWarningTriangle?equip_id=' + this.addWarningTriangleForm.equip_id +
            '&lon=' + this.addWarningTriangleForm.lon +
            '&lon_h=' + this.addWarningTriangleForm.lon_h +
            '&lat=' + this.addWarningTriangleForm.lat +
            '&lat_h=' + this.addWarningTriangleForm.lat_h +
            '&ifuse=' + this.addWarningTriangleForm.ifuse +
            '&onoff=' + this.addWarningTriangleForm.onoff +
            '&incident_site=' + this.addWarningTriangleForm.incident_site +
            '&address=' + this.addWarningTriangleForm.address)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.addDialogVisible = false
                // 清除数据
                this.$refs.addWarningTriangleRef.resetFields()
                // 重新获取用户列表数据
                this.getWarningTriangleList()
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
          console.log('addWarningTriangle fail !!');
          return false;
        }
      });
    },
    //监听添加三角牌对话框的关闭事件
    addDialogClosed () {
      this.$refs.addWarningTriangleRef.resetFields()
      this.addDialogVisible = false
    },
    editWarningTriangleDialog (value) {
      this.editWarningTriangleForm = value
      this.editDialogVisible = true
    },
    //点击确定，编辑三角牌
    editWarningTriangle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //可以发起添加用户的网络请求
          this.$axios.post('/api/admins/editWarningTriangle?equip_id=' + this.editWarningTriangleForm.equip_id +
            '&lon=' + this.editWarningTriangleForm.lon +
            '&lon_h=' + this.editWarningTriangleForm.lon_h +
            '&lat=' + this.editWarningTriangleForm.lat +
            '&lat_h=' + this.editWarningTriangleForm.lat_h +
            '&ifuse=' + this.editWarningTriangleForm.ifuse +
            '&onoff=' + this.editWarningTriangleForm.onoff +
            '&incident_site=' + this.editWarningTriangleForm.incident_site +
            '&address=' + this.editWarningTriangleForm.address)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.editDialogVisible = false
                // 清除数据
                this.$refs.editWarningTriangleRef.resetFields()
                // 重新获取用户列表数据
                this.getWarningTriangleList()
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
          console.log('addWarningTriangle fail !!');
          return false;
        }
      });
    },
    /* 修改开关状态 */
    editOnoff (value) {
      // console.log(value.equip_id)
      this.$axios.put('/api/admins/editOnoff?equip_id=' + value.equip_id)
        .then(res => {
          if (res.data.code == 200) {

            // 重新获取用户信息列表数据
            this.getWarningTriangleList()
            this.$message.success(res.data.msg)
          }
          else {
            this.$message.warning(res.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //监听编辑三角牌对话框的关闭事件
    editDialogClosed () {
      this.$refs.editWarningTriangleRef.resetFields()
      this.editDialogVisible = false
    },
    deleteWarningTriangle (value) {
      this.$confirm('此操作将永久删除该三角警告牌,真的删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/admins/deleteWarningTriangle?equip_id=' + value)
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 重新获取用户列表数据
              this.getWarningTriangleList();
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