<template>
  <div class="xmqz-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
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
              <Input v-model="formItem.userName" placeholder="入库单号"></Input>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="userName">
              <Input v-model="formItem.userName" placeholder="审核状态"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <formItem class="btn-box">
              <i-button type="primary" class="btn" @click="searchForm">搜索</i-button>
              <i-button type="warning" class="btn" @click="resetSearch">重置</i-button>
              <i-button type="success" class="btn" @click="addMode">添加</i-button>
              <i-button type="primary" class="btn " @click="xiugai" :disabled="showEdit">修改</i-button>
              <i-button type="error" class="btn " @click="shenhe" :disabled="showEdit">审核</i-button>
              <i-button type="info" class="btn " @click="liulan" :disabled="showEdit">浏览</i-button>
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
      <Select v-model="tablePage.pageNum" class="table-row" placement="top" @on-change="changePage">
        <Option :value="item.ID" v-for="(item, index) in tableRows" :key="index">{{item.Name}}</Option>
      </Select>
      <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
      <i-button class="btn btn-prev" type="ghost" @click="prevPage">上一页</i-button>
      <i-button class="btn btn-next" type="primary" @click="nextPage">下一页</i-button>
      <div class="page-box">
        <p>前往</p>
        <Input-number :max="tablePage.maxPageNum" :min="1" v-model="tablePage.page" @on-change="changePage"></Input-number>
        <p>页</p>
      </div>
    </div>
    <!-- 弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" width="1400" :scrollable="true" class="dialog">
      <div slot='header' class="header not-print">
        新增出库单
      </div>
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi' @click="resetForm"></i>
      </div>
      <!-- 用户信息部分 不可修改 -->
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="6">
            <FormItem prop="OrderNum" label="出库单编号：">
              <Input v-model="formValidate.OrderNum" placeholder="可不填,自动生成" :disabled="true"></Input>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem prop="OutType" label="出库单类型：">
              <Select v-model="formValidate.OutType" :filterable="true" placeholder="请选择">
                <Option :value="item.Value" v-for="(item, index) in mrsList" :key="index" @click.native="chooseOption(item.Name,item.Value)">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="关联订单号：" prop="ContractOrder">
              <Input v-model="formValidate.ContractOrder" placeholder="无"></Input>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="发货日期:" prop="SendDate">
              <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="开始日期" v-model="formValidate.SendDate" :clearable="false" :editable="false"></DatePicker>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="6">
            <FormItem label="客户编号：" prop="CusNum">
              <Input v-model="formValidate.CusNum" placeholder="点击右侧小房子弹出供应商列表"></Input>
              <div style="width:30px;height:30px;margin-left:215px;position:absolute;z-index:100;top:1px;" @click="shuangji">
                <!-- <Icon type="ios-calendar icon-btn" size="30" /> -->
                <Icon type="ios-home-outline icon-btn" size="30" />
              </div>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="客户名称：" prop="CusName">
              <Input v-model="formValidate.CusName" placeholder="无"></Input>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="客户地址：" prop="Address">
              <Input v-model="formValidate.Address" placeholder="无"></Input>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="客户联系方式：" prop="Phone">
              <Input v-model="formValidate.Phone" placeholder="无"></Input>
            </FormItem>
          </i-col>
        </row>
        <row type="flex" justify="space-between">
          <i-col span="6">
            <FormItem label="联系人：" prop="ContactName">
              <Input v-model="formValidate.ContactName" placeholder="无"></Input>
            </FormItem>
          </i-col>
          <!-- <i-col span="6">
            <FormItem label="制单人：" prop="TMKEMployeeName">
              <Input v-model="formValidate.TMKEMployeeName" placeholder="无"></Input>
            </FormItem>
          </i-col> -->
        </row>
        <!-- ** -->
      </Form>
      <!-- 物资列表明细 -->
      <div class="pannel-title">
        <p>物资列表</p>
        <div>
          <i-button type="text" @click="showSmallModal(0)" size="small" style="font-size:18px;font-weight:900">添加物资</i-button>
        </div>
      </div>
      <!-- 添加、修改 -->
      <div class="table-box" style="margin-top:0; margin-bottom:20px;">
        <i-table stripe :columns="choosedItemColumns" :data="choosedItemList" :height="300"></i-table>
      </div>
      <row type="flex" justify="end" style="margin-bottom: 20px; color: #fc5427; font-size: 14px; font-weight: bold;">
      </row>
      <Input v-model="formValidate.Remark" placeholder="备注" type="textarea" :rows="4"></Input>
      <!-- ** -->
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="addForm" :loading="onLoading" :disabled="stopuse">保存</Button>
        <Button class="btn" type="warning" @click="resetForm" :loading="onLoading">取消</Button>
      </div>
    </Modal>
    <!-- 物资弹窗 -->
    <Modal :mask-closable="false" v-model="modal2" width="900" class="dialog">
      <div slot='header' class="header not-print">
        出库产品
      </div>
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <Input v-model="searchKeyWord" placeholder="请输入项目名称" style="width: 300px; margin: 2px 0 2px 0;" icon="search"></Input>

      <div class="table-box">
        <!-- 物资 -->
        <i-table stripe :columns="materialsColumn" :data="setMaterialtData" @on-selection-change="selectMaterial" :height="500"></i-table>
      </div>
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="smalladdForm" :loading="onLoading">保存</Button>
        <Button class="btn" type="warning" @click="smallResetForm" :loading="onLoading">取消</Button>
      </div>
    </Modal>

    <Modal :mask-closable="false" v-model="modal3" width="1300" class="dialog">
      <div slot='header' class="header not-print">
        选择供应商
      </div>
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <Input v-model="searchKeyWord" placeholder="请输入项目名称" style="width: 300px; margin: 2px 0 2px 0;" icon="search"></Input>

      <div class="table-box">
        <!-- 物资 -->
        <i-table stripe :columns="customsColumn" :data="setCustomsData" @on-selection-change="selectCustoms" :height="500"></i-table>
      </div>
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="queding" :loading="onLoading">确定</Button>
        <Button class="btn" type="warning" @click="guanbi" :loading="onLoading">关闭</Button>
      </div>
    </Modal>

    <Modal :mask-closable="false" v-model="modal4">
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <p>你确定要审核吗？</p>
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="ok" :loading="onLoading">审核通过</Button>
        <Button class="btn" type="warning" @click="cancel" :loading="onLoading">驳回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const Decimal = require("decimal");
