<template>
    <div class="zwgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 仪器名称 -->
                     <i-col span="3">
                        <FormItem prop="Name">
                            <Input v-model="formItem.Name" placeholder="了解途径名称"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="3">
                        <FormItem prop="Valid">
                            <Select v-model="formItem.Valid" placeholder="是否有效">
                                <Option :value="-1">全部</Option>
                                <Option :value="1">有效</Option>
                                <Option :value="0">无效</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="searchList">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
                            <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" highlight-row :data="list" :height="setTableHeight" ref="mainTable" @on-current-change="getRowID"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <!-- 新增弹窗 -->
        <Modal :mask-closable="false"  v-model="modal1" class="dialog" class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form" >
                <row type="flex" justify="space-between">
                    <i-col span="24">
                        <FormItem prop="Name" label="了解途径名称：" :rules="formValidateRule.Name">
                            <Input v-model="formValidate.Name" placeholder="请输入"></Input>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="24">
                        <FormItem prop="Valid" label="是否有效：" >
                        <!-- <FormItem prop="Valid" label="是否有效：" :rules="formValidateRule.Valid"> -->
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
    
    import { mapState } from 'vuex'
    import manager from '@/api/manager.js'
    export default{
        data () {
            return {
                
                tableHeight: 200,
                modalTitle: '新增',
                rowID: null,
                modal1: false,
                loading: false,
                tableLoading: false,
                // 添加弹窗用
                formValidate: {
                    Name: '',
                    Valid: 1
                },
                formValidateRule: {
                    Name: {required: true, message: '仪器名称不得为空', trigger: 'blur'},
                    Valid: {required: true, message: '是否有效不得为空', trigger: 'blur', type: 'number'}
                },
                formItem: {
                    Name: '',
                    Valid: ''
                },
                columns1: [
                   {
                        title: '了解途径名称',
                        key: 'Name',
                        align: 'center'
                    }, {
                        title: '是否有效',
                        key: 'Valid',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.Valid ? '是' : '否'
                            // if (params.row.Valid) {
                            //     return '是'
                            // } else {
                            //     return '否'
                            // }
                            return h('div', {}, text)
                        }
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
                authorList: state => state.app.authorList
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
                } else {
                    return false
                }
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
                } else {
                    return false
                }
            }
        },
        methods: {
            showAddPoup () {
                let that = this
                that.resetForm()
                that.modal1 = true
                that.modalTitle = '新建'
            },
            searchList () {
                let that = this
                that.getList()
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
            modefyMessage (data) {
                let that = this
                that.loading = true
                manager.modefySingleUnder(that.formValidate.ID, data).then((response) => {
                    that.loading = false
                    if (response.error_code === 'Success') {
                        that.$Message.success('修改成功')
                        that.getList()
                        that.resetForm()
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            getRowID (row) {
                let that = this
                that.rowID = row.ID
            },
            getDetail () {
                // 获取用户信息
                let that = this
                if (!that.rowID) {
                    that.$Message.error('请选择一条记录')
                    return false
                }
                that.$store.commit('changeLoadingPage')
                manager.getSingleUnder(that.rowID).then((response) => {
                    if (response.error_code === 'Success') {
                        that.formValidate = response.data
                        that.$set(that.formValidate, 'Valid', response.data.Valid ? 1 : 0)
                        setTimeout(() => {
                            that.$store.commit('changeLoadingPage')
                            that.modalTitle = '修改'
                            that.modal1 = true
                        }, 800)
                    } else {
                        that.$store.commit('changeLoadingPage')
                        that.$Message.error(response.error_message)
                    }
                })
            },
            resetForm () {
                let that = this
                that.formValidate.ID = ''
                that.$refs.formValidate1.resetFields()
                that.loading = false
                that.modal1 = false
            },
            addForm () {
                let that = this
                that.$refs.formValidate1.validate((validate) => {
                    if (validate) {
                        let data = {
                            Name: that.formValidate.Name,
                            Valid: that.formValidate.Valid === 1 ? true : false
                        }
                        if (that.modalTitle === '修改') {
                            that.modefyMessage(data)
                            return false
                        }
                        that.loading = true
                        manager.addUnderstandWays(data).then((response) => {
                            that.loading = false
                            if (response.error_code === 'Success') {
                                that.$Message.success('添加成功')
                                that.getList()
                                that.resetForm()
                            } else {
                                that.$Message.error(response.error_message)
                            }
                        })
                    } else {
                        that.$Message.error('有必填项为空')
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
            getList () {
                let that = this
                let data = {
                    Name: that.formItem.Name,
                    Valid: ''
                }
                if (that.formItem.Valid === 1) {
                    data.Valid = true
                } else if (that.formItem.Valid === 0) {
                    data.Valid = false
                }
                that.tableLoading = true
                manager.getUnderstandWaysList(data).then((response) => {
                    that.tableLoading = false
                    if (response.error_code === 'Success') {
                        let res = response.data
                        that.list = res.list
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
