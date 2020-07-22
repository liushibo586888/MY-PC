<!-- 客户标签 -->
<template>
    <div class="customerDetailTag-container">
       <div class="search-box" style="position:relative; top:0; margin-bottom:16px; padding-left: 0;">
            <Form :model="formItem" inline @submit.native.prevent class="search-form" ref="searchForm" :label-width="100">
                <row :gutter="20">
                    <i-col span="6">
                        <formItem prop="TagName" label="客户标签" v-if="allowAdd">
                            <Select v-model="formItem.TagName" :filterable="true" :clearable="true">
                                <Option v-for="item in shiftsList" :value="item.ID" :key="item.ID">{{ item.Name }}</Option>
                            </Select>
                        </formItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn btn-search" @click="newAdd" :loading="loading" v-if="allowAdd">新增</Button>
                            <!-- <Button type="warning" class="btn btn-reset" @click="resetSearch">重置</Button> -->
                            <Button type="warning" class="btn btn-reset" @click="removeItem" :loading="loading" v-if="allowDelete" :disabled="!rowID">移除</Button>
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
    import { mapState } from 'vuex'
    import moment from "moment"
    export default{
        props: {
          CustomerID: {
            type: String,
            default: '123456'
          }
        },
        data () {
          return {
            tableLoading: false,
            allowAdd: false,
            allowDelete: false,
            ID: '',
            loading: false,
            rowID: null,
            formItem: {
              TagName: ''
            },
            formItemRule: {
              TagName: {required: true, message: '客户标签不得为空', trigger: 'blur', type: 'number'},
            },
            columns1: [
              {
                title: '创建人',
                key: 'CreateByName',
                align: 'center'
              },
              {
                title: '创建日期',
                key: 'CreateDate',
                align: 'center',
                render: (h, params) => {
                  if (!params.row.CreateDate) {
                    return ''
                  }
                  return h('div', {}, moment(params.row.CreateDate).format('YYYY-MM-DD'))
                }
              },
              {
                title: '标签名称',
                key: 'TagName',
                align: 'center'
              }
            ],
            list: [],
            shiftsList: []
          }
        },
        computed: {
          ...mapState({
            userMes: state => state.app.userMes,
            authorList: state => state.app.authorList,
            tableRows: state => state.app.tableRows
          })
        },
        mounted () {
          let that = this
          that.$nextTick(() => {
            that.ID = that.CustomerID
            that.setAllAuthor()
            that.getProject()
            that.getList()
          })
        },
        methods: {
          setAllAuthor () {
            let that = this
            let pageName = that.$route.name
            let list = that.authorList[pageName]
            if (list) {
              for (let i of list) {
                // 添加客户标签
                if (i.Api === 'api/customerDetails/addCustomerTag') {
                  that.allowAdd = i.IsVisible
                }
                // 删除客户标签
                if (i.Api === 'api/customerDetails/deleteCustomerTag/{id}') {
                  that.allowDelete = i.IsVisible
                }
              }
            }
          },
          getProject () {
            // 获取意向消费项目下拉框
            api.getCustomerTagDropdownList().then((response) => {
              if (response.error_code === 'Success') {
                this.shiftsList = response.data.list
              } else {
                this.$Message.error(response.error_message)
              }
            })
          },
          getList () {
            let that = this
            let data = {
              customerID: this.$route.query.ID
            }
            that.tableLoading = true
            api.getCustomerTagListByCustomerID(data).then((response) => {
              if (response.error_code === 'Success') {
                let res = response.data
                that.list = res.list
                that.tableLoading = false
              } else {
                that.$Message.error(response.error_message)
              }
            })
          },
          newAdd () {
            // 新增客户标签
            let that = this
            if (!that.formItem.TagName) {
              that.$Message.error('请先选择客户标签！')
              return false
            }
            let data = {
              CustomerID: that.ID,
              EmployeeID: that.userMes.EmployeeID,
              TagID: that.formItem.TagName
            }
            api.addCustomerTag(data).then((response) => {
              if (response.error_code === 'Success') {
                that.$refs.searchForm.resetFields()
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
          removeItem () {
            // 移除客户标签
            let that = this
            if (!that.rowID) {
              that.$Message.error('请先选择一条客户标签！')
              return false
            }
            let data = {
              EmployeeID: that.userMes.EmployeeID,
              id: that.rowID
            }
            that.loading = true
            api.deleteCustomerTag(that.rowID, data).then((response) => {
              that.loading = false
              if (response.error_code === 'Success') {
                that.$refs.searchForm.resetFields()
                this.getList()
                this.$Message.success('删除成功')
              } else {
                this.$Message.error(response.error_message)
              }
            })
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
    .customerDetailTag-container{
        padding: 10px;
        padding-bottom: 18px;
    }
    .customerDetailTag-container .bottom-box{
        position: relative;
        bottom: 0;
        margin-top: 18px;
    }
</style>