import Vue from "vue";
import storejs from "storejs";
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
      stopuse: false,
      modeTX: 0, // 1增加 2修改,浏览
      showEdit: true,
      showAdd: false,
      showLook: false,
      modalTitle: "修改",
      Status: null,
      OrderNum: null,
      searchKeyWord: "",
      onLoading: false,

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
      onPrint: false,
      number: true,
      delPoup: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      formValidate: {
        ContactName: "",
        OutType: 2,
        OrderNum: "",
        ContractOrder: "",
        SendDate: new Date(),
        // TMKEMployeeName: "",
        Address: "",
        Phone: "",
        CusNum: "",
        CusName: "",
        Remark: ""
      },
      formValidateRule: {
        BeauticianID: {
          required: true,
          message: "护理师不得为空",
          trigger: "blur"
        }
      },
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userName: ""
      },
      // 主表格行
      columns1: [
        {
          title: "出库单号",
          key: "OrderNum",
          align: "center",
          width: 150
        },
        {
          title: "出库类型",
          key: "OutType",
          align: "center",
          width: 150
          // render: (h, params) => {
          //   return h(
          //     "div",
          //     {},
          //     params.row.OutType ? "采购退货出库" : "销售提货出库"
          //   );
          // }
        },
        {
          title: "客户名称",
          key: "CusName",
          align: "center",
          width: 300
        },
        {
          title: "关联订单",
          key: "ContractOrder",
          align: "center",
          width: 150
        },
        {
          title: "总数量",
          key: "Num",
          align: "center",
          width: 150
        },
        {
          title: "总金额",
          key: "Amount",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", {}, params.row.Amount.toFixed(2) + "元");
          }
        },
        {
          title: "状态",
          key: "Status",
          align: "center",
          width: 150
        },
        {
          title: "制单人",
          key: "CreateUser",
          align: "center",
          width: 150
        },
        {
          title: "创建时间",
          key: "CreateTime",
          align: "center",
          width: 150,
          render: (h, params) => {
            if (!params.row.CreateTime) {
              return h("div", {}, "");
            }
            return h(
              "div",
              {},
              moment(params.row.CreateTime).format("YYYY-MM-DD")
            );
          }
        },
        {
          title: " ",
          key: "",
          align: "center"
        }
      ],
      list: [],
      mrsList: [
        {
          Name: "采购退货出库",
          Value: 1
        },
        {
          Name: "销售提货出库",
          Value: 2
        },
        {
          Name: "领用出库",
          Value: 3
        },
        {
          Name: "借货出库",
          Value: 4
        },
        {
          Name: "借入还出",
          Value: 5
        }
      ],
      alreadyPaid: false,
      selection: [],
      selectionCustoms: [],
      xmData: [],
      wzData: [],
      volumeTypes: [],
      projectTypeList: [],
      materialsColumn: [
        //物资列表头
        {
          type: "selection",
          width: 80
        },
        {
          title: "产品名称",
          key: "ProductName",
          align: "center",
          width: 150
        },
        {
          title: "产品条码",
          key: "BarCode",
          align: "center"
        },
        {
          title: "批次",
          key: "BatchNum",
          align: "center"
        },
        {
          title: "库位",
          key: "LocalName",
          align: "center",
          width: 150
        },
        {
          title: "规格",
          key: "Standard",
          align: "center",
          width: 150
        },
        {
          title: "散装量",
          key: "StockQuantity",
          align: "center"
        }
        // {
        //   title: "现有库存",
        //   key: "Num",
        //   align: "center"
        // }
      ],
      customsColumn: [
        //供应商表头
        {
          type: "selection",
          width: 80
        },
        {
          title: "客户编号",
          key: "CusNum",
          align: "center",
          width: 120
        },
        {
          title: "客户名称",
          key: "CusName",
          align: "center",
          width: 250
        },
        {
          title: "联系方式",
          key: "Phone",
          align: "center"
        },
        {
          title: "Email",
          key: "Email",
          align: "center"
        },
        {
          title: "传真",
          key: "Fax",
          align: "center"
        },
        {
          title: "地址",
          key: "Address",
          align: "center"
        },
        {
          title: "备注",
          key: "Remark",
          align: "center"
        }
      ],
      materialsData: [],
      materialsData1: [],
      projectListData: [],
      HandleList: [],
      myPaymentMode: [],
      choosedItemColumns: [
        {
          title: "产品名称",
          key: "ProductName",
          align: "center",
          width: 150
        },
        {
          title: "产品条码",
          key: "ProductNum",
          align: "center",
          width: 100
        },
        {
          title: "产品编号",
          key: "BarCode",
          align: "center",
          width: 100
        },
        {
          title: "批次",
          key: "BatchNum",
          align: "center"
        },
        {
          title: "单价",
          key: "Price",
          align: "center",
          width: 100
        },
        {
          title: "出库数",
          key: "num",
          align: "center",
          width: 100,
          render: (h, params) => {
            let that = this;
            return h("div", [
              h("Input-number", {
                props: {
                  placeholder: "填写数量",
                  value: params.row.num,
                  max: 9999999,
                  min: 1
                },
                on: {
                  "on-change": function(e) {
                    that.$nextTick(() => {
                      params.row.num = e;
                      that.choosedItemList[params.index] = params.row;
                    });
                  }
                }
              })
            ]);
          }
        },
        // {
        //   title: "总价",
        //   key: "sum",
        //   align: "center",
        //   width: 100
        // },
        {
          title: "规格",
          key: "Unit",
          align: "center"
        },
        {
          title: "库位",
          key: "LocalName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("i", {
                class: {
                  "ivu-icon": true,
                  "ivu-icon-aaa-icon-shanchu": true,
                  "icon-btn": true
                },
                style: {},
                on: {
                  click: () => {
                    this.showDelDetailPoup(params.index);
                  }
                }
              })
            ]);
          }
        },
        {
          title: " ",
          width: 10
        }
      ],
      choosedItemList: [],
      choosedItemList1: []
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
    setMaterialtData() {
      // 过滤物资列表
      let that = this;
      let arr = [];
      let idList = [];
      let keyWord = that.searchKeyWord;
      // 选中的商品不会出现在待选列表中
      for (let i of that.choosedItemList) {
        idList.push(i.id);
      }
      for (let i of that.materialsData) {
        // arr.push(i);
        if (idList.indexOf(i.ID) <= -1) {
          // 搜索
          if (
            i.ProductName.indexOf(keyWord) > -1 ||
            i.ProductNum.indexOf(keyWord) > -1
          ) {
            arr.push(i);
          }
        }
      }
      return arr;
    },
    setCustomsData() {
      // 过滤供应商列表
      let that = this;
      let arr = [];
      let idList = [];
      let keyWord = that.searchKeyWord;
      // 选中的商品不会出现在待选列表中
      for (let i of that.choosedItemList1) {
        idList.push(i.id);
      }
      for (let i of that.materialsData1) {
        if (idList.indexOf(i.ID) <= -1) {
          // 搜索
          if (
            i.CusName.indexOf(keyWord) > -1 ||
            i.CusNum.indexOf(keyWord) > -1
          ) {
            arr.push(i);
          }
        }
      }
      return arr;
    },
    setSmallModalTitle() {
      let that = this;
      return "物资";
    }
  },
  methods: {
    chooseOption(name, value) {
      this.formValidate.OutType = value;
    },
    shuangji() {
      let that = this;
      that.searchKeyWord = "";
      that.commit;
      // that.$store.commit("changeLoadingPage");
      that.getCustomsList();
      that.modal3 = true;
    },
    queding() {
      let that = this;
      that.modal3 = false;
      let qq = that.selectionCustoms[0];
      that.formValidate.CusNum = qq.CusNum;
      that.formValidate.CusName = qq.CusName;
      that.formValidate.Address = qq.Address;
      that.formValidate.Phone = qq.Phone;
      that.formValidate.Remark = qq.Remark;
      that.formValidate.Address = qq.Address;
    },
    guanbi() {
      let that = this;
      that.modal3 = false;
    },
    shenhe() {
      //审核
      let that = this;
      if (!that.OrderNum) {
        that.$Message.error("请选择一个商品");
        return false;
      }
      that.modal4 = true;
      // that.getDetail(that.OrderNum);
    },
    //警示框
    ok() {
      let that = this;
      that.Status = 2;
      let data = {
        employeeId: that.userMes.EmployeeID,
        Status: that.Status,
        OrderNum: that.OrderNum
      };
      api.AuditOutProduct(data).then(response => {
        if (response.error_code == "Fail") {
          that.$Message.success(response.error_message);
        } else {
          that.$Message.success(response.data);
        }
        that.modal4 = false;
        that.getList();
      });
    },
    cancel() {
      let that = this;
      that.Status = 3;
      let data = {
        employeeId: that.userMes.EmployeeID,
        Status: that.Status,
        OrderNum: that.OrderNum
      };
      api.AuditOutProduct(data).then(response => {
        if (response.error_code == "Fail") {
          that.$Message.success(response.error_message);
        } else {
          that.$Message.success(response.data);
        }
        that.modal4 = false;
        that.getList();
      });
    },
    xiugai() {
      // 修改
      let that = this;
      if (!that.OrderNum) {
        that.$Message.error("请选择一个商品");
        return false;
      }
      that.stopuse = false;
      that.modal1 = true;
      that.modeTX = 2;
      that.getDetail(that.OrderNum);
    },
    liulan() {
      // 浏览
      let that = this;
      that.stopuse = true;
      if (!that.OrderNum) {
        that.$Message.error("请选择一个商品");
        return false;
      }
      that.modal1 = true;
      that.getDetail();
    },
    addMode() {
      // 添加
      let that = this;
      that.modal1 = true;
      that.stopuse = false;
      that.modeTX = 1;
    },
    chooseRow(row) {
      // 选中某一行修改
      let that = this;
      that.OrderNum = row.OrderNum;
      if (that.OrderNum) {
        that.showEdit = false;
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
      that.tablePage.page = 1;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    setData(res) {
      let that = this;
      that.formValidate.BeauticianID = res.BeauticianID;
      that.formValidate.OrderNum = res.Name;
      that.formValidate.ContractOrder = res.ContractOrder;
      that.formValidate.OutType = res.OutType;
      that.formValidate.SendDate = res.SendDate;
      // that.formValidate.TMKEmployeeName = res.TMKEmployeeName;
      that.formValidate.SceneEmployeeName = res.SceneEmployeeName;
      that.formValidate.Address = res.Address;
      that.formValidate.Phone = res.Phone;
      that.formValidate.CusNum = res.CusNum;
      that.formValidate.CusName = res.CusName;
    },
    showDelDetailPoup(index) {
      let that = this;
      that.choosedItemList.splice(index, 1);
    },
    resetForm() {
      let that = this;
      that.choosedItemList = [];
      that.formValidate.Remark = "";
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
    },
    getDetail() {
      // 获取出库商品明细
      let that = this;
      let data = {
        OrderNum: that.OrderNum
      };
      api.UpdataOutProduct(data).then(response => {
        // that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          // 设置数据
          that.setDetail(response.data);
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    setDetail(res) {
      // 获取确诊详情并设置数据
      let that = this;
      that.choosedItemList = [];
      that.setData(res);
      that.formValidate.Remark = res.Remark;
      for (let i in res.Details) {
        let dom = res.Details[i];
        let a = {
          ID: dom.ID,
          ProductNum: dom.ProductNum,
          Unit: dom.Unit,
          Price: dom.Price,
          ProductName: dom.ProductName,
          BarCode: dom.BarCode,
          BatchNum: dom.BatchNum,
          LocalName: dom.LocalName,
          num: dom.Num
        };
        that.choosedItemList.push(a);
      }
      that.modal1 = true;
    },
    setUploadData() {
      // 设置提交数据
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        OutType: that.formValidate.OutType,
        ContractOrder: that.formValidate.ContractOrder,
        CusNum: that.formValidate.CusNum,
        CusName: that.formValidate.CusName,
        Address: that.formValidate.Address,
        ContactName: that.formValidate.ContactName,
        Phone: that.formValidate.Phone,
        SendDate: that.formValidate.SendDate,
        Remark: that.formValidate.Remark,
        Details: []
      };
      //时间转换
      if (data.SendDate) {
        data.SendDate = echartsCommon.changeTime(data.SendDate);
      }
      // 添加物资记录
      for (let i of that.choosedItemList) {
        let a = {
          BarCode: i.BarCode,
          ProductName: i.ProductName,
          ProductNum: i.ProductNum,
          OutPrice: i.Price,
          Num: i.num,
          BatchNum: i.BatchNum
        };
        data.Details.push(a);
      }
      return data;
    },
    setUploadData1() {
      // 设置提交数据
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        OrderNum: that.OrderNum,
        OutType: that.formValidate.OutType,
        ContractOrder: that.formValidate.ContractOrder,
        CusNum: that.formValidate.CusNum,
        CusName: that.formValidate.CusName,
        Address: that.formValidate.Address,
        ContactName: that.formValidate.ContactName,
        Phone: that.formValidate.Phone,
        SendDate: that.formValidate.SendDate,
        Remark: that.formValidate.Remark,
        Details: []
      };
      //时间转换
      if (data.SendDate) {
        data.SendDate = echartsCommon.changeTime(data.SendDate);
      }
      // 添加物资记录
      for (let i of that.choosedItemList) {
        let a = {
          BarCode: i.BarCode,
          ProductName: i.ProductName,
          ProductNum: i.ProductNum,
          OutPrice: i.Price,
          Num: i.num,
          BatchNum: i.BatchNum
        };
        data.Details.push(a);
      }
      return data;
    },
    addForm() {
      let that = this;
      if (that.choosedItemList.length <= 0) {
        that.$Message.error("请选择项目或物资");
        return false;
      }
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          if (that.choosedItemList.length <= 0) {
            that.$Message.error("请选择项目或物资");
            return false;
          }
          that.onLoading = true;
          if (that.modeTX == 1) {
            api.SeaveOutProduct(that.setUploadData()).then(response => {
              that.onLoading = false;
              if (response.error_code === "Success") {
                that.$Message.success("提交成功");
                that.resetForm();
                that.getList();
              } else {
                that.$Message.error(response.error_message);
              }
            });
          }
          if (that.modeTX == 2) {
            api.EditOutProduct(that.setUploadData1()).then(response => {
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
        } else {
          that.$Message.error("请选择出库商品");
        }
      });
    },
    // 选择物资
    selectMaterial(selection) {
      // 选中的物资列表
      let that = this;
      that.selection = selection;
    },
    selectCustoms(selection) {
      // 选中的供应商列表
      let that = this;
      that.selectionCustoms = selection;
    },
    smalladdForm() {
      let that = this;
      // 选择物资
      for (let i in that.selection) {
        let a = {
          ID: that.selection[i].ID,
          ProductNum: that.selection[i].ProductNum,
          Unit: that.selection[i].Unit,
          Price: that.selection[i].Price,
          num: 1,
          ProductName: that.selection[i].ProductName,
          BarCode: that.selection[i].BarCode,
          BatchNum: that.selection[i].BatchNum,
          LocalName: that.selection[i].LocalName
        };
        that.choosedItemList.push(a);
      }
      that.modal2 = false;
      that.modal3 = false;
    },
    smallResetForm() {
      let that = this;
      that.modal2 = false;
      that.modal3 = false;
    },
    showSmallModal() {
      // 展示物资弹窗
      let that = this;
      that.searchKeyWord = "";
      that.commit;
      // that.$store.commit("changeLoadingPage");
      // that.getSalesGoodsList();
      that.modal2 = true;
    },
    showRemark(row) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "备注详情",
        content: row.Remark
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
        employeeId: that.userMes.EmployeeID,
        beginTime: that.formItem.startDate,
        endTime: that.formItem.endDate,
        OrderNum: that.formItem.userName,
        pageindex: that.tablePage.page,
        pagesize: that.tablePage.pageNum
      };
      // 转换日期
      if (data.beginTime) {
        data.beginTime = echartsCommon.changeTime(data.beginTime);
      }
      if (data.endTime) {
        data.endTime = echartsCommon.changeTime(data.endTime);
      }
      that.tableLoading = true;
      api.getOutStorageList(data).then(response => {
        if (response.error_code === "Success") {
          let status = response.data.list;
          for (let i = 0; i < status.length; i++) {
            status[i].OutType = echartsCommon.OutstorageOutType(
              status[i].OutType
            );
            if (status[i].Status == 1 || status[i].Status == 0) {
              status[i].Status = "审核中";
            }
            if (status[i].Status == 2) {
              status[i].Status = "审核成功";
            }
            if (status[i].Status == 3) {
              status[i].Status = "审核失败";
            }
          }
          let res = response.data;
          that.list = res.list;
          that.tableLoading = false;
          that.$set(that.tablePage, "page", res.page);
          that.$set(that.tablePage, "pageNum", res.size);
          that.$set(that.tablePage, "allNum", res.total);
          that.$set(that.tablePage, "maxPageNum", res.totalPage);
          that.setPage();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    //导出
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    getSalesGoodsList() {
      // 获取出库产品列表
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        productName: that.searchKeyWord
      };
      api.selectProduct(data).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          that.materialsData = response.data;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getCustomsList() {
      // 获取供应商列表
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        productName: that.searchKeyWord
      };
      api.selectCustoms(data).then(response => {
        // that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          that.materialsData1 = response.data;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getSalesProjectList() {
      let that = this;
      let data = {
        page: 1,
        size: 1000
      };
      api.getItemsByValid(data).then(response => {
        // that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          that.projectListData = response.data.list;
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
      that.$store.commit("changeLoadingPage");
      that.getSalesGoodsList();
    });
  }
};
</script>
<style>
.pannel-title i:hover {
  cursor: pointer;
  color: #94bb6d;
}

.ivu-select-dropdown {
  z-index: 99999;
}

.buttongroup {
  margin-left: 323px;
  margin-top: -33px;
}
.ivu-spin {
  /* display: none; */
}
</style>