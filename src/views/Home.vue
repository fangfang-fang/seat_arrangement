<template>
  <el-container>
    <el-header>
      <div>
<!--        <img class="logo" src="../assets/logo1.png">-->
      </div>
      <div style="display: flex;flex-direction: row;align-items: center;">
        <span>管理员</span>
        <el-dropdown style="margin-left: 5px">
          <el-icon style="margin-right: 8px">
            <Setting/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userexit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-divider style="margin: 0"></el-divider>

    <el-container>
      <el-aside :width="isCollapse?'32px':'350px'" class="el-aside">
        <div style="text-align:right;">
          <img src="../assets/transfer.png" id="asideImg" @click="toggleCollapse" style="width:30px;height:30px;">
        </div>
        <!-- <el-scrollbar> -->
        <div id="asideContent" style="padding: 0 20px;display: flex;flex-direction: column">
          <el-form :model="activityForm" label-width="auto">
            <div style="font-size: 20px;font-weight: bolder;margin-bottom: 10px">基础信息</div>
            <el-form-item label="活动名称：">
              <el-input v-model="activityForm.name" placeholder="请输入活动名称"/>
            </el-form-item>
            <el-form-item label="场地：">
              <el-select v-model="activityForm.place" placeholder="请选择场地"  style="width: 100%" @change="handleChange">
                <el-option
                    v-for="item in roomList"
                    :key="item.id"
                    :label="item.roomName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="人数：">
              <el-input v-model="activityForm.peopleNum" placeholder="请输入人数" @change="handleNumChange"/>
            </el-form-item>
            <div style="font-size: 20px;font-weight: bolder;margin-bottom: 10px">舞台</div>
            <el-form-item label="朝向：">
              <el-select v-model="activityForm.face" placeholder="请选择朝向" style="width: 100%">
                <el-option label="东" value="东" />
                <el-option label="南" value="南" />
                <el-option label="西" value="西" />
                <el-option label="北" value="北" />
              </el-select>
            </el-form-item>
            <el-form-item label="长度：">
              <el-input v-model="activityForm.length" placeholder="请输入长度">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input v-model="activityForm.width" placeholder="请输入宽度">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
            <el-form-item label="离墙距离：">
              <el-input v-model="activityForm.wallDistance" placeholder="请输入离墙距离">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
            <el-form-item label="离桌距离：">
              <el-input v-model="activityForm.deskDistance" placeholder="请输入离桌距离">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div style="display: flex;justify-content: space-between">
            <div style="font-size: 20px;font-weight: bolder;margin-bottom: 10px">主桌</div>
            <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
          </div>
          <el-form :model="mainDeskForm" :label-position="'top'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-input v-model="mainDeskForm.mainDeskType1" disabled style="margin-bottom: 10px" v-if="mainDeskForm.mainDeskNum1>0"/>
                  <el-input v-model="mainDeskForm.mainDeskType2" disabled style="margin-bottom: 10px" v-if="mainDeskForm.mainDeskNum2>0"/>
                  <el-input v-model="mainDeskForm.mainDeskType3" disabled style="margin-bottom: 10px" v-if="mainDeskForm.mainDeskNum3>0"/>
                  <el-input v-model="mainDeskForm.mainDeskType4" disabled style="margin-bottom: 10px" v-if="mainDeskForm.mainDeskNum4>0"/>
                  <el-input v-model="mainDeskForm.mainDeskType5" disabled style="margin-bottom: 10px" v-if="mainDeskForm.mainDeskNum5>0"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="间距（米）">
                  <el-input-number v-model="mainDeskForm.mainDeskDistance1" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false" v-if="mainDeskForm.mainDeskNum1>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskDistance2" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false" v-if="mainDeskForm.mainDeskNum2>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskDistance3" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false" v-if="mainDeskForm.mainDeskNum3>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskDistance4" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false"  v-if="mainDeskForm.mainDeskNum4>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskDistance5" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false"  v-if="mainDeskForm.mainDeskNum5>0"/>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="数量">
                  <el-input-number v-model="mainDeskForm.mainDeskNum1" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :controls="false" v-if="mainDeskForm.mainDeskNum1>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskNum2" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :max="3" :controls="false" v-if="mainDeskForm.mainDeskNum2>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskNum3" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :max="3" :controls="false" v-if="mainDeskForm.mainDeskNum3>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskNum4" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :max="3" :controls="false" v-if="mainDeskForm.mainDeskNum4>0"/>
                  <el-input-number v-model="mainDeskForm.mainDeskNum5" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :max="3" :controls="false" v-if="mainDeskForm.mainDeskNum5>0"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="display: flex;justify-content: space-between">
            <div style="font-size: 20px;font-weight: bolder;margin-bottom: 10px">副桌</div>
          </div>
          <el-form :model="viceDeskForm">
            <el-form-item label="左墙距离：">
              <el-input v-model="viceDeskForm.leftWallDistance" placeholder="请输入左墙距离">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
            <el-form-item label="右墙距离：">
              <el-input v-model="viceDeskForm.rightWallDistance" placeholder="请输入右墙距离">
                <template #append>（米）</template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-form :model="viceDeskForm" :label-position="'top'">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-input v-model="viceDeskForm.viceDeskType1" disabled style="margin-bottom: 10px"/>
<!--                  <el-input v-model="viceDeskForm.viceDeskType2" disabled style="margin-bottom: 10px"/>-->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="间距（米）">
                  <el-input-number v-model="viceDeskForm.viceDeskDistance1" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false"/>
<!--                  <el-input-number v-model="viceDeskForm.viceDeskDistance2" placeholder="请输入间距" style="margin-bottom: 10px" :min="0" :controls="false"/>-->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量">
                  <el-input-number v-model="viceDeskForm.viceDeskNum1" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :max="maxViceDesk" :controls="false"/>
<!--                  <el-input-number v-model="viceDeskForm.viceDeskNum2" placeholder="请输入数量" style="margin-bottom: 10px" :min="0" :controls="false"/>-->
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <el-button type="primary" style="margin-bottom: 20px" @click="initCanvas">一键生成</el-button>
        </div>
        <!-- </el-scrollbar> -->
      </el-aside>

      <el-divider style="margin: 10px 0;width: 1px;height: auto;background-color: darkgrey"></el-divider>

      <el-main class="el-main">
        <div style="width: 100%;height: 70px;display: flex;justify-content: space-around;align-items: center">
          <div class="menu-list">
