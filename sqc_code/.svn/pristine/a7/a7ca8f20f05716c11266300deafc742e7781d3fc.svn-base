<!-- 客户账户信息 -->
<template>
    <div class="account-container">
       <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
       <div class="header">
            <p class="title">持有的优惠卡</p>
            <div class="content">
                <div class="content-box">
                    <div class="money-title">积分余额</div>
                    <div class="money-box">￥{{IntegrationBalance}}</div>
                </div>
                <div class="content-box">
                    <div class="money-title">预交金余额</div>
                    <div class="money-box">￥{{CashBalance}}</div>
                </div>
                <div class="content-box">
                    <div class="money-title">欠款余额</div>
                    <div class="money-box">￥{{ArrearsBalance}}</div>
                </div>
                <div class="content-box">
                    <div class="money-title">赠送余额</div>
                    <div class="money-box">￥{{HandselBalance}}</div>
                </div>
            </div>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" ref="mainTable"></Table>
        </div>
        <!-- 优惠卡暂时不启用 -->
        <div class="bottom-box" v-if="false">
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
                ID: 0,
                IntegrationBalance: 0,
                CashBalance: 0,
                ArrearsBalance: 0,
                HandselBalance: 0,
                formItem: {
                    startDate: '',
                    endDate: '',
                    uerTel: '',
                    userName: '',
                    zxxm: '',
                    zfxm: ''
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
                        title: '序号',
                        align: 'center',
                        width: 80,
                        type: 'index'
                    }, 
                    {
                        title: '办卡日期',
                        key: 'Date',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.Date) {
                                return '无'
                            }
                            return moment(params.row.Date).format('YYYY-MM-DD')
                        }
                    }, {
                        title: '有效日期',
                        key: 'Date',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.Date) {
                                return '无'
                            }
                            return moment(params.row.Date).format('YYYY-MM-DD')
                        }
                    }, {
                        title: '卡名称',
                        key: 'CardName',
                        align: 'center'
                    }, {
                        title: '卡类型',
                        key: 'CardType',
                        align: 'center'
                    }, {
                        title: '真实金额',
                        key: 'truthMoney',
                        align: 'center'
                    }, {
                        title: '赠送金额',
                        key: 'HandselBalance',
                        align: 'center'
                    }, {
                        title: '金额',
                        key: 'Balance',
                        align: 'center'
                    }
                ],
                list: []
            }
        },
        computed: {
            ...mapState({
                userMes: state => state.app.userMes,
                tableRows: state => state.app.tableRows
            })
        },
        methods: {
            getMoney () {
                // 获取余额
                let that = this
                let data = {
                    CustomerID: that.ID
                }
                that.tableLoading = true
                api.getCustomerAccountInfo(data).then((response) => {
                    that.tableLoading = false
                    if (response.error_code === 'Success') {
                        that.IntegrationBalance = response.data.IntegrationBalance
                        that.CashBalance = response.data.CashBalance
                        that.HandselBalance = response.data.HandselBalance
                        that.ArrearsBalance = response.data.ArrearsBalance
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
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
            getList () {
                // api.onlineOrdersGetList(data).then((response) => {
                //     if (response.error_code === 'Success') {
                //         let res = response.data
                //         that.list = res.list
                //         that.tableLoading = false
                //         that.page = res.page
                //         that.tablePage.pageNum = res.size
                //         that.tablePage.allNum = res.total
                //         that.tablePage.maxPageNum = res.totalPage
                that.setPage()
                //     } else {
                //         that.$Message.error(response.error_message)
                //     }
                // })
            },
            exportTable () {
                let that = this
                that.$refs.mainTable.exportCsv({
                    filename: `${new Date().getTime()}${document.title}`
                })
            }
        },
        mounted () {
            let that = this
            that.$nextTick(() => {
                that.ID = that.CustomerID
                if (that.ID) {
                    that.getMoney()
                }
            })
        }
    }
</script>
<style>
    .account-container{
        padding: 10px;
        padding-bottom: 18px;
    }
    .account-container .header{
        position: relative;
        width: 100%;
        left: 0;
        top: 0;
        height: 62px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 22px;
        background: #fff;
    }
    .account-container .header:before{
        content: "";
        position: absolute;
        width: 2px;
        height: 15px;
        background: #79aa49;
        left: 10px;
        top: 23.5px;
    }
    .account-container .header:after{
        content:"";
        position: absolute;
        top: 100%;
        left: 0px;
        width: 100%;
        height: 2px;
        background: #79aa49;
    }
    .account-container .header>p{
        font-size: 16px;
        color: #666;
    }
    .account-container .header>.content{
        color: #79aa49;
        display: flex;
        justify-content: space-between;
    }
    .account-container .header .content-box{
        display: flex;
        margin-right: 20px;
    }
    .account-container .header .content-box:first-child{
        margin-right: 36px;
    }
    .account-container .header .money-title{
        font-size: 16px;
        color: #666;
        line-height: 34px;
        margin-right: 15px;
    }
    .account-container .header .money-box{
        height: 34px;
        line-height: 34px;
        padding: 0 20px;
        border: 1px solid #79aa49;
        border-radius: 2px;
        font-size: 16px;
    }
    .account-container .bottom-box{
        position: relative;
        bottom: 0;
        margin-top: 18px;
    }
</style>