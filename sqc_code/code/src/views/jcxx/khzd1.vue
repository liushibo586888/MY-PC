<!--转店申请-->
<template>
  <div class="khgl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
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
              <Input v-model="formItem.userName" placeholder="姓名"></Input>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="userTel">
              <Input v-model="formItem.userTel" placeholder="电话"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <formItem class="btn-box">
              <Button type="primary" class="btn" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn" @click="resetSearch">重置</Button>
              <i-button type="primary" class="btn btn-add" @click="searchCustomerTel" v-if="showAdd">审核</i-button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" :height="setTableHeight" @on-row-click="chooseRow" ref="mainTable" highlight-row></Table>
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
    <!-- 新增弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" class="dialog" v-if="showAdd" width="1200">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="5">
            <FormItem prop="CustomerName" label="客户姓名：" :rules="formValidateRule.CustomerName">
              <Input v-model="formValidate.CustomerName" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="CustomerPhone" label="电话：" :rules="formValidateRule.CustomerPhone">
              <Input v-model="formValidate.CustomerPhone" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="CustomerAge" label="年龄：" :rules="formValidateRule.CustomerAge">
              <Input v-model="formValidate.CustomerAge" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="CustomerSex" label="性别：" :rules="formValidateRule.CustomerSex">
              <Input v-model="formValidate.CustomerSex" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="CashBalance" label="预交金额：" :rules="formValidateRule.CashBalance">
              <Input v-model="formValidate.CashBalance" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="IntegrationBalance" label="积分余额：" :rules="formValidateRule.IntegrationBalance">
              <Input v-model="formValidate.IntegrationBalance" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="ArrearsBalance" label="欠款余额：" :rules="formValidateRule.ArrearsBalance">
              <Input v-model="formValidate.ArrearsBalance" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="HandselBalance" label="赠送余额：" :rules="formValidateRule.HandselBalance">
              <Input v-model="formValidate.HandselBalance" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="BeautyDirector" label="美肤总监：" :rules="formValidateRule.BeautyDirector">
              <Input v-model="formValidate.BeautyDirector" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem prop="oldStore" label="原所属门店：" :rules="formValidateRule.oldStore">
              <Input v-model="formValidate.oldStore" disabled></Input>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem prop="newStoreID" label="现所属门店：" :rules="formValidateRule.newStoreID">
              <!-- <Select v-model="formValidate.newStoreID" :filterable="true">
                                <Option v-for="item in storeList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                            </Select> -->
              <Input v-model="formValidate.newStoreID" disabled></Input>
            </FormItem>
          </i-col>

          <FormItem label="备注：" prop="Remark">
            <Input v-model="formValidate.Remark" placeholder="备注" type="textarea" :rows="4" style="width:1000px"></Input>
          </FormItem>

        </row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">通过</Button>
        <Button type="warning" class="btn" @click="resetAdd" :loading="loading">驳回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import api from "@/api/index.js";
