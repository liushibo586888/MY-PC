<style lang="less">
@import "./login.less";
</style>
<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">

      <div class="form-con" style="width:350px;height:400px;text-align:center;">

        <img src="../../static/img/logo1.png" height="38" width="150%" class="logo">
        <Form ref="loginForm" :model="form" :rules="rules">

          <input type="text" value="admin" style="position: absolute;z-index: -20; display: none" disabled autocomplete="off" />
          <!-- 这个username会被浏览器记住，我随便用个admin-->
          <input type="password" value=" " style="position: absolute;z-index: -20;display: none" disabled autocomplete="off" />

          <formItem prop="userName">
            <Icon type="aaa-yonghu" class="input-icon" />
            <Input type="text" v-model="form.userName" placeholder="账号" size="large" class="input-username" autocomplete="off" style="width: 100%" />
            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
          </formItem>
          <formItem prop="password">
            <Icon type="aaa-mima54" class="input-icon" />
            <Input v-model="form.password" placeholder="密码" size="large" @on-focus="settype($event)" type="text" autocomplete="off" class="input-password" style="width: 100%" />
            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
          </formItem>
          <div class="btn-box">
            <Button type="success" long class="btn-submit" @click="handleSubmit" :loading="inUpload" style="width: 100%">登录</Button>
          </div>

          <p style="visibility: hidden;"><input type="password" value=" " style="position: absolute;z-index: -1;" disabled autocomplete="off" /></p>
          <!-- 这个password的值会被浏览器记住，我随便用个空格 -->

        </Form>
      </div>
      <!--  <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card> -->
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import api from "@/api/index.js";
import storejs from "storejs";
import { appRouter } from "@/router/router.js";
// const Main = require('@/views/Main.vue')
// const khgl = require('@/views/khgl/khgl.vue')
export default {
  data() {
    return {
      inUpload: false,
      form: {
        // userName: 'RoleTest',
        // password: '123456'
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      let that = this;
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          let data = {
            account: that.form.userName,
            password: that.form.password
          };
          that.inUpload = true;
          api.login(data).then(response => {
            that.inUpload = false;
            if (response.error_code === "Success") {
              // 清空之前的浏览记录
              that.$store.state.app.pageOpenedList = [];
              sessionStorage.clear();
              localStorage.clear();

              //记录当前登录的时间戳
              // Cookies.set("sqcloginTime",new Date().getTime(),1/(24*60));

              that.setData(response.data);
            } else {
              that.$Message.error(response.error_message);
            }
          });
        }
      });
    },
    settype(event) {
      event.currentTarget.type = "password";
    },
    setData(res) {
      let that = this;
      //  Cookies.set('user', this.form.userName);
      //  Cookies.set('password', this.form.password);
      that.$store.commit("setAvator", "");
      if (res.HeadImgStr) {
        localStorage.setItem(
          "userAvatar",
          "data:image/jpeg;base64," + res.HeadImgStr
        );
      } else {
        localStorage.setItem("userAvatar", "");
        // localStorage.setItem('userAvatar', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg')
      }
      //用户信息缓存2小时
      // let millisecond = new Date().getTime();
      // let expiresTime = new Date(millisecond + 60 * 1000 * 15);
      Cookies.set("user", res.EmployeeName, { expires: 1 / 12 });

      that.$store.commit("saveUserMes", res);

      that.setRoute(res);
      that.$store.state.app.userMes = storejs.get("userMessage");
      that.$store.state.app.authorList = JSON.parse(
        sessionStorage.getItem("pageRole")
      );
      // that.$router.push({
      //    name: 'ywlc'
      // })
    },
    formatRoute(url) {
      return url.replace("\n\r", "").replace("\r", "");
    },
    formatSlideMenuTitle(url) {
      let u = url.replace("\n\r", "").replace("\r", "");
      if (u.length > 7) {
        return u.substr(0, 6) + " ...";
      }
      return u;
    },
    setRoute(res) {
      let that = this;
      let menuList = res.MenuList;
      let list = [];
      let qxList = [];
      let pageRole = {};
      for (let i of menuList.TopMenuList) {
        let data = {
          title: that.formatRoute(i.TopMenuName),
          icon: that.formatRoute(i.IconUrl),
          path: `/${that.formatRoute(i.ComponentName)}`,
          name: that.formatRoute(i.ComponentName),
          children: []
        };
        for (let j of i.SubList) {
          if (
            j.ComponentName !== "customerDetail" &&
            j.ComponentName !== "xqkfyj" &&
            j.ComponentName !== "khxmxq"
          ) {
            let d = {
              path: `/${that.formatRoute(j.ComponentName)}`,
              title: that.formatSlideMenuTitle(j.MenuName),
              meta: {
                title: that.formatRoute(j.MenuName)
              },
              name: that.formatRoute(j.ComponentName)
            };
            data.children.push(d);
          }
          pageRole[that.formatRoute(j.ComponentName)] = j.MenuRoleList;
          qxList.push(that.formatRoute(j.ComponentName));
        }
        list.push(data);
      }
      qxList.push("home_index");
      qxList.push("customerPerformance");
      // 侧边栏
      sessionStorage.setItem("menuList", JSON.stringify(list));
      // 权限
      sessionStorage.setItem("qxList", JSON.stringify(qxList));
      // 页面权限
      sessionStorage.setItem("pageRole", JSON.stringify(pageRole));

      //可以获取按钮控制权限
      sessionStorage.setItem("apiUrlList", JSON.stringify(res.ApiUrlList));
      // 展开默认数组
      if (
        menuList.DefaultTopMenuName &&
        menuList.DefaultTopMenuName !== "非必填"
      ) {
        this.$store.state.app.openedSubmenuArr.push(
          menuList.DefaultTopMenuName
        );
      } else {
        this.$store.state.app.openedSubmenuArr.push(list[0].name);
      }

      // 有默认页跳转至默认页 无默认页面跳转至数组第一个页面
      if (
        menuList.DefaultDisplayPageUrl.replace("\n", "") &&
        menuList.DefaultDisplayPageUrl.replace("\n", "") !== "非必填"
      ) {
        // console.log(menuList.DefaultDisplayPageUrl)
        that.$router.push({
          name: menuList.DefaultDisplayPageUrl
        });
        // console.log(that.$router)
      } else {
        that.$router.push({
          name: list[0].children[0].name
        });
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
