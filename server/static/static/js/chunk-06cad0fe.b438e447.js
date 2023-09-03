(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06cad0fe"],{"125d":function(e,t,n){},"20c6":function(e,t,n){"use strict";n("7158")},4772:function(e,t,n){},"57ed":function(e,t,n){"use strict";n("4772")},"5fe0":function(e,t,n){"use strict";n("125d")},7158:function(e,t,n){},"723f":function(e,t,n){"use strict";n.r(t);n("7f7f");var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper",attrs:{id:"building-manage"}},[t("h1",{staticClass:"main-title"},[e._v("创建宿舍楼")]),e._v(" "),t("div",{staticClass:"wrapper"},[t("BuildingAddForm",{on:{submitSuccess:e.fetchBuildings}})],1),e._v(" "),t("h1",{staticClass:"main-title"},[e._v("宿舍楼一览")]),e._v(" "),t("div",{staticClass:"wrapper"},[t("el-row",{attrs:{gutter:30}},e._l(e.buildings,(function(n,a){return t("el-col",{key:n.id,attrs:{sm:8}},[t("div",{staticClass:"room-card main-card"},[t("div",{staticClass:"title"},[e._v("NO."+e._s(a+1)+" "+e._s(n.name))]),e._v(" "),t("div",{staticClass:"building-info"},[e._v("\n            楼层数："),t("span",[e._v(e._s(n.floorCount))])]),e._v(" "),t("div",{staticClass:"building-info"},[e._v("\n            房间数："),t("span",[e._v(e._s(n.roomCount))])]),e._v(" "),t("div",{staticClass:"building-info"},[e._v("\n            学生数："),t("span",[e._v(e._s(n.studentCount))])]),e._v(" "),t("div",{staticClass:"btn-wrapper"},[t("el-tooltip",{attrs:{effect:"dark",content:"添加管理员",placement:"bottom-end"}},[t("el-button",{attrs:{type:"warning",icon:"el-icon-s-custom",circle:""},on:{click:function(t){return e.handleAddAdminBtnClick(n)}}})],1),e._v(" "),t("el-tooltip",{attrs:{effect:"dark",content:"添加保洁人员",placement:"top"}},[t("el-button",{attrs:{type:"info",icon:"el-icon-brush",circle:""},on:{click:function(t){return e.handleAddCleanerBtnClick(n)}}})],1),e._v(" "),t("el-tooltip",{attrs:{effect:"dark",content:"删除宿舍楼",placement:"bottom-start"}},[t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(t){return e.handleDelete(n)}}})],1)],1)])])})),1)],1),e._v(" "),t("el-dialog",{staticClass:"admin-dialog",attrs:{title:"管理员信息",visible:e.adminDialogVisible,width:"800px","before-close":e.cleanSelected},on:{"update:visible":function(t){e.adminDialogVisible=t}}},[t("div",{staticClass:"dialog-body"},[t("h3",[e._v("已有管理员")]),e._v(" "),t("AdminCleanerTable",{attrs:{"table-data":e.admins},on:{onDelete:e.handleDeleteAdmin}}),e._v(" "),t("h3",[e._v("添加管理员")]),e._v(" "),t("div",{staticClass:"search-wrapper"},[t("AdminSearcher",{model:{value:e.selectedAdminAccount,callback:function(t){e.selectedAdminAccount=t},expression:"selectedAdminAccount"}}),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.handleAddAdmin}},[e._v("添 加")])],1)],1),e._v(" "),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.cleanSelected}},[e._v("关 闭")])],1)]),e._v(" "),t("el-dialog",{staticClass:"cleaner-dialog",attrs:{title:"保洁人员信息",visible:e.cleanerDialogVisible,width:"800px","before-close":e.cleanSelected},on:{"update:visible":function(t){e.cleanerDialogVisible=t}}},[t("div",{staticClass:"dialog-body"},[t("h3",[e._v("已有保洁员")]),e._v(" "),t("AdminCleanerTable",{attrs:{"table-data":e.cleaners},on:{onDelete:e.handleDeleteCleaner}}),e._v(" "),t("h3",[e._v("添加保洁员")]),e._v(" "),t("el-form",{ref:"cleanerForm",attrs:{inline:!0,model:e.cleanerForm}},[t("el-form-item",{attrs:{label:"姓名",required:"",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.cleanerForm.name,callback:function(t){e.$set(e.cleanerForm,"name",t)},expression:"cleanerForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"电话",required:"",prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.cleanerForm.phone,callback:function(t){e.$set(e.cleanerForm,"phone",t)},expression:"cleanerForm.phone"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.handleAddCleaner}},[e._v("添 加")])],1)],1)],1),e._v(" "),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.cleanSelected}},[e._v("关 闭")])],1)])],1)},l=[],i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main-card",attrs:{id:"BuildingAddForm"}},[t("el-form",{ref:"form",staticClass:"form",attrs:{inline:!0,model:e.formData}},[t("el-form-item",{attrs:{label:"宿舍楼名",required:"",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name","string"===typeof t?t.trim():t)},expression:"formData.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"楼层数",required:"",prop:"floorCount"}},[t("el-input-number",{attrs:{min:1,max:9},model:{value:e.formData.floorCount,callback:function(t){e.$set(e.formData,"floorCount",t)},expression:"formData.floorCount"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"每层楼房间数",required:"",prop:"roomCount"}},[t("el-input-number",{attrs:{min:1,max:99},model:{value:e.formData.roomCount,callback:function(t){e.$set(e.formData,"roomCount",t)},expression:"formData.roomCount"}})],1)],1),e._v(" "),t("div",{staticClass:"btn-wrapper"},[t("el-button",{attrs:{type:"danger"},on:{click:e.clean}},[e._v("清空")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("创建")])],1)],1)},s=[],o=n("70ad"),c={name:"BuildingAddForm",data:function(){return{formData:{name:"",floorCount:1,roomCount:1}}},methods:{onSubmit:function(){var e=this;this.formData.name?this.$confirm("确认要添加 ".concat(this.formData.name," 宿舍吗"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["b"])(e.formData).then((function(){e.$message({type:"success",message:"添加成功！"}),e.clean(),e.$emit("submitSuccess")}))})).catch((function(){e.$message({type:"info",message:"已取消"})})):this.$message({type:"error",message:"请填写宿舍楼名"})},clean:function(){this.formData.name="",this.formData.floorCount=1,this.formData.roomCount=1}}},r=c,d=(n("57ed"),n("2877")),u=Object(d["a"])(r,i,s,!1,null,"28ff977a",null),m=u.exports,f=function(){var e=this,t=e._self._c;return t("div",{staticClass:"AdminCleanerTable"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[t("el-table-column",{attrs:{prop:"id",label:"UID"}}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"姓名"}}),e._v(" "),t("el-table-column",{attrs:{prop:"phone",label:"电话号"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.handleDeleteClick(n.row.id)}}},[e._v("移除")])]}}])})],1)],1)},h=[],p={name:"AdminCleanerTable",data:function(){return{}},props:{tableData:{type:Array,required:!0}},methods:{handleDeleteClick:function(e){this.$emit("onDelete",e)}}},b=p,v=Object(d["a"])(b,f,h,!1,null,"3f440dd5",null),g=v.exports,_=function(){var e=this,t=e._self._c;return t("el-autocomplete",{staticClass:"admin-search",attrs:{"popper-class":"my-autocomplete","fetch-suggestions":e.querySearch,placeholder:"输入管理员姓名或账号"},on:{select:e.handleSelect},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.item;return[t("div",{staticClass:"name"},[e._v(e._s(a.name))]),e._v(" "),t("span",{staticClass:"account"},[e._v(e._s(a.account))])]}}]),model:{value:e.state,callback:function(t){e.state=t},expression:"state"}})},C=[],D=n("c24f"),A={name:"AdminSearcher",model:{prop:"value",event:"selected"},data:function(){return{admins:[],state:""}},props:{value:{type:String,default:""}},watch:{value:function(e){this.state=e}},methods:{querySearch:function(e,t){Object(D["h"])(e).then((function(e){var n=e.data.admins;t(n)}))},handleSelect:function(e){this.state=e.name,this.$emit("selected",e.account)}}},y=A,k=(n("20c6"),Object(d["a"])(y,_,C,!1,null,"2e3cdfdc",null)),w=k.exports,$=n("b775");function x(e){var t=e.name,n=e.phone,a=e.buildingId;return Object($["a"])({url:"/cleaner/addCleaner",method:"post",data:{name:t,phone:n,buildingId:a}})}function F(e){return Object($["a"])({url:"/cleaner/delCleaner",method:"delete",params:{cleanerId:e}})}var S={name:"buildingManage",components:{BuildingAddForm:m,AdminCleanerTable:g,AdminSearcher:w},data:function(){return{buildings:[],selected:null,adminDialogVisible:!1,cleanerDialogVisible:!1,admins:[],cleaners:[],selectedAdminAccount:"",cleanerForm:{name:"",phone:""}}},methods:{fetchBuildings:function(){var e=this;Object(o["g"])().then((function(t){e.buildings=t.data.buildings}))},fetchAdminTableData:function(){var e=this;if(this.selected){var t=this.selected.id;Object(o["d"])(t).then((function(t){e.admins=t.data.admins}))}else this.$message("没有选中任何宿舍")},fetchCleanerTableData:function(){var e=this;if(this.selected){var t=this.selected.id;Object(o["h"])(t).then((function(t){e.cleaners=t.data.cleaners}))}else this.$message("没有选中任何宿舍")},handleAddAdminBtnClick:function(e){this.selected=e,this.adminDialogVisible=!0,this.fetchAdminTableData()},handleAddCleanerBtnClick:function(e){this.selected=e,this.cleanerDialogVisible=!0,this.fetchCleanerTableData()},handleDelete:function(e){var t=this;this.selected=e,this.$confirm("确认要删除 “".concat(this.selected.name,"” 宿舍吗"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["c"])(t.selected.id).then((function(e){console.log(e),t.fetchBuildings(),t.$message({type:"success",message:"删除成功！"})}))}))},cleanSelected:function(){this.selectedAdminAccount="",this.admins=[],this.cleaners=[],this.adminDialogVisible=!1,this.cleanerDialogVisible=!1,this.cleanerForm.name="",this.cleanerForm.phone=""},handleAddAdmin:function(){var e=this,t=this.selectedAdminAccount;if(t){var n=this.selected.id;Object(o["a"])(t,n).then((function(){e.$message({type:"success",message:"添加成功"}),e.fetchAdminTableData()}))}},handleAddCleaner:function(){var e=this;this.$refs.cleanerForm.validate((function(t){t?x({name:e.cleanerForm.name,phone:e.cleanerForm.phone,buildingId:e.selected.id}).then((function(){e.$message.success("添加成功"),e.fetchCleanerTableData(),e.cleanerForm.name="",e.cleanerForm.phone=""})):e.$message.error("请填写完整信息")}))},handleDeleteAdmin:function(e){var t=this;Object(o["j"])(e,this.selected.id).then((function(e){e.data.effectRow>0?(t.$message({type:"success",message:"移除成功"}),t.fetchAdminTableData()):t.$message({type:"error",message:"移除失败"})}))},handleDeleteCleaner:function(e){var t=this;F(e).then((function(){t.$message.success("删除成功!"),t.fetchCleanerTableData()}))}},mounted:function(){this.fetchBuildings()}},T=S,B=(n("5fe0"),Object(d["a"])(T,a,l,!1,null,"3e965f77",null));t["default"]=B.exports}}]);