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
      form: {},
      options: [
        {
          label: 'lab1',
          value: 'val1'
        },
        {
          label: 'lab2',
          value: 'val2'
        },
        {
          label: 'lab3',
          value: 'val3'
        },
        {
          label: 'lab4',
          value: 'val4'
        },
        {
          label: 'lab5',
          value: 'val5'
        }
      ]
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
        // name: 'Radio 单选框', value: 'Radio' },
        // name: 'RadioGroup 单选框组', value: 'RadioGroup' },
        // name: 'Checkbox 多选框', value: 'Checkbox' },
        // name: 'CheckboxGroup 多选框组', value: 'CheckboxGroup' },
        // name: 'Input 输入框', value: 'Input' },
        // name: 'InputNumber 计数器', value: 'InputNumber' },
        // name: 'Select 选择器', value: 'Select' },
        // name: 'Calendar 级联选择器', value: 'Calendar' },
        // name: 'Switch 开关', value: 'Switch' },
        // name: 'Slider 滑块', value: 'Slider' },
        // name: 'TimePicker 时间选择器-任意时间点', value: 'TimePicker' },
        // name: 'TimeSelect 时间选择器-固定时间点', value: 'TimeSelect' },
        // name: 'DatePicker 日期选择器', value: 'DatePicker' },
        // name: 'Upload 上传', value: 'Upload' }
        const tag = styleHyphenFormat(itemType)
        switch (itemType) {
          case 'Radio':
            break
          case 'RadioGroup':
            eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `>`)
            eles.push(`        <el-radio v-for="(item,index) in options" :key="index" :label="item.label">`)
            eles.push(`        {{ item.value }}`)
            eles.push(`        </el-radio>`)
            eles.push(`      </el${tag}>`)
            break
          case 'Checkbox':
            break
          case 'CheckboxGroup':
            eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `>`)
            eles.push(`        <el-checkbox v-for="item,index in options" :key="index" :label="item.label">`)
            eles.push(`        {{ item.value }}`)
            eles.push(`        </el-checkbox>`)
            eles.push(`      </el${tag}>`)
            break
          case 'Input':
            break
          case 'InputNumber':
            break
          case 'Select':
            eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `>`)
            eles.push(`        <el-option v-for="item,index in options" :key="index" :label="item.label" :value="item.value">`)
            eles.push(`        </el-option>`)
            eles.push(`      </el${tag}>`)
            break
          case 'Calendar':
            break
          case 'Switch':
            break
          case 'Slider':
            break
          case 'TimePicker':
            break
          case 'TimeSelect':
            break
          case 'DatePicker':
            break
          case 'Upload':
            break
          default:
            eles.push(`      <el${tag} v-model="form.${name}"` + setAttributes(this.$data, tagElement.attributes) + `></el${tag}>`)
        }

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