<!--            <div-->
<!--                v-for="item in moduleList"-->
<!--                :key="item.id"-->
<!--                draggable="true"-->
<!--                @dragend="handleDragEnd($event, item)"-->
<!--                :data-type="item.type"-->
<!--            >-->
<!--              <img src="../assets/canzhuo.jpg" style="width: 54px;height:54px"/>-->
<!--              <div style="margin-left: 18px;margin-top: -38px;">{{item.name}}</div>-->
<!--            </div>-->
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image1"
            >
              <!--                v-if="mainDeskForm.mainDeskNum5>0&&mainDeskForm.mainDeskNum5<3"-->

              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">9</div>
            </div>
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image2"
            >
              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">7.2</div>
            </div>
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image3"
            >
              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">5.4</div>
            </div>
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image4"
            >
              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">3.6</div>
            </div>
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image5"
            >
              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">2.5</div>
            </div>
            <div
                draggable="true"
                @dragend="handleDragEnd($event)"
                data-type="image6"
            >
              <!--                v-if="viceDeskForm.viceDeskNum1>0&&viceDeskForm.viceDeskNum1<220"-->

              <img src="@/assets/canzhuo.jpg" style="width: 54px;height:54px"/>
              <div style="margin-left: 18px;margin-top: -38px;">1.8</div>
            </div>
          </div>
          <div

          ></div>
          <el-button @click="toJpg">导出图片</el-button>
        </div>
        <div class="bg-main" ref="flowWrap" id="flowWrap">
          <img src="@/assets/bg.png" class="background-img"/>
          <div :style="'width:'+currentRoom.length*currentRoom.proportion+'px;height: '+currentRoom.width*currentRoom.proportion+'px;margin-left: 199px;position: absolute;'"
               ref="container" @dragover="dragoverDiv" v-if="['万金A', '万金AB', '万金ABC'].includes(currentRoom.roomName)"></div>
          <div :style="'width:'+currentRoom.length*currentRoom.proportion+'px;height: '+currentRoom.width*currentRoom.proportion+'px;margin-left: 581px;position: absolute;'"
               ref="container" @dragover="dragoverDiv" v-if="['万金B','万金BC'].includes(currentRoom.roomName)"></div>
          <div :style="'width:'+currentRoom.length*currentRoom.proportion+'px;height: '+currentRoom.width*currentRoom.proportion+'px;margin-left: 829px;position: absolute;'"
               ref="container" @dragover="dragoverDiv" v-if="currentRoom.roomName==='万金C'"></div>
          <div :style="'width:'+currentRoom.length*currentRoom.proportion+'px;height: '+currentRoom.width*currentRoom.proportion+'px;margin-left: 510px;margin-top: 78px;position: absolute;'"
               ref="container" @dragover="dragoverDiv" v-if="['XX'].includes(currentRoom.roomName)"></div>
        </div>
      </el-main>

    </el-container>
  </el-container>
  <el-dialog v-model="dialogFormVisible" title="添加" width="300">
    <el-form :model="addMainDeskForm" label-position="right" label-width="auto">
      <el-form-item label="类型">
        <el-select v-model="addMainDeskForm.type" style="width: 150px" placeholder="请选择类型">
          <el-option label="9m" value="9m" />
          <el-option label="7.2m" value="7.2m" />
          <el-option label="5.4m" value="5.4m" />
          <el-option label="3.6m" value="3.6m" />
          <el-option label="2.5m" value="2.5m" />
        </el-select>
      </el-form-item>
      <el-form-item label="间距（米）" placeholder="请输入间距">
        <el-input v-model="addMainDeskForm.distance" style="width: 150px"/>
      </el-form-item>
      <el-form-item label="数量" placeholder="请输入数量">
        <el-input-number v-model="addMainDeskForm.num" :min="0"  :controls="false"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelMainDesk">取消</el-button>
        <el-button type="primary" @click="addMainDesk">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";
import global_msg from '../utils/global';
import ProgressNode from './components/ProgressNode.vue'
import { Graph} from '@antv/x6'
import {Dnd} from "@antv/x6-plugin-dnd";
import { Export } from '@antv/x6-plugin-export'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Selection } from '@antv/x6-plugin-selection'
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { History } from '@antv/x6-plugin-history'
import { register } from '@antv/x6-vue-shape'
import html2canvas from "html2canvas";

register({
    shape:'custom-node',
    inherit: 'rect', // 继承于 rect 节点
    width: 300,
    height: 40,
    markup: [
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
    },
  })

