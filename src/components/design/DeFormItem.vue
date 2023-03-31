<script setup>
import { ElComponent, eleFormItem } from '@/assets/ElComponent.js'
import DeGeneral from './DeGeneral.vue'
</script>
<template>
  <de-general :item.sync="localFormItem" />
</template>
<script>
export default {
  props: {
    formItem: Object,
    name: String,
    title: String
  },
  data() {
    return {
      localFormItem: this.formItem
    }
  },
  created() {
    Object.assign(this.localFormItem, new ElComponent(eleFormItem.value))
  }
}
</script>
