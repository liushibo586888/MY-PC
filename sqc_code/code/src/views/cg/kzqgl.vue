<template>
    <div class="kzqgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 仪器名称 -->
                     <i-col span="3">
                        <FormItem prop="name">
                            <Input v-model="formItem.name" placeholder="名称"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="21">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="getList">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
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
        <Modal :mask-closable="false"  v-model="modal1" class="dialog" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form" >
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ControllerCategoryID" label="控制器分类编号：">
                            <Select v-model="formValidate.ControllerCategoryID" placeholder="请输入">
                                <Option :value="item.ID" v-for="(item, index) in dropDownList" :key="index">{{item.Name}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="OrderNumber" label="排序序号：" :rules="formValidateRule.OrderNumber">
                            <Input v-model="formValidate.OrderNumber" placeholder="请输入" number></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Controller" label="控制器：" :rules="formValidateRule.Controller">
                            <Input v-model="formValidate.Controller" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ControllerName" label="控制器名称：" :rules="formValidateRule.ControllerName">
                            <Input v-model="formValidate.ControllerName" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="WebPageUrl" label="网页链接：" :rules="formValidateRule.WebPageUrl">
                            <Input v-model="formValidate.WebPageUrl" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ComponentName" label="组件名称：" :rules="formValidateRule.ComponentName">
                            <Input v-model="formValidate.ComponentName" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ComponentUrl" label="组件路径：" :rules="formValidateRule.ComponentUrl">
                            <Input v-model="formValidate.ComponentUrl" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ControllerDescription" label="控制器描述：" :rules="formValidateRule.ControllerDescription">
                            <Input v-model="formValidate.ControllerDescription" placeholder="请输入" type="textarea" :row="4"></Input>
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
                    ControllerCategoryID: '',
                    OrderNumber: '',
                    Controller: '',
                    ControllerName: '',
                    WebPageUrl: '',
                    ComponentName: '',
                    ComponentUrl: '',
                    ControllerDescription: ''
                },
                formValidateRule: {
                    ControllerCategoryID: {required: true, message: '控制器分类编号不得为空', trigger: 'blur'},
                    OrderNumber: {required: true, message: '排序序号名称不得为空', trigger: 'blur', type: 'number'},
                    WebPageUrl: {required: true, message: '网页链接不得为空', trigger: 'blur'},
                    Controller: {required: true, message: '控制器不得为空', trigger: 'blur'},
                    ControllerName: {required: true, message: '控制器名称不得为空', trigger: 'blur'},
                    ComponentName: {required: true, message: '组件名称不得为空', trigger: 'blur'},
                    ComponentUrl: {required: true, message: '组件路径不得为空', trigger: 'blur'}
                },
                formItem: {
                    name: ''
                },
                columns1: [
                    {
                        title: '控制器',
                        key: 'Controller',
                        align: 'center'
                    }, {
                        title: '二级菜单名称',
                        key: 'ControllerName',
                        align: 'center'
                    }, {
                        title: '网页链接',
                        key: 'WebPageUrl',
                        align: 'center'
                    }, {
                        title: '所属顶级菜单',
                        key: 'CategoryName',
                        align: 'center'
                    }, {
                        title: '控制器描述',
                        key: 'ControllerDescription',
                        align: 'center',
                        render: (h, parmas) => {
                            if (!parmas.row.ControllerDescription) {
                                return ''
                            }
                            let text = parmas.row.ControllerDescription.length > 8 ? parmas.row.ControllerDescription.substr(0, 7) + '...' : parmas.row.ControllerDescription
                            return h('div', {
                                on: {
                                    click: () => {
                                        this.showRemark(parmas.row.ControllerDescription)
                                    }
                                }
                            }, text)
                        }
                    }
                ],
                list: [],
                dropDownList: []
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
                that.getList()
            },
            searchCustomerTel () {
                let that = this
                that.$refs.searchTelForm.validate((validate) => {
                    if (validate) {
                        // 搜索...
                        that.$refs.searchTelForm.resetFields()
                        that.poupSearchTel = false
                        that.modal1 = true
                        that.modalTitle = '新增'
                    } else {
                        that.$Message.error('请输入用户的联系电话')
                    }
                })
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
                superManager.getControllersDetail(that.rowID).then((response) => {
                    that.$store.commit('changeLoadingPage')
                    if (response.error_code == 'Success') {
                        that.formValidate = {
                            ID: response.data.ID,
                            ControllerCategoryID: response.data.ControllerCategoryID,
                            OrderNumber: response.data.OrderNumber,
                            Controller: response.data.Controller,
                            ControllerName: response.data.ControllerName,
                            WebPageUrl: response.data.WebPageUrl,
                            ComponentName: response.data.ComponentName,
                            ComponentUrl: response.data.ComponentUrl,
                            ControllerDescription: response.data.ControllerDescription
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
                let d = {
                    ControllerCategoryID: data.ControllerCategoryID,
                    OrderNumber: data.OrderNumber,
                    Controller: data.Controller,
                    ControllerName: data.ControllerName,
                    WebPageUrl: data.WebPageUrl,
                    ComponentName: data.ComponentName,
                    ComponentUrl: data.ComponentUrl,
                    ControllerDescription: data.ControllerDescription
                }
                superManager.modefyControllers(data.ID, d).then((response) => {
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
                that.$refs.formValidate1.resetFields()
                that.modal1 = false
            },
            addForm () {
                let that = this
                that.$refs.formValidate1.validate((validate) => {
                    if (validate) {
                        that.loading = true
                        if (that.formValidate.ID) {
                            that.modefyMessage(that.formValidate)
                            return false
                        }
                        superManager.addControllers(that.formValidate).then((response) => {
                            that.loading = false
                            if (response.error_code === 'Success') {
                                that.$Message.success('添加成功')
                                that.modal1 = false
                                that.getList()
                            } else {
                                this.$Message.error(response.error_message)
                            }
                        })
                    } else {
                        this.$Message.error('有必填项为空')
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
                superManager.getControllersList(that.formItem).then((response) => {
                    that.tableLoading = false
                    if (response.error_code == 'Success') {
                        that.list = response.data.list 
                        // that.setPage()
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            getDropdownList () {
                // 获取控制器分类列表
                let that = this
                superManager.getDropdownListData().then((response) => {
                    if (response.error_code === 'Success') {
                        that.dropDownList = response.data.list
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
            },
            showRemark (text) {
                // 显示备注
                let that = this
                that.$Modal.info({
                    title: '详情',
                    content: text
                })
            }
        },
        mounted () {
            let that = this
            that.$nextTick(() => {
                that.initTableHeight()
                that.getList()
                that.getDropdownList()
            })
        }
    }
</script>
<style>
</style>
