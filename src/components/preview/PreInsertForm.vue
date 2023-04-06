<script>
import { setAttributes, styleHyphenFormat } from '@/assets/ElComponent.js'
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
        const tag = styleHyphenFormat(itemType)
        eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `></el${tag}>`)
        eles.push(`    </el-form-item>`)
      }
    })
    eles.push(`    <el-button size="mini" @click="handleInsertFormHide('dynamicValidateForm')">取 消</el-button>`)
    eles.push(`    <el-button type="primary" size="mini" @click="handleFormSubmit('dynamicValidateForm')">确 定</el-button>`)
    eles.push(`  </el-form>`)
    eles.push(`</el-card>`)
    this.$options.template = eles.join('\n')

    const elesCopy = eles.copyWithin(0)

    const methodsNames = []
    for (const k in this) {
      const type = typeof this[k]
      if (!k.startsWith('$') && !k.startsWith('_') && type === 'function') {
        if (k !== 'constructor') {
          methodsNames.push(k)
        }
      }
    }

    elesCopy.push('<' + 'script' + '>')
    elesCopy.push(`export default {`)
    elesCopy.push(`  props: {},`)
    // data
    elesCopy.push(`  data: {`)
    elesCopy.push('    ' + JSON.stringify(this.$data).split('{"').join('{\n"').split('}').join('\n}'))

    elesCopy.push(`  },`)
    // computed
    // method
    elesCopy.push(`  methods: {`)
    for (const m of methodsNames) {
      elesCopy.push(`    ${m}() {`)
      elesCopy.push(`      // auto generate`)
      elesCopy.push(`    },`)
    }
    elesCopy.push(`  }`)
    elesCopy.push('<' + '/script' + '>')
    this.$emit('flushCode', { insert: elesCopy.join('\n') })
  },

  methods: {
    handleInsertFormHide() {},
    handleFormSubmit() {
      console.log(this.form)
    }
  }
}
</script>
