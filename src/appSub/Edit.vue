<template>
  <el-dialog
    title="提示"
    :visible="value"
    @close="close"
    width="50%">
    <el-form label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-select v-model="form.createTime" placeholder="时间">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  let form = {
    name: '',
    age: '',
    createTime: ''
  };
  export default {
    name: "Edit",
    props: {
      value: {     // 控制弹出框的显示
        type: Boolean,
        default: false
      },
      data: {       // 数据
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        form: Object.assign({}, form)
      }
    },
    watch: {
      value(val) {
        if (val) {     // 如果是
          this.form = Object.assign({}, this.data)
        }
      }
    },
    methods: {
      confirm() {
        this.close()
      },
      close() {
        this.form = Object.assign({}, form)
        this.$emit('input', false)
      }
    }
  }
</script>

<style scoped>

</style>
