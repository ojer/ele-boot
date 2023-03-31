<script setup>
import { ElComponent, eleTableColumn } from '@/assets/ElComponent.js'
import DeGeneral from './DeGeneral.vue'
</script>
<template>
  <de-general :item.sync="localColumn" />
</template>
<script>
export default {
  props: {
    column: Object,
    name: String
  },
  data() {
    return {
      localColumn: this.column
    }
  },
  created() {
    this.localColumn = new ElComponent(eleTableColumn.value)
  }
}
</script>
