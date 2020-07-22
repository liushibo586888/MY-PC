<template>
    <div class="dzgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 动作名称 -->
                    <i-col span="3">
                        <FormItem prop="name">
                            <Input v-model="formItem.name" placeholder="动作名称"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="21">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="getList">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
                            <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" @on-current-change="getRowID" ref="mainTable"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
        </div>
        <!-- 新增弹窗 -->
        <Modal :mask-closable="false" v-model="modal1" class="dialog" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ControllerID" label="所属控制器编号：" :rules="formValidateRule.ControllerID">
                            <Select v-model="formValidate.ControllerID" placeholder="请输入">
                                <Option :value="item.ID" v-for="(item, index) in dropDownList" :key="index">{{item.Name}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="OrderNumber" label="排序序号：" :rules="formValidateRule.OrderNumber">
                            <Input v-model="formValidate.OrderNumber" placeholder="请输入" number></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Action" label="动作：" :rules="formValidateRule.Action">
                            <Input v-model="formValidate.Action" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ActionType" label="权限类型：" :rules="formValidateRule.ActionType">
                            <Select v-model="formValidate.ActionType" placeholder="请输入">
                                <Option :value="0">正常权限</Option>
                                <Option :value="1">附加权限</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ActionName" label="动作名称：" :rules="formValidateRule.ActionName">
                            <Input v-model="formValidate.ActionName" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>

                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ApiUrl" label="调用api地址:" :rules="formValidateRule.ApiUrl">
                            <Input v-model="formValidate.ApiUrl" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="LinkType" label="动作类型：">
                            <!-- <FormItem prop="LinkType" label="动作类型：" :rules="formValidateRule.LinkType"> -->
                            <Select v-model="formValidate.LinkType" placeholder="请输入" :clearable="true">
                                <Option :value="item.ID" v-for="(item, index) in actionDropDownList" :key="index">{{item.Name}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="RequestMethod" label="请求方式：" :rules="formValidateRule.RequestMethod">
                            <Input v-model="formValidate.RequestMethod" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ActionDescription" label="动作描述：">
                            <Input v-model="formValidate.ActionDescription" placeholder="请输入" type="textarea"></Input>
                        </FormItem>
                    </i-col>
                </row>
            </Form>
            <div slot="footer" class="footer">
                <Button type="primary" class="btn" @click="addForm" :loading='uploading'>保存</Button>
                <Button type="warning" class="btn" @click="resetForm">取消</Button>
            </div>
        </Modal>
        <!-- ** -->
    </div>
</template>
<script>
import superManager from "@/api/super.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      rowID: null,
      tableLoading: false,
      uploading: false,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 200,
      modalTitle: "修改",
      modal1: false,
      // 添加弹窗用
      formValidate: {
        ControllerID: "",
        OrderNumber: "",
        Action: "",
        ActionType: "",
        ActionName: "",
        ApiUrl: "",
        LinkType: "",
        RequestMethod: ""
      },
      formValidateRule: {
        ControllerID: {
          required: true,
          message: "所属控制器编号不得为空",
          trigger: "blur",
          type: "number"
        },
        OrderNumber: {
          required: true,
          message: "排序序号不得为空",
          trigger: "blur",
          type: "number"
        },
        Action: { required: true, message: "动作不得为空", trigger: "blur" },
        ActionType: {
          required: true,
          message: "权限类型不得为空",
          trigger: "blur",
          type: "number"
        },
        ActionName: {
          required: true,
          message: "动作名称不得为空",
          trigger: "blur"
        },
        ApiUrl: {
          required: true,
          message: "调用api地址不得为空",
          trigger: "blur"
        },
        LinkType: {
          required: true,
          message: "动作类型不得为空",
          trigger: "blur",
          type: "number"
        },
        RequestMethod: {
          required: true,
          message: "请求方式不得为空",
          trigger: "blur"
        }
      },
      formItem: {
        name: ""
      },
      columns1: [
        {
          title: "动作",
          key: "Action",
          align: "center"
        },
        {
          title: "动作名称",
          key: "ActionName",
          align: "center"
        },
        {
          title: "动作链接",
          key: "ApiUrl",
          align: "center"
        },
        {
          title: "动作类型",
          key: "LinkTypeName",
          align: "center"
        },
        {
          title: "所属控制器",
          key: "ControllerName",
          align: "center"
        },
        {
          title: "动作描述",
          key: "ActionDescription",
          align: "center",
          render: (h, parmas) => {
            if (!parmas.row.ActionDescription) {
              return "";
            }
            let text =
              parmas.row.ActionDescription.length > 8
                ? parmas.row.ActionDescription.substr(0, 7) + "..."
                : parmas.row.ActionDescription;
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(parmas.row.ActionDescription);
                  }
                }
              },
              text
            );
          }
        }
      ],
      list: [],
      dropDownList: [],
      actionDropDownList: []
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
    },
    setAuthorAdd() {
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "增加") {
            return i.IsVisible;
            break;
          }
        }
      }
      return false;
    },
    setAuthorEdit() {
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "修改") {
            return i.IsVisible;
            break;
          }
        }
      }
      return false;
    }
  },
  methods: {
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    searchCustomerTel() {
      let that = this;
      that.$refs.searchTelForm.validate(validate => {
        if (validate) {
          // 搜索...
          that.$refs.searchTelForm.resetFields();
          that.poupSearchTel = false;
          that.modal1 = true;
          that.modalTitle = "新增";
        } else {
          that.$Message.error("请输入用户的联系电话");
        }
      });
    },
    getRowID(row) {
      let that = this;
      that.rowID = row.ID;
    },
    getDetail(row) {
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.resetForm();
      that.$store.commit("changeLoadingPage");
      superManager.getActionsDetail(that.rowID).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code == "Success") {
          that.formValidate = {
            ID: response.data.ID,
            ControllerID: response.data.ControllerID,
            OrderNumber: response.data.OrderNumber,
            Action: response.data.Action,
            ActionType: response.data.ActionType,
            ActionName: response.data.ActionName,
            ApiUrl: response.data.ApiUrl,
            LinkType: response.data.LinkType,
            RequestMethod: response.data.RequestMethod
          };
          that.modal1 = true;
          that.modalTitle = "修改";
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    modefyMessage(data) {
      let that = this;
      let d = {
        ControllerID: that.formValidate.ControllerID,
        OrderNumber: that.formValidate.OrderNumber,
        Action: that.formValidate.Action,
        ActionType: that.formValidate.ActionType,
        ActionName: that.formValidate.ActionName,
        ApiUrl: that.formValidate.ApiUrl,
        LinkType: that.formValidate.LinkType,
        RequestMethod: that.formValidate.RequestMethod
      };
      superManager.modefyActions(data.ID, d).then(response => {
        if (response.error_code === "Success") {
          that.loading = false;
          that.$Message.success("修改成功");
          that.uploading = false;
          that.resetForm();
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.formValidate.ID = "";
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      that.uploading = true;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          if (that.formValidate.ID) {
            that.modefyMessage(that.formValidate);
            return false;
          }
          let data = that.formValidate;
          superManager.addActions(data).then(response => {
            if (response.error_code === "Success") {
              that.$Message.success("添加成功");
              that.uploading = false;
              that.modal1 = false;
              that.getList();
            } else {
              that.$Message.error(response.error_message);
            }
          });
        } else {
          setTimeout(() => {
            that.uploading = false;
          }, 1000);

          this.$Message.error("有必填项为空");
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
    getList() {
      let that = this;
      that.tableLoading = true;
      superManager.getActionsList(that.formItem).then(response => {
        that.tableLoading = false;
        if (response.error_code == "Success") {
          that.list = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
      that.setPage();
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    getDropDownList() {
      // 获取所属控制器分类编号
      let that = this;
      superManager.getControllerDropdownListData().then(response => {
        if (response.error_code == "Success") {
          that.dropDownList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getActionLinkTypeList() {
      let that = this;
      superManager.getLinkTypeDropdownListData().then(response => {
        if (response.error_code === "Success") {
          that.actionDropDownList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    showAddPoup() {
      let that = this;
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = "新建";
    },
    showRemark(text) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "详情",
        content: text
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
      that.getDropDownList();
      that.getActionLinkTypeList();
    });
  }
};
</script>
<style>
</style>
