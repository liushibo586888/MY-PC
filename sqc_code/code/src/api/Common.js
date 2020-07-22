import moment from 'moment';

var echartsCommon = {};
echartsCommon.count = 0;
echartsCommon.defalutList = ['#C1232B', '#B5C334', '#FE8463'];
echartsCommon.colorList = [];
echartsCommon.setColor = function (arr, recalc) {
    let count = echartsCommon.count;
    if (typeof (recalc) !== 'undefined') { //默认
        var list = echartsCommon.reSort(arr);
        count = list.length;
        if (count > 0 && count <= 3) {
            for (let index = 0; index < count; index++) {
                echartsCommon.colorList.push(echartsCommon.defalutList[0]);
            }
        } else if (count > 3 && count <= 6) {
            for (let index = 0; index < count; index++) {
                if (list[index] < 3) {
                    echartsCommon.colorList.push(echartsCommon.defalutList[0]);
                } else {
                    echartsCommon.colorList.push(echartsCommon.defalutList[2]);
                }
            }
        } else {
            for (let index = 0; index < count; index++) {
                if (list[index] < 3) {
                    echartsCommon.colorList.push(echartsCommon.defalutList[0]);
                } else if (list[index] > 6) {
                    echartsCommon.colorList.push(echartsCommon.defalutList[2]);
                } else {
                    echartsCommon.colorList.push(echartsCommon.defalutList[1]);
                }
            }
        }
    } else {
        if (count > 0 && count <= 3) {
            for (let index = 0; index < count; index++) {
                echartsCommon.colorList.push(echartsCommon.defalutList[0]);
            }
        } else if (count > 3) {
            echartsCommon.colorList = [echartsCommon.defalutList[0], echartsCommon.defalutList[0], echartsCommon.defalutList[0]];
            if (count >= 6) {
                for (let index = 3; index < count; index++) {
                    if (index >= count - 3) {
                        echartsCommon.colorList.push(echartsCommon.defalutList[2]);
                    } else {
                        echartsCommon.colorList.push(echartsCommon.defalutList[1]);
                    }
                }
            } else {
                echartsCommon.colorList.push(echartsCommon.defalutList[2]);
            }
        }
    }
    return echartsCommon.colorList;
};
echartsCommon.itemStyle1 = function (fontsize, recalc, arr) {
    return {
        normal: {
            color: function (params) {
                echartsCommon.colorList = [];
                return echartsCommon.setColor(arr, recalc)[params.dataIndex];
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                textStyle: {
                    color: 'black',
                    fontSize: fontsize
                }
            }
        }
    };
};
echartsCommon.shortcuts = function () { //时间回到今天
    return {
        shortcuts: [{
            text: '今天',
            value() {
                return new Date();
            }
        }]
    };
};

