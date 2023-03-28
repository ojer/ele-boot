<script setup>
import { Input } from '@/assets/comp/Input.js'
import FormSet from './FormSet.vue'
const handleIsKeyChange = (val, par) => {
  if (val) {
    // par.showInsert = false
    // par.showUpdate = false
    // par.showTable = false
  }
}
const handleShowInsertChange = (val, par) => {
  if (val) {
    console.log('insertShow')
  }
}
const handleShowUpdateChange = (val, par) => {
  if (!val) {
    return
  }
  if (!par.updateForm.itemType && par.showInsert && par.insertForm.itemType) {
    const obj = JSON.stringify(par.insertForm)
    par.updateForm = JSON.parse(obj)
  }
}

const handleInsertFormItemTypeChange = (val, form) => {
  switch (val) {
    case 'input':
      form.component = new Input()
      break
    default:
  }
}

const handleUpdateFormItemTypeChange = (val, form) => {
  handleInsertFormItemTypeChange(val, form)
}
</script>
<template>
  <div>
    <el-form ref="form" :model="form" size="mini" label-width="150px">
      <div v-for="(p, pi) in form.params" :key="pi">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{ p.title }} {{ p.name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">x</el-button>
          </div>
          <div>
            <el-form-item label="Title">
              <el-input v-model="p.title"></el-input>
            </el-form-item>

            <el-form-item label="name">
              <el-input v-model="p.name"></el-input>
            </el-form-item>

            <el-form-item label="主键">
              <el-switch v-model="p.isKey" @change="(val) => handleIsKeyChange(val, p)"> </el-switch>
            </el-form-item>

            <el-form-item label="新增时可编辑">
              <el-switch v-model="p.showInsert" @change="(val) => handleShowInsertChange(val, p)"> </el-switch>
            </el-form-item>
            <template>
              <form-set :showProps="p.showInsert" :formProps="p.insertForm" :nameProps="p.name" />
            </template>

            <el-form-item label="修改时可编辑">
              <el-switch v-model="p.showUpdate" @change="(val) => handleShowUpdateChange(val, p)"> </el-switch>
            </el-form-item>

            <el-card v-show="p.showUpdate" style="width: calc(100% - 100px); margin: 20px 100px">
              <el-form-item label="表单组件">
                <el-select v-model="p.updateForm.itemType" placeholder="选择" style="width: 100%" @change="(val) => handleUpdateFormItemTypeChange(val, p.updateForm)">
                  <el-option-group v-for="group in formItemTypes" :key="group.value" :label="group.value">
                    <el-option v-for="item in group.types" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-row v-for="(att, attIndex) in p.updateForm.component.attributes" :key="attIndex">
                <el-form-item :label="att.params" style="width: calc(100% - 50px); display: inline-block">
                  <el-radio-group v-if="att.type === 'boolean' || (att.acceptedVals && att.acceptedVals.length > 0)" v-model="att.default">
                    <el-radio v-for="(item, index) in att.acceptedVals" :key="index" :label="item">{{ item }}</el-radio>
                  </el-radio-group>
                  <el-input v-else v-model="att.default"></el-input>
                </el-form-item>
                <!--<el-col :span="4" style="text-align: right">-->
                <el-popover placement="right" title="说明" width="500" trigger="click" :content="att.description">
                  <el-button type="text" slot="reference" icon="el-icon-info" size="mini" style="width: 50px" circle></el-button>
                </el-popover>
              </el-row>
            </el-card>

            <el-form-item label="Table 显示列">
              <el-switch v-model="p.showTable" @change="(val) => handleIsKeyChange(val, p)"> </el-switch>
            </el-form-item>
          </div>
        </el-card>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItemTypes: Input.formItemTypes(),
      form: {
        name: '',
        params: [
          {
            name: undefined,
            title: undefined,
            isKey: false,
            showInsert: true,
            showUpdate: true,
            showTable: true,
            insertForm: {
              itemType: undefined,
              component: {
                attributes: [],
                events: {}
              }
            },
            updateForm: {
              itemType: undefined,
              component: {
                attributes: [],
                events: {}
              }
            }
          }
        ]
      }
    }
  }
}
</script>
