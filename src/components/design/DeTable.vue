<script setup>
import { ElComponent, eleTable } from '@/assets/ElComponent.js'
import DeGeneral from './DeGeneral.vue'
</script>
<template>
  <de-general :item.sync="localTable" />
</template>
<script>
export default {
  props: {
    table: Object,
    name: String
  },
  data() {
    return {
      localTable: this.table
    }
  },
  created() {
    Object.assign(this.localTable, new ElComponent(eleTable.value))
  }
}
</script>
