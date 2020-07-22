<template>
  <div class="QYjysh-container container">
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          新客渠道分类成交率
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
    "UnderstandWayID",
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
          UnderstandWayID: that.UnderstandWayID,
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
        api.GetNewCustChannelNum(temp).then(response => {
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
      let CustNumData = [];
      let DealCustNumData = [];
      let DealRateData = [];
      let NameData = [];
      for (let i in that.list) {
        let a = {
          CustNum: that.list[i].CustNum,
          DealCustNum: that.list[i].DealCustNum,
          DealRate: that.list[i].dealRate,
          Name: that.list[i].StoreName
        };
        CustNumData.push(a.CustNum);
        DealCustNumData.push(a.DealCustNum);
        DealRateData.push(a.DealRate);
        NameData.push(a.Name);
      }
      that.max = Math.max.apply(null, CustNumData);
      that.setEcharts(CustNumData, DealCustNumData, DealRateData, NameData);
    },
    setEcharts(CustNumData, DealCustNumData, DealRateData, NameData) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        let optionPie = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          // toolbox: {
          //   feature: {
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ["line", "bar"] },
          //     restore: { show: true },
          //     saveAsImage: { show: true }
          //   }
          // },
          // legend: {
          //   data: ["人数", "成交人数", "成交率"]
          // },
          // xAxis: [
          //   {
          //     type: "category",
          //     data: NameData,
          //     //axisLabel: echartsCommon.axisLabel(),
          //     axisPointer: {
          //       type: "shadow"
          //     }
          //   }
          // ],
          // yAxis: [
          //   {
          //     type: "value",
          //     name: "人数",
          //     min: 0,
          //     max: this.max,
          //     // interval: 10,
          //     axisLabel: {
          //       formatter: "{value}"
          //     }
          //   },
          //   {
          //     type: "value",
          //     name: "成交率",
          //     min: 0,
          //     max: 100,
          //     interval: 10,
          //     axisLabel: {
          //       formatter: "{value} %"
          //     }
          //   }
          // ],
          // series: [
          //   {
          //     name: "人数",
          //     type: "bar",
          //     data: CustNumData,
          //     itemStyle: echartsCommon.itemStyle(10)
          //   },
          //   {
          //     name: "成交人数",
          //     type: "bar",
          //     data: DealCustNumData,
          //     itemStyle: echartsCommon.itemStyle(10)
          //   },
          //   {
          //     name: "成交率",
          //     type: "line",
          //     yAxisIndex: 1,
          //     data: DealRateData,
          //     itemStyle: echartsCommon.itemStyle(10)
          //   }
          // ]
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["成交人数", "人数", "成交率"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          // yAxis: {
          //   type: "value"
          // },
          yAxis: [
            {
              type: "value"
            },
            {
              type: "value",
              name: "成交率",
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: "{value} %"
              }
            }
          ],
          xAxis: {
            type: "category",
            data: NameData
          },
          series: [
            {
              name: "成交人数",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: DealCustNumData
            },
            {
              name: "人数",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: CustNumData
            },
            {
              name: "成交率",
              type: "line",
              yAxisIndex: 1,
              data: DealRateData,
              itemStyle: echartsCommon.itemStyle(10)
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
    UnderstandWayID(val7, oldVal7) {
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
