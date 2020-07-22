<template>
  <div v-if="setPage"></div>
  <!-- <Spin fix v-if="setPage" class="loading-box" transfer>
    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
    <div>加载中...</div>
  </Spin> -->
</template>
<script>
export default {
  props: {
    pageShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setPage() {
      if (this.pageShow) {
        this.$Spin.show({
          render: h => {
            return h("div", [
              h("Icon", {
                class: "demo-spin-icon-load",
                props: {
                  type: "load-c",
                  size: 30
                }
              }),
              h("div", "加载中...")
            ]);
          }
        });
      } else {
        this.$Spin.hide();
      }
      return this.pageShow;
    }
  }
};
</script>
<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>