import { BaseComponent } from './BaseComponent.js'
import InputModule from 'element-ui/lib/input.js'

export const Input = class extends BaseComponent {
  constructor() {
    const name = 'Input'
    const label = '输入框'
    const events = []
    super(name, label, InputModule, events)
  }
}
