<template>
  <div class="qdxd-container container">
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
              <i-button type="primary" class="btn btn-search" @click="searchForm">搜索</i-button>
              <i-button type="warning" class="btn btn-reset" @click="resetSearch">重置</i-button>
              <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="showAdd">添加</i-button>
              <Dropdown transfer @on-click="addPoups" v-if="shortcutMenuIndex > 0">
                <Button type="primary" class="btn btn-add" :disabled="!rowPhone">
                  快捷菜单
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem name="0" :disabled="!rowPhone" v-if="canAddYygn">添加预约</DropdownItem>
                  <!-- <DropdownItem name="1" :disabled="!rowPhone" v-if="canAddTrackPlan">添加追踪计划</DropdownItem>
                                    <DropdownItem name="2" :disabled="!rowPhone" v-if="canAddTrackRecord">添加常规追踪</DropdownItem> -->
                </DropdownMenu>
              </Dropdown>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" :height="setTableHeight" ref="mainTable" stripe @on-current-change="getRowID" highlight-row></Table>
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
          <i-input v-model="searchTel.tel" placeholder="请输入用户的手机号" number autofocus ref="searchTel"></i-input>
        </Form-item>
      </Form>
      <div slot='footer' class="footer">
        <i-button type="primary" class="btn" @click="searchCustomerTel" :loading="loading">确定</i-button>
        <i-button type="warning" class="btn" @click="searchReset" :loading="loading">取消</i-button>
      </div>
    </Modal>
    <!-- 弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" class="dialog" :width="1000" v-if="showAdd">
      <div slot='header' class="header">
        新增
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="CustomerName" label="客户姓名：" :rules="formValidateRule.CustomerName">
              <Input v-model="formValidate.CustomerName" placeholder="姓名" :disabled="customerEnable"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="电话：" prop="CustomerPhone" :rules="formValidateRule.CustomerPhone">
              <Input v-model="formValidate.CustomerPhone" placeholder="电话" disabled></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem label="年龄：" prop="CustomerAge" v-if="customerEnable">
              <Input v-model="formValidate.CustomerAge" placeholder="年龄" disabled></Input>
            </FormItem>
            <FormItem label="年龄：" prop="CustomerAge" v-else>
              <InputNumber v-model="formValidate.CustomerAge" placeholder="年龄" style="width:100%;" :min="0"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="性别：" prop="CustomerSex">
              <Input v-model="formValidate.CustomerSex" placeholder="" v-if="customerEnable" disabled></Input>
              <Select v-model="formValidate.CustomerSex" v-else>
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem label="咨询项目：" prop="ConsultProjectID" :rules="formValidateRule.ConsultProjectID">
              <Select v-model="formValidate.ConsultProjectID" placeholder="请选择" filterable>
                <Option :value="item.ID" v-for="(item, index) in zxxmList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem label="咨询内容：" prop="ConsultContent" :rules="formValidateRule.ConsultContent">
              <Input v-model="formValidate.ConsultContent" placeholder="咨询内容" type="textarea"></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between" v-if="!customerEnable">
          <i-col span="11">
            <FormItem label="来源渠道：" prop="ChannelID" :rules="formValidateRule.ChannelID">
              <Select v-model="formValidate.ChannelID" placeholder="请选择" :disabled="customerEnable">
                <Option :value="item.ID" v-for="(item, index) in lyqdList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="网络来源：" prop="NetSourceID" :rules="formValidateRule.NetSourceID">
              <Select v-model="formValidate.NetSourceID" placeholder="请选择" :disabled="customerEnable">
                <Option :value="item.ID" v-for="(item, index) in wllyList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem label="预约日期：" prop="ReserveDate" :rules="formValidateRule.ReserveDate">
              <DatePicker type="datetime" placeholder="预约日期" v-model="formValidate.ReserveDate" style="width:100%;" :editable="false"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem label="预约门店：" prop="ReserveStoreID" v-if="formValidate.ReserveDate">
              <Select v-model="formValidate.ReserveStoreID" :filterable="true" @on-change="chooseYymd" :disabled="customerEnable">
                <Option :value="item.ID" v-for="(item, index) in yymdList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
        <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
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
      canAddYygn: false,
      rowPhone: null,
      canAddTrackRecord: false,
      canAddTrackPlan: false,
      shortcutMenuIndex: 0,
      showAdd: false,
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
        CustomerID: "",
        CustomerName: "",
        CustomerPhone: "",
        CustomerAge: 0,
        CustomerSex: "",
        ReserveStoreID: "",
        ReserveDate: "",
        ConsultProjectID: "",
        ConsultContent: "",
        ChannelID: "",
        NetSourceID: ""
      },
      formValidateRule: {
        CustomerName: {
          required: true,
          message: "姓名不得为空",
          trigger: "blur"
        },
        CustomerPhone: {
          required: true,
          message: "电话不得为空",
          trigger: "blur",
          validator: validateTel
        },
        ConsultProjectID: {
          required: true,
          message: "咨询项目不得为空",
          trigger: "blur",
          type: "string"
        },
        ConsultContent: {
          required: true,
          message: "咨询内容不得为空",
          trigger: "blur"
        },
        ChannelID: {
          required: true,
          message: "来源渠道不得为空",
          trigger: "blur",
          type: "string"
        },
        NetSourceID: {
          required: true,
          message: "网络来源不得为空",
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
          title: "登记日期",
          key: "Date ",
          align: "center",
          width: 180,
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
          title: "客户状态",
          key: "CustomerStatusName",
          width: 100,
          align: "center"
        },
        {
          title: "客户姓名",
          key: "CustomerName",
          width: 100,
          align: "center"
        },
        {
          title: "年龄",
          key: "CustomerAge",
          width: 70,
          align: "center"
        },
        {
          title: "电话",
          width: 120,
          key: "CustomerPhone",
          align: "center"
        },
        {
          title: "网络来源",
          width: 120,
          key: "NetSource",
          align: "center"
        },
        {
          title: "预约门店",
          width: 120,
          key: "StoreName",
          align: "center"
        },
        {
          title: "预约日期",
          key: "ArrialDate",
          align: "center",
          width: 180,
          render: (h, params) => {
            if (!params.row.ArrialDate) {
              return "";
            }
            return h(
              "div",
              {},
              moment(params.row.ArrialDate).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "咨询项目",
          width: 100,
          key: "ConsultProject",
          align: "center"
        },
        {
          title: "咨询内容",
          width: 100,
          key: "ConsultContent",
          align: "center",
          render: (h, params) => {
            if (!params.row.ConsultContent) {
              return "";
            }
            let text = params.row.ConsultContent.substr(0, 6);
            if (params.row.ConsultContent.length >= 7) {
              text += "...";
            }
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(params.row.ConsultContent);
                  }
                }
              },
              text
            );
          }
        },
        {
          title: "咨询人",
          width: 100,
          key: "ConsultingByName",
          align: "center"
        },
        {
          title: " ",
          key: "null",
          align: "center"
        }
      ],
      list: [],
      wllyList: [],
      lyqdList: [],
      zxxmList: [],
      yymdList: []
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
    setShortcutMenuAuthor() {
      let that = this;

      //预约(快捷菜单权限验证)
      let list1 = that.authorList["yygn"];
      if (list1) {
        for (let i of list1) {
          if (i.Name === "增加") {
            that.shortcutMenuIndex++;
            that.canAddYygn = i.IsVisible;
          }
        }
      } else {
        console.log("list不存在");
      }

      // //追踪计划(快捷菜单权限验证)
      // let list2 = that.authorList['trackPlan']
      // if (list2) {
      //     for (let i of list2) {
      //         if (i.Name === '增加') {
      //             that.shortcutMenuIndex++
      //             that.canAddTrackPlan = i.IsVisible
      //         }
      //     }
      // }

      // //常规追踪(快捷菜单权限验证)
      // let list3 = that.authorList['trackRecord']
      // if (list3) {
      //     for (let i of list3) {
      //         if (i.Name === '增加') {
      //             that.shortcutMenuIndex++
      //             that.canAddTrackRecord = i.IsVisible
      //         }
      //     }
      // }

      that.setShortcutMenuIndex = 0;
    },
    getRowID(row) {
      let that = this;
      that.rowID = row.ID;
      that.rowPhone = row.truePhone;
    },
    addPoups(name) {
      let that = this;
      let type = Number(name);
      if (type == 0) {
        that.$router.push({
          name: "yygn",
          params: {
            phone: that.rowPhone
          }
        });
        return false;
      }
      // if (type == 1) {
      //     that.$router.push({
      //         name: 'trackPlan',
      //         params: {
      //             phone: that.rowPhone
      //         }
      //     })
      //     return false
      // }
      // if (type == 2) {
      //     that.$router.push({
      //         name: 'trackRecord',
      //         params: {
      //             phone: that.rowPhone
      //         }
      //     })
      //     return false
      // }
    },
    showAddPoup() {
      let that = this;
      that.$refs.searchTelForm.resetFields();
      that.poupSearchTel = true;
      that.$nextTick(() => {
        that.$refs.searchTel.focus();
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
    chooseYymd() {
      let that = this;
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
          let data = that.formValidate;
          if (data.ReserveDate) {
            data.ReserveDate = moment(data.ReserveDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          if (data.ReserveStoreID === "无") {
            data.ReserveStoreID = "";
          }
          data.consultBy = that.userMes.EmployeeID;
          that.loading = true;
          // let day = that.formValidate.ReserveDate
          // that.formValidate.ReserveDate = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
          api.onlineOrders(data).then(response => {
            that.loading = false;
            if (response.error_code === "Success") {
              that.$refs.formValidate1.resetFields();
              that.getList();
              that.modal1 = false;
              that.$Message.success("添加成功");
            } else {
              this.$Message.error(response.error_message);
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
            that.modal1 = true;
          });
          that.$refs.searchTelForm.resetFields();
        } else {
          that.$Message.error("请输入用户的联系电话");
        }
      });
    },
    setData(res) {
      let that = this;
      that.formValidate.CustomerName = res.Name;
      that.formValidate.CustomerAge = res.Age ? res.Age : "";
      that.formValidate.CustomerPhone = res.Phone ? res.Phone : "无";
      that.formValidate.CustomerSex = res.Sex ? res.Sex : "无";
      that.formValidate.ReserveStoreID = res.StoreID ? res.StoreID : "无";
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
        CustomerName: that.formItem.userName,
        CustomerPhone: that.formItem.userTel,
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      // 判断电话
      if (data.CustomerPhone) {
        let regex = /^1\d{10}$/;
        if (!regex.test(data.CustomerPhone)) {
          that.$Message.error("电话号码格式有误");
          return false;
        }
      }
      // 转换日期
      if (data.StartDate) {
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
      }
      that.tableLoading = true;
      api.onlineOrdersGetList(data).then(response => {
        that.tableLoading = false;
        if (response.error_code === "Success") {
          let res = response.data;
          for (let i of res.list) {
            let phone = i.CustomerPhone;
            i.truePhone = phone;
            i.CustomerPhone =
              phone.substring(0, 3) + "****" + phone.substr(phone.length - 4);
          }
          that.list = res.list;

          that.page = res.page;
          that.tablePage.allNum = res.total;
          that.tablePage.maxPageNum = res.totalPage;
          that.setPage();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getLyqdList() {
      let that = this;
      api.getValidChannels().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.lyqdList = res.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getProjectList() {
      let that = this;
      api.getValidSubCategories().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.zxxmList = res.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getWllyList() {
      let that = this;
      api.getNetSourcesByValid().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.wllyList = res.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getStoreList() {
      let that = this;
      api.getValidStores().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.yymdList = res.list;
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
      that.setShortcutMenuAuthor();
      that.setAuthor();
      that.initTableHeight();
      that.getList();
      that.getLyqdList();
      that.getProjectList();
      that.getWllyList();
      that.getStoreList();
    });
  }
};
</script>
<style>
</style>