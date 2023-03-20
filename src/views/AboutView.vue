<template>
  <div>
    <EleTemplate :dataConstructor="dataConstructor" :selectList="selectList">
      <template #cus-tab-scope="{ scope, col }">
        {{ scope.row[col.prop] }}
      </template>
    </EleTemplate>
  </div>
</template>

<script>
import EleTemplate from '../components/element/EleTemplate.vue'
const formItemTypes = {}
const dataConstructor = [
  {
    prop: 'id',
    isKey: true,
    disabled: {
      table: true,
      form: true
    }
  },
  {
    prop: 'orgId',
    disabled: {
      table: true,
      form: true
    }
  },

  {
    prop: 'customerId',
    formItemTypes: formItemTypes.select,
    label: '客户',
    rules: [{ required: true, message: '无效的名称', trigger: 'change' }],
    options: [],
    search: true,
    disabled: {
      table: true
    }
  },
  {
    prop: 'customerName',
    label: '客户姓名',
    disabled: {
      form: true
    },
    tableColumnAttributes: {
      minWidth: 90
    }
  },

  {
    prop: 'nursePackageId',
    formItemTypes: formItemTypes.select,
    options: [],
    label: '套餐',
    rules: [{ required: true, message: '无效的名称', trigger: 'change' }],
    disabled: {
      table: true
    }
  },

  {
    prop: 'nursePackageName',
    label: '套餐名称',
    disabled: {
      form: true
    },
    tableColumnAttributes: {
      showOverflowTooltip: true,
      minWidth: 400
    }
  },

  {
    prop: 'packageStartDate',
    label: '生效时间',
    formItemTypes: formItemTypes.date,
    rules: [{ required: true, message: '无效时间', trigger: 'change' }],
    disabled: {
      // form: true
    },
    tableColumnAttributes: {
      minWidth: 100
    },
    search: true,
    searchFormItemTypes: formItemTypes.daterange
  },
  {
    prop: 'packageDuration',
    formItemTypes: formItemTypes.select,
    label: '签约时长',
    rules: [{ required: true, message: '无效时长', trigger: 'change' }],
    options: [
      {
        sourceObj: {
          id: 6
        },
        value: 6,
        label: '6个月',
        info: '半年'
      },
      {
        sourceObj: {
          id: 12
        },
        value: 12,
        label: '12个月',
        info: '一年'
      },
      {
        sourceObj: {
          id: 18
        },
        value: 18,
        label: '18个月',
        info: '一年半'
      },
      {
        sourceObj: {
          id: 24
        },
        value: 24,
        label: '24个月',
        info: '两年'
      }
    ],
    disabled: {
      table: true
    }
  },

  {
    prop: 'packageEndDate',
    label: '结束时间',
    formItemTypes: formItemTypes.daterange,
    search: true,
    disabled: {
      form: true
    },

    tableColumnAttributes: {
      minWidth: 100
    }
  },

  {
    prop: 'currentPeriodStartDate',
    label: '当前周期',
    disabled: {
      form: true
    },
    tableColumnAttributes: {
      minWidth: 200
    }
  },
  {
    prop: 'lastSurplus',
    label: '上期剩余/小时',
    disabled: {
      form: true
    },

    tableColumnAttributes: {
      minWidth: 100
    }
  },
  {
    prop: 'overlaySurplus',
    label: '叠加时长/小时',
    tableColumnAttributes: {
      minWidth: 100
    },
    disabled: {
      form: true
    }
  },

  {
    prop: 'currentSurplus',
    label: '剩余时长/小时',
    tableColumnAttributes: {
      minWidth: 100
    },
    disabled: {
      form: true
    }
  },

  {
    prop: 'updateDate',
    label: 'updateDate',
    disabled: {
      form: true,
      table: true
    },

    tableColumnAttributes: {
      minWidth: 170
    }
  },
  {
    prop: 'state',
    label: '状态',
    formItemTypes: formItemTypes.input,
    disabled: {
      form: true,
      table: true
    }
  },
  {
    prop: 'remark',
    label: '备注',
    tableColumnAttributes: {
      showOverflowTooltip: true
    },
    disabled: {
      form: true,
      table: true
    },
    formItemTypes: formItemTypes.textarea,
    rules: [{ min: 0, max: 100, message: '100个字符以内', trigger: ['blur', 'change'] }]
  }
]

