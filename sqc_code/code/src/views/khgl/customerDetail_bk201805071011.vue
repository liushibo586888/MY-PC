<template>
    <div class="lyqk-container container">
        <div class="top">
            <div class="lyqk-container-header">
                <span class="line"></span>
                <span class="text">客户基础资料</span>
                <span class="right">所属门店：{{user.store}}</span>
            </div>
            <div class="info">
                <div class="info-top">
                    <div class="portrait">
                        <div class="in-portrait" :style="'background-image:url('+ user.avatar +')'"></div>
                    </div>
                    <div class="info-middle">
                        <div class="item">
                            <div>姓名：{{user.name}}</div>
                            <div>年龄：{{user.age}}</div>
                            <div>性别：{{user.sex}}</div>
                        </div>
                        <div class="item">
                            <div>客户编号：{{user.customer_code}}</div>
                            <div>生日：{{user.birth}}</div>
                            <div>QQ：{{user.qq_code}}</div>
                        </div>
                        <div class="item">
                            <div>
                                <template v-if="user.CustomerPhoneList.length > 0">
                                  联系电话：{{user.CustomerPhoneList[0]}}
                                  <Dropdown v-if="user.CustomerPhoneList.length > 1">
                                      <a href="javascript:void(0)">
                                          <span class="icon"></span>
                                      </a>
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-for="(item, index) in user.CustomerPhoneList" v-if="index >= 1" :key="index">{{item}}</DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                                </template>
                                <template v-else>无</template>
                            </div>
                            <div>电子邮箱：{{user.e_mail}}</div>
                            <div>身份证：{{user.id_num}}</div>
                        </div>
                    </div>
                    <button>修改</button>
                </div>
            </div>
            <div class="info-bottom">
                <div>
                    <div>会员编号：120565</div>
                    <div>会员级别：中级会员</div>
                    <div>客户状态：完美</div>
                    <div>来院状态：已来院</div>
                </div>
                <div>
                    <div>了解途径：线下</div>
                    <div>来源渠道：百度</div>
                    <div>网络来源：UC</div>
                    <div>质量度：高</div>
                </div>
                <div style="width: 25%;">
                    <div>介绍人姓名：忘记记</div>
                    <div>介绍人卡号：124541</div>
                    <div>介绍人电话：12645795231</div>
                </div>
                <div>
                    <div>门店总监：美白祛痘</div>
                    <div>网络咨询：美白祛痘</div>
                </div>
                <div style="width: 15%;">
                    <div>是否黑名单：否</div>
                </div>
            </div>
        </div>
        <div class="tab-button">
            <button v-for="(i,index) in btnList" :key="index" :class="btnIndex == index?'activeBtn':''" @click="tabBtn(index)">{{i.btn}}</button>
        </div>
        <!-- 来院情况 -->
        <div class="detail-table" v-if="btnIndex == 0">
            <div class="detail-table-header">
                <i-button type="ghost" v-for="(i,index) in detail_btn" :key="index" :class="detail_btn_index == index?'activeBtn':''" @click="detailBtn(index)">{{i}}</i-button>
            </div>
            <!--来院记录-->
            <div class="table-box" id="tableBox" v-if="detail_btn_index == 0">
                <Table height="280" :columns="columns1" :data="list" ref="mainTable"></Table>
            </div>
            <!--咨询记录-->
            <div class="table-box" v-if="detail_btn_index == 4">
                <Table height="280" :columns="columns4" :data="list4" ref=""></Table>
            </div>
            <!--消费记录-->
            <div class="table-box" v-if="detail_btn_index == 8">
                <Table height="280" :columns="columns8" :data="list8" ref=""></Table>
            </div>
        </div>
        <!--客户账户信息-->
        <div class="detail-table" v-if="btnIndex == 1">
            <div class="detail-table-header" style="padding: 10px 0;">
                <span class="line"></span>
                <span class="text">持有的优惠卡</span>
                <div class="right">
                    <div>
                        <span>积分余额</span>
                        <span class="money">￥500</span>
                    </div>
                    <div>
                        <span>预交金余额</span>
                        <span class="money">￥500</span>
                    </div>
                </div>
            </div>
            <div class="table-box">
                <Table height="280" :columns="infoTable" :data="infoTableList" ref="mainTable"></Table>
            </div>
        </div>
        <!--意向消费-->
        <div class="detail-table" v-if="btnIndex == 2">
            <div class="detail-table-header" style="padding: 10px 0;">
                <div class="yxxf">
                    <span>意向消费项目</span>
                    <div class="yixiang first">
                        <div class="yxxfxm">{{chooseProject}}</div>
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="(i,index) in yxxfList" :key="index" @click.native="chooseProject = i.name">{{i.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <span style="margin-left: 40px;">意向消费项目</span>
                    <div class="yixiang two">
                        <div class="yxxfxm">{{chooseProject1}}</div>
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="(i,index) in secondList" :key="index" @click.native="chooseProject1 = i.name">{{i.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <button>增加</button>
                    <button>移除</button>
                </div>
            </div>
            <div class="table-box">
                <Table height="280" :columns="infoTable" :data="infoTableList" ref="mainTable"></Table>
            </div>
        </div>
        <!--介绍客户列表-->
        <div class="detail-table" v-if="btnIndex == 3">
            <div class="table-box" id="table-box-3">
                <Table height="323" :columns="customerList" :data="customersList" ref="mainTable"></Table>
            </div>
        </div>
        <!--照片-->
        <div class="photo-div" v-if="btnIndex == 4">
            <div class="up-out">
                <div>
                    <input type="file"/>
                    <div class="up-img"></div>
                    <p>上传照片</p>
                </div>
            </div>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
            <div class="up-out">
                <div>
                    <input type="file"/>
                    <div class="up-img"></div>
                    <p>上传照片</p>
                </div>
            </div>
            <div class="label">
                <span>术前照片</span>
                <span>术后照片</span>
            </div>
        </div>
        <div class="bottom-box" v-if="btnIndex != 4">
            <div class="row-box">{{tablePage.startNum}} - {{tablePage.endNum}}条/共{{tablePage.allNum}}条</div>
            <i-button type="ghost" class="btn">上一页</i-button>
            <i-button type="primary" class="btn">下一页</i-button>
            <div class="page-box">
                <p>前往</p>
                    <Input-number :max="tablePage.maxPageNum" :min="1" :value="1"></Input-number>
                <p>页</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        store: '杭州滨江天河店',
        portrait_img: '../../static/img/avatar.png',
        name: '豆叽叽',
        customer_code: '26586487',
        age: '23',
        birth: '6月25日',
        e_mail: '5889475487@qq.com',
        sex: '男',
        qq_code: '458459654',
        id_num: '125456859874526524',
        CustomerPhoneList: [
          '14589654785',
          '13137111234',
        ]
      },
      btnIndex: 0,
      detail_btn_index: 0,
      btnList: [
        {
          btn: '来院情况'
        },
        {
          btn: '客户账户信息'
        },
        {
          btn: '意向消费'
        },
        {
          btn: '介绍客户列表'
        },
        {
          btn: '照片'
        }
      ],
      detail_btn: ['来院记录', '追踪回访记录', '预约记录', '执行记录', '咨询记录', '通话记录', '未还款记录', '追踪计划', '消费记录'],
      tablePage: {
        page: 1,
        pageNum: 10,
        maxPageNum: 100,
        allNum: 23,
        startNum: 1,
        endNum: 8
      },
      columns1: [
        {
          title: "序号",
          key: "order",
          align: "center",
          type: "index"
        }, {
          title: "来院日期",
          key: "date",
          align: "center"
        }, {
          title: '登记人',
          key: 'djr',
          align: 'center'
        }, {
          title: '登记部门',
          key: 'department',
          align: 'center'
        }
      ], // 来院记录
      list: [
        {
          date: '2018/01/27 10:47:03',
          djr: '豆豆',
          department: '咨询部'
        }
      ], // 来院记录
      list4: [
        {
          date: '2018/01/27',
          zxr: '豆豆',
          zxnr: '美白祛痘',
          store: '滨江天河店'
        }
      ], // 咨询记录
      columns4: [
        {
          title: "咨询日期",
          key: "date",
          align: "center"
        }, {
          title: "咨询人",
          key: "zxr",
          align: "center"
        }, {
          title: '咨询内容',
          key: 'zxnr',
          align: 'center'
        }, {
          title: '咨询人所属门店',
          key: 'store',
          align: 'center'
        }
      ], // 咨询记录
      list8: [
        {
          date: '2018/01/27',
          label: '发票',
          status: '退费',
          refund_status: '退费中',
          whether: '是',
          type: '是',
          project_type: '测试',
          project_name: '美白祛痘'
        }
      ], // 咨询记录
      columns8: [
        {
          title: "消费日期",
          key: "date",
          align: "center"
        }, {
          title: "单据类型",
          key: "label",
          align: "center"
        }, {
          title: '单据状态',
          key: 'status',
          align: 'center'
        }, {
          title: '退费状态',
          key: 'refund_status',
          align: 'center'
        }, {
          title: '是否纠纷',
          key: 'whether',
          align: 'center'
        }, {
          title: '顶级分类',
          key: 'type',
          align: 'center'
        }, {
          title: '项目分类',
          key: 'project_type',
          align: 'center'
        }, {
          title: '项目名称',
          key: 'project_name',
          align: 'center'
        }
      ], // 咨询记录
      infoTable: [
        {
          title: "序号",
          key: "order",
          align: "center",
          type: "index"
        }, {
          title: "办卡日期",
          key: "date",
          align: "center"
        }, {
          title: '有效日期',
          key: 'time',
          align: 'center'
        }, {
          title: '卡名称',
          key: 'card_name',
          align: 'center'
        }, {
          title: '卡类型',
          key: 'card_type',
          align: 'center'
        }, {
          title: '真实金额',
          key: 'money',
          align: 'center'
        }, {
          title: '赠送金额',
          key: 'money1',
          align: 'center'
        }, {
          title: '余额',
          key: 'money2',
          align: 'center'
        }
      ], // 客户账户信息
      infoTableList: [
        {
          date: '2018/01/27',
          time: '2018/01/27',
          card_name: '一卡通3.8W',
          card_type: '增值卡',
          money: '￥550000',
          money1: '￥150000',
          money2: '500'
        }
      ],
      chooseProject: '',
      chooseProject1: '',
      yxxfList: [
        {
          name: '呵呵呵'
        },
        {
          name: '哈哈哈'
        }
      ],
      secondList: [
        {
          name: '初级'
        },
        {
          name: '中级'
        },
        {
          name: '高级'
        }
      ],
      customerList: [
        {
          title: "会员卡号",
          key: "num",
          align: "center"
        }, {
          title: "客户姓名",
          key: "name",
          align: "center"
        }, {
          title: '性别',
          key: 'sex',
          align: 'center'
        }, {
          title: '年龄',
          key: 'age',
          align: 'center'
        }
      ], // 介绍客户列表
      customersList: [
        {
          num: '45445564',
          name: '呵呵哒',
          sex: '男',
          age: '50'
        }
      ]
    };
  },
  methods: {
    tabBtn (index) {
      this.btnIndex = index;
    },
    detailBtn (index) {
      this.detail_btn_index = index;
    }
  }
};
</script>
<style lang="less">
    .lyqk-container{
        padding: 0 0 72px;
        background: none;
        overflow-y: auto !important;
        height: auto !important;
        .top{
            height: 357px;
            position: relative;
            width: 94%;
            margin-left: 3px;
            border-radius: 8px;
            -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
            -moz-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
            overflow: hidden;
            .lyqk-container-header{
                height: 36px;
                width: 100%;
                border-bottom: 1px solid #79aa49;
                background: #fff;
                overflow: hidden;
                .line{
                    height: 15px;
                    width: 2px;
                    background: #79aa49;
                    display: inline-block;
                    float: left;
                    margin: 10px;
                }
                .text{
                    display: inline-block;
                    height: 100%;
                    line-height: 36px;
                    font-size: 16px;
                    color: #666666;
                    float: left;
                }
                .right{
                    display: inline-block;
                    float: right;
                    color: #79aa49;
                    font-size: 14px;
                    height: 100%;
                    line-height: 36px;
                    margin-right: 22px;
                }
            }
            .info{
                width: 100%;
                height: 143px;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                z-index: 2;
                background: #f7f7f7;
                position: absolute;
                .info-top{
                    width: 100%;
                    background: #fafafa;
                    height: 128px;
                    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    padding: 18px 30px 16px 38px;
                    overflow: hidden;
                    .portrait{
                        height: 96px;
                        width: 96px;
                        border-radius: 50%;
                        position: relative;
                        background: #b9d2a1;
                        float: left;
                        .in-portrait{
                            height: 83px;
                            width: 83px;
                            border-radius: 50%;
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;
                        }
                    }
                }
                .info-middle{
                    float: left;
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    .item:first-child{
                        width: 26%;
                        margin-left: 7%;
                    }
                    .item{
                        width: 33%;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        div{
                            font-size: 16px;
                            color: #666666;
                            margin-top: 10px;
                            .ivu-dropdown{
                                float: right;
                                margin-right: 12%;
                                /* padding-top: 5px; */
                                box-sizing: border-box;
                                .icon{
                                    display: inline-block;
                                    width: 24px;
                                    height: 15px;
                                    background: url("../../../static/img/509.png") no-repeat;
                                    background-size: cover;
                                    background-position: center;
                                    margin-top: 3px;
                                }
                            }
                        }
                        div:first-child{
                            margin-top: 0;
                        }
                    }
                }
                button{
                    float: right;
                    width: 88px;
                    height: 37px;
                    padding: 0;
                    border-radius: 4px;
                    border: 1px solid #79aa49;
                    color: #79aa49;
                    background: none;
                    font-size: 18px;
                    outline: none;
                    margin-top: 52px;
                }
            }
            .info-bottom{
                width: 100%;
                height: 200px;
                background: #ffffff;
                /* margin-top: -5px; */
                position: relative;
                padding: 12px 32px;
                top: 140px;
                display: flex;
                justify-content: space-between;
                >div{
                    width: 20%;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    >div{
                        font-size: 16px;
                        color: #666666;
                        margin-top: 21px;
                    }
                    >div:first-child{
                        margin-top: 0;
                    }
                }
            }
        }
        .tab-button{
            width: 100%;
            overflow: hidden;
            margin: 10px 0;
            button:before{
                content: "";
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #e9eaec;
                display: inline-block;
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
            .activeBtn:before{
                content: "";
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #bcd4a4;
                display: inline-block;
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
            button{
                float: left;
                padding: 0 0.8%;
                background: #ffffff;
                border-radius: 4px;
                -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                -moz-box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                outline: none;
                border: none;
                box-sizing: border-box;
                height: 43px;
                line-height: 43px;
                font-size: 16px;
                color: #666666;
                margin-right: 6px;
                cursor: pointer;
            }
        }
        .detail-table{
            .detail-table-header{
                width: 100%;
                overflow: hidden;
                button{
                    float: left;
                    padding: 0 0.8%;
                    background: #ffffff;
                    border-radius: 4px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0 0 3px;
                    outline: none;
                    border: none;
                    box-sizing: border-box;
                    height: 43px;
                    line-height: 43px;
                    font-size: 16px;
                    color: #666666;
                    margin-right: 6px;
                    cursor: pointer;
                }
                button:before{
                    content: "";
                    opacity: 1;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #e9eaec;
                    display: inline-block;
                    position: relative;
                    top: 2px;
                }
                .activeBtn:before{
                    content: "";
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    opacity: 1;
                    background: #79aa49;
                    display: inline-block;
                    position: relative;
                    top: 2px;
                }
                .line{
                    height: 15px;
                    width: 2px;
                    background: #79aa49;
                    display: inline-block;
                    float: left;
                    margin: 10px;
                }
                .text{
                    display: inline-block;
                    height: 100%;
                    line-height: 36px;
                    font-size: 16px;
                    color: #666666;
                    float: left;
                }
                .yxxf{
                    float: left;
                    padding-left: 24px;
                    overflow: hidden;
                    span{
                        display: inline-block;
                        float: left;
                        line-height: 34px;
                        font-size: 16px;
                        color: #666666;
                    }
                    .yixiang.first{
                        margin-left: 12px;
                        float: left;
                        height: 34px;
                        width: 140px;
                        border: 1px solid #79aa49;
                        overflow: hidden;
                        .ivu-dropdown{
                            float: right;
                            width: 40px;
                            height: 100%;
                            .ivu-dropdown-rel{
                                height: 100%;
                                width: 100%;
                                background: #b9d2a1;
                                text-align: center;
                                line-height: 40px;
                                .ivu-icon{
                                    font-size: 22px;
                                    color: #fff;
                                    font-weight: bold;
                                }
                            }
                            .ivu-select-dropdown{
                                width: 140px !important;
                                left: 132px !important;
                            }
                        }
                        .yxxfxm{
                            float: left;
                            width: 98px;
                            line-height: 34px;
                            text-align: center;
                            font-size: 14px;
                            color: #79aa49;
                        }
                    }
                    .yixiang.two{
                        margin-left: 12px;
                        float: left;
                        height: 34px;
                        width: 140px;
                        border: 1px solid #79aa49;
                        overflow: hidden;
                        .ivu-dropdown{
                            float: right;
                            width: 40px;
                            height: 100%;
                            .ivu-dropdown-rel{
                                height: 100%;
                                width: 100%;
                                background: #b9d2a1;
                                text-align: center;
                                line-height: 40px;
                                .ivu-icon{
                                    font-size: 22px;
                                    color: #fff;
                                    font-weight: bold;
                                }
                            }
                            .ivu-select-dropdown{
                                width: 140px !important;
                                left: 420px !important;
                            }
                        }
                        .yxxfxm{
                            float: left;
                            width: 98px;
                            line-height: 34px;
                            text-align: center;
                            font-size: 14px;
                            color: #79aa49;
                        }
                    }
                    button{
                        float: left;
                        width: 65px;
                        height: 34px;
                        padding: 0;
                        outline: none;
                        border: 1px solid #79aa49;
                        font-size: 16px;
                        color: #79aa49;
                        background: none;
                        line-height: 34px;
                        margin-left: 36px;
                    }
                    button:before{
                        content: none;
                    }
                }
                .right{
                    float: right;
                    overflow: hidden;
                    >div{
                        float: left;
                        overflow: hidden;
                        span{
                            font-size: 16px;
                            color: #666666;
                            display: inline-block;
                            line-height: 34px;
                            float: left;
                            margin-right: 16px;
                        }
                        .money{
                            display: inline-block;
                            width: 80px;
                            height: 34px;
                            border-radius: 4px;
                            border: 1px solid #79aa49;
                            text-align: center;
                            line-height: 34px;
                            font-size: 16px;
                            color: #79aa49;
                            float: left;
                        }
                    }
                    >div:first-child{
                        margin-right: 20px;
                    }
                }
            }
            .ivu-table-body{
                height: 240px !important;
            }
            .table-box{
                border: 1px solid #ebebeb;
                padding: 20px 20px 0;
                background: #ffffff;
            }
        }
        .photo-div{
            width: 100%;
            height: 385px;
            margin-top: 50px;
            background: #ffffff;
            .label{
                width: 100%;
                clear: both;
                padding-top: 25px;
                span{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 30px;
                    color: #333333;
                }
                span:first-child{
                    margin-left: 136px;
                }
                span:nth-child(2){
                    margin-left: 320px;
                }
            }
            .up-out{
                width: 276px;
                height: 276px;
                background: #dbe9ce;
                float: left;
                margin-left: 58px;
                margin-top: 14px;
                position: relative;
                >div{
                    position: absolute;
                    text-align: center;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 229px;
                    height: 229px;
                    background: #fffeff;
                    margin: auto;
                    .up-img{
                        width: 98px;
                        height: 98px;
                        background: url("../../../static/img/779.png") no-repeat;
                        background-position: center;
                        background-size: cover;
                        margin: auto;
                        margin-top: 60px;
                    }
                    p{
                        font-size: 32px;
                        color: #d1d1d1;
                        margin-top: 10px;
                    }
                    input{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        outline: none;
                        cursor: pointer;
                        opacity: 0;
                    }
                }
            }
            .up-out:nth-child(5){
                margin-left: 0;
            }
            .line1{
                width: 86px;
                height: 2px;
                background: #b8d49d;
                float: left;
                margin-top: 60px;
            }
            .line2{
                width: 2px;
                height: 186px;
                background: #b8d49d;
                float: left;
                margin-top: 60px;
            }
            .line3{
                width: 86px;
                height: 2px;
                background: #b8d49d;
                float: left;
                margin-top: 244px;
            }
        }
        .bottom-box{
            background: #ffffff;
            position: absolute;
            height: 75px;
            box-sizing: border-box;
            width: 100%;
            padding: 0 20px;
            bottom: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: end;
            justify-content: flex-end;
            -ms-flex-align: center;
            align-items: center;
            left: 0;
            font-size: 16px;
        }
    }
    #table-box-3{
        .ivu-table-body{
            height: 281px !important;
        }
    }
</style>
