export const formItemTypes = {
  input: 'input',
  inputNumber: 'inputNumber',
  textarea: 'textarea',
  date: 'date',
  time: 'time',
  datetime: 'datetime',
  daterange: 'daterange',
  checkbox: 'checkbox',
  select: 'select',
  selectMultiple: 'selectMultiple'
}

export function init(dataConstructor) {
  return initConfig(dataConstructor)
}

function initConfig(dataConstructor) {
  const config = {
    table: {
      cols: [],
      pagination: {
        enable: true,
        layout: 'total, sizes, prev, pager, next'
      }
    },
    form: {
      data: {},
      defaultData: {},
      items: []
    },

    searchForm: {
      data: {},
      items: []
    },
    dataKey: {
      prop: 'null-key',
      val: undefined
    }
  }
  dataConstructor.forEach((col) => {
    if (!col.disabled) {
      col.disabled = {}
    }
    if (!col.hide) {
      col.hide = {}
    }

    if (!col.hide) {
      col.rules = []
    }

    if (!col.disabled.table) {
      if (!col.tableColumnAttributes) {
        col.tableColumnAttributes = {}
      }
      config.table.cols.push(col)
    }
    if (!col.disabled.form) {
      config.form.items.push(col)
      if (col.formItemTypes === 'checkbox' || col.formItemTypes === 'selectMultiple') {
        config.form.data[col.prop] = []
      } else {
        config.form.data[col.prop] = undefined
      }
    }

    if (!col.search) {
      col.search = false
    }
    if (col.search) {
      config.searchForm.items.push(col)
      if (col.formItemTypes === 'checkbox') {
        config.searchForm.data[col.prop] = []
      } else {
        config.searchForm.data[col.prop] = undefined
      }
    }

    if (col.isKey && col.prop) {
      config.dataKey.prop = col.prop
    }
  })
  config.form.defaultData = JSON.parse(JSON.stringify(config.form.data))
  return config
}
