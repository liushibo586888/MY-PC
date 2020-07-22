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
                    <i-col span="15">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
                            <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
                            <Button type="success" class="btn btn-search" @click="shenhe" :disabled="showEdit">审核</Button>
                            <Button type="error" class="btn btn-reset" @click="shanchu" :disabled="showEdit">删除</Button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable" @on-current-change="chooseRow"></Table>
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
        <Modal :mask-closable="false" v-model="modal1">
            <div slot='close' class="close not-print">
                <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
            </div>
            <p style="text-align:center;fontWeight:900;fontSize:15px">你确定要审核吗？</p>
            <Input v-model="shenheYJ" type="textarea" :rows="4" placeholder="审核意见" />
            <div slot="footer" class="footer not-print">
                <Button class="btn" type="primary" @click="ok" :loading="onLoading">审核通过</Button>
                <Button class="btn" type="warning" @click="cancel" :loading="onLoading">驳回</Button>
            </div>
        </Modal>
        <!-- 删除弹窗 -->
        <Modal :mask-closable="false" v-model="modal2">
            <div slot='close' class="close not-print">
                <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
            </div>
            <p style="text-align:center;fontWeight:900;fontSize:15px">你确定要删除吗？</p>
            <Input v-model="shanchuYJ" type="textarea" :rows="4" placeholder="审核意见" />
            <div slot="footer" class="footer not-print">
                <Button class="btn" type="primary" @click="shnachuOk" :loading="onLoading">删除</Button>
                <Button class="btn" type="warning" @click="shnachuCancel" :loading="onLoading">取消</Button>
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
      options1: echartsCommon.shortcuts(), //时间回到今天
      tableLoading: true,
      onLoading: false,
      showEdit: true,
      rowID: "",
      Status: 0,
      shenheYJ: "",
      shanchuYJ: "",
      modal1: false,
      modal2: false,
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
        store: "all",
        page: "",
        size: ""
      },
      columns1: [
        {
          title: "门店名称",
          key: "StoreName",
          align: "center"
        },
        {
          title: "操作人",
          key: "EmployeeName",
          align: "center"
        },
        {
          title: "商品编码",
          key: "ProductNum",
          align: "center"
        },
        {
          title: "商品名称",
          key: "ProductName",
          align: "center"
        },
        {
          title: "购买项目名称",
          key: "ItemName",
          align: "center"
        },
        {
          title: "商品规格",
          key: "Standard",
          align: "center"
        },
        {
          title: "赠送数量",
          key: "Num",
          align: "center"
        },
        {
          title: "状态",
          key: "Status",
          align: "center",
          render: (h, params) => {
            if (params.row.Status == 1) {
              params.row.Status = "待审核";
            }
            if (params.row.Status == 2) {
              params.row.Status = "门店经理审核通过";
            }
            if (params.row.Status == 3) {
              params.row.Status = "门店经理审核不通过";
            }
            return h("div", {}, params.row.Status);
          }
        },
        {
          title: "日期",
          key: "CreateDate",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (!params.row.CreateDate) {
              return h("div", {}, "");
            }
            return h(
              "div",
              {},
              moment(params.row.CreateDate).format("YYYY-MM-DD")
            );
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
    chooseRow(row) {
      // 选中某一行修改
      let that = this;
      that.rowID = row.Id;
      if (that.rowID) {
        that.showEdit = false;
      }
    },
    shenhe() {
      let that = this;
      that.modal1 = true;
    },
    shenheTJ() {
      let that = this;
      let data = {
        Id: that.rowID,
        employeeId: that.userMes.EmployeeID,
        Status: that.Status,
        StoreId: that.userMes.StoreID,
        Remark: that.shenheYJ
      };
      that.onLoading = true;
      api.PresentGoodsAudit(data).then(response => {
        if (response.error_code == "Success") {
          that.onLoading = false;
          that.$Message.success(response.data);
          that.shenheYJ = "";
        } else {
          that.shenheYJ = "";
          that.onLoading = false;
          that.$Message.error(response.error_message);
        }
        that.modal1 = false;
        that.getList();
      });
    },
    //审核提示框
    ok() {
      //审核通过
      let that = this;
      that.Status = 2;
      that.shenheTJ();
    },
    cancel() {
      //审核驳回
      let that = this;
      that.Status = 3;
      that.shenheTJ();
    },
    shanchu() {
      let that = this;
      that.modal2 = true;
    },
    //删除提示框
    shnachuOk() {
      let that = this;
      let data = {
        Id: that.rowID,
        EmployeeId: that.userMes.EmployeeID,
        StoreId: that.userMes.StoreID,
        Remark: that.shanchuYJ
      };
      that.onLoading = true;
      api.StoreApplyGoodsAudit(data).then(response => {
        if (response.error_code == "Success") {
          that.onLoading = false;
          that.$Message.success(response.data);
          that.shanchuYJ = "";
        } else {
          that.shanchuYJ = "";
          that.onLoading = false;
          that.$Message.error(response.error_message);
        }
        that.modal2 = false;
        that.getList();
      });
    },
    shnachuCancel() {
      let that = this;
      that.modal2 = false;
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
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          that.$Message.success("添加成功");
          that.$refs.formValidate1.resetFields();
          that.modal1 = false;
        } else {
          this.$Message.error("姓名不得为空");
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
        that.formItem.page = that.tablePage.page;
        that.formItem.size = that.tablePage.pageNum;
        let data = {
          EmployeeId: that.userMes.EmployeeID,
          StoreId: that.formItem.StoreID,
          StartDate: that.formItem.StartDate,
          EndDate: that.formItem.EndDate,
          PageIndex: that.formItem.page,
          PageSize: that.formItem.size
        };
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");

        that.tableLoading = true;
        api.PresentGoodsgetList(data).then(response => {
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
  },
  activated() {
    //监听路由变化
    let that = this;
    that.$nextTick(() => {
      let name = that.$route.name;
      if (name) {
        that.getList();
      }
    });
  }
};
</script>
<style>
</style>

