<script setup>
import DeFormElement from './DeFormElement.vue'
import DeTable from './DeTable.vue'
</script>

<template>
  <el-form ref="form" :model="form" size="mini" label-width="150px">
    <div v-for="(p, pi) in form.params" :key="pi">
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{ p.title }} {{ p.name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text">x</el-button>
        </div>
        <div>
          <template>
            <el-form-item label="Title">
              <el-input v-model="p.title"></el-input>
            </el-form-item>
            <el-form-item label="name">
              <el-input v-model="p.name"></el-input>
            </el-form-item>
            <el-form-item label="主键">
              <el-switch v-model="p.isKey" :disabled="!p.name" @change="(val) => handleIsKeyChange(val, p)"> </el-switch>
            </el-form-item>
          </template>

          <template>
            <el-form-item label="新增时可编辑">
              <el-switch v-model="p.showInsert" :disabled="!p.name" @change="(val) => handleShowInsertChange(val, p)"> </el-switch>
            </el-form-item>
            <de-form-element v-show="p.showInsert" :form.sync="p.insertForm" :name="p.name" />
          </template>

          <template>
            <el-form-item label="修改时可编辑">
              <el-switch v-model="p.showUpdate" :disabled="!p.name" @change="(val) => handleShowUpdateChange(val, p)"> </el-switch>
            </el-form-item>
            <de-form-element v-show="p.showUpdate" :form.sync="p.updateForm" :name="p.name" />
          </template>

          <template>
            <el-form-item label="Table 显示列">
              <el-switch v-model="p.showTable" :disabled="!p.name" @change="(val) => handleShowTableChange(val, p)"> </el-switch>
            </el-form-item>
            <de-table :show="p.showTable" :table.sync="p.listTable" />
          </template>
        </div>
      </el-card>
    </div>
    <el-button @click="gener"> O K </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
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
                events: []
              }
            },
            updateForm: {
              itemType: undefined,
              component: {
                label: undefined,
                name: undefined,
                attributes: [],
                events: []
              }
            },
            listTable: {
              itemType: undefined,
              component: {
                label: undefined,
                name: undefined,
                attributes: []
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    handleIsKeyChange(val, par) {},
    handleShowInsertChange(val, par) {},
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
    handleShowTableChange(val, par) {},
    gener() {
      this.$emit('gener', this.form)
    }
  }
}
</script>