import manager from "@/api/manager.js";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    const validateTel = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
      //   console.log("reg.test(value)", reg.test(value));
      if (value === "") {
        callback(new Error("手机号不得为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      status: 2,
      ID: "",
      currentID: "",
      showAdd: false,
      tableLoading: false,
      loading: false,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 200,
      poupSearchTel: false,
      searchTel: {
        tel: ""
      },
      searchRule: {
        tel: {
          required: true,
          message: "请输入正确的手机号码",
          trigger: "blur",
          type: "number",
          validator: validateTel
        }
      },
      modalTitle: "新增",
      phone: "",
      modal1: false,
      formValidate: {
        CustomerID: "",
        CustomerName: "",
        CustomerPhone: "",
        CustomerAge: "",
        CustomerSex: "",
        IntegrationBalance: "",
        CashBalance: "",
        ArrearsBalance: "",
        HandselBalance: "",
        BeautyDirector: "",
        oldStoreID: "",
        newStoreID: "",
        Remark: ""
      },
      formValidateRule: {
        name: {
          required: true,
          message: "姓名不得为空",
          trigger: "blur"
        },
        newStoreID: {
          required: true,
          message: "现所属门店不得为空",
          trigger: "blur"
        },
        Remark: {
          required: true,
          message: "备注不得为空",
          trigger: "blur"
        }
      },
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userName: "",
        userTel: ""
      },
      columns1: [
        {
          title: "登记日期",
          key: "Date",
          align: "center",
          render: (h, params) => {
            if (!params.row.Date) {
              return "";
            }
            return h(
              "div",
              {},
              moment(params.row.Date).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "电话",
          key: "CustomerPhone",
          align: "center"
        },
        {
          title: "客户姓名",
          key: "CustomerName",
          align: "center"
        },
        {
          title: "原所属门店",
          key: "OldStoreName",
          align: "center"
        },
        {
          title: "新所属门店",
          key: "NewStoreName",
          align: "center"
        },
        {
          title: "经手人",
          key: "HandleByName",
          align: "center"
        },
        {
          title: "备注",
          key: "Remark",
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
                    this.$Modal.success({
                      title: "提示",
                      content: parmas.row.Remark
                    });
                  }
                }
              },
              text
            );
          }
        },
        {
          title: " ",
          width: 10
        }
      ],
      list: [],
      storeList: []
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
    }
  },
  methods: {
    chooseRow(row) {
      // 选中某一行修改
      let that = this;
      that.currentID = row.CustomerId;
      that.ID = row.ID;
    },
    showAddPoup() {
      let that = this;
      that.poupSearchTel = true;
      that.$nextTick(() => {
        that.$refs.searchTel.focus();
      });
    },
    showAddFunc() {
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
    searchForm() {
      // 搜索表格
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
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
    },
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    setData(res) {
      let that = this;
      that.formValidate.CustomerID = res.ID;
      that.formValidate.CustomerName = res.CustomerName;
      that.formValidate.CustomerAge = res.Age;
      that.formValidate.CustomerSex = res.Sex;
      that.formValidate.CustomerPhone = res.Phone;
      that.formValidate.oldStore = res.OldStore;
      that.formValidate.newStoreID = res.NewStore;
      that.formValidate.BeautyDirector = res.BeautyDirector;
    },
    searchCustomerTel() {
      let that = this;
      that.modal1 = true;
      // // 搜索...
      let data = {
        // "CustomerPhone": that.searchTel.tel,
        applyID: that.ID,
        customerID: that.currentID
      };

      that.loading = true;
      api.getCustomerDetail1(data).then(response => {
        let a = {
          Name: "",
          Age: "",
          Phone: data.CustomerPhone,
          CustomerSex: ""
        };
        that.loading = false;
        that.formValidate.CustomerID = response.data.ID;
        a = response.data;
        that.customerEnable = true;
        that.setData(a);
        that.poupSearchTel = false;
        that.modal1 = true;
        that.formValidate.IntegrationBalance = response.data.IntegrationBalance;
        that.formValidate.CashBalance = response.data.CashBalance;
        that.formValidate.ArrearsBalance = response.data.ArrearsBalance;
        that.formValidate.HandselBalance = response.data.HandselBalance;
      });
    },
    searchReset() {
      let that = this;
      that.poupSearchTel = false;
    },
    modefyMessage(row) {
      let that = this;
      /*
         * 修改用户信息 todo
         */
      that.modal1 = true;
      that.modalTitle = "修改";
    },
    resetAdd() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
      that.status = 2;
    },
    addForm() {
      let that = this;
      that.status = 1;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          that.loading = true;
          let data = {
            EmployeeID: that.userMes.EmployeeID,
            //CustomerID: that.formValidate.CustomerID,
            // NewStoreID: that.formValidate.newStoreID,
            AuditRemark: that.formValidate.Remark,
            ID: that.ID,
            CustomerID: that.currentID,
            Status: that.status
          };
          api.ChangeStore(data).then(response => {
            that.loading = false;
            if (response.error_code === "Success") {
              that.$Message.success("审核成功");
              that.resetForm();
              that.getList();
            } else {
              this.$Message.error(response.error_message);
            }
          });
        } else {
          this.$Message.error("有必填项为空");
        }
      });
    },
    getStoreList() {
      let that = this;
      api.getValidStores().then(response => {
        if (response.error_code === "Success") {
          that.storeList = response.data.list;
        } else {
          this.$Message.error(response.error_message);
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
      let data = {
        EmployeeID: that.userMes.EmployeeID,
        startDate: that.formItem.startDate,
        endDate: that.formItem.endDate,
        CustomerName: that.formItem.userName,
        CustomerPhone: that.formItem.userTel,
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      // 转换日期
      if (data.startDate) {
        data.startDate = moment(data.startDate).format("YYYY-MM-DD");
      }
      if (data.endDate) {
        data.endDate = moment(data.endDate).format("YYYY-MM-DD");
      }
      if (data.CustomerPhone) {
        let regex = /^1\d{10}$/;
        if (!regex.test(data.CustomerPhone)) {
          that.$Message.error("电话号码格式有误");
          return false;
        }
      }
      that.tableLoading = true;
      manager.getCustomerTransferList(data).then(response => {
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
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.showAddFunc();
      that.initTableHeight();
      that.getList();
      that.getStoreList();
    });
  }
};
</script>
<style>
</style>