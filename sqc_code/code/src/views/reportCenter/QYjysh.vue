 <template>
    <div class="QYjysh-container container">
        <div>
            <Tabs value="name1" @on-click="tabChangeQYjysh">
                <TabPane label="总业绩排名" icon="dot" name="name1">
                    <keep-alive>
                        <template v-if="tabIndex2=='name1'">
                            <jysh1-demo></jysh1-demo>
                        </template>
                    </keep-alive>
                </TabPane>

                <TabPane label="总客单排名" icon="dot" name="name2">
                    <keep-alive>
                        <template v-if="tabIndex2=='name2'">
                            <jysh2-demo></jysh2-demo>
                        </template>
                    </keep-alive>
                </TabPane>

                <TabPane label="完成率排名" icon="dot" name="name3">
                    <keep-alive>
                        <template v-if="tabIndex2=='name3'">
                            <jysh3-demo></jysh3-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客成交率排名" icon="dot" name="name4">
                    <keep-alive>
                        <template v-if="tabIndex2=='name4'">
                            <jysh4-demo></jysh4-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客到店排名" icon="dot" name="name5">
                    <keep-alive>
                        <template v-if="tabIndex2=='name5'">
                            <jysh5-demo></jysh5-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客业绩排名" icon="dot" name="name6">
                    <keep-alive>
                        <template v-if="tabIndex2=='name6'">
                            <jysh6-demo></jysh6-demo>
                        </template>
                    </keep-alive>
                </TabPane>

                <TabPane label="新客客单排名" icon="dot" name="name7">
                    <keep-alive>
                        <template v-if="tabIndex2=='name7'">
                            <jysh7-demo></jysh7-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="护理客业绩排名" icon="dot" name="name8">
                    <keep-alive>
                        <template v-if="tabIndex2=='name8'">
                            <jysh8-demo></jysh8-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="产品业绩排名" icon="dot" name="name9">
                    <keep-alive>
                        <template v-if="tabIndex2=='name9'">
                            <jysh9-demo></jysh9-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="跟踪客业绩排名" icon="dot" name="name10">
                    <keep-alive>
                        <template v-if="tabIndex2=='name10'">
                            <jysh10-demo></jysh10-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="护理客执行排名" icon="dot" name="name11">
                    <keep-alive>
                        <template v-if="tabIndex2=='name11'">
                            <jysh11-demo></jysh11-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="业绩比例统计" icon="dot" name="name12">
                    <keep-alive>
                        <template v-if="tabIndex2=='name12'">
                            <jysh12-demo></jysh12-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="业绩提升统计" icon="dot" name="name13">
                    <keep-alive>
                        <template v-if="tabIndex2=='name13'">
                            <jysh13-demo></jysh13-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="项目分类成交率" icon="dot" name="name14">
                    <keep-alive>
                        <template v-if="tabIndex2=='name14'">
                            <jysh14-demo></jysh14-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客渠道分类成交率" icon="dot" name="name15">
                    <keep-alive>
                        <template v-if="tabIndex2=='name15'">
                            <jysh15-demo></jysh15-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客项目分类" icon="dot" name="name16">
                    <keep-alive>
                        <template v-if="tabIndex2=='name16'">
                            <jysh16-demo></jysh16-demo>
                        </template>
                    </keep-alive>
                </TabPane>
                <TabPane label="新客渠道分类" icon="dot" name="name17">
                    <keep-alive>
                        <template v-if="tabIndex2=='name17'">
                            <jysh17-demo></jysh17-demo>
                        </template>
                    </keep-alive>
                </TabPane>
            </Tabs>
        </div>

        <!-- <div class="search-box">
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
                    <i-col span="3" v-show="QYisshow">
                        <FormItem prop="sCityName">
                            <Select v-model="formItem.sCityName" placeholder="区域" :filterable="true">
                                <Option v-for="item in storeList" :value="item.Name" :key="item.ID" @click.native="choose(item.Name,item.ID)">{{ item.Name }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="3" v-show="MDisshow">
                        <FormItem prop="MDid">
                            <Select v-model="formItem.MDid" placeholder="门店" :filterable="true">
                                <Option v-for="item in CityList" :value="item.Name" :key="item.ID" @click.native="chooseMD(item.Name,item.ID)">{{ item.Name }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <formItem prop="endDate">
                            <Select v-model="val" placeholder="对比条件" :filterable="true" @on-change='TJchange'>
                                <Option :value='0'>区域对比</Option>
                                <Option :value='1'>单店对比</Option>
                            </Select>
                        </formItem>
                    </i-col>
                    <i-col :span='span'>
                        <formItem class="btn-box">
                            <Button type="error" class="btn" @click="duibi">+对比</Button>
                            <Button type="primary" class="btn" @click="searchList">查询</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div> -->

    </div>
</template>
<script>
import { mapState } from "vuex";
import jysh1Demo from "../reportCenter/QYjyshchildren/jyshZYJ";
import jysh2Demo from "../reportCenter/QYjyshchildren/jyshZKDPM";
import jysh3Demo from "../reportCenter/QYjyshchildren/jyshWCL";
import jysh4Demo from "../reportCenter/QYjyshchildren/jyshXKCJL";
import jysh5Demo from "../reportCenter/QYjyshchildren/jyshXKDD";
import jysh6Demo from "../reportCenter/QYjyshchildren/jyshXKYJ";
import jysh7Demo from "../reportCenter/QYjyshchildren/jyshXKKD";
import jysh8Demo from "../reportCenter/QYjyshchildren/jyshHLKYJ";
import jysh9Demo from "../reportCenter/QYjyshchildren/jyshCPYJ";
import jysh10Demo from "../reportCenter/QYjyshchildren/jyshGZKYJ";
import jysh11Demo from "../reportCenter/QYjyshchildren/jyshHLKZX";
import jysh12Demo from "../reportCenter/QYjyshchildren/jyshYJBL";
import jysh13Demo from "../reportCenter/QYjyshchildren/jyshYJTS";
import jysh14Demo from "../reportCenter/QYjyshchildren/jyshXMFLCJL";
import jysh15Demo from "../reportCenter/QYjyshchildren/jyshQDFLCJL";
import jysh16Demo from "../reportCenter/QYjyshchildren/jyshXKXM";
import jysh17Demo from "../reportCenter/QYjyshchildren/jyshXKQD";

export default {
  data() {
    return {
      tabIndex2: "name1"
    };
  },
  methods: {
    tabChangeQYjysh(name) {
      let that = this;
      that.tabIndex2 = name;
    }
  },
  components: {
    jysh1Demo,
    jysh2Demo,
    jysh3Demo,
    jysh4Demo,
    jysh5Demo,
    jysh6Demo,
    jysh7Demo,
    jysh8Demo,
    jysh9Demo,
    jysh10Demo,
    jysh11Demo,
    jysh12Demo,
    jysh13Demo,
    jysh14Demo,
    jysh15Demo,
    jysh16Demo,
    jysh17Demo
  }
};
</script>
<style>
.QYjysh-container {
  width: 100%;
  position: relative;
  padding: 72px 0px;
  background: #f0f0f0;
  overflow: visible !important;
}
.QYjysh-container .ivu-tabs-nav .ivu-tabs-tab .ivu-icon.ivu-icon-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e9eaec;
}
.QYjysh-container .ivu-tabs-tab-active .ivu-icon.ivu-icon-dot {
  background: #79aa49 !important;
}
.QYjysh-container .ivu-tabs {
  margin-top: -72px;
}
.QYjysh-container .ivu-tabs .ivu-tabs-tabpane {
  margin-top: -27px;
}

.QYjysh-container .search-box {
  border-radius: 5px;
  background: #fff;
  padding: 10px 20px;
  /* margin-top: 20px; */
}
.QYjysh-container .header {
  position: absolute;
  padding-left: 22px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  top: 0;
  width: 100%;
  left: 0;
}
.QYjysh-container .form-box {
  background: #f0f0f0;
  height: 480px;
  padding-top: 11px;
  padding-bottom: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.QYjysh-container .form-box > .charts {
  position: relative;
  background: #fff;
  border-radius: 8px;
  width: 20%;
  padding-top: 40px;
  height: 100%;
  flex: 1;
}
.QYjysh-container .form-box .content {
  position: relative;
  width: 100%;
  height: 100%;
}

.QYjysh-container #data_source_com,
.QYjysh-container #data_source_fb {
  height: 100%;
  width: 200px;
}
</style> 
