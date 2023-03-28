<template>
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
            <form-set :show="p.showInsert" :form.sync="p.insertForm" :name="p.name" />
          </template>

          <el-form-item label="修改时可编辑">
            <el-switch v-model="p.showUpdate" @change="(val) => handleShowUpdateChange(val, p)"> </el-switch>
          </el-form-item>

          <template>
            <form-set :show="p.showUpdate" :form.sync="p.updateForm" :name="p.name" />
          </template>

          <el-form-item label="Table 显示列">
            <el-switch v-model="p.showTable" @change="(val) => handleIsKeyChange(val, p)"> </el-switch>
          </el-form-item>
        </div>
      </el-card>
    </div>
  </el-form>
</template>

<script>
import { Input } from '@/assets/comp/Input.js'
import FormSet from './FormSet.vue'
export default {
  components: {
    FormSet
  },
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
            showInsert: false,
            showUpdate: false,
            showTable: false,
            insertForm: {
              itemType: undefined,
              component: {
                label: undefined,
                name: undefined,
                attributes: [],
                events: {}
              }
            },
            updateForm: {
              itemType: undefined,
              component: {
                label: undefined,
                name: undefined,
                attributes: [],
                events: {}
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    handleIsKeyChange(val, par) {
      if (val) {
        // par.showInsert = false
        // par.showUpdate = false
        // par.showTable = false
      }
    },
    handleShowInsertChange(val, par) {
      if (val) {
        console.log('insertShow')
      }
    },
    handleShowUpdateChange(val, par) {
      if (!val) {
        return
      }
      if (par.showInsert && par.insertForm.itemType) {
        console.log(par.insertForm)
        const obj = JSON.stringify(par.insertForm)
        const {
          itemType,
          component: { label, name, attributes, events }
        } = JSON.parse(obj)
        par.updateForm.itemType = itemType
        par.updateForm.component.label = label
        par.updateForm.component.name = name
        par.updateForm.component.attributes = attributes
        par.updateForm.component.events = events
      }
    },

    handleInsertFormItemTypeChange(val, form) {
      switch (val) {
        case 'input':
          form.component = new Input()
          break
        default:
      }
    },

    handleUpdateFormItemTypeChange(val, form) {
      this.handleInsertFormItemTypeChange(val, form)
    }
  }
}
</script>
