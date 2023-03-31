<script setup>
import PreInsertForm from './preview/PreInsertForm.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <el-card style="min-height: 90vh">
    <div slot="header" class="clearfix">
      <span>preview</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="gener">刷新</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handClick">
      <el-tab-pane label="Data" name="data"> data </el-tab-pane>
      <el-tab-pane label="List" name="list"> list </el-tab-pane>
      <el-tab-pane label="Insert" name="insert">
        <pre-insert-form :genData="genData" :key="limit" />
      </el-tab-pane>
      <el-tab-pane label="Update" name="updateForm"> update </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  props: {
    entity: Object
  },
  data() {
    return {
      activeName: 'list',
      limit: 0.1,
      genData: this.entity
    }
  },
  computed: {},
  methods: {
    handClick(val) {
      console.log(val)
    },
    gener() {
      if (this.entity.params.length === 0) {
        this.$message.error('无有效参数')
        return
      }
      this.limit += 0.00001
    }
  }
}
</script>
