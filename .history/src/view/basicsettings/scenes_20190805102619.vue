<template>
  <div>
    <sx></sx>
    <el-row :class="$style.f_row">
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num1}}</span>
          <p>区域类型</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num2}}</span>
          <p>区域细分</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num3}}</span>
          <p>场景类型</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num4}}</span>
          <p>场景细分</p>
        </el-card>
      </div>
    </el-row>
    <el-divider content-position="left">区域类型</el-divider>
    <div style="text-align: right; margin-right: 90px;">
      <span>
        <el-button type="text" size="mini" @click="Newadd">新增</el-button>
      </span>
    </div>
    <div class="block">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        @node-click="dianji1"
        draggable
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click.stop="() => append(data)">新增</el-button>
            <el-button type="text" size="mini" @click.stop="() => remove(node, data)">删除</el-button>
            <el-button type="text" size="mini" @click.stop="() => dj(node, data)">修改</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- <el-button size="medium" type="primary" style="margin-top:20px;" @click="add">提交</el-button> -->
    <!-- 新增 -->
    <el-dialog title="提示" :visible.sync="NewFirstlevel" width="30%" :before-close="handleClose1">
      <el-form :label-position="labelPosition" label-width="80px" :model="newformLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="newformLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Addone">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="提示" :visible.sync="NewdialogVisible" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型">
          <el-select v-model="formLabelAlign.value" :class="$style.f_select" placeholder="请选择">
            <el-option v-for="item in options" :key="item.lv" :label="item.name" :value="item.lv"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newcertain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 0;
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  data () {
    const data = [];
    // const newChild={}
    return {
      num1: 2000,
      num2: 2000,
      num3: 2000,
      num4: 2000,
      data: JSON.parse(JSON.stringify(data)),
      currentPage4: 1,
      num: null,
      dialogVisible: false,
      NewdialogVisible: false,
      input: '',
      from: {},
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        value: '',
      },
      fromsign: {},
      options: [
        {
          lv: 1,
          name: '区域大类'
        },
        {
          lv: 2,
          name: '区域细分'
        },
        {
          lv: 3,
          name: '类型大类'
        },
        {
          lv: 4,
          name: '类型细分'
        },
      ],
      newChild: {},
      newformLabelAlign: {
        name: ''
      },
      NewFirstlevel: false,
      Superior: []
    }
  },
  mounted () {
    this.num = 6;
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/signRegion/listByParent`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.data = data
          this.data.forEach(item => {
            item.id = item.id
            item.label = item.name
          })
          // console.log(this.data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Newadd () {
      this.NewFirstlevel = true
    },
    Addone () {
      let info = new FormData()
      info.append('name', this.newformLabelAlign.name)
      info.append('lv', 1)
      this.$http.post(`modules/signRegion`, { 'name': this.newformLabelAlign.name, 'lv': 1 }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.NewFirstlevel = false
          this.getList()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    add () {
      console.log(this.data)
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    // 修改
    dj (node, data) {
      this.dialogVisible = true
      this.input = data.label
      this.from = data
    },
    queding () {
      this.from.label = this.input
      console.log(this.from)
      // console.log(this.Superior)
      if (this.from.lv === 1) {
        this.$http.put(`modules/signRegion/`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.getList()
            this.dialogVisible = false
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else {
        this.$http.put(`modules/signRegion/`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv, 'parent': this.Superior.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            // this.getList()
            this.dialogVisible = false
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    append (data) {
      this.NewdialogVisible = true
      this.fromsign = data
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // console.log(data)
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    dianji1 (node, data) {
      let data1 = data
      this.$http.get(`modules/signRegion/listByParent?pid=${node.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          data.forEach(item => {
            item.label = item.name
          })
          if (!node.children) {
            this.$set(node, 'children', []);
          }
          node.children = data;
        }
        this.Superior = node
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    newcertain () {
      this.NewdialogVisible = false
      console.log(this.fromsign.lv)
      if (this.fromsign.lv === 1) {
        let info = new FormData()
        info.append('name', this.formLabelAlign.name)
        info.append('lv', 2)
        info.append('parent', this.fromsign.id)
        this.$http.post('modules/signRegion', { 'name': this.formLabelAlign.name, 'lv': 2, 'parent': this.fromsign.id }).then(res => {
          this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
          if (!this.fromsign.children) {
            this.$set(this.fromsign, 'children', []);
          }
          this.fromsign.children.push(this.newChild);
          console.log(this.data)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      if (this.fromsign.lv === 2) {
        let info = new FormData()
        info.append('name', this.formLabelAlign.name)
        info.append('lv', 3)
        info.append('parent', this.fromsign.id)
        this.$http.post('modules/signRegion', { 'name': this.formLabelAlign.name, 'lv': 3, 'parent': this.fromsign.id }).then(res => {
          this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
          if (!this.fromsign.children) {
            this.$set(this.fromsign, 'children', []);
          }
          this.fromsign.children.push(this.newChild);
          console.log(this.data)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      if (this.fromsign.lv === 3) {
        let info = new FormData()
        info.append('name', this.formLabelAlign.name)
        info.append('lv', 4)
        info.append('parent', this.fromsign.id)
        this.$http.post('modules/signRegion', { 'name': this.formLabelAlign.name, 'lv': 4, 'parent': this.fromsign.id }).then(res => {
          this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
          if (!this.fromsign.children) {
            this.$set(this.fromsign, 'children', []);
          }
          this.fromsign.children.push(this.newChild);
          console.log(this.data)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      if (this.fromsign.lv === 4) {
        this.$message.error('无法继续添加标签');
      }
      // console.log(data)
    },
    handleClose1(){
      this.NewFirstlevel = false
      this.newformLabelAlign.name= ''
    },
    remove (node, data) {
      console.log(data)
      let data1 = data
      this.$http.delete(`modules/signRegion/${data1.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getList()
          this.$message({
            message: '已删除',
            type: 'success'
          });
        } else {
          console.log(data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>新增</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>修改</el-button>
          </span>
        </span>);
    },
    handleDragStart (node, ev) {
      // console.log('drag start', node);
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver (draggingNode, dropNode, ev) {
      // console.log(1)
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode.data)
      console.log(dropNode.data.lv)
      if(dropNode.data.lv===1){
      this.$http.put(`modules/signRegion/`,{ 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv':2, 'parent': dropNode.data.id }).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      }else  if(dropNode.data.lv===2){
      this.$http.put(`modules/signRegion/`,{ 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv':3, 'parent': dropNode.data.id }).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      }else  if(dropNode.data.lv===3){
      this.$http.put(`modules/signRegion/`,{ 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv':4, 'parent': dropNode.data.id }).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      }else  if(dropNode.data.lv===4){
        this.$message.error('拖拽无效');
      }
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    }
  }
}
</script>

<style lang='scss' module>
.f_row {
  margin-bottom: 20px;
  .f_da {
    width: 286px;
    margin: 0 auto;
    margin-top: 20px;
    display: inline-block;
  }
  .f_sheng {
    margin: 0 24px;
  }
}
.f_sl {
  margin-top: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 28px;
}
.f_select {
  width: 100%;
}
</style>
