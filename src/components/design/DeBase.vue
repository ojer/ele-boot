<script setup>
import DeForm from './DeForm.vue'
import DeTable from './DeTable.vue'
import DeFormItem from './DeFormItem.vue'
import DeFormElement from './DeFormElement.vue'
import DeTableColumn from './DeTableColumn.vue'
import ResultPreview from '@/components/ResultPreview.vue'
</script>
<template>
  <el-container>
    <el-header style="height: 40px">
      <el-row style="margin: auto 0px">
        <el-slider v-model="width" :step="1" :min="0" :max="24" :show-tooltip="false"></el-slider>
      </el-row>
    </el-header>
    <el-main style="height: calc(100vh - 60px)">
      <el-row :gutter="10">
        <el-col :span="width">
          <el-container>
            <el-main style="height: calc(100vh - 100px); padding: 0">
              <el-card style="min-height: 90vh">
                <div slot="header" class="clearfix">
                  <span>design</span>
                </div>
                <el-form ref="design" :model="design" :size="'mini'" :label-width="'150px'">
                  <el-tabs value="ic">
                    <el-tab-pane label="组件配置" name="ic">
                      <el-tabs value="a">
                        <el-tab-pane label="新增表单选项" name="a">
                          <de-form :form.sync="design.tagForm.insert" />
                        </el-tab-pane>
                        <el-tab-pane label="修改表单选项" name="b">
                          <de-form :form.sync="design.tagForm.update" />
                        </el-tab-pane>
                        <el-tab-pane label="表格选项" name="c">
                          <de-table :table.sync="design.tagTable" />
                        </el-tab-pane>
                      </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="参数列表" name="ip">
                      <el-button v-show="design.params.length === 0" size="mini" type="primary" style="margin: 30px" @click="addParams(-1)">添加</el-button>
                      <div v-for="(p, pi) in design.params" :key="pi">
                        <el-card>
                          <div slot="header">
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="Name" label-width="60px" style="margin-bottom: 0">
                                  <el-input v-model.trim="p.name"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="Title" label-width="60px" style="margin-bottom: 0">
                                  <el-input v-model.trim="p.title"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="主键" label-width="60px" style="margin-bottom: 0">
                                  <el-switch v-model="p.isKey" :disabled="!p.name" @change="(val) => handleIsKeyChange(val, p)"> </el-switch>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4" style="text-align: right">
                                <el-popconfirm title="确定删除" @confirm="delParams(pi)">
                                  <el-link type="primary" slot="reference">删除</el-link>
                                </el-popconfirm>
                                <el-link type="primary" style="margin-left: 30px" @click="addParams(pi)">添加</el-link>
                              </el-col>
                            </el-row>
                          </div>
                          <el-card>
                            <el-tabs value="onIns">
                              <el-tab-pane label="新增时" name="onIns">
                                <el-form-item label="新增时显示">
                                  <el-switch v-model="p.insertForm.show" :disabled="!p.name || !p.title" @change="(val) => handleShowInsertChange(val, p)"> </el-switch>
                                </el-form-item>
                                <el-tabs v-if="p.insertForm.show" value="ele">
                                  <el-tab-pane label="表单项目" name="ite">
                                    <de-form-item :formItem.sync="p.insertForm.tagFormItem" :name="p.name" :title="p.title" />
                                  </el-tab-pane>
                                  <el-tab-pane label="元素" name="ele">
                                    <de-form-element :insertForm.sync="p.insertForm" :name="p.name" />
                                  </el-tab-pane>
                                </el-tabs>
                              </el-tab-pane>
                              <el-tab-pane label="修改时" name="onUpd">
                                <template>
                                  <el-form-item label="修改时可编辑">
                                    <el-switch v-model="p.updateForm.show" :disabled="!p.name || !p.title" @change="(val) => handleShowUpdateChange(val, p)"> </el-switch>
                                  </el-form-item>

                                  <el-collapse v-if="p.updateForm.show">
                                    <el-collapse-item name="0">
                                      <template slot="title">
                                        <span style="color: #409eff">表单项目</span>
                                      </template>
                                      <de-form-item :formItem.sync="p.updateForm.tagFormItem" :name="p.name" :title="p.title" />
                                    </el-collapse-item>
                                    <el-collapse-item name="1">
                                      <template slot="title">
                                        <span style="color: #409eff">元素</span>
                                      </template>
                                      <de-form-element :ref="'deFormElementUpdate_' + p.name" :insertForm.sync="p.updateForm" :name="p.name" />
                                    </el-collapse-item>
                                  </el-collapse>
                                </template>
                              </el-tab-pane>
                              <el-tab-pane label="列表表格" name="oLis">
                                <el-form-item label="Table 显示列">
                                  <el-switch v-model="p.table.show" :disabled="!p.name || !p.title" @change="(val) => handleShowTableChange(val, p)"> </el-switch>
                                </el-form-item>
                                <el-collapse v-if="p.table.show">
                                  <el-collapse-item name="0">
                                    <template slot="title">
                                      <span style="color: #409eff">表格列</span>
                                    </template>
                                    <de-table-column :column.sync="p.table.tagTableColumn" />
                                  </el-collapse-item>
                                </el-collapse>
                              </el-tab-pane>
                            </el-tabs>
                          </el-card>
                        </el-card>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </el-form>
              </el-card>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="24 - width">
          <el-container>
            <el-main class="scroll-main-div" style="height: calc(100vh - 100px); padding: 0">
              <result-preview :entity="design" />
            </el-main>
            <el-backtop target=".scroll-main-div" :visibility-height="200" :bottom="100">
              <div
                style="
                   {
                    height: 100%;
                    width: 100%;
                    background-color: #f2f5f6;
                    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                  }
                "
              >
                <!--<i class="el-icon-refresh"></i>-->
                <i class="el-icon-caret-top"></i>
              </div>
            </el-backtop>
          </el-container>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      design: {
        name: '',
        tagForm: {
          insert: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          },
          update: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          }
        },
        tagTable: {
          name: undefined,
          label: undefined,
          attributes: [],
          events: []
        },
        params: []
      },
      width: 12
    }
  },
  methods: {
    handleIsKeyChange(val, par) {},
    handleShowInsertChange(val, par) {
      // console.debug(this.design)
    },
    handleShowUpdateChange(val, par) {
      if (!val) {
        return
      }
      if (par.insertForm.show && par.insertForm.itemType) {
        const obj = JSON.parse(JSON.stringify(par.insertForm))
        const { name } = par
        setTimeout(() => {
          this.$refs['deFormElementUpdate_' + name][0].handleInsertFormItemTypeChange(obj.itemType)
          Object.assign(par.updateForm, obj)
        }, 300)
      }
    },
    handleShowTableChange(val, par) {},
    delParams(index) {
      this.design.params.splice(index, 1)
    },
    addParams(index) {
      //  event.stopPropagation()
      this.design.params.splice(index + 1, 0, {
        name: `par-${index + 1}`,
        title: `tit-${index + 1}`,
        isKey: false,
        insertForm: {
          show: false,
          itemType: undefined,
          tagFormItem: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          },
          tagElement: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          }
        },
        updateForm: {
          show: false,
          itemType: undefined,
          tagFormItem: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          },
          tagElement: {
            name: undefined,
            label: undefined,
            attributes: [],
            events: []
          }
        },
        table: {
          show: false,
          tagTableColumn: {
            attributes: [],
            events: []
          }
        }
      })
    }
  }
}
</script>
