<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker type="date" placeholder="开始日期" class="DatePicker_time" :options="options1" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <!-- <i-col span="3">
                        <formItem prop="EndDate">
                            <DatePicker type="date" placeholder="结束日期" class="DatePicker_time" :options="options1" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col> -->
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.StoreID" placeholder="区域" :filterable="true">
                <Option v-for="item in storeList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="18">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable"></Table>
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
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      value1: "0",
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
        StoreID: 0,
        EmployeeID: "",
        userTel: "",
        store: "all"
      },
      columns1: [
        {
          title: "区域名称",
          key: "AreaName",
          width: 200,
          align: "center"
        },
        {
          title: "门店名称",
          key: "StoreName",
          width: 200,
          align: "center"
        },
        {
          title: "今日新客人数",
          key: "CJ_JRRS",
          width: 200,
          align: "center"
        },
        {
          title: "今日成交人数",
          key: "CJ_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "总新客人数",
          key: "CJ_ZRS",
          width: 200,
          align: "center"
        },
        {
          title: "总成交人数",
          key: "CJ_ZCJR",
          width: 200,
          align: "center"
        },
        {
          title: "总成交率",
          key: "CJ_ZCJL",
          width: 200,
          align: "center",
          render: (h, params) => {
            return echartsCommon.ToFixed(h, params.row.CJ_ZCJL, 2);
          }
        },
        {
          title: "今日收入",
          key: "YJ_JRSR",
          width: 200,
          align: "center"
        },
        {
          title: "总收入",
          key: "YJ_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "总客单",
          key: "YJ_ZKD",
          width: 200,
          align: "center"
        },
        {
          title: "今日祛痘新客",
          key: "QD_JRRS",
          width: 200,
          align: "center"
        },
        {
          title: "今日成交人数",
          key: "QD_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "总祛痘新客",
          key: "QD_ZRS",
          width: 200,
          align: "center"
        },
        {
          title: "总成交人数",
          key: "QD_ZCJR",
          width: 200,
          align: "center"
        },
        {
          title: "祛痘成交率",
          key: "QD_ZCJL",
          width: 200,
          align: "center"
        },
        {
          title: "祛痘总收入",
          key: "QD_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "祛痘客单",
          key: "QD_ZKD",
          width: 200,
          align: "center"
        },
        {
          title: "今日皮肤新客",
          key: "PF_JRRS",
          width: 200,
          align: "center"
        },
        {
          title: "今日成交人数",
          key: "PF_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "总皮肤新客",
          key: "PF_ZRS",
          width: 200,
          align: "center"
        },
        {
          title: "总成交人数",
          key: "PF_ZCJR",
          width: 200,
          align: "center"
        },
        {
          title: "皮肤成交率",
          key: "PF_ZCJL",
          width: 200,
          align: "center"
        },
        {
          title: "皮肤总收入",
          key: "PF_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "皮肤客单",
          key: "PF_ZKD",
          width: 200,
          align: "center"
        },
        {
          title: "今日新客收入",
          key: "XK_JRSR",
          width: 200,
          align: "center"
        },
        {
          title: "新客总收入",
          key: "XK_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "新客客单",
          key: "XK_ZKD",
          width: 200,
          align: "center"
        },
        {
          title: "今日成交人数",
          key: "GZK_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "累计成交人数",
          key: "GZK_ZCJ",
          width: 200,
          align: "center"
        },
        {
          title: "今日收入",
          key: "GZK_JRSR",
          width: 200,
          align: "center"
        },
        {
          title: "累计收入",
          key: "GZK_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "跟踪客客单",
          key: "GZK_ZKD",
          width: 200,
          align: "center"
        },
        {
          title: "老客--今日成交人次",
          key: "LK_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "老客--累计成交人次",
          key: "LK_ZCJ",
          width: 200,
          align: "center"
        },
        {
          title: "老客--今日收入",
          key: "LK_JRSR",
          width: 200,
          align: "center"
        },
        {
          title: "老客--累计收入",
          key: "LK_ZSR",
          width: 200,
          align: "center"
        },
        {
          title: "老客--升单客单",
          key: "LK_SDKD",
          width: 200,
          align: "center"
        },
        {
          title: "护理客--今日护理客",
          key: "HLK_JRCJ",
          width: 200,
          align: "center"
        },
        {
          title: "护理客--累计护理客",
          key: "HLK_ZCJ",
          width: 200,
          align: "center"
        },
        {
          title: "护理客--护理客新客比例",
          key: "HLK_JRSR",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--美团",
          key: "LYQD_XKMT",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--大众",
          key: "LYQD_XKDZ",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--口碑",
          key: "LYQD_XKKB",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--抖音",
          key: "LYQD_XKDY",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--快手",
          key: "LYQD_XKKS",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--新客--其他",
          key: "LYQD_XKQT",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--不算新客--自然	",
          key: "LYQD_QTZR",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--不算新客--转介绍	",
          key: "LYQD_QTZJS",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--不算新客--小程序	",
          key: "LYQD_QTXXC",
          width: 200,
          align: "center"
        },
        {
          title: "渠道--不算新客--霸王餐",
          key: "LYQD_QTBWC",
          width: 200,
          align: "center"
        },
        {
          title: "",
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
          EmployeeID: that.userMes.EmployeeID,
          AreaId: that.formItem.StoreID,
          DateTime: that.formItem.StartDate,
          Page: that.tablePage.page,
          Size: that.tablePage.pageNum
        };
        data.DateTime = echartsCommon.changeTime(data.DateTime);
        that.tableLoading = true;
        api.TotalReportV1(data).then(response => {
          if (response.error_code === "Success") {
            let res = response.data;
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
      var that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID,
        AreaId: that.formItem.StoreID,
        DateTime: that.formItem.StartDate
        // Page: that.tablePage.page,
        // Size: that.tablePage.pageNum
      };
      data.DateTime = echartsCommon.changeTime(data.DateTime);
      window.location.href =
        axios.defaults.baseURL +
        "/report/ExportAreaReport?DateTime=" +
        data.DateTime +
        "&AreaId=" +
        data.AreaId +
        "&EmployeeID=" +
        data.EmployeeID;
    },
    // exportTable() {
    //   let that = this;
    //   that.$refs.mainTable.exportCsv({
    //     filename: `${new Date().getTime()}${document.title}`
    //   });
    // },
    // 获取有效门店
    // getStore() {
    //   let that = this;
    //   let data = {
    //     EmployeeID: that.userMes.EmployeeID
    //   };
    //   api.getValidStoresNew(data).then(response => {
    //     if (response.error_code === "Success") {
    //       that.storeList = response.data.list;
    //       that.formItem.store = that.userMes.StoreName;
    //       that.formItem.StoreID = that.userMes.StoreID;
    //     } else {
    //       that.$Message.error(response.error_message);
    //     }
    //   });
    // },
    // 获取区域列表
    getStore() {
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        sCity: ""
      };
      api.NewGetAllCityInfo(data).then(response => {
        if (response.error_code === "Success") {
          that.storeList = response.data.list;
          that.storeList.unshift({ ID: 0, Name: "全国" });
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    choose(name, id) {
      this.formItem.store = name;
      this.formItem.StoreID = id;
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getStore();
      that.getList();
    });
  }
};
</script>
<style>
</style>

