<template>
  <div id="main" class="app-main">
    <router-view></router-view>
    <!-- 加载 -->
    <pageLoading :pageShow="showLoading"></pageLoading>
    <!-- ** -->
  </div>
</template>

<script>
  import pageLoading from "@/components/loading.vue";
  import { mapState } from "vuex";
  export default {
    // provide() {
    //   return {
    //     reload: this.reload
    //   };
    // },//自动刷新页面
    data() {
      return {
        theme: this.$store.state.app.themeColor
        // isRouterAlive: true//自动刷新页面
      };
    },

    beforeDestroy() { },
    methods: {
      reload() {
        this.isRouterAlive = false;
        // this.$nextTick(function() {
        //   this.isRouterAlive = true;
        // });//自动刷新页面
      }
    },
    computed: {
      ...mapState({
        showLoading: state => state.app.showLoading
      })
    },
    components: {
      pageLoading
    }
  };
</script>

<style>
  /*-- 时间框 --*/
  /* 今天 */
  .ivu-picker-panel-sidebar {
    text-align: center;
    width: 60px;
    height: 30px;
    margin-left: 154px;
    margin-top: 248px;
    position: absolute;
    color: white;
    background: #7cd0f1;
    border-right: 1px solid #e8eaec;
    border-radius: 4px;
    overflow: auto;
  }

  .ivu-picker-panel-sidebar :hover {
    background: #7cd0f1;
  }

  .ivu-picker-panel-body-wrapper.ivu-picker-panel-with-sidebar {
    padding-left: 0px;
  }

  /* 时间框宽度 */
  .DatePicker_time {
    max-width: 100%;
    min-width: 105px;
  }

  .DatePicker_time .ivu-select-dropdown {
    height: 280px;
  }

  /* ------ */
  @import "../static/font/iconfont.css";

  i.ivu-icon[class*="ivu-icon-aaa"] {
    font-family: "iconfont" !important;
  }

  .ivu-select-dropdown {
    max-height: 1000px !important;
  }

  .ivu-date-picker-cells-cell em {
    border-radius: 50% !important;
  }

  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden !important;
  }

  .app-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .container {
    position: relative;
    background: #fff;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 72px 20px;
    min-height: 448px;
    overflow: hidden;
    min-width: 800px;
  }

  .container .btn {
    width: 82px;
    border-radius: 0;
  }

  .container .search-box {
    position: absolute;
    width: 100%;
    top: 20px;
    left: 0;
    padding: 0 20px;
  }

  .container .search-box .ivu-form-item {
    width: 100%;
    margin-bottom: 0;
  }

  .container .search-box .btn-box .ivu-form-item-content {
    display: flex;
    justify-content: flex-end;
  }

  .container .search-box .ivu-input {
    border-radius: 0;
  }

  .container .search-box button[class*="btn-"]:not(:last-child) {
    margin-right: 23px;
  }

  .container .search-box button.btn-big {
    width: 120px;
  }

  button.btn-add {
    background: rgb(99, 198, 221);
    border: 1px solid rgb(99, 198, 221);
  }

  button.btn-add:hover {
    background: rgba(99, 198, 221, 0.6);
    border: 1px solid rgba(99, 198, 221, 0.6);
  }

  button.btn-purple {
    background: rgb(229, 118, 156);
    border: 1px solid rgb(229, 118, 156);
  }

  button.btn-purple:hover {
    background: rgba(229, 118, 156, 0.6);
    border: 1px solid rgba(229, 118, 156, 0.6);
  }

  button.btn-red {
    background: rgb(252, 84, 39);
    border: 1px solid rgb(252, 84, 39);
  }

  button.btn-red:hover {
    background: rgba(252, 84, 39, 0.6);
    border: 1px solid rgba(252, 84, 39, 0.6);
  }

  .container .table-box {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .container .ivu-table-header .ivu-table-cell {
    color: #888;
    font-family: "微软雅黑";
    font-weight: 400;
    font-size: 14px;
  }

  .container .ivu-table-body .ivu-table-cell {
    color: #666;
    font-family: "微软雅黑";
    font-weight: 400;
    font-size: 14px;
  }

  .container .bottom-box {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    bottom: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    left: 0;
    font-size: 16px;
  }

  .container .bottom-box button[class*="btn"] {
    margin-right: 15px;
  }

  .container .bottom-box .page-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
  }

  .container .bottom-box .page-box .ivu-input-number {
    margin: 0 6px;
    width: 40px;
  }

  .container .bottom-box .row-box {
    border: 1px solid #999;
    text-align: center;
    width: 148px;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    color: #999;
    margin-right: 15px;
  }

  .container .bottom-box .table-row {
    width: 90px;
    margin-right: 15px;
  }

  /*弹窗样式*/
  .dialog {
    height: 40px;
    line-height: 40px;
  }

  .dialog .header {
    position: relative;
    padding-left: 19px;
    font-size: 14px;
    width: 80%;
  }

  .dialog .header:before {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    background: #79aa49;
    left: 4px;
  }

  .ivu-select-arrow {
    margin-top: -10px;
  }

  .dialog .ivu-select-arrow {
    margin-top: -10px;
  }

  .dialog button[class*="btn"] {
    width: 82px;
    height: 30px;
    /*border: 0;*/
    border-radius: 0;
  }

  .dialog .footer {
    display: flex;
    justify-content: flex-end;
    /* padding: 0 45px; */
  }

  .dialog .ivu-modal-footer {
    border-top: 0;
  }

  .dialog button.btn-sure {
    margin-right: 20px;
  }

  .dialog .ivu-icon-aaa-guanbi {
    color: #79aa49;
    font-size: 20px;
  }

  .ivu-modal-close {
    top: 4px;
  }

  .dialog .form {
    padding: 0 16px;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vertical-center-modal .ivu-modal {
    top: 0;
  }

  .print {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  .dialog .table-box {
    margin-top: 20px;
  }

  .dialog .form-title {
    position: relative;
    width: 100%;
    font-size: 16px;
    padding: 10px 0 10px 10px;
    color: #666;
  }

  .dialog .form-title:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 0;
    background: #ccc;
  }

  .ivu-modal-wrap * {
    word-break: break-all;
  }

  /* ** */
  /*打印*/
  @media print {
    .print-box {
      height: 100% !important;
    }

    .single-page-con {
      left: 0 !important;
      top: 0 !important;
    }

    .container {
      min-width: 0px !important;
    }

    * {
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    .not-print {
      opacity: 0;
    }

    .hide-print {
      display: none !important;
    }

    .print {
      opacity: 1;
      height: auto;
    }
  }

  .print-box {
    height: 0;
    overflow: hidden;
  }

  .print-box {
    position: absolute;
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
    background: #ccc;
    z-index: 99999;
    color: #000;
    padding: 0;
  }

  .print-box .title {
    position: relative;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }

  .print-box .storeName {
    position: relative;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
  }

  .print-box .document-type {
    font-size: 8px;
    margin-bottom: 10px;
  }

  .print-box .print-name {
    font-size: 8px;
    font-weight: bold;
  }

  .print-box .print-key {
    font-size: 8px;
  }

  .print-box .line {
    width: 500px;
    border-bottom: 4px dashed #999;
    margin: 10px 0;
  }

  .print-box .bottom {
    font-size: 15px;
    text-align: center;
    margin-top: 30px;
    font-weight: bold;
  }

  /* ** */
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #ccc;
  }

  input::-moz-input-placeholder {
    color: #ccc;
  }

  input::-ms-input-placeholder {
    color: #ccc;
  }
</style>