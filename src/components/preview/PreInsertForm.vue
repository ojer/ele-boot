<script>
export default {
  props: {
    genData: Array,
    limit: Number
  },
  template: '<div>null</div>',
  data() {
    return {
      dialogFormVisible: true,
      form: {}
    }
  },
  methods: {
    handleInsertFormHide() {},
    handleFormSubmit() {
      console.log(this.form)
    },
    styleHyphenFormat(propertyName) {
      return propertyName.replace(/[A-Z]/g, (match) => {
        return '-' + match.toLowerCase()
      })
    }
  },
  mounted() {
    //    console.log(this)
  },
  created() {
    console.debug('pre-insert', this.genData)
    let str = '<div></div>'
    if (this.genData && this.genData.length > 0) {
      str = '<el-card>' + '<el-form ref="dynamicValidateForm" :model="form" label-position="top" size="mini">'
      // :rules="">
      this.genData.forEach((item) => {
        const tag = this.styleHyphenFormat(item.itemType)
        str += `<el-form-item label="${item.title}" prop="${item.name}">`
        str += `<el${tag} v-model="form.${item.name}"`
        item.attributes.forEach((att) => {
          if (att.default !== undefined) {
            str += ' '
            str += `${att.type === 'String' ? '' : ':'}${att.name}="${att.default}"`
          }
        })
        str += `></el${tag}>`
        str += `</el-form-item>`
      })
      str += `<el-button size="mini" @click="handleInsertFormHide('dynamicValidateForm')">取 消</el-button>`
      str += `<el-button type="primary" size="mini" @click="handleFormSubmit('dynamicValidateForm')">确 定</el-button>`
      str += `</el-form>`
      str += `</el-card>`
    }
    this.$options.template = str
  }
}
</script>
