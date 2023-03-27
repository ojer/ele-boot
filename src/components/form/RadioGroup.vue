<template>
  <div>
    <el-form-item label="value/v-model">
      <el-input v-model="form.paramsName"></el-input>
    </el-form-item>
    <el-form-item label="size">
      <el-radio-group v-model="radio">
        <el-radio :label="medium">medium</el-radio>
        <el-radio :label="small">small</el-radio>
        <el-radio :label="mini">mini</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
