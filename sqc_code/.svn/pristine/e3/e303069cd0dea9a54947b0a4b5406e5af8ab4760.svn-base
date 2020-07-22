<template>
    <div class="khgl-container container">
        <div class="search-box">
            <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
                <row :gutter="20">
                    <!-- 物资名称 -->
                     <i-col span="3">
                        <FormItem prop="Name">
                            <Input v-model="formItem.Name" placeholder="分类名称"></Input>
                        </FormItem>
                    </i-col>
                    <!-- 分类级别 -->
                    <i-col span="3">
                        <FormItem prop="TopCategoryName">
                            <Select v-model="formItem.TopCategoryName" placeholder="分类级别">
                                <Option :value="-1">全部</Option>
                                <Option :value="1">顶级</Option>
                                <Option :value="0">二级</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="18">
                        <formItem class="btn-box">
                            <Button type="primary" class="btn" @click="searchList">搜索</Button>
                            <Button type="warning" class="btn" @click="resetSearch">重置</Button>
                            <i-button type="primary" class="btn btn-add" @click="showAddPoup()" v-if="setAuthorAdd">添加</i-button>
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
                <FormItem prop="level" label="分类级别：" :label-width="120" :rules="formValidateRule.level">
                    <Select v-model="formValidate.level"  placeholder="请输入" :disabled="modalTitle == '修改'" @on-change="checkType">
                        <Option :value="1">顶级</Option>
                        <Option :value="0">二级</Option>
                    </Select>
                </FormItem>
                <FormItem prop="Name" label="分类名称：" :label-width="120" :rules="formValidateRule.Name">
                    <Input v-model="formValidate.Name" placeholder="请输入"></Input>
                </FormItem>
                <FormItem prop="SimpleCode" label="名称简码：" :label-width="120" :rules="formValidateRule.SimpleCode">
                    <Input v-model="formValidate.SimpleCode" placeholder="请输入"></Input>
                </FormItem>

                <FormItem prop="ParentID" label="顶级分类：" :label-width="120" :rules="formValidateRule.ParentID" v-if="type">
                    <Select v-model="formValidate.ParentID"  placeholder="请输入">
                    <!-- <Select v-model="formValidate.ParentID"  placeholder="请输入" :disabled="modalTitle == '修改'"> -->
                        <Option :value="item.ID" v-for="(item, index) in topStageList" :key="index">{{item.Name}}</Option>
                    </Select>
                </FormItem>
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
    
    import manager from '@/api/manager.js'
    import { mapState } from 'vuex'
    export default{
        data () {
            return {
                type:false,
                tablePage: {
                    page: 1,
                    pageNum: 10,
                    maxPageNum: 100,
                    allNum: 199,
                    startNum: 0,
                    endNum: 0
                },
                rowID: null,
                loading: false,
                tableLoading: false,
                tableHeight: 200,
                modalTitle: '修改',
                modal1: false,
                fljbList: [
                    {
                        value: '1',
                        name: '顶级'
                    }, {
                        value: '2',
                        name: '二级'
                    }
                ],
                formValidate: {
                    ID: '',
                    Name: '',
                    level: 1,
                    SimpleCode: '',
                    ParentID: ''
                },
                formValidateRule: {
                    Name: {required: true, message: '分类名称不得为空', trigger: 'blur'},
                    level: {required: true, message: '分类级别不得为空', trigger: 'blur', type: 'number'},
                    SimpleCode: {required: true, message: '名称简码不得为空', trigger: 'blur'},
                    ParentID: {required: true, message: '顶级分类不得为空', trigger: 'blur'}
                },
                formItem: {
                    Name: '',
                    TopCategoryName: ''
                },
                columns1: [
                    {
                        title: '分类名称',
                        key: 'Name',
                        align: 'center'
                    }, {
                        title: '顶级分类',
                        key: 'TopCategoryName',
                        align: 'center'
                    }, {
                        title: ' ',
                        width: 10
                    }
                ],
                list: [],
                topStageList: []
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
            searchList () {
                let that = this
                that.getList()
            },
            resetSearch () {
                let that = this
                that.tablePage.page = 1
                that.$refs.searchForm.resetFields()
                that.getList()
            },
            modefyMessage (data) {
                // 修改物资分类
                let that = this
                delete data.ParentID
               manager.modefySingleGoodsCategories(that.formValidate.ID, data).then((response) => {
                    that.loading = false
                    if (response.error_code === 'Success') {
                        that.$Message.success('修改成功')
                        that.getTopStage()
                        that.resetForm()
                        that.getList()
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            resetForm () {
                let that = this
                that.type = false
                that.$refs.formValidate1.resetFields()
                that.modal1 = false
            },
            addForm () {
                let that = this
                that.$refs.formValidate1.validate((validate) => {
                    if (validate) {
                        let data = {
                            Name: that.formValidate.Name,
                            SimpleCode: that.formValidate.SimpleCode,
                            ParentID: that.formValidate.ParentID
                        }
                        if (that.formValidate.level > 0) {
                            data.ParentID = ''
                        }
                        that.loading = true
                        if (that.modalTitle === '修改') {
                            that.modefyMessage(data)
                            return false
                        }
                        manager.addGoodsCategories(data).then((response) => {
                            that.loading = false
                            if (response.error_code === 'Success') {
                                that.$Message.success('添加成功')
                                that.resetForm()
                                that.getTopStage()
                                that.getList()
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
            getList () {
                let that = this
                that.tableLoading = true
                let data = {
                    Name: that.formItem.Name,
                    CategoryLevel: ''
                }
                if (that.formItem.TopCategoryName > 0) {
                    data.CategoryLevel = true
                } else if (that.formItem.TopCategoryName === 0) {
                    data.CategoryLevel = false
                }
                manager.getGoodsCategoriesList(data).then((response) => {
                    that.tableLoading = false
                    if (response.error_code === 'Success') {
                        let res = response.data
                        that.list = res.list
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
                let that = this
                if (!that.rowID) {
                    that.$Message.error('请选择一条记录')
                    return false
                }
                that.$store.commit('changeLoadingPage')
                manager.getSingleGoodsCategories(that.rowID).then((response) => {
                    that.$store.commit('changeLoadingPage')
                    if (response.error_code === 'Success') {
                        that.formValidate = response.data
                        that.formValidate.level = Number(response.data.ParentID) > 0 ? 0 : 1
                        if (that.formValidate.level < 1) {
                            that.type = true
                        }
                        that.modalTitle = '修改'
                        that.modal1 = true
                    } else {
                        that.$Message.error(response.error_message)
                    }
                })
            },
            getTopStage () {
                let that = this
                manager.getGoodsCategoriesTopCategoriesList().then((response) => {
                    if (response.error_code === 'Success') {
                        that.topStageList = response.data.list
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
            checkType(val) {
                let that = this
                if (val < 1) {
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
                that.getTopStage()
            })
        }
    }
</script>
<style>
</style>
