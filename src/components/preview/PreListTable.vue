<script>
import { setAttributes } from '@/assets/ElComponent.js'
import { appendNextLine } from '@/assets/Utils.js'
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
    const str = '<el-card>'
    appendNextLine(str, `<div slot="header">`)
    appendNextLine(str, `<el-row :gutter="10">`)
    appendNextLine(str, `<el-col :span="6">`)
    appendNextLine(str, `<span style=" color: #909399; width: 80px; display: inline-block;"> search1: </span>`)
    appendNextLine(str, `<el-input/>`)
    appendNextLine(str, `</el-col>`)
    appendNextLine(str, `<el-col :span="6">`)
    appendNextLine(str, `<span style=" color: #909399; width: 80px; display: inline-block;"> search2: </span>`)
    appendNextLine(str, `<el-input/>`)
    appendNextLine(str, `</el-col>`)
    appendNextLine(str, `<el-col :span="6">`)
    appendNextLine(str, `<span style=" color: #909399; width: 80px; display: inline-block;"> search3: </span>`)
    appendNextLine(str, `<el-input/>`)
    appendNextLine(str, `</el-col>`)
    appendNextLine(str, `<el-col :span="6" style="text-align: right">`)
    appendNextLine(str, `</el-col>`)
    appendNextLine(str, `</el-row>`)
    appendNextLine(str, `</div>`)
    appendNextLine(str, `<el-button type="danger" :disabled="multipleSelection.length < 1 || disableDeleteButton" size="mini"> 删除 </el-button>`)
    appendNextLine(str, `<el-button type="primary" size="mini" :disabled="list.length < 1">数据导出</el-button>`)
    appendNextLine(str, `<el-table v-loading="listLoading" :data="list" style="width: 100%; margin-top: 10px">`)
    appendNextLine(str, setAttributes(this.$data, this.genData.tagTable.attributes))
    appendNextLine(str, `>`)
    appendNextLine(str, `<el-table-column type="selection" width="60" ></el-table-column>`)

    this.genData.params.forEach(({ table: { show, tagTableColumn }, name, title }) => {
      if (show) {
        appendNextLine(str, `<el-table-column label="${title}" prop="${name}"`)
        appendNextLine(str, setAttributes(this.$data, tagTableColumn.attributes))
        appendNextLine(str, `>`)
        appendNextLine(str, `<template slot-scope="{ row }">`)
        appendNextLine(str, `{{ row.name }}`)
        appendNextLine(str, `</template>`)
        appendNextLine(str, `</el-table-column>`)
      }
    })
    appendNextLine(str, `</el-table>`)
    appendNextLine(str, `</el-card>`)
    appendNextLine(str, `<pagination :limit.sync="listQuery.pageSize" :page.sync="listQuery.currentPage" :total="total" style="margin: auto" />`)
    this.template = str
    this.$options.template = str
    console.log('Table', this.template)
  },
  mounted() {},
  methods: {}
}
</script>
