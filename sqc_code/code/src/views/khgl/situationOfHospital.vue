<!-- 来院情况 -->
<template>
    <div class="situationOfHospital-container">
        <Tabs type="card" :animated="false" @on-click="tabChange">
            <TabPane label="来院记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 0">
                        <lyTable :CustomerID="ID"></lyTable>
                    </template>
                </div>
            </TabPane>
            <TabPane label="追踪回访记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 1">
                        <followVisit :CustomerID="ID"></followVisit>
                    </template>
                </div>
            </TabPane>
            <TabPane label="预约记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 2">
                        <reservationRecord :CustomerID="ID"></reservationRecord>
                    </template>
                </div>
            </TabPane>
            <TabPane label="执行记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 3">
                        <executiveLogging :CustomerID="ID"></executiveLogging>
                    </template>
                </div>
            </TabPane>
            <TabPane label="咨询记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 4">
                        <searchRecord :CustomerID="ID"></searchRecord>
                    </template>
                </div>
            </TabPane>
            <!-- <TabPane label="通话记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 5">
                        <callLog></callLog>
                    </template>
                </div>
            </TabPane> -->
            <TabPane label="未还款记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 5">
                        <repaymentRecord :CustomerID="ID"></repaymentRecord>
                    </template>
                </div>
            </TabPane>
            <TabPane label="追踪计划" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 6">
                        <trackingPlan :CustomerID="ID"></trackingPlan>
                    </template>
                </div>
            </TabPane>
            <TabPane label="消费记录" icon="dot">
                <div class="box">
                    <template v-if="tabIndex == 7">
                        <purchaseHistory :CustomerID="ID"></purchaseHistory>
                    </template>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
// 来院情况
import lyTable from "@/views/khgl/lyTable.vue";
// 追踪回访记录
import followVisit from "@/views/khgl/followVisit.vue";
// 预约记录
import reservationRecord from "@/views/khgl/reservationRecord.vue";
// 执行记录
import executiveLogging from "@/views/khgl/executiveLogging.vue";
// 咨询记录
import searchRecord from "@/views/khgl/searchRecord.vue";
// 通话记录
import callLog from "@/views/khgl/callLog.vue";
// 未还款记录
import repaymentRecord from "@/views/khgl/repaymentRecord.vue";
// 追踪计划
import trackingPlan from "@/views/khgl/trackingPlan.vue";
// 消费记录
import purchaseHistory from "@/views/khgl/purchaseHistory.vue";
import { mapState } from "vuex";
export default {
  props: {
    CustomerID: {
      type: String,
      default: "123456"
    }
  },
  data() {
    return {
      tabIndex: -1,
      ID: ""
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
    tabChange(name) {
      let that = this;
      that.tabIndex = name;
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.ID = that.CustomerID;
      if (that.ID) {
        that.tabIndex = 0;
      }
    });
  },

  activated() {
    let that = this;
    that.$nextTick(() => {
      that.tabIndex = 0;
    });
  },
  components: {
    lyTable,
    followVisit,
    reservationRecord,
    executiveLogging,
    searchRecord,
    callLog,
    repaymentRecord,
    trackingPlan,
    purchaseHistory
  }
};
</script>
<style>
.situationOfHospital-container .ivu-tabs-bar {
  margin-bottom: 0;
}

.situationOfHospital-container .box {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
}

.situationOfHospital-container
  .ivu-tabs-nav
  .ivu-tabs-tab
  .ivu-icon.ivu-icon-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e9eaec;
}

.situationOfHospital-container .ivu-tabs-tab-active .ivu-icon.ivu-icon-dot {
  background: #79aa49 !important;
}
</style>