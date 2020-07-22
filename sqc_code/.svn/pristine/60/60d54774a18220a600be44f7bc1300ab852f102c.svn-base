<!-- 消费意向 -->
<template>
  <div class="consumptionIntention-container">
    <div class="search-box" style="position:relative; top:0; margin-bottom:16px; padding-left: 0;">
      <Form :model="formItem" inline @submit.native.prevent class="search-form" ref="searchForm" :label-width="100">
        <row :gutter="20">
          <i-col span="6">
              <formItem prop="startDate" label="意向消费项目" v-if="allowAdd">
                <!-- <DatePicker type="date" placeholder="请选择" v-model="formItem.Name" :clearable="false" :editable="false"></DatePicker> -->
                <Select v-model="formItem.Name" :filterable="true" @on-open-change="getProject()">
                  <Option v-for="item in shiftsList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                </Select>
              </formItem>
          </i-col>
          <i-col span="6">
              <formItem prop="endDate" label="意向级别" v-if="allowAdd">
                <Select v-model="formItem.Level" :filterable="true" @on-open-change="getLevel()">
                  <Option v-for="item in levelList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                </Select>
              </formItem>
          </i-col>
          <i-col span="12">
            <formItem class="btn-box">
              <Button type="primary" class="btn btn-search" @click="newAdd" v-if="allowAdd">新增</Button>
              <Button type="warning" class="btn" @click="dbclickEdit" :disabled="!rowID"  v-if="allowModification">修改</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" highlight-row :data="list" ref="mainTable" @on-current-change="getRowID"></Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <div class="bottom-box">
      <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
      <Select v-model="tablePage.pageNum" class="table-row" placement="top" @on-change="changePage">
          <Option :value="item.ID" v-for="(item, index) in tableRows" :key="index">{{item.Name}}</Option>
      </Select>
      <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
      <i-button class="btn btn-prev" type="ghost" @click="prevPage()">上一页</i-button>
      <i-button class="btn btn-next" type="primary" @click="nextPage()">下一页</i-button>
      <div class="page-box">
        <p>前往</p>
          <Input-number :max="tablePage.maxPageNum" :min="1" v-model="tablePage.page" @on-change="changePage"></Input-number>
        <p>页</p>
      </div>
    </div>
    <!--弹窗-->
    <Modal :mask-closable="false"  v-model="modal1" class="dialog" :width="500" v-if="allowModification">
      <div slot='header' class="header">
        修改
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="100" @submit.native.prevent class="form" >
        <FormItem prop="Name" label="选择分类：" :rules="formValidateRule.Name">
          <Select v-model="formItem1.Name" :filterable="true">
            <Option v-for="item in shiftsList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="Level" label="选择优先级：" :rules="formValidateRule.Level">
          <Select v-model="formItem1.Level" :filterable="true">
            <Option v-for="item in levelList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="value2" placeholder="请输入备注"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
        <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
    import api from '@/api/index.js'
    import { mapState } from 'vuex'
    import moment from "moment"
    export default{
      props: {
        CustomerID: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
          tableLoading: false,
          loading: false,
          allowAdd: false,
          allowModification: false,
          rowID: null,
          formValidate: {},
          modal1: false,
          value2: '',
          levelList: [],
          formItem1: {},
          shiftsList: [],
          IntegrationBalance: 0,
          CashBalance: 0,
          formItem: {},
          formValidateRule: {
            Name: {required: true, message: '意向消费项目不得为空', trigger: 'blur'},
            Level: {required: true, message: '意向级别不得为空', trigger: 'blur'}
          },
          tablePage: {
              page: 1,
              pageNum: 10,
              maxPageNum: 100,
              allNum: 199,
              startNum: 0,
              endNum: 0
          },
          columns1: [
            {
              title: '意向消费项目',
              key: 'ItemCategoryName',
              align: 'center'
            },
            {
              title: '意向级别',
                key: 'LevelName',
                align: 'center'
            },
            {
              title: '登记人',
              key: 'EmployeeName',
              align: 'center'
            },
            {
              title: '登记日期',
              key: 'RegistDate',
              align: 'center',
              render: (h, params) => {
                if (!params.row.RegistDate) {
                  return '无'
                }
                return h('div', {}, moment(params.row.RegistDate).format('YYYY-MM-DD'))
              }
            },
            {
              title: '备注',
              key: 'Remark',
              align: 'center'
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
        })
      },
      mounted () {
        let that = this
        that.$nextTick(() => {
          that.setAllAuthor()
          that.getList()
          that.getLevel()
          that.getProject()
        })
      },
      methods: {
        setAllAuthor () {
          let that = this
          let pageName = that.$route.name
          let list = that.authorList[pageName]
          if (list) {
            for (let i of list) {
              // 添加意向消费
              if (i.Api === 'api/customerDetails/addConsumIntention') {
                that.allowAdd = i.IsVisible
              }
              // 修改消费意向
              if (i.Api === 'api/customerDetails/editConsumIntention/{id}') {
                that.allowModification = i.IsVisible
              }
            }
          }
        },
        addForm () {
          // 修改意向消费
          let that = this
          let data = {
            id: that.rowID,
            ItemCategoryID: that.formItem1.Name,
            IntentionLevel: that.formItem1.Level,
            EmployeeID: that.userMes.EmployeeID,
            CustomerID: that.$route.query.ID,
            Remark: that.value2
          }
          that.loading = true
          api.editIntention(that.rowID, data).then((response) => {
            that.loading = false
            if (response.error_code === 'Success') {
              that.modal1 = false
              that.$refs.searchForm.resetFields()
              that.getList()
              that.$Message.success('修改成功')
            } else {
              that.$Message.error(response.error_message)
            }
          })
          // that.$refs.formValidate1.validate((validate) => {
          //  if (validate) {
          //    let data = {
          //      id: that.id,
          //      ItemCategoryID: that.formItem1.Name,
          //      IntentionLevel: that.formItem1.Level,
          //      EmployeeID: that.userMes.EmployeeID,
          //      CustomerID: that.$route.query.ID,
          //      Remark: that.value2
          //    }
          //    api.editIntention(that.id, data).then((response) => {
          // //                    that.loading = false
          //      if (response.error_code === 'Success') {
          //        that.modal1 = false
          //        that.$refs.searchForm.resetFields()
          //        that.getList()
          //        that.$Message.success('修改成功')
          //      } else {
          //        that.$Message.error(response.error_message)
          //      }
          //    })
          //  } else {
          //    that.$Message.error('有必填项为空')
          //  }
          // })
        },
        // 取消
        resetForm () {
          let that = this
          that.modal1 = false
        },
        // 获取意向消费项目下拉框
        getProject () {
          let that = this
          let data = {}
          api.getProject(data).then((response) => {
            if (response.error_code === 'Success') {
              that.shiftsList = response.data.list
            } else {
              that.$Message.error(response.error_message)
            }
          })
        },
        // 获取意向消费项目下拉框
        getLevel () {
          let that = this
          let data = {}
          api.getLevel(data).then((response) => {
            if (response.error_code === 'Success') {
              that.levelList = response.data.list
            } else {
              that.$Message.error(response.error_message)
            }
          })
        },
        // 获取意向消费项目列表
        getList () {
          let that = this
          let data = {
            customerID: this.$route.query.ID,
          }
          that.tableLoading = true
          api.getIntentionList(data).then((response) => {
            if (response.error_code === 'Success') {
              let res = response.data
              that.list = res.list
              that.tableLoading = false
              that.page = res.page
              that.tablePage.pageNum = res.size
              that.tablePage.allNum = res.total
              that.tablePage.maxPageNum = res.totalPage
              that.setPage()
            } else {
              that.$Message.error(response.error_message)
            }
          })
        },
        // 新增
        newAdd () {
         // this.$refs.searchForm.validate((validate) => {
         //   if (validate) {
         //     let data = {
         //       ItemCategoryID: this.formItem.Name,
         //       IntentionLevel: this.formItem.Level,
         //       EmployeeID: this.userMes.EmployeeID,
         //       CustomerID: this.$route.query.ID,
         //       Remark: ''
         //     }
         //     api.newAddIntention(data).then((response) => {
         //       if (response.error_code === 'Success') {
         //         this.$refs.searchForm.resetFields()
         //         this.getList()
         //         this.$Message.success('添加成功')
         //       } else {
         //         this.$Message.error(response.error_message)
         //       }
         //     })
         //   } else {
         //     this.$Message.error('有必填项为空')
         //   }
         // })
          let data = {
            ItemCategoryID: this.formItem.Name,
            IntentionLevel: this.formItem.Level,
            EmployeeID: this.userMes.EmployeeID,
            CustomerID: this.$route.query.ID,
            Remark: ''
          }
          api.newAddIntention(data).then((response) => {
            if (response.error_code === 'Success') {
              this.$refs.searchForm.resetFields()
              this.getList()
              this.$Message.success('添加成功')
            } else {
              this.$Message.error(response.error_message)
            }
          })
        },
        getRowID (row) {
          let that = this
          that.rowID = row.ID
        },
        // 修改数据
        dbclickEdit (e) {
          let that = this
          let data = {
            id: that.rowID
          }
          api.getItemIntention(that.rowID, data).then((response) => {
            if (response.error_code === 'Success') {
              this.$set(this.formItem1, 'Name', response.data.ItemCategoryID)
              this.formItem1.Level = response.data.IntentionLevel
              this.value2 = response.data.Remark
              this.modal1 = true
            } else {
              this.$Message.error(response.error_message)
            }
          })
        },
        resetSearch () {
          let that = this
          that.$refs.searchForm.resetFields()
          that.getList()
        },
        setPage () {
          let that = this
          let teblePage = that.tablePage
          teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1
          let endPage = teblePage.page * teblePage.pageNum
          teblePage.endNum = endPage > teblePage.allNum ? teblePage.allNum : endPage
        },
        prevPage () {
          let that = this
          if (that.tablePage.page <= 1) {
            that.$Message.error('已经是第一页')
            return false
          }
          that.tablePage.page--
          that.getList()
        },
        nextPage () {
          let that = this
          if (that.tablePage.page >= that.tablePage.maxPageNum) {
            that.$Message.error('已经是最后一页')
            return false
          }
          that.tablePage.page++
          that.getList()
        },
        changePage () {
          let that = this
          that.getList()
        },
        exportTable () {
          let that = this
          that.$refs.mainTable.exportCsv({
            filename: `${new Date().getTime()}${document.title}`
          })
        }
      }
    }
</script>
<style>
    .consumptionIntention-container{
        padding: 10px;
        padding-bottom: 18px;
    }
    .consumptionIntention-container .bottom-box{
        position: relative;
        bottom: 0;
        margin-top: 18px;
    }
</style>