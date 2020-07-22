import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import {
    router
} from './router/index';
import {
    appRouter
} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import './my-theme/index.less';
import 'lib-flexible'

// 注册全局组件 表格加载
import tableLoadingPage from '@/components/tableLoadingPage.vue';
Vue.use(VueI18n);
Vue.use(iView);
Vue.component('tableLoadingPage', tableLoadingPage);
require('@/api/axios.js');
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});