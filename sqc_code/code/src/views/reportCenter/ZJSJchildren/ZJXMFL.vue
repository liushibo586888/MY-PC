<template>
    <div class="QYjysh-container container">
        <!-- 图表 -->
        <div class="form-box">
            <div class="charts">
                <div class="header">
                    美肤总监顾客业绩
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
        let arr = that.storeList;
        temp.ListModel.forEach(x => delete x.arr);
        that.spinShow = true;
        api.GetSceneProjectRatio(temp).then(response => {
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
      let NewCust = [];
      let OldCust = [];
      let NurCust = [];
      let TrackCust = [];
      let Name = [];
      for (let i in that.list) {
        let a = {
          NewCust: that.list[i].NewCust,
          OldCust: that.list[i].OldCust,
          NurCust: that.list[i].NurCust,
          TrackCust: that.list[i].TrackCust,
          Name: that.list[i].Name
        };
        NewCust.push(a.NewCust);
        OldCust.push(a.OldCust);
        NurCust.push(a.NurCust);
        TrackCust.push(a.TrackCust);
        Name.push(a.Name);
      }
      // that.max = Math.max.apply(null, CustNum);
      that.setEcharts(NewCust, OldCust, NurCust, TrackCust, Name);
    },
    setEcharts(NewCust, OldCust, NurCust, TrackCust, Name) {
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["新客业绩", "老客业绩", "护理客业绩", "追踪客业绩"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          yAxis: [
            {
              type: "value"
            }
          ],
          xAxis: {
            type: "category",
            data: Name
          },
          series: [
            {
              name: "新客业绩",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: NewCust
            },
            {
              name: "老客业绩",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: OldCust
            },
            ,
            {
              name: "护理客业绩",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: NurCust
            },
            ,
            {
              name: "追踪客业绩",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: TrackCust
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
