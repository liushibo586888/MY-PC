<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <!-- <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker type="date" placeholder="开始日期" class="DatePicker_time" :options="options1" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker type="date" placeholder="结束日期" class="DatePicker_time" :options="options1" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col> -->
          <!-- <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="门店" :filterable="true">
                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col> -->
          <!-- <i-col span="3">
                        <FormItem prop="userTel">
                            <Input v-model="formItem.userTel" placeholder="电话" />
                        </FormItem>
                    </i-col> -->
          <i-col span="24">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
              <Button type="success" class="btn btn-search" @click="addform">添加</Button>
              <Button type="error" class="btn btn-reset" @click="revamp" :disabled="!rowID">修改</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <!-- 添加审核流程 -->
    <Modal :mask-closable="false" v-model="modalFQ" title="审核流程" width="1200">
      <p style="margin:0 0 10px 0;color:red">选择审核类型:</p>
      <Select v-model="ApprovalTypeID" style="width:100%">
        <Option v-for="item in shList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
      </Select>

      <p style="20px 0 10px 0;color:red">选择区域:</p>
      <Select v-model="model10" multiple style="width:100%" @on-change='oNcreate'>
        <Option v-for="item in qyList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
      </Select>

      <p style="margin:20px 0 10px 0;color:red">选择门店:</p>
      <Select v-model="model11" multiple style="width:100%" @on-change='xzMD'>
        <Option v-for="item in mdList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
      </Select>

      <p style="margin:20px 0 10px 0;color:red">选择审核人:</p>
      <Select v-model="XZSHren" multiple style="width:100%" :label-in-value="true" @on-change='oNshr'>
        <Option v-for="item in XZSHrenList" :value="item.employeeId" :label="item.Name" :key="item.employeeId">{{ item.Name }}</Option>
      </Select>

      <Steps :current="-1" style="margin-top:30px">
        <!-- <Step :title="FQRname" content="发起人"></Step> -->
        <Step v-for="(item, index) in SHpeoples" :key="index" title="审核人" :content="item.Name"></Step>
      </Steps>

      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="okFQ" :loading="loading">保存</Button>
        <Button class="btn" type="warning" @click="cancelFQ">取消</Button>
      </div>
    </Modal>

    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable" @on-row-click="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <div class="bottom-box">
      <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
      <Select v-model="tablePage.pageNum" class="table-row" placement="top" @on-change="changePage">
        <Option :value="item.ID" v-for="(item, index) in tableRows" :key="index">{{item.Name}}</Option>
      </Select>

      <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
      <i-button class="btn btn-prev" type="ghost" @click="prevPage()">上一页</i-button>
      <i-button class="btn btn-next" type="primary" @click="nextPage()">下一页</i-button>
      <div class="page-box">
        <p>前往</p>
        <Input-number :max="tablePage.maxPageNum" :min="1" v-model="tablePage.page" @on-change="changePage"></Input-number>
        <p>页</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      loading: false,
      stype: "",
      rowID: "",
      kgmodel: 1,
      FQRname: "",
      modalFQ: false,
      qyList: [],
      mdList: [],
      shrList: [],
      model10: [],
      model11: [],
      Dmodel10: [],
      Dmodel11: [],
      XZSHren: [],
      XZSHrenList: [],
      SHpeoples: [],
      DSHpeoples: [],
      ApprovalTypeID: "",
      shList: [],
      options1: echartsCommon.shortcuts(), //时间回到今天
      tableLoading: true,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 40,
      formItem: {
        StartDate: new Date(),
        EndDate: new Date(),
        StoreID: null,
        EmployeeID: "",
        userTel: "",
        store: "all"
      },
      columns1: [
        {
          title: "审核门店",
          key: "storeName",
          align: "center",
          width: "40%",
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.storeName, 30);
          }
        },
        {
          title: "审核类型",
          key: "typeName",
          align: "center"
        },
        {
          title: "审批人",
          key: "AuditorName",
          align: "center",
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.AuditorName, 30);
          }
        },
        {
          title: " ",
          key: "",
          align: "center"
        }
      ],
      list: [],
      storeList: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    addform() {
      this.modalFQ = true;
      this.kgmodel = 1;
      this.stype = "Add";
      this.clearAll();
    },
    getRowID(row) {
      let that = this;
      // that.clearAll();
      that.rowID = row.ID;
      that.Dmodel10 = row.Area;
      that.Dmodel11 = row.StoreIds;
      that.ApprovalTypeID = row.ApprovalTypeID;
      that.XZSHren = row.Person;
      that.DSHpeoples = row.listAuditorName;
    },
    revamp() {
      let that = this;
      that.modalFQ = true;
      that.kgmodel = 2;
      that.stype = "Edit";
      that.model10 = that.Dmodel10;
      that.model11 = that.Dmodel11;
      that.SHpeoples = that.DSHpeoples;
    },
    okFQ() {
      let that = this;
      let arr = that.XZSHren;
      let data = {
        ID: that.rowID,
        ApprovalTypeID: that.ApprovalTypeID,
        // powerModels: {
        Area: that.model10,
        StoreIds: that.model11,
        // },
        Person: arr
      };
      let length10 = that.model10.length;
      let length11 = that.model11.length;
      if (
        that.ApprovalTypeID == "" ||
        length10 == 0 ||
        length11 == 0 ||
        arr.length == 0
      ) {
        that.$Message.error("有必选项为空");
        return;
      }
      if (that.kgmodel == 1) {
        that.loading = true;
        api.ApprovalAdd(data).then(res => {
          if (res.error_code === "Success") {
            that.modalFQ = false;
            that.clearAll();
            that.getList();
            that.loading = false;
          } else {
            that.$Message.error(res.error_message);
          }
        });
      } else {
        that.loading = true;
        api.ApprovalEdit(data).then(res => {
          if (res.error_code === "Success") {
            that.modalFQ = false;
            that.clearAll();
            that.getList();
            that.loading = false;
          } else {
            that.$Message.error(res.error_message);
          }
        });
      }
    },
    cancelFQ() {
      let that = this;
      that.modalFQ = false;
      that.clearAll();
    },
    oNcreate() {
      let that = this;
      let data = {
        listCity: that.model10,
        stype: that.stype
      };
      if (data.listCity.length != 0) {
        api.ApprovallistStore(data).then(res => {
          if (res.error_code === "Success") {
            that.mdList = res.data;
          } else {
            that.$Message.error(res.error_message);
          }
        });
      }
    },
    xzMD() {
      let that = this;
      let data = {
        listStore: that.model11
      };
      if (data.listStore.length != 0) {
        api.ApprovalStore(data).then(res => {
          if (res.error_code === "Success") {
            that.XZSHrenList = res.data;
          } else {
            that.$Message.error(res.error_message);
          }
        });
      }
    },
    oNshr(e) {
      let that = this;
      let arr = e;
      that.SHpeoples = [];
      arr.forEach(x => {
        let a = {
          Name: x.label
        };
        that.SHpeoples.push(a);
      });
    },
    clearAll() {
      let that = this;
      that.model10 = [];
      that.model11 = [];
      that.ApprovalTypeID = "";
      that.XZSHren = [];
      that.mdList = [];
      that.XZSHrenList = [];
      that.SHpeoples = [];
      that.Dmodel10 = [];
      that.Dmodel11 = [];
      that.DSHpeoples = [];
    },
    searchForm() {
      // 搜索表格
      let that = this;
      //判断两个时间段大小

      if (
        echartsCommon.ContrastTime(
          this.$Message,
          that.formItem.StartDate,
          that.formItem.EndDate
        )
      ) {
        that.tablePage.page = 1;
        that.getList();
      }
      //------------------
    },
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
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
      setTimeout(() => {
        let that = this;
        let data = {
          // EmployeeID: that.userMes.EmployeeID,
          // StoreId: that.formItem.StoreID,
          // StartDate: that.formItem.StartDate,
          // EndDate: that.formItem.EndDate,
          page: that.tablePage.page,
          size: that.tablePage.pageNum
        };
        // data.StartDate = echartsCommon.changeTime(data.StartDate);
        // data.EndDate = echartsCommon.changeTime(data.EndDate);
        that.tableLoading = true;
        api.PersonSetList(data).then(response => {
          if (response.error_code === "Success") {
            let res = response.data;
            that.list = res.list;
            that.tableLoading = false;
            that.page = res.page;
            that.tablePage.allNum = res.total;
            that.tablePage.maxPageNum = res.totalPage;
            that.setPage();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 100);
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.getValidStoresNew(data).then(response => {
        if (response.error_code === "Success") {
          that.storeList = response.data.list;
          that.formItem.store = that.userMes.StoreName;
          that.formItem.StoreID = that.userMes.StoreID;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    choose(name, id) {
      this.formItem.store = name;
      this.formItem.StoreID = id;
    },
    // 获取审核类型
    getListType() {
      let that = this;
      api.ListType().then(res => {
        if (res.error_code === "Success") {
          that.shList = res.data;
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    // 获取区域列表
    getQYList() {
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID
      };
      api.NewGetAllCityInfo(data).then(res => {
        if (res.error_code === "Success") {
          that.qyList = res.data.list;
        } else {
          that.$Message.error(res.error_message);
        }
      });
    }
  },

  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.FQRname = that.userMes.EmployeeName;
      that.initTableHeight();
      that.getStore();
      that.getList();
      that.getListType();
      that.getQYList();
    });
  }
};
</script>
<style>
</style>

