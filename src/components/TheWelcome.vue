<script setup>
const activeName='list'
function handClick(val){
  console.log(val)
}
</script>

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handClick">
    <el-tab-pane label="Data" name="data">list</el-tab-pane>
    <el-tab-pane label="List" name="list">list</el-tab-pane>
    <el-tab-pane label="Insert" name="insert">list</el-tab-pane>
    <el-tab-pane label="Update" name="updateForm">list</el-tab-pane>
    </el-tabs>
  </div>
</template>
