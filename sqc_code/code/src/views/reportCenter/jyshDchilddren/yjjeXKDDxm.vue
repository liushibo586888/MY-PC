<!-- 新客到店项目分类占比 -->
<template>
  <div class="jyshD-container container">
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          新客到店项目分类占比
        </div>
        <div class="amount">总人数:{{amount}}</div>
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
  props: ["startDate", "endDate", "storeID"],
  data() {
    return {
      amount: 0,
      spinShow: true,
      NameList: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      authorList: state => state.app.authorList,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let h = 440;
      if (window.innerHeight > 900) {
        h = 540;
      }
      return h / 768 * window.innerHeight;
    },
    setAuthor() {
      // 判断用户是否有查看客户详情权限
      let that = this;
      let pageName = that.$route.name;
      let list = that.authorList[pageName];
      if (list) {
        for (let i of list) {
          if (i.Name === "增加") {
            return i.IsVisible;
            break;
          }
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    setEcharts(pieData, barName) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        let optionPie = {
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
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}"
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: barName
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["pie", "funnel"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: false,
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: [100, 140],
              // for funnel
              x: "60%",
              width: "35%",
              funnelAlign: "left",
              max: 1048,
              itemStyle: {
                normal: {
                  label: {
                    textStyle: {
                      //数值样式
                      fontSize: 14
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: pieData
            }
          ]
        };
        dataSourcePie.setOption(optionPie, true);
        that.spinShow = false;
        window.addEventListener("resize", function() {
          dataSourcePie.resize();
        });
      });
    },
    getList() {
      setTimeout(() => {
        let that = this;
        let data = {
          StartDate: that.startDate,
          EndDate: that.endDate,
          StoreId: that.storeID,
          ReportType: 1,
          EmployeeId: that.userMes.EmployeeID,
          AreaId: ""
        };
        data.StartDate = echartsCommon.changeTime(data.StartDate);
        data.EndDate = echartsCommon.changeTime(data.EndDate);
        that.tableLoading = true;
        that.spinShow = true;
        api.NewConsumeChannelInfoReport(data).then(response => {
          that.tableLoading = false;
          if (response.error_code === "Success") {
            that.NameList = response.data;
            that.setPieData();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 100);
    },
    setPieData() {
      let that = this;
      let pieData = [];
      let barName = [];
      let amount = [];
      for (let i in that.NameList) {
        // 饼图
        let a = {
          value: that.NameList[i].Count,
          name:
            that.NameList[i].CateType +
            "(" +
            that.NameList[i].Count +
            ")"+" "+that.NameList[i].Rate.toFixed(2) +"%"
        };
        pieData.push(a);
        barName.push(a.name);
        amount.push(a.value);
      }
      that.amount = echartsCommon.sum(amount, res => res);
      that.setEcharts(pieData, barName);
    }
  },
  mounted() {
    let that = this;
    that.getList();
  },
  watch: {
    startDate(val, oldVal) {
      this.getList();
    },
    endDate(val1, oldVal1) {
      this.getList();
    },
    storeID(val2, oldVal2) {
      this.getList();
    }
  }
};
</script>
<style>
</style>

