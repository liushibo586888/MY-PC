<template>
  <div class="zwgl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
        <row :gutter="20">
          <!-- 厂家名称 -->
          <!-- <i-col span="3">
                        <FormItem prop="Name">
                            <Input v-model="formItem.Name" placeholder="职位名称"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem prop="DepartmentName">
                            <Input v-model="formItem.DepartmentName" placeholder="部门"></Input>
                        </FormItem>
                    </i-col> -->
          <i-col span="24">
            <formItem class="btn-box">
              <!-- <Button type="primary" class="btn" @click="searchList">搜索</Button> -->
              <!-- <Button type="warning" class="btn" @click="resetSearch">重置</Button> -->
              <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
              <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" :height="setTableHeight" highlight-row ref="mainTable" @on-current-change="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <div class="bottom-box">
      <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
      <!-- <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div> -->
      <!-- <i-button class="btn btn-prev" type="ghost" @click="prevPage()">上一页</i-button> -->
      <!-- <i-button class="btn btn-next" type="primary" @click="nextPage()">下一页</i-button> -->
      <!-- <div class="page-box">
                <p>前往</p>
                 <Input-number :max="tablePage.maxPageNum" :min="1" v-model="tablePage.page" @on-change="changePage"></Input-number>
                <p>页</p>
            </div> -->
    </div>
    <!-- 新增弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" class="dialog" :width="700" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="PositionName" label="职位名称：" :label-width="120" :rules="formValidateRule.PositionName">
              <Input v-model="formValidate.PositionName" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="DepartmentID" label="所属部门：" :label-width="120" :rules="formValidateRule.DepartmentID">
              <Select v-model="formValidate.DepartmentID">
                <Option v-for="item in departmentList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="RoleID" label="选择权限：" :label-width="120" :rules="formValidateRule.RoleID">
              <Select v-model="formValidate.RoleID">
                <Option v-for="item in xzqxList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="IsDirector" label="是否主管：" :label-width="120" :rules="formValidateRule.IsDirector">
              <RadioGroup v-model="formValidate.IsDirector">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="ChannelIDList" label="来源渠道：" :label-width="120" :rules="formValidateRule.ChannelIDList">
              <Select v-model="formValidate.ChannelIDList" multiple>
                <Option v-for="item in lyqdList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="PositionType" label="职位类型：" :label-width="120" :rules="formValidateRule.PositionType">
              <Select v-model="formValidate.PositionType">
                <Option v-for="item in positionTypeList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="DataRangeID" label="数据读取范围：" :label-width="120" :rules="formValidateRule.DataRangeID">
              <Select v-model="formValidate.DataRangeID">
                <Option v-for="item in sjdqfwList" :value="item.ID" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <!-- <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="city" label="区域选择：" :label-width="120" :rules="formValidateRule.city">
                            <Select v-model="formValidate.city">
                                <Option v-for="item in cityList" :value="item.ID" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row> -->
        <!-- <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="AreaList" label="区域门店：" :label-width="120" :rules="formValidateRule.AreaList" v-if="yinC">
              <Select v-model="formValidate.AreaList" multiple>
                <Option v-for="item in areaList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row> -->
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="Remark" label="备注：" :label-width="120">
              <Input v-model="formValidate.Remark" placeholder="请输入" type="textarea"></Input>
            </FormItem>
          </i-col>
        </row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
        <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
      </div>
    </Modal>
    <!-- ** -->
  </div>
