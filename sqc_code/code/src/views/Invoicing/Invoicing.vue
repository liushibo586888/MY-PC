<template>
  <div class="zfmx-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="4">
            <formItem prop="StartDate" label="过期时间：" :label-width="80">
              <DatePicker type="date" class="DatePicker_time" placeholder="开始日期" :options="options1" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker type="date" class="DatePicker_time" placeholder="结束日期" :options="options1" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="KeyWord">
              <Input v-model="formItem.KeyWord" placeholder="商品名称或者编号"></Input>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="门店" :filterable="true">
                <!-- <Option value="all" @click.native="choose()">所有</Option> -->
                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="11">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
              <!-- <Button type="success" class="btn btn-search" @click="tianjia">添加</Button> -->
              <Button type="error" class="btn btn-reset" @click="xiugai">修改</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable" @on-row-click="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <!-- 修改弹窗 -->
    <Modal :mask-closable="false" v-model="modal" width="800" class="dialog">
      <div slot='close' class="close not-print" @click="quXiao">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="100" @submit.native.prevent class="form">
        <row type="flex" style="margin-right:30px">
          <i-col span="24">
            <FormItem prop="LastTime" label="过期时间:">
              <DatePicker type="date" class="DatePicker_time" v-model="LastTime" placeholder="选择过期时间" :options="options1" :clearable="false" :editable="false"></DatePicker>
            </FormItem>
          </i-col>
        </row>

      </Form>
      <div slot="footer" class="footer not-print">
        <Button class="btn" type="primary" @click="baoCun" :loading="onLoading">保存</Button>
        <Button class="btn" type="warning" @click="quXiao" :loading="onLoading">取消</Button>
      </div>
    </Modal>

    <!-- 添加弹窗 -->
    <!-- <Modal :mask-closable="false" v-model="modal1" width="800" class="dialog">
            <div slot='close' class="close not-print" @click="quXiaoTJ">
                <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
            </div>
            <Form ref="formValidateTJ" :model="formValidateTJ" :label-width="100" @submit.native.prevent class="form">
                <row type="flex" style="margin-right:30px">
                    <i-col span="8">
                        <FormItem prop="StoreName" label="门店名称:">
                            <Input v-model="formValidateTJ.StoreName" placeholder="无" :disabled="true"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem prop="Year" label="年份:">
                            <Input v-model="formValidateTJ.Year" placeholder="无"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem prop="Month" label="月份:">
                            <Input v-model="formValidateTJ.Month" placeholder="无"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" style="margin-right:30px">
                    <i-col span="8">
                        <FormItem prop="EarlyGoal" label="上旬业绩目标:">
                            <Input v-model="formValidateTJ.EarlyGoal" placeholder="无"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem prop="MiddleGoal" label="中旬业绩目标：">
                            <Input v-model="formValidateTJ.MiddleGoal" placeholder="无"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem prop="LateGoal" label="下旬业绩目标：">
                            <Input v-model="formValidateTJ.LateGoal" placeholder="无"></Input>
                        </FormItem>
                    </i-col>
                </row>
            </Form>
            <div slot="footer" class="footer not-print">
                <Button class="btn" type="primary" @click="baoCunTJ" :loading="onLoading">保存</Button>
                <Button class="btn" type="warning" @click="quXiaoTJ" :loading="onLoading">取消</Button>
            </div>
        </Modal> -->

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
  </div>
