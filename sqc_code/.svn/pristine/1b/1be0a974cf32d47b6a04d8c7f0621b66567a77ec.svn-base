<template>
  <div class="QYjysh-container container">
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          产品业绩排名
        </div>
        <div class="content">
          <tableLoadingPage :loading="spinShow"></tableLoadingPage>
          <div id="data_source_com" class="forms"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import api from "@/api/index.js";
import echarts from "echarts";
import echartsCommon from "@/api/Common.js";
export default {
  props: [
    "date",
    "vall",
    "startDate",
    "endDate",
    "sCity",
    "MDid",
    "choosedItemList",
    "storeList",
    "CategoryID"
  ],
  data() {
    return {
      spinShow: true
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows,
      authorList: state => state.app.authorList
    })
  },
  methods: {
    getList() {
      setTimeout(() => {
        let that = this;
        // that.$refs.searchForm.resetFields();
        let data = {
          reportType: that.vall,
          startDate: that.startDate,
          endDate: that.endDate,
          areaID: that.sCity,
          storeId: that.MDid,
          employeeId: that.userMes.EmployeeID,
          sCategoryId: that.CategoryID,
          ListModel: that.choosedItemList
        };
        data.startDate = moment(that.startDate).format("YYYY-MM-DD");
        data.endDate = moment(that.endDate).format("YYYY-MM-DD");
        let temp = JSON.parse(JSON.stringify(data));
        if (that.vall == 4) {
          temp.areaID = "10";
          temp.reportType = 2;
          let arr = that.storeList;
          arr.forEach(v => {
            temp.ListModel.push({
              startDate: temp.startDate,
              endDate: temp.endDate,
              areaID: v.ID,
              storeId: that.MDid
            });
          });
        }
        temp.ListModel.forEach(x => delete x.arr);
        that.spinShow = true;
        api.getProductAchievement(temp).then(response => {
          if (response.error_code === "Success") {
            that.list = response.data.list;
            that.setPieData();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 300);
    },
    setPieData() {
      let that = this;
      let pieData = [];
      let barName = [];
      for (let i in that.list) {
        let a = {
          value: that.list[i].CountAmount1,
          Name: that.list[i].StoreName
        };
        pieData.push(a.value);
        barName.push(a.Name);
      }
      that.setEcharts(pieData, barName);
    },
    setEcharts(pieData, barName) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        let optionPie = {
           color: [echartsCommon.color()],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: barName,
              // axisLabel: echartsCommon.axisLabel(),
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "直接访问",
              type: "bar",
              barWidth: "60%",
              data: pieData,
              itemStyle: echartsCommon.itemStyle(10),
              markLine: {
                data: [
                  { type: "average", name: "平均值" },
                  { type: "max", name: "最大值" }
                ]
              }
            }
          ]
        };
        var opt = optionPie.series;
        dataSourcePie.setOption(optionPie, true);
        that.spinShow = false;
        window.addEventListener("resize", function() {
          dataSourcePie.resize();
        });
      });
    }
  },
  mounted() {
    let that = this;
    that.getList();
  },
  watch: {
    startDate(val1, oldVal1) {
      this.getList();
    },
    endDate(val2, oldVal2) {
      this.getList();
    },
    sCity(val3, oldVal3) {
      this.getList();
    },
    MDid(val4, oldVal4) {
      this.getList();
    },
    choosedItemList(val5, oldVal5) {
      this.getList();
    },
    date(val6, oldVal6) {
      this.getList();
    },
    CategoryID(val7, oldVal7) {
      this.getList();
    }
  }
};
</script>
<style scoped>
.ZYJ_vue {
  position: absolute;
  z-index: 10;
  right: 0;
  margin-bottom: 200px;
  /* margin-top: 100px; */
}
</style>
