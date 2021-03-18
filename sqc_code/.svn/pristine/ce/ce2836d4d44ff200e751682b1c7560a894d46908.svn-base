<template>
  <div class="employeeScheduling-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent ref="searchForm" class="search-form">
        <row :gutter="20">
          <i-col span="3">
            <FormItem prop="StoreID">
              <Select v-model="formItem.StoreID" placeholder="门店" :filterable="true" :label-in-value='true'>
                <Option v-for="(item,index) in storeList" :value="item.value" :label="item.label" :key="index" @click.native="ChangeStore(item.value)">{{item.label}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <!-- <i-col span="3">
            <formItem prop="Date">
              <Date-picker class="DatePicker_time" type="date" :options="options1" placeholder="开始日期" v-model="formItem.Date" :clearable="false" :editable="false"></Date-picker>
            </formItem>
          </i-col> -->
        </row>
      </Form>
    </div>
    <div class="table-box">
      <Row style="height:100%;">
        <i-col span="3" style="height:100%;">
          <div style="width:100%;height:100%;border: 1px solid rgb(235, 235, 235);">
            <div class="beautician-list" style="width:100%; height:100%; overflow-y:auto;">
              <div class="beautician-item" v-for="(i, index) in humanList" :class="{'active' : beauticianIndex == index}" @click="chooseBeautician(i.ID,index)">
                <!-- <div class="beautician-avatar" v-if="i.EmployeeImage" style="width:40px;height:40px; border-radius:50%; margin-right:10px; background-size: 100% 100%;" :style="'background-image:url(data:image/jpeg;base64,'+ i.EmployeeImage +')'"></div> -->
                <div :style="{color:(beauticianIndex == index?'#8cce4a':'')}">{{i.Name}}</div>
              </div>
            </div>
          </div>
        </i-col>
        <i-col span="21" style="height:100%;">
          <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
          <!-- 星期 -->
          <div class="time-box" style="height:100%;">
            <div class="title-box">
              <div :class="[selectIndex==index?'day-boxS':'day-box']" v-for="(i,index) in dateList" :key="index" @click="selectDate(i,index)">
                <div style="cursor:pointer;">{{i}}</div>
              </div>
            </div>
            <div class="detail-box">
              <div class="zwsjDiv" v-if="pbList.length==0">暂无排班数据</div>
              <div class="null-box" v-for="(item,index) in pbList" :key="index">
                <div class="content" @click="showModal(item.phone)">
                  <div class="down-box">
                    <p>{{item.time}}</p>
                  </div>
                  <div class="down-box" style="background:#8cce4a;color:#fff" v-if="item.start==1">
                    <p>已预约</p>
                  </div>
                  <div class="down-box" style="background: rgb(251, 84, 39);color:#fff" v-else>
                    <p>暂无预约</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
    <Modal v-model="modal1" title="预约详情" footer-hide>
      <div class="modalTitle">
        <div>客户名:</div>
        <div>{{modalData.CustomerName}}</div>
      </div>
      <!-- <p class="modalTitle">客户名:　{{modalData.CustomerName}}</p> -->
      <div class="modalTitle">
        <div>预约时间:</div>
        <div>{{modalData.Date}}</div>
      </div>

      <div class="modalTitle">
        <div>护理师:</div>
        <div>{{modalData.BeauticianName}}</div>
      </div>

      <div class="modalTitle">
        <div>备注:</div>
        <div>{{modalData.Remark ? modalData.Remark : '无'}}</div>
      </div>
    </Modal>
  </div>
</template>
<script>
import api from '@/api/index.js';
import storejs from 'storejs';
import { mapState } from 'vuex';
import moment from 'moment';
import echartsCommon from '@/api/Common.js';
export default {
  data() {
    return {
      modal1: false,
      selectIndex: 0,
      HLSID: '',
      options1: echartsCommon.disabledDate(),
      tableLoading: false,
      humanList: [],
      tableHeight: 300,
      list: [],
      beauticianIndex: 0,
      formItem: {
        Date: echartsCommon.changeTime(new Date()),
        StoreID: ''
      },
      storeList: [],
      pbList: [],
      dateList: echartsCommon.dateArr(7),
      modalData: {}
    };
  },
  methods: {
    //显示对话框
    showModal(phone) {
      let that = this;
      let data = {
        phone: phone,
        Date: that.formItem.Date
      };
      if (phone == null || phone == '') {
        that.$Message.error('当前时间段没有被预约');
        return;
      } else {
        api.QueryPhoneByReserve(data).then((res) => {
          if (res.error_code === 'Success') {
            that.modal1 = true;
            that.modalData = res.data;
            that.modalData.Date = echartsCommon.changeTimeHms(that.modalData.Date).slice(0, that.modalData.Date.length - 3);
          } else {
            that.$Message.error(res.error_message);
          }
        });
      }
    },
    //选择门店
    ChangeStore(ID) {
      this.formItem.StoreID = ID;
      this.getHLStList();
    },
    //选择时间
    selectDate(item, index) {
      this.selectIndex = index;
      this.formItem.Date = item;
      this.getPBdateList();
    },
    //选择护理师
    chooseBeautician(ID, index) {
      this.HLSID = ID;
      this.beauticianIndex = index;
      this.getPBdateList();
    },
    //获取护理师排班列表
    getPBdateList() {
      let that = this;
      let data = {
        EmployeeId: that.HLSID,
        date: this.formItem.Date
      };
      that.tableLoading = true;
      api.EmployeeScheduleList(data).then((res) => {
        if (res.error_code === 'Success') {
          that.tableLoading = false;
          that.pbList = res.data;
        } else {
          this.$Message.error(res.error_message);
        }
      });
    },
    // 获取有效门店
    getStore() {
      let that = this;
      let data = {
        EmployeeID: that.userMes.EmployeeID
      };
      api.GetCascaderStore(data).then((res) => {
        if (res.error_code == 'Success') {
          if (res.data.length > 0) {
            that.formItem.StoreID = res.data[0].value;
          }
          that.storeList = res.data;
          that.getHLStList();
        } else {
          that.$Message.info({
            content: res.error_message,
            duration: 5
          });
        }
      });
    },
    // 获取护理师列表
    getHLStList() {
      let that = this;
      let data = {
        EmployeeId: that.userMes.EmployeeID,
        Type: that.formItem.StoreID
      };
      api.workHoursDefintionList(data).then((res) => {
        if (res.error_code === 'Success') {
          if (res.data.length != 0) {
            that.humanList = res.data;
            that.HLSID = that.humanList[0].ID;
            that.getPBdateList();
          } else {
            that.humanList = [];
          }
        } else {
          that.$Message.error(res.error_message);
        }
      });
    }
  },
  computed: {
    ...mapState({
      userMes: (state) => state.app.userMes,
      tableRows: (state) => state.app.tableRows
    })
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.getStore();
    });
  }
};
</script>
<style>
.modalTitle {
  font-size: 20px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
}
.modalTitle div:nth-of-type(1) {
  width: 20%;
  text-align: right;
}
.modalTitle div:nth-of-type(2) {
  width: 80%;
  text-indent: 1em;
}
.employeeScheduling-container {
  padding-top: 100px;
  padding-bottom: 20px;
}

