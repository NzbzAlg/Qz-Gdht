<template>
  
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'" :center="center" :zoom="zoom">
        <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index" :label="marker.label"></el-amap-marker>
      </el-amap>

    </div>
    <!-- <div>
      animation="AMAP_ANIMATION_BOUNCE" 标志跳动
        <button type="button" name="button" v-on:click="toggleVisible">first marker</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
    </div> -->
</template>

<script>
export default {
    // 接受父组件的值
    props: {
      row:Object,
      required: true
    },
    watch:{
      row:{  
          handler(newValue, oldValue) {  
            console.log('this.newValue,this.oldValue',this.newValue,this.oldValue)
              if(newValue!=oldValue){
                  this.$nextTick(()=>{
                      this.generateData()
                  })
              }
          },  
          immediate:true,//关键
          deep:true
        },
      },
    created(){
      this.generateData(this.row);
        
    },
  data() {
        return {
          address:'',
          count: 1,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          },
          zoom: 15,
          center: [121.5273285, 31.21515044],
          markers: [
            // {
            //   // position: this.$gaocenter,
            //   position: this.center,
            // //   events: {
            // //     click: () => {
            // //       alert('click marker');
            // //     },
            // //     dragend: (e) => {
            // //       console.log('---event---: dragend')
            // //       this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            // //     }
            // //   },
            //   visible: true,
            //   draggable: false,
            //   label: {content:'<span style="word-wrap: break-word; word-break: break-all; width:50px;">'+this.address||'  '+'</span>',offset: [10, -20]},
            // },
            // console.log('aaa',this.gaocenter)
          ],
          renderMarker: {
            position: [121.5273285, 31.21715058],
            contentRender: (h, instance) => {
              // if use jsx you can write in this
              // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
              return h(
                'div',
                {
                  style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                  on: {
                    click: () => {
                      const position = this.renderMarker.position;
                      this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                    }
                  }
                },
                ['marker inner text']
              )
            }
          },
          componentMarker: {
            position: [121.5273285, 31.21315058],
            contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
          },
          slotMarker: {
            position: [121.5073285, 31.21715058]
          }
        };
      },
      methods: {
        async generateData (){
          
          let _result = await this.getdata(this.row) 
          console.log(this.row);
         
        },
        getdata(item){
          let that=this
          that.center=[item.lng,item.lat];  //初始化时候的赋值
 
            that.address = item.formatted_address;//点击选择新地址并获取地址的名称

            that.markers=[
            {
              position: that.center,
              visible: true,
              draggable: false,
              label: {content:'<span style="word-wrap: break-word; word-break: break-all; width:50px;">'+that.address||'  '+'</span>',offset: [10, -20]},
            }]
          console.log('that.center,that.address',that.center,that.address,that.markers);
          // if(item.lng){ 
          //     let locations=item.lng+','+item.lat;
          //     that.$jsonp('https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+item.lng+','+item.lat+'&coordsys=gps&output=json&key=7b2709273be94bf7782a65c261b84863').then(function(res){ 
          //       // console.log(res)
          //       locations=res.locations
          //       item.lng=locations.split(',')[0]; 
          //       item.lat=locations.split(',')[1]; 
          //       that.center=[item.lng,item.lat];     
          //       that.$jsonp('https://restapi.amap.com/v3/geocode/regeo?output=json&location='+locations+'&key=7b2709273be94bf7782a65c261b84863&radius=1000&extensions=all').then(function(res){
          //             // console.log(res);
          //             let d = res.regeocode;
          //             that.address='';
          //             // console.log(d.formatted_address);
          //             if (d) {
          //               that.address = d.formatted_address;//点击选择新地址并获取地址的名称
          //             } 
          //              that.markers=[
          //               {
          //                 // position: this.$gaocenter,
          //                 position: that.center,
          //               //   events: {
          //               //     click: () => {
          //               //       alert('click marker');
          //               //     },
          //               //     dragend: (e) => {
          //               //       console.log('---event---: dragend')
          //               //       this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
          //               //     }
          //               //   },
          //                 visible: true,
          //                 draggable: false,
          //                 label: {content:'<span style="word-wrap: break-word; word-break: break-all; width:50px;">'+that.address||'  '+'</span>',offset: [10, -20]},
          //               }]
          //             console.log('that.center,that.address',that.center,that.address,that.markers);  
                                      
          //         }).catch(function (error) {
          //             console.log(error);
          //         });
          //       }).catch(function (error) {
          //           console.log(error);
          //       });
          // }else{
          //   console.log('error');
          // }
              
        },
        onClick() {
          this.count += 1;
        },
        changePosition() {
          let position = this.markers[0].position;
          this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
        },
        chnageDraggle() {
          let draggable = this.markers[0].draggable;
          this.markers[0].draggable = !draggable;
        },
        toggleVisible() {
          let visableVar = this.markers[0].visible;
          this.markers[0].visible = !visableVar;
          console.log(this.markers[0])
        },
        addMarker() {
          let marker = {
            position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
          };
          this.markers.push(marker);
        },
        removeMarker() {
          if (!this.markers.length) return;
          this.markers.splice(this.markers.length - 1, 1);
        }
      }

    };
</script>

<style>
.amap-wrapper {
  width: 100%;
  height: 500px;
}
</style>