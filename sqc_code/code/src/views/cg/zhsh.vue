<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="24">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">刷 新</Button>
              <!-- <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button> -->
              <!-- <Button type="success" class="btn btn-search" @click="shenhe" :disabled='!rowData'>审核</Button> -->
              <!-- <Button type="error" class="btn btn-reset" @click="xiugai" :disabled='orStop'>修改</Button> -->
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable" @on-sort-change='sortChange' @on-row-click="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <!-- 修改弹窗 -->
    <Modal :mask-closable="false" v-model="modal" width="800" class="dialog">
      <div slot='close' class="close not-print" @click="quXiao">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <Form ref="formValidate1" @submit.native.prevent class="form">
        <row type="flex" style="font-weight:bold">
          <i-col span="24">
            <FormItem prop="" label="审核状态：">
              <RadioGroup v-model="radioTitle">
                <Radio label="1">
                  <Icon type="logo-apple"></Icon>
                  <span style="color:green">通过</span>
                </Radio>
                <Radio label="2">
                  <Icon type="logo-android"></Icon>
                  <span style="color:red">作废(删除此申请)</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>
      </Form>
      <Input v-model="Remark" placeholder="备注" type="textarea" :rows="4" style="margin-top:20px;" />
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="baoCun" :loading="onLoading">保存</Button>
        <!-- <Button class="btn" type="warning" @click="quXiao" :loading="onLoading">取消</Button> -->
      </div>
    </Modal>

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
      radioTitle: "0",
      Remark: "",
      options1: echartsCommon.shortcuts(), //时间回到今天
      onLoading: false,
      tableLoading: true,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      modal: false, //修改
      tableHeight: 40,
      rowData: "",
      orStop: true,
      formItem: {
        StartDate: new Date(),
        EndDate: new Date(),
        StoreID: null,
        EmployeeID: "",
        store: "all",
        page: "",
        size: ""
      },
      columns1: [
        {
          title: "门店",
          key: "StoreName",
          align: "center"
        },
        {
          title: "申请人",
          key: "EmployeeName",
          align: "center"
        },
        {
          title: "申请时间",
          key: "Date",
          align: "center",
          render: (h, params) => {
            return echartsCommon.DATE(h, params.row.Date);
          }
        },
        {
          title: "原手机号",
          key: "OldPhone",
          align: "center"
        },
        {
          title: "新手机号",
          key: "NewPhone",
          align: "center"
        },
        {
          title: "审核人",
          key: "AuthorizerName",
          align: "center"
        },
        {
          title: "审核时间",
          key: "AuthDate",
          align: "center",
          sortable: true,
          render: (h, params) => {
            return echartsCommon.DATE(h, params.row.AuthDate);
          }
        },
        {
          title: "状态",
          key: "AuthStatus",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {},
              params.row.AuthStatus == 0 ? "待审核" : "已审核"
            );
          }
        },
        {
          title: "备注",
          key: "Remark",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  attrs: {
                    //按钮禁用
                    disabled: params.row.AuthStatus == 0 ? false : true
                  },
                  style: {
                    color: params.row.AuthStatus != 0 ? "red" : "#ffffff"
                  },
                  on: {
                    click: () => {
                      this.doubleClick(params.row);
                    }
                  }
                },
                params.row.AuthStatus == 0 ? "待审核" : "已审核"
              )
            ]);
          }
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
    getRowID(row) {
      let that = this;
      that.rowData = row;
      if (row.AuthStatus != 0) {
      }
    },
    xiugai() {
      let that = this;
      that.modal = true;
      that.setData(that.rowData);
    },
    doubleClick(data) {
      let that = this;
      that.modal = true;
    },
    setData(res) {
      let that = this;
      that.radioTitle = res.AuthStatus;
      that.Remark = res.Remark;
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
    quXiao() {
      let that = this;
      that.radioTitle = "0";
      that.Remark = "";
      that.modal = false;
    },
    baoCun() {
      let that = this;
      that.onLoading = true;
      let data = {
        employeeId: that.userMes.EmployeeID,
        AuthConfirmID: that.rowData.ID,
        Remark: that.Remark,
        sType: that.radioTitle
      };
      if (data.sType == 0) {
        that.$Message.error("请选择审核状态");
        that.onLoading = false;
        return;
      }
      api.AuthConfirm(data).then(res => {
        if (res.error_code === "Success") {
          that.$Message.success("提交成功");
          that.getList();
          that.onLoading = false;
          that.quXiao();
        } else {
          that.$Message.error(res.error_message);
          that.onLoading = false;
          //   that.quXiao();
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
      setTimeout(() => {
        let that = this;
        let data = {
          employeeId: that.userMes.EmployeeID,
          page: that.tablePage.page,
          size: that.tablePage.pageNum
        };
        that.tableLoading = true;
        api.GetAuthConfirm(data).then(res => {
          if (res.error_code === "Success") {
            let resdata = res.data;
            that.list = resdata.list;
            that.tableLoading = false;
            that.page = resdata.page;
            that.tablePage.allNum = resdata.total;
            that.tablePage.maxPageNum = resdata.totalPage;
            that.setPage();
          } else {
            that.$Message.error(res.error_message);
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
    sortChange(data) {
      console.log(data.order);
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
      // that.getStore();
    });
  }
};
</script>
<style>
.ivu-table-cell .ivu-table-sort {
  width: 17px !important;
  height: 14px !important;
}
</style>

