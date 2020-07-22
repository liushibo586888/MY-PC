<template>
  <div class="cnjs-container container">
    <div class="search-box">
      <div style="margin-bottom:20px">
      </div>
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <formItem prop="StartDate">
              <DatePicker type="date" placeholder="开始日期" v-model="formItem.StartDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <formItem prop="EndDate">
              <DatePicker type="date" placeholder="结束日期" v-model="formItem.EndDate" :clearable="false" :editable="false"></DatePicker>
            </formItem>
          </i-col>
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.StoreId" placeholder="门店" :filterable="true">
                <Option v-for="item in storeList" :value="item.ID" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="15">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="searchForm">搜索</Button>
              <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="bottom-box">
      <!-- <i-button class="btn"  type="primary">导出</i-button> -->
      <i-button class="btn" type="primary">打印</i-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      Link: "",
      formItem: {
        StoreId: null,
        StartDate: new Date(),
        EndDate: new Date()
        // EmployeeID: "",
      },
      storeList: []
    };
  },
  computed: {
    ...mapState({
      authorList: state => state.app.authorList,
      userMes: state => state.app.userMes
    })
  },
  methods: {
    resetSearch() {
      // 重置搜索
      let that = this;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    searchForm() {
      // 搜索表格
      let that = this;
      if (that.formItem.StartDate && that.formItem.EndDate) {
        // 两者同时存在
        if (Number(that.formItem.StartDate) > Number(that.formItem.EndDate)) {
          that.$Message.error("开始日期不得大于结束日期");
          return false;
        } else {
          that.getList();
        }
      }
    },
    choose(name, id) {
      this.formItem.store = name;
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
          // that.formItem.store = that.userMes.StoreName;
          that.formItem.StoreId = that.userMes.StoreID;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    getList() {
      let that = this;
      let userMessage = JSON.parse(localStorage.userMessage);
      // that.formItem.EmployeeID = userMessage.EmployeeID;
      let data = that.formItem;
      if (data.StartDate) {
        data.StartDate = moment(data.StartDate).format("YYYY-MM-DD");
        that.formItem.StartDate = data.StartDate;
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
        that.formItem.EndDate = data.EndDate;
      }
      api.printReport(that.formItem).then(response => {
        if (response.error_code === "Success") {
          that.Link = response.data;
          window.location.href = that.Link;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.getStore();
      that.getList();
    });
  },
  filters: {
    formatDate(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  }
};
</script>
<style>
</style>