export default {
  components: {},
  data() {
    return {

      dialogFormVisible: false,
      roomForm: {
        deskCount:false,
        rectangleCount:false,
        theaterCount:false,
        uCount:false,
        hollowCount:false,
        dinnerCount:false
      },
      graph:null,//画布
      dnd:null,
      imgflag:true,
      wjimg:require('@/assets/wanjin_bg.jpg'),
      wlimg:require('@/assets/wanglan_bg.png'),
      activityForm:{
        name:"",
        place:"",
        peopleNum:0,
        face:"北",
        length:10,
        width:3,
        wallDistance:1,
        deskDistance:1,
        mainDeskType:"",
        mainDeskDistance:0,
        mainDeskNum:0,
        viceTableType:"",
        viceTableDistance:0,
        viceTableNum:0,
        regularTableDistance:0,
        regularTableNum:0
      },
      mainDeskForm:{
        mainDeskType1:"2.5m",
        mainDeskDistance1: 2,
        mainDeskNum1: 1,
        mainDeskType2:"3.6m",
        mainDeskDistance2: 2.5,
        mainDeskNum2: 0,
        mainDeskType3:"5.4m",
        mainDeskDistance3: 2.5,
        mainDeskNum3: 0,
        mainDeskType4:"7.2m",
        mainDeskDistance4: 2.5,
        mainDeskNum4: 0,
        mainDeskType5:"9m",
        mainDeskDistance5: 2.5,
        mainDeskNum5: 0,
      },
      viceDeskForm:{
        viceDeskType1:"1.83m",
        viceDeskDistance1: 1.5,
        viceDeskNum1: 0,
        viceDeskType2:"2.5m",
        viceDeskDistance2: 1.5,
        viceDeskNum2: 0,
        leftWallDistance:2,
        rightWallDistance:2
      },
      addMainDeskForm:{
        type:"9m",
        distance:2.5,
        num:1
      },
      roomList: [ {
        "id": 57,
        "roomName": "XX",
        "length": 13.8,
        "width": 20,
        "proportion": 25,
        "state": 0,
      }],
      meetingContent: "",
      meetingTime: "",
      meetingPlace: "",
      roomName: "",
      currentStatus: 0,
      currentRoom: {
        "id": 57,
        "roomName": "XX",
        "length": 13.8,
        "width": 20,
        "proportion": 25,
        "state": 0,
      },
      deskImg: require('@/assets/img_desk.jpg'),
      theaterImg: require('@/assets/img_theater.jpg'),
      hollowImg: require('@/assets/img_hollow.jpg'),
      wanyanImg: require('@/assets/canzhuo.gif'),
      rectangleImg: require('@/assets/img_rectangle.jpg'),
      uImg: require('@/assets/img_u.jpg'),
      checked1: false,
      canRedo: false,
      canUndo: false
    }
  },
  created() {
    // this.getOwnerId()
  },
  mounted() {
  },
  computed:{
    //舞台X
    stageX:function (){
      if (this.activityForm.face==='东'){
        return (this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width))*this.currentRoom.proportion
      }
      if (this.activityForm.face==='南'){
        return (this.currentRoom.length-parseFloat(this.activityForm.length))/2*this.currentRoom.proportion
      }
      if (this.activityForm.face==='西'){
        return parseFloat(this.activityForm.wallDistance)*this.currentRoom.proportion
      }
      if (this.activityForm.face==='北'){
        return (this.currentRoom.length-parseFloat(this.activityForm.length))/2*this.currentRoom.proportion
      }
      return 0
    },
    //舞台Y
    stageY:function (){
      if (this.activityForm.face==='东'){
        return (this.currentRoom.width-this.activityForm.length)/2*this.currentRoom.proportion
      }
      if (this.activityForm.face==='南'){
        return (this.currentRoom.width-this.activityForm.wallDistance-this.activityForm.width)*this.currentRoom.proportion
      }
      if (this.activityForm.face==='西'){
        return (this.currentRoom.width-this.activityForm.length)/2*this.currentRoom.proportion
      }
      if (this.activityForm.face==='北'){
        return this.activityForm.wallDistance*this.currentRoom.proportion
      }
      return 0
    },
    //舞台width
    stageWidth:function (){
      if (this.activityForm.face==='东'){
        return this.activityForm.width*this.currentRoom.proportion
      }
      if (this.activityForm.face==='南'){
        return this.activityForm.length*this.currentRoom.proportion
      }
      if (this.activityForm.face==='西'){
        return this.activityForm.width*this.currentRoom.proportion
      }
      if (this.activityForm.face==='北'){
        return this.activityForm.length*this.currentRoom.proportion
      }
      return 0
    },
    //舞台height
    stageHeight:function (){
      if (this.activityForm.face==='东'){
        return this.activityForm.length*this.currentRoom.proportion
      }
      if (this.activityForm.face==='南'){
        return this.activityForm.width*this.currentRoom.proportion
      }
      if (this.activityForm.face==='西'){
        return this.activityForm.length*this.currentRoom.proportion
      }
      if (this.activityForm.face==='北'){
        return this.activityForm.width*this.currentRoom.proportion
      }
      return 0
    },
    //主桌到副桌的距离
    mainDeskTopWidth:function (){
      if (parseFloat(this.mainDeskForm.mainDeskNum5)>0){
        return (9+this.mainDeskForm.mainDeskDistance5)*this.currentRoom.proportion
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum4)>0){
        return (7.2+this.mainDeskForm.mainDeskDistance4)*this.currentRoom.proportion
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum3)>0){
        return (5.4+this.mainDeskForm.mainDeskDistance3)*this.currentRoom.proportion
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum2)>0){
        return (3.6+this.mainDeskForm.mainDeskDistance2)*this.currentRoom.proportion
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum1)>0){
        return (2.5+this.mainDeskForm.mainDeskDistance1)*this.currentRoom.proportion
      }
      return 0
    },
    //左右墙距离
    leftRightSum:function (){
      return parseFloat(this.viceDeskForm.leftWallDistance)+parseFloat(this.viceDeskForm.rightWallDistance)
    },
    //主桌宽度
    mainDeskWidth:function (){
      if (parseFloat(this.mainDeskForm.mainDeskNum5)>0){
        return 9
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum4)>0){
        return 7.2
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum3)>0){
        return 5.4
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum2)>0){
        return 3.6
      }
      if (parseFloat(this.mainDeskForm.mainDeskNum1)>0){
        return 2.5
      }
      return 0
    },
    //1.8m一行最多
    lineMaxDesk:function (){
      if (this.activityForm.face==='南'||this.activityForm.face==='北'){
        return Math.ceil((this.currentRoom.length-this.leftRightSum -this.viceDeskForm.viceDeskDistance1)/(1.83+this.viceDeskForm.viceDeskDistance1))
      }else{
        return Math.ceil((this.currentRoom.width-this.leftRightSum -this.viceDeskForm.viceDeskDistance1)/(1.83+this.viceDeskForm.viceDeskDistance1))
      }
    },
    maxCreateViceDesk:function (){
      if(this.activityForm.face==='南'||this.activityForm.face=="北"){
        const maxRow=Math.floor((this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance)
            -parseFloat(this.activityForm.width)-this.mainDeskTopWidth/this.currentRoom.proportion-2)/(1.83+this.viceDeskForm.viceDeskDistance1))
        return this.lineMaxDesk*maxRow
      }else {
        const maxRow=Math.floor((this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance)
            -parseFloat(this.activityForm.width)-this.mainDeskTopWidth/this.currentRoom.proportion-2)/(1.83+this.viceDeskForm.viceDeskDistance1))
        return this.lineMaxDesk*maxRow
      }

    },
    maxViceDesk:function (){
      if(this.activityForm.face==='南'||this.activityForm.face=="北") {
        const maxRow=Math.floor((this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance)
            -parseFloat(this.activityForm.width)-2)/(1.83+this.viceDeskForm.viceDeskDistance1))
        return this.lineMaxDesk*maxRow
      }else{
        const maxRow=Math.floor((this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance)
            -parseFloat(this.activityForm.width)-2)/(1.83+this.viceDeskForm.viceDeskDistance1))
        return this.lineMaxDesk*maxRow
      }

    },
    peopleNumToViceDesk:function(){
      if (this.activityForm.peopleNum-this.mainDeskForm.mainDeskNum1*12>this.maxCreateViceDesk*10){
        return this.maxCreateViceDesk*10
      }else{
        return ((this.activityForm.peopleNum-this.mainDeskForm.mainDeskNum1*12)/10).toFixed(0)
      }
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        document.getElementById("asideContent").style.display = "none";
      } else {
        document.getElementById("asideContent").style.display = "flex";
      }
    },
    handleChange() {
      // this.imgflag = false;
      // this.activityForm.length="0";
      // this.activityForm.width="0";
      // this.activityForm.wallDistance="0";
      // this.activityForm.deskDistance = "1.5"
    },
    handleNumChange(){
      if (!this.activityForm.place){
        this.activityForm.peopleNum=0
        return ElMessage.error('请先选择场地！')
      }
      console.log(this.activityForm.peopleNum)
      console.log(this.mainDeskForm.mainDeskNum1)
      console.log(this.maxCreateViceDesk)
      if(parseFloat(this.activityForm.peopleNum)-this.mainDeskForm.mainDeskNum1*12>this.maxCreateViceDesk*10){
        this.activityForm.peopleNum=0
        return ElMessage.error('一键生成最多人数：'+(this.maxCreateViceDesk*10+this.mainDeskForm.mainDeskNum1*12))
      }
      if (this.activityForm.peopleNum-this.mainDeskForm.mainDeskNum1*12>this.maxCreateViceDesk*10){
        this.activityForm.peopleNum=this.peopleNumToViceDesk+this.mainDeskForm.mainDeskNum1*12
      }
      this.viceDeskForm.viceDeskNum1=this.peopleNumToViceDesk
    },
    handleClick(type) {
      this.initDefault()
      switch (type) {
        case 1:
          this.isDesk = true
          break
        case 2:
          this.isTheater = true
          break
        case 3:
          this.isRectangle = true
          break
        case 4:
          this.isU = true
          break
        case 5:
          this.isHollow = true
          break
        case 6:
          this.isDinner = true
          break
      }
      this.currentStatus = this.isDesk || this.isTheater || this.isHollow || this.isRectangle || this.isU || this.isDinner ? 2 : 1
    },
    initDefault() {
      this.isDesk = false
      this.isTheater = false
      this.isHollow = false
      this.isRectangle = false
      this.isU = false
      this.isDinner = false
    },
    initCanvas() {
      if (!this.activityForm.name){
       return ElMessage.error('请先输入活动名称！')
      }
      if (!this.activityForm.place){
        console.log(this.activityForm.place)
        return ElMessage.error('请先选择场地！')
      }
      if(this.viceDeskForm.viceDeskNum1>this.maxCreateViceDesk){
        return ElMessage.error('一键生成最多数量：'+this.maxCreateViceDesk)
      }
      this.graph = new Graph({
        container: this.$refs.container,
        background: {
          color: '#fff',
        },
        // interacting: function (cellView) {
        //   if (cellView.cell.getData() != undefined && !cellView.cell.getData().disableMove) {
        //     return { nodeMovable: false }
        //   }
        //   return true
        // },
        width:this.currentRoom.length*this.currentRoom.proportion,
        height:this.currentRoom.width*this.currentRoom.proportion,
        virtual:true
        // grid: {
        //   visible: true,
        //   type: 'mesh',
        //   size:18
        // }
      })
      this.addCanvasBasic()

      let that=this
      this.dnd = new Dnd({
        target: this.graph,
        scaled: false,
        validateNode(node,options){
          if (node.label==="9"){
            that.mainDeskForm.mainDeskNum5++
          }else if(node.label==="7.2"){
            that.mainDeskForm.mainDeskNum4++
          }else if(node.label==="5.4"){
            that.mainDeskForm.mainDeskNum3++
          }else if(node.label==="3.6"){
            that.mainDeskForm.mainDeskNum2++
          }else if(node.label==="2.5"){
            that.mainDeskForm.mainDeskNum1++
          }else{
            that.viceDeskForm.viceDeskNum1++
          }
          return true
        },
        // dndContainer: container
      })
      this.graph.use(new Export())
      this.graph.use(
        new Snapline({
          enabled: true,
          clean: 2,
      }))
      this.graph.setSnaplineTolerance(1)
      this.graph.use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      }))
      this.graph.use(
          new Keyboard({
            enabled: true,
            global: true,
          }),
      )
      this.graph.use(
          new Selection({
            enabled: true,
          }),
      )
      this.graph.use(
          new History({
            enabled: true,
          })
      )
      this.graph.on('history:change', () => {
        this.canRedo = this.graph.canRedo(),
        this.canUndo = this.graph.canUndo()
      })
      this.graph.bindKey(['Backspace','Delete'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.removeCells(cells)
          if (cells[0].label==="9"){
            this.mainDeskForm.mainDeskNum5--
          }else if(cells[0].label==="7.2"){
            this.mainDeskForm.mainDeskNum4--
          }else if(cells[0].label==="5.4"){
            this.mainDeskForm.mainDeskNum3--
          }else if(cells[0].label==="3.6"){
            this.mainDeskForm.mainDeskNum2--
          }else if(cells[0].label==="2.5"){
            this.mainDeskForm.mainDeskNum1--
          }else{
            this.viceDeskForm.viceDeskNum1--
          }

        }
        return false
      },'keyup')

      // this.graph.bindKey('w', () => {
      //   const cells = this.graph.getSelectedCells()
      //   console.log(cells[0].store.data.position.x-1)
      //   // cells.store.data.position.x-1
      // },'keyup')
     },
    addCanvasBasic(){
      //9m主桌
      const nodes5 = []
      for (let i = 0; i < this.mainDeskForm.mainDeskNum5; i++) {
        let mDeskX=0
        let mDeskY=0
        if (this.activityForm.face==="东"){
          if (this.mainDeskForm.mainDeskDistance5*(i+1)+9*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance5-
                this.mainDeskForm.mainDeskNum5*(9+this.mainDeskForm.mainDeskDistance5))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance5+9)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance5*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="南"){
          if (this.mainDeskForm.mainDeskDistance5*(i+1)+9*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum-this.mainDeskForm.mainDeskDistance5-
                    this.mainDeskForm.mainDeskNum5*(9+this.mainDeskForm.mainDeskDistance5))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance5+9)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance5*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="西"){
          if (this.mainDeskForm.mainDeskDistance5*(i+1)+9*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance5-
                    this.mainDeskForm.mainDeskNum5*(9+this.mainDeskForm.mainDeskDistance5))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance5+9)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance5*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="北"){
          if (this.mainDeskForm.mainDeskDistance5*(i+1)+9*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum-this.mainDeskForm.mainDeskDistance5-
                    this.mainDeskForm.mainDeskNum5*(9+this.mainDeskForm.mainDeskDistance5))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance5+9)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance5*this.currentRoom.proportion
            mDeskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
          }
        }

        nodes5.push({ x: mDeskX, y: mDeskY,
          width: 9*this.currentRoom.proportion, height: 9*this.currentRoom.proportion, label: '9' }); // 将当前索引值添加到数组arr中
      }
      nodes5.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
          label: node.label
        })
      })

      //7.2m主桌
      const nodes4 = []
      for (let i = 0; i < this.mainDeskForm.mainDeskNum4; i++) {
        let mDeskX=0
        let mDeskY=0
        if (this.activityForm.face==="东"){
          if (this.mainDeskForm.mainDeskDistance4*(i+1)*7.2*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance4-
                    this.mainDeskForm.mainDeskNum4*(7.2+this.mainDeskForm.mainDeskDistance4))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance4+7.2)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance4*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==='南'){
          if (this.mainDeskForm.mainDeskDistance4*(i+1)+7.2*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance4-this.mainDeskForm.mainDeskNum4*(7.2+this.mainDeskForm.mainDeskDistance4))/2*this.currentRoom.proportion+
                (parseFloat(this.mainDeskForm.mainDeskDistance4)+7.2)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance4*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="西"){
          if (this.mainDeskForm.mainDeskDistance4*(i+1)+7.2*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance4-
                    this.mainDeskForm.mainDeskNum4*(7.2+this.mainDeskForm.mainDeskDistance4))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance4+7.2)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance4*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==='北'){
          if (this.mainDeskForm.mainDeskDistance4*(i+1)+7.2*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance4-this.mainDeskForm.mainDeskNum4*(7.2+this.mainDeskForm.mainDeskDistance4))/2*this.currentRoom.proportion+
                (parseFloat(this.mainDeskForm.mainDeskDistance4)+7.2)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance4*this.currentRoom.proportion
            mDeskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
          }
        }

        nodes4.push({ x: mDeskX, y: mDeskY,
          width: 7.2*this.currentRoom.proportion, height: 7.2*this.currentRoom.proportion, label: '5.4' }); // 将当前索引值添加到数组arr中
      }
      nodes4.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
          label: node.label,
        })
      })
      //5.4m主桌
      const nodes3 = []
      for (let i = 0; i < this.mainDeskForm.mainDeskNum3; i++) {
        let mDeskX=0
        let mDeskY=0
        if (this.activityForm.face==="东"){
          if (this.mainDeskForm.mainDeskDistance3*(i+1)+5.4*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance3-
                    this.mainDeskForm.mainDeskNum3*(5.4+this.mainDeskForm.mainDeskDistance3))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance3+5.4)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance3*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==='南'){
          if (this.mainDeskForm.mainDeskDistance3*(i+1)+5.4*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance3-this.mainDeskForm.mainDeskNum3*(5.4+this.mainDeskForm.mainDeskDistance3))/2*this.currentRoom.proportion+
                (parseFloat(this.mainDeskForm.mainDeskDistance3)+5.4)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance3*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="西"){
          if (this.mainDeskForm.mainDeskDistance3*(i+1)+5.4*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance3-
                    this.mainDeskForm.mainDeskNum3*(5.4+this.mainDeskForm.mainDeskDistance3))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance3+5.4)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance3*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==='北'){
          if (this.mainDeskForm.mainDeskDistance3*(i+1)+5.4*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance3-this.mainDeskForm.mainDeskNum3*(5.4+this.mainDeskForm.mainDeskDistance3))/2*this.currentRoom.proportion+
                (parseFloat(this.mainDeskForm.mainDeskDistance3)+5.4)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance3*this.currentRoom.proportion
            mDeskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
          }
        }

        nodes3.push({ x: mDeskX, y: mDeskY,
          width: 5.4*this.currentRoom.proportion, height: 5.4*this.currentRoom.proportion, label: '5.4' }); // 将当前索引值添加到数组arr中
      }
      nodes3.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
          label: node.label,
        })
      })
      //3.6m主桌
      const nodes2 = []
      for (let i = 0; i < this.mainDeskForm.mainDeskNum2; i++) {
        let mDeskX=0
        let mDeskY=0
        if (this.activityForm.face==="东"){
          if (this.mainDeskForm.mainDeskDistance2*(i+1)+3.6*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance2-
                    this.mainDeskForm.mainDeskNum2*(3.6+this.mainDeskForm.mainDeskDistance2))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance2+3.6)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance2*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==='南'){
          if (this.mainDeskForm.mainDeskDistance2*(i+1)+3.6*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance2-this.mainDeskForm.mainDeskNum2*(3.6+this.mainDeskForm.mainDeskDistance2))/2*this.currentRoom.proportion
                +(parseFloat(this.mainDeskForm.mainDeskDistance2)+3.6)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance2*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="西"){
          if (this.mainDeskForm.mainDeskDistance2*(i+1)+3.6*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance2-
                    this.mainDeskForm.mainDeskNum2*(3.6+this.mainDeskForm.mainDeskDistance2))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance2+3.6)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance2*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==='北'){
          if (this.mainDeskForm.mainDeskDistance2*(i+1)+3.6*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance2-this.mainDeskForm.mainDeskNum2*(3.6+this.mainDeskForm.mainDeskDistance2))/2*this.currentRoom.proportion
                +(parseFloat(this.mainDeskForm.mainDeskDistance2)+3.6)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance2*this.currentRoom.proportion
            mDeskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
          }
        }

        nodes2.push({ x: mDeskX, y: mDeskY,
          width: 3.6*this.currentRoom.proportion, height: 3.6*this.currentRoom.proportion, label: '3.6' }); // 将当前索引值添加到数组arr中
      }
      nodes2.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
          label: node.label,
        })
      })

      //2.5m主桌
      const nodes1 = []
      for (let i = 0; i < this.mainDeskForm.mainDeskNum1; i++) {
        let mDeskX=0
        let mDeskY=0
        if (this.activityForm.face==="东"){
          if (this.mainDeskForm.mainDeskDistance1*(i+1)+2.5*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance1-
                    this.mainDeskForm.mainDeskNum1*(2.5+this.mainDeskForm.mainDeskDistance1))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance1+2.5)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance1*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==='南'){
          if (this.mainDeskForm.mainDeskDistance1*(i+1)+2.5*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance1-this.mainDeskForm.mainDeskNum1*(2.5+this.mainDeskForm.mainDeskDistance1))/2*this.currentRoom.proportion
                +(parseFloat(this.mainDeskForm.mainDeskDistance1)+2.5)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance1*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion
          }
        }
        else if (this.activityForm.face==="西"){
          if (this.mainDeskForm.mainDeskDistance1*(i+1)+2.5*i+this.leftRightSum <this.currentRoom.width){
            mDeskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            mDeskY=(this.currentRoom.width-this.leftRightSum-this.mainDeskForm.mainDeskDistance1-
                    this.mainDeskForm.mainDeskNum1*(2.5+this.mainDeskForm.mainDeskDistance1))/2*this.currentRoom.proportion
                +(this.mainDeskForm.mainDeskDistance1+2.5)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance1*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==='北'){
          if (this.mainDeskForm.mainDeskDistance1*(i+1)+2.5*i+this.leftRightSum <this.currentRoom.length){
            mDeskX=(this.currentRoom.length-this.leftRightSum
                    -this.mainDeskForm.mainDeskDistance1-this.mainDeskForm.mainDeskNum1*(2.5+this.mainDeskForm.mainDeskDistance1))/2*this.currentRoom.proportion
                +(parseFloat(this.mainDeskForm.mainDeskDistance1)+2.5)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion+this.mainDeskForm.mainDeskDistance1*this.currentRoom.proportion
            mDeskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
          }
        }

        nodes1.push({ x: mDeskX, y: mDeskY,
          width: 2.5*this.currentRoom.proportion, height: 2.5*this.currentRoom.proportion, label: '2.5' }); // 将当前索引值添加到数组arr中
      }
      nodes1.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
          label: node.label,
        })
      })

      // console.log(this.viceDeskForm.viceDeskNum1,this.maxCreateViceDesk)
      //1.8m 北
      const nodes6 = []
      for (let i = 0; i < this.viceDeskForm.viceDeskNum1; i++) {
        let deskX=0
        let deskY=0
        if (this.activityForm.face==="东"){
          if (this.viceDeskForm.viceDeskDistance1*i+1.83*i <this.currentRoom.width-this.viceDeskForm.viceDeskDistance1-this.leftRightSum){
            deskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-1.83)*this.currentRoom.proportion-this.mainDeskTopWidth
            deskY=(this.viceDeskForm.viceDeskDistance1+1.83)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion
          }else {
            deskX=(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-1.83)*this.currentRoom.proportion-this.mainDeskTopWidth-(this.viceDeskForm.viceDeskDistance1+1.83)*Math.floor(i/this.lineMaxDesk)*this.currentRoom.proportion
            deskY=(this.viceDeskForm.viceDeskDistance1+1.83)*(i%this.lineMaxDesk)*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==="南"){
          if (this.viceDeskForm.viceDeskDistance1*i+1.83*i <this.currentRoom.length-this.viceDeskForm.viceDeskDistance1-this.leftRightSum){
            deskX=(this.currentRoom.length-(this.viceDeskForm.viceDeskDistance1+1.83)*i-parseFloat(this.viceDeskForm.leftWallDistance)-1.83)*this.currentRoom.proportion
            deskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                -parseFloat(this.activityForm.deskDistance)-1.83)*this.currentRoom.proportion-this.mainDeskTopWidth
          }else {
            deskX=this.currentRoom.length*this.currentRoom.proportion-(this.viceDeskForm.viceDeskDistance1+1.83)*(i%this.lineMaxDesk)*this.currentRoom.proportion
                -parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion-1.83*this.currentRoom.proportion
            deskY=(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)
                    -parseFloat(this.activityForm.deskDistance)-1.83)*this.currentRoom.proportion-this.mainDeskTopWidth-
                (this.viceDeskForm.viceDeskDistance1+1.83)*Math.floor(i/this.lineMaxDesk)*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==="西"){
          if (this.viceDeskForm.viceDeskDistance1*i+1.83*i <this.currentRoom.width-this.viceDeskForm.viceDeskDistance1-this.leftRightSum){
            deskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+
                parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion+this.mainDeskTopWidth
            deskY=(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83)*this.currentRoom.proportion
                -(this.viceDeskForm.viceDeskDistance1+1.83)*i*this.currentRoom.proportion
          }else {
            deskX=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+
                parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion+this.mainDeskTopWidth+(this.viceDeskForm.viceDeskDistance1+1.83)*Math.floor(i/this.lineMaxDesk)*this.currentRoom.proportion
            deskY=(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83)*this.currentRoom.proportion
                -(this.viceDeskForm.viceDeskDistance1+1.83)*(i%this.lineMaxDesk)*this.currentRoom.proportion
          }
        }
        else if(this.activityForm.face==="北"){
          if (this.viceDeskForm.viceDeskDistance1*i+1.83*i <this.currentRoom.length-this.viceDeskForm.viceDeskDistance1-this.leftRightSum){
            deskX=(this.viceDeskForm.viceDeskDistance1+1.83)*i*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion
            deskY=(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion+this.mainDeskTopWidth
          }else {
            deskX=(this.viceDeskForm.viceDeskDistance1+1.83)*(i%this.lineMaxDesk)*this.currentRoom.proportion+parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion
            deskY=(this.viceDeskForm.viceDeskDistance1+1.83)*Math.floor(i/this.lineMaxDesk)*this.currentRoom.proportion
                +(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion+this.mainDeskTopWidth
          }
        }

        nodes6.push({ x: deskX, y: deskY,
          width: 1.83*this.currentRoom.proportion, height: 1.83*this.currentRoom.proportion, label: '1.83' }); // 将当前索引值添加到数组arr中
        // console.log(nodes6,this.viceDeskForm.viceDeskNum1)
      }

      nodes6.forEach(node => {
        this.graph.addNode({
          shape: 'image',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          imageUrl: require('@/assets/canzhuo.jpg'),
        })
      })

      this.graph.addNode({
        x: this.stageX,
        y: this.stageY,
        width: this.stageWidth,
        height: this.stageHeight,
        label:this.activityForm.width==0&&this.activityForm.length==0 ? "" :`舞台 ${this.activityForm.length}*${this.activityForm.width}米`
        // data: {
        //   disableMove: false,//true为可拖拽，false不可拖拽
        // },
      })
      this.graph.addNode({
        shape:'custom-node',
        x: 0,
        y: (this.currentRoom.width-4)*this.currentRoom.proportion,
        label: `活动：`+this.activityForm.name+` 场地：`+this.roomList.find(item=>item.id==this.activityForm.place ).roomName+` 人数：`+this.activityForm.peopleNum,
        // data: {
        //   disableMove: false,//true为可拖拽，false不可拖拽
        // },
      })
      this.graph.addNode({
        x: 0,
        y: 0,
      })
      this.graph.addNode({
        x: this.currentRoom.length*this.currentRoom.proportion,
        y: this.currentRoom.width*this.currentRoom.proportion,
      })
      if(this.activityForm.face==='东'){
        //舞台到墙
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.currentRoom.length*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance))*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.wallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台左侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion, 0],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion
              , (this.currentRoom.width-this.activityForm.length)/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.width-this.activityForm.length)/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台右侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion,
              (this.currentRoom.width-(this.currentRoom.width-this.activityForm.length)/2)*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion,
              this.currentRoom.width*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.width-this.activityForm.length)/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台到第一桌
        if (this.activityForm.deskDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-this.activityForm.wallDistance-this.activityForm.width)*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            target: [(this.currentRoom.length-this.activityForm.wallDistance-this.activityForm.width-this.activityForm.deskDistance)*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.deskDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //主桌到副桌
        if (this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-this.activityForm.wallDistance-this.activityForm.width-this.activityForm.deskDistance-this.mainDeskWidth)*this.currentRoom.proportion,
              this.currentRoom.width/2*this.currentRoom.proportion],
            target: [(this.currentRoom.length-this.activityForm.wallDistance-this.activityForm.width-this.activityForm.deskDistance
                -this.mainDeskWidth-(this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth))*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${(this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //左墙
        if (parseFloat(this.viceDeskForm.leftWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
            -1.83/2)*this.currentRoom.proportion-this.mainDeskTopWidth,0 ],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -1.83/2)*this.currentRoom.proportion-this.mainDeskTopWidth,parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.leftWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //右墙
        if(parseFloat(this.viceDeskForm.rightWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion-this.mainDeskTopWidth, (this.currentRoom.width-this.viceDeskForm.rightWallDistance)*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion-this.mainDeskTopWidth,this.currentRoom.width*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.rightWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: -0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }

        if(this.viceDeskForm.viceDeskNum1>0){
          //右边桌距
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -1.83/2)*this.currentRoom.proportion-this.mainDeskTopWidth,(parseFloat(this.viceDeskForm.leftWallDistance)+1.83)*this.currentRoom.proportion ],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -1.83/2)*this.currentRoom.proportion-this.mainDeskTopWidth, (parseFloat(this.viceDeskForm.leftWallDistance)+this.viceDeskForm.viceDeskDistance1+1.83)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
          //下侧副桌间距
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -1.83)*this.currentRoom.proportion-this.mainDeskTopWidth, (parseFloat(this.viceDeskForm.leftWallDistance)+1.83/2)*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.deskDistance)
                -1.83-this.viceDeskForm.viceDeskDistance1)*this.currentRoom.proportion-this.mainDeskTopWidth,(parseFloat(this.viceDeskForm.leftWallDistance)+1.83/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: 18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
      }
      else if(this.activityForm.face==='南'){
        //舞台到墙
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX, (this.currentRoom.width-parseFloat(this.activityForm.wallDistance))*this.currentRoom.proportion],
            target: [this.stageX, this.currentRoom.width*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.wallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台右侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX, (this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-this.activityForm.width/2)*this.currentRoom.proportion],
            target: [0, (this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-this.activityForm.width/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.length-parseFloat(this.activityForm.length))/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台左侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.currentRoom.length*this.currentRoom.proportion-this.stageX,
              (this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-this.activityForm.width/2)*this.currentRoom.proportion],
            target: [this.currentRoom.length*this.currentRoom.proportion,(this.currentRoom.width-parseFloat(this.activityForm.wallDistance)-this.activityForm.width/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.length-parseFloat(this.activityForm.length))/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台到第一桌
        if (this.activityForm.deskDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.currentRoom.length*this.currentRoom.proportion-parseFloat(this.activityForm.length)/2*this.currentRoom.proportion-this.stageX,
              (this.currentRoom.width-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.wallDistance))*this.currentRoom.proportion],
            target: [this.currentRoom.length*this.currentRoom.proportion-parseFloat(this.activityForm.length)/2*this.currentRoom.proportion-this.stageX,
              (this.currentRoom.width-parseFloat(this.activityForm.width)-parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.deskDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //主桌到副桌
        if (this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.currentRoom.length*this.currentRoom.proportion-parseFloat(this.activityForm.length)/2*this.currentRoom.proportion-this.stageX,(this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance)-this.mainDeskWidth)*this.currentRoom.proportion],
            target: [this.currentRoom.length*this.currentRoom.proportion-parseFloat(this.activityForm.length)/2*this.currentRoom.proportion-this.stageX,
              (this.currentRoom.width-parseFloat(this.activityForm.width)-
                  parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${(this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        if (parseFloat(this.viceDeskForm.leftWallDistance)>0){
          //右墙
          this.graph.addEdge({
            shape: 'edge',
            source: [0, (this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            target: [parseFloat(this.viceDeskForm.rightWallDistance)*this.currentRoom.proportion,(this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.rightWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //左墙
        if(parseFloat(this.viceDeskForm.rightWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.currentRoom.length*this.currentRoom.proportion, (this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            target: [(this.currentRoom.length-this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion,(this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.leftWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: 18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        if(this.viceDeskForm.viceDeskNum1>0){
          //右边桌距
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.viceDeskForm.leftWallDistance)-1.83)*this.currentRoom.proportion, (this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.viceDeskForm.leftWallDistance)-1.83-parseFloat(this.viceDeskForm.viceDeskDistance1))*this.currentRoom.proportion,
              (this.currentRoom.width-parseFloat(this.activityForm.width)-
                  parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
          //下侧副桌间距
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.viceDeskForm.leftWallDistance)-1.83/2)*this.currentRoom.proportion,(this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83*this.currentRoom.proportion],
            target: [(this.currentRoom.length-parseFloat(this.viceDeskForm.leftWallDistance)-1.83/2)*this.currentRoom.proportion,(this.currentRoom.width-parseFloat(this.activityForm.width)-
                parseFloat(this.activityForm.wallDistance)-parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion-this.mainDeskTopWidth-1.83*this.currentRoom.proportion-parseFloat(this.viceDeskForm.viceDeskDistance1)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
      }
      else if(this.activityForm.face==='西'){
        //舞台到墙
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [0, this.currentRoom.width/2*this.currentRoom.proportion],
            target: [parseFloat(this.activityForm.wallDistance)*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.wallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台右侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion, 0],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion
              , (this.currentRoom.width-this.activityForm.length)/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.width-this.activityForm.length)/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台左侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion,
              ((this.currentRoom.width-parseFloat(this.activityForm.length))/2+parseFloat(this.activityForm.length))*this.currentRoom.proportion],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)/2)*this.currentRoom.proportion,
              this.currentRoom.width*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${(this.currentRoom.width-this.activityForm.length)/2}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台到第一桌
        if (this.activityForm.deskDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width))*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
              ,this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.deskDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //主桌到副桌
        if (this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)
                +this.mainDeskWidth)*this.currentRoom.proportion, this.currentRoom.width/2*this.currentRoom.proportion],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion
            +this.mainDeskTopWidth, this.currentRoom.width/2*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${(this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //左墙
        if (parseFloat(this.viceDeskForm.leftWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth,this.currentRoom.width*this.currentRoom.proportion ],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth,(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance))*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.leftWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //右墙
        if(parseFloat(this.viceDeskForm.rightWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth,0],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth,this.viceDeskForm.rightWallDistance*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.rightWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: -0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }

        if(this.viceDeskForm.viceDeskNum1>0){
          //右边桌距
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth,(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83)*this.currentRoom.proportion ],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83/2)*this.currentRoom.proportion
            +this.mainDeskTopWidth, (this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83-this.viceDeskForm.viceDeskDistance1)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
          //下侧副桌间距
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83)*this.currentRoom.proportion
            +this.mainDeskTopWidth,(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83/2)*this.currentRoom.proportion],
            target: [(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+1.83
                +this.viceDeskForm.viceDeskDistance1)*this.currentRoom.proportion+this.mainDeskTopWidth,(this.currentRoom.width-parseFloat(this.viceDeskForm.leftWallDistance)-1.83/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: 18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
      }
      else if (this.activityForm.face==='北'){
        //舞台到墙
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX, 0],
            target: [this.stageX, this.stageY],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.wallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台左侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX, (parseFloat(this.activityForm.wallDistance)+this.activityForm.width/2)*this.currentRoom.proportion],
            target: [0, (parseFloat(this.activityForm.wallDistance)+this.activityForm.width/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.length-parseFloat(this.activityForm.length))/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台右侧
        if (this.activityForm.length!=='0'&&this.activityForm.width!=='0'&&this.activityForm.wallDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [parseFloat(this.activityForm.length)*this.currentRoom.proportion+this.stageX, (parseFloat(this.activityForm.wallDistance)+this.activityForm.width/2)*this.currentRoom.proportion],
            target: [this.currentRoom.length*this.currentRoom.proportion, (parseFloat(this.activityForm.wallDistance)+this.activityForm.width/2)*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${((this.currentRoom.length-parseFloat(this.activityForm.length))/2).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //舞台到第一桌
        if (this.activityForm.deskDistance!=='0'){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX+parseFloat(this.activityForm.length)/2*this.currentRoom.proportion, (parseFloat(this.activityForm.width)+parseFloat(this.activityForm.wallDistance))*this.currentRoom.proportion],
            target: [this.stageX+parseFloat(this.activityForm.length)/2*this.currentRoom.proportion,
              (parseFloat(this.activityForm.width)+parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion],
            labels:[{
              attrs: {
                label: {
                  text: `${this.activityForm.deskDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //主桌到副桌
        if (this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [this.stageX+parseFloat(this.activityForm.length)/2*this.currentRoom.proportion, (parseFloat(this.activityForm.width)+
                parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.deskDistance)+this.mainDeskWidth)*this.currentRoom.proportion],
            target: [this.stageX+parseFloat(this.activityForm.length)/2*this.currentRoom.proportion,
              (parseFloat(this.activityForm.width)+parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.deskDistance))*this.currentRoom.proportion+this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${(this.mainDeskTopWidth/this.currentRoom.proportion-this.mainDeskWidth).toFixed(1)}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        if (parseFloat(this.viceDeskForm.leftWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [0, (parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            target: [parseFloat(this.viceDeskForm.leftWallDistance)*this.currentRoom.proportion,(parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+
                parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.leftWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -this.currentRoom.proportion,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //右墙
        if(parseFloat(this.viceDeskForm.rightWallDistance)>0){
          this.graph.addEdge({
            shape: 'edge',
            source: [(this.currentRoom.length-parseFloat(this.viceDeskForm.rightWallDistance))*this.currentRoom.proportion, (parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+
                parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            target: [this.currentRoom.length*this.currentRoom.proportion,(parseFloat(this.activityForm.wallDistance)
                +parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.rightWallDistance}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
        //下侧副桌间距
        if(this.viceDeskForm.viceDeskNum1>0){
          //右边桌距
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.viceDeskForm.leftWallDistance)+parseFloat(this.viceDeskForm.viceDeskType1))*this.currentRoom.proportion, (parseFloat(this.activityForm.wallDistance)+
                parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            target: [(parseFloat(this.viceDeskForm.leftWallDistance)+parseFloat(this.viceDeskForm.viceDeskType1)+this.viceDeskForm.viceDeskDistance1)*this.currentRoom.proportion,
              (parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+this.viceDeskForm.viceDeskDistance1/2)*this.currentRoom.proportion+this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 0,
                  y: -18,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
          this.graph.addEdge({
            shape: 'edge',
            source: [(parseFloat(this.viceDeskForm.leftWallDistance)+parseFloat(this.viceDeskForm.viceDeskType1)/2)*this.currentRoom.proportion, (parseFloat(this.activityForm.wallDistance)+parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+parseFloat(this.viceDeskForm.viceDeskType1))*this.currentRoom.proportion+this.mainDeskTopWidth],
            target: [(parseFloat(this.viceDeskForm.leftWallDistance)+parseFloat(this.viceDeskForm.viceDeskType1)/2)*this.currentRoom.proportion,(parseFloat(this.activityForm.wallDistance)
                +parseFloat(this.activityForm.width)+parseFloat(this.activityForm.deskDistance)+
                parseFloat(this.viceDeskForm.viceDeskType1)+parseFloat(this.viceDeskForm.viceDeskDistance1))*this.currentRoom.proportion+this.mainDeskTopWidth],
            labels:[{
              attrs: {
                label: {
                  text: `${this.viceDeskForm.viceDeskDistance1}m`,
                  stroke: '#aaa',
                },
              },
              position:{
                distance: 0.5,
                offset: {
                  x: 18,
                  y: 0,
                },
              },
            }],
            attrs: {
              strokeWidth: 1,
              line: {
                targetMarker:null,
                sourceMarker: null,
              },
            },
          })
        }
      }
    },

    handleDragEnd(e) {
      const target = e.currentTarget
      const type = target.getAttribute('data-type')
      let node
      if(type==='image1'){
        node=this.graph.createNode({
          width: 9*this.currentRoom.proportion,
          height: 9*this.currentRoom.proportion,
          shape:'image',
          label: '9',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
      }else if(type==='image2'){
        node=this.graph.createNode({
          width: 7.2*this.currentRoom.proportion,
          height: 7.2*this.currentRoom.proportion,
          shape:'image',
          label: '7.2',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
      }else if(type==='image3'){
        node=this.graph.createNode({
          width: 5.4*this.currentRoom.proportion,
          height: 5.4*this.currentRoom.proportion,
          shape:'image',
          label: '5.4',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
      }else if(type==='image4'){
       node=this.graph.createNode({
          width: 3.6*this.currentRoom.proportion,
          height: 3.6*this.currentRoom.proportion,
          shape:'image',
          label: '3.6',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
      }else if(type==='image5'){
        node=this.graph.createNode({
          width: 2.5*this.currentRoom.proportion,
          height: 2.5*this.currentRoom.proportion,
          shape:'image',
          label: '2.5',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
        this.mainDeskForm.mainDeskNum1++
      }else if(type==='image6'){
        node=this.graph.createNode({
          width: 1.83*this.currentRoom.proportion,
          height: 1.83*this.currentRoom.proportion,
          shape:'image',
          imageUrl: require('@/assets/canzhuo.jpg')
        })
      }
      this.dnd.start(node, e)
      // this.addHandleNode(e.pageX - 240, e.pageY - 40, new Date().getTime(), item.name, item.type)
    },
    // 拖动节点到画布中鼠标样式变为可拖动状态
    dragoverDiv(ev) {
      ev.preventDefault()
    },
    // toJpg () {
    //   if(this.activityForm.name.replace(/\s+/g, '')){
    //     this.graph.exportPNG(this.activityForm.name,{
    //       copyStyles: true,
    //       quality:1
    //     })
    //   }else {
    //     ElMessage.error('请输入活动名称')
    //   }
    // },

    //点击方法
    toJpg() {
      let canvasID = this.$refs.flowWrap;
      let that = this;
      let a = document.createElement("a");
      const image = document.createElement("img");
      if (['望岚厅'].includes(this.currentRoom.roomName)){
        image.style.marginLeft='63px'
        image.style.marginTop='200px'
        image.style.position='absolute'
        this.graph.toPNG(
            dataUri => {
              console.log('dataUri >>>>', dataUri); // 这个就是base的图片地址
              image.src=dataUri
              image.setAttribute("src",dataUri);
              console.log(image)
            },
            {
              quality: 1, // 图片质量 取值范围：0-1，默认0.92
              preserveDimensions:true,
              copyStyles:false
            }
        );
      }else if (['万金A', '万金AB', '万金ABC'].includes(this.currentRoom.roomName)){
        image.style.marginLeft='199px'
        image.style.position='absolute'
        this.graph.toPNG(
            dataUri => {
              console.log('dataUri >>>>', dataUri); // 这个就是base的图片地址
              image.src=dataUri
              image.setAttribute("src",dataUri);
              console.log(image)
            },
            {
              quality: 1, // 图片质量 取值范围：0-1，默认0.92
              preserveDimensions:true,
              copyStyles:false
            }
        );
      }else if (['万金B', '万金BC'].includes(this.currentRoom.roomName)){
        image.style.marginLeft='581px'
        image.style.position='absolute'
        this.graph.toPNG(
            dataUri => {
              console.log('dataUri >>>>', dataUri); // 这个就是base的图片地址
              image.src=dataUri
              image.setAttribute("src",dataUri);
              console.log(image)
            },
            {
              quality: 1, // 图片质量 取值范围：0-1，默认0.92
              preserveDimensions:true,
              copyStyles:false
            }
        );
      }else if (['万金C'].includes(this.currentRoom.roomName)){
        image.style.marginLeft='829px'
        image.style.position='absolute'
        this.graph.toPNG(
            dataUri => {
              console.log('dataUri >>>>', dataUri); // 这个就是base的图片地址
              image.src=dataUri
              image.setAttribute("src",dataUri);
              console.log(image)
            },
            {
              quality: 1, // 图片质量 取值范围：0-1，默认0.92
              preserveDimensions:true,
              copyStyles:false
            }
        );
      }else{
        image.style.marginLeft='510px'
        image.style.marginTop='78px'
        image.style.position='absolute'
        this.graph.toPNG(
            dataUri => {
              console.log('dataUri >>>>', dataUri); // 这个就是base的图片地址
              image.src=dataUri
              image.setAttribute("src",dataUri);
              console.log(image)
            },
            {
              quality: 1, // 图片质量 取值范围：0-1，默认0.92
              preserveDimensions:true,
              copyStyles:false
            }
        );
      }
      canvasID.appendChild(image);

      image.onload=()=>{
          html2canvas(canvasID, {
            useCORS: true
          }).then((canvas) => {
            let dom = document.body.appendChild(canvas);
            dom.style.display = "none";
            a.style.display = "none";
            document.body.removeChild(dom);
            let blob = that.dataURLToBlob(dom.toDataURL("image/png"));
            a.setAttribute("href", URL.createObjectURL(blob));
            //这块是保存图片操作  可以设置保存的图片的信息
            a.setAttribute("download", that.activityForm.name + ".png");
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(blob);
            document.body.removeChild(a);
            canvasID.removeChild(image);
          });
        }

    },
    //图片格式转换方法
    dataURLToBlob(dataurl) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    addMainDesk() {
      if (this.addMainDeskForm.type==='9m'){
        this.mainDeskForm={
          ...this.mainDeskForm,mainDeskType5:"9m",mainDeskDistance5: this.addMainDeskForm.distance, mainDeskNum5: this.addMainDeskForm.num,
        }
      }else if (this.addMainDeskForm.type==='7.2m'){
        this.mainDeskForm={
          ...this.mainDeskForm,mainDeskType4:"7.2m",mainDeskDistance4: this.addMainDeskForm.distance, mainDeskNum4: this.addMainDeskForm.num,
        }
      }else if (this.addMainDeskForm.type==='5.4m'){
        this.mainDeskForm={
          ...this.mainDeskForm,mainDeskType3:"5.4m",mainDeskDistance3: this.addMainDeskForm.distance, mainDeskNum3: this.addMainDeskForm.num,
        }
      }else if (this.addMainDeskForm.type==='3.6m'){
        this.mainDeskForm={
          ...this.mainDeskForm,mainDeskType2:"3.6m",mainDeskDistance2: this.addMainDeskForm.distance, mainDeskNum2: this.addMainDeskForm.num,
        }
      }else if (this.addMainDeskForm.type==='2.5m'){
        this.mainDeskForm={
          ...this.mainDeskForm,mainDeskType1:"2.5m",mainDeskDistance1: this.addMainDeskForm.distance, mainDeskNum1: this.addMainDeskForm.num,
        }
      }
      this.cancelMainDesk()
    },
    cancelMainDesk(){
      this.addMainDeskForm={type:"9m", distance:2.5, num:1}
      this.dialogFormVisible=false
    }

  }
}
</script>

<style scoped>
/*导航栏样式*/
.el-header {
  height: 69px;
  display: flex;
  /*background-color: #2C2A4E;*/
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 60px;
  padding-right: 60px;
  background: linear-gradient(to right, #2C2A4E, #ffffff);
  background-color: inherit;
  background-color: transparent;
}

.el-aside {
  /*height: calc(100vh - 70px);*/
}

.el-main {
  padding: 10px;
  /*height: calc(100vh - 90px);*/
  position: relative;
}

.logo {
  width: 120px;
  height: 40px;
  /*background-image: url("../assets/logo1.png");*/
}

.menu-list{
  display: flex;
}
.bg-main{
  /*display: flex;*/
  /*justify-content: center;*/
  /*padding:0 20px;*/
  height: 918px;
  width: 1364px;
}

.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid dodgerblue;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px
}
.background-img {
  position: absolute;
  /*width: 1364px;*/
  height:918px;
  z-index: -1;
}
</style>
