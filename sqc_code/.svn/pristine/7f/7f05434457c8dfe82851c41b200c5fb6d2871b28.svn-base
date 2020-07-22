<template>
  <div class="cwsr-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">

          <i-col span="3">
            <FormItem prop="Storelist">
              <Cascader v-model="formItem.Storelist" style="width:10.5vw;font-size:14px;font-weight:bold;" :data="storeList" trigger="hover"></Cascader>
              <!-- <Select v-model="formItem.StoreID" placeholder="门店" :filterable="true">
                <Option value="all" @click.native="choose()">所有</Option>
                <Option v-for="item in storeList" :value="item.ID" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option> 
              </Select> -->
            </FormItem>
          </i-col>

          <i-col span="3">
            <formItem prop="ArrayDate">
              <DatePicker v-model="formItem.ArrayDate" :value="RangeDate" format="yyyy-MM-dd" type="daterange" :clearable="false" placement="bottom-start" placeholder="选择日期" style="width:10.5vw;"></DatePicker>
            </formItem>
          </i-col>

          <i-col span="3">
            <FormItem prop="PayID">
              <!--
              <Cascader :data="data" trigger="hover"></Cascader>-->
              <Select v-model="formItem.PayID" placeholder="支付方式" style="width:10.5vw" filterable clearable>
                <Option v-for="(item,index) in PayWaylist" :value="item.ID" :key="index">{{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="3">
            <Input v-model="formItem.Name" placeholder="客户名称" style="width:10.5vw" />
          </i-col>
          <i-col span="3">
            <Input v-model="formItem.BeauticianName" placeholder="护理师名称" style="width:10.5vw" />
          </i-col>
          <i-col span="4">
            <formItem class="btn-box">
              <Button type="primary" icon="ios-search" @click="searchForm">搜索</Button>
              <Button type="info" v-show="ActualMoneyShow" style="width:78px;" @click="ActualModalFrom">添加</Button>
              <Button size="small" icon="ios-download-outline" type="success" @click="ClickOpen">项目/产品</Button>
              <!--<Icon type="ios-add-circle-outline" />  <Button type="primary" class="btn">搜索</Button>
              <Button type="warning" class="btn" @click="resetSearch">重置</Button>-->
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>

    <Modal :mask-closable="false" v-model="ActualModal" width="800" class-name="vertical-center-modal" draggable @on-cancel='guanbi'>
      <div slot='header' class="header not-print" style="font-size:15px">
        <strong v-show="btnShow">添加实际到账信息</strong>
        <strong v-show="editShow">{{StoreName}}</strong>
      </div>
      <Form :model="AddFormItem" ref="AddFromModal" :label-width="300">
        <row>
          <i-col span="20" v-show="btnShow">
            <!-- btnShow 这个是判断确定按钮是否显示的 同时在这里判断编辑时不显示门店-->
            <FormItem prop='StorelistAdd' style="font-size:14px;font-weight:bold;" placeholder="可以手动输入" label="选择到账门店">
              <Cascader v-model="AddFormItem.StorelistAdd" style="width:230px;font-size:14px;font-weight:bold;" :data="storeList" trigger="hover"></Cascader>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='CustID' style="font-size:14px;font-weight:bold;" label="项目">
              <Select v-model="AddFormItem.ItemType" style="width:230px">
                <Option value="0">项目</Option>
                <Option value="1">产品</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='PayID' style="font-size:14px;font-weight:bold;" placeholder="可以手动输入" label="到账的支付方式">
              <Select v-model="AddFormItem.PayID" style="width:230px" filterable>
                <Option :disabled="isReadonly" v-for="(item,index) in PayWaylist" :value="item.ID" :key="index">
                  {{item.Name}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="20">
            <!-- @on-query-change="onCascader"-->
            <FormItem prop='CustID' style="font-size:14px;font-weight:bold;" label="到账的客户">
              <Select :disabled="isReadonly" v-model="AddFormItem.CustID" style="width:230px" remote filterable clearable :remote-method="onCascader" placeholder="请输入客户">
                <Option v-for="(item,index) in CustList" :value="item.ID" :key="index">{{item.Name+"--"+item.StoreName}}
                </Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='BeauticianID' style="font-size:14px;font-weight:bold;" label="护理师">
              <Select v-model="AddFormItem.BeauticianID" style="width:230px" filterable clearable>
                <Option v-for="(item,index) in BeauticianList" :value="item.BeauticianID" :key="index">
                  {{item.BeauticianName}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='SceneEmployeeID' style="font-size:14px;font-weight:bold;" label="总监">
              <Select v-model="AddFormItem.SceneEmployeeID" style="width:230px" filterable clearable>
                <Option v-for="(item,index) in SceneEmployeeList" :value="item.SceneEmployeeID" :key="index">
                  {{item.SceneEmployeeName}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='Date' style="font-size:14px;font-weight:bold;" label="实际到账时间">
              <DatePicker :readonly="isReadonly" v-model="AddFormItem.Date" style="width:230px" class="DatePicker_time" type="date" :options="options1" placeholder="到账时间"></DatePicker>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem prop='ActualMoney' style="font-size:14px;font-weight:bold;" label="实际到账金额">
              <InputNumber v-model="AddFormItem.ActualMoney" style="width:230px" :max="1000000" :min="-100000">
              </InputNumber>
            </FormItem>
          </i-col>

          <i-col span="20">
            <FormItem style="text-align:right;margin-right:12vh;">
              <Button style="width:12vh;" type="primary" v-show="btnShow" shape="circle" @click="AddFormInfo">确定</Button>
              <Button style="width:12vh;" type="info" v-show="editShow" shape="circle" @click="EditInfo">修改</Button>
            </FormItem>
          </i-col>
        </row>
      </Form>
      <div slot='footer'></div>
      <!--
      <tableLoadingPage :loading="tablesloading"></tableLoadingPage>
      -->
    </Modal>

    <!--项目产品明细-->
    <Modal :mask-closable="false" v-model="modal1" :styles="{top: '20px'}" width='80vw' @on-cancel='guanbi'>
      <div slot='header' class="header not-print">
        项目和产品详情
      </div>
      <Tabs v-model="tabValue" @on-click='tabClick'>
        <TabPane label="收费(项目/产品)" name="0">
          <div class="checkboxgroup">
            <RadioGroup @on-change="checkboxchange" v-model='isRadionAll'>
              <Radio label="0">全部 <span v-if="isRadionAll==0"></span></Radio>
              <Radio label="1">产品 <span v-if="isRadionAll==1"></span>
              </Radio>
              <Radio label="2">项目 <span v-if="isRadionAll==2"></span> </Radio>
            </RadioGroup>
          </div>

          <div class="table-box" id="tableBox">
            <Table ref="ProductItme" :columns="fistTab" :data="ChangeData" :height="tableHeight"></Table>
            <div class="exportdiv">
              <Button type="primary" @click="exportData" size="large">
                <Icon type="ios-download-outline"></Icon>导出(项目/产品)数据
              </Button>
            </div>

          </div>
        </TabPane>
        <!--
        <TabPane label="退费(项目/产品)" name="1">
          <div class="table-box" id="tableBox">
            <Table :columns="cnjscolumns" :data="ChangeData" :height="tableHeight"></Table> 
          </div>
        </TabPane> 
  
        <TabPane label="欠款回收(项目/产品)" name="2">
          <div class="table-box" id="tableBox">
            <Table :columns="cnjscolumns" :data="ChangeData" :height="tableHeight"></Table> 
          </div>
        </TabPane> 

          <TabPane label="预交金(账户充值)" name="3">
          <div class="table-box" id="tableBox">
            <Table :columns="cnjscolumns2" :data="ChangeData" :height="tableHeight"></Table> 
          </div>
        </TabPane> 

        <TabPane label="预交金退费(账户退费)" name="4">
          <div class="table-box" id="tableBox">
            <Table :columns="cnjscolumns2" :data="ChangeData" :height="tableHeight"></Table> 
          </div>
        </TabPane> 
         -->
      </Tabs>
      <tableLoadingPage :loading="tablesloading"></tableLoadingPage>
      <div slot="footer"></div>
    </Modal>

    <!--项目和产品结束-->

    <div class="table-box" id="tableBox">
      <Table stripe :columns="columns1" :row-class-name="rowClassName" :data="list" highlight-row :height="setTableHeight" ref="mainTable">
      </Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <div class="bottom-box">
      <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
      <!-- <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
            <i-button class="btn btn-prev" type="ghost">上一页</i-button>
            <i-button class="btn btn-next" type="primary">下一页</i-button>
            <div class="page-box">
                <p>前往</p>
                 <Input-number :max="tablePage.maxPageNum" :min="1" :value="1"></Input-number>
                <p>页</p>
            </div> -->
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { mapState } from "vuex";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
import btnQX from "@/api/btnQX.js";
export default {
  data() {
    return {
      ActualMoneyShow: false, //判断是否有权限添加实际到账
      //时间回到今天
      //options1: echartsCommon.shortcuts(),
      options1: {
        disabledDate(date) {
          return date && date.valueOf() >= Date.now();
        }
      },
      // -----
      tableLoading: false,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      RangeDate: [], //范围日期
      formItem: {
        StartDate: new Date(),
        EndDate: new Date(),
        EmployeeID: "",
        Name: null, //客户名称
        BeauticianName: null, //护理师名称
        Storelist: [],
        StoreID: null,
        PayID: 0,
        ArrayDate: "",
        sType: "0" //显示产品时 显示tab中的第几项数据
      },
      //添加实际到账的信息
      AddFormItem: {
        PayID: null,
        Date: new Date(),
        Amount: 0, //实际金额
        ItemType: "0", //到账的是项目还是产品
        CustID: null, //客户id
        BeauticianID: "", //护理师id
        SceneEmployeeID: "", //总监的id
        ActualMoney: 0, //实际到账金额
        OperatorPes: null, //当前人
        StoreID: null,
        StorelistAdd: [], //添加真是到账时使用
        ID: "" //记录要编辑那一条的id 修改时使用
      },
      tableHeight: 400,
      ActualModal: false, //添加实际到账信息
      PayWaylist: [], //支付方式列表
      isReadonly: false, //是否只读 编辑金额使用
      btnShow: false, //确定按钮是否显示
      editShow: false, //编辑按钮
      columns1: [
        {
          title: "门店名称",
          key: "StoreName",
          align: "center"
        },
        {
          title: "实收金额",
          key: "Amount",
          align: "center"
        },
        {
          title: "到账金额",
          key: "ActualMoney",
          align: "center"
        },
        {
          title: "支付方式",
          key: "PayName",
          align: "center"
        },
        {
          title: "项目/产品",
          key: "ItemName",
          align: "center"
        },
        {
          title: "收费日期",
          key: "Date",
          align: "center",
          render: (h, parmas) => {
            if (parmas.row.StoreName == "合计") {
              return;
            }
            return echartsCommon.changeTime(parmas.row.Date);
          }
        },
        {
          title: "录入时间",
          key: "OperatorDate",
          align: "center",
          render: (h, parmas) => {
            if (parmas.row.StoreName == "合计") {
              return;
            } else {
              return echartsCommon.changeTimeHms(parmas.row.OperatorDate);
            }
          }
        },
        {
          title: "客户名称",
          key: "Name",
          align: "center"
        },
        {
          title: "客户号码",
          key: "Phone",
          align: "center"
        },
        {
          title: "护理师",
          key: "BeauticianName",
          align: "center"
        },
        {
          title: "总监",
          key: "SceneName",
          align: "center"
        },
        {
          title: "操作人",
          key: "OperatorPes",
          align: "center"
        },
        {
          title: "编辑信息",
          key: "EditRecord",
          ellipsis: true,
          align: "center",
          render: (h, params) => {
            if (!params.row.EditRecord) {
              return "";
            }
            let text =
              params.row.EditRecord.length > 10
                ? params.row.EditRecord.substr(0, 10) + "...."
                : params.row.EditRecord;
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.showRemark(params.row);
                  }
                },
                style: {
                  cursor: "pointer"
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            if (params.row.StoreName == "合计" || params.row.ID == 0) {
              return;
            }
            if (this.ActualMoneyShow) {
              return h("div", [
                h(
                  "Tooltip",
                  {
                    props: { placement: "top", content: "编辑" }
                  },
                  [
                    h("i", {
                      style: {
                        marginRight: "5px"
                      },
                      class: {
                        "ivu-icon": true,
                        "ivu-icon-aaa-bianji": true,
                        "icon-btn": true
                      },
                      on: {
                        click: () => {
                          // console.log(params.row.ID)
                          this.EditFormInfo(params.row.ID);
                        }
                      }
                    })
                  ]
                )
              ]);
            }
          }
        }
      ],

      //原来的 财务收入表的数据 2019年12月28日09:42:51 注释 修改成 财务确认表的信息
      // columns1: [
      //   {
      //     title: "项目分类",
      //     key: "ItemCategoryName",
      //     align: "center"
      //   },
      //   {
      //     title: "货币金额",
      //     key: "CashAmount",
      //     align: "center",
      //     render: (h, parmas) => {
      //       let money = Number(parmas.row.CashAmount);
      //       return h("div", {}, money.toFixed(2));
      //     }
      //   },
      //   {
      //     title: "预交金额",
      //     key: "PrepaymentAmount",
      //     align: "center",
      //     render: (h, parmas) => {
      //       let money = Number(parmas.row.PrepaymentAmount);
      //       return h("div", {}, money.toFixed(2));
      //     }
      //   },
      //   {
      //     title: "欠费",
      //     key: "ArrearsAmount",
      //     align: "center",
      //     render: (h, parmas) => {
      //       let money = Number(parmas.row.ArrearsAmount);
      //       return h("div", {}, money.toFixed(2));
      //     }
      //   },
      //   {
      //     title: "总价",
      //     key: "AllTotal",
      //     align: "center",
      //     render: (h, parmas) => {
      //       let money = Number(parmas.row.AllTotal);
      //       return h("div", {}, money.toFixed(2));
      //     }
      //   },
      //   {
      //     title: "代金券",
      //     key: "InsteadMoneyAmount",
      //     align: "center"
      //   }
      // ],
      list: [],
      storeList: [],
      CustList: [], //客户数据列表
      BeauticianList: [], //返回的护理师list
      SceneEmployeeList: [], //返回总监的数据
      lock: true,
      StoreName: null,

      modal1: false, //查询项目和产品明细
      tablesloading: false,
      tabValue: "0",
      isRadionAll: "1", //选中的是项目还是产品
      ChangeData: [], //显示项目和产品
      StorageData: [], //先存储一下返回的产品数据
      clickNum: "", //控制点击次数
      fistTab: [
        {
          title: "开单日期",
          key: "infoDate",
          render: (h, parmas) => {
            return echartsCommon.DATEsfm(h, parmas.row.infoDate);
          }
        },
        {
          title: "收费日期",
          key: "Date1",
          render: (h, parmas) => {
            return echartsCommon.DATEsfm(h, parmas.row.Date1);
          }
        },
        {
          title: "项目名称",
          key: "ItemName"
        },
        {
          title: "产品名称",
          key: "GoodsName"
        },
        {
          title: "金额",
          key: "Amount"
        },
        {
          title: "支付方式",
          key: "PayName"
        },
        {
          title: "客户名称",
          key: "Name"
        },
        {
          title: "护理师",
          key: "BeauticianName"
        },
        {
          title: "门店",
          key: "StoreName"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    ClickOpen() {
      let that = this;
      that.modal1 = true; //显示
      that.tabValue;
      that.tabClick(that.tabValue);
    },
    tabClick(name) {
      let that = this;
      if (that.clickNum == name) {
        return;
      }
      that.ChangeData = [];
      that.StorageData = [];
      that.formItem.EmployeeID = that.userMes.EmployeeID;
      let data = that.formItem;
      if (data.ArrayDate.length > 0) {
        data.StartDate = echartsCommon.changeTime(data.ArrayDate[0]);
        data.EndDate = echartsCommon.changeTime(data.ArrayDate[1]);
        that.formItem.StartDate = data.StartDate;
        that.formItem.EndDate = data.EndDate;
      }
      that.formItem.StoreID =
        data.Storelist.length > 0 ? data.Storelist[1] : null;
      switch (name) {
        case "0":
          that.sType = name;
          that.clickNum = name;
          this.QueryChangeItemDetail(that.formItem);
          break;
      }
    },
    checkboxchange(data) {
      this.tablesloading = true;
      this.FiltTypeData(this.StorageData, data);
      this.tablesloading = false;
    },
    //查询门店对应的信息
    QueryChangeItemDetail(params) {
      this.tablesloading = true;
      api.QueryChangeItemDetail(params).then(res => {
        if (res.error_code == "Success") {
          this.StorageData = res.data;
          this.FiltTypeData(res.data, this.isRadionAll);
          this.tablesloading = false;
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    FiltTypeData(data, type) {
      this.ChangeData = [];
      if (type == "0") {
        this.ChangeData = data;
      } else if (type == "1") {
        data.forEach(x => {
          if (x.GoodsName != null) {
            this.ChangeData.push(x);
          }
        });
      } else if (type == "2") {
        data.forEach(x => {
          if (x.ItemName != null) {
            this.ChangeData.push(x);
          }
        });
      }
    },
    //查询所有客户
    onCascader(params) {
      // if(params.length>=1){    }
      api.ByStoreAutoQueryCust(params).then(res => {
        if (res.error_code == "Success") {
          this.CustList = res.data;
        } else {
          this.CustList = [];
        }
      });
    },
    CustBeautician() {
      api.ByCustIdQueryBeautician().then(res => {
        if (res.error_code == "Success") {
          this.BeauticianList = res.data.listEmployee;
          this.SceneEmployeeList = res.data.listScene;
        } else {
          this.BeauticianList = [];
          this.SceneEmployeeList = [];
        }
      });
    },
    showRemark(row) {
      // 显示备注
      let that = this;
      that.$Modal.info({
        title: "编辑详情",
        content: row.EditRecord
      });
    },
    guanbi() {
      //点击关闭对话框清除数据
      this.$refs.AddFromModal.resetFields();
      this.clickNum = "";
      this.isRadionAll = "1";
    },
    rowClassName(row) {
      if (row.StoreName == "合计") {
        return "demo-table-error-row";
      }
    },
    ActualModalFrom() {
      this.lock = true; //设置重复提交的锁
      this.ActualModal = true;
      this.btnShow = true; //确定按钮显示
      this.editShow = false; //修改按钮是否显示
      this.isReadonly = false; //是否只读
      if (this.storeList.length > 0) {
        let city = this.storeList[0].value;
        let store = this.storeList[0].children[0].value;
        this.AddFormItem.StorelistAdd = [city, store];
      }
      this.onCascader(""); //查询客户数据
      this.CustBeautician(); //查询护理师数据
    },
    //获取支付方式
    GetPayList() {
      api.getReturnMoneyPayMent().then(res => {
        if ((res.error_code = "Success")) {
          this.PayWaylist = res.data.list;
        } else {
          this.$Message.info({
            content: "到账支付方式获取失败",
            duration: 5
          });
        }
      });
    },
    //编辑实际到账金额
    EditInfo() {
      if (!this.lock) {
        this.$Message.info({
          content: "不能重复提交",
          duration: 5
        });
        return;
      }
      this.lock = false;
      this.AddFormItem.OperatorPes = this.userMes.EmployeeID;
      api.editRevenueCheck(this.AddFormItem).then(res => {
        if (res.error_code == "Success") {
          this.ActualModal = false;
          this.$Message.info({
            content: "修改成功",
            duration: 5
          });
          this.getList();
          this.guanbi();
        } else {
          this.$Message.info({
            content: res.error_message == null ? "修改失败" : res.error_message,
            duration: 5
          });
        }
      });
    },
    //添加实际到账
    AddFormInfo() {
      if (!this.lock) {
        this.$Message.info({
          content: "不能重复提交",
          duration: 5
        });
        return;
      }
      this.lock = false;
      var addlist = this.AddFormItem;
      addlist.StoreID =
        addlist.StorelistAdd.length > 0 ? addlist.StorelistAdd[1] : null;
      addlist.OperatorPes = this.userMes.EmployeeID;
      addlist.Date = echartsCommon.changeTime(addlist.Date);
      if (
        addlist.PayID == null ||
        addlist.CustID == null ||
        addlist.CustID == undefined ||
        addlist.OperatorPes == null ||
        addlist.StoreID == null
      ) {
        return;
      }
      api.RevenueMoney(addlist).then(res => {
        if (res.error_code == "Success") {
          this.ActualModal = false;
          this.$Message.info({
            content: "添加成功",
            duration: 5
          });
          this.getList();
          this.guanbi();
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    //编辑时间到账金额
    EditFormInfo(ID) {
      this.CustBeautician(); //查询护理师数据
      this.lock = true; //设置编辑成功后的锁
      let id = {
        ID: ID
      };
      api.SigleInfo(ID).then(res => {
        this.AddFormItem.CustID = null;
        this.CustList = [];
        if (res.error_code == "Success") {
          this.AddFormItem.CustID = res.data.CustID;
          this.CustList = res.data.Custlist; //单独返回一个数组
          this.AddFormItem.ActualMoney = res.data.ActualMoney;
          this.AddFormItem.Date = res.data.Date;
          this.AddFormItem.PayID = res.data.PayID;
          this.AddFormItem.ID = res.data.ID;
          this.AddFormItem.ItemType = res.data.ItemType;
          this.AddFormItem.BeauticianID = res.data.BeauticianID;
          this.AddFormItem.SceneEmployeeID = res.data.SceneEmployeeID;
          this.StoreName = "编辑" + res.data.StoreName + "到账信息";
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
          return;
        }
      });

      this.ActualModal = true;
      this.isReadonly = true;
      this.editShow = true;
      this.btnShow = false;
      this.isReadonly = true;
    },
    resetSearch() {
      // 重置搜索
      let that = this;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    searchForm() {
      // 搜索表格
      let that = this;
      //判断两个时间段大小
      echartsCommon.message = that.$Message;
      that.getList();
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
      let userMessage = JSON.parse(localStorage.userMessage);
      that.formItem.EmployeeID = userMessage.EmployeeID;
      let data = that.formItem;
      if (data.ArrayDate.length > 0) {
        data.StartDate = echartsCommon.changeTime(data.ArrayDate[0]);
        data.EndDate = echartsCommon.changeTime(data.ArrayDate[1]);
        that.formItem.StartDate = data.StartDate;
        that.formItem.EndDate = data.EndDate;
      }
      that.formItem.StoreID =
        data.Storelist.length > 0 ? data.Storelist[1] : null;

      that.tableLoading = true;
      api.RevenueCheckList(that.formItem).then(res => {
        that.tableLoading = false;
        if (res.error_code == "Success") {
          that.list = res.data;
          let Total = {
            StoreName: "合计",
            ActualMoney: 0,
            Amount: 0
          };
          res.data.forEach(x => {
            Total.ActualMoney += Number(x.ActualMoney);
            Total.Amount += Number(x.Amount);
          });
          if (that.list.length > 0) {
            that.list.push(Total);
          }
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
      //原来的财务收入查询的数据
      //that.tableLoading = true;
      // api.getFinancialIncomeStatement(that.formItem).then(response => {
      //   that.tableLoading = false;
      //   if (response.error_code === "Success") {
      //     that.list = response.data.list;
      //     let a = {
      //       ItemCategoryName: "合计",
      //       CashAmount: 0,
      //       PrepaymentAmount: 0,
      //       ArrearsAmount: 0,
      //       AllTotal: 0,
      //       InsteadMoneyAmount: 0
      //     };
      //     for (let i of that.list) {
      //       a.CashAmount += Number(i.CashAmount);
      //       a.PrepaymentAmount += Number(i.PrepaymentAmount);
      //       a.ArrearsAmount += Number(i.ArrearsAmount);
      //       a.AllTotal += Number(i.AllTotal);
      //       a.InsteadMoneyAmount += Number(i.InsteadMoneyAmount);
      //     }
      //     if (that.list.length > 0) {
      //       that.list.push(a);
      //     }
      //   } else {
      //     that.$Message.error(response.error_message);
      //   }
      // });
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    /*导出护理师的产品和项目数据*/
    exportData() {
      this.$refs.ProductItme.exportCsv({
        filename: `${new Date().getTime()}` + "护理师产品明细",
        columns: this.fistTab,
        data: this.ChangeData
      });
    },
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.GetCascaderStore(data).then(res => {
        this.storeList = [];
        this.CustList = []; //客户数据列表
        this.BeauticianList = []; //返回的护理师list
        if (res.error_code == "Success") {
          if (res.data.length > 0) {
            let city = res.data[0].value;
            let store = res.data[0].children[0].value;
            that.formItem.Storelist = [city, store];
          }
          that.storeList = res.data;
          that.GetPayList(); //获取门店成功后再获取支付方式
          that.searchForm();
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    choose(name, id) {
      if (name === undefined && id === undefined) {
        this.formItem.store = "所有";
        this.formItem.StoreID = null;
      } else {
        this.formItem.store = name;
        this.formItem.StoreID = id;
      }
    },
    //设置日期
    Yesterday() {
      let oneday = 1000 * 60 * 60 * 24;
      let today = new Date(
        echartsCommon.changeTime(new Date()).slice(0, 8) + "01"
      );
      let dt = new Date(today.getTime() + oneday * 15);
      this.RangeDate.push(today);
      this.RangeDate.push(dt);
      this.formItem.ArrayDate = this.RangeDate;
    }
  },
  created() {
    this.getStore(); //加载门店
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      //that.getStore();
      that.initTableHeight();
      that.Yesterday();
      that.ActualMoneyShow = btnQX.apiUrlList("/finance/RevenueMoney"); //接收是否有退费权限
    });
  }
};
</script>
<style>
/* .vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ivu-icon {
  font-size: 16px;
}

.container .search-box button[class*="btn-"]:not(:last-child) {
  margin-right: 8px;
}

.checkboxgroup {
  margin-top: -1vh;
  margin-bottom: 1vh;
  margin-left: 1vh;
}

.dialog button[class*="btn"] {
  width: 9vw;
  height: 4vh;
}

.exportdiv {
  margin-top: 1vh;
} */
</style>