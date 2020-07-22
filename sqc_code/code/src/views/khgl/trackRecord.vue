<template>
    <div class="trackRecord-container container">
        <Spin size="large" fix v-if="pageLoading"></Spin>
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
                            <i-button type="primary" class="btn" @click="searchForm" :loading="loading">搜索</i-button>
                            <i-button type="warning" class="btn" @click="resetSearch" :loading="loading">重置</i-button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup" :loading="loading" v-if="showAdd">添加</i-button>
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
        <!-- 查询电话号码弹窗 -->
        <Modal :mask-closable="false" v-model="poupSearchTel" class="dialog" v-if="showAdd">
            <div slot='header' class="header">
                请输入电话号码
            </div>
            <Form :model="searchTel" ref="searchTelForm" @submit.native.prevent="searchCustomerTel">
                <Form-item prop="tel" :rules="searchRule.tel">
                    <i-input v-model="searchTel.tel" placeholder="请输入用户的手机号" autofocus ref="searchTel"></i-input>
                </Form-item>
            </Form>
            <div slot='footer' class="footer">
                <i-button class="btn-sure" type="primary" @click="searchCustomerTel" :loading="loading">确定</i-button>
                <i-button class="btn-cancel" type="warning" @click="searchReset" :loading="loading">取消</i-button>
            </div>
        </Modal>
        <!-- 弹窗 -->
        <Modal :mask-closable="false" v-model="modal1" class="dialog" v-if="showAdd">
            <div slot='header' class="header">
                新增
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="84" @submit.native.prevent class="form">
                <FormItem prop="CustomerName" label="客户姓名">
                    <Input v-model="formValidate.CustomerName" placeholder="姓名" :disabled="true"></Input>
                </FormItem>
                <FormItem label="客户电话" prop="CustomerPhone">
                    <Input v-model="formValidate.CustomerPhone" placeholder="电话" :disabled="true"></Input>
                </FormItem>
                <FormItem label="客户年龄" prop="CustomerAge">
                    <Input v-model="formValidate.CustomerAge" placeholder="年龄" :disabled="true"></Input>
                </FormItem>
                <FormItem label="客户性别" prop="Sex">
                    <Input v-model="formValidate.CustomerSex" disabled></Input>
                </FormItem>
                <FormItem label="追踪主题" prop="Subject" :rules="formValidateRule.Subject">
                    <Input v-model="formValidate.Subject" placeholder="填写追踪主题"></Input>
                </FormItem>
                <FormItem label="追踪工具" prop="FollowUpToolID" :rules="formValidateRule.FollowUpToolID">
                    <Select v-model="formValidate.FollowUpToolID" placeholder="请选择">
                        <Option :value="item.ID" v-for="(item, index) in trackToolsList" :key="index">{{item.Name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="追踪状态" prop="FollowUpStatusID" :rules="formValidateRule.FollowUpStatusID">
                    <Select v-model="formValidate.FollowUpStatusID" placeholder="请选择">
                        <Option :value="item.ID" v-for="(item, index) in trackStatusList" :key="index">{{item.Name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="追踪内容" prop="TrackContent" :rules="formValidateRule.TrackContent">
                    <Input v-model="formValidate.TrackContent" placeholder="填写本次追踪内容..." type="textarea"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="footer">
                <i-button type="primary" class="btn" @click="addForm" :loading="loading">保存</i-button>
                <i-button type="warning" class="btn" @click="resetForm" :loading="loading">取消</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/index.js";
import storejs from "storejs";
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
      pageLoading: true,
      showAdd: false,
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
      tableLoading: true,
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
      modal1: false,
      customerEnable: false,
      formValidate: {
        FollowUpStatusID: "",
        FollowUpToolID: "",
        Subject: "",
        TrackContent: ""
      },
      formValidateRule: {
        FollowUpStatusID: {
          required: true,
          message: "请选择追踪状态",
          trigger: "blur",
          type: "string"
        },
        FollowUpToolID: {
          required: true,
          message: "请选择追踪工具",
          trigger: "blur",
          type: "string"
        },
        Subject: {
          required: true,
          message: "请填写追踪主题",
          trigger: "blur",
          type: "string"
        },
        TrackContent: {
          required: true,
          message: "请填写追踪内容",
          trigger: "blur",
          type: "string"
        }
      },
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userTel: "",
        userName: ""
      },
      columns1: [
        {
          title: "客户姓名",
          width: 100,
          key: "CustomerName",
          align: "center"
        },
        {
          title: "客户电话",
          width: 180,
          key: "CustomerPhone",
          align: "center",
          width: 180
        },
        {
          title: "追踪人",
          width: 180,
          key: "FollowUpByName",
          align: "center",
          width: 140
        },
        {
          title: "追踪日期",
          width: 180,
          key: "FollowUpDate",
          align: "center",
          render: (h, params) => {
            if (!params.row.FollowUpDate) {
              return "";
            }
            return h(
              "div",
              {},
              moment(params.row.FollowUpDate).format("YYYY-MM-DD")
            );
          }
        },
        {
          title: "追踪状态",
          width: 100,
          key: "FollowUpStatusName",
          align: "center"
        },
        {
          title: "追踪工具",
          width: 100,
          key: "FollowUpToolName",
          align: "center"
        },
        {
          title: "门店总监",
          width: 180,
          key: "SceneEmployeeName",
          align: "center"
        },
        {
          title: "追踪部门",
          width: 100,
          key: "DepartmentName",
          align: "center"
        },
        {
          title: "追踪门店",
          width: 180,
          key: "StoreName",
          align: "center"
        },
        {
          title: "追踪主题",
          width: 120,
          key: "Subject",
          align: "center"
        },
        {
          title: "追踪内容",
          width: 120,
          key: "FollowUpContent",
          align: "center",
          render: (h, params) => {
            if (!params.row.FollowUpContent) {
              return "";
            }
            let text = params.row.FollowUpContent.substr(0, 6);
            if (params.row.FollowUpContent.length >= 7) {
              text += "...";
            }
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(params.row.FollowUpContent);
                  }
                }
              },
              text
            );
          }
        },
        {
          title: " "
        }
      ],
      list: [],
      trackStatusList: [],
      trackToolsList: []
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
    showAddPoup() {
      let that = this;
      that.$refs.searchTelForm.resetFields();
      that.poupSearchTel = true;
      that.$nextTick(() => {
        that.$refs.searchTel.focus();
      });
    },
    showRemark(text) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "详情",
        content: text
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
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
      that.tablePage.page = 1;
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
          that.loading = true;
          let a = that.formValidate;
          let data = {
            CustomerID: a.CustomerID,
            Subject: a.Subject,
            FollowUpToolID: a.FollowUpToolID,
            FollowUpContent: a.TrackContent,
            FollowUpStatusID: a.FollowUpStatusID
          };
          data.FollowUpBy = that.userMes.EmployeeID;
          api.addRegularTrackRecord(data).then(response => {
            that.loading = false;
            if (response.error_code === "Success") {
              that.$Message.success("添加成功");
              that.$refs.formValidate1.resetFields();
              that.modal1 = false;
              that.getList();
            } else {
              that.$Message.error(response.error_message);
            }
          });
        } else {
          this.$Message.error("有必填项为空");
        }
      });
    },
    searchCustomerTel() {
      let that = this;
      that.$refs.searchTelForm.validate(validate => {
        if (validate) {
          // 搜索...
          let data = {
            CustomerPhone: that.searchTel.tel,
            EmployeeID: that.userMes.EmployeeID
          };
          that.loading = true;
          api.getCustomerByPhone(data).then(response => {
            let a = {
              Name: "",
              Age: "",
              Phone: data.CustomerPhone,
              CustomerSex: ""
            };
            that.loading = false;
            if (response.error_code === "Success") {
              that.formValidate.CustomerID = response.data.ID;
              a = response.data;
              that.customerEnable = true;
            } else {
              that.formValidate.CustomerID = "";
              that.customerEnable = false;
              that.$Message.error(response.error_message);
            }
            that.setData(a);
            that.poupSearchTel = false;
            that.$refs.searchTelForm.resetFields();
            that.modal1 = true;
          });
        } else {
          that.$Message.error("请输入用户的联系电话");
        }
      });
    },
    setData(res) {
      let that = this;
      that.formValidate.CustomerName = res.Name ? res.Name : "";
      that.formValidate.CustomerAge = res.Age ? res.Age : "";
      that.formValidate.CustomerPhone = res.Phone ? res.Phone : "无";
      that.formValidate.CustomerSex = res.Sex ? res.Sex : "无";
    },
    searchReset() {
      let that = this;
      that.$refs.searchTelForm.resetFields();
      that.poupSearchTel = false;
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
      that.tablePage = teblePage;
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
        size: that.tablePage.pageNum,
        EmployeeID: that.userMes.EmployeeID,
        startDate: that.formItem.startDate,
        endDate: that.formItem.endDate,
        CustomerName: that.formItem.userName,
        CustomerPhone: that.formItem.userTel,
        page: that.tablePage.page
      };
      if (data.CustomerPhone) {
        let regex = /^1\d{10}$/;
        if (!regex.test(data.CustomerPhone)) {
          that.$Message.error("电话号码格式有误");
          return false;
        }
      }
      that.tableLoading = true;
      // 转换日期
      if (data.startDate) {
        data.startDate = moment(data.startDate).format("YYYY-MM-DD");
      }
      if (data.endDate) {
        data.endDate = moment(data.endDate).format("YYYY-MM-DD");
      }
      api.getTrackRecordList(data).then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          for (let i of res.list) {
            let phone = i.CustomerPhone;
            i.CustomerPhone =
              phone.substring(0, 3) + "****" + phone.substr(phone.length - 4);
          }
          that.list = res.list;
          that.tableLoading = false;
          that.$set(that.tablePage, "page", res.page);
          // that.$set(that.tablePage, 'pageNum', res.size)
          that.$set(that.tablePage, "allNum", res.total);
          that.tablePage.maxPageNum = res.totalPage;
          that.setPage();
        } else {
          that.$Message.error(response.error_message);
          that.tableLoading = false;
        }
      });
    },
    getTrackToolsList() {
      let that = this;
      api.getTrackToolsList().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.trackToolsList = res.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getTrackStatusList() {
      let that = this;
      api.getTrackStatusList().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.trackStatusList = res.list;
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
      that.pageLoading = false;
      that.setAuthor();
      that.initTableHeight();
      that.getTrackToolsList();
      that.getTrackStatusList();
      that.getList();
    });
  },
  activated() {
    let that = this;
    that.$nextTick(() => {
      let phone = that.$route.params.phone;
      if (phone) {
        // 快捷菜单
        // 快捷菜单
        that.searchTel.tel = phone;
        // that.$store.commit('changeLoadingPage')
        setTimeout(() => {
          that.searchCustomerTel();
        }, 300);
      }
    });
  }
};
</script>
<style>
</style>