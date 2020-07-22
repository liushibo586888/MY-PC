<template>
    <div class="customerPerformance-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
                <row :gutter="20">
                    <i-col span="3">
                        <formItem prop="startDate">
                            <DatePicker type="date" placeholder="开始日期" v-model="formItem.startDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="3">
                        <formItem prop="endDate">
                            <DatePicker type="date" placeholder="结束日期" v-model="formItem.endDate" :clearable="false" :editable="false"></DatePicker>
                        </formItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <i-button type="primary" class="btn" @click="searchForm">搜索</i-button>
                            <i-button type="warning" class="btn" @click="resetSearch">重置</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="tableName">客户状态来人业绩报表</div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
            <!-- <Select v-model="tablePage.pageNum" class="table-row" placement="top" @on-change="changePage">
                <Option :value="item.ID" v-for="(item, index) in tableRows" :key="index">{{item.Name}}</Option>
            </Select>
            <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
            <i-button class="btn btn-prev" type="ghost" @click="prevPage()">上一页</i-button>
            <i-button class="btn btn-next" type="primary" @click="nextPage()">下一页</i-button>
            <div class="page-box">
                <p>前往</p>
                 <Input-number :max="tablePage.maxPageNum" :min="1" v-model="tablePage.page" @on-change="changePage"></Input-number>
                <p>页</p>
            </div> -->
        </div>
    </div>
