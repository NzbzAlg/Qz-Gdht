<template>
  <div>
    <sx></sx>
    <el-row :class="$style.f_row">
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{industryParent}}</span>
          <p>行业大类</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num2}}</span>
          <p>行业细分</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num3}}</span>
          <p>场景类型大类</p>
        </el-card>
      </div>
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{num4}}</span>
          <p>行业类型细分</p>
        </el-card>
      </div>
    </el-row>
    <el-divider content-position="left">场景配置</el-divider>
    <div style="text-align: right;height:40px; margin-right: 90px;">
      <span>
        <el-button
          type="text"
          size="mini"
          style="position: absolute; left: 49%;"
          @click="addindustry"
        >新增行业类型</el-button>
      </span>
      <span>
        <el-button
          type="text"
          size="mini"
          style="position: absolute; right: 6%;"
          @click="addScenes"
        >新增场景类型</el-button>
      </span>
    </div>
    <div class="custom-tree-container">
      <div class="block" style="display: inline-block; width: 48%; vertical-align: top;">
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
              <el-button type="text" size="mini" @click.stop="() => append(data)" v-if="data.lv!==2">新增</el-button>
              <el-button type="text" size="mini" @click.stop="() => remove(node, data)">删除</el-button>
              <el-button type="text" size="mini" @click.stop="() => dj(node, data)">修改</el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="block" style="display: inline-block; width: 48%; vertical-align: top;">
        <el-tree
          :data="data1"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-drag-start="handleDragStart1"
          @node-drag-enter="handleDragEnter1"
          @node-drag-leave="handleDragLeave1"
          @node-drag-over="handleDragOver1"
          @node-drag-end="handleDragEnd1"
          @node-drop="handleDrop1"
          @node-click="dianji2"
          draggable
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click.stop="() => append1(data)" v-if="data.lv!==2">新增</el-button>
              <el-button type="text" size="mini" @click.stop="() => remove1(node, data)">删除</el-button>
              <el-button type="text" size="mini" @click.stop="() => dj1(node, data)">修改</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-button size="medium" type="primary" style="margin-top:20px;" @click="add">提交</el-button>
    <!-- 新增行业 -->
    <el-dialog title="提示" :visible.sync="industry" width="30%" :before-close="downindustry">
      <el-form :label-position="labelPosition" label-width="80px" :model="newformLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="newformLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="industry = false">取 消</el-button>
        <el-button type="primary" @click="Addoneindustry">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增场景 -->
    <el-dialog title="提示" :visible.sync="Scenes" width="30%" :before-close="downScenes">
      <el-form :label-position="labelPosition" label-width="80px" :model="newformLabelAlign1">
        <el-form-item label="名称">
          <el-input v-model="newformLabelAlign1.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Scenes = false">取 消</el-button>
        <el-button type="primary" @click="AddoneScenes">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增行业子级 -->
    <el-dialog title="提示" :visible.sync="NewdialogVisible" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newcertain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增场景子级 -->
    <el-dialog
      title="提示"
      :visible.sync="NewdialogVisibleScenes"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewdialogVisibleScenes = false">取 消</el-button>
        <el-button type="primary" @click="newcertainScenes">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改行业 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改场景 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding1">确 定</el-button>
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
    const data = []
    const data1 = [];
    return {
      industryParent: 2000,
      num2: 2000,
      num3: 2000,
      num4: 2000,
      data: JSON.parse(JSON.stringify(data)),
      data1: JSON.parse(JSON.stringify(data1)),
      currentPage4: 1,
      num: null,
      dialogVisible: false,
      dialogVisible1: false,
      input: '',
      input1: '',
      labelPosition: 'right',
      // 行业
      industry: false,
      newformLabelAlign: {
        name: ''
      },
      NewdialogVisible: false,
      formLabelAlign: {
        name: '',
        value: '',
      },
      fromsign: {},
      from: {},
      // 场景
      Scenes: false,
      newformLabelAlign1: {
        name: ''
      },
      NewdialogVisibleScenes: false,
      fromsign1: {},
      from1: {},
    }
  },
  mounted () {
    this.getList()
    this.getList1()
    this.getCount()
  },
  methods: {
    add () {
      console.log(this.data)
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    getCount () {
      this.$http.get(`modules/signIndustry/industryCount`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.industryParent = data.industryParent
          this.num2 = data.industry
          this.num3 = data.industryTypeParent
          this.num4 = data.industryType
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    // 行业联系
    getList () {
      this.$http.get(`modules/signIndustry/listByParent`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.data = data
          this.data.forEach(item => {
            item.id = item.id
            item.label = item.name
          })
        }else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    addindustry () {
      this.industry = true
    },
    downindustry () {
      this.industry = false
    },
    Addoneindustry () {
      if(this.newformLabelAlign.name === ''){
        this.$message.error('新增标签不能为空')
      }else{
        let info = new FormData()
        info.append('name', this.newformLabelAlign.name)
        info.append('lv', 1)
        this.$http.post(`modules/signIndustry`, { 'name': this.newformLabelAlign.name, 'lv': 1 }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.industry = false
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    getParent(){
      
    },
    dianji1 (node, data) {
      let data1 = data
      if (node.id === 0) {
        this.$message.error('该类型下暂无数据,请先增加数据');
      }else if(node.vl===2){
        this.$message.error('该数据为最后一级');
      } else {
        this.$http.get(`modules/signIndustry/listByParent`, {          params: {
            pid: node.id
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            if (data.length == 0) {
              this.$message.error('该类型下暂无数据,请先增加数据');
            } else {
              data.forEach(item => {
                item.label = item.name
              })
              if (!node.children) {
                this.$set(node, 'children', []);
              }
              node.children = data;
            }
          } else {
            this.$message.error(res.data.message);
          }
          this.Superior = node
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    newcertain () {
      this.NewdialogVisible = false
      console.log(this.fromsign.lv)
      if (this.fromsign.lv === 1 && this.formLabelAlign.name != '') {
        let info = new FormData()
        info.append('name', this.formLabelAlign.name)
        info.append('lv', 2)
        info.append('parent', this.fromsign.id)
        this.$http.post('modules/signIndustry', { 'name': this.formLabelAlign.name, 'lv': 2, 'parent': this.fromsign.id }).then(res => {
          this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
          if (!this.fromsign.children) {
            this.$set(this.fromsign, 'children', []);
          }
          this.fromsign.children.push(this.newChild);
          this.formLabelAlign.name = ''
          console.log(this.data)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (this.fromsign.lv === 1 && this.formLabelAlign.name === '') {
        this.$message.error('该类型下暂无数据,请先增加数据');
      }
      if (this.fromsign.lv === 2) {
        this.$message.error('无法继续添加标签');
        this.formLabelAlign.name = ''
      }
      if (this.fromsign.lv === 3) {
        console.log(3)
        this.$message.error('无法继续添加标签');
        this.formLabelAlign.name = ''
      }
      if (this.fromsign.lv === 4) {
        this.$message.error('无法继续添加标签');
        this.formLabelAlign.name = ''
      }
      // console.log(data)
    },
    queding () {
      this.from.label = this.input
      console.log(this.from)
      // console.log(this.Superior)
      if (this.from.lv === 1) {
        this.$http.put(`modules/signIndustry`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.getList()
            this.getList1()
            this.dialogVisible = false
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else {
        this.$http.put(`modules/signIndustry`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv, 'parent': this.Superior.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            // this.getList()
            this.dialogVisible = false
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    append (data) {
      this.NewdialogVisible = true
      this.fromsign = data
    },
    dj (node, data) {
      this.dialogVisible = true
      this.input = data.label
      this.from = data
      console.log(node)
      console.log(data)
    },
    remove (node, data) {
      console.log(data)
      let data1 = data
      this.$http.delete(`modules/signIndustry/${data1.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            message: '已删除',
            type: 'success'
          });
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    AddoneScenes () {
      let info = new FormData()
      info.append('name', this.newformLabelAlign.name)
      info.append('lv', 1)
      this.$http.post(`modules/signIndustryType`, { 'name': this.newformLabelAlign1.name, 'lv': 1 }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Scenes = false
          this.getList()
          this.getList1()
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)} v-if="data.lv!==2">新增</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>修改</el-button>
          </span>
        </span>);
    },
    handleDragStart (node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode.data)
      console.log(dropNode.data.lv)
      if (dropNode.data.lv === 1) {
        this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 2, 'parent': dropNode.data.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (dropNode.data.lv === 2) {
        this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 3, 'parent': dropNode.data.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
        // } else if (dropNode.data.lv === 3) {
        //   this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 4, 'parent': dropNode.data.id }).then(res => {
        //     var { code, data } = res.data
        //     if (code === 1000) {
        //       console.log(data)
        //     } else if (code == 2001) {
        //     this.$message.error(res.data.message);
        //     window.sessionStorage.clear();
        //     window.localStorage.clear();
        //     this.$router.push('/')
        //   } else {
        //     this.$message.error(res.data.message);
        //   }
        //   }).catch((err) => {
        //     console.log('错误信息' + err)
        //   })
      } else if (dropNode.data.lv === 4 || ropNode.data.lv === 3) {
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
    },
    // 场景类型
    getList1 () {
      this.$http.get(`modules/signIndustryType/listByParent`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.data1 = data
          this.data1.forEach(item => {
            item.id = item.id
            item.label = item.name
          })
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    addScenes () {
      this.Scenes = true
    },
    downScenes () {
      this.Scenes = false
    },
    dianji2 (node, data) {
      let data1 = data
      if (node.id === 0) {
        this.$message.error('该类型下暂无数据,请先增加数据');
      }else if(node.vl===2){
        this.$message.error('该数据为最后一级')
      } else {
        this.$http.get(`modules/signIndustryType/listByParent`, {          params: {
            pid: node.id
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            data.forEach(item => {
              item.label = item.name
            })
            if (!node.children) {
              this.$set(node, 'children', []);
            }
            node.children = data;
          } else {
            this.$message.error(res.data.message);
          }
          this.Superior = node
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    queding1 () {
      this.from1.label = this.input1
      console.log(this.from)
      // console.log(this.Superior)
      if (this.from.lv === 1) {
        this.$http.put(`modules/signIndustryType`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.getList()
            this.getList1()
            this.dialogVisible1 = false
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else {
        this.$http.put(`modules/signIndustryType`, { 'id': this.from.id, 'name': this.input, 'lv': this.from.lv, 'parent': this.Superior.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            // this.getList()
            this.dialogVisible1 = false
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    append1 (data) {
      this.NewdialogVisibleScenes = true
      this.fromsign1 = data
    },
    dj1 (node, data) {
      this.dialogVisible1 = true
      this.input1 = data.label
      this.from1 = data
    },
    newcertainScenes () {
      this.NewdialogVisibleScenes = false
      console.log(this.fromsign1)
      if (this.fromsign1.lv === 1) {
        let info = new FormData()
        info.append('name', this.formLabelAlign.name)
        info.append('lv', 2)
        info.append('parent', this.fromsign1.id)
        this.$http.post('modules/signIndustryType', { 'name': this.formLabelAlign.name, 'lv': 2, 'parent': this.fromsign1.id }).then(res => {
          this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
          if (!this.fromsign1.children) {
            this.$set(this.fromsign1, 'children', []);
          }
          this.fromsign1.children.push(this.newChild);
          this.formLabelAlign.name = ''
          console.log(this.data)
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      if (this.fromsign1.lv === 2) {
        this.$message.error('无法继续添加标签');
        this.formLabelAlign.name = ''
        // let info = new FormData()
        // info.append('name', this.formLabelAlign.name)
        // info.append('lv', 3)
        // info.append('parent', this.fromsign1.id)
        // this.$http.post('modules/signIndustryType', { 'name': this.formLabelAlign.name, 'lv': 3, 'parent': this.fromsign1.id }).then(res => {
        //   this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
        //   if (!this.fromsign1.children) {
        //     this.$set(this.fromsign1, 'children', []);
        //   }
        //   this.fromsign1.children.push(this.newChild);
        //   console.log(this.data)
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
      }
      if (this.fromsign1.lv === 3) {
        this.$message.error('无法继续添加标签');
        // let info = new FormData()
        // info.append('name', this.formLabelAlign.name)
        // info.append('lv', 4)
        // info.append('parent', this.fromsign1.id)
        // this.$http.post('modules/signIndustryType', { 'name': this.formLabelAlign.name, 'lv': 4, 'parent': this.fromsign1.id }).then(res => {
        //   this.newChild = { id: id++, label: this.formLabelAlign.name, children: [] };
        //   if (!this.fromsign1.children) {
        //     this.$set(this.fromsign1, 'children', []);
        //   }
        //   this.fromsign1.children.push(this.newChild);
        //   console.log(this.data)
        // }).catch((err) => {
        //   console.log('错误信息' + err)
        // })
      }
      if (this.fromsign1.lv === 4) {
        this.$message.error('无法继续添加标签');
      }
      // console.log(data)
    },
    remove1 (node, data) {
      console.log(data)
      let data1 = data
      this.$http.delete(`modules/signIndustryType/${data1.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
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
    },
    renderContent1 (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append1(data)} v-if="data.lv!==2">新增</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove1(node, data)}>删除</el-button>
            <el-button size="mini" type="text" on-click={() => this.dj1(node, data)}>修改</el-button>
          </span>
        </span>);
    },
    handleDragStart1 (node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter1 (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave1 (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver1 (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd1 (draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode.data)
      console.log(dropNode.data.lv)
      if (dropNode.data.lv === 1) {
        this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 2, 'parent': dropNode.data.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (dropNode.data.lv === 2) {
        this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 3, 'parent': dropNode.data.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (dropNode.data.lv === 3) {
        this.$http.put(`modules/signIndustry`, { 'id': draggingNode.data.id, 'name': draggingNode.data.label, 'lv': 4, 'parent': dropNode.data.id }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else if (dropNode.data.lv === 4) {
        this.$message.error('拖拽无效');
      }
    },
    handleDrop1 (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop1 (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag1 (draggingNode) {
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
</style>
