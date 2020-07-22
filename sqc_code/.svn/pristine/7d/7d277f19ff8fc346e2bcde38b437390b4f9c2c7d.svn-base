<template>
    <div class="qdxd-container container">
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
                        <FormItem>
                            <Input v-model="formItem.uerTel" placeholder="电话"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem>
                            <Input v-model="formItem.userName" placeholder="姓名"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <formItem class="btn-box">
                            <i-button type="primary" class="btn btn-search">搜索</i-button>
                            <i-button type="warning" class="btn btn-reset" @click="resetSearch">重置</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" :height="setTableHeight" ref="mainTable"></Table>
        </div>
    </div>
</template>
<script>
import storejs from "storejs";
import echartsCommon from "@/api/Common.js";
export default {
  data() {
    return {
      //时间回到今天
      options1: echartsCommon.shortcuts(),
      // -----
      selectDom: "",
      selectMes: "",
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableHeight: 40,
      formItem: {
        startDate: "",
        endDate: "",
        uerTel: "",
        userName: ""
      },
      columns1: [
        {
          title: " ",
          key: "title",
          align: "date",
          width: "100",
          fixed: "left"
        },
        {
          title: "08:00-09:00",
          key: "time1",
          align: "left",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "09:00-10:00",
          key: "time2",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "10:00-11:00",
          key: "time3",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "11:00-12:00",
          key: "time4",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "13:00-14:00",
          key: "time5",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "14:00-15:00",
          key: "time6",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "15:00-16:00",
          key: "time7",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "16:00-17:00",
          key: "time8",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "17:00-18:00",
          key: "time9",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "18:00-19:00",
          key: "time10",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "19:00-20:00",
          key: "time11",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "20:00-21:00",
          key: "time12",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "20:00-21:00",
          key: "time13",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "21:00-22:00",
          key: "time14",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "22:00-23:00",
          key: "time15",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: "23:00-24:00",
          key: "time16",
          align: "center",
          width: 180,
          render: (h, parmas) => {
            let that = this;
            return that.setTableStyle(h, parmas);
          }
        },
        {
          title: " ",
          key: "null",
          align: "center"
        }
      ],
      list: [
        {
          title: "1号",
          time1: "",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "",
          time5: "陈医生 美白补水",
          time6: "",
          time7: "",
          time8: "陈医生 美白补水",
          time9: "",
          time10: "陈医生 美白补水",
          time11: "",
          time12: "",
          time13: "陈医生 美白补水",
          time14: "",
          time15: "",
          time16: "陈医生 美白补水"
        },
        {
          title: "2号",
          time1: "",
          time2: "",
          time3: "",
          time4: "",
          time5: "陈医生 美白补水",
          time6: "",
          time7: "陈医生 美白补水",
          time8: "",
          time9: "陈医生 美白补水",
          time10: "",
          time11: "",
          time12: "陈医生 美白补水",
          time13: "",
          time14: "陈医生 美白补水",
          time15: "",
          time16: "陈医生 美白补水"
        },
        {
          title: "3号",
          time1: "",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "",
          time5: "陈医生 美白补水",
          time6: "",
          time7: "陈医生 美白补水",
          time8: "",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "4号",
          time1: "",
          time2: "",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "5号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "6号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "7号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "8号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "9号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "10号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "11号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "12号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "13号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "14号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "",
          time15: "",
          time16: "陈医生 美白补水"
        },
        {
          title: "15号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "16号",
          time1: "陈医生 美白补水",
          time2: "",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "",
          time12: "",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "17号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "18号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "19号",
          time1: "陈医生 美白补水",
          time2: "",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "20号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "21号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "22号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "23号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "24号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "25号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "26号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "27号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "28号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "29号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "30号",
          time1: "陈医生 美白补水",
          time2: "陈医生 美白补水",
          time3: "陈医生 美白补水",
          time4: "陈医生 美白补水",
          time5: "陈医生 美白补水",
          time6: "陈医生 美白补水",
          time7: "陈医生 美白补水",
          time8: "陈医生 美白补水",
          time9: "陈医生 美白补水",
          time10: "陈医生 美白补水",
          time11: "陈医生 美白补水",
          time12: "陈医生 美白补水",
          time13: "陈医生 美白补水",
          time14: "陈医生 美白补水",
          time15: "陈医生 美白补水",
          time16: "陈医生 美白补水"
        },
        {
          title: "",
          time1: "",
          time2: "",
          time3: "",
          time4: "",
          time5: "",
          time6: "",
          time7: "",
          time8: "",
          time9: "",
          time10: "",
          time11: "",
          time12: "",
          time13: "",
          time14: "",
          time15: "",
          time16: ""
        }
      ]
    };
  },
  computed: {
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    setTableStyle(h, parmas) {
      let that = this;
      let key = parmas.column.key;
      if (parmas.row[key].length > 0) {
        // let classList = {}
        // let index = parmas.index
        // for (let i = 0; i < 4; i++) {
        //     classList['time'+(i+1)] = false
        // }
        // let order = index % 4 + 1
        // classList['time' + order] = true
        // classList['time'] = true
        // 空闲
        return h(
          "div",
          {
            class: {
              time: true
            },
            // style: {
            //     height: '100%',
            //     textAlign: 'center',
            //     borderStyle: 'solid',
            //     borderWidth: '1px',
            //     borderColor: 'transparent'
            // },
            on: {
              click: e => {
                that.$Message.success("");
                // 选中后修改颜色
                // if (that.selectDom.style) {
                //     that.selectDom.style.borderColor = 'transparent'
                // }
                // e.target.style.borderColor = 'green'
                // that.selectDom = e.target
                that.$Modal.confirm({
                  title: "提示",
                  content: "是否选择该时间段",
                  onOk: () => {
                    that.selectMes = parmas;
                    that.$router.go(-1);
                  },
                  onCancel: () => {}
                });
              }
            }
          },
          "可选"
        );
      }

      return h("div", {}, "");
    },
    chooseYymd() {
      let that = this;
    },
    resetSearch() {
      let that = this;
      that.$refs.searchForm.resetFields();
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate(validate => {
        if (validate) {
          that.$Message.success("添加成功");
          that.$refs.formValidate1.resetFields();
          that.modal1 = false;
        } else {
          this.$Message.error("有必填项为空");
        }
      });
    },
    searchCustomerTel() {
      let that = this;
      that.$refs.searchTelForm.validate(validate => {
        if (validate) {
          // 搜索...
          that.$refs.searchTelForm.resetFields();
          that.poupSearchTel = false;
          that.modal1 = true;
        } else {
          that.$Message.error("请输入用户的联系电话");
        }
      });
    },
    searchReset() {
      let that = this;
      that.$refs.searchTelForm.resetFields();
      that.poupSearchTel = false;
    },
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById("tableBox").offsetHeight;
      window.onresize = function() {
        that.tableHeight = document.getElementById("tableBox").offsetHeight;
      };
    },
    setPage() {
      let that = this;
      let teblePage = that.tablePage;
      teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1;
      let endPage = teblePage.page * teblePage.pageNum;
      teblePage.endNum =
        endPage > teblePage.allNum ? teblePage.allNum : endPage;
    },
    getList() {
      let that = this;
      that.setPage();
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
    });
  }
};
</script>
<style>
.time {
  height: 66px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 16px;
  position: relative;
  padding-left: 3px;
  color: #666;
  background: rgba(131, 185, 78, 0.05);
}

.time:before {
  content: "";
  position: absolute;
  width: 3px;
  height: 100%;
  left: 0;
  top: 0;
  background: #83b94e;
}

.time.time1 {
  /*background: rgba(131, 185, 78, .05);*/
  /*color: #72C124;*/
}

.time.time2 {
  /*background: rgba(251, 213, 90, .05);*/
  /*color: #E9BA20;*/
}

.time.time3 {
  /*background: rgba(241, 99, 145, .05);*/
  /*color: #EA3B74;*/
}

.time.time4 {
  /*background: rgba(41, 191, 215, .05);*/
  /*color: #24BDD5;*/
}

/*.time.time1:before{
    background: #83B94E;
}
.time.time2:before{
    background: #FBD55A;
}
.time.time3:before{
    background: #F16391;
}
.time.time4:before{
    background: #29BFD7;
}*/
</style>