.tips-box {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 16px;
  height: 20px;
  line-height: 20px;
}

.tips-box > div {
  float: right;
  width: 3.2%;
  overflow: hidden;
}

.tips-box .dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: green;
  margin-right: 4px;
  float: left;
}

.beautician-list {
  position: relative;
}

.storeName {
  position: absolute;
  top: 0;
  padding: 8px;
  background: #8ab95d;
  color: #fff;
}

.beautician-item {
  position: relative;
  width: 92%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #f6f6f6;
  margin: 16px auto 0 auto;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.14);
  padding-right: 6px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.beautician-item:first-child {
  margin-top: 5px;
}

.beautician-item:hover {
  border-bottom: 1px solid #f6f6f6;
  color: #8cce4a;
}

.beautician-item:after {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  top: 0;
  right: 0;
  background: #666666;
  transition: all 0.2s;
}

.beautician-item.active:after {
  background: #8cce4a;
}

#tableBox {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid #f6f6f6;
  border-radius: 5px;
  padding: 15px;
}

.time-box {
  padding: 80px 20px 20px 20px;
  width: 100%;
  position: relative;
}

.time-box .title-box {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 80px;
  padding: 0 1%;
  display: flex;
  text-align: center;
  font-size: 14px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;
}
.time-box .title-box .day-box {
  width: 13%;
  height: 50px;
  border: 1px solid #f6f6f6;
  line-height: 50px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  white-space: nowrap;
}
.time-box .title-box .day-boxS {
  width: 13%;
  height: 50px;
  border: 1px solid #8cce4a;
  line-height: 50px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  white-space: nowrap;
  color: #8cce4a;
}

.detail-box {
  position: relative;
  background: #f8f8f8;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.zwsjDiv {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: 100px;
}

.null-box {
  width: 14.28%;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  height: 70px;
  height: 16.66%;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.content {
  background: #fff;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.content .day-box {
  text-align: center;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #333;
}

.content .down-box {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #95c666; */
  /* color: #fff; */
  transition: all 0.2s;
}
</style>