<script>
export default {
  props: {
    genData: Object
  },
  template: '<el-empty description=" "></el-empty>',
  data() {
    return {
      dialogFormVisible: true,
      form: {}
    }
  },
  mounted() {},
  created() {
    console.log('genData', this.genData)
    if (!this.genData.params || this.genData.params.length === 0) {
      return
    }
    let str = '<el-card>'
    // :model="form"
    str += '<el-form ref="dynamicValidateForm" '
    // <el-form>
    const tagForm = this.genData.tagForm
    str = this.setAttributes(tagForm.insert.attributes, str)
    str += '>'

    // :rules="">
    this.genData.params.forEach(({ insertForm: { itemType, show, tagElement, tagFormItem }, name, title }) => {
      if (show && itemType) {
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
          switch (type) {
            case 'Object':
            case 'Array':
              var o = JSON.parse(JSON.stringify(this.$data))
              this.setDataPar(o, value)
              for (const k in o) {
                this.$data[k] = o[k]
              }
              // Object.assign(this.$data, o)
              str += `:${name}="$data.${value}"`
              break
            case 'String':
              str += `:${name}="'${value}'"`
              break
            case 'Boolean':
              str += `:${name}="${value}"`
              break
            case 'Number':
              str += `:${name}="${value}"`
              break
            default:
              str += `:${name}="${value}"`
          }
        }
      })
      return str
    }
  }
}
</script>
