export const BaseComponent = class {
  constructor(name, label, attributes, events) {
    this.name = name
    this.label = label
    this.attributes = attributes
    this.events = events
  }

  static formItemTypes() {
    const formItemTypes = [
      {
        value: 'Checkbox',
        types: [{ value: 'checkbox', label: '多选框' }]
      },
      {
        value: 'Input',
        types: [{ value: 'input', label: '输入框' }]
      },

      {
        value: 'InputNumber',
        types: [{ value: 'inputNumber', label: '计数器' }]
      },
      {
        value: 'Cascader',
        types: [{ value: 'cascader', label: '级联选择器' }]
      },
      {
        value: 'DateTimePicker',
        types: [
          { value: 'datePicker', label: '日期选择器' },
          { value: 'timePicker', label: '时间选择器' },
          { value: 'dateTimePicker', label: '日期时间选择器' }
        ]
      },
      {
        value: 'Radio',
        types: [{ value: 'radio', label: '单选框' }]
      },
      {
        value: 'Rate',
        types: [{ value: 'rate', label: '评分' }]
      },
      {
        value: 'Select',
        types: [{ value: 'select', label: '选择器' }]
      },
      {
        value: 'Slider',
        types: [{ value: 'slider', label: '滑块' }]
      },
      {
        value: 'Switch',
        types: [{ value: 'switch', label: '开关' }]
      }
    ]
    return formItemTypes
  }
}
