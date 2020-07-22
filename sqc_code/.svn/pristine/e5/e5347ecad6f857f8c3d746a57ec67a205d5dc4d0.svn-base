<template>
  <div class="QYjysh-container container">
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          总业绩排名
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
    "storeList"
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
          ListModel: that.choosedItemList
        };

        data.startDate = moment(that.startDate).format("YYYY-MM-DD");
        data.endDate = moment(that.endDate).format("YYYY-MM-DD");
        let temp = JSON.parse(JSON.stringify(data));
        if (that.vall == 4) {
          temp.areaID = "1";
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
        api.AreaImprotReport(temp).then(response => {
          if (response.error_code === "Success") {
            that.list = response.data;
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
      let pieData1 = [];
      let barName = [];
      for (let i in that.list) {
        let a = {
          value: that.list[i].Value,
          name: that.list[i].Name
        };
        pieData.push(a.value);
        barName.push(a.name);
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
              type: "shadow"
            }
          },
          legend: {
            // icon: "none",
            // data: ["第一时间段"]
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["line", "bar", "stack", "tiled"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: barName
              // axisLabel: echartsCommon.axisLabelHH()
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              // name: "第一时间段",
              type: "bar",
              barGap: "5%", //柱间距
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
