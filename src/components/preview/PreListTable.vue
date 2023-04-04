<script>
import { setAttributes } from '@/assets/ElComponent.js'
export default {
  template: '<el-empty description=" "></el-empty>',
  props: {
    genData: Object
  },
  data() {
    return {
      listLoading: false,
      list: [],
      multipleSelection: [],
      template: '',
      nextLine: '\r\n'
    }
  },
  created() {
    console.log('genData', this.genData)
    if (!this.genData.params || this.genData.params.length === 0) {
      return
    }
    const eles = []
    eles.push('<el-card>')
    eles.push(`  <div slot="header">`)
    eles.push(`    <el-row :gutter="10">`)
    eles.push(`      <el-col :span="6">`)
    eles.push(`        <span style=" color: #909399; width: 80px; display: inline-block;"> search1: </span>`)
    eles.push(`        <el-input/>`)
    eles.push(`      </el-col>`)
    eles.push(`      <el-col :span="6">`)
    eles.push(`        <span style=" color: #909399; width: 80px; display: inline-block;"> search2: </span>`)
    eles.push(`        <el-input/>`)
    eles.push(`      </el-col>`)
    eles.push(`      <el-col :span="6">`)
    eles.push(`        <span style=" color: #909399; width: 80px; display: inline-block;"> search3: </span>`)
    eles.push(`        <el-input/>`)
    eles.push(`      </el-col>`)
    eles.push(`      <el-col :span="6" style="text-align: right">`)
    eles.push(`      </el-col>`)
    eles.push(`    </el-row>`)
    eles.push(`  </div>`)
    eles.push(`  <el-button type="danger" :disabled="multipleSelection.length < 1 || disableDeleteButton" size="mini"> 删除 </el-button>`)
    eles.push(`  <el-button type="primary" size="mini" :disabled="list.length < 1">数据导出</el-button>`)
    eles.push(`  <el-table v-loading="listLoading" :data="list" style="width: 100%; margin-top: 10px"` + setAttributes(this.$data, this.genData.tagTable.attributes) + `>`)
    eles.push(`    <el-table-column type="selection" width="60" ></el-table-column>`)
    this.genData.params.forEach(({ table: { show, tagTableColumn }, name, title }) => {
      if (show) {
        eles.push(`<el-table-column label="${title}" prop="${name}"` + setAttributes(this.$data, tagTableColumn.attributes) + `>`)
        eles.push(`  <template slot-scope="{ row }">`)
        eles.push(`    {{ row.name }}`)
        eles.push(`  </template>`)
        eles.push(`</el-table-column>`)
      }
    })
    eles.push(`  </el-table>`)
    eles.push(`</el-card>`)
    eles.push(`<pagination :limit.sync="listQuery.pageSize" :page.sync="listQuery.currentPage" :total="total" style="margin: auto" />`)
    const elesStr = eles.join('\n')
    this.template = elesStr
    this.$options.template = elesStr
    console.log('Table', this.template)
  },
  mounted() {},
  methods: {}
}
</script>
