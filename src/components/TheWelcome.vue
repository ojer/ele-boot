<script setup>
import DataSet from './data/DataSet.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'

const activeName = 'list'
const handClick = (val) => {
  console.log(val)
}
</script>

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handClick">
      <el-tab-pane label="Data" name="data">
        <data-set />
      </el-tab-pane>
      <el-tab-pane label="List" name="list">list</el-tab-pane>
      <el-tab-pane label="Insert" name="insert">list</el-tab-pane>
      <el-tab-pane label="Update" name="updateForm">list</el-tab-pane>
    </el-tabs>
  </div>
</template>
