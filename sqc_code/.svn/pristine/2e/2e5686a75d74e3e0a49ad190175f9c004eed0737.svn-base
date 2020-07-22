<template>
    <div class="khgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 分类名称 -->
                     <i-col span="3">
                        <FormItem prop="Name">
                            <Input v-model="formItem.Name" placeholder="项目名称"></Input>
                            <!-- <Select v-model="formItem.flmc" placeholder="分类名称">
                                <Option :value="item.key" v-for="(item, index) in formItem.xmflList" :key="index">{{item.name}}</Option>
                            </Select> -->
                        </FormItem>
                    </i-col>
                    <!-- 是否有效 -->
                    <i-col span="3">
                        <FormItem prop="Valid">
                            <Select v-model="formItem.Valid" placeholder="是否有效">
                                <Option value="-1">全部</Option>
                                <Option :value="1">有效</Option>
                                <Option :value="0">无效</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <!-- 分类级别 -->
                    <!-- <i-col span="3">
                        <formItem prop="fljb">
                            <Select v-model="formItem.fljb"  placeholder="分类级别">
                                <Option value="top">顶级</Option>
                                <Option value="twice">二级</Option>
                            </Select>
                        </formItem>
                    </i-col> -->
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="searchList" :loading="loading">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup" v-if="setAuthorAdd">添加</i-button>
                            <i-button type="primary" class="btn btn-purple" @click="getDetail" v-if="setAuthorEdit" :disabled="!rowID">修改</i-button>
                        </formItem>
                    </i-col>
                </row>
            </Form>
        </div>
        <div class="table-box" id="tableBox">
            <Table :columns="columns1" :data="list" :height="setTableHeight" highlight-row ref="mainTable" @on-current-change="getRowID"></Table>
            <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
        </div>
        <div class="bottom-box">
            <i-button class="btn-export" @click="exportTable" type="default">导出</i-button>
        </div>
        <!-- 新增弹窗 -->
        <Modal :mask-closable="false"  v-model="modal1" class="dialog"  class-name="vertical-center-modal" v-if="setAuthorAdd || setAuthorEdit">
            <div slot='header' class="header">
                {{modalTitle}}
            </div>
            <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form" >
                <FormItem label="分类级别：" prop="fljb" :rules="formValidateRule.fljb" v-if="modalTitle == '修改'">
                    <Select v-model="formValidate.fljb" disabled>
                        <Option value="top">顶级</Option>
                        <Option value="twice">二级</Option>
                    </Select>
                </FormItem>
                <FormItem label="分类级别：" prop="fljb" :rules="formValidateRule.fljb" v-else>
                    <Select v-model="formValidate.fljb" @on-change="checkType">
                        <Option value="top">顶级</Option>
                        <Option value="twice">二级</Option>
                    </Select>
                </FormItem>
                <FormItem prop="Name" label="分类名称：" :rules="formValidateRule.Name">
                    <Input v-model="formValidate.Name" placeholder="分类名称"></Input>
                </FormItem>
                <FormItem label="顶级分类：" prop="ParentID" v-if="type" :rules="formValidateRule.ParentID">
                    <Select v-model="formValidate.ParentID" :filterable="true" :disabled="modalTitle == '修改'">
                        <Option :value="item.ID" v-for="(item, index) in djflList" :key="index">{{item.Name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否有效：" prop="Valid" :rules="formValidateRule.Valid">
                    <Select v-model="formValidate.Valid">
                        <Option :value="1">是</Option>
                        <Option :value="0">否</Option>
                    </Select>
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
    import manager from '@/api/manager.js'
    import { mapState } from 'vuex'
    export default{
        data () {
            return {
                type: false,
                loading: false,
                tableLoading: false,
                tableHeight: 200,
                rowID: null,
                modalTitle: '修改',
                phone: '',
                modal1: false,
                formValidate: {
                    Name: '',
                    fljb: '',
                    ParentID: '',
                    Valid: ''
                },
                formValidateRule: {
                    Name: {required: true, message: '分类名称不得为空', trigger: 'blur'},
                    fljb: {required: true, message: '分类级别不得为空', trigger: 'blur'},
                    sfyx: {required: true, message: '是否有效不得为空', trigger: 'blur'},
                    ParentID: {required: true, message: '顶级分类不得为空', trigger: 'blur'}
                },
                formItem: {
                    Valid: '',
                    Name: ''
                },
                djflList: [],
                columns1: [
                    {
                        title: '分类名称',
                        key: 'Name',
                        align: 'center'
                    }, {
                        title: '是否顶级',
                        key: 'IsTopCategory',
                        align: 'center',
                        render: (h, parmas) => {
                            let text = parmas.row.IsTopCategory ? '是' : '否'
                            return h('div', {
                            }, text)
                        }
                    }, {
                        title: '顶级分类',
                        key: 'TopCategoryName',
                        align: 'center'
                    }, {
                        title: '是否有效',
                        key: 'Valid',
                        align: 'center',
                        render: (h, parmas) => {
                            let text = parmas.row.Valid ? '是' : '否'
                            return h('div', {
                            }, text)
                        }
                    }
                ],
                list: []
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
                manager.modefySingleItemCategories(that.formValidate.ID, data).then((response) => {
                    that.loading = false
                    if (response.error_code === 'Success') {
                        that.$Message.success('修改成功')
                        that.getList()
                        that.getAllTopCategories()
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
                manager.getSingleItemCategories(that.rowID).then((response) => {
                    if (response.error_code === 'Success') {
                        that.formValidate = response.data
                        that.formValidate.fljb = response.data.ParentID !== "0" ? 'twice' : 'top'
                        if (that.formValidate.fljb === 'twice') {
                            that.type = true
                        }
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
                that.$refs.formValidate1.resetFields()
                that.type = false
                that.modal1 = false
            },
            addForm () {
                let that = this
                that.$refs.formValidate1.validate((validate) => {
                    if (validate) {
                        let data = {
                            Name: that.formValidate.Name,
                            Valid: that.formValidate.Valid === 1 ? true : false,
                            ParentID: ''
                        }
                        if (that.formValidate.fljb != 'top') {
                            data.ParentID = that.formValidate.ParentID
                        }
                        if (that.modalTitle === '修改') {
                            that.modefyMessage(data)
                            return false
                        }
                        that.loading = true
                        manager.addItemCategories(data).then((response) => {
                            that.loading = false
                            if (response.error_code === 'Success') {
                                that.$Message.success('添加成功')
                                that.getList()
                                that.getAllTopCategories()
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
                that.tableLoading = true
                let data = {
                    Name: that.formItem.Name,
                    Valid: ''
                }
                if (that.formItem.Valid === 1) {
                    data.Valid = true
                } else if (that.formItem.Valid === 0) {
                    data.Valid = false
                }
                manager.getItemCategoriesList(data).then((response) => {
                    that.tableLoading = false
                    that.loading = false
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
            },
            getAllTopCategories () {
                let that = this
                manager.getAllTopCategories().then((response) => {
                    if (response.error_code === 'Success') {
                        that.djflList = response.data.list
                    } else {
                        this.$Message.error(response.error_message);
                    }
                })
            },
            checkType(val) {
                let that = this
                if (val == 'twice') {
                    that.type = true
                } else {
                    that.type = false
                }
            }
        },
        mounted () {
            let that = this
            that.$nextTick(() => {
                that.initTableHeight()
                that.getList()
                that.getAllTopCategories()
            })
        }
    }
</script>
<style>
</style>