export default {
  components: {
    EleTemplate
  },
  data() {
    return {
      dataConstructor: dataConstructor,
      permission: {
        delete: false,
        insert: true,
        update: true
      }
    }
  },
  created() {},
  methods: {
    selectList() {
      return Promise.resolve({
        code: 200,
        msg: '操作成功',
        data: {
          list: [
            {
              id: 'bff6e0e28eb744e7b419f84ff2bfae4e',
              orgId: '1e7bf993615811ecbeb1000c29afe8b3',
              customerId: '7eb3030cbd9b4374be93786e20e7fc14',
              nursePackageId: '35003afdbab7405181e1f75e66c129c5',
              packageStartDate: '2023-03-18',
              packageEndDate: '2023-04-17',
              lastSurplus: 0,
              currentSurplus: 0,
              overlaySurplus: 16,
              currentPeriodStartDate: '2023-03-18',
              currentPeriodEndDate: '2023-04-17',
              state: 10,
              createDate: '2023-03-17 16:56:02',
              updateDate: '2023-03-20 13:44:14',
              customerName: '祁和珍',
              nursePackageName: '12套餐'
            },
            {
              id: '9daba3284f564ed28c1f5866fda00f95',
              orgId: '1e7bf993615811ecbeb1000c29afe8b3',
              customerId: '7119e485292942388ed3dffb0c21a85f',
              nursePackageId: '8bae5b015ca64c5b84b2df2f60931f52',
              packageStartDate: '2000-02-29',
              packageEndDate: '2002-03-01',
              lastSurplus: 0,
              currentSurplus: 331,
              overlaySurplus: 22,
              currentPeriodStartDate: '2000-02-29',
              currentPeriodEndDate: '2000-03-28',
              state: 1,
              createDate: '2023-03-17 16:30:28',
              updateDate: '2023-03-17 17:09:44',
              customerName: '李菊芳',
              nursePackageName: '331套餐'
            },
            {
              id: '1ecf5466840e456d80ae1c083eef2601',
              orgId: '1e7bf993615811ecbeb1000c29afe8b3',
              customerId: '69bbe3ae96944ea7aeb75ee06cc782e2',
              nursePackageId: '8bae5b015ca64c5b84b2df2f60931f52',
              packageStartDate: '2023-03-29',
              packageEndDate: '2024-03-29',
              lastSurplus: 0,
              currentSurplus: 331,
              overlaySurplus: 0,
              currentPeriodStartDate: '2023-03-29',
              currentPeriodEndDate: '2023-04-28',
              state: 0,
              createDate: '2023-03-16 16:53:42',
              updateDate: '2023-03-16 16:53:42',
              customerName: '郑宝林',
              nursePackageName: '331套餐'
            },
            {
              id: 'f015d9a2e8d04fb681339fa37ea385d5',
              orgId: '1e7bf993615811ecbeb1000c29afe8b3',
              customerId: '0098962e18fd431eb90bb5f2d94cdc93',
              nursePackageId: '1f2dda1a57db4647ae681c30ac240ef2',
              packageStartDate: '2023-03-16',
              packageEndDate: '2024-03-15',
              lastSurplus: 0,
              currentSurplus: 323,
              overlaySurplus: 1111111,
              currentPeriodStartDate: '2023-03-16',
              currentPeriodEndDate: '2023-04-15',
              state: 0,
              createDate: '2023-03-16 15:28:28',
              updateDate: '2023-03-16 16:34:05',
              customerName: '张学龙',
              nursePackageName: null
            }
          ],
          count: 4
        }
      })
    }
  }
}
</script>
