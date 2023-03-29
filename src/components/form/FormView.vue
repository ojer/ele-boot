<script>
export default {
  props: {
    templateObj: Object
  },
  template: '<div>null</div>',
  methods: {
    getTemplate() {
      return
    },
    c1() {
      alert(1)
    }
  },
  mounted() {
    console.log(this)
  },
  created() {
    this.$options.template = `
    <el-button @click="c1">ok</el-button>
    `
  }
}
</script>
