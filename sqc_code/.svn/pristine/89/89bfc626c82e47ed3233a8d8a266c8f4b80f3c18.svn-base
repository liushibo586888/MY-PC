<template>
    <div class="khgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 厂家名称 -->
                    <i-col span="3">
                        <FormItem prop="name">
                            <Input v-model="formItem.name" placeholder="厂家名称"></Input>
                        </FormItem>
                    </i-col>
                    <!-- 是否有效 -->
                    <i-col span="3">
                        <FormItem prop="Valid">
                            <Select v-model="formItem.Valid" placeholder="是否有效">
                                <Option value="">全部</Option>
                                <Option :value="1">有效</Option>
                                <Option :value="0">无效</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="searchList">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup()" v-if="setAuthorAdd">添加</i-button>
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
        <Modal :mask-closable="false" v-model="modal1" class="dialog" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Name" label="厂家名称：" :rules="formValidateRule.Name">
                            <Input v-model="formValidate.Name" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="SimpleCode" label="名称简码：" :rules="formValidateRule.SimpleCode">
                            <Input v-model="formValidate.SimpleCode" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Valid" label="是否有效：" :rules="formValidateRule.Valid">
                            <!-- <FormItem prop="Valid" label="是否有效："  :rules="formValidateRule.Valid"> -->
                            <Select v-model="formValidate.Valid" placeholder="是否有效">
                                <Option :value="1">是</Option>
                                <Option :value="0">否</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Remark" label="分类名称：">
                            <Input v-model="formValidate.Remark" placeholder="请输入" type="textarea"></Input>
                        </FormItem>
                    </i-col>
                </row>
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
import moment from "moment";
export default {
  data() {
    return {
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      rowID: null,
      loading: false,
      tableLoading: false,
      tableHeight: 200,
      modalTitle: "修改",
      modal1: false,
      formValidate: {
        Name: "",
        SimpleCode: "",
        Valid: 1,
        Remark: ""
      },
      formValidateRule: {
        Name: { required: true, message: "分类名称不得为空", trigger: "blur" },
        SimpleCode: {
          required: true,
          message: "名称简码不得为空",
          trigger: "blur"
        },
        Valid: {
          required: true,
          message: "是否有效不得为空",
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
          title: "厂家名称",
          key: "Name",
          align: "center"
        },
        {
          title: "名称简码",
          key: "SimpleCode",
          align: "center"
        },
        {
          title: "是否有效",
          key: "Valid",
          align: "center",
          render: (h, parmas) => {
            let text = parmas.row.Valid ? "是" : "否";
            return h("div", {}, text);
          }
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
                    this.showRemark(parmas.row.Remark);
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
      list: []
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
      // 修改信息
      let that = this;
      manager
        .modefySingleFactories(that.formValidate.ID, data)
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
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.formValidate.ID = "";
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          let data = {
            Name: that.formValidate.Name,
            SimpleCode: that.formValidate.SimpleCode,
            Remark: that.formValidate.Remark,
            Valid: that.formValidate.Valid === 1 ? true : false
          };
          if (that.modalTitle === "修改") {
            that.modefyMessage(data);
            return false;
          }
          that.loading = true;
          manager.addFactories(data).then(response => {
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
      that.tableLoading = true;
      let data = {
        EmployeeID: that.userMes.EmployeeID,
        page: that.tablePage.page,
        size: that.tablePage.pageNum,
        valid: "",
        name: that.formItem.name
      };
      if (that.formItem.Valid === 1) {
        data.valid = true;
      } else if (that.formItem.Valid === 0) {
        data.valid = false;
      }
      manager.getFactoriesList(data).then(response => {
        that.tableLoading = false;
        if (response.error_code === "Success") {
          let res = response.data;
          that.list = res.list;
          that.tablePage.page = res.page;
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
    },
    getRowID(row) {
      let that = this;
      that.rowID = row.ID;
    },
    getDetail() {
      // 获取物资厂家详情 编辑
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.$store.commit("changeLoadingPage");
      manager.getSingleFactories(that.rowID).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          let res = response.data;
          that.formValidate = {
            ID: res.ID,
            Name: res.Name,
            SimpleCode: res.SimpleCode,
            Valid: res.Valid ? 1 : 0,
            Remark: res.Remark
          };
          that.modalTitle = "修改";
          that.modal1 = true;
        } else {
          that.$Message.error(response.error_message);
        }
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
    });
  }
};
</script>
<style>
</style>
