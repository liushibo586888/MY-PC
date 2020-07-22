<!-- 渠道分类占比 -->
<template>
  <div class="jyshD-container container">
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
          <i-col span="3">
            <FormItem prop="store">
              <Select v-model="formItem.store" placeholder="门店" :filterable="true">
                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="15">
            <formItem class="btn-box">
              <Button type="primary" class="btn" @click="searchList">查询</Button>
              <Button type="warning" class="btn" @click="resetSearch">重置</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <!-- 图表 -->
    <div class="form-box">
      <div class="charts">
        <div class="header">
          渠道分类占比
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
export default {
  data() {
    return {
      //时间回到今天
      options1: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return new Date();
            }
          }
        ]
      },
      // -----
      spinShow: true,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        storeID: "",
        store: "",
        EmployeeID: ""
      },
      list: [],
      storeList: []
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
    choose(name, id) {
      this.formItem.storeID = id;
    },
    searchList() {
      let that = this;
      if (that.formItem.startDate && that.formItem.endDate) {
        // 两者同时存在
        if (Number(that.formItem.startDate) > Number(that.formItem.endDate)) {
          that.$Message.error("开始日期不得大于结束日期");
          return false;
        }
      }
      that.getList();
    },
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
      that.getList();
    },
    setEcharts(xinData, barName) {
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
            data: ["新客", "护理客", "护理客", "追踪客"]
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
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "新客",
              type: "bar",
              barGap: 0,
              data: [320, 332, 301, 334, 390]
            },
            {
              name: "护理客",
              type: "bar",
              data: [220, 182, 191, 234, 290]
            },
            {
              name: "护理客",
              type: "bar",
              data: [150, 232, 201, 154, 190]
            },
            {
              name: "追踪客",
              type: "bar",
              data: [98, 77, 101, 99, 40]
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
          StartDate: that.formItem.startDate,
          EndDate: that.formItem.endDate,
          StoreId: that.formItem.storeID,
          ReportType: 3,
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
            that.list = response.data;
            that.setPieData();
          } else {
            that.$Message.error(response.error_message);
          }
        });
      }, 100);
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
          that.formItem.store = that.userMes.StoreName;
          that.formItem.storeID = that.userMes.StoreID;
        } else {
          that.$Message.error(response.error_message);
        }
      });
    },
    setPieData() {
      let that = this;
      let xinData = [];
      let oldData = [];
      let zhuiData = [];
      let hiData = [];
      let barName = [];
      let barName1 = [];
      for (let i in that.list) {
        // 饼图
        let a = {
          xin: "",
          old: "",
          zhui: "",
          huli: "",
          name: that.list[i].CateType
        };
        xinData.push(a.xin);

        barName1.push(a.name);
        barName = [...new Set(barName1)];
      }

      that.setEcharts(xinData, barName);
    }
  },
  mounted() {
    let that = this;
    that.getStore();
    that.getList();

    // that.setAuthor
  }
};
</script>
<style>
</style>

