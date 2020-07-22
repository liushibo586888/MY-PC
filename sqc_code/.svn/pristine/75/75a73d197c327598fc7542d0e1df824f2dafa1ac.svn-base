<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">

          <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="开始日期" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="结束日期" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="门店" :filterable="true">
                <!-- <Option value="all" @click.native="choose()">所有</Option> -->
                <Option v-for="item in storeList" :value="item.ID" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="customerName">
              <Input v-model="formItem.customerName" placeholder="客户姓名"></Input>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="CustomerPhone">
              <Input v-model="formItem.CustomerPhone" placeholder="电话"></Input>
            </FormItem>
          </i-col>
          <i-col span="9">
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
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
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
        CustomerPhone: "",
        customerName: "",
        StartDate: new Date(),
        EndDate: new Date(),
        store: "all",
        StoreID: null,
        EmployeeID: "",
        page: "",
        size: ""
      },
      columns1: [
        {
          title: "日期",
          key: "Date",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (!params.row.Date) {
              return h("div", {}, "");
            }
            return h("div", {}, moment(params.row.Date).format("YYYY-MM-DD"));
          }
        },
        {
          title: "客户姓名",
          key: "CustomerName",
          align: "center",
          width: 100
        },
        {
          title: "电话",
          key: "CustomerPhone",
          align: "center",
          width: 120
        },
        {
          title: "门店",
          key: "StoreName",
          align: "center",
          width: 150
        },
        {
          title: "单据类型",
          key: "DocType",
          align: "center",
          width: 120
        },
        {
          title: "顶级分类",
          key: "ItemCategoryName",
          align: "center",
          width: 150
        },
        {
          title: "项目分类",
          key: "ItemTopCategoryName",
          align: "center",
          width: 150
        },
        {
          title: "规格",
          key: "ItemStandard",
          align: "center",
          width: 100
        },
        {
          title: "单位",
          key: "ItemUnit",
          align: "center",
          width: 100
        },
        // {
        //   title: "数量",
        //   key: "num",
        //   align: "center",
        //   width: 100
        // },
        // {
        //   title: "单价",
        //   key: "price",
        //   align: "center",
        //   width: 100
        // },
        {
          title: "开单人",
          key: "ChargeByName",
          align: "center",
          width: 100
        },
        {
          title: "支付方式",
          key: "PayModeName",
          align: "center",
          width: 180
        },
        {
          title: "金额",
          key: "Amount",
          align: "center",
          width: 100
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
      let that = this;
      let userMessage = JSON.parse(localStorage.userMessage);
      that.formItem.EmployeeID = userMessage.EmployeeID;
      that.formItem.page = that.tablePage.page;
      that.formItem.size = that.tablePage.pageNum;
      let data = that.formItem;
      if (data.StartDate) {
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
        that.formItem.StartDate = data.StartDate;
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
        that.formItem.EndDate = data.EndDate;
      }
      // 判断电话
      if (data.CustomerPhone) {
        let regex = /^1\d{10}$/;
        if (!regex.test(data.CustomerPhone)) {
          that.$Message.error("电话号码格式有误");
          return false;
        }
      }
      if (!that.formItem.StoreID) {
        that.$Message.error("请选择门店后查询");
        return false;
      }
      that.tableLoading = true;
      api.paymentSchedule(that.formItem).then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          for (let i of res.list) {
            let phone = i.CustomerPhone;
            i.CustomerPhone =
              phone.substring(0, 3) + "****" + phone.substr(phone.length - 4);
          }
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
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
        //下面的代码不需要，不然会造成导出数据只有10条   (张奕伦 20181111)
        // ,
        // columns: that.columns1.filter((col, index) => index < (that.columns1.length - 1)),
        // data: that.list.filter((data, index) => index < (that.columns1.length - 1))
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
        } else {
          that.$Message.error(response.reason);
        }
      });
    },
    choose(name, id) {
      //   if (name === undefined && id === undefined) {
      //     this.formItem.store = "所有";
      //     this.formItem.StoreID = null;
      //   } else {
      this.formItem.store = name;
      this.formItem.StoreID = id;
      //   }
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