</template>
<script>
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
      Sn: "",
      LastTime: new Date(),
      onLoading: false,
      tableLoading: true,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      modal: false, //修改
      modal1: false, //添加
      tableHeight: 40,
      rowID: "",
      formValidate: {
        time: ""
      },
      formValidateTJ: {
        StoreId: "",
        StoreName: "",
        Year: "",
        Month: "",
        EarlyGoal: "",
        MiddleGoal: "",
        LateGoal: ""
      },
      formItem: {
        StartDate: new Date(),
        EndDate: new Date(),
        KeyWord: "",
        StoreID: null,
        EmployeeID: "",
        store: "all",
        page: "",
        size: ""
      },
      columns1: [
        {
          title: "产品编号",
          key: "ProductNum",
          align: "center"
        },
        {
          title: "产品名称",
          key: "ProductName",
          align: "center"
        },
        {
          title: "库存数量",
          key: "Num",
          align: "center"
        },
        {
          title: "散装数量",
          key: "TotalUnitNum",
          align: "center"
        },
        {
          title: "转换后库存",
          key: "sjkc",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {},
              Math.floor(params.row.TotalUnitNum / params.row.StockQuantity) +
                "余" +
                params.row.TotalUnitNum % params.row.StockQuantity
            );
          }
        },
        {
          title: "规格",
          key: "Standard",
          align: "center"
        },
        {
          title: "条形码",
          key: "BarCode",
          align: "center"
        },
        {
          title: "批次",
          key: "BatchNum",
          align: "center"
        },
        {
          title: "创建时间",
          key: "CreateTime",
          align: "center",

          render: (h, params) => {
            return h(
              "div",
              {},
              moment(params.row.CreateTime).format("YYYY-MM-DD")
            );
          }
        },
        {
          title: "过期时间",
          key: "LastTime",
          align: "center",

          render: (h, params) => {
            return h(
              "div",
              {},
              moment(params.row.LastTime).format("YYYY-MM-DD")
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
      storeList: []
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
    // tianjia() {
    //   let that = this;
    //   that.modal1 = true;
    // },
    // baoCunTJ() {
    //   let that = this;
    //   that.onLoading = true;
    //   let data = {
    //     StoreId: that.formValidateTJ.StoreId,
    //     Year: that.formValidateTJ.Year,
    //     Month: that.formValidateTJ.Month,
    //     EarlyGoal: that.formValidateTJ.EarlyGoal,
    //     MiddleGoal: that.formValidateTJ.MiddleGoal,
    //     LateGoal: that.formValidateTJ.LateGoal
    //   };
    //   api.PerformanceTargetAdd(data).then(response => {
    //     if (response.error_code === "Success") {
    //       that.$Message.success("添加成功");
    //       that.getList();
    //       that.onLoading = false;
    //       that.quXiaoTJ();
    //     } else {
    //       that.$Message.error(response.error_message);
    //       that.onLoading = false;
    //       //   that.quXiaoTJ();
    //     }
    //   });
    // },
    // quXiaoTJ() {
    //   let that = this;
    //   that.$refs.formValidateTJ.resetFields();
    //   that.modal1 = false;
    // },
    getRowID(row) {
      let that = this;
      that.Sn = row.Sn;
      that.LastTime = row.LastTime;
    },
    xiugai() {
      let that = this;
      if (!that.Sn) {
        that.$Message.error("请选择一条数据");
      } else {
        that.modal = true;
        that.setData();
      }
    },
    setData() {
      let that = this;
      that.formValidate.time = that.LastTime;
    },
    searchForm() {
      // 搜索表格
      let that = this;
      //判断两个时间段大小

      if (
        echartsCommon.ContrastTime(
          this.$Message,
          that.formItem.StartDate,
          that.formItem.EndDate
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
    quXiao() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal = false;
    },
    baoCun() {
      let that = this;
      that.onLoading = true;
      let data = {
        Sn: that.Sn,
        LastTime: that.LastTime
      };
      data.LastTime = moment(data.LastTime).format("YYYY-MM-DD");
      api.LocationProductupdateTime(data).then(response => {
        if (response.error_code === "Success") {
          that.$Message.success("修改成功");
          that.getList();
          that.onLoading = false;
          that.quXiao();
        } else {
          that.$Message.error(response.error_message);
          that.onLoading = false;
          //   that.quXiao();
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
      setTimeout(() => {
        let that = this;
        let userMessage = JSON.parse(localStorage.userMessage);
        // that.formItem.EmployeeID = userMessage.EmployeeID;
        that.formItem.page = that.tablePage.page;
        that.formItem.size = that.tablePage.pageNum;
        let data = {
          Key: that.formItem.KeyWord,
          StoreId: that.formItem.StoreID,
          StartTime: that.formItem.StartDate,
          EndTime: that.formItem.EndDate,
          PageIndex: that.formItem.page,
          PageSize: that.formItem.size
        };
        if (data.StartTime) {
          data.StartTime = moment(data.StartTime).format("YYYY-MM-DD");
          that.formItem.StartDate = data.StartTime;
        }
        if (data.EndTime) {
          data.EndTime = moment(data.EndTime).format("YYYY-MM-DD");
          that.formItem.EndDate = data.EndTime;
        }
        that.tableLoading = true;
        api.LocationProduct(data).then(response => {
          if (response.error_code === "Success") {
            let res = response.data;
            that.list = res.list;
            that.tableLoading = false;
            that.page = res.page;
            that.tablePage.allNum = res.total;
            that.tablePage.maxPageNum = res.totalPage;
            that.setPage();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 300);
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
        //下面的代码不需要，不然会造成导出数据只有10条   (张奕伦 20181111)
        // ,
        // columns: that.columns1.filter((col, index) => index < (that.columns1.length - 1)),
        // data: that.list.filter((data, index) => index < (that.columns1.length - 1))
      });
    },
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.getValidStoresNew(data).then(response => {
        if (response.error_code === "Success") {
          that.storeList = response.data.list;
          that.formItem.store = that.userMes.StoreName;
          that.formItem.StoreID = that.userMes.StoreID;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    choose(name, id) {
      //   if (name === undefined && id === undefined) {
      //     this.formItem.store = "所有";
      //     this.formItem.StoreID = null;
      //   } else {
      this.formItem.store = name;
      this.formItem.StoreID = id;
      //   }
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.getStore();
      that.initTableHeight();
      that.getList();
    });
  }
};
</script>
<style>
</style>

