<template>
    <div class="pbb-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 了解途径名称 -->
                     <i-col span="3">
                        <FormItem prop="ljtjmc">
                            <Input v-model="formItem.ljtjmc" placeholder="了解途径名称"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem prop="sfyx">
                            <Select v-model="formItem.sfyx" placeholder="是否有效">
                                <Option value="all">全部</Option>
                                <Option value="yes">是</Option>
                                <Option value="no">否</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="modal1 = true, modalTitle = '新建'">添加</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" :height="setTableHeight" @on-row-dblclick="modal1 = true" ref="mainTable"></Table>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
            <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
            <i-button type="ghost" class="btn">上一页</i-button>
            <i-button type="primary" class="btn">下一页</i-button>
            <div class="page-box">
                <p>前往</p>
                 <Input-number :max="tablePage.maxPageNum" :min="1" :value="1"></Input-number>
                <p>页</p>
            </div>
        </div>
        <!-- 新增弹窗 -->
        <Modal :mask-closable="false"  v-model="modal1" class="dialog">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form" >
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="ljtjmc" label="了解途径名称：" :label-width="120" :rules="formValidateRule.ljtjmc">
                            <Input v-model="formValidate.ljtjmc" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="24">
                        <FormItem prop="sfyx" label="是否有效：" :label-width="120" :rules="formValidateRule.sfyx">
                            <Select v-model="formValidate.sfyx" placeholder="请输入">
                                <Option value="yes">是</Option>
                                <Option value="no">否</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </row>
            </Form>
            <div slot="footer" class="footer">
                <Button type="primary" class="btn" @click="addForm">保存</Button>
                <Button type="warning" class="btn" @click="resetForm">取消</Button>
            </div>
        </Modal>
        <!-- ** -->
    </div>
</template>
<script>
    export default{
        data () {
            return {
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
                    ljtjmc: '',
                    sfyx: ''
                },
                formValidateRule: {
                    ljtjmc: {required: true, message: '了解途径名称不得为空', trigger: 'blur'},
                    sfyx: {required: true, message: '是否有效不得为空', trigger: 'blur'}
                },
                formItem: {
                    ljtjmc: '',
                    sfyx: ''
                },
                columns1: [
                    {
                        title: '序号',
                        key: 'order',
                        align: 'center',
                        width: 80,
                        type: 'index'
                    }, {
                        title: '所属门店',
                        key: 'ssmd',
                        align: 'center'
                    }, {
                        title: '员工姓名',
                        key: 'ygxm',
                        align: 'center'
                    }, {
                        title: '经手人',
                        key: 'jsr',
                        align: 'center'
                    }, {
                        title: '登记日期',
                        key: 'djrq',
                        align: 'center'
                    }
                ],
                list: [{
                    flmc: '姓名',
                    sfdj: '1',
                    djfl: '分类1',
                    sfyx: '1'
                }],
                lyqdList: [{
                    value: '1',
                    name: '门店1'
                }, {
                    value: '2',
                    name: '门店2'
                }, {
                    value: '3',
                    name: '门店3'
                }, {
                    value: '4',
                    name: '门店4'
                }],
                xzqxList: [{
                    value: '1',
                    name: '权限1'
                }, {
                    value: '2',
                    name: '权限2'
                }, {
                    value: '3',
                    name: '权限3'
                }, {
                    value: '4  ',
                    name: '权限4  '
                }],
                sjdqfwList: [{
                    value: '1',
                    name: '按层级'
                }, {
                    value: '2',
                    name: '全数据'
                }]
            }
        },
        computed: {
            setTableHeight () {
                let that = this
                return that.tableHeight
            }
        },
        methods: {
            resetSearch () {
                let that = this
                that.$refs.searchForm.resetFields()
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
            modefyMessage (row) {
                let that = this
                /*
                * 修改用户信息 todo
                */
               that.modal1 = true
               that.modalTitle = '修改'
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
                        that.$Message.success('添加成功');
                        that.$refs.formValidate1.resetFields()
                        that.modal1 = false
                    } else {
                        this.$Message.error('姓名不得为空');
                    }
                })
            },
            changePrice(e) {
                // let that = this
                // if (e == 'yes') {
                //     // 销售类物资单价必填
                //     console.log(that.formValidateRule.price)
                //     that.$set(that.formValidateRule.price, 'required', false)
                // }
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
                that.setPage()
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
