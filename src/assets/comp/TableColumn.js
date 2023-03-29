import { BaseComponent } from './BaseComponent.js'
import TableColumnModule from 'element-ui/lib/table-column.js'

export const TableColumn = class extends BaseComponent {
  constructor() {
    const name = 'TableColumn'
    const label = '表格列'
    super(name, label, TableColumnModule, [])
  }
}
