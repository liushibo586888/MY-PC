<template>
  <div class="cnjs-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">

          <i-col span="3">
            <FormItem prop="storeID">
              <Select v-model="formItem.storeID" placeholder="门店" :filterable="true">
                <Option v-for="(item,index) in storeList" :value="item.value" :key="index">{{item.label}}</Option>
              </Select>
            </FormItem>
          </i-col>

          <i-col span="3">
            <!-- <formItem prop="StartDate"> -->
            <DatePicker class="DatePicker_time" type="month" :options="options1" placeholder="开始日期" v-model="formItem.StartDate"></DatePicker>
            <!-- </formItem> -->
          </i-col>
          <i-col span="3">
            <Select v-model="modelType">
              <Option value="0">总客量</Option>
              <Option value="1">新客量</Option>
            </Select>
          </i-col>

          <i-col span="3">
            <formItem class="btn-box">
              <Button v-if="cwsr_Sousuo" type="primary" @click="searchForm">搜索</Button>
              <Button  v-if="cwsr_Daochu" type="warning" @click="exportdosc">导出</Button>
            </formItem>
          </i-col>

        </row>
      </Form>
    </div>
    <!-- 图表 -->
    <div id="data_source_com"></div>
    <tableLoadingPage :loading="spinShow"></tableLoadingPage>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import api from "@/api/index.js";
import axios from "axios";
import echarts from "echarts";
import echartsCommon from "@/api/Common.js";
import btnQX from '@/api/btnQX.js';

export default {
  data() {
    return {
      cwsr_Daochu:false, //导出按钮权限
      cwsr_Sousuo:false, //搜索按钮权限
      spinShow: true,
      modelType: "0",
      storeList: [],
      formItem: {
        StartDate: new Date(),
        storeID: ""
      },

      spinShow: true,
      options1: echartsCommon.shortcuts() //时间回到今天
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes
    })
  },
  methods: {
    exportdosc() {
      let that = this;
      let vueData = that.formItem;
      window.location.href =
        axios.defaults.baseURL +
        "/Export/ExportStoreAche?EmployeeId=" +
        that.userMes.EmployeeID +
        "&Date=" +
        echartsCommon.changeTime(vueData.StartDate).slice(0, 7) +
        "&Type=" +
        vueData.storeID +
        "&ItemType=" +
        that.modelType;
    },
    searchForm() {
      // 搜索表格
      let that = this;
      that.getList();
    },
    getList() {
      let that = this;
      let vueData = that.formItem;
      let data = {
        EmployeeID: that.userMes.EmployeeID,
        Date: echartsCommon.changeTime(vueData.StartDate).slice(0, 7),
        Type: vueData.storeID,
        ItemType: that.modelType
      };
      that.spinShow = true;
      api.RevenueCheckList(data).then(res => {
        that.tableLoading = false;
        if (res.error_code == "Success") {
          that.setChearsData(res.data);
        } else {
          this.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    setChearsData(dataList) {
      let that = this;
      let xName = [];
      let yAmount = [];
      let yCashBalance = [];
      for (let i in dataList) {
        let a = {
          StoreName: dataList[i].StoreName,
          Amount: dataList[i].Amount,
          CashBalance: dataList[i].CashBalance
        };
        xName.push(a.StoreName);
        yAmount.push(a.Amount);
        yCashBalance.push(a.CashBalance);
      }
      that.setEcharts(xName, yAmount, yCashBalance);
    },
    setEcharts(xName, yAmount, yCashBalance) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        let optionPie = {
          title: {
            text: "数据折线图"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["总金额", "账户余额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xName,
            nameLocation: "end", //坐标轴名称显示位置。
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: "45"
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "总金额",
              type: "line",
              stack: "总量",
              data: yAmount
            },
            {
              name: "账户余额",
              type: "line",
              stack: "总量",
              data: yCashBalance
            }
          ]
        };
        var opt = optionPie.series;
        dataSourcePie.setOption(optionPie, true);
        that.spinShow = false;
        window.addEventListener("resize", function () {
          dataSourcePie.resize();
        });
      });
    },
    // 获取有效门店
    async getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      await api.GetCascaderStore(data).then(res => {
        if (res.error_code == "Success") {
          if (res.data.length > 0) {
            that.formItem.storeID = res.data[0].value;
          }
          that.storeList = res.data;
        } else {
          that.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.cwsr_Daochu = btnQX.apiUrlList('cwsr_Daochu'); //导出按钮权限
    that.cwsr_Sousuo = btnQX.apiUrlList('cwsr_Sousuo'); //搜索按钮

    that.getStore().then(() => {
      that.getList();
    });
  }
};
</script>
<style scoped>
#data_source_com {
  height: 100%;
}
</style>