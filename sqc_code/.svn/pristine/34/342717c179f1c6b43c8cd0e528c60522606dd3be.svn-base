<template>
  <div class="xmqz-container container">
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
            <FormItem prop="NameORphone">
              <Input v-model="formItem.NameORphone" placeholder="电话或姓名"></Input>
            </FormItem>
          </i-col>
          <i-col span="15">
            <formItem class="btn-box">
              <i-button type="primary" class="btn" @click="searchForm">搜索</i-button>
              <i-button type="warning" class="btn" @click="resetSearch">重置</i-button>
              <i-button type="success" class="btn" @click="addMode" :disabled="showEdit">添加</i-button>
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
        添加物资
      </div>
      <div slot='close' class="close not-print">
        <i class='ivu-icon ivu-icon-aaa-guanbi'></i>
      </div>
      <!-- 物资列表明细 -->
      <div class="pannel-title">
        <p>物资列表</p>
        <div>
          <i-button type="text" class="Shenqing-font" @click="showSmallModal(0)" size="small">添加物资</i-button>
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
        <Button class="btn" type="primary" :loading="onLoading" @click="addForm">保存</Button>
        <Button class="btn" type="warning" :loading="onLoading" @click="resetForm">取消</Button>
      </div>
    </Modal>
    <!-- 物资弹窗 -->
    <Modal :mask-closable="false" v-model="modal2" width="1200" class="dialog">
      <!-- <div slot='header' class="header not-print">
                出库产品
            </div> -->
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
  </div>
</template>
<script>
const Decimal = require("decimal");
import Vue from "vue";
import storejs from "storejs";
import api from "@/api/index.js";
import echartsCommon from "@/api/Common.js";
import btnQX from "@/api/btnQX.js";
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      CertainProjectId: "",
      showEdit: true,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        NameORphone: ""
      },
      searchKeyWord: "",
      onLoading: false,
      rowStatus: "",
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
      modal1: false,
      modal2: false,
      formValidate: {
        LocationName: "",
        Num: "",
        AuditUserName: "",
        Remark: "",
        CreateDate: "",
        Status: ""
      },
      // 主表格行
      columns1: [
        {
          title: "消费记录",
          key: "CertainProjectId",
          align: "center"
        },
        {
          title: "客户姓名",
          key: "CustomerName",
          align: "center"
        },
        {
          title: "项目名称",
          key: "ItemName",
          align: "center"
        },
        {
          title: "项目类别",
          key: "ItemCategoryName",
          align: "center"
        },
        {
          title: "项目金额",
          key: "Amount",
          align: "center"
        }
      ],
      list: [],
      selection: [],
      selectionCustoms: [],
      materialsColumn: [
        //物资列表头
        {
          type: "selection",
          width: 80
        },
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
          title: "单位",
          key: "Unit",
          align: "center"
        },
        {
          title: "单价",
          key: "Price",
          align: "center"
        },
        {
          title: "规格",
          key: "Standard",
          align: "center"
        },
        {
          title: "描述",
          key: "LocalName",
          align: "center"
        }
      ],
      materialsData: [],
      //选中后表头
      choosedItemColumns: [
        {
          title: "产品名称",
          key: "ProductName",
          align: "center"
        },
        {
          title: "产品编码",
          key: "ProductNum",
          align: "center"
        },
        {
          title: "单位",
          key: "Unit",
          align: "center"
        },
        {
          title: "规格",
          key: "Standard",
          align: "center"
        },
        {
          title: "入库数",
          key: "num",
          align: "center",
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
        {
          title: "操作",
          key: "action",
          align: "center",
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
      choosedItemList: []
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
    }
  },
  methods: {
    chooseRow(row) {
      // 选中某一行修改
      let that = this;
      that.CertainProjectId = row.CertainProjectId;
      if (that.CertainProjectId) {
        that.showEdit = false;
      }
    },
    setUploadData() {
      // 设置提交数据
      let that = this;
      let data = {
        EmployeeId: that.userMes.EmployeeID,
        StoreId: that.userMes.StoreID,
        Remark: that.formValidate.Remark,
        List: []
      };
      // 添加物资记录
      for (let i of that.choosedItemList) {
        let a = {
          CertainProjectId: that.CertainProjectId,
          EmployeeId: that.userMes.EmployeeID,
          StoreId: that.userMes.StoreID,
          GoodsId: i.GoodsId,
          Num: i.num
        };
        data.List.push(a);
      }
      return data;
    },
    addForm() {
      let that = this;
      if (that.choosedItemList.length <= 0) {
        that.$Message.error("请选物资");
        return false;
      }
      that.onLoading = true;
      //点击添加时的保存按钮;
      api.PresentGoodsAdd(that.setUploadData()).then(response => {
        that.onLoading = false;
        if (response.error_code === "Success") {
          that.$Message.success("提交成功");
          that.$router.push({
            name: "zswzSQD"
            // params: {
            //   phone: that.TZPhone
            // }
          });
          that.resetForm();
          that.getList();
        } else {
          that.$Message.error(response.error_message);
        }
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
          that.formItem.endDate,
          that.formItem.startDate2,
          that.formItem.endDate2
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
    getList() {
      let that = this;
      let data = {
        StoreId: that.userMes.StoreID,
        employeeId: that.userMes.EmployeeID,
        StartDate: that.formItem.startDate,
        EndDate: that.formItem.endDate,
        key: that.formItem.NameORphone,
        pageindex: that.tablePage.page,
        pagesize: that.tablePage.pageNum
      };
      // 转换日期
      if (data.StartDate) {
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
      }
      that.tableLoading = true;
      api.PresentGoodsGetItemList(data).then(response => {
        if (response.error_code === "Success") {
          that.tableLoading = false;
          let res = response.data;
          that.list = res.list;
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
    addMode() {
      // 添加
      let that = this;
      that.modal1 = true;
    },
    showDelDetailPoup(index) {
      //删除一个物资
      let that = this;
      that.choosedItemList.splice(index, 1);
    },
    // 选择物资
    selectMaterial(selection) {
      // 选中的物资列表
      let that = this;
      that.selection = selection;
    },
    smalladdForm() {
      let that = this;
      // 选择物资
      for (let i in that.selection) {
        let a = {
          ProductNum: that.selection[i].ProductNum,
          Unit: that.selection[i].Unit,
          Standard: that.selection[i].Standard,
          num: 1,
          ProductName: that.selection[i].ProductName,
          GoodsId: that.selection[i].BarCode,
          Num: that.selection[i].Num
        };
        that.choosedItemList.push(a);
      }
      that.modal2 = false;
      that.modal3 = false;
    },
    resetForm() {
      let that = this;
      that.choosedItemList = [];
      that.formValidate.Remark = "";
      that.modal1 = false;
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
      that.$store.commit("changeLoadingPage");
      that.getSalesGoodsList();
      that.modal2 = true;
    },
    getSalesGoodsList() {
      // 获取出库产品列表
      let that = this;
      let data = {
        employeeId: that.userMes.EmployeeID,
        productName: that.searchKeyWord
      };
      api.selectInProduct(data).then(response => {
        that.$store.commit("changeLoadingPage");
        if (response.error_code === "Success") {
          that.materialsData = response.data;
        } else {
          that.$Message.error(response.error_message);
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
    //导出
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
      that.initTableHeight();
      that.getList();
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
.Shenqing-font {
  font-size: 20px;
  font-weight: 900;
}
</style>