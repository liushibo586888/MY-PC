<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker type="month" class="DatePicker_time" placeholder="开始日期" :options="options1" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker type="month" class="DatePicker_time" placeholder="结束日期" :options="options1" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="Name">
              <Input v-model="formItem.Key" placeholder="员工姓名"></Input>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="区域" :filterable="true">
                <!-- <Option value="all" @click.native="choose()">所有</Option> -->
                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
              <Button type="success" class="btn btn-search" @click="ZDshenhe">审核</Button>

              <Button type="success" class="ivu-btn ivu-btn-info" @click="GetGlobDetail" :disabled='rowID?false:true'>目标详情</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
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
    <!-- 审核弹窗 -->
    <Modal :mask-closable="false" v-model="modalSH">
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi' @click='TuBioacancel'></i>
      </div>
      <div>
        审核意见：
        <Input type="textarea" v-model="SHjianyi" placeholder="审核意见" autofocus style="width: 100%" />
      </div>
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="ok" :loading="onLoading">通过</Button>
        <Button class="btn" type="warning" @click="cancel" :loading="onLoading">驳回</Button>
      </div>
    </Modal>

    <!-- 查看审核过程弹窗 -->
    <Modal v-model="detail" width="1000">
      <div style="marginTop:20px">
        <Table :columns="columns2" :data="detailList"></Table>
        <!-- <tableLoadingPage :loading="tableLoading"></tableLoadingPage> -->
      </div>
    </Modal>


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
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      modalSH: false,
      SHjianyi: "",
      onLoading: false,
      tableLoading: true,
      
      detail:false,
      detailList:[],
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 40,
      rowID: "",
      Status: "",
      DateTime: "",
      formItem: {
        StartDate: new Date(),
        EndDate: new Date(),
        StoreID: null,
        EmployeeID: "",
        Key: "",
        store: "all",
        page: "",
        size: ""
      },
      columns1: [
        {
          title: "门店名称",
          key: "StoreName",
          align: "center",
          width: 200
        },
        {
          title: "年份",
          key: "CreateDate",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              {},
              moment(params.row.DateTime)
                .format("YYYY-MM-DD")
                .slice(0, 4)
            );
          }
        },
        {
          title: "月份",
          key: "CreateDate",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              {},
              moment(params.row.DateTime)
                .format("YYYY-MM-DD")
                .slice(6, 7)
            );
          }
        },
        {
          title: "总业绩目标",
          key: "Performance",
          align: "center",
          width: 150
        },
        {
          title: "总护理客目标",
          key: "NG",
          align: "center",
          width: 150
        },
        {
          title: "总回访目标",
          key: "VG",
          align: "center",
          width: 150
        },
        {
          title: "总回访到店目标",
          key: "VTSG",
          align: "center",
          width: 150
        },
        {
          title: "总转介绍客户目标",
          key: "ZJS",
          align: "center",
          width: 150
        },
        {
          title: "审核状态",
          key: "Status",
          align: "center"
        },
        {
          title: " ",
          key: "",
          align: "center"
        }
      ],
      list: [],
      storeList: [],
      columns2: [
        {
          title: "员工姓名",
          key: "EmployeeName",
          align: "center"
        },
        {
          title: "年份",
          key: "Year",
          align: "center"
        },
        {
          title: "月份",
          key: "Month",
          align: "center"
        },
        {
          title: "业绩目标",
          key: "Performance",
          align: "center"
        },
        {
          title: "护理客目标",
          key: "NG",
          align: "center"
        },
        {
          title: "回访目标",
          key: "VG",
          align: "center"
        },
        {
          title: "回访到店目标",
          key: "VTSG",
          align: "center"
        },
        {
          title: "转介绍目标",
          key: "ZJS",
          align: "center"
        },
        {
          title: "状态",
          key: "Status",
          align: "center"
        }
      ],
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
    getRowID(row) {
      let that = this;
      that.rowID = row.StoreId;
      that.Status = row.Status;
      that.DateTime = moment(row.DateTime).format("YYYY-MM-DD");
    },
    clearRow(){
      let that = this;
      that.rowID ="";
    },
    ZDshenhe() {
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条数据");
      } else {
        that.modalSH = true;
      }
    },
    ok() {
      let that = this;
      let data = {
        EmployeeId: that.userMes.EmployeeID,
        Remark: that.SHjianyi,
        NursingPerformanceTarget: {}
      };
      data.NursingPerformanceTarget = {
        StoreId: that.rowID,
        Status: 4,
        DateTime: that.DateTime
      };
      api.GetStorePerformanceTargetAuditStep2(data).then(response => {
        if (response.error_code === "Success") {
          that.modalSH = false;
          that.SHjianyi = "";
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    cancel() {
      let that = this;
      let data = {
        EmployeeId: that.userMes.EmployeeID,
        Remark: that.SHjianyi,
        NursingPerformanceTarget: {}
      };
      data.NursingPerformanceTarget = {
        StoreId: that.rowID,
        Status: 5,
        DateTime: that.DateTime
      };
      api.GetStorePerformanceTargetAuditStep2(data).then(response => {
        if (response.error_code === "Success") {
          that.modalSH = false;
          that.SHjianyi = "";
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    TuBioacancel() {
      let that = this;
      that.modalSH = false;
      that.SHjianyi = "";
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
        that.clearRow();
        let userMessage = JSON.parse(localStorage.userMessage);
        that.formItem.EmployeeID = userMessage.EmployeeID;
        that.formItem.page = that.tablePage.page;
        that.formItem.size = that.tablePage.pageNum;
        let data = {
          EmployeeId: userMessage.EmployeeID,
          AreaId: that.formItem.StoreID,
          StartDate: that.formItem.StartDate,
          EndDate: that.formItem.EndDate
          //   Key: that.formItem.Key
          //   PageIndex: that.formItem.page,
          //   PageSize: that.formItem.size
        };
        if (data.StartDate) {
          data.StartDate = moment(data.StartDate).format("YYYY-MM");
          that.formItem.StartDate = data.StartDate;
        }
        if (data.EndDate) {
          data.EndDate = moment(data.EndDate).format("YYYY-MM");
          that.formItem.EndDate = data.EndDate;
        }
        that.tableLoading = true;
        api.GetStorePerformanceTarget(data).then(response => {
          if (response.error_code === "Success") {
            let res = response.data;
            for (let i = 0; i < res.length; i++) {
              res[i].Status=that.setStatus(res[i].Status);
            }
            that.list = res;
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
    // 获取区域
    getStore() {
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        sCity: ""
      };
      api.NewGetAllCityInfo(data).then(response => {
        if (response.error_code === "Success") {
          that.storeList = response.data.list;
          //   that.formItem.store = that.userMes.StoreName;
          //   that.formItem.StoreID = that.userMes.StoreID;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    choose(name, id) {
      this.formItem.StoreID = id;
    },
    setStatus(status){
      var result="";
      switch (status) {
        case 1:result= "待审核"; break;
        case 2:result= "门店经理审核通过"; break;
        case 3:result= "门店经理审核不通过"; break;
        case 4:result= "区域经理审核通过"; break;
        case 5:result= "区域经理审核不通过"; break;
        default:
          break;
      }
      return result;
    },
    GetGlobDetail(){
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条数据");
      } else {
        that.detail = true;
        let data = {
          storeId: that.rowID,
          dateTime:that.DateTime
        };
        api.GetWaitAuditDetail(data).then(response => {
          if (response.error_code === "Success") {
            let res = response.data;
            for (let i = 0; i < res.length; i++) {
              res[i].Status=that.setStatus(res[i].Status);
              res[i]["NG"] = res[i].OtherTargets.NG;
              res[i]["VG"] = res[i].OtherTargets.VG;
              res[i]["VTSG"] = res[i].OtherTargets.VTSG;
              res[i]["ZJS"] = res[i].OtherTargets.ZJS;
            }
            that.detailList = res;
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
      that.getStore();
    });
  }
};
</script>
<style>
</style>

