<template>
    <div class="ygbb-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
                <row :gutter="20">
                    <i-col span="3">
                        <formItem prop="startDate">
                            <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="开始日期" v-model="formItem.startDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="3">
                        <formItem prop="endDate">
                            <DatePicker class="DatePicker_time" type="date" :options="options1" placeholder="结束日期" v-model="formItem.endDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="search">查询</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="form-box">
            <div style="width:32.3%;height:380px;" class="charts">
                <div class="form-title">
                    <div class="title-msg">门店业绩来人数据</div>
                    <div class="form-time">2018-02-28更新</div>
                </div>
                <div id="data_source_com" class="forms"></div>
            </div>
            <div style="width:44.6%;height:380px;margin:0 16px" class="charts" id="">
                <div class="form-title">
                    <div class="title-msg">门店业绩分布数据</div>
                    <div class="form-time">2018-02-26更新</div>
                </div>
                <div id="data_source_fb" class="forms"></div>
                <!-- <div class="msg">
                    <div class="msg-left">
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                    </div>
                    <div class="msg-right">
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                        <div>xxx店铺来人</div>
                    </div>
                </div> -->
            </div>
            <div style="width:20.1%;height:380px;" class="charts">
                <div class="form-title">
                    <div class="title-msg">明细统计</div>
                    <div class="form-time">2018-02-26更新</div>
                </div>
                <div class="no-form">
                    <div class="progress-box">
                        <div>￥200000</div>
                        <div>总业绩</div>
                        <Progress :percent="25">
                            <Icon type="arrow-up-c" color="#aae598" size="14"></Icon>
                            <!-- <Icon type="arrow-down-c" color="#f64858" size="14"></Icon> -->
                            <span>25%</span>
                        </Progress>
                    </div>
                    <div class="progress-box">
                        <div>1500</div>
                        <div>总来人</div>
                        <Progress :percent="25">
                            <!-- <Icon type="arrow-up-c" color="#aae598" size="14"></Icon> -->
                            <Icon type="arrow-down-c" color="#f64858" size="14"></Icon>
                            <span>25%</span>
                        </Progress>
                    </div>
                    <div class="progress-box">
                        <div>￥20000</div>
                        <div>总欠款</div>
                        <Progress :percent="25">
                            <Icon type="arrow-up-c" color="#aae598" size="14"></Icon>
                            <!-- <Icon type="arrow-down-c" color="#f64858" size="14"></Icon> -->
                            <span>25%</span>
                        </Progress>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-box">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight"></Table>
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
  data() {
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      modal1: false,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        EmployeeID: ""
      },
      columns1: [
        {
          title: "门店",
          key: "StoreName",
          align: "center"
        },
        {
          title: "总来人",
          key: "VisitorNumber",
          align: "center"
        },
        {
          title: "总业绩",
          key: "TotalAmount",
          align: "center"
        },
        {
          title: "总欠款",
          key: "ArrearsAmount",
          align: "center"
        },
        {
          title: "执行总额",
          key: "ExecuteAmount",
          align: "center"
        },
        {
          title: "操作",
          key: "cz",
          align: "center",
          render: (h, parmas) => {
            let that = this;
            return h("i", {
              class: {
                "ivu-icon": true,
                "ivu-icon-aaa-qiandai": true,
                "icon-btn": true
              },
              on: {
                click: () => {
                  // this.checkBillStatus(parmas.row)
                }
              }
            });
          }
        },
        {
          title: " ",
          width: 10
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows
    }),
    setTableHeight() {
      let h = 440;
      if (window.innerHeight > 900) {
        h = 540;
      }
      return h / 768 * window.innerHeight;
    }
  },
  methods: {
    search() {
      let that = this;
      //判断两个时间段大小
    
      if (
        echartsCommon.ContrastTime(
          this.$Message,
          that.formItem.startDate,
          that.formItem.endDate
        )
      ) {
        // that.tablePage.page = 1;
        // that.getList();
      }
      //------------------
    },
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
    },
    setEcharts(pieData, barData, barName) {
      let that = this;
      that.$nextTick(() => {
        var dataSourcePie = echarts.init(
          document.getElementById("data_source_com")
        );
        var dataSourceBar = echarts.init(
          document.getElementById("data_source_fb")
        );
        let optionPie = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            bottom: 10,
            left: "center",
            data: pieData
          },
          series: [
            {
              type: "pie",
              radius: [15, 80],
              center: ["50%", "35%"],
              roseType: "radius",
              data: pieData
            }
          ]
        };
        const optionBar = {
          color: [
            "#60d388",
            "#8378ea",
            "#e7bcf3",
            "#fb7293",
            "#e25c2f",
            "#ff9f7f",
            "#ffdb5c",
            "#9fe6b8",
            "#5fd1dd",
            "#37a2da"
          ],
          tooltip: {},
          xAxis: {
            name: "店铺名称",
            type: "category",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#999",
                width: "1"
              }
            },
            data: []
          },
          yAxis: {
            name: "成交量",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#999",
                width: "1"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#333"
              }
            },
            type: "value"
          },
          grid: {
            width: "66%",
            left: "17%",
            height: "50%"
          },
          legend: {
            data: barName,
            width: "60%",
            bottom: 10
          },
          series: barData
        };
        dataSourcePie.setOption(optionPie);
        dataSourceBar.setOption(optionBar);
        window.addEventListener("resize", function() {
          dataSourcePie.resize();
          dataSourceBar.resize();
        });
      });
    },
    getList() {
      let that = this;
      let data = {
        StartDate: that.formItem.startDate,
        EndDate: that.formItem.endDate,
        EmployeeID: that.userMes.EmployeeID
      };
      if (data.StartDate) {
        data.StartDate = moment(data.startDate).format("YYYY-MM-DD");
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format("YYYY-MM-DD");
      }
      api.getOperationalDataPlatform(data).then(response => {
        if (response.error_code === "Success") {
          that.list = response.data.list;
          that.setPieData();
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    setPieData() {
      let that = this;
      let pieData = [];
      let barData = [];
      let barName = [];
      let colorList = [
        "#60d388",
        "#8378ea",
        "#e7bcf3",
        "#fb7293",
        "#e25c2f",
        "#ff9f7f",
        "#ffdb5c",
        "#9fe6b8",
        "#5fd1dd",
        "#37a2da"
      ];
      for (let i in that.list) {
        // 饼图
        let a = {
          value:
            that.list[i].VisitorNumber > 0
              ? that.list[i].VisitorNumber
              : Math.random() * 30 + 50,
          name: that.list[i].StoreName,
          icon: "circle",
          itemStyle: {
            normal: {
              color: colorList[i]
            }
          }
        };
        pieData.push(a);
        // 柱状图
        let b = {
          data: [],
          name: that.list[i].StoreName,
          type: "bar"
        };
        b.data.push(
          that.list[i].TotalAmount > 0
            ? that.list[i].TotalAmount
            : Math.random() * 20 + 50
        );
        barName.push(that.list[i].StoreName);
        barData.push(b);
      }
      that.setEcharts(pieData, barData, barName);
    }
  },
  mounted() {
    let that = this;
    that.getList();
  }
};
</script>
<style>
.ygbb-container {
  width: 100%;
  height: 100%;
  margin-top: 396px;
  position: relative;
  overflow: visible !important;
}

.form-box {
  width: 100%;
  height: 380px;
  position: absolute;
  top: -396px;
  left: 0;
  display: flex;
}

.form-box .charts {
  background-color: #fff;
  border-radius: 10px;
  padding-top: 37px;
  position: relative;
}

.form-box .charts .form-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 37px;
  border-bottom: 1px solid #e9eaec;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.form-box .charts .form-title > div:nth-child(1) {
  border-left: 2px solid #79aa49;
  font-size: 16px;
  height: 14px;
  line-height: 16px;
  padding-left: 10px;
}

.form-box .charts .form-title > div:nth-child(2) {
  color: #999999;
  font-size: 14px;
}

.form-box .charts .forms {
  width: 100%;
  height: 100%;
}

.form-box .charts .no-form {
  padding-top: 40px;
}

.form-box .charts .no-form .progress-box {
  width: 95%;
  height: 88px;
  /*padding: 0 20px;*/
  font-size: 14px;
  padding-left: 20px;
  position: relative;
}

.form-box .charts .no-form .progress-box > div:nth-child(1) {
  color: #333333;
}

.form-box .charts .no-form .progress-box > div:nth-child(2) {
  color: #666666;
}

.form-box .charts .no-form .progress-box:nth-child(1) .ivu-progress-bg {
  background-color: #fcc522;
}

.form-box .charts .no-form .progress-box:nth-child(2) .ivu-progress-bg {
  background-color: #7db14a;
}

.form-box .charts .no-form .progress-box:nth-child(3) .ivu-progress-bg {
  background-color: #d94e81;
}

/*.ygbb-container */
</style>