<script setup>
import DataSet from './data/DataSet.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <data-set />
</template>

<style scoped></style>
