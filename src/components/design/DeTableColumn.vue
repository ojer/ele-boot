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
    column: Object
  },
  data() {
    return {
      localColumn: this.column
    }
  },
  created() {
    Object.assign(this.localColumn, new ElComponent(eleTableColumn.value))
  }
}
</script>