</template>
<script>
import api from "@/api/index.js";
import manager from "@/api/manager.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      yinC: false,
      tableLoading: false,
      rowID: null,
      sCityId: "",
      loading: false,
      tableHeight: 200,
      modalTitle: "修改",
      phone: "",
      modal1: false,
      // 添加弹窗用
      formValidate: {
        ID: "",
        PositionName: "",
        DepartmentID: "",
        ChannelIDList: [],
        AreaList: [],
        city: "",
        RoleID: "",
        IsDirector: 0,
        DataRangeID: "",
        Remark: "",
        PositionType: ""
      },
      formValidateRule: {
        PositionName: {
          required: true,
          message: "职位名称不得为空",
          trigger: "blur"
        },
        DepartmentID: {
          required: true,
          message: "所属部门不得为空",
          trigger: "blur"
        },
        RoleID: {
          required: true,
          message: "选择权限不得为空",
          trigger: "blur"
        },
        IsDirector: {
          required: true,
          message: "是否主管不得为空",
          trigger: "blur",
          type: "number"
        },
        DataRangeID: {
          required: true,
          message: "数据读取范围不得为空",
          trigger: "blur",
          type: "number"
        },
        PositionType: {
          required: true,
          message: "职位类型不得为空",
          trigger: "blur",
          type: "number"
        }
      },
      formItem: {
        Name: "",
        DepartmentName: ""
      },
      columns1: [
        {
          title: "职位名称",
          key: "PositionName",
          align: "center"
        },
        {
          title: "所属部门",
          key: "DepartmentName",
          align: "center"
        },
        {
          title: "来源渠道",
          key: "ChannelNameList",
          align: "center",
          render: (h, parmas) => {
            if (parmas.row.ChannelNameList.length <= 0) {
              return "无";
            }
            let text = "";
            for (let i in parmas.row.ChannelNameList) {
              text += parmas.row.ChannelNameList[i];
              if (i != parmas.row.ChannelNameList.length - 1) {
                text += "、";
              }
            }
            return h("div", {}, text);
          }
        },
        {
          title: "权限",
          key: "RoleName",
          align: "center"
        },
        {
          title: "是否主管",
          key: "IsDirector",
          align: "center",
          render: (h, parmas) => {
            let text = parmas.row.IsDirector ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "数据读取范围",
          key: "DataRangeName",
          align: "center"
        },
        {
          title: "备注",
          key: "Remark",
          width: 140,
          align: "center",
          render: (h, parmas) => {
            if (!parmas.row.Remark) {
              return "";
            }
            let text =
              parmas.row.Remark.length > 8
                ? parmas.row.Remark.substr(0, 7) + "..."
                : parmas.row.Remark;
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(parmas.row.Remark);
                  }
                }
              },
              text
            );
          }
        },
        {
          title: " ",
          width: 10,
          key: ""
        }
      ],
      list: [],
      lyqdList: [],
      areaList: [],
      cityList: [],
      xzqxList: [],
      sjdqfwList: [],
      departmentList: [],
      positionTypeList: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      authorList: state => state.app.authorList,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    },
    setAuthorAdd() {
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "增加") {
            return i.IsVisible;
            break;
          }
        }
      }
      return false;
    },
    setAuthorEdit() {
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "修改") {
            return i.IsVisible;
            break;
          }
        }
      }
      return false;
    }
  },
  methods: {
    choose(name, id) {
      let that = this;
      that.formValidate.DataRangeID = id;
      if (that.formValidate.DataRangeID == 4) {
        that.yinC = true;
      } else {
        that.yinC = false;
        that.formValidate.AreaList = [];
      }
    },
    showAddPoup() {
      let that = this;
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = "新建";
    },
    searchList() {
      let that = this;
      that.getList();
    },
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    searchCustomerTel() {
      let that = this;
      that.$refs.searchTelForm.validate(validate => {
        if (validate) {
          // 搜索...
          that.$refs.searchTelForm.resetFields();
          that.poupSearchTel = false;
          that.modal1 = true;
          that.modalTitle = "新增";
        } else {
          that.$Message.error("请输入用户的联系电话");
        }
      });
    },
    modefyMessage(data) {
      let that = this;
      manager
        .modefySinglePositions(that.formValidate.ID, data)
        .then(response => {
          that.loading = false;
          if (response.error_code === "Success") {
            that.$Message.success("修改成功");
            that.resetForm();
            that.getList();
          } else {
            that.$Message.error(response.error_message);
          }
        });
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.formValidate.ID = "";
      that.modal1 = false;
      that.yinC = false;
      that.formValidate.AreaList = [];
    },
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          let data = {
            PositionName: that.formValidate.PositionName,
            DepartmentID: that.formValidate.DepartmentID,
            ChannelIDList: that.formValidate.ChannelIDList,
            PositionType: that.formValidate.PositionType,
            RoleID: that.formValidate.RoleID,
            IsDirector: that.formValidate.IsDirector > 0 ? true : false,
            DataRangeID: that.formValidate.DataRangeID,
            StoreInfoIDList: that.formValidate.AreaList,
            Remark: that.formValidate.Remark
          };
          that.loading = true;
          if (that.modalTitle === "修改") {
            that.modefyMessage(data);
            return false;
          }
          manager.addPositions(data).then(response => {
            that.loading = false;
            if (response.error_code === "Success") {
              that.$Message.success("添加成功");
              that.resetForm();
              that.formValidate.AreaList = [];
              that.getList();
            } else {
              that.$Message.error(response.error_message);
            }
          });
        } else {
          this.$Message.error("有必填项为空");
        }
      });
    },
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById("tableBox").offsetHeight;
      window.onresize = function() {
        that.tableHeight = document.getElementById("tableBox").offsetHeight;
      };
    },
    setPage() {
      let that = this;
      let teblePage = that.tablePage;
      teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1;
      let endPage = teblePage.page * teblePage.pageNum;
      teblePage.endNum =
        endPage > teblePage.allNum ? teblePage.allNum : endPage;
    },
    prevPage() {
      let that = this;
      if (that.tablePage.page <= 1) {
        that.$Message.error("已经是第一页");
        return false;
      }
      that.tablePage.page--;
      that.getList();
    },
    nextPage() {
      let that = this;
      if (that.tablePage.page >= that.tablePage.maxPageNum) {
        that.$Message.error("已经是最后一页");
        return false;
      }
      that.tablePage.page++;
      that.getList();
    },
    changePage() {
      let that = this;
      that.getList();
    },
    getList() {
      let that = this;
      that.tableLoading = true;
      let data = {
        // EmployeeID: that.userMes.EmployeeID,
        // page: that.tablePage.page,
        // size: that.tablePage.pageNum,
        Valid: that.formItem.DepartmentName,
        Name: that.formItem.Name
      };
      if (that.formItem.Valid === 1) {
        data.Valid = true;
      } else if (that.formItem.Valid === 0) {
        data.Valid = false;
      }
      manager.getPositionsList().then(response => {
        that.tableLoading = false;
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
          that.tablePage.page = res.page;
          that.tablePage.allNum = res.total;
          that.tablePage.maxPageNum = res.totalPage;
          that.setPage();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getPositionTypeList() {
      let that = this;
      manager.getPositionTypeList().then(response => {
        if (response.error_code === "Success") {
          that.positionTypeList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    getRowID(row) {
      let that = this;
      that.rowID = row.ID;
    },
    getDetail() {
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.$store.commit("changeLoadingPage");
      manager.getSinglePositions(that.rowID).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          let res = response.data;
          if (res.DataRangeID == 4) {
            that.yinC = true;
          } else {
            that.formValidate.AreaList = [];
          }
          // console.log(res.StoreInfoIDList);
          that.formValidate = {
            ID: res.ID,
            PositionName: res.PositionName,
            DepartmentID: res.DepartmentID,
            ChannelIDList: res.ChannelIDList,
            AreaList: res.StoreInfoIDList,
            RoleID: res.RoleID,
            IsDirector: res.IsDirector ? 1 : 0,
            DataRangeID: res.DataRangeID,
            PositionType: res.PositionType,
            Remark: res.Remark
          };
          that.modalTitle = "修改";
          that.modal1 = true;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getChannelsList() {
      // 获取来源渠道下拉
      let that = this;
      api.getValidChannels().then(response => {
        if (response.error_code === "Success") {
          that.lyqdList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    // getCitysList() {
    //   // 获取区域下拉
    //   let that = this;
    //   api.GetAllCityInfo().then(response => {
    //     if (response.error_code === "Success") {
    //       that.cityList = response.data.list;
    //     } else {
    //       that.$Message.error(response.error_message);
    //     }
    //   });
    // },
    getArealsList() {
      // 获取区域门店下拉
      let that = this;
      let data = {
        sCityId: that.sCityId
      };
      api.GetAllStoreInfo(data).then(response => {
        if (response.error_code === "Success") {
          that.areaList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getDepartmentsList() {
      // 获取部门列表
      let that = this;
      manager.getValidDepartmentsList().then(response => {
        if (response.error_code === "Success") {
          that.departmentList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getDataRangeDropdownList() {
      // 获取数据读取范围列表
      let that = this;
      manager.getDataRangeDropdownList().then(response => {
        if (response.error_code === "Success") {
          that.sjdqfwList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getRolesDropdownList() {
      // 获取权限列表
      let that = this;
      manager.getRolesDropdownList().then(response => {
        if (response.error_code === "Success") {
          that.xzqxList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    showRemark(text) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "详情",
        content: text
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.getChannelsList();
      //   that.getCitysList();
      that.getArealsList();
      that.initTableHeight();
      that.getList();
      that.getDepartmentsList();
      that.getDataRangeDropdownList();
      that.getRolesDropdownList();
      that.getPositionTypeList();
    });
  }
};
</script>
<style>
</style>
