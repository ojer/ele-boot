<template>
  <el-card style="padding: 0px">
    <el-row v-for="(att, attIndex) in localItem.attributes" :key="attIndex">
      <el-form-item :label="att.name" style="width: calc(100% - 0px); display: inline-block">
        <el-radio-group v-if="att.type === 'Boolean'" v-model="att.value">
          <el-radio v-for="(item, index) in [false, true]" :key="index" :label="item">{{ item }}</el-radio>
        </el-radio-group>
        <el-input v-else type="textarea" autosize v-model="att.value"></el-input>
      </el-form-item>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      localItem: this.item
    }
  }
}
</script>
