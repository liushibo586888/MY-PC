<template>
    <div class="glgly-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                     <!-- <i-col span="3">
                        <FormItem prop="yqmc">
                            <Input v-model="formItem.yqmc" placeholder="姓名"></Input>
                        </FormItem>
                    </i-col> -->
                    <i-col span="24">
                        <formItem class="btn-box">
                            <!-- <Button type="primary" class="btn">搜索</Button> -->
                            <!-- <Button type="warning" class="btn" @click="resetSearch">重置</Button> -->
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
                            <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" highlight-row :height="setTableHeight" ref="mainTable" @on-current-change="getRowID"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
            <!-- <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
            <i-button type="ghost" class="btn">上一页</i-button>
            <i-button type="primary" class="btn">下一页</i-button>
            <div class="page-box">
                <p>前往</p>
                 <Input-number :max="tablePage.maxPageNum" :min="1" :value="1"></Input-number>
                <p>页</p>
            </div> -->
        </div>
        <!-- 新增弹窗 -->
        <Modal :mask-closable="false"  v-model="modal1" class="dialog"  v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form" >
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Name" label="姓名：" :label-width="120" :rules="formValidateRule.Name">
                            <Input v-model="formValidate.Name" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Account" label="登录账号：" :label-width="120" :rules="formValidateRule.Account">
                            <Input v-model="formValidate.Account" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Password" label="登录密码：" :label-width="120" v-if="modalTitle == '修改'">
                            <Input v-model="formValidate.Password" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem prop="Password" label="登录密码：" :label-width="120" :rules="formValidateRule.Password" v-else>
                            <Input v-model="formValidate.Password" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="24">
                        <FormItem prop="Sex" label="性别：" :label-width="120" :rules="formValidateRule.Sex">
                            <Select v-model="formValidate.Sex" placeholder="请输入">
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="24">
                        <FormItem prop="Valid" label="是否有效：" :label-width="120" :rules="formValidateRule.Valid">
                            <Select v-model="formValidate.Valid" placeholder="请输入">
                                <Option :value="1">是</Option>
                                <Option :value="0">否</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
            </Form>
            <div slot="footer" class="footer">
                <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
                <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
            </div>
        </Modal>
        <!-- ** -->
    </div>
</template>
<script>
    import superManager from '@/api/super.js'
    import { mapState } from 'vuex'
    export default{
        data () {
            return {
                rowID: null,
                tableLoading: false,
                loading: false,
                tablePage: {
                    page: 1,
                    pageNum: 10,
                    maxPageNum: 100,
                    allNum: 199,
                    startNum: 0,
                    endNum: 0
                },
                tableHeight: 200,
                modalTitle: '修改',
                phone: '',
                modal1: false,
                // 添加弹窗用
                formValidate: {
                    Account: '',
                    Password: '',
                    Name: '',
                    Sex: '',
                    Valid: ''
                },
                formValidateRule: {
                    Account: {required: true, message: '账号不得为空', trigger: 'blur'},
                    Password: {required: true, message: '密码不得为空', trigger: 'blur'},
                    Name: {required: true, message: '姓名不得为空', trigger: 'blur'},
                    Sex: {required: true, message: '性别不得为空', trigger: 'blur'},
                    Valid: {required: true, message: '是否有效不得为空', trigger: 'blur', type: 'number'}
                },
                formItem: {
                    mc: ''
                },
                columns1: [
                    {
                        title: '管理员姓名',
                        key: 'Name',
                        align: 'center'
                    }, {
                        title: '管理员账号',
                        key: 'Account',
                        align: 'center'
                    }
                ],
                list: [],
                lyqdList: [],
                xzqxList: [],
                sjdqfwList: []
            }
        },
        computed: {
            ...mapState({
                userMes: state => state.app.userMes,
                authorList: state => state.app.authorList,
                tableRows: state => state.app.tableRows
            }),
            setTableHeight () {
                let that = this
                return that.tableHeight
            },
            setAuthorAdd () {
                let that = this
                let pageName = that.$route.name
                let list = that.authorList[pageName]
                if (list) {
                    for (let i of list) {
                        if (i.Name === '增加') {
                            return i.IsVisible
                            break
                        }
                    }
                }
                return false
            },
            setAuthorEdit () {
                let that = this
                let pageName = that.$route.name
                let list = that.authorList[pageName]
                if (list) {
                    for (let i of list) {
                        if (i.Name === '修改') {
                            return i.IsVisible
                            break
                        }
                    }
                }
                return false
            }
        },
        methods: {
            showAddPoup () {
                let that = this
                that.resetForm()
                that.modal1 = true
                that.modalTitle = '新建'
            },
            resetSearch () {
                let that = this
                that.$refs.searchForm.resetFields()
            },
            getRowID (row) {
                let that = this
                that.rowID = row.ID
            },
            getDetail () {
                let that = this
                if (!that.rowID) {
                    that.$Message.error('请选择一条记录')
                    return false
                }
                that.$store.commit('changeLoadingPage')
                superManager.getAdminsDetail(that.rowID).then((response) => {
                    that.$store.commit('changeLoadingPage')
                    if (response.error_code == 'Success') {
                        that.formValidate = {
                            ID: response.data.ID,
                            Account: response.data.Account,
                            Name: response.data.Name,
                            Sex: response.data.Sex,
                            Valid: response.data.Valid ? 1 : 0,
                        }
                        that.modal1 = true
                        that.modalTitle = '修改'
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            modefyMessage (data) {
                let that = this
                superManager.modefyAdmin(data).then((response) => {
                    if (response.error_code === 'Success') {
                        that.loading = false
                        that.$Message.success('修改成功')
                        that.resetForm()
                        that.getList()
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            resetForm () {
                let that = this
                that.formValidate.ID = ''
                that.$refs.formValidate1.resetFields()
                that.modal1 = false
            },
            addForm () {
                let that = this
                that.$refs.formValidate1.validate((validate) => {
                    if (validate) {
                        that.loading = true
                        let data = {
                            Account: that.formValidate.Account,
                            Name: that.formValidate.Name,
                            Password: that.formValidate.Password,
                            Sex: that.formValidate.Sex,
                            Valid: that.formValidate.Valid > 0 ? true : false
                        }
                        if (that.formValidate.ID) {
                            that.modefyMessage(data)
                            return false
                        }
                        superManager.addAdmins(data).then((response) => {
                            that.loading = false
                            if (response.error_code == 'Success') {
                                that.$Message.success('添加成功')
                                that.getList()
                                that.resetForm()
                            } else {
                                that.$Message.error(response.error_message)
                            }
                        })
                    } else {
                        this.$Message.error('有必填项为空');
                    }
                })
            },
            initTableHeight () {
                let that = this
                that.tableHeight = document.getElementById('tableBox').offsetHeight
                window.onresize = function() {
                    that.tableHeight = document.getElementById('tableBox').offsetHeight
                }
            },
            setPage () {
                let that = this
                let teblePage = that.tablePage
                teblePage.startNum = teblePage.pageNum * (teblePage.page - 1) + 1
                let endPage = teblePage.page * teblePage.pageNum
                teblePage.endNum = endPage > teblePage.allNum ? teblePage.allNum : endPage
            },
            getList () {
                let that = this
                that.tableLoading = true
                superManager.getAdminsList().then((response) => {
                    that.tableLoading = false
                    if (response.error_code == 'Success') {
                        that.list = response.data.list 
                        // that.setPage()
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
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
                that.initTableHeight()
                that.getList()
            })
        }
    }
</script>
<style>
</style>
