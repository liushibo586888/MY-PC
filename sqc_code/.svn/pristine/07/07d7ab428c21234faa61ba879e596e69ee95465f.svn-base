<template>
  <div class="QYjysh-container container">
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          业绩比例统计
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
      authorList: state => state.app.authorList,
      tableRows: state => state.app.tableRows
    })
  },
  methods: {
    getList() {
      setTimeout(() => {
        let that = this;
        let data = {
          reportType: that.vall,
          startDate: that.startDate,
          endDate: that.endDate,
          areaID: that.sCity,
          storeId: that.MDid,
          employeeId: that.userMes.EmployeeID,
          ListModels: that.choosedItemList
        };
        data.startDate = moment(that.startDate).format("YYYY-MM-DD");
        data.endDate = moment(that.endDate).format("YYYY-MM-DD");
        let temp = JSON.parse(JSON.stringify(data));
        if (that.vall == 4) {
          temp.areaID = "10";
          temp.reportType = 2;
          let arr = that.storeList;
          arr.forEach(v => {
            temp.ListModels.push({
              startDate: temp.startDate,
              endDate: temp.endDate,
              areaID: v.ID,
              storeId: that.MDid
            });
          });
        }
        temp.ListModels.forEach(x => delete x.arr);
        that.spinShow = true;
        api.AreaCustomerperformanceReportResult(temp).then(response => {
          if (response.error_code === "Success") {
            that.list = response.data;
            that.setPieData();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 200);
    },
    setPieData() {
      let that = this;
      let NewCustomerRate = [];
      let ConsultingCustomerRate = [];
      let OldCustomerRate = [];
      let GoodsRate = [];
      let StoreName = [];
      for (let i in that.list) {
        let a = {
          NewCustomerRate: that.list[i].NewCustomerRate.toFixed(2),
          ConsultingCustomerRate: that.list[i].ConsultingCustomerRate.toFixed(
            2
          ),
          OldCustomerRate: that.list[i].OldCustomerRate.toFixed(2),
          GoodsRate: that.list[i].GoodsRate.toFixed(2),
          StoreName: that.list[i].StoreName
        };

        NewCustomerRate.push(a.NewCustomerRate);
        ConsultingCustomerRate.push(a.ConsultingCustomerRate);
        OldCustomerRate.push(a.OldCustomerRate);
        GoodsRate.push(a.GoodsRate);
        StoreName.push(a.StoreName);
      }
      that.setEcharts(
        NewCustomerRate,
        ConsultingCustomerRate,
        OldCustomerRate,
        GoodsRate,
        StoreName
      );
    },

    setEcharts(
      NewCustomerRate,
      ConsultingCustomerRate,
      OldCustomerRate,
      GoodsRate,
      StoreName
    ) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        let optionPie = {
          color: ["#003366", "#006699", "#4cabce", "#e5323e"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["新客业绩", "跟踪客客业绩", "护理客业绩", "家居业绩"]
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
              data: StoreName,
              //axisLabel: echartsCommon.axisLabel()
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "新客业绩",
              type: "bar",
              barGap: 0,
              data: NewCustomerRate,
              itemStyle: echartsCommon.itemStyle(10)
            },
            {
              name: "跟踪客客业绩",
              type: "bar",
              data: ConsultingCustomerRate,
              itemStyle: echartsCommon.itemStyle(10)
            },
            {
              name: "护理客业绩",
              type: "bar",
              data: OldCustomerRate,
              itemStyle: echartsCommon.itemStyle(10)
            },
            {
              name: "家居业绩",
              type: "bar",
              data: GoodsRate,
              itemStyle: echartsCommon.itemStyle(10)
            }
          ]
        };

        dataSourcePie.setOption(optionPie);
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
<style>
</style>