<template>
    <div class="waitingStaff-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
                <row :gutter="20">
                    <!-- <i-col span="3">
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
                        <FormItem prop="userName">
                            <Input v-model="formItem.userName" placeholder="姓名"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem prop="userTel">
                            <Input v-model="formItem.userTel" placeholder="电话"></Input>
                        </FormItem>
                    </i-col> -->
                    <i-col span="24">
                        <formItem class="btn-box">
                            <!-- <i-button type="primary" class="btn" @click="searchForm">搜索</i-button> -->
                            <!-- <i-button type="warning" class="btn" @click="resetSearch">重置</i-button> -->
                            <i-button type="primary" class="btn btn-add" @click="changeMode(0)" v-if="showAdd">添加</i-button>
                            <i-button type="primary" class="btn btn-purple" @click="changeMode(1)" v-if="showEdit" :disabled="!rowID">修改</i-button>
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
        </div>
        <!-- 弹窗 -->
        <Modal :mask-closable="false" v-model="modal1" width="600" :scrollable="true" class="dialog check-dialog" v-if="showAdd || showEdit">
            <div slot='header' class="header not-print">
                {{setModelTitle}}
            </div>
            <div slot='close' class="close not-print">
                <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="140" @submit.native.prevent class="form">
                <div class="check-box">
                    <CheckboxGroup v-model="checkAllGroup" v-for="(item, index) in personList" :key="index" :class="{'active' : checkAllGroup.indexOf(item.ID) > -1}">
                        <div class="item-box">
                            <Checkbox :label="item.ID" @click="chooseSingleItem(item)">{{item.Name}}</Checkbox>

                        </div>
                    </CheckboxGroup>
                </div>
            </Form>
            <div slot="footer" class="footer not-print">
                <div class="all-check">
                    <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="chooseAllPerson">全选</Checkbox>
                </div>
                <Button class="btn" type="primary" @click="addForm" :loading="onLoading">保存</Button>
                <Button class="btn" type="warning" @click="resetForm" :loading="onLoading">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
const Decimal = require("decimal");
import Vue from "vue";
import storejs from "storejs";
import manager from "@/api/manager.js";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    const validateTel = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
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
      checkAllGroup: [],
      mode: 0, // 0增加 1修改
      showEdit: false,
      showAdd: false,
      showLook: false,
      modalTitle: "修改",
      // 确诊单ID
      onLoading: false,
      rowID: "",
      tabIndex: 0,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0,
        row: 10
      },
      tableHeight: 200,
      tableLoading: false,
      modal1: false,
      formValidate: {
        CustomerPhone: ""
      },
      formValidateRule: {
        HandleBy: { required: true, message: "请选择开单人", trigger: "blur" }
      },
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userTel: "",
        userName: ""
      },
      // 主表格行
      columns1: [
        {
          title: "创建日期",
          key: "Date",
          align: "center",
          render: (h, params) => {
            if (!params.row.Date) {
              return "";
            }
            return h("div", {}, moment(params.row.Date).format("YYYY-MM-DD"));
          }
        },
        {
          title: "创建人",
          key: "CreateByName",
          align: "center"
        },
        {
          title: "创建人部门",
          key: "DepartmentName",
          align: "center"
        },
        {
          title: "所属门店",
          key: "StoreName",
          align: "center"
        }
      ],
      list: [],
      personList: []
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
    },
    setModelTitle() {
      let that = this;
      switch (that.mode) {
        case 0:
          return "新增";
        case 1:
          return "修改";
        case 2:
          return "浏览";
      }
    },
    indeterminate() {
      // 设置全选样式
      let that = this;
      if (that.checkAllGroup.length <= 0) {
        return false;
      }
      if (that.checkAllGroup.length < that.personList.length) {
        return true;
      }
      return false;
    },
    checkAll() {
      let that = this;
      if (that.checkAllGroup.length == that.personList.length) {
        return true;
      }
      return false;
    }
  },
  methods: {
    checkAuthor() {
      let that = this;
      let name = that.$route.name;
      let list = that.authorList[name];
      for (let i of list) {
        if (i.Name === "增加") {
          that.showAdd = i.IsVisible;
        }
        if (i.Name === "浏览") {
          that.showLook = i.IsVisible;
        }
        if (i.Name === "修改") {
          that.showEdit = i.IsVisible;
        }
      }
    },
    changeMode(type) {
      let that = this;
      that.mode = type;
      if (type === 0) {
        that.modal1 = true;
      } else {
        if (!that.rowID) {
          that.$Message.error("先选择一条订单");
          return false;
        }
        that.getDetail();
      }
    },
    chooseRow(row) {
      // 选中某一行修改
      let that = this;
      that.rowID = row.ID;
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
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      that.tableLoading = true;
      manager.getShiftEmployeesList(data).then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
          that.tableLoading = false;
          that.$set(that.tablePage, "page", res.page);
          that.$set(that.tablePage, "allNum", res.total);
          that.$set(that.tablePage, "maxPageNum", res.totalPage);
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
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      let data = {
        CreateBy: that.userMes.EmployeeID,
        Details: []
      };
      for (let i of that.checkAllGroup) {
        let a = {
          EmployeeID: i
        };
        data.Details.push(a);
      }
      if (that.mode == 1) {
        that.modefyMessage(data);
        return false;
      }
      that.onLoading = true;
      manager.addShiftEmployees(data).then(response => {
        that.onLoading = false;
        if (response.error_code === "Success") {
          that.$Message.success("添加成功");
          that.resetForm();
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getPersonList() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      manager.getNeedScheduleEmployeesByEmployeeID(data).then(response => {
        if (response.error_code === "Success") {
          that.personList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    chooseAllPerson() {
      // 全选员工
      let that = this;
      if (!that.checkAll) {
        // 全选
        that.checkAllGroup = [];
        for (let i of that.personList) {
          that.checkAllGroup.push(i.ID);
        }
      } else {
        // 清空
        that.checkAllGroup = [];
      }
    },
    chooseSingleItem(item) {
      let that = this;
      let ID = item.ID;
      let arr = that.checkAllGroup;
      let index = arr.indexOf(ID);
      if (index > -1) {
        that.checkAllGroup.splice(index, 1);
      } else {
        that.checkAllGroup.push(ID);
      }
    },
    getDetail() {
      let that = this;
      that.$store.commit("changeLoadingPage");
      manager.getSingleShiftEmployees(that.rowID).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          that.checkAllGroup = [];
          for (let i of response.data.Detail) {
            let data = i.EmployeeID;
            that.checkAllGroup.push(data);
            that.modal1 = true;
          }
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    modefyMessage(data) {
      let that = this;
      that.onLoading = true;
      data.ID = that.rowID;
      manager.modefySingleShiftEmployees(that.rowID, data).then(response => {
        that.onLoading = false;
        if (response.error_code === "Success") {
          that.$Message.success("修改成功");
          that.resetForm();
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.checkAuthor();
      that.getList();
      that.getPersonList();
      that.initTableHeight();
    });
  }
};
</script>
<style>
.dialog .ivu-modal-body {
}
.pannel-title i:hover {
  cursor: pointer;
  color: #94bb6d;
}
.check-dialog .check-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.check-dialog .check-box > div {
  position: relative;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  width: 28%;
  height: 50px;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-right: 28px;
  border-right: 4px solid rgb(151, 151, 151);
}
.check-dialog .check-box > div.active {
  border-right: 4px solid rgb(137, 205, 70);
}
.check-dialog .footer {
  position: relative;
}
.check-dialog .all-check {
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
}
</style>

