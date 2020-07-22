<template>
    <div class="customerPerformance-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
                <row :gutter="20">
                    <i-col span="3">
                        <formItem prop="startDate">
                            <DatePicker type="date" class="DatePicker_time" :options="options1" placeholder="开始日期" v-model="formItem.startDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="3">
                        <formItem prop="endDate">
                            <DatePicker type="date" class="DatePicker_time" :options="options1" placeholder="结束日期" v-model="formItem.endDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem prop="store">
                            <Select v-model="formItem.StoreID" placeholder="区域" :filterable="true">
                                <Option v-for="item in storeList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="15">
                        <formItem class="btn-box">
                            <i-button type="primary" class="btn" @click="searchForm">搜索</i-button>
                            <i-button type="warning" class="btn" @click="resetSearch">重置</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="tableName">家居化妆品报表</div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import api from "@/api/index.js";
import storejs from "storejs";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      options1: echartsCommon.shortcuts(), //时间回到今天
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableLoading: false,
      loading: false,
      tableHeight: 40,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userTel: "",
        userName: "",
        StoreID: ""
      },
      storeList: [],
      columns1: [
        // {
        //     title: '物资分类ID',
        //     sortable: true,
        //     width: 200,
        //     key: 'GoodsCategoryID',
        //     align: 'center'
        // },
        // {
        //     title: '家居化妆品报表',
        //     align: 'center',
        //     children: [
        //         {
        //             title: '物资分类',
        //             key: 'GoodsCategoryName',
        //             align: 'center',
        //             width: 200,
        //             sortable: true
        //         },
        //         {
        //             title: '现金业绩',
        //             key: 'CashAmount',
        //             width: 200,
        //             align: 'center',
        //             sortable: true
        //         },
        //         {
        //             title: '欠款金额',
        //             key: 'ArrearsAmount',
        //             align: 'center',
        //             width: 200,
        //             sortable: true
        //         }
        //     ]
        // },
        {
          title: "物资分类",
          // width: 200,
          sortable: true,
          key: "GoodsCategoryName",
          align: "center"
        },
        {
          title: "现金业绩",
          // width: 200,
          sortable: true,
          key: "CashAmount",
          align: "center"
        },
        {
          title: "欠款金额",
          key: "ArrearsAmount",
          sortable: true,
          // width: 200,
          align: "center"
        },
        {
          title: " ",
          width: 10
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows,
      authorList: state => state.app.authorList
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.getValidStoresNew(data).then(res => {
        if (res.error_code === "Success") {
          that.storeList = res.data.list;
          that.formItem.StoreID = that.userMes.StoreID;
          that.getList();
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    setAuthor() {
      // 判断用户是否有查看客户详情权限
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "增加") {
            that.showAdd = i.IsVisible;
          }
        }
      }
    },
    showRemark(text) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "详情",
        content: text
      });
    },
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
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
      that.tablePage.page = 1;
      that.getList();
    },
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById("tableBox").offsetHeight;
      window.onresize = function() {
        // that.tableHeight = document.getElementById('tableBox').offsetHeight
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
      let data = {
        EmployeeID: that.userMes.EmployeeID,
        StartDate: that.formItem.startDate,
        EndDate: that.formItem.endDate,
        StoreID: that.formItem.StoreID
      };
      // // 转换日期
      data.StartDate = echartsCommon.changeTime(data.StartDate);
      data.EndDate = echartsCommon.changeTime(data.EndDate);

      that.tableLoading = true;
      api.getHomeMakeUpReport(data).then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
          that.tableLoading = false;
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
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.setAuthor();
      that.initTableHeight();
      that.getStore();
    });
  }
};
</script>
<style>
.customerPerformance-container .ivu-table-sort {
  /*overflow: auto;*/
  overflow: visible;
}
.customerPerformance-container .ivu-table-sort i {
  font-size: 18px;
}
.customerPerformance-container .ivu-table-sort i:first-child {
  top: -2px;
}
.tableName {
  font-size: 20px;
  text-align: center;
  color: #79aa49;
  /* margin-bottom: 10px; */
}
</style>

