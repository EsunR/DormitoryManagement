(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38603c9b"],{"3fa3":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-wrapper",attrs:{id:"FloorManage"}},[a("h1",{staticClass:"main-title"},[t._v("楼层管理")]),t._v(" "),a("div",{staticClass:"selector-wrapper main-card wrapper"},[a("GroupSelector",{model:{value:t.selectorData,callback:function(e){t.selectorData=e},expression:"selectorData"}}),t._v(" "),a("el-button",{attrs:{type:"primary",round:"",disabled:null===t.selectorData.buildingId},on:{click:t.handleSubmitClick}},[t._v("获取数据")])],1),t._v(" "),a("h1",{staticClass:"main-title"},[t._v("楼层信息")]),t._v(" "),a("div",{staticClass:"list-wrapper"},[0===t.floorsData.length?a("div",{staticClass:"main-card"},[t._v("\n      请选择宿舍楼\n    ")]):t._e(),t._v(" "),t._l(t.floorsData,(function(e){return a("FloorInfoCard",{key:e.id,attrs:{"floor-info":e,"cleaners-data":t.cleanersData}})}))],2)])},o=[],l=a("3392"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"FloorInfoCard main-card"},[a("div",{staticClass:"title"},[t._v("楼层："+t._s(t.floorInfo.layer)+"层")]),t._v(" "),a("div",{staticClass:"info"},[a("div",{staticClass:"left"},t._l(t.floorInfo.rooms,(function(e){return a("router-link",{key:e.id,staticClass:"room-itme",class:{empty:0===e.studentCount,full:e.studentCount>=e.peopleNum},attrs:{tag:"div",to:{name:"roomInfo",query:{roomId:e.id}}}},[t._v("\n        "+t._s(e.number)+"\n      ")])})),1),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"cleaner",on:{click:function(e){t.dialogVisible=!0}}},[a("div",{staticClass:"title"},[t._v("保洁人员")]),t._v(" "),a("div",{staticClass:"cleaner-name"},[t._v("\n          "+t._s(t.floorInfo.cleaner?t.floorInfo.cleaner.name:"无")+"\n        ")])])])]),t._v(" "),a("el-dialog",{attrs:{title:"分配保洁人员",visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"dialog-body"},[a("el-select",{attrs:{placeholder:"请选择",clearable:!0},model:{value:t.cleanerId,callback:function(e){t.cleanerId=e},expression:"cleanerId"}},t._l(t.cleanersData,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)])],1)},i=[],s=a("be0e"),c={name:"FloorInfoCard",data:function(){return{dialogVisible:!1,cleanerId:null}},props:{floorInfo:{type:Object,default:function(){return{id:null,layer:null,buildingId:null,createdAt:new Date,updatedAt:new Date,deletedAt:null,cleanerId:null,cleaner:null,rooms:[]}}},cleanersData:{type:Array,default:function(){return[]}}},mounted:function(){this.cleanerId=this.floorInfo.cleaner?this.floorInfo.cleaner.id:null},methods:{handleSubmit:function(){var t=this,e=this.floorInfo.cleaner?this.floorInfo.cleaner.id:null;this.cleanerId!==e&&Object(s["a"])(this.floorInfo.id,this.cleanerId).then((function(){t.$message.success("修改保洁人员成功"),t.$parent.fetchFloorData()})),this.dialogVisible=!1}}},u=c,d=(a("561a"),a("2877")),f=Object(d["a"])(u,r,i,!1,null,"ca716a2e",null),b=f.exports,v=a("70ad"),m={name:"floorManage",components:{GroupSelector:l["a"],FloorInfoCard:b},data:function(){return{selectorData:{buildingId:null},floorsData:[],cleanersData:[]}},methods:{fetchFloorData:function(){var t=this;Object(s["c"])(this.selectorData.buildingId).then((function(e){t.floorsData=e.data.floors}))},fetchCleanersData:function(){var t=this;Object(v["g"])(this.selectorData.buildingId).then((function(e){t.cleanersData=e.data.cleaners}))},handleSubmitClick:function(){this.fetchFloorData(),this.fetchCleanersData()}}},h=m,p=(a("f7a4"),Object(d["a"])(h,n,o,!1,null,"30bb3c07",null));e["default"]=p.exports},"420d":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"a",(function(){return l}));var n=a("b775");function o(t){return Object(n["a"])({url:"/room/getRooms",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/room/getRoomInfo",method:"get",params:{roomId:t}})}},"561a":function(t,e,a){"use strict";var n=a("69c4"),o=a.n(n);o.a},"69c4":function(t,e,a){},be0e:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return l})),a.d(e,"a",(function(){return r}));var n=a("b775");function o(t){return Object(n["a"])({url:"/floor/getFloors",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/floor/getFloorsDetail",method:"get",params:{buildingId:t}})}function r(t,e){return Object(n["a"])({url:"/floor/addCleanerToFloor",method:"post",data:{floorId:t,cleanerId:e}})}},df27:function(t,e,a){},f7a4:function(t,e,a){"use strict";var n=a("df27"),o=a.n(n);o.a}}]);