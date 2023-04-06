import ElementUI from 'element-ui'

export const eleForm = { name: 'Form 表单', value: 'Form' }
export const eleFormItem = { name: 'FormItem 表单项', value: 'FormItem' }

export const eleFormComponent = [
  { name: 'Radio 单选框', value: 'Radio' },
  { name: 'RadioGroup 单选框组', value: 'RadioGroup' },
  { name: 'Checkbox 多选框', value: 'Checkbox' },
  { name: 'CheckboxGroup 多选框组', value: 'CheckboxGroup' },
  { name: 'Input 输入框', value: 'Input' },
  { name: 'InputNumber 计数器', value: 'InputNumber' },
  { name: 'Select 选择器', value: 'Select' },
  { name: 'Calendar 级联选择器', value: 'Calendar' },
  { name: 'Switch 开关', value: 'Switch' },
  { name: 'Slider 滑块', value: 'Slider' },
  { name: 'TimePicker 时间选择器-任意时间点', value: 'TimePicker' },
  { name: 'TimeSelect 时间选择器-固定时间点', value: 'TimeSelect' },
  { name: 'DatePicker 日期选择器', value: 'DatePicker' },
  { name: 'Upload 上传', value: 'Upload' }
]

export const eleTable = { name: 'Table 表格', value: 'Table' }
export const eleTableColumn = { name: 'TableColumn 表格列', value: 'TableColumn' }

export const styleHyphenFormat = (propertyName) => {
  return propertyName.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase()
  })
}

export const setAttributes = (data, attributes) => {
  let str = ''
  attributes.forEach(({ name, type, value, default: defVal }) => {
    name = styleHyphenFormat(name)
    if (value !== undefined && defVal !== value) {
      str += ` `
      switch (type) {
        case 'Object':
        case 'Array':
          var o = JSON.parse(JSON.stringify(data))
          setDataPar(o, value)
          for (const k in o) {
            data[k] = o[k]
          }
          // Object.assign(data, o)
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
const setDataPar = (obj, key) => {
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
}

console.log(ElementUI)

export const ElComponent = class {
  constructor(val) {
    const component = ElementUI[val]
    if (!component) {
      throw new Error('未知的组件: ' + val)
    }

    const attributes = []
    const ps = component.props
    for (const key in ps) {
      const po = ps[key]
      let type
      if (po.type) {
        type = po.type.name
      } else {
        type = undefined
      }
      let defaultVal = po.default
      if (defaultVal !== undefined && type !== 'Boolean') {
        defaultVal = defaultVal.toString()
      }
      attributes.push({
        name: key,
        type: type,
        default: defaultVal,
        value: defaultVal
        // description: '?',
      })
    }

    this.attributes = attributes
    //    this.name = name
    // this.label = label
    // this.events = events
  }
}

const otherComponent = [
  'Alert',
  'Aside',
  'Autocomplete',
  'Avatar',
  'Backtop',
  'Badge',
  'Breadcrumb',
  'BreadcrumbItem',
  'Button',
  'ButtonGroup',
  'Card',
  'Carousel',
  'CarouselItem',
  'Cascader',
  'CascaderPanel',
  'CheckboxButton',
  'Col',
  'Collapse',
  'CollapseItem',
  'CollapseTransition',
  'ColorPicker',
  'Container',
  'Descriptions',
  'DescriptionsItem',
  'Dialog',
  'Divider',
  'Drawer',
  'Dropdown',
  'DropdownItem',
  'DropdownMenu',
  'Empty',
  'Footer',
  'Header',
  'Icon',
  'Image',
  'InfiniteScroll',
  'Link',
  'Loading',
  'Main',
  'Menu',
  'MenuItem',
  'MenuItemGroup',
  'Message',
  'MessageBox',
  'Notification',
  'Option',
  'OptionGroup',
  'PageHeader',
  'Pagination',
  'Popconfirm',
  'Popover',
  'Progress',
  'RadioButton',
  'Rate',
  'Result',
  'Row',
  'Scrollbar',
  'Skeleton',
  'SkeletonItem',
  'Spinner',
  'Statistic',
  'Step',
  'Steps',
  'Submenu',
  'TabPane',
  'Tabs',
  'Tag',
  'Timeline',
  'TimelineItem',
  'Tooltip',
  'Transfer',
  'Tree'
]
console.log('otherComponent', otherComponent)