echartsCommon.itemStyle = function (fontsize) {
    return {
        normal: {
            label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                    //数值样式
                    color: 'black',
                    fontSize: fontsize
                }
            }
        }
    };
};
//echarts横坐标倾斜显示
echartsCommon.axisLabel = function () {
    return {
        interval: 0, //横轴信息全部显示
        rotate: -30 //-30度角倾斜显示
    };
};
//echarts横坐标换行显示
echartsCommon.axisLabelHH = function () {
    return {
        //坐标轴刻度标签的相关设置。
        formatter: function (params) {
            var newParamsName = ""; // 最终拼接成的字符串
            var paramsNameNumber = params.length; // 实际标签的个数
            var provideNumber = 3; // 每行能显示的字的个数
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
            /**
             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
             */
            // 条件等同于rowNumber>1
            if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                    } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                }
            } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
            }
            //将最终的字符串返回
            return newParamsName;
        }
    };
};
echartsCommon.reSort = function (arr) {
    var result = [];
    for (var index = 0; index < arr.length; index++) {
        var i = arr.length - 1;
        for (var j = 0; j < arr.length; j++) {
            if (index === j) {
                continue;
            }
            if (arr[index] > arr[j]) {
                i--;
            }
        }
        while (result.indexOf(i) > 0) {
            i--;
        }
        result.push(i);
    }
    return result;
};
echartsCommon.timeList = function () { //区域
    return [{
            value: 1,
            label: '当月'
        }, {
            value: 2,
            label: '环比'
        },
        {
            value: 3,
            label: '同比'
        }
    ];
};
echartsCommon.changeTime = function (formItem, val) {
    let date = formItem.StartDate1;

    let year1 = date.getYear();
    let month1 = date.getMonth() + 1;
    let day1 = new Date(year1, month1, 0).getDate(); //获取当月的最后一天

    let year2 = date.getFullYear();
    let month2 = date.getMonth();
    if (month2 == 0) {
        month2 = 12;
        year2 = year2 - 1;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    let day2 = new Date(year2, month2, 0).getDate(); //获取上月的最后一天

    let time1 = '';
    let time2 = '';
    let time3 = '';
    let time4 = '';
    let year = moment(date)
        .format('YYYY-MM-DD')
        .slice(0, 4);
    let month = moment(date)
        .format('YYYY-MM-DD')
        .slice(5, 7);
    if (val.label == '当月') {
        time1 = year + '-' + month + '-' + '01';
        time2 = year + '-' + month + '-' + day1;
        formItem.startDate = time1;
        formItem.endDate = time2;
        formItem.StartDate1 = time1;
        formItem.EndDate1 = time2;
    }
    if (val.label == '环比') {
        // month += 1;
        // if (month > 12) {
        //     month = 1;
        //     // year = year - 1;
        // }
        // time3 = year + '-' + month + '-' + '01';
        // time4 = year + '-' + month + '-' + day1;
        // formItem.StartDate1 = time3;
        // formItem.EndDate1 = time4;
        month = Number(month) - 1;
        if (month < 1) {
            month = 12;
            year = year - 1;
        }
        time1 = year + '-' + month + '-' + '01';
        time2 = year + '-' + month + '-' + day2;
        formItem.startDate = time1;
        formItem.endDate = time2;
    }
    if (val.label == '同比') {
        let lastyear = '';
        lastyear = year - 1;
        time1 = lastyear + '-' + month + '-' + '01';
        time2 = lastyear + '-' + month + '-' + day1;
        time3 = year + '-' + month + '-' + '01';
        time4 = year + '-' + month + '-' + day1;
        formItem.startDate = time1;
        formItem.endDate = time2;
        // formItem.StartDate1 = time3;
        // formItem.EndDate1 = time4;
    }

};
echartsCommon.ContrastTime = function (Message, time1, time2, time3, time4) {
    if (time1 && time2) {
        // 两者同时存在
        if (Number(moment(time1).format("YYYY-MM-DD").replace(/-/g, "")) > Number(moment(time2).format("YYYY-MM-DD").replace(/-/g, "")) || Number(moment(time3).format("YYYY-MM-DD").replace(/-/g, "")) > Number(moment(time4).format("YYYY-MM-DD").replace(/-/g, ""))) {
            Message.error("开始日期不得大于结束日期");
            return false;
        }
        return true;
    }
}
echartsCommon.rowClassName = function (temp, temp1) {
    if (temp == temp1) {
        // console.log(123);
        return "demo-table-info-row";
    }
    return "";
}
echartsCommon.sum = function (arr, fn) {
    let amount = 0;
    arr.forEach(x => {
        amount += fn(x);
    });
    return amount;
}
//客户电话
echartsCommon.CustomerPhone = function (phone) {
    if (!phone) {
        return "";
    }
    let tel = phone.slice(0, 3) + '****' + phone.slice(7, 11);
    return tel;

}
//（省略号）鼠标移在上面有提示
echartsCommon.ToolTip = function (h, data, num) {
    if (!data) {
        return "";
    }
    let text = data;
    if (text.length > num) {
        text = text.substr(0, num) + "...";
    }
    return h(
        "Tooltip", {
            props: {
                content: data,
                placement: "top"
            }
        },
        text
    );

}
echartsCommon.ToFixed = function (h, data, num) {
    if (!data) {
        return "0";
    }
    return h("div", {}, data.toFixed(num));
}
//执行日期  年/月/日
echartsCommon.DATE = function (h, time) {
    if (!time) {
        return h("div", {}, "");
    }
    return h("div", {}, moment(time).format("YYYY-MM-DD"));
}
//执行日期  年/月/日/时/分/秒
echartsCommon.DATEsfm = function (h, time) {
    if (!time) {
        return h("div", {}, "");
    }
    return h("div", {}, moment(time).format("YYYY-MM-DD HH:mm:ss"));
}
//转换日期 年月日
echartsCommon.changeTime = function (time) {
    return moment(time).format("YYYY-MM-DD");
}
//转换日期 年月日/时分秒
echartsCommon.changeTimeHms = function (time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
}
//input只能输入数字
echartsCommon.Rules = function (e) {
    return e.target.value.replace(/[^\d\.]/g, "")
}
//input只能输入正整数
echartsCommon.RulesZZS = function (e) {
    return e.target.value.replace(/^(0+)|[^\d]+/g, '')
}
//input身份证验证
echartsCommon.IDcard = function (message, e) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(e) == false) {
        message.error("身份证输入不合法")
        return "";
    } else {
        return e
    }
}
//申请单状态
var status_0 = ["待审核", "门店经理审核通过,待区域经理审核", "门店经理审核不通过", "区域经理审核通过", "区域经理审核不通过", "待生成订单", "待会计核算",
    "待付款", "待发货", "已发货,待收货", "收货成功", "已驳回"
]

