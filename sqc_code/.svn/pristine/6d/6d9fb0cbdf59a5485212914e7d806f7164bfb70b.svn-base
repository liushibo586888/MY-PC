<template>
  <div class="yjjcz-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker class="DatePicker_time" type="month" :options="options1" placeholder="开始日期" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="StoreID">
              <Select v-model="formItem.StoreID" placeholder="门店" :filterable="true" :label-in-value='true'>
                <Option v-for="(item,index) in storeList" :value="item.value" :label="item.label" :key="index" @click.native='clickStore(item.label)'>{{item.label}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="3">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="exportdosc">导出</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="tableHeight" ref="mainTable" @on-row-dblclick='doubleClick'></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <div class="bottom-box">
    </div>
    <Modal :mask-closable="false" v-model="modal1" :styles="{top: '20px'}" :closable="false" width='1200' class="dialog" ok-text='关闭' cancel-text='导出' @on-cancel="exportTable">
      <div slot='header' class="header not-print">
        护理师:
        <span class="spanBeacname">
          {{BeauticianName}}
        </span>
        业绩详情
      </div>
      <Tabs v-model="tabValue" @on-click='tabClick'>
        <TabPane label="手工数" name="0">
          <div class="checkboxgroup">
            <RadioGroup @on-change="checkboxchange" v-model='isRadionAll'>
              <Radio label="0">全部
                <span v-if="isRadionAll==0">{{CustNum}}个</span>
              </Radio>
              <Radio label="1">新客
                <span v-if="isRadionAll==1">{{CustNum}}个</span>
              </Radio>
              <Radio label="2">跟踪客
                <span v-if="isRadionAll==2">{{CustNum}}个</span>
              </Radio>
              <Radio label="3">老客
                <span v-if="isRadionAll==3">{{CustNum}}个</span>
              </Radio>
              <Radio label="4">护理客
                <span v-if="isRadionAll==4">{{CustNum}}个</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="table-box" id="tableBox">
            <Table ref="sgsTable" :columns="columnsTab0" :data="cwyjDetailData" :height="tableHeight-100"></Table>
          </div>
        </TabPane>

        <TabPane label="小程序数据" name="1">
          <div class='spanBeacname'>总数量：{{allNum}}</div>
          <div class="table-box" id="tableBox">
            <Table ref="xcxTable" :columns="columnsTab1" :data="cwyjDetailData" :height="tableHeight-100"></Table>
          </div>
        </TabPane>

      </Tabs>
      <tableLoadingPage :loading="beauticianloading"></tableLoadingPage>
    </Modal>

    <!-- 客户被那些护理师执行过 数据明细 -->
    <Modal :mask-closable="false" v-model="DetailModel" :styles="{top: '20px'}" width='1200' class="dialog" ok-text='关闭' cancel-text=''>
      <div slot='header' class="header not-print">
        客户:
        <span class="spanBeacname">
          {{CustName}}
        </span>
        的执行详情
      </div>
      <Tabs>
        <TabPane label="护理师执行明细" name="0">
          <div class="table-box" id="tableBox">
            <Table :columns="columnsDetail" :data="ExcuteDetail" :height="tableHeight"></Table>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/index.js";
import moment from "moment";
import echartsCommon from "@/api/Common.js";
import axios from "axios";
export default {
  data() {
    return {
      columnsTab0: [
        {
          title: "编号",
          key: "Number"
        },
        {
          title: "执行日期",
          key: "ExtDT"
        },
        {
          title: "客户名称",
          key: "Name"
        },
        {
          title: "客户状态",
          key: "Status",
          render: (h, parmas) => {
            if (parmas.row.Status == 1) {
              return "新客";
            } else if (parmas.row.Status == 2) {
              return "跟踪客";
            } else if (parmas.row.Status == 3) {
              return "老客";
            } else if (parmas.row.Status == 4) {
              return "护理客";
            }
          }
        },
        {
          title: "门店",
          key: "StoreName"
        },
        {
          title: "备注",
          key: "Num",
          render: (h, parmas) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    var startDate = null,
                      endDate = null,
                      CustomerID = null;
                    let data = {
                      startDate: parmas.row.ExtDT,
                      endDate: parmas.row.ExtDT,
                      CustomerID: parmas.row.CustomerID
                    };
                    this.CustName = parmas.row.Name;
                    this.DetailModel = true;
                    this.QueryBeactionExtCust(data);
                  }
                }
              },
              "客户被  " + parmas.row.Num + "  个护理师执行过(查看)"
            );
          }
        }
      ],
      columnsTab1: [
        {
          title: "日期",
          key: "ExtDT"
        },
        {
          title: "数量",
          key: "CustNum"
        }
      ],
      //客户被执行明细
      columnsDetail: [
        {
          title: "执行日期",
          key: "Date",
          render: (h, parmas) => {
            return echartsCommon.DATEsfm(h, parmas.row.Date);
          }
        },
        {
          title: "创建执行记录日期",
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
          title: "客户名称",
          key: "Name"
        },
        {
          title: "护理师",
          key: "EnName"
        },
        {
          title: "门店",
          key: "StoreName"
        }
      ],
      allNum: 0,
      isRadionAll: 0, //选中的那些 客户类型
      CustNum: 0, //客户数量
      cwyjDetailData: [],
      handleStorage: [], //缓存手工数的数据，搜索时使用
      ExcuteDetail: [], //客户被执行明细数据
      tabValue: "0",
      modal1: false,
      DetailModel: false,
      beauticianloading: true, //显示加载中
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      //护理师id
      BeauticianID: null,
      //护理师名称
      BeauticianName: null,
      //客户名称
      CustName: null,
      // -----
      tableLoading: true,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 200,
      formItem: {
        StartDate: new Date(),
        StoreName: "",
        StoreID: ""
      },
      columns1: [
        {
          title: "护理师",
          key: "BeauticianName",
          align: "center"
        },
        {
          title: "门店",
          key: "StoreName",
          align: "center"
        },
        {
          title: "次数",
          key: "Num",
          align: "center",
          render: (h, parmas) => {
            let Num = Number(parmas.row.Num);
            return h("div", {}, Num);
          }
        },
        // {
        //   title: "业绩",
        //   key: "ConsumptionTotal",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", {}, params.row.ConsumptionTotal.toFixed(2));
        //   }
        // },
        // {
        //   title: "预交金业绩",
        //   key: "RefundMoneyTotal",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", {}, params.row.RefundMoneyTotal.toFixed(2));
        //   }
        // },
        // {
        //   title: "家居业绩",
        //   key: "AllTotal",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", {}, params.row.AllTotal.toFixed(2));
        //   }
        // },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    //marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.doubleClick(params.row);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      list: [],
      storeList: []
    };
  },
  computed: {
    ...mapState({
      authorList: state => state.app.authorList,
      userMes: state => state.app.userMes
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    //导出报表
    exportdosc() {
      let that = this;
      let vueData = that.formItem;
      window.location.href =
        axios.defaults.baseURL +
        "/Export/ExportAreaBeauticianNum?EmployeeId=" +
        that.userMes.EmployeeID +
        "&Date=" +
        echartsCommon.changeTime(vueData.StartDate).slice(0, 7) +
        "&Area=" +
        vueData.StoreID;
    },
    //选择区域
    clickStore(name) {
      this.formItem.StoreName = name;
      this.getList();
    },
    //手工数明细 勾选事件
    checkboxchange(data) {
      this.cwyjDetailData = [];
      if (data != "0") {
        this.handleStorage.forEach((x, index) => {
          if (x.Status == data) this.cwyjDetailData.push(x);
        });
      } else {
        this.cwyjDetailData = this.handleStorage;
      }
      this.CustNum = this.cwyjDetailData.length; //客户数量
    },
    tabClick(name) {
      this.tabType = name;
      this.cwyjDetailData = [];
      this.handleStorage = [];
      var startDate = null,
        beauticianID = null,
        type = null;
      let param = {
        beauticianID: this.BeauticianID,
        startDate: echartsCommon
          .changeTime(this.formItem.StartDate)
          .slice(0, 7),
        type: "0"
      };
      switch (name) {
        case "0":
          param.type = name;
          this.isRadionAll = 0;
          this.QueryBeauticianItemDetail(param, name);
          break;
        case "1":
          param.type = name;
          param.type = "1";
          this.wechartItemDetail(param);
          break;
      }
    },
    doubleClick(row) {
      let that = this;
      that.tabValue = "0";
      that.modal1 = true;
      this.BeauticianID = row.BeauticianID;
      this.BeauticianName = row.BeauticianName;
      that.tabClick(that.tabValue);
    },
    QueryBeauticianItemDetail(param, type) {
      this.beauticianloading = true;
      api.QueryBeauticianItemDetail(param).then(res => {
        this.beauticianloading = false;
        if (res.error_code == "Success") {
          this.cwyjDetailData = res.data;
          if (type == 0) {
            this.handleStorage = res.data; //缓存数据 搜索手工数使用
            this.CustNum = res.data.length;
          }
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 10
          });
        }
      });
    },
    wechartItemDetail(param) {
      this.beauticianloading = true;
      api.getwechartItemDetail(param).then(res => {
        this.beauticianloading = false;
        if (res.error_code == "Success") {
          this.cwyjDetailData = res.data;
          //求和
          this.allNum = this.cwyjDetailData.reduce(
            (totalPrice, item) => totalPrice + item.CustNum,
            0
          );
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 10
          });
        }
      });
    },
    //查询客户被执行的明细
    QueryBeactionExtCust(param) {
      api.QueryBeactionExtCust(param).then(res => {
        if (res.error_code == "Success") {
          this.ExcuteDetail = res.data;
        } else {
          that.$Message.info({
            content: res.error_message,
            duration: 10
          });
        }
      });
    },
    searchForm() {
      // 搜索表格
      let that = this;
      that.getList();
    },
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById("tableBox").offsetHeight;
      window.onresize = function() {
        that.tableHeight = document.getElementById("tableBox").offsetHeight;
      };
    },
    getList() {
      setTimeout(() => {
        let that = this;
        let userMessage = JSON.parse(localStorage.userMessage);
        let data = {
          EmployeeId: that.userMes.EmployeeID,
          Date: echartsCommon.changeTime(that.formItem.StartDate).slice(0, 7),
          Area: that.formItem.StoreID
        };
        api.getAreaBeauticianNum(data).then(res => {
          if (res.error_code === "Success") {
            that.tableLoading = false;
            that.list = res.data;
          } else {
            that.$Message.error(res.error_message);
          }
        });
      }, 100);
    },
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.GetCascaderStore(data).then(res => {
        if (res.error_code == "Success") {
          if (res.data.length > 0) {
            that.formItem.StoreID = res.data[0].value;
            that.formItem.StoreName = res.data[0].label;
          }
          that.storeList = res.data;
          that.getList();
        } else {
          that.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    exportTable() {
      let that = this;
      if (that.tabType == 0) {
        that.$refs.sgsTable.exportCsv({
          filename: `${new Date().getTime()}${document.title}`
        });
      } else {
        that.$refs.xcxTable.exportCsv({
          filename: `${new Date().getTime()}${document.title}`
        });
      }
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getStore();
    });
  }
};
</script>
<style scoped>
.bqitem {
  display: flex;
  justify-content: space-between;
}
.spanBeacname {
  font-size: 16px;
  font-weight: bold;
}
.checkboxgroup {
  margin-top: -1vh;
  margin-bottom: -2vh;
  margin-left: 1vh;
}
.Handlecheckbox {
  font-size: 16px;
  color: #515a6e;
}
</style>

