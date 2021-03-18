<template>
  <div class="zwgl-container container">
    <div class="search-box">
      <Form :model="formItem" :label-width="0" inline @submit.native.prevent class="search-form" ref="searchForm">
        <row :gutter="20">
          <i-col span="24">
            <formItem class="btn-box">
              <Button type="primary" class="btn" @click="AddPoup">添加</Button>
            </formItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="table-box" id="tableBox">
      <Table :columns="columns1" highlight-row :data="list" :height="setTableHeight" ref="mainTable">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
          <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
      </Table>
      <tableLoadingPage :loading="tableLoading"></tableLoadingPage>
    </div>
    <!-- 新增弹窗 -->
    <Modal :mask-closable="false" v-model="modal1" class="dialog" class-name="vertical-center-modal">
      <div slot='header' class="header">
        {{modalTitle}}
      </div>
      <Form ref="formValidate1" :model="formValidate" :label-width="120" @submit.native.prevent class="form">
        <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="Name" :label="addtype+'职业名称'" :rules="formValidateRule.Name">
              <Input v-model="formValidate.Name" placeholder="请输入"></Input>
            </FormItem>
          </i-col>
        </row>
        <!-- <row type="flex" justify="space-between">
          <i-col span="24">
            <FormItem prop="ISused" label="是否有效">
              <RadioGroup v-model="ISused">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </row> -->
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="btn" @click="addForm" :loading="loading">保存</Button>
        <Button type="warning" class="btn" @click="resetForm" :loading="loading">取消</Button>
      </div>
    </Modal>
    <!-- 二级详情列表 -->
    <Modal v-model="ArrModal" title="二级职业详情" footer-hide width='50%' :mask-closable="false" @on-cancel="cancel">
      <Tag color="#FFA2D3" v-for="(item,index) in TagList" :key="item.ID" :name="item.Name" checkable :checked='item.Valid' @on-change="handleChange(index)">{{ item.Name }}</Tag>
    </Modal>
    <!-- ** -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import manager from '@/api/manager.js';
import echartsCommon from '@/api/Common.js';
export default {
  data() {
    return {
      TagList: [],
      ArrModal: false,
      rowID: '',
      ISused: '',
      addtype: '一级',
      tableHeight: 200,
      modalTitle: '新增',
      modal1: false,
      loading: false,
      tableLoading: false,
      // 添加弹窗用
      formValidate: {
        Name: ''
      },
      formValidateRule: {
        Name: { required: true, message: '职业名称不得为空', trigger: 'blur' }
      },
      formItem: {
        Name: '',
        Valid: ''
      },
      columns1: [
        {
          title: '一级职业名称',
          key: 'Name',
          align: 'center'
        },
        {
          title: '二级职业名称',
          key: 'ListModels',
          align: 'center',
          render: (h, params) => {
            let arr = params.row.ListModels,
              arr1 = [];
            arr.forEach((v) => {
              arr1.push(v.Name);
            });
            return echartsCommon.ToolTip(h, arr1.toString(), 30);
          }
        },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.smallAdd(params.row.ID);
                    }
                  }
                },
                '添加'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.smallView(params.row.ListModels);
                    }
                  }
                },
                '编辑'
              )
            ]);
          }
        },
        {
          title: ' ',
          width: 10
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState({
      authorList: (state) => state.app.authorList
    }),
    setTableHeight() {
      let that = this;
      return that.tableHeight;
    }
  },
  methods: {
    cancel() {
      this.TagList = [];
      this.getList();
    },
    handleChange(index) {
      let that = this;
      this.TagList[index].Valid = !this.TagList[index].Valid;
      let data = {
        ID: that.TagList[index].ID,
        Valid: that.TagList[index].Valid
      };
      that.EditTag(that, data);
    },
    EditTag(that, data) {
      manager.EditSecondVocationInfo(data).then((res) => {
        if (res.error_code === 'Success') {
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    smallAdd(ID) {
      let that = this;
      that.rowID = ID;
      that.addtype = '二级';
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = '添加';
    },
    smallView(data) {
      this.ArrModal = true;
      this.TagList = data;
    },
    AddPoup() {
      let that = this;
      this.addtype = '一级';
      that.resetForm();
      that.modal1 = true;
      that.modalTitle = '添加';
    },
    resetForm() {
      let that = this;
      that.$refs.formValidate1.resetFields();
      that.loading = false;
      that.modal1 = false;
    },
    addForm() {
      let that = this;
      that.$refs.formValidate1.validate((validate) => {
        if (validate) {
          let data = {
            ID: that.rowID,
            Name: that.formValidate.Name.replace(/\s/g, ''),
            Valid: 1,
            Remark: ''
          };
          that.loading = true;
          if (that.addtype == '一级') {
            that.yijiAdd(that, data);
          } else {
            that.erjiAdd(that, data);
          }
        } else {
          that.$Message.error('有必填项为空');
        }
      });
    },
    yijiAdd(that, data) {
      manager.AddVocationInfo(data).then((res) => {
        that.loading = false;
        if (res.error_code === 'Success') {
          that.$Message.success('一级职业添加成功');
          that.getList();
          that.resetForm();
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    erjiAdd(that, data) {
      manager.AddSecondVocationInfo(data).then((res) => {
        that.loading = false;
        if (res.error_code === 'Success') {
          that.$Message.success('二级职业添加成功');
          that.getList();
          that.resetForm();
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    initTableHeight() {
      let that = this;
      that.tableHeight = document.getElementById('tableBox').offsetHeight;
      window.onresize = function () {
        that.tableHeight = document.getElementById('tableBox').offsetHeight;
      };
    },
    getList() {
      let that = this;
      that.tableLoading = true;
      manager.VocationInfogetList().then((res) => {
        that.tableLoading = false;
        if (res.error_code === 'Success') {
          that.list = res.data;
        } else {
          that.$Message.error(res.error_message);
        }
      });
    },
    exportTable() {
      let that = this;
      that.$refs.mainTable.exportCsv({
        filename: `${new Date().getTime()}${document.title}`
      });
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initTableHeight();
      that.getList();
    });
  }
};
</script>
<style>
</style>