//调货状态
var status_DK = ["待审核", "审核通过,待财务审核", "经理审核不通过,请重新编辑", "财务审核通过", "财务审核不通过", "调货完成"]
//找索引
echartsCommon.StatusIndex = function (e) {
    for (var i = 0; i < status_0.length; i++) {
        if (status_0[i] == e) {
            return i + 1;
        }
    }
}
echartsCommon.StatusIndexDK = function (e) {
    for (var i = 0; i < status_DK.length; i++) {
        if (status_DK[i] == e) {
            return i + 1;
        }
    }
}
echartsCommon.applysStatus = function (e) {
    return status_0[e - 1];
}
echartsCommon.applysStatusDK = function (e) {
    return status_DK[e - 1];
}

//申请单状态下拉
echartsCommon.selected = function () {
    let arr = [];
    for (let i = 0; i < status_0.length; i++) {
        let a = {
            id: i + 1,
            name: status_0[i]
        }
        arr.push(a)
    }
    return arr
}
//调库状态下拉
echartsCommon.selectedDK = function () {
    let arr = [];
    for (let i = 0; i < status_DK.length; i++) {
        let a = {
            id: i + 1,
            name: status_DK[i]
        }
        arr.push(a)
    }
    return arr
}
//注册平台
var terraceList = ["门店管理系统", "客户管理系统", "人事管理系统"]
echartsCommon.PlatformName = function (e) {
    return terraceList[e - 1];
}
echartsCommon.terraceList = function () {
    let arr = [];
    for (let i = 0; i < terraceList.length; i++) {
        let a = {
            ID: i + 1,
            Name: terraceList[i]
        }
        arr.push(a)
    }
    return arr
}
//入库类型状态
echartsCommon.InstorageInType = function (e) {
    var InType = ["采购退货入库", "销售提货入库", "生产产品入库", "领用退还入库", "借货入库", "借出还入"]
    return InType[e - 1];
}
//入库审核状态
echartsCommon.InstorageStatus = function (e) {
    var Status = ["审核中", "审核成功", "审核失败"]
    return Status[e - 1];
}
//出库类型状态
echartsCommon.OutstorageOutType = function (e) {
    var OutType = ["采购退货出库", "销售提货出库", "领用出库", "借货出库", "借入还出"]
    return OutType[e - 1];
}
//柱形图颜色
echartsCommon.color = function (e) {
    return "#65e785"
}
echartsCommon.DanDianZB = function (arr) {
    let sum = 0;
    let NameList = [];
    arr.forEach(v => {
        sum += v.Value;
    });
    arr.forEach(v => {
        let a = {
            Name: v.Name,
            Value: v.Value,
            ValueTow: v.ValueTow,
            rate: (v.Value / sum * 100).toFixed(2) + "%" == "NaN%" ?
                "0%" : (v.Value / sum * 100).toFixed(2) + "%"
        };
        NameList.push(a);
    });
    return NameList
}

//到店登记CustomerOpenID
echartsCommon.CustomerOpenIDdddj = function () {
    return "PMy0Rvipb9Rs-c83FsKmxbJoADPHJxFbj-WhDhDddBQ"
}

//项目执行CustomerOpenID发信息给顾客
echartsCommon.CustomerOpenIDxmzx = function () {
    return "Vqg_Jt1y8og1BctQ1Ho1QSD9QGbWkT0tiG35aVIO-R8"
}

//项目收费CustomerOpenID发信息给顾客
echartsCommon.CustomerOpenIDsf = function () {
    return "HLASxqUGFHt4ajy69Yb32hm_0kl80pGzdj_MastQ4x4"
}

//项目收费OpenID发送信息给护理师
echartsCommon.HLSOpenIDsf = function () {
    return "1B5eTzXad8VjdgD5GOVqhHnQyZFntbBHzgV_Nqp3Lyk"
}
export default echartsCommon;