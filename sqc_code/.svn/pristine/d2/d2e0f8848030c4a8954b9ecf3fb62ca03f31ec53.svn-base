<template>
  <div class="khgl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
        <row :gutter="20">
          <!-- 物资名称 -->
          <i-col span="3">
            <FormItem prop="Name">
              <Input v-model="formItem.Name" placeholder="物资名称或者编码"></Input>
            </FormItem>
          </i-col>
          <!-- 是否有效 -->
          <i-col span="3">
            <FormItem prop="Valid">
              <Select v-model="formItem.Valid" placeholder="是否有效">
                <Option :value="-1">全部</Option>
                <Option :value="1">有效</Option>
                <Option :value="0">无效</Option>
              </Select>
            </FormItem>
          </i-col>
          <!-- 物资分类 -->
          <i-col span="3">
            <formItem prop="CategoryID">
              <Select v-model="formItem.CategoryID" placeholder="物资分类">
                <Option :value="item.ID" v-for="(item, index) in goodsList" :key="index">{{item.Name}}</Option>
              </Select>
            </formItem>
          </i-col>
          <i-col span="15">
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
    <Modal :mask-closable="false" v-model="modal1" :styles="{top: '20px'}" class="dialog" :width="800" v-if="setAuthorAdd || setAuthorEdit">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Image" label="项目图片：" :label-width="120">
              <!-- <FormItem prop="Image" label="项目图片：" :label-width="120" :rules="formValidateRule.Image"> -->
              <div class="input-box">
                <img :src="formValidate.Image" v-if="formValidate.Image">
                <Icon type="camera" v-else class="icon-camera"></Icon>
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="uploadImg" ref="image">
              </div>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Name" label="物资名称：" :label-width="120" :rules="formValidateRule.Name">
              <Input v-model="formValidate.Name" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Alias" label="别名：" :label-width="120" :rules="formValidateRule.Alias">
              <Input v-model="formValidate.Alias" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="SimpleCode" label="名称简码：" :label-width="120" :rules="formValidateRule.SimpleCode">
              <Input v-model="formValidate.SimpleCode" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Unit" label="单位：" :label-width="120">
              <!-- <FormItem prop="Unit" label="单位：" :label-width="120" :rules="formValidateRule.Unit"> -->
              <Input v-model="formValidate.Unit" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Standard" label="规格：" :label-width="120">
              <!-- <FormItem prop="Standard" label="规格：" :label-width="120" :rules="formValidateRule.Standard"> -->
              <Input v-model="formValidate.Standard" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="UnitPrice" label="单价：" :label-width="120" :rules="formValidateRule.UnitPrice">
              <InputNumber v-model="formValidate.UnitPrice" placeholder="请输入" :max="999999999" :min="1" style="width:100%;"></InputNumber>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">

          <i-col span="11">
            <FormItem prop="StockQuantity" label="散装个数：" :label-width="120" :rules="formValidateRule.StockQuantity">
              <InputNumber v-model="formValidate.StockQuantity" placeholder="请输入" :max="999999999" :min="1" style="width:100%;"></InputNumber>
            </FormItem>
          </i-col>

          <i-col span="11">
            <FormItem prop="GoodsBarCode" label="物资条码：" :label-width="120">
              <!-- :rules="formValidateRule.GoodsBarCode"-->
              <Input v-model="formValidate.GoodsBarCode" placeholder="请输入条码"></Input>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Max" label="预警上线：" :label-width="120" :rules="formValidateRule.Max">
              <InputNumber v-model="formValidate.Max" :max="999999999" :min="0" style="width:100%;" placeholder="请输入"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="Min" label="预警下线：" :label-width="120" :rules="formValidateRule.Min">
              <InputNumber v-model="formValidate.Min" placeholder="请输入" :max="999999999" :min="0" style="width:100%;"></InputNumber>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="GoodsCategoryID" label="物资分类：" :label-width="120" :rules="formValidateRule.GoodsCategoryID">
              <Select v-model="formValidate.GoodsCategoryID" placeholder="请输入">
                <Option :value="item.ID" v-for="(item, index) in goodsList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="FactoryID" label="供货厂家：" :label-width="120" :rules="formValidateRule.FactoryID">
              <Select v-model="formValidate.FactoryID" placeholder="请输入">
                <Option :value="item.ID" v-for="(item, index) in venderList" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="Valid" label="是否有效：" :label-width="120" :rules="formValidateRule.Valid">
              <RadioGroup v-model="formValidate.Valid">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="IsNeedProductBatch" label="需要批号：" :label-width="120">
              <RadioGroup v-model="formValidate.IsNeedProductBatch">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="IsNeedValidPeriod" label="需要有效期：" :label-width="120">
              <RadioGroup v-model="formValidate.IsNeedValidPeriod">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="IsSales" label="销售类物资：" :label-width="120">
              <RadioGroup v-model="formValidate.IsSales">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="IsStoreUse" label="是否院内使用：" :label-width="120">
              <RadioGroup v-model="formValidate.IsStoreUse">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>

          <i-col span="11">
            <FormItem prop="IsSuccess" label="是否成交：" :label-width="120">
              <RadioGroup v-model="formValidate.IsSuccess">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="11">
            <FormItem prop="StoreIsApply" label="门店是否能申请：" :label-width="120">
              <RadioGroup v-model="formValidate.StoreIsApply">
                <Radio :label="1">
                  <span>是</span>
                </Radio>
                <Radio :label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="11">
            <FormItem prop="GoodsType" label="物资类型：" :label-width="120">
              <RadioGroup v-model="formValidate.GoodsType">
                <Radio :label="1">
                  <span>套盒</span>
                </Radio>
                <Radio :label="0">
                  <span>散装</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row>

        <row type="flex" justify="space-between">
          <i-col span="10">
            <FormItem prop="Max" label="出售门店的价格：" :label-width="120" :rules="formValidateRule.Price">
              <InputNumber v-model="formValidate.Price" :max="999999999" :min="0" style="width:100%;" placeholder="请输入出售门店的价格"></InputNumber>
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
        Image: "",
        Name: "",
        Alias: "",
        SimpleCode: "",
        Unit: "",
        UnitPrice: null,
        StockQuantity: 1,
        Standard: "",
        GoodsCategoryID: "",
        FactoryID: "",
        Valid: 1,
        IsNeedProductBatch: 1,
        IsNeedValidPeriod: 1,
        IsSales: 1,
        IsSuccess: 1,
        StoreIsApply: 1,
        GoodsType: 0,
        GoodsBarCode: "",
        Price: 0
      },
      formValidateRule: {
        Image: { required: true, message: "物资图片不得为空", trigger: "blur" },
        Name: { required: true, message: "物资名称不得为空", trigger: "blur" },
        Alias: { required: true, message: "别名不得为空", trigger: "blur" },
        SimpleCode: {
          required: true,
          message: "名称简码不得为空",
          trigger: "blur"
        },
        GoodsBarCode: {
          required: true,
          message: "名称简码不得为空",
          trigger: "blur"
        },
        Unit: { required: true, message: "单位不得为空", trigger: "blur" },
        Standard: { required: true, message: "规格不得为空", trigger: "blur" },
        UnitPrice: {
          required: true,
          message: "单价不得为空",
          trigger: "blur",
          type: "number"
        },
        StockQuantity: {
          required: true,
          message: "散装个数不得为空",
          trigger: "blur",
          type: "number"
        },
        GoodsCategoryID: {
          required: true,
          message: "物资分类不得为空",
          trigger: "blur"
        },
        FactoryID: {
          required: true,
          message: "供货厂家不得为空",
          trigger: "blur"
        },
        Valid: {
          required: true,
          message: "是否有效不得为空",
          trigger: "blur",
          type: "number"
        },
        IsSuccess: {
          required: true,
          message: "是否成交不得为空",
          trigger: "blur",
          type: "number"
        },
        StoreIsApply: {
          required: true,
          message: "门店是否使用不得为空",
          trigger: "blur",
          type: "number"
        },
        GoodsType: {
          required: true,
          message: "物资类型不得为空",
          trigger: "blur",
          type: "number"
        },
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
        },
        Price: {
          required: true,
          message: "出售门店价格不能为空",
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
          title: "编码",
          key: "ID",
          align: "center",
          width: 80
        },
        {
          title: "物资名称",
          key: "Name",
          align: "center",
          width: 140,
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.Name, 5);
          }
        },
        {
          title: "别名",
          key: "Alias",
          align: "center",
          width: 140,
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.Alias, 5);
          }
        },
        {
          title: "单位",
          key: "Unit",
          align: "center",
          width: 100
        },
        {
          title: "散装个数",
          key: "StockQuantity",
          align: "center",
          width: 100
        },
        {
          title: "规格",
          key: "Standard",
          align: "center",
          width: 160
        },
        {
          title: "单价",
          key: "UnitPrice",
          align: "center",
          width: 100,
          render: (h, params) => {
            return echartsCommon.ToFixed(h, params.row.UnitPrice, 2);
          }
        },
        {
          title: "物资分类",
          key: "GoodsCategoryName",
          align: "center",
          width: 140,
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.GoodsCategoryName, 5);
          }
        },
        {
          title: "供货厂家",
          key: "FactoryName",
          align: "center",
          width: 140,
          render: (h, params) => {
            return echartsCommon.ToolTip(h, params.row.FactoryName, 5);
          }
        },
        {
          title: "是否有效",
          key: "Valid",
          align: "center",
          width: 140,
          render: (h, parmas) => {
            let text = parmas.row.Valid ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "需要批号",
          key: "IsNeedProductBatch",
          align: "center",
          width: 140,
          render: (h, parmas) => {
            let text = parmas.row.IsNeedProductBatch ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "需要有效期",
          key: "IsNeedValidPeriod",
          align: "center",
          width: 140,
          render: (h, parmas) => {
            let text = parmas.row.IsNeedValidPeriod ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "销售类物资",
          key: "IsSales",
          align: "center",
          width: 140,
          render: (h, parmas) => {
            let text = parmas.row.IsSales ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "是否成交",
          key: "IsSuccess",
          align: "center",
          width: 140,
          render: (h, parmas) => {
            let text = parmas.row.IsSuccess ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "门店是否可以申请",
          key: "StoreIsApply",
          align: "center",
          width: 150,
          render: (h, parmas) => {
            let text = parmas.row.StoreIsApply ? "是" : "否";
            return h("div", {}, text);
          }
        },
        {
          title: "物资类型",
          key: "GoodsType",
          align: "center",
          width: 150,
          render: (h, parmas) => {
            let text = parmas.row.GoodsType ? "套盒" : "散装";
            return h("div", {}, text);
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
      that.tablePage.page = 1;
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
      manager.modefySingleGoods(that.formValidate.ID, data).then(response => {
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
      that.$refs.image.value = "";
      that.$refs.formValidate1.resetFields();
      that.formValidate.ID = "";
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          let data = {
            Image:
              that.formValidate.Image == "" ? null : that.formValidate.Image,
            // Image: that.formValidate.Image.replace('data:image/jpeg;base64,', ''),
            MaxNum: that.formValidate.Max,
            MinNum: that.formValidate.Min,
            Name: that.formValidate.Name,
            Alias: that.formValidate.Alias,
            SimpleCode: that.formValidate.SimpleCode,
            Unit: that.formValidate.Unit,
            UnitPrice: that.formValidate.UnitPrice,
            StockQuantity: that.formValidate.StockQuantity,
            GoodsBarCode: that.formValidate.GoodsBarCode,
            Standard: that.formValidate.Standard,
            GoodsCategoryID: that.formValidate.GoodsCategoryID,
            FactoryID: that.formValidate.FactoryID,
            Valid: that.formValidate.Valid > 0 ? true : false,
            IsNeedProductBatch:
              that.formValidate.IsNeedProductBatch > 0 ? true : false,
            IsNeedValidPeriod:
              that.formValidate.IsNeedValidPeriod > 0 ? true : false,
            IsSales: that.formValidate.IsSales > 0 ? true : false,
            IsSuccess: that.formValidate.IsSuccess > 0 ? true : false,
            StoreIsApply: that.formValidate.StoreIsApply > 0 ? true : false,
            GoodsType: that.formValidate.GoodsType > 0 ? true : false,
            IsStoreUse: that.formValidate.IsStoreUse > 0 ? true : false,
            Price: that.formValidate.Price
          };
          if (that.modalTitle == "修改") {
            that.modefyMessage(data);
            return false;
          }
          that.loading = true;
          manager.addGoods(data).then(response => {
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
        Valid: "",
        CategoryID: that.formItem.CategoryID,
        Name: that.formItem.Name
      };
      if (that.formItem.Valid === 1) {
        data.Valid = true;
      } else if (that.formItem.Valid === 0) {
        data.Valid = false;
      }
      manager.getGoodsList(data).then(response => {
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
    uploadImg(e) {
      let that = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.imgPreview(files[0]);
    },
    imgPreview(file) {
      let that = this;
      let Orientation;
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            that.formValidate.Image = result;
          } else {
            img.onload = function() {
              let data = that.compress(img, Orientation);
              that.formValidate.Image = data;
            };
          }
        };
      }
    },
    rotateImg(img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0;
      const maxStep = 3;
      if (img == null) return;
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = minStep;
      }
      if (direction === "right") {
        step++;
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep);
      } else {
        step--;
        step < minStep && (step = maxStep);
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // 瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // 如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== "" && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: // 需要180度旋转
            this.rotateImg(img, "right", canvas); // 转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
      // console.log('压缩前：' + initSize)
      // console.log('压缩后：' + ndata.length)
      // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
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
    },
    getFactoriesList() {
      // 获取供应商列表 （下拉框）
      let that = this;
      manager.getFactoriesDropdownList().then(response => {
        if (response.error_code === "Success") {
          that.venderList = response.data.list;
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
      let that = this;
      if (!that.rowID) {
        that.$Message.error("请选择一条记录");
        return false;
      }
      that.$store.commit("changeLoadingPage");
      manager.getSingleGoods(that.rowID).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          let res = response.data;
          if (!res.Image) {
            res.Image = "";
          }
          that.formValidate = {
            ID: res.ID,
            Image: res.Image ? "data:image/jpeg;base64," + res.Image : "",
            Name: res.Name,
            Alias: res.Alias,
            SimpleCode: res.SimpleCode,
            Unit: res.Unit,
            UnitPrice: res.UnitPrice,
            StockQuantity: res.StockQuantity,
            GoodsBarCode: res.GoodsBarCode,
            Standard: res.Standard,
            GoodsCategoryID: res.GoodsCategoryID,
            FactoryID: res.FactoryID,
            Valid: res.Valid ? 1 : 0,
            IsNeedProductBatch: res.IsNeedProductBatch ? 1 : 0,
            IsNeedValidPeriod: res.IsNeedValidPeriod ? 1 : 0,
            IsSales: res.IsSales ? 1 : 0,
            IsSuccess: res.IsSuccess ? 1 : 0,
            StoreIsApply: res.StoreIsApply ? 1 : 0,
            GoodsType: res.GoodsType ? 1 : 0,
            Max: res.MaxNum,
            Min: res.MinNum,
            Price: res.Price
          };
          that.modal1 = true;
          that.modalTitle = "修改";
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
      that.getFactoriesList();
    });
  }
};
</script>
<style>
.input-box {
  position: relative;
  width: 60px;
  height: 60px;
  border: 2px dashed #dddee1;
  text-align: center;
}
.input-box:hover {
  border-color: #79aa49;
  cursor: pointer;
}
.input-box input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  display: block;
  left: 0;
  top: 0;
  opacity: 0;
}
.input-box input[type="file"]:hover {
  cursor: pointer;
}
.input-box > img {
  position: relative;
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.icon-camera {
  font-size: 32px;
  line-height: 60px;
  color: #666;
}
</style>
