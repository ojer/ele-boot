<template>
  <div style="padding: 10px">
    <el-card>
      <!--<el-row :gutter="20"> </el-row>-->
      <el-form ref="searchForm" :model="searchForm.data" :inline="true" label-position="left" size="mini">
        <template v-for="(pVal, pName, index) in searchForm.data" :key="index">
          <el-form-item :label="searchForm.items[index].label">
            <template v-if="searchForm.items[index].formItemTypes === 'input' || searchForm.items[index].formItemTypes === 'textarea'">
              <el-input v-model="searchForm.data[pName]" clearable />
            </template>

            <template v-else-if="searchForm.items[index].formItemTypes === 'datetimerange'">
              <el-date-picker v-model="searchForm.data[pName]" type="datetimerange" value-format="yyyy-MM-dd" placeholder="选择时间" />
            </template>
            <template v-else-if="searchForm.items[index].formItemTypes === 'datetime'">
              <el-date-picker v-model="searchForm.data[pName]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
            </template>
            <template v-else-if="searchForm.items[index].formItemTypes === 'date'">
              <template v-if="searchForm.items[index].searchFormItemTypes === 'daterange'">
                <el-date-picker v-model="searchForm.data[pName]" type="daterange" value-format="yyyy-MM-dd" placeholder="选择日期2" />
              </template>
              <template v-else>
                <el-date-picker v-model="searchForm.data[pName]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              </template>
            </template>
            <template v-else-if="searchForm.items[index].formItemTypes === 'time'">
              <el-time-select v-model="searchForm.data[pName]" :picker-options="{}" value-format="HH:mm:ss" placeholder="选择时间" />
            </template>
            <template v-else-if="searchForm.items[index].formItemTypes === 'daterange'">
              <el-date-picker v-model="searchForm.data[pName]" type="daterange" value-format="yyyy-MM-dd" placeholder="选择时间" />
            </template>

            <template v-else-if="searchForm.items[index].formItemTypes === 'checkbox'">
              <el-checkbox-group v-model="searchForm.data[pName]">
                <el-checkbox v-for="c in searchForm.items[index].options" :key="c.key" :label="c.key">
                  {{ c.val }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-else-if="searchForm.items[index].formItemTypes === 'select'">
              <el-select v-model="searchForm.data[pName]" placeholder="请选择" filterable style="width: 100%">
                <el-option v-for="item in form.items[index].options" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <a style="float: right; color: #8492a6; font-size: 13px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap" :title="item.info">{{ item.info }}</a>
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </template>
        <el-button type="primary" size="mini" @click="handlePaginationSizeChange"> 查询 </el-button>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <template v-slot:header>
        <template v-if="permission.delete">
          <el-button v-if="permission.update" type="danger" plain size="mini" @click="handleDeleteTableData"> 删除 </el-button>
        </template>
        <el-divider direction="vertical" />
        <el-button v-if="permission.update && false" :disabled="table.multipleSelection.length !== 1" type="primary" plain size="mini" @click="handleUpdateFormShow"> 修 改 </el-button>
        <el-button v-if="permission.insert" type="primary" plain size="mini" @click="handleInsertFormShow"> 签约套餐 </el-button>
      </template>
      <el-table v-loading="table.loading" :data="table.data" fit stripe highlight-current-row @selection-change="handleTableSelectionChang">
        <el-table-column type="selection" width="60" />
        <template v-for="(col, colIndex) in table.cols" :key="colIndex">
          <el-table-column
            :v-if="!col.hide.table"
            :label="col.label"
            :width="col.tableColumnAttributes.width ? col.tableColumnAttributes.width : ''"
            :min-width="col.tableColumnAttributes.minWidth ? col.tableColumnAttributes.minWidth : ''"
            :show-overflow-tooltip="col.tableColumnAttributes.showOverflowTooltip"
          >
            <template #default="scope">
              <slot name="cus-tab-scope" v-bind="{ scope: scope, col: col }">
                <template v-if="col.prop === 'currentPeriodStartDate'">
                  {{ scope.row.currentPeriodStartDate + ' 至 ' + scope.row.currentPeriodEndDate }}
                </template>
                <template v-else-if="col.prop === 'packageEndDate'">
                  <span
                    :style="{
                      color: new Date(scope.row.packageEndDate).getTime() - new Date().getTime() < 1000 * 60 * 60 * 24 * 7 ? '#f56c6c' : '#606266'
                    }"
                  >
                    {{ scope.row.packageEndDate }}
                  </span>
                </template>
                <template v-else>
                  {{ scope.row[col.prop] }}
                </template>
              </slot>
            </template>
          </el-table-column>
        </template>
        <!--<el-table-column fixed="right" label="操作" width="170">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="small" @click="showRecord(scope.row)" >套餐变更记录</el-button >-->
        <!--&ensp;-->
        <!--<el-button type="text" size="small" @click="showDetailed(scope.row)" >时长明细</el-button >-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </el-card>
    <el-row v-if="table.pagination.enable" style="text-align: center; margin: 30px auto">
      <el-pagination
        :layout="table.pagination.layout"
        v-module:current-page="table.pageInfo.pageNum"
        v-module::page-size="table.pageInfo.pageSize"
        :page-sizes="[10, 30, 50, 100, 200]"
        :total="table.pageInfo.count"
        @current-change="handlePaginationCurrentChange"
        @size-change="handlePaginationSizeChange"
      />
    </el-row>
    <el-dialog :title="dataKey.val ? '修改' : '添加'" v-mode:visible="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-card>
        <el-form ref="dynamicValidateForm" :model="form.data" label-position="top" size="mini">
          <template v-for="(pVal, pName, index) in form.data">
            <el-form-item v-if="!form.items[index].hide.form" :key="index" :label="form.items[index].label" :prop="'' + pName + ''" :rules="form.items[index].rules">
              <template v-if="form.items[index].formItemTypes === 'input'">
                <el-input v-model="form.data[pName]" />
              </template>

              <template v-else-if="form.items[index].formItemTypes === 'inputNumber'">
                <el-input v-model.number="form.data[pName]" />
              </template>

              <template v-else-if="form.items[index].formItemTypes === 'textarea'">
                <el-input v-model="form.data[pName]" type="textarea" maxlength="100" show-word-limit />
              </template>

              <template v-else-if="form.items[index].formItemTypes === 'datetimerange'">
                <el-date-picker v-model="form.data[pName]" type="datetimerange" value-format="yyyy-MM-dd" placeholder="选择时间" />
              </template>
              <template v-else-if="form.items[index].formItemTypes === 'datetime'">
                <el-date-picker v-model="form.data[pName]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
              </template>
              <template v-else-if="form.items[index].formItemTypes === 'date'">
                <el-date-picker v-model="form.data[pName]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              </template>
              <template v-else-if="form.items[index].formItemTypes === 'time'">
                <el-time-select v-model="form.data[pName]" :picker-options="{}" value-format="HH:mm:ss" placeholder="选择时间" />
              </template>

              <template v-else-if="form.items[index].formItemTypes === 'checkbox'">
                <el-checkbox-group v-model="form.data[pName]">
                  <el-checkbox v-for="c in form.items[index].options" :key="c.key" :label="c.key">
                    {{ c.val }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="form.items[index].formItemTypes === 'select'">
                <el-select v-model="form.data[pName]" :disabled="dataKey.val && pName === 'customerId'" placeholder="请选择" filterable style="width: 100%">
                  <el-option v-for="item in form.items[index].options" :key="item.value" :label="item.label" :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <a style="float: right; color: #8492a6; font-size: 13px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap" :title="item.info">{{ item.info }}</a>
                  </el-option>
                </el-select>
              </template>
              <template v-else> NO_TYPE </template>
            </el-form-item>
          </template>
        </el-form>
      </el-card>
      <template v-slot:footer>
        <el-button size="mini" @click="handleInsertFormHide('dynamicValidateForm')">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleFormSubmit('dynamicValidateForm')">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { batchDelete as deleteList, findList as selectList, insert as insertData, update as updateData, detailed as selectDetailed, record as selectRecord, addDj as addServiceTime } from '@/api/home_care/users/index'
// import { isDisableDeleteButton, isDisableSaveBatchButton, isDisableUpdateButton } from '@/utils/permissionButton'
import { init as initTel } from '@/components/element/config.js'

export default {
  name: 'ele-template',
  props: {
    dataConstructor: {
      type: Array
    },
    selectList: {
      type: Function,
      default(params) {
        console.log('defaultSelectList', params)
        return Promise.resolve({
          code: 200,
          data: {
            list: [
              {
                id: 1,
                name: 'a'
              },
              {
                id: 2,
                name: 'b'
              }
            ],
            count: 90
          },
          msg: ''
        })
      }
    },
    deleteList: {
      type: Function,
      default(params) {
        console.log('defaultDeleteList', params)
        return Promise.resolve({
          code: 200,
          data: [],
          msg: ''
        })
      }
    },
    updateData: {
      type: Function,
      default(params) {
        console.log('defaultUpdate', params)
        return Promise.resolve({
          code: 200,
          data: [],
          msg: ''
        })
      }
    },
    insertData: {
      type: Function,
      default(params) {
        console.log('insertData', params)
        return Promise.resolve({
          code: 200,
          data: [],
          msg: ''
        })
      }
    }
  },
  data() {
    return {
      confog: {},
      table: {
        cols: [],
        pagination: {},
        multipleSelection: [],
        data: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 50,
          count: 0
        },
        loading: false
      },

      permission: {
        delete: false,
        insert: true,
        update: true
      },
      dialogFormVisible: false,
      form: {},
      searchForm: {},
      dataKey: undefined,
      // custom data
      listQuery: {
        currentPage: 1,
        orgId: ''
      },
      record: [],
      detailed: []
    }
  },
  computed: {},
  beforeUnmound() {},
  created() {
    this.config = initTel(this.dataConstructor)
    this.table.cols = this.config.table.cols
    this.table.pagination = this.config.table.pagination
    this.form = {
      data: this.config.form.data,
      items: this.config.form.items,
      defaultData: this.config.form.defaultData
    }

    this.searchForm = {
      data: this.config.searchForm.data,
      items: this.config.searchForm.items
    }

    this.dataKey = this.config.dataKey

    this.verifyButtonState()
    this.listQuery.orgId = this.orgId
    this.getTableData()
  },
  methods: {
    getTableData(pageNum, pageSize) {
      const page = {}
      if (this.table.pagination.enable) {
        if (!pageNum) {
          pageNum = this.table.pageInfo.pageNum
        }
        if (!pageSize) {
          pageSize = this.table.pageInfo.pageSize
        }
        page.pageNum = pageNum
        page.pageSize = pageSize
      }
      this.table.loading = true
      const queryParams = {
        currentPage: this.listQuery.currentPage,
        orgId: this.listQuery.orgId
      }
      const params = {}
      Object.assign(params, page)
      Object.assign(params, queryParams)
      Object.assign(params, this.searchForm.data)
      this.selectList(params)
        .then(({ data }) => {
          console.log(data.list)
          this.table.data = data.list
          console.log(this.table.data)
          this.table.pageInfo.count = data.count
          this.table.loading = false
        })
        .catch((e) => {
          console.error('获取表格数据失败', e)
          this.table.loading = false
        })
    },

    handlePaginationCurrentChange(pageNum) {
      this.getTableData(pageNum)
    },
    handlePaginationSizeChange(pageSize) {
      this.table.pageInfo.pageNum = 1
      this.getTableData(1, pageSize)
    },

    handleDeleteTableData() {
      const delLength = this.table.multipleSelection.length
      if (delLength === 0) {
        this.$message.error('未选中数据')
        return
      }

      this.$confirm(`确定删除 ${delLength} 条数据`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      })
        .then(() => {
          const ids = this.table.multipleSelection.map((d) => d.id)
          this.deleteList(ids)
            .then((res) => {
              if (res.length === delLength) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.table.multipleSelection.forEach((item) => {
                  const index = this.table.data.indexOf(item)
                  if (index !== -1) {
                    this.table.data.splice(index, 1)
                  }
                })
              }
            })
            .catch((e) => {
              this.$message.error('删除失败')
              console.error(e)
            })
        })
        .catch(() => {})
    },
    handleTableSelectionChang(val) {
      this.table.multipleSelection = val
    },
    handleInsertFormShow() {
      this.dialogFormVisible = true
    },

    handleInsertFormHide() {
      if (this.dataKey.val !== undefined) {
        this.dataKey.val = undefined
        this.resetForm()
      }
      this.dialogFormVisible = false
    },

    resetForm() {
      for (const prop in this.form.data) {
        this.form.data[prop] = undefined
      }
      this.dataKey.val = undefined
      this.form.data = Object.assign(this.form.data, this.form.defaultData)
    },
    handleUpdateFormShow() {
      const length = this.table.multipleSelection.length
      if (length === 0) {
        this.$message.error('未选中数据')
        return
      }
      const updObj = this.table.multipleSelection[0]
      this.dataKey.val = updObj[this.dataKey.prop]
      for (const prop in this.form.data) {
        this.form.data[prop] = updObj[prop]
      }
      this.dialogFormVisible = true
    },
    insertSubmit(formName) {
      let params = { orgId: this.orgId }
      params = Object.assign(params, this.form.data)

      this.insertData(params)
        .then((res) => {
          if (res.code === 200) {
            this.$refs[formName].resetFields()
            this.resetForm()
            this.getTableData(1)
            this.dialogFormVisible = false
            this.$message.success('添加成功')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },

    updateSubmit(formName) {
      const params = {}
      Object.assign(params, this.form.data)
      Object.assign(params, { orgId: this.orgId })
      params[this.dataKey.prop] = this.dataKey.val

      const packageStartDate = params.packageStartDate
      const staDate = new Date(packageStartDate)
      staDate.setFullYear(staDate.getFullYear() + 1)
      params.packageEndDate = staDate.getFullYear() + '-' + ('0' + (staDate.getMonth() + 1)).substr(-2) + '-' + ('0' + staDate.getDate()).substr(-2)

      this.updateData(params)
        .then((res) => {
          if (res.code === 200) {
            for (const k in params) {
              this.table.multipleSelection[0][k] = params[k]
            }
            this.dataKey.val = undefined
            this.dialogFormVisible = false
            this.$refs[formName].resetFields()
            this.getTableData(1)
            this.resetForm()
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error('验证未通过')
          return false
        }
        if (this.dataKey.val) {
          this.updateSubmit(formName)
        } else {
          this.insertSubmit(formName)
        }
      })
    },
    verifyButtonState() {
      //     const tempPath = this.$route.path
      //      const permissionMap = this.button_permissions[tempPath]
      //      this.permission.delete = !isDisableDeleteButton(tempPath, permissionMap)
      //      this.permission.insert = !isDisableSaveBatchButton(tempPath, permissionMap)
      //      this.permission.update = !isDisableUpdateButton(tempPath, permissionMap)
    }
  }
}
</script>
