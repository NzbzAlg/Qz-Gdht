<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ><router-view></router-view></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
 data() {
      return {
        editableTabsValue: '',
        editableTabs: [{
          title: '首页',
          name: '1',
        }],
        tabIndex: 0,
        object:{}
      }
    },
    created(){
      console.log(1)
    },
    mounted(){
    },
      methods: {
      addTab() {
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
}
</script>

<style>
</style>
