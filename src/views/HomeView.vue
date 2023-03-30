<script setup>
import ResultPreview from '@/components/ResultPreview.vue'
import DeBase from '@/components/design/DeBase.vue'
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="wrapper">
        <de-base @gener="gener" />
      </div>
    </el-col>
    <el-col :span="12">
      <result-preview :entity="entity" :limit="limit" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      limit: 0,
      entity: {}
    }
  },

  methods: {
    gener(val) {
      this.entity = val
      this.limit++
    }
  }
}
</script>
