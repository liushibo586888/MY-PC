<template>
  <div class="customerPhoto-container">
    <Collapse v-model="tabIndex" accordion @on-change="tabChange">
      <Panel :name="item.ID" v-for="(item, index) in list" :key="index">
        <span style="margin-right: 10px;">{{item.Date.slice(0,10)}}</span>
        <span style="margin-right: 10px;">{{item.ItemName}}</span>
        <span>{{item.PhotoTypeName}}</span>
        <div slot="content" class="img-box">
          <div v-for="(img, index1) in imgList" :key="index1" :style="{
                'backgroundImage': `url(${img.src})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'}" class="img" @click="showBigImg(img)"></div>
        </div>
      </Panel>
    </Collapse>
    <tableLoadingPage :loading="pageLoading"></tableLoadingPage>
    <Modal v-model="modal1" class="img-modal">
      <img :src="bigImgUrl" style="width: 100%;">
      <div class="" slot="footer"></div>
    </Modal>

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
  props: {
    CustomerID: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      modal1: false,
      ID: "",
      tabIndex: [],
      list: [],
      imgList: [],
      bigImgUrl: "",
      bigImgUrl1: "",
      pageLoading: true,
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      }
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
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    },
    getList() {
      let that = this;
      let data = {
        CustomerID: that.ID,
        page: that.tablePage.page,
        size: that.tablePage.pageNum
      };
      api.getMedicalPhotoInfoByCustomerID2(data).then(res => {
        that.pageLoading = false;
        if (res.error_code === "Success") {
          that.list = res.data.list;
          that.bigImgUrl = res.data.list[0].DomainPath;
          that.bigImgUrl1 = res.data.list[0].DomainPath;
          that.page = res.data.page;
          that.tablePage.allNum = res.data.total;
          that.tablePage.maxPageNum = res.data.totalPage;
          that.setPage();
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    showBigImg(img) {
      let that = this;
      that.bigImgUrl = img.src;
      that.modal1 = true;
    },
    tabChange(val) {
      let that = this;
      let index = val[0];
      that.imgList = [];
      if (index != undefined) {
        let arr = that.list[index].ImgPath;
        let arr1 = [];
        arr.forEach(v => {
          // v:that.bigImgUrl+v
          arr1.push({ src: that.bigImgUrl1 + v });
        });
        that.imgList = arr1;
      }
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
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "";
      }
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style>
.customerPhoto-container {
  padding: 10px;
  padding-bottom: 58px;
}
.customerPhoto-container .img-box {
  overflow: hidden;
}
.customerPhoto-container .img-box .img {
  float: left;
  margin-right: 10px;
  width: 80px;
  height: 80px;
}
.img-modal .ivu-modal-close {
  display: none;
}
.bottom-box {
}
</style>