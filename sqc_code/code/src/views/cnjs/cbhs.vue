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
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker type="date" placeholder="结束日期" class="DatePicker_time" :options="options1" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="门店" :filterable="true">
                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <!-- <i-col span="3">
                        <FormItem prop="userTel">
                            <Input v-model="formItem.userTel" placeholder="电话" />
                        </FormItem>
                    </i-col> -->
          <i-col span="15">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
              <!-- <Button type="success" class="btn btn-search" @click="searchForm">添加</Button>
                            <Button type="error" class="btn btn-reset" @click="resetSearch">修改</Button> -->
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
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
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
          title: "客户姓名",
          key: "CustomerName",
          align: "center"
        },
        {
          title: "电话",
          key: "CustomerPhone",
          align: "center",
          render: (h, params) => {
            return echartsCommon.CustomerPhone(params.row.CustomerPhone);
          }
        },
        {
          title: "项目名",
          key: "ItemName",
          align: "center"
        },
        {
          title: "执行日期",
          key: "Date",
          align: "center",
          render: (h, params) => {
            return echartsCommon.DATE(h, params.row.Date);
          }
        },
        {
          title: "成本",
          key: "Cost",
          align: "center"
        },
        {
          title: "收入",
          key: "AllTotal",
          align: "center"
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
          StoreId: that.formItem.StoreID,
          StartDate: that.formItem.StartDate,
          EndDate: that.formItem.EndDate,
          Page: that.tablePage.page,
          Size: that.tablePage.pageNum
        };
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
        api.GetListFinance(data).then(response => {
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

