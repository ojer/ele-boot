<script setup>
import { ElComponent, eleForm } from '@/assets/ElComponent.js'
import DeGeneral from './DeGeneral.vue'
</script>
<template>
  <de-general :item.sync="localForm" />
</template>
<script>
export default {
  props: {
    form: Object,
    name: String
  },
  data() {
    return {
      localForm: this.form
    }
  },
  created() {
    Object.assign(this.localForm, new ElComponent(eleForm.value))
  }
}
</script>
