<script setup>
import PreInsertForm from './preview/PreInsertForm.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handClick">
      <el-tab-pane label="Data" name="data"> data </el-tab-pane>
      <el-tab-pane label="List" name="list"> list </el-tab-pane>
      <el-tab-pane label="Insert" name="insert">
        <pre-insert-form :genData="genData.insertForm" :limit="limit" :key="limit" />
      </el-tab-pane>
      <el-tab-pane label="Update" name="updateForm"> update </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  props: {
    entity: Object,
    limit: Number
  },
  data() {
    return {
      activeName: 'list',
      genData: {
        insertForm: [],
        updateForm: [],
        table: []
      }
    }
  },
  watch: {
    limit(newV, oldV) {
      this.gener()
    }
  },
  computed: {},
  methods: {
    handClick(val) {
      console.log(val)
    },
    gener() {
      console.log('start-gen', this.entity)
      this.entity.params.forEach((par) => {
        if (par.showInsert) {
          this.genData.insertForm = []
          this.genData.insertForm.push({
            name: par.name,
            title: par.title,
            itemType: par.insertForm.itemType,
            attributes: par.insertForm.component.attributes
          })
        }

        if (par.showUpdate) {
          this.genData.updateForm = []
          this.genData.updateForm.push({
            name: par.name,
            title: par.title,
            itemType: par.updateForm.itemType,
            attributes: par.updateForm.component.attributes
          })
        }

        if (par.showTable) {
          this.genData.table = []
          this.genData.table.push({
            name: par.name,
            title: par.title,
            itemType: par.insertForm.itemType,
            attributes: par.component.attributes
          })
        }
      })
    }
  }
}
</script>
