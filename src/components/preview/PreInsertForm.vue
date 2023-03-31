<script>
export default {
  props: {
    genData: Object,
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
    },
    // TODO
    setDataPar(obj, key) {
      var ks = key.split('.')
      var o = obj
      const kl = ks.length
      for (let i = 0; i < kl; i++) {
        var k = ks[i]
        var fo = o[k]
        if (fo === undefined) {
          if (i < kl - 1) {
            o[k] = {}
          } else {
            o[k] = undefined
          }
        }
        o = o[k]
      }
    },
    setAttributes(attributes, str) {
      attributes.forEach(({ name, type, value, default: defVal }) => {
        if (value !== undefined && defVal !== value) {
          str += ` `
          if (type === 'String') {
            str += `${name}="${value}"`
          } else {
            var o = JSON.parse(JSON.stringify(this._data))
            this.setDataPar(o, value)
            Object.assign(this._data, o)
            str += `:${name}="${value}"`
          }
        }
      })
      return str
    }
  },
  mounted() {
    //    console.log(this)
  },
  created() {
    console.log('genData', this.genData)
    if (!this.genData.params || this.genData.params.length === 0) {
      return
    }
    let str = '<el-card>'
    str += '<el-form ref="dynamicValidateForm" :model="form"'
    // <el-form>
    const tagForm = this.genData.tagForm
    str = this.setAttributes(tagForm.insert.attributes, str)
    str += '>'

    // :rules="">
    this.genData.params.forEach(({ insertForm: { itemType, show, tagElement, tagFormItem }, name, title }) => {
      if (show) {
        // form-item
        str += `<el-form-item label="${title}" prop="${name}"`
        str = this.setAttributes(tagFormItem.attributes, str)
        str += `>`
        // el-xxx
        const tag = this.styleHyphenFormat(itemType)
        str += `<el${tag} v-model="form.${name}"`
        str = this.setAttributes(tagElement.attributes, str)
        str += `></el${tag}>`
        str += `</el-form-item>`
      }
    })
    str += `<el-button size="mini" @click="handleInsertFormHide('dynamicValidateForm')">取 消</el-button>`
    str += `<el-button type="primary" size="mini" @click="handleFormSubmit('dynamicValidateForm')">确 定</el-button>`
    str += `</el-form>`
    str += `</el-card>`
    console.log(str)
    this.$options.template = str
  }
}
</script>
