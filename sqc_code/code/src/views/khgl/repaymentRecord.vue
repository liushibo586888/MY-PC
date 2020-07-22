<!-- 未还款记录 -->
<template>
    <div class="repaymentRecord-container">
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" ref="mainTable"></Table>
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
    </div>
</template>
<script>
import api from "@/api/index.js";
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    CustomerID: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ID: "",
      tableLoading: false,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      columns1: [
        {
          title: "欠款名称项目",
          key: "ItemName",
          align: "center"
        },
        {
          title: "欠款项目规格",
          key: "ItemStandard",
          align: "center"
        },
        {
          title: "欠款金额",
          key: "ArrearsAmount",
          align: "center"
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows
    })
  },
  methods: {
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
        CustomerID: that.ID,
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      that.tableLoading = true;
      api.getUnPaidDebtList(data).then(response => {
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
    },
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
      that.ID = that.$route.query.ID;
      if (that.ID) {
        that.getList();
      }
    });
  },
  watch: {
    $route(to, from) {
      let that = this;
      //监听路由是否变化
      if (that.$route.query.ID) {
        // 判断条件1  判断传递值的变化
        that.$nextTick(() => {
          that.ID = that.$route.query.ID;
          if (that.ID) {
            that.getList();
          }
        });
      }
    }
  }
};
</script>
<style>
.repaymentRecord-container {
  padding: 10px;
  padding-bottom: 18px;
}
.repaymentRecord-container .bottom-box {
  position: relative;
  bottom: 0;
  margin-top: 18px;
}
</style>