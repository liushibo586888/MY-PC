<template>
  <div class="yggl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
        <row :gutter="20">
          <!-- 部门名称 -->
          <i-col span="3">
            <FormItem prop="Name">
              <Input v-model="formItem.Name" placeholder="部门名称"></Input>
            </FormItem>
          </i-col>
          <!-- 部门类型 -->
          <!-- <i-col span="3"> -->
          <!-- <FormItem prop="DepartmentTypeID">
                            <Select v-model="formItem.DepartmentTypeID" placeholder="部门类型">
                                <Option value="">全部</Option>
                                <Option v-for="item in bmList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                            </Select>
                        </FormItem> -->
          <!-- </i-col> -->
          <i-col span="21">
            <formItem class="btn-box">
              <Button type="primary" class="btn" @click="searchList">搜索</Button>
              <Button type="warning" class="btn" @click="resetSearch">重置</Button>
              <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
              <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" :height="setTableHeight" highlight-row ref="mainTable" @on-current-change="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <!-- 新增弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" class="dialog" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <FormItem prop="Name" label="部门名称：" :rules="formValidateRule.Name">
          <Input v-model="formValidate.Name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem prop="SimpleCode" label="名称简码：" :rules="formValidateRule.SimpleCode">
          <Input v-model="formValidate.SimpleCode" placeholder="请输入"></Input>
        </FormItem>
        <FormItem prop="DepartmentTypeID" label="部门类型：" :rules="formValidateRule.DepartmentTypeID">
          <Select v-model="formValidate.DepartmentTypeID" :disabled="modalTitle == '修改'">
            <Option v-for="item in bmList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="Remark" label="备注：">
          <Input v-model="formValidate.Remark" placeholder="请输入" type="textarea"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
        <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
      </div>
    </Modal>
    <!-- ** -->
  </div>
</template>
<script>
import manager from "@/api/manager.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      rowID: null,
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
      modalTitle: "修改",
      modal1: false,
      // 添加弹窗用
      formValidate: {
        Name: "",
        SimpleCode: "",
        DepartmentTypeID: "",
        Remark: ""
      },
      formValidateRule: {
        Name: { required: true, message: "部门名称不得为空", trigger: "blur" },
        SimpleCode: {
          required: true,
          message: "名称简码不得为空",
          trigger: "blur"
        },
        DepartmentTypeID: {
          required: true,
          message: "部门类型不得为空",
          trigger: "blur",
          type: "number"
        }
      },
      formItem: {
        Name: "",
        Valid: ""
      },
      columns1: [
        {
          title: "部门名称",
          key: "Name",
          align: "center"
        },
        {
          title: "部门类型",
          key: "DepartmentTypeName",
          align: "center"
        },
        {
          title: "名称简码",
          key: "SimpleCode",
          align: "center"
        },
        {
          title: "备注",
          key: "Remark",
          width: 140,
          align: "center",
          render: (h, parmas) => {
            let text = parmas.row.Remark;
            if (text && text.length > 8) {
              text = text.substr(0, 7) + "...";
            }
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(parmas.row.Remark);
                  }
                }
              },
              text
            );
          }
        }
      ],
      list: [],
      bmList: []
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
    showAddPoup() {
      let that = this;
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = "新建";
    },
    searchList() {
      let that = this;
      that.getList();
    },
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
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
    modefyMessage(data) {
      let that = this;
      that.loading = true;
      manager
        .modefySingleDepartments(that.formValidate.ID, data)
        .then(response => {
          that.loading = false;
          if (response.error_code === "Success") {
            that.$Message.success("修改成功");
            that.getList();
            that.resetForm();
          } else {
            that.$Message.error(response.error_message);
          }
        });
    },
    getRowID(row) {
      let that = this;
      that.rowID = row.ID;
    },
    getDetail() {
      // 获取用户信息
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.$store.commit("changeLoadingPage");
      manager.getSingleDepartments(that.rowID).then(response => {
        if (response.error_code === "Success") {
          that.formValidate = response.data;
          that.formValidate.DepartmentTypeID = response.data.DepartmentTypeID;
          that.$set(that.formValidate, "Valid", response.data.Valid ? 1 : 0);
          setTimeout(() => {
            that.$store.commit("changeLoadingPage");
            that.modalTitle = "修改";
            that.modal1 = true;
          }, 800);
        } else {
          that.$store.commit("changeLoadingPage");
          that.$Message.error(response.error_message);
        }
      });
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
          if (that.modalTitle === "修改") {
            that.modefyMessage(data);
            return false;
          }
          that.loading = true;
          manager.addDepartments(data).then(response => {
            that.loading = false;
            if (response.error_code === "Success") {
              that.$Message.success("添加成功");
              that.getList();
              that.resetForm();
            } else {
              that.$Message.error(response.error_message);
            }
          });
        } else {
          that.$Message.error("有必填项为空");
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
    getList() {
      let that = this;
      that.tableLoading = true;
      let data = {
        Name: that.formItem.Name
      };
      // if (that.formItem.Valid === 1) {
      //     data.Valid = true
      // } else if (that.formItem.Valid === 0) {
      //     data.Valid = false
      // }
      manager.getDepartmentsList(data).then(response => {
        that.tableLoading = false;
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getDepartmentTypeList() {
      let that = this;
      manager.getDepartmentTypeList().then(response => {
        if (response.error_code === "Success") {
          let res = response.data;
          that.bmList = res.list;
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
      that.getDepartmentTypeList();
    });
  }
};
</script>
<style>
</style>
