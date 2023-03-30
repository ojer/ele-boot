<template>
  <el-card v-show="show" style="width: calc(100% - 100px); margin: 20px 100px">
    <div>
      <el-row v-for="(att, attIndex) in tableData.component.attributes" :key="attIndex">
        <el-form-item :label="att.params" style="width: calc(100% - 0px); display: inline-block">
          <el-radio-group v-if="att.type === 'Boolean'" v-model="att.default">
            <el-radio v-for="(item, index) in [false, true]" :key="index" :label="item">{{ item }}</el-radio>
          </el-radio-group>
          <el-input v-else v-model="att.default"></el-input>
        </el-form-item>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    table: Object,
    show: Boolean
  },
  data() {
    return {
      tableData: this.table
    }
  },
  mounted() {
    //    this.tableData.component = new TableColumn()
  }
}
</script>
