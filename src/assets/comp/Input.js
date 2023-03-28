import { BaseComponent } from './BaseComponent.js'

export const Input = class extends BaseComponent {
  constructor() {
    const name = 'Input'
    const label = '输入框'
    const attributes = [
      //      {
      //        params: '',
      //        default: '',
      //        acceptedVals: []
      //      },
      // number
      {
        params: 'type',
        description: '类型',
        type: 'string',
        default: 'text',
        acceptedVals: ['text', 'textarea']
      },
      {
        params: 'maxlength',
        description: '最大输入长度',
        type: 'number',
        default: '',
        acceptedVals: []
      },
      {
        params: 'minlength',
        description: '最小输入长度',
        type: 'number',
        default: '',
        acceptedVals: []
      },
      {
        params: 'show-word-limit',
        description: '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'placeholder',
        description: '输入框占位文本',
        type: 'string',
        default: '',
        acceptedVals: []
      },
      {
        params: 'clearable',
        description: '是否可清空',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'show-password',
        description: '是否显示切换密码图标',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'size',
        description: '输入框尺寸，只在 type!="textarea" 时有效',
        type: 'string',
        default: '',
        acceptedVals: ['', 'medium', 'small', 'mini']
      },
      {
        params: 'prefix-icon',
        description: '输入框头部图标',
        type: 'string',
        default: '',
        acceptedVals: []
      },
      {
        params: 'suffix-icon',
        description: '输入框尾部图标',
        type: 'string',
        default: '',
        acceptedVals: []
      },
      {
        params: 'rows',
        description: '输入框行数，只对 type="textarea" 有效',
        type: 'number',
        default: 2,
        acceptedVals: []
      },
      {
        params: 'autosize',
        description: '自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'autocomplete',
        description: '原生属性，自动补全',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'readonly',
        description: '原生属性，是否只读',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'autofocus',
        description: '原生属性，自动获取焦点',
        type: 'boolean',
        default: false,
        acceptedVals: [false, true]
      },
      {
        params: 'tabindex',
        description: '输入框的tabindex',
        type: 'string',
        default: '',
        acceptedVals: []
      }
    ]
    const events = [
      {
        name: 'blur',
        default: '',
        description: '在 Input 失去焦点时触发, (event: Event)',
        gener: (val) => {
          return `${val}InputBlur(event){console.log(event)}`
        }
      },
      {
        name: 'focus',
        default: '',
        description: '在 Input 获得焦点时触发	(event: Event)',
        gener: (val) => {
          return `${val}InputFocus(event){console.log(event)}`
        }
      },
      {
        name: 'change',
        default: '',
        description: '	仅在输入框失去焦点或用户按下回车时触发	(value: string | number)',
        gener: (val) => {
          return `${val}InputChange(value){console.log(value)}`
        }
      },
      {
        name: 'input',
        default: '',
        description: '	在 Input 值改变时触发	(value: string | number)',
        gener: (val) => {
          return `${val}InputInput(value){console.log(value)}`
        }
      },
      {
        name: 'clear',
        default: '',
        description: '在点击由 clearable 属性生成的清空按钮时触发	—',
        gener: (val) => {
          return `${val}InputClear(){console.log('${val} clear')}`
        }
      }
    ]
    super(name, label, attributes, events)
  }
}
