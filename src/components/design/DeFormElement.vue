<template>
  <el-card style="width: calc(100% - 100px); margin: 20px 100px">
    <el-form-item label="表单组件">
      <el-select v-model="formData.itemType" placeholder="选择" style="width: 100%" @change="(val) => handleInsertFormItemTypeChange(val)">
        <el-option v-for="item in formItemTypes" :key="item.value" :label="item.name" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <div v-show="formData.itemType">
      <!--<el-card>-->
      <!--<div slot="header" class="clearfix">-->
      <!--<span>Attributes</span>-->
      <!--</div>-->
      <div>
        <el-row v-for="(att, attIndex) in formData.component.attributes" :key="attIndex">
          <el-form-item :label="att.name" style="width: calc(100% - 0px); display: inline-block">
            <el-radio-group v-if="att.type === 'Boolean'" v-model="att.default">
              <el-radio v-for="(item, index) in [false, true]" :key="index" :label="item">{{ item }}</el-radio>
            </el-radio-group>
            <el-input v-else v-model="att.default"></el-input>
          </el-form-item>
          <!--<el-popover placement="right" title="说明" width="500" trigger="click" :content="att.description">-->
          <!--<el-button type="text" slot="reference" icon="el-icon-info" size="mini" style="width: 50px" circle></el-button>-->
          <!--</el-popover>-->
        </el-row>
      </div>
      <!--</el-card>-->
      <el-card v-show="false">
        <div slot="header">
          <span>Events</span>
        </div>
        <div>
          <el-row v-for="(eve, index) in formData.component.events" :key="index">
            <el-form-item :label="eve.name" style="width: calc(100% - 100px); display: inline-block">
              <el-input v-model="eve.default" type="textarea" :autosize="{ minRows: 1, maxRows: 80 }"></el-input>
            </el-form-item>
            <el-button type="text" size="mini" style="width: 50px" circle @click="generMethod(eve)">Gener</el-button>
            <el-popover placement="right" title="说明" width="500" trigger="click" :content="eve.description">
              <el-button type="text" slot="reference" icon="el-icon-info" size="mini" style="width: 50px" circle></el-button>
            </el-popover>
          </el-row>
        </div>
      </el-card>
    </div>
  </el-card>
</template>
<script>
import { eleFormComponent, ElComponent } from '@/assets/ElComponent.js'
export default {
  props: {
    form: Object,
    name: String
  },
  data() {
    return {
      formItemTypes: eleFormComponent,
      formData: this.form
    }
  },
  methods: {
    handleInsertFormItemTypeChange(val) {
      this.formData.component = new ElComponent(val)
    },
    generMethod(eve) {
      eve.default = eve.gener(this.name)
    }
  }
}
</script>
