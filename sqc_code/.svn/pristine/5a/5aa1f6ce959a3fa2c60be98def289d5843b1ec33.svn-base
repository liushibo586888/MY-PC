<template>
  <div class="khgl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
        <row :gutter="20">
          <!-- 物资名称 -->
          <i-col span="3">
            <FormItem prop="Name">
              <Input v-model="formItem.Name" placeholder="物资名称"></Input>
            </FormItem>
          </i-col>
          <!-- 物资分类 -->
          <!-- <i-col span="3">
            <formItem prop="CategoryID">
              <Select v-model="formItem.CategoryID" placeholder="物资分类">
                <Option :value="item.ID" v-for="item in goodsList" :key="item.ID">{{item.Name}}</Option>
              </Select>
            </formItem>
          </i-col> -->
          <i-col span="21">
            <formItem class="btn-box">
              <Button type="primary" class="btn" @click="searchList">搜索</Button>
              <Button type="warning" class="btn" @click="resetSearch">重置</Button>
              <i-button type="primary" class="btn btn-purple" @click="getDetail" :disabled="!rowID">修改</i-button>
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
    <Modal :mask-closable="false" v-model="modal1" class="dialog" :width="800">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Name" label="物资名称：" :label-width="120" :rules="formValidateRule.Name">
              <Input v-model="formValidate.Name" placeholder="请输入" :disabled='true'></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Alias" label="别名：" :label-width="120" :rules="formValidateRule.Alias">
              <Input v-model="formValidate.Alias" placeholder="请输入" :disabled='true'></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="SimpleCode" label="名称简码：" :label-width="120" :rules="formValidateRule.SimpleCode">
              <Input v-model="formValidate.SimpleCode" placeholder="请输入" :disabled='true'></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Unit" label="单位：" :label-width="120" :rules="formValidateRule.Unit">
              <Input v-model="formValidate.Unit" placeholder="请输入" :disabled='true'></Input>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="BuyNum" label="采购量：" :label-width="120" :rules="formValidateRule.BuyNum">
              <Input v-model="formValidate.BuyNum" placeholder="请输入"  @on-blur="handleInputBuyNum"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="BuyPrice" label="采购单价：" :label-width="120" :rules="formValidateRule.BuyPrice">
              <Input v-model="formValidate.BuyPrice" placeholder="请输入" @on-blur="handleInputBuyPrice"></Input>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="LossNum" label="损耗量：" :label-width="120" :rules="formValidateRule.LossNum">
              <Input v-model="formValidate.LossNum" placeholder="请输入" @on-blur="handleInputLossNum"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="UseNum" label="使用量：" :label-width="120" :rules="formValidateRule.UseNum">
              <Input v-model="formValidate.UseNum" placeholder="请输入" @on-blur="handleInputUseNum"></Input>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Max" label="预警上限：" :label-width="120" :rules="formValidateRule.Max">
              <InputNumber v-model="formValidate.Max" :max="999999999" :min="0" style="width:100%;" placeholder="请输入"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Min" label="预警下限：" :label-width="120" :rules="formValidateRule.Min">
              <InputNumber v-model="formValidate.Min" placeholder="请输入" :max="999999999" :min="0" style="width:100%;"></InputNumber>
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
import Exif from "exif-js";
import { mapState } from "vuex";
import manager from "@/api/manager.js";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
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
      rowID: null,
      tableHeight: 200,
      modalTitle: "修改",
      phone: "",
      modal1: false,
      goodsList: [],
      venderList: [],
      formValidate: {
        Max: 0,
        Min: 0,
        Name: "",
        Alias: "",
        SimpleCode: "",
        Unit: "",
        BuyNum: "",
        BuyPrice: "",
        LossNum: "",
        UseNum: ""
      },
      formValidateRule: {
        Name: { required: true, message: "物资名称不得为空", trigger: "blur" },
        Alias: { required: true, message: "别名不得为空", trigger: "blur" },
        SimpleCode: {
          required: true,
          message: "名称简码不得为空",
          trigger: "blur"
        },
        Unit: { required: true, message: "单位不得为空", trigger: "blur" },
        BuyNum: { required: true, message: "采购量不得为空", trigger: "blur" },
        BuyPrice: {
          required: true,
          message: "采购单价不得为空",
          trigger: "blur"
        },
        LossNum: { required: true, message: "损耗量不得为空", trigger: "blur" },
        UseNum: { required: true, message: "使用量不得为空", trigger: "blur" },
        Max: {
          required: true,
          message: "最大值不得为空",
          trigger: "blur",
          type: "number"
        },
        Min: {
          required: true,
          message: "最小值不得为空",
          trigger: "blur",
          type: "number"
        }
      },
      formItem: {
        Name: "",
        Valid: "",
        CategoryID: ""
      },
      columns1: [
        {
          title: "物资名称",
          key: "GoodsName",
          align: "center"
        },
        // {
        //   title: "别名",
        //   key: "Alias",
        //   align: "center"
        // },
        {
          title: "名称简码",
          key: "SimpleCode",
          align: "center"
        },
        {
          title: "单位",
          key: "sUnit",
          align: "center"
        },
        {
          title: "预警上线",
          key: "WarnMax",
          align: "center"
        },
        {
          title: "预警下线",
          key: "WarnMin",
          align: "center"
        },
        {
          title: "采购量",
          key: "BuyNum",
          align: "center"
        },
        {
          title: "采购单价",
          key: "BuyPrice",
          align: "center"
        },
        {
          title: "损耗量",
          key: "LossNum",
          align: "center"
        },
        {
          title: "使用量",
          key: "UseNum",
          align: "center"
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
    }
  },
  methods: {
    //input只能输入数字型
    handleInputBuyNum(e) {
      this.formValidate.BuyNum = echartsCommon.Rules(e);
    },
    handleInputBuyPrice(e) {
      this.formValidate.BuyPrice = echartsCommon.Rules(e);
    },
    handleInputLossNum(e) {
      this.formValidate.LossNum = echartsCommon.Rules(e);
    },
    handleInputUseNum(e) {
      this.formValidate.UseNum = echartsCommon.Rules(e);
    },
    ///////////////////
    showAddPoup() {
      let that = this;
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = "新建";
    },
    searchList() {
      let that = this;
      that.tablePage.page = 1;
      that.getList();
    },
    resetSearch() {
      let that = this;
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    addForm() {
      let that = this;
      that.loading = true;
      let data = {
        GoodsInfoID: that.rowID,
        StoreInfoID: that.userMes.StoreID,
        BuyNum: that.formValidate.BuyNum,
        BuyPrice: that.formValidate.BuyPrice,
        LossNum: that.formValidate.LossNum,
        UseNum: that.formValidate.UseNum,
        WarnMax: that.formValidate.Max,
        WarnMin: that.formValidate.Min
      };
      manager.getGoodsUpdate(data).then(response => {
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
        StoreInfoID: that.userMes.StoreID,
        sEmployeeId: that.userMes.EmployeeID,
        page: that.tablePage.page,
        size: that.tablePage.pageNum,
        // CategoryID: that.formItem.CategoryID,
        GoodsName: that.formItem.Name
      };
      manager.getStoreGoodsInfoWarnList(data).then(response => {
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
      that.rowID = row.GoodsInfoID;
    },
    getDetail() {
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.modal1 = true;
      that.$store.commit("changeLoadingPage");
      let data = {
        StoreInfoID: that.userMes.StoreID,
        sEmployeeId: that.userMes.EmployeeID,
        page: that.tablePage.page,
        size: that.tablePage.pageNum,
        GoodsInfoID: that.rowID
      };
      manager.getStoreGoodsInfoWarnList(data).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          let res = response.data.list[0];
          that.formValidate = {
            Name: res.GoodsName,
            Alias: res.Alias,
            SimpleCode: res.SimpleCode,
            Unit: res.sUnit,
            Max: res.WarnMax,
            Min: res.WarnMin,
            BuyNum: res.BuyNum,
            BuyPrice: res.BuyPrice,
            LossNum: res.LossNum,
            UseNum: res.UseNum
          };
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getGoodsTypesList() {
      // 获取物资分类 （下拉框）
      let that = this;
      manager.getGoodsCategoriesDropdownList().then(response => {
        if (response.error_code === "Success") {
          that.goodsList = response.data.list;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
      that.getGoodsTypesList();
    });
  }
};
</script>
<style>
</style>
