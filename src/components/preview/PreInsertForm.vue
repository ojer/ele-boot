<script>
import { setAttributes } from '@/assets/ElComponent.js'
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
    const eles = []
    eles.push('<el-card>')
    // :model="form"
    // <el-form>
    eles.push('  <el-form ref="dynamicValidateForm" ' + setAttributes(this.$data, this.genData.tagForm.insert.attributes) + '>')

    // :rules="">
    this.genData.params.forEach(({ insertForm: { itemType, show, tagElement, tagFormItem }, name, title }) => {
      if (show && itemType) {
        // form-item
        eles.push(`    <el-form-item label="${title}" prop="${name}"` + setAttributes(this.$data, tagFormItem.attributes) + `>`)
        // el-xxx
        const tag = this.styleHyphenFormat(itemType)
        eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `></el${tag}>`)
        eles.push(`    </el-form-item>`)
      }
    })
    eles.push(`    <el-button size="mini" @click="handleInsertFormHide('dynamicValidateForm')">取 消</el-button>`)
    eles.push(`    <el-button type="primary" size="mini" @click="handleFormSubmit('dynamicValidateForm')">确 定</el-button>`)
    eles.push(`  </el-form>`)
    eles.push(`</el-card>`)
    this.$options.template = eles.join('\n')
    console.log(this.$options.template)
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
  }
}
</script>