</template>
<script>
import api from '@/api/index.js'
// import manager from '@/api/manager.js'
import storejs from 'storejs'
import { mapState } from 'vuex'
import moment from "moment"
export default {
  data() {
    return {
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 199,
        startNum: 0,
        endNum: 0
      },
      tableLoading: false,
      loading: false,
      tableHeight: 40,
      formItem: {
        startDate: new Date(),
        endDate: new Date(),
        userTel: '',
        userName: ''
      },
      columns1: [
        {
          title: '项目分类',
          key: 'ItemClassificationName',
          align: 'center',
          width: 200,
          sortable: true
        }, {
          title: '总人次',
          width: 200,
          sortable: true,
          key: 'TotalCustomerNumber',
          align: 'center'
        }, {
          title: '总业绩',
          width: 200,
          sortable: true,
          key: 'TotalPerformance',
          align: 'center'
        }, {
          title: '总成交客单价',
          width: 200,
          sortable: true,
          key: 'TotalDealPerCustomerTransaction',
          align: 'center'
        }, {
          title: '总客单价',
          width: 200,
          sortable: true,
          key: 'TotalPerCustomerTransaction',
          align: 'center'
        }, {
          title: '新客-总人数',
          key: 'NewCustomerNumber',
          sortable: true,
          width: 200,
          align: 'center'
        }, {
          title: '新客-普通来人',
          key: 'NewOrdinaryNumber',
          sortable: true,
          width: 200,
          align: 'center'
        }, {
          title: '新客-体验人数',
          key: 'NewExperienceNumber',
          sortable: true,
          width: 200,
          align: 'center'
        }, {
          title: '新客-单购人数',
          width: 200,
          sortable: true,
          key: 'NewSingleNumber',
          align: 'center'
        }, {
          title: '新客-疗程人数',
          width: 200,
          sortable: true,
          key: 'NewTreatmentNumber',
          align: 'center'
        }, {
          title: '新客-年卡人数',
          width: 200,
          sortable: true,
          key: 'NewYearCardNumber',
          align: 'center'
        }, {
          title: '新客-套组套餐人数',
          width: 200,
          sortable: true,
          key: 'NewSetNumber',
          align: 'center'
        }, {
          title: '新客-套组人数',
          width: 200,
          sortable: true,
          key: 'NewSetNumber',
          align: 'center'
        }, {
          title: '新客-成交人数',
          sortable: true,
          width: 200,
          key: 'NewDealNumber',
          align: 'center'
        }, {
          title: '新客-成交率',
          sortable: true,
          width: 200,
          key: 'NewDealRate',
          align: 'center'
        }, {
          title: '新客-业绩',
          sortable: true,
          width: 200,
          key: 'NewPerformance',
          align: 'center'
        }, {
          title: '新客-成交客单价',
          width: 200,
          sortable: true,
          key: 'NewPerCustomerTransaction',
          align: 'center'
        }, {
          title: '跟踪客-总人数',
          width: 200,
          sortable: true,
          key: 'FollowCustomerNumber',
          align: 'center'
        }, {
          title: '跟踪客-普通来人',
          width: 200,
          sortable: true,
          key: 'FollowOrdinaryNumber',
          align: 'center'
        }, {
          title: '跟踪客-体验人数',
          width: 200,
          sortable: true,
          key: 'FollowExperienceNumber',
          align: 'center'
        }, {
          title: '跟踪客-单购人数',
          width: 200,
          sortable: true,
          key: 'FollowSingleNumber',
          align: 'center'
        }, {
          title: '跟踪客-疗程人数',
          width: 200,
          sortable: true,
          key: 'FollowTreatmentNumber',
          align: 'center'
        }, {
          title: '跟踪客-年卡人数',
          width: 200,
          sortable: true,
          key: 'FollowYearCardNumber',
          align: 'center'
        }, {
          title: '跟踪客-套组人数',
          width: 200,
          sortable: true,
          key: 'FollowSetNumber',
          align: 'center'
        }, {
          title: '跟踪客-成交人数',
          sortable: true,
          width: 200,
          key: 'FollowDealNumber',
          align: 'center'
        }, {
          title: '跟踪客-成交率',
          width: 200,
          sortable: true,
          key: 'FollowDealRate',
          align: 'center'
        }, {
          title: '跟踪客-业绩',
          width: 200,
          sortable: true,
          key: 'FollowPerformance',
          align: 'center'
        }, {
          title: '跟踪客-成交客单价',
          width: 200,
          sortable: true,
          key: 'FollowPerCustomerTransaction',
          align: 'center'
        }, {
          title: '老客-人数',
          width: 200,
          sortable: true,
          key: 'OldCustomerNumber',
          align: 'center'
        }, {
          title: '老客-体验人数',
          width: 200,
          sortable: true,
          key: 'OldExperienceNumber',
          align: 'center'
        }, {
          title: '老客-单购人数',
          width: 200,
          sortable: true,
          key: 'OldSingleNumber',
          align: 'center'
        }, {
          title: '老客-升单疗程人数',
          width: 200,
          sortable: true,
          key: 'OldRiseTreatmentNumber',
          align: 'center'
        }, {
          title: '老客-升单年卡人数',
          width: 200,
          sortable: true,
          key: 'OldRiseYearCardNumber',
          align: 'center'
        }, {
          title: '老客-升单套组人数',
          width: 200,
          sortable: true,
          key: 'OldRiseSetGroupNumber',
          align: 'center'
        }, {
          title: '老客-二次升单疗程人数',
          width: 200,
          sortable: true,
          key: 'OldSecondRiseTreatmentNumber',
          align: 'center'
        }, {
          title: '老客-二次升单年卡人数',
          width: 200,
          sortable: true,
          key: 'OldSecondRiseYearCardNumber',
          align: 'center'
        }, {
          title: '老客-二次升单套组人数',
          width: 200,
          sortable: true,
          key: 'OldSecondRiseSetGroupNumber',
          align: 'center'
        }, {
          title: '老客-升单率',
          width: 200,
          sortable: true,
          key: 'OldRiseRate',
          align: 'center'
        }, {
          title: '老客-二次升单率',
          sortable: true,
          width: 200,
          key: 'OldSecondRiseRate',
          align: 'center'
        }, {
          title: '老客-业绩',
          width: 200,
          sortable: true,
          key: 'OldPerformance',
          align: 'center'
        }, {
          title: '老客-成交客单价',
          width: 200,
          sortable: true,
          key: 'OldPerCustomerTransaction',
          align: 'center'
        }, {
          title: '护理人数',
          key: 'NursingNumber',
          sortable: true,
          width: 200,
          align: 'center'
        }, {
          title: ' ',
          width: 10
        }
      ],
      list: []
    }
  },
  computed: {
    ...mapState({
      userMes: state => state.app.userMes,
      tableRows: state => state.app.tableRows,
      authorList: state => state.app.authorList
    }),
    setTableHeight() {
      let that = this
      return that.tableHeight
    }
  },
  methods: {
    setAuthor() {
      // 判断用户是否有查看客户详情权限
      let that = this
      let pageName = that.$route.name
      let list = that.authorList[pageName]
      if (list) {
        for (let i of list) {
          if (i.Name === '增加') {
            that.showAdd = i.IsVisible
          }
        }
      }
    },
    showRemark(text) {
      // 显示备注
      let that = this
      that.$Modal.info({
        title: '详情',
        content: text
      })
    },
    searchForm() {
      // 搜索表格
      let that = this
      if (that.formItem.startDate && that.formItem.endDate) {
        // 两者同时存在
        if (Number(that.formItem.startDate) > Number(that.formItem.endDate)) {
          that.$Message.error('开始日期不得大于结束日期')
          return false
        }
      }
      that.tablePage.page = 1
      that.getList()
    },
    resetSearch() {
      let that = this
      that.$refs.searchForm.resetFields()
      that.tablePage.page = 1
      that.getList()
    },
    initTableHeight() {
      let that = this
      that.tableHeight = document.getElementById('tableBox').offsetHeight
      window.onresize = function () {
        // that.tableHeight = document.getElementById('tableBox').offsetHeight
      }
    },
    setPage() {
      let that = this
      let teblePage = that.tablePage
      teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1
      let endPage = teblePage.page * teblePage.pageNum
      teblePage.endNum = endPage > teblePage.allNum ? teblePage.allNum : endPage
    },
    prevPage() {
      let that = this
      if (that.tablePage.page <= 1) {
        that.$Message.error('已经是第一页')
        return false
      }
      that.tablePage.page--
      that.getList()
    },
    nextPage() {
      let that = this
      if (that.tablePage.page >= that.tablePage.maxPageNum) {
        that.$Message.error('已经是最后一页')
        return false
      }
      that.tablePage.page++
      that.getList()
    },
    changePage() {
      let that = this
      that.getList()
    },
    getList() {
      let that = this

      let data = {
        EmployeeID: that.userMes.EmployeeID,
        StartDate: that.formItem.startDate,
        EndDate: that.formItem.endDate
        // CustomerName: that.formItem.userName,
        // CustomerPhone: that.formItem.userTel,
        // page: that.tablePage.page,
        // size: that.tablePage.pageNum
      }
      // // 判断电话
      // if (data.CustomerPhone) {
      //     let regex = /^1\d{10}$/
      //     if (!regex.test(data.CustomerPhone)) {
      //         that.$Message.error('电话号码格式有误')
      //         return false
      //     }
      // }
      // // 转换日期
      if (data.StartDate) {
        data.StartDate = moment(data.StartDate).format('YYYY-MM-DD')
      }
      if (data.EndDate) {
        data.EndDate = moment(data.EndDate).format('YYYY-MM-DD')
      }
      that.tableLoading = true
      api.getCustomerStatusList(data).then((response) => {
        if (response.error_code === 'Success') {
          let res = response.data
          that.list = res.list
          that.tableLoading = false
        } else {
          that.$Message.error(response.error_message)
        }
      })
    },
    exportTable() {
      let that = this
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      })
    }
  },
  mounted() {
    let that = this
    that.$nextTick(() => {
      that.setAuthor()
      that.initTableHeight()
      that.getList()
    })
  }
}
</script>
<style>
.customerPerformance-container .ivu-table-sort {
  /*overflow: auto;*/
  overflow: visible;
}
.customerPerformance-container .ivu-table-sort i {
  font-size: 18px;
}
.customerPerformance-container .ivu-table-sort i:first-child {
  top: -2px;
}
.tableName {
  font-size: 20px;
  text-align: center;
  color: #79aa49;
  /* margin-bottom: 10px; */
}
</style>

