<template>
  <div class="tf-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <formItem prop="startDate">
              <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="开始日期" v-model="formItem.startDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="endDate">
              <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="结束日期" v-model="formItem.endDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="userName">
              <Input v-model="formItem.userName" placeholder="姓名" />
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="userTel">
              <Input v-model="formItem.userTel" placeholder="电话" />
            </FormItem>
          </i-col>
          <i-col span="12">
            <formItem class="btn-box">
              <i-button type="primary" class="btn" @click="searchForm">搜索</i-button>
              <i-button type="warning" class="btn" @click="resetSearch">重置</i-button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" @on-current-change="chooseRow" ref="mainTable"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <!-- <div class="bottom-box">
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
    </div> -->
    <!-- 打印格式 -->
    <!-- <div class="print-box">
      <div class="storeName">{{userMes.PrintHeadString}}</div>
      <div class="storeName">{{userMes.StoreAlias}}</div>
      <div class="document-type">欠款回收单据 顾客联</div>
      <Row>
        <i-col span="12">
          <span class="print-name">顾客姓名：</span>
          <span class="print-key">{{formValidate.CustomerName}}</span>
        </i-col>
        <i-col span="12">
          <span class="print-name">电话：</span>
          <span class="print-key">{{formValidate.CustomerPhone}}</span>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <span class="print-name">日期：</span>
          <span class="print-key">{{getNowDay}}</span>
        </i-col>
      </Row>
      <div class="line"></div> -->
    <!-- ** -->
  </div>
</template>
<script>
const Decimal = require("decimal");
import api from "@/api/index.js";
// import storejs from 'storejs'
import Vue from "vue";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableLoading: false,
      tableHeight: 200,
      poupSearchTel: false,
      searchTel: {
        tel: ""
      },
      modal1: false,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userName: "",
        userTel: ""
      },
      columns1: [
        {
          title: "客户姓名",
          key: "CustName",
          align: "center"
        },
        {
          title: "欠款总金额",
          key: "ArrearsAmount",
          align: "center"
        },
        {
          title: "回款金额",
          key: "ReceivedAmount",
          align: "center"
        },
        {
          title: "剩余欠款",
          key: "SurplusArrears",
          align: "center",
          render: (h, params) => {
            if (params.row.SurplusArrears < 0) {
              return 0;
            }
            return h("div", {}, params.row.SurplusArrears);
          }
        },
        {
          title: " "
        }
      ],
      list: []
    };
  },

  computed: {
    getNowDay() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
    ...mapState({
      userMes: state => state.app.userMes,
      authorList: state => state.app.authorList,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },

  methods: {
    // 获取欠款回收记录列表
    getList() {
      let that = this;
      let data = {
        storeId: that.userMes.StoreID,
        startdate: that.formItem.startDate,
        enddate: that.formItem.endDate,
        custName: that.formItem.userName,
        sPhone: that.formItem.userTel,
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      // 转换日期
      if (data.startdate) {
        data.startdate = moment(data.startdate).format("YYYY-MM-DD");
      }
      if (data.enddate) {
        data.enddate = moment(data.enddate).format("YYYY-MM-DD");
      }
      that.tableLoading = true;
      // 获取列表
      api.getArrearsCustList(data).then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
          that.tableLoading = false;
          that.$set(that.tablePage, "page", res.page);
          that.$set(that.tablePage, "allNum", res.total);
          that.tablePage.maxPageNum = res.totalPage;
          that.setPage();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    // 选中某一行
    chooseRow(row) {
      let that = this;
      that.currentID = row.ID;
      that.currentPhone = row.CustomerPhone;
    },
    // 点击搜索
    searchForm() {
      let that = this;
      //判断两个时间段大小
     
      if (
        echartsCommon.ContrastTime(
          this.$Message,
          that.formItem.startDate,
          that.formItem.endDate
        )
      ) {
        that.tablePage.page = 1;
        that.getList();
      }
      //------------------
    },
    // 重置搜索框
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    // 设置table高度
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById("tableBox").offsetHeight;
      window.onresize = function() {
        that.tableHeight = document.getElementById("tableBox").offsetHeight;
      };
    },
    // 导出列表excel
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    // 打印页面
    printPage() {
      let that = this;
      that.modal1 = false;
      setTimeout(() => {
        window.print();
      }, 500);
    },
    // 设置页码
    setPage() {
      let that = this;
      let teblePage = that.tablePage;
      teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1;
      let endPage = teblePage.page * teblePage.pageNum;
      teblePage.endNum =
        endPage > teblePage.allNum ? teblePage.allNum : endPage;
    },
    // 上一页
    prevPage() {
      let that = this;
      if (that.tablePage.page <= 1) {
        that.$Message.error("已经是第一页");
        return false;
      }
      that.tablePage.page--;
      that.getList();
    },
    // 下一页
    nextPage() {
      let that = this;
      if (that.tablePage.page >= that.tablePage.maxPageNum) {
        that.$Message.error("已经是最后一页");
        return false;
      }
      that.tablePage.page++;
      that.getList();
    },
    // 填写页码变更第几页
    changePage() {
      let that = this;
      that.getList();
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
    });
  }
};
</script>