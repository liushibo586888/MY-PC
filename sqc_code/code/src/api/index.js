// 业务接口
import axios from 'axios'
let api = {}
// 登陆
api.login = function (data) {
    return axios({
        url: '/login',
        method: 'POST',
        data: data
    })
}
// 获取项目列表
api.getItemsByValid = function (data) {
    return axios({
        url: '/items/getValidItems',
        method: 'GET',
        params: data
    })
}

// 获取可销售物资列表
api.getSalesGoods = function (data) {
    return axios({
        url: '/goods/getSalesGoods',
        method: 'GET',
        params: data
    })
}

// 获取确诊单支持的支付方式
api.getSupportertainDocPayModes = function () {
    return axios({
        url: '/payModes/getSupportertainDocPayModes',
        method: 'GET'
    })
}
// 获取确诊单支持的支付方式
api.getSupportertainDocPayModes = function () {
    return axios({
        url: '/payModes/getSupportertainDocPayModes',
        method: 'GET'
    })
}
// 根据员工ID获取所在门店所有有效员工
api.getEmployeesByEmployeeID = function (data) {
    return axios({
        url: '/employees/getEmployeesByEmployeeID',
        method: 'GET',
        params: data
    })
}
// 根据权限ID获取可显示菜单列表
api.getMenusByRoleID = function () {
    return axios({
        url: `/menus/getMenusByRoleID`,
        method: 'GET',
        params: data
    })
}
// 根据客户电话以及员工ID查询客户信息
api.getCustomerByPhone = function (data) {
    return axios({
        url: `/customers/getCustomerByPhone`,
        method: 'GET',
        params: data
    })
}
api.getCustomerByPhoneCode = function (data) {
    return axios({
        url: `/customers/getCustomerByPhoneCode`,
        method: 'GET',
        params: data
    })
}

// 客户转店申请中通过手机号查询客户
api.getCustomerByPhoneApply = function (data) {
    return axios({
        url: `/customers/GetApplyByPhone`,
        method: 'GET',
        params: data
    })
}

//客户转店
api.ChangeStore = function (data) {
    return axios({
        url: `/customerTransfer/auditChangeStore`,
        method: 'POST',
        data: data
    })
}
//客户转护理师
api.ChangePractitioner = function (data) {
    return axios({
        url: `/customerTransfer/AuditCustomerChangePractitioner`,
        method: 'POST',
        data: data
    })
}
//客户转店记录查询 2019年12月11日11:23:52
api.CustTransferStoreLog = function (data) {
    return axios({
        url: `/customerTransfer/getCustTransferStoreLog`,
        method: 'GET',
        params: data
    })
}

// 根据客户编号获取账户信息
api.customerAccount = function (id) {
    return axios({
        url: `/customerAccount/${id}`,
        method: 'GET'
    })
}
// 根据是否有效获取门店列表
api.getStoreByValid = function (Valid) {
    return axios({
        url: `/stores/getStoreByValid?Valid=${Valid}`,
        method: 'GET'
    })
}
// 获取是否有效获取咨询分类
api.getSubCategoriesByValid = function (Valid) {
    return axios({
        url: `/subCategories/getSubCategoriesByValid?Valid=${Valid}`,
        method: 'GET'
    })
}
// 获取网络来源
api.getNetSourcesByValid = function (data) {
    return axios({
        url: `/netSources/getValidNetSources`,
        method: 'GET',
        params: data
    })
}
// 根据职位编号获取来源渠道
api.getChannelsByPositionID = function (data) {
    return axios({
        url: `/channels/getChannelsByPositionID`,
        method: 'GET',
        params: data
    })
}
// 根据搜索条件以及员工ID获取渠道下单列表
api.onlineOrdersGetList = function (data) {
    return axios({
        url: `/onlineOrders/getList`,
        method: 'GET',
        params: data
    })
}
// 添加渠道下单记录 (不预约时预约门店编号以及预约日期为null值，反之两项必填)
api.onlineOrders = function (data) {
    return axios({
        url: `/onlineOrders`,
        method: 'POST',
        data: data
    })
}
// 根据客户ID获取历史咨询记录
api.getConsultRecordByCustomerID = function (data) {
    return axios({
        url: `/consult/getConsultRecordByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 新增客户电话
api.addCustomerPhone = function (data) {
    return axios({
        url: `/customerDetails/addCustomerPhone`,
        method: 'POST',
        data: data
    })
}
// 修改客户电话
api.editCustomerPhone = function (data) {
    return axios({
        url: `/customerDetails/editCustomerPhone`,
        method: 'PUT',
        data: data
    })
}
// 移除客户电话
api.deleteCustomerPhone = function (data) {
    return axios({
        url: `/customerDetails/deleteCustomerPhone`,
        method: 'DELETE',
        data: data
    })
}
// 根据搜索条件以及员工ID获取来院登记列表
api.getCustomerComeLogsByEmployeeID = function (data) {
    return axios({
        url: `/customerComeLogs/getList`,
        method: 'GET',
        params: data
    })
}
// 添加来院登记记录
api.customerComeLogs = function (data) {
    return axios({
        url: `/customerComeLogs`,
        method: 'POST',
        data: data
    })
}
// 根据门店员工ID获取该门店可以分诊的门店总监
api.getSceneEmployeesByEmployeeID = function (data) {
    return axios({
        url: `/employees/getSceneEmployeesByEmployeeID`,
        method: 'GET',
        params: data
    })
}
// 根据门店员工ID获取职业列表
api.getSecondVocation = function (data) {
    return axios({
        url: `/VocationInfo/getSecondVocation`,
        method: 'GET',
        params: data
    })
}
// 根据是否有效获取了解途径
api.getUnderstandWaysByValid = function () {
    return axios({
        url: `/understandWays/getValidUnderstandWays`,
        method: 'GET'
    })
}
// 根据搜索条件以及员工ID获取确诊单列表
api.customerComeLogsGetList = function (data) {
    return axios({
        url: `/consumptions/getList`,
        method: 'GET',
        params: data
    })
}
// 新增项目确诊单
api.consumptions = function (data) {
    return axios({
        url: `/consumptions`,
        method: 'POST',
        data: data
    })
}
// 修改确诊单
api.modiefyConsumptions = function (id, data) {
    return axios({
        url: `/consumptions/${id}`,
        method: 'PUT',
        data: data
    })
}
// 根据ID获取确诊单信息&明细
api.getConsumptions = function (id) {
    return axios({
        url: `/consumptions/${id}`,
        method: 'GET'
    })
}
// 修改确诊单明细单价时，根据项目ID比较修改后的单价是否在价格区间内
api.getLowestPrice = function (id, price) {
    return axios({
        url: `/Items/${id}?price=${price}`,
        method: 'GET'
    })
}
// 根据搜索条件以及员工ID获取收费单据列表
api.chargeGetList = function (data) {
    return axios({
        url: `/charge/getList`,
        method: 'GET',
        params: data
    })
}
// 判断确诊单是否可以收费
api.isAllowCharge = function (data) {
    return axios({
        url: `/charge/isAllowCharge`,
        method: 'GET',
        params: data
    })
}
// 添加收费记录
api.addCharge = function (data) {
    return axios({
        url: `/charge`,
        method: 'POST',
        data: data
    })
}
// 浏览已收费的记录 (未收费无法浏览)
api.seeCharge = function (id) {
    return axios({
        url: `/charge/${id}`,
        method: 'GET'
    })
}
// 根据搜索条件以及员工ID获取咨询记录列表
api.consultGetList = function (data) {
    return axios({
        url: `/consult/getList`,
        method: 'GET',
        params: data
    })
}
// 添加咨询记录 (只可添加已存在客户的咨询记录,即客户不存在的话不允许添加咨询记录)
api.addConsult = function (data) {
    return axios({
        url: `/consult`,
        method: 'POST',
        data: data
    })
}
// 浏览咨询记录
api.seeConsult = function (id) {
    return axios({
        url: `/charge/${id}`,
        method: 'GET'
    })
}
// 根据搜索条件获取预交金列表
api.prepaymentsGetList = function (data) {
    return axios({
        url: `/prepayments/getList`,
        method: 'GET',
        params: data
    })
}
// 添加预交金充值记录
api.addPrepayments = function (data) {
    return axios({
        url: `/prepayments/Add`,
        method: 'POST',
        data: data
    })
}
// 修改预交金充值记录
api.EditPrepayments = function (data) {
    return axios({
        url: `/prepayments/Edit`,
        method: 'POST',
        data: data
    })
}
// 修改预交金充值时间
api.EditPrePaymentRechargeDate = function (data) {
    return axios({
        url: `/prepayments/EditDate`,
        method: 'POST',
        data: data
    })
}

// 浏览预交金充值记录
api.getPrepayments = function (id) {
    return axios({
        url: `/prepayments/${id}`,
        method: 'GET'
    })
};
// 计算退费数量是否正确并返回支付方式
api.compareRefundQuantity = function (data) {
    return axios({
        url: `/refunds/compareRefundQuantity`,
        method: 'GET',
        params: data
    })
};
// 获取现金支付方式 (预交金充值/退费,项目退费都只可使用现金支付方式)
api.getCashPayModes = function (data) {
    return axios({
        // url: `/payModes/getCashPayModes`,
        url: `/payModes/GetCashPayModes`,
        method: 'GET',
        params: data
    })
};

//退费时 绑定的支付方式接口 2019年10月23日14:37:47
api.getReturnMoneyPayMent = function (data) {
    return axios({
        url: `/payModes/getSupportCertainDocPayModes`,
        method: 'GET'
    })
};

// 获取现金支付方式 (预交金充值/退费,项目退费都只可使用现金支付方式)
api.getCashPayModesV1 = function (data) {
    return axios({
        // url: `/payModes/getCashPayModes`,
        url: `/payModes/GetCashPayModesV1`,
        method: 'GET',
        params: data
    })
};
// 获取支付方式
api.getAllPayModelInfoSupportCertain = function (data) {
    return axios({
        url: `/payModes/getSupportCertainDocPayModes`,
        method: 'GET',
        params: data
    })
}
// 浏览预交金充值记录
api.seeCashPayModes = function (id) {
    return axios({
        url: `/prepayments/${id}`,
        method: 'GET'
    })
}
// 获取预交金退费列表
api.refundsPrepayments = function (data) {
    return axios({
        url: `/refundsPrepayments/getList`,
        method: 'GET',
        params: data
    })
}
// 添加预交金退费记录
api.addRefundsPrepayments = function (data) {
    return axios({
        url: `/refundsPrepayments`,
        method: 'POST',
        data: data
    })
}
// 浏览预交金退费记录
api.lookRefundsPrepayments = function (id) {
    return axios({
        url: `/refundsPrepayments/${id}`,
        method: 'GET'
    })
}
// 获取确诊单退费列表
api.refundsGetList = function (data) {
    return axios({
        url: `/refunds/getList2`,
        method: 'GET',
        params: data
    })
}
// 添加退费记录
api.addTfRefundsPrepayments = function (data) {
    return axios({
        url: `/refunds`,
        method: 'POST',
        data: data
    })
}
// 根据项目Id，将客户的项目执行次数清0
api.ClearItemNum = function (data) {
    return axios({
        url: `/refunds/ClearItemNum`,
        method: 'POST',
        data: data
    })
}

// 根据客户ID获取可退费项目列表
api.getRefundableCertainDocListByCustomerID = function (data) {
    return axios({
        url: `/refunds/getRefundableCertainDocListByCustomerID`,
        method: 'GET',
        params: data
    })
}
//浏览退费记录
api.RefundsPrepayments = function (id) {
    return axios({
        url: `/refunds/${id}`,
        method: 'GET'
    })
}
// 浏览欠款回收
api.seeRefundsPrepayments = function (id) {
    return axios({
        url: `/arrearsRecovery/GetArrearsSingleInfo?Id=${id}`,
        method: 'GET'
    })
}
// 获取客户消费明细表列表
api.consumptionSchedule = function (data) {
    return axios({
        url: `/consumptionSchedule/getList`,
        method: 'GET',
        params: data
    })
}
// 获取财务收入表数据
api.getFinancialIncomeStatement = function (data) {
    return axios({
        url: `/finance/getFinancialIncomeStatement`,
        method: 'GET',
        params: data
    })
}

// 获取财务收入确认列表查询  2019年12月28日10:55:58 ly
api.RevenueCheckList = function (data) {
    return axios({
        url: `/finance/StoreDetail`,
        method: 'GET',
        params: data
    })
}

// 获取仓库出库明细
api.OutProductDetail = function (data) {
    return axios({
        url: `/finance/OutProductDetail`,
        method: 'GET',
        params: data
    })
}

//2019年12月27日17:18:00  把财务收入明细 修改成 到账金额查询
api.RevenueMoney = function (data) {
    return axios({
        url: `/finance/RevenueMoney`,
        method: 'GET',
        params: data
    })
}

// 获取出纳结算单数据
api.getCashierStatement = function (data) {

    return axios({
        url: `/finance/getCashierStatement`,
        method: 'GET',
        params: data
    })
}
//护理师手工数页面 双击某个护理师查询对应的业绩明细 2019年11月28日14:05:44 ly
api.QueryBeauticianItemDetail = function (data) {
    return axios({
        url: `/executionRecord/QueryBeauticianItemDetail`,
        method: 'GET',
        params: data
    })
}

//查询小程序数据
api.getwechartItemDetail = function (data) {
    return axios({
        url: `/executionRecord/ManualAchievement`,
        method: 'GET',
        params: data
    })
}
//护理师手工数 中查询客户被执行明细
api.QueryBeactionExtCust = function (data) {
    return axios({
        url: `/executionRecord/QueryBeactionExtCust`,
        method: 'GET',
        params: data
    })
}

//获取美容师业绩单 2019年11月27日09:30:50 liyan 修改成新的接口
// api.getBeauticianAchievements = function (data) {
//     return axios({
//         url: `/executionRecord/getBeauticianAchievement`,
//         method: 'GET',
//         params: data
//     })
// }
api.getAreaBeauticianNum = function (data) {
    return axios({
        url: `/executionRecord/AreaBeauticianNum`,
        method: 'GET',
        params: data
    })
}
// 获取支付明细表
api.paymentSchedule = function (data) {
    return axios({
        url: `/paymentSchedule`,
        method: 'GET',
        params: data
    })
}
// 获取预约客户列表
api.reservationGetList = function (data) {
    return axios({
        url: `/reservation/getList`,
        method: 'GET',
        params: data
    })
}
// 添加预约记录
api.addReservation = function (data) {
    return ({
        url: `/reservation`,
        method: 'POST',
        data: data
    })
}
// 取消预约
api.cancelRecord = function (data) {
    return axios({
        url: `reservation/cancelReservation`,
        method: 'PUT',
        data: data
    })
}
// 获取待执行记录列表
api.waitForExecuteRecordGetList = function (data) {
    return axios({
        url: `/waitForExecuteRecord/getList`,
        method: 'GET',
        params: data
    })
}
// 获取一条待执行记录信息
api.getWaitForExecuteRecord = function (id, data) {
    return axios({
        url: `/waitForExecuteRecord/${id}`,
        method: 'GET',
        params: data
    })
}
// 添加执行记录
api.addExecutionRecord = function (data) {
    return axios({
        url: `/waitForExecuteRecord`,
        method: 'POST',
        data: data
    })
}
// 获取治疗仪器列表
api.getDevices = function () {
    return axios({
        url: `/devices/getValidDevices`,
        method: 'GET'
    })
}
// 获取治疗记录列表
api.executionRecordGetList = function (data) {
    return axios({
        url: `/executionRecord/getList`,
        method: 'GET',
        params: data
    })
}
//获取治疗记录列表新接口
api.executionRecordGetListNew = function (data) {
    return axios({
        url: `/executionRecord/getListNew`,
        method: 'GET',
        params: data
    })
}

//打印报表数据
api.printReport = function (data) {
    return axios({
        url: `/report/reportDateConsume/`,
        method: 'GET',
        params: data
    })
}

// 取消一条执行记录
api.CancleExecutionRecord = function (id, data) {
    return axios({
        url: `/executionRecord/${id}`,
        method: 'PUT',
        data: data
    })
}
// 浏览一条执行记录
api.seeExecutionRecord = function (id) {
    return axios({
        url: `/executionRecord/${id}`,
        method: 'GET'
    })
}
// 浏览运营数据平台
api.operationalDataPlatform = function (data) {
    return axios({
        url: `/operationalDataPlatform`,
        method: 'GET',
        params: data
    })
}
// 获取有效来源渠道(下拉框)
api.getValidChannels = function () {
    return axios({
        url: `/channels/getValidChannels`,
        method: 'GET'
    })
}
// 获取区域门店(下拉框)
api.GetAllStoreInfo = function (data) {
    return axios({
        url: `/positions/GetCityIdByAllStoreInfo`,
        method: 'GET',
        params: data
    })
}
// 多ID获取区域门店(下拉框)
api.getStoreInfoCity = function (data) {
    return axios({
        url: `/positions/getStoreInfoCity`,
        method: 'POST',
        data: data
    })
}
// 获取区域(下拉框)
api.GetAllCityInfo = function () {
    return axios({
        url: `/positions/GetAllCityInfo`,
        method: 'GET'
    })
}
// 新获取区域(下拉框)
api.NewGetAllCityInfo = function (data) {
    return axios({
        url: `/NewReport/getAreaAndStoreInfo`,
        method: 'GET',
        params: data
    })
}
// 根据区域获取门店(下拉框)
api.baogetEmployeeByAllStoreInfo = function (data) {
    return axios({
        url: `/NewReport/getEmployeeByAllStoreInfo`,
        method: 'GET',
        params: data
    })
}
// 获取咨询项目列表  （普通用户）（下拉框）
api.getValidSubCategories = function () {
    return axios({
        url: `/ItemCategories/getValidSubCategories`,
        method: 'GET'
    })
}
// 获取有效门店(下拉框)
api.getValidStores = function () {
    return axios({
        url: `/stores/getValidStores`,
        method: 'GET'
    })
}
api.getValidStoresNew = function (data) {
    return axios({
        url: `/positions/GetEmployeeByAllStoreInfo`,
        method: 'GET',
        params: data
    })
}

//根据当前人id 获取级联门店 2019年12月28日15:16:56
api.GetCascaderStore = function (data) {
    return axios({
        url: `/stores/FinMangeStore`,
        method: 'GET',
        params: data
    })
}
//根据门店查询当前门店的客户
api.ByStoreAutoQueryCust = function (data) {
    return axios({
        url: `/customers/ByStoreAutoQueryCust?CustomerName=` + data,
        method: 'GET'
    })
}

//根据客户查询客户对应的护理师
api.ByCustIdQueryBeautician = function (data) {
    return axios({
        url: `/customers/ByCustIdQueryBeautician`,
        method: 'GET',
        params: data
    })
}

// 获取客户列表
api.getCustomersList = function (data) {
    return axios({
        url: `/customers/getList`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取客户基础信息
api.getCustomerDetail = function (data) {
    return axios({
        url: `/customerDetails/getCustomerBaseInfoByCustomerID`,
        method: 'GET',
        params: data
    })
}


api.getCustomerDetail1 = function (data) {
    return axios({
        url: `/customerTransfer/getCustomerInfo`,
        method: 'GET',
        params: data
    })
}
api.getCustomerDetail2 = function (data) {
    return axios({
        url: `/customerTransfer/GetCustomerAuditChangePractitioner`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取客户账户信息
api.getCustomerAccountInfo = function (data) {
    return axios({
        url: `/customerDetails/getCustomerAccountInfoByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取到店登记列表
api.getComeLogList = function (data) {
    return axios({
        url: `/customerDetails/getComeLogListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取追踪回访列表
api.getFollowUpList = function (data) {
    return axios({
        url: `/customerDetails/getFollowUpListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取消费明细列表
api.getCustomerConsumptionList = function (data) {
    return axios({
        url: `/customerDetails/getCustomerConsumptionListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取执行记录列表
api.getExecuteList = function (data) {
    return axios({
        url: `/customerDetails/getExecuteListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取预约记录列表
api.getReserveListByCustomerID = function (data) {
    return axios({
        url: `/customerDetails/getReserveListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取咨询记录列表
api.getConsultList = function (data) {
    return axios({
        url: `/customerDetails/getConsultListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取未还欠款列表
api.getUnPaidDebtList = function (data) {
    return axios({
        url: `/customerDetails/getUnPaidDebtListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取追踪计划列表
api.getFollowUpPlanList = function (data) {
    return axios({
        url: `/customerDetails/getFollowUpPlanListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 根据客户编号获取客户标签列表
api.getCustomerTagListByCustomerID = function (data) {
    return axios({
        url: `/customerDetials/getCustomerTagListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 获取客户标签列表（下拉框）
api.getCustomerTagDropdownList = function (data) {
    return axios({
        url: `/customerTags/getDropdownList`,
        method: 'GET',
        params: data
    })
}
// 新增客户标签
api.addCustomerTag = function (data) {
    return axios({
        url: `/customerDetails/addCustomerTag`,
        method: 'POST',
        data: data
    })
}
// 移除客户标签
api.deleteCustomerTag = function (id, data) {
    return axios({
        url: `/customerDetails/deleteCustomerTag/${id}`,
        method: 'DELETE',
        data: data
    })
}
// 根据客户编号获取照片列表
api.getMedicalPhotoInfoByCustomerID = function (data) {
    return axios({
        url: `/medicalPhoto/getMedicalPhotoInfoByCustomerID`,
        method: 'GET',
        params: data
    })
}
api.getMedicalPhotoInfoByCustomerID2 = function (data) {
    return axios({
        url: `/medicalPhoto/getMedicalPhotoInfoByCustomerID2`,
        method: 'GET',
        params: data
    })
}
// 根据编号获取照片
api.getSingleMedicalPhoto = function (id) {
    return axios({
        url: `/medicalPhoto/${id}`,
        method: 'GET'
    })
}
// 修改客户基础信息
api.editCustomerBaseInfo = function (data) {
    return axios({
        url: `/customerDetails/editCustomerBaseInfo`,
        method: 'PUT',
        data: data
    })
}
// 修改客户头像
api.editCustomerAvatar = function (data) {
    return axios({
        url: `/customerDetails/editCustomerHeadImage`,
        method: 'PUT',
        data: data
    })
}
// 浏览运营数据平台
api.getOperationalDataPlatform = function (data) {
    return axios({
        url: `/operationalDataPlatform`,
        method: 'GET',
        params: data
    })
}
//运营数据平台获取区域列表
api.getCityList = function (data) {
    return axios({
        url: `/region/getCityList`,
        method: 'GET',
        params: data
    })
}
// 获取预约类型
api.getReserveType = function (data) {
    return axios({
        url: `/reservation/getReserveType`,
        method: 'GET',
        params: data
    })
}
// 添加到店预约
api.addToShopReservation = function (data) {
    return axios({
        url: `/reservation/addToShopReservation`,
        method: 'POST',
        data: data
    })
}
// 获取已购项目列表
api.getCustomerPurchasedItems = function (data) {
    return axios({
        url: `/items/getCustomerPurchasedItems`,
        method: 'GET',
        params: data
    })
}
// 获取未购项目列表(有效项目)
api.getReserveItemInfo = function (data) {
    return axios({
        url: `/items/getReserveItemInfo`,
        method: 'GET',
        params: data
    })
}
// 获取工作时间定义列表（有效的）
api.getValidWorkHoursDefintion = function (data) {
    return axios({
        url: `/workHoursDefintion/getValidWorkHoursDefintion`,
        method: 'GET',
        params: data
    })
}
// 获取工作时间定义列表
api.getWorkHoursDefintionList = function (data) {
    return axios({
        url: `/workHoursDefintion/getList`,
        method: 'GET',
        params: data
    })
}
// 获取工作时间定义列表
api.getShiftsDropdownList = function (data) {
    return axios({
        url: `/employeeShifts/getDropdownList`,
        method: 'GET',
        params: data
    })
}
// 修改工作时间定义
api.modefyShifts = function (id, data) {
    return axios({
        url: `/workHoursDefintion/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取班次下拉框
api.getShift = function (data) {
    return axios({
        url: `/employeeShifts/getDropdownList`,
        method: 'GET',
        params: data
    })
}
// 添加工作时间定义记录
api.customTime = function (data) {
    return axios({
        url: `/workHoursDefintion`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取工作时间定义详情
api.getCustomTime = function (id) {
    return axios({
        url: `/workHoursDefintion/${id}`,
        method: 'GET'
    })
}
// 获取意向消费项目下拉框
api.getProject = function (data) {
    return axios({
        url: `/ItemCategories/getValidSubCategories`,
        method: 'GET',
        params: data
    })
}
// 获取意向消费级别列表
api.getLevel = function (data) {
    return axios({
        url: `/customerDetails/getConsumIntentionLevelList`,
        method: 'GET',
        params: data
    })
}
// 获取意向消费项目列表
api.getIntentionList = function (data) {
    return axios({
        url: `/customerDetails/getConsumIntentionListByCustomerID`,
        method: 'GET',
        params: data
    })
}
// 新增意向消费项目
api.newAddIntention = function (data) {
    return axios({
        url: `/customerDetails/addConsumIntention`,
        method: 'POST',
        data: data
    })
}
// 修改意向消费列表
api.editIntention = function (id, data) {
    return axios({
        url: `customerDetails/editConsumIntention/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取单条
api.getItemIntention = function (id, data) {
    return axios({
        url: `customerDetails/getConsumIntentionByID/${id}`,
        method: 'GET',
        params: data
    })
}
// 查看排班
api.getSeeHuman = function (data) {
    return axios({
        url: `employeeSchedules/getStoreShiftEmployeesByEmployeeID`,
        method: 'GET',
        params: data
    })
}
// 查看当月排班
api.getCurrentSch = function (data) {
    return axios({
        url: `employeeSchedules/getMonthScheduleInfoByEmployeeIDAndDate`,
        method: 'GET',
        params: data
    })
}
// 获取可预约美容师列表
api.getBeauticianList = function (data) {
    return axios({
        url: `employees/getReserveEmployee`,
        method: 'GET',
        params: data
    })
}
// 根据员工编号和日期获取员工的工作时间段
api.getReservableList = function (data) {
    return axios({
        url: `employeeSchedules/getScheduleTimeDetailsByEmployeeID`,
        method: 'GET',
        params: data
    })
}
// 获取可预约工作时间段编号列表
api.chooseTimeSlot = function (data) {
    return axios({
        url: `employeeSchedules/calculateReservationPeriod`,
        method: 'GET',
        params: data
    })
}
// 添加治疗预约
api.sureTreatment = function (data) {
    return axios({
        url: `reservation/addTreatmentReservation`,
        method: 'POST',
        data: data
    })
}
// 客户状态来人业绩表（项目分类）
api.getCustomerStatusList = function (data) {
    return axios({
        url: `CustomerStatusArrivalPerformanceByItemClassification`,
        method: 'GET',
        params: data
    })
}
// 待追踪计划 | 获取列表
api.getTrackPlanList = function (data) {
    return axios({
        url: `waitForFollowUpRecords/getList`,
        method: 'GET',
        params: data
    })
}
// 新增待追踪计划
api.addTrackPlan = function (data) {
    return axios({
        url: `waitForFollowUpRecords/addSingleData`,
        method: 'POST',
        data: data
    })
}
// 获取追踪记录列表
api.getTrackRecordList = function (data) {
    return axios({
        url: `followedUpRecords/getList`,
        method: 'GET',
        params: data
    })
}
// 获取追踪工具 (下拉框)
api.getTrackToolsList = function (data) {
    return axios({
        url: `followUpTools/getDropdownList`,
        method: 'GET',
        params: data
    })
}
// 获取追踪状态 (下拉框)
api.getTrackStatusList = function (data) {
    return axios({
        url: `followUpStatus/getDropdownList`,
        method: 'GET',
        params: data
    })
}
// 新增追踪记录 (常规追踪)
api.addRegularTrackRecord = function (data) {
    return axios({
        url: `followUpRecords/addRegularRecords`,
        method: 'POST',
        data: data
    })
}
// 新增追踪记录 (常规追踪)
api.addRegularTrackRecord = function (data) {
    return axios({
        url: `followUpRecords/addRegularRecords`,
        method: 'POST',
        data: data
    })
}
// 修改用户密码
api.editEmployeePassword = function (data) {
    return axios({
        url: `/employees/editPassword`,
        method: 'PUT',
        data: data
    })
}
//添加欠款回收
api.addArrearsRepayment = function (data) {
    return axios({
        url: '/arrearsRecovery/Add',
        method: 'POST',
        data: data
    })
}
//修改欠款回收
api.arrearsRecoveryEdit = function (data) {
    return axios({
        url: '/arrearsRecovery/Edit',
        method: 'POST',
        data: data
    })
}
//获取欠款回收列表
api.getArrearsRepaymentList = function (data) {
    return axios({
        url: '/arrearsRecovery/getList',
        method: 'GET',
        params: data
    })
}
//根据客户编号获取该客户欠款项目列表
api.getCustomerArrearsListByCustomerID = function (data) {
    return axios({
        url: '/arrearsRecovery/getCustomerArrearsListByCustomerID',
        method: 'GET',
        params: data
    })
}
//获取家居化妆品报表数据
api.getHomeMakeUpReport = function (data) {
    return axios({
        url: '/homeMakeUpReport',
        method: 'GET',
        params: data
    })
}
//获取家居化妆品报表数据
api.getArrearsReport = function (data) {
    return axios({
        url: '/arrearsReport',
        method: 'GET',
        params: data
    })
}
//客服业绩
api.ConsumptionSum = function (data) {
    return axios({
        url: '/report/ConsumptionSum',
        method: 'GET',
        params: data
    })
}
//客服业绩总详情
api.ConsumptionSumDetails = function (data) {
    return axios({
        url: '/report/ConsumptionSumDetails',
        method: 'GET',
        params: data
    })
}
//客服顾客详情
api.ConsumptionACsum = function (data) {
    return axios({
        url: '/report/ConsumptionACsum',
        method: 'GET',
        params: data
    })
}

//获取支付方式列表
api.getPayModeList = function (data) {
    return axios({
        url: '/payModes/getAllPayModes',
        method: 'GET',
        params: data
    })
}
//添加支付方式
api.addPayMode = function (data) {
    return axios({
        url: '/payModes',
        method: 'POST',
        data: data
    })
}
//修改支付方式
api.editPayMode = function (id, data) {
    return axios({
        url: `/payModes/${id}`,
        method: 'PUT',
        data: data
    })
}
//获取单个支付方式
api.getSingleChannels = function (id) {
    return axios({
        url: `/payModes/${id}`,
        method: 'GET'
    })
}

//获取出库产品列表
api.getOutStorageList = function (data) {
    return axios({
        url: '/OutStorage/GetList',
        method: 'GET',
        params: data
    })
}
//勾选出库产品列表
api.selectProduct = function (data) {
    return axios({
        url: '/OutStorage/GetProducts',
        method: 'GET',
        params: data
    })
}
// 获取出库供应商列表
api.selectCustoms = function (data) {
    return axios({
        url: '/OutStorage/GetCustoms',
        method: 'GET',
        params: data
    })
}
//保存出库单
api.SeaveOutProduct = function (data) {
    return axios({
        url: `/OutStorage/Add`,
        method: 'POST',
        data: data
    })
}
//修改出库单详情
api.UpdataOutProduct = function (data) {
    return axios({
        url: `/OutStorage/GetEditNum`,
        method: 'GET',
        params: data
    })
}
//修改出库单保存
api.EditOutProduct = function (data) {
    return axios({
        url: `/OutStorage/Edit`,
        method: 'POST',
        data: data
    })
}
//审核出库单
api.AuditOutProduct = function (data) {
    return axios({
        url: `/OutStorage/Audit`,
        method: 'POST',
        data: data
    })
}
//获取入库产品列表
api.getInStorageList = function (data) {
    return axios({
        url: '/InStorage/GetList',
        method: 'GET',
        params: data
    })
}
//勾选入库产品列表
api.selectInProduct = function (data) {
    return axios({
        url: '/InStorage/GetProducts',
        method: 'GET',
        params: data
    })
}
// 入库获取供应商列表
api.selectInCustoms = function (data) {
    return axios({
        url: '/InStorage/GetSuppliers',
        method: 'GET',
        params: data
    })
}
//保存入库单
api.SeaveInProduct = function (data) {
    return axios({
        url: `/InStorage/Add`,
        method: 'POST',
        data: data
    })
}
//修改入库单详情
api.UpdataInProduct = function (data) {
    return axios({
        url: `/InStorage/GetEditNum`,
        method: 'GET',
        params: data
    })
}
//修改入库单保存
api.EditInProduct = function (data) {
    return axios({
        url: `/InStorage/Edit`,
        method: 'POST',
        data: data
    })
}
//审核入库单
api.AuditInProduct = function (data) {
    return axios({
        url: `/InStorage/Audit`,
        method: 'POST',
        data: data
    })
}
//统计新客（项目）、跟踪客（项目）、老客（项目）、家具（产品）的业绩金额和占比的饼图
api.getManageDataBT = function (data) {
    return axios({
        url: `/finance/getManageData`,
        method: 'GET',
        params: data
    })
}
//经营数据-单店	统计全部客户里各个项目的分类的总业绩金额和占比的饼图
api.getCustomerItemCategoryAllTotal = function (data) {
    return axios({
        url: `/finance/getCustomerItemCategoryAllTotal`,
        method: 'GET',
        params: data
    })
}

//护理师业绩客户占比
api.getAllEmployeePerformanceFromStore = function (data) {
    return axios({
        url: `/consumptions/getAllEmployeePerformanceFromStore`,
        method: 'GET',
        params: data
    })
}
//到店人数分类占比
api.getAllEmployeeCustomerTypePerformanceFromStore = function (data) {
    return axios({
        url: `/consumptions/getAllEmployeeCustomerTypePerformanceFromStore`,
        method: 'GET',
        params: data
    })
}
//到店人数分类占比
api.getCustomerComeNums = function (data) {
    return axios({
        url: `/customerComeLogs/getCustomerComeNums`,
        method: 'GET',
        params: data
    })
}
//获取数据列表---业绩目标
api.PerformanceTarget = function (data) {
    return axios({
        url: `/PerformanceTarget/getList`,
        method: 'GET',
        params: data
    })
}
//获取修改单条数据列表 ---业绩目标
api.PerformanceTargetgetModel = function (data) {
    return axios({
        url: `/PerformanceTarget/getModel`,
        method: 'GET',
        params: data
    })
}
//保存修改单条数据---业绩目标
api.PerformanceTargetEdit = function (data) {
    return axios({
        url: `/PerformanceTarget/Edit`,
        method: 'POST',
        data: data
    })
}
//保存添加数据---业绩目标
api.PerformanceTargetAdd = function (data) {
    return axios({
        url: `/PerformanceTarget/Add`,
        method: 'POST',
        data: data
    })
}
// //获取区域列表
// api.getCityInfo = function () {
//     return axios({
//         url: `/NewReport/getCityInfo`,
//         method: 'GET',
//     })
// }
//护理客执行排名
api.getReviewCustNum = function (data) {
    return axios({
        url: `/NewReport/getReviewCustNum`,
        method: 'GET',
        params: data
    })
}
//跟踪客业绩排名
api.getTrackCustAmount = function (data) {
    return axios({
        url: `/NewReport/getTrackCustAmount`,
        method: 'GET',
        params: data
    })
}
//新客到店排名
api.getStoreInfoNewCust = function (data) {
    return axios({
        url: `/NewReport/getStoreInfoNewCust`,
        method: 'GET',
        params: data
    })
}
//新客业绩排名
api.getNewCustAmount = function (data) {
    return axios({
        url: `/NewReport/getNewCustAmount`,
        method: 'GET',
        params: data
    })
}
//新客客单排名
api.AreaNewPerCustomerTransactionV2 = function (data) {
    return axios({
        url: `/report/AreaNewPerCustomerTransactionV2`,
        method: 'GET',
        params: data
    })
}
//总客单排名
api.AreaPerCustomerTransactionV2 = function (data) {
    return axios({
        url: `/report/AreaPerCustomerTransactionV2`,
        method: 'GET',
        params: data
    })
}
//老客业绩排名
api.getOldCustAmount = function (data) {
    return axios({
        url: `/NewReport/getOldCustAmount`,
        method: 'GET',
        params: data
    })
}
//产品业绩排名
api.getProductAchievement = function (data) {
    return axios({
        url: `/NewReport/getProductAchievement`,
        method: 'GET',
        params: data
    })
}
//物资名称
api.getCategory = function (data) {
    return axios({
        url: `/NewReport/getCategory`,
        method: 'GET',
        params: data
    })
}
// 获取 新客户到店的来源渠道，全部客户里各个渠道分类，新客到店人数的项目分类 报表统计
api.NewConsumeChannelInfoReport = function (data) {
    return axios({
        url: `/report/NewConsumeChannelInfoReport`,
        method: 'GET',
        params: data
    })
}

// 各项目分类中新客的成单率  新客成单率=新客成交人数/新客人数
api.NewCustmerConsumeReport = function (data) {
    return axios({
        url: `/report/NewCustmerConsumeReport`,
        method: 'GET',
        params: data
    })
}
// 各项目的客单价柱形图
api.CustmerConsumeItemReport = function (data) {
    return axios({
        url: `/report/CustmerConsumeItemReport`,
        method: 'GET',
        params: data
    })
}
// 渠道分类成交率  
api.GetNewCustChannelNum = function (data) {
    return axios({
        url: `/NewReport/GetNewCustChannelNum`,
        method: 'GET',
        params: data
    })
}
// 顾客分类占比 
api.GetAllCustomerType = function (data) {
    return axios({
        url: `/customers/GetAllCustomerType`,
        method: 'GET',
        params: data
    })
}
// 项目分类成交率  
api.AreaNewCustomerItemReport = function (data) {
    return axios({
        url: `/report/AreaNewCustomerItemReport`,
        method: 'GET',
        params: data
    })
}
// 业绩提升统计  
api.GetStoreTimeAmount = function (data) {
    return axios({
        url: `/NewReport/GetStoreTimeAmount`,
        method: 'GET',
        params: data
    })
}
// 新客渠道分类成交率  
api.getConsumptionCustKeDan = function (data) {
    return axios({
        url: `/NewReport/getConsumptionCustKeDan`,
        method: 'GET',
        params: data
    })
}
//  新客成交率排名
api.AreaNewCustomerCompletionRateReport = function (data) {
    return axios({
        url: `/report/AreaNewCustomerCompletionRateReport`,
        method: 'POST',
        data: data
    })
}
//  业绩比例统计
api.AreaCustomerperformanceReportResult = function (data) {
    return axios({
        url: `/report/AreaCustomerperformanceReportResult`,
        method: 'GET',
        params: data
    })
}
//  新客项目分类
api.AreaNewCustomerItemConsumeReport = function (data) {
    return axios({
        url: `/report/AreaNewCustomerItemConsumeReport`,
        method: 'GET',
        params: data
    })
}
//  总业绩排名
api.AreaImprotReport = function (data) {
    return axios({
        url: `/report/AreaImprotReport`,
        method: 'POST',
        data: data
    })
}
//  完成率排名
api.AreaPerformanceCompletionRateReport = function (data) {
    return axios({
        url: `/report/AreaPerformanceCompletionRateReport`,
        method: 'GET',
        params: data
    })
}
//  获取门店的支付方式
api.PaymentList = function (data) {
    return axios({
        url: `/StoreForPayModes/getList`,
        method: 'GET',
        params: data
    })
}
//  添加门店的支付方式
api.AddPaymentList = function (data) {
    return axios({
        url: `/StoreForPayModes/Add`,
        method: 'POST',
        data: data
    })
}
//  修改门店的支付方式
api.EditPaymentList = function (data) {
    return axios({
        url: `/StoreForPayModes/Edit`,
        method: 'POST',
        data: data
    })
}
//  获取门店的支付方式
api.LocationProduct = function (data) {
    return axios({
        url: `/LocationProduct/GetList`,
        method: 'GET',
        params: data
    })
}
//  获取渠道列表
api.getUnderstandWayInfo = function (data) {
    return axios({
        url: `/NewReport/getUnderstandWayInfo`,
        method: 'GET',
        params: data
    })
}
// ------
api.GetRemindReceiveGood = function (data) {
    return axios({
        url: `/StoreApplyGoods/GetRemindReceiveGood`,
        method: 'GET',
        params: data
    })
}


//  获取申请单列表
api.StoreApplyGoods = function (data) {
    return axios({
        url: `/StoreApplyGoods/getList`,
        method: 'GET',
        params: data
    })
}
//  获取单条记录详情
api.StoreApplyGoodsOne = function (data) {
    return axios({
        url: `/StoreApplyGoods/getByid`,
        method: 'GET',
        params: data
    })
}
//  保存添加单条申请
api.StoreApplyGoodsAdd = function (data) {
    return axios({
        url: `/StoreApplyGoods/Add`,
        method: 'POST',
        data: data
    })
}
//  修改保存添加单条申请
api.StoreApplyGoodsEdit = function (data) {
    return axios({
        url: `/StoreApplyGoods/Edit`,
        method: 'POST',
        data: data
    })
}
//  审核单条申请
api.StoreApplyGoodsAudit = function (data) {
    return axios({
        url: `/StoreApplyGoods/Audit`,
        method: 'POST',
        data: data
    })
}
//  收货单条申请
api.StoreApplyGoodsConfirm = function (data) {
    return axios({
        url: `/StoreApplyGoods/Confirm`,
        method: 'POST',
        data: data
    })
}
// -----
//保存修改单条门店进销存
api.LocationProductupdateTime = function (data) {
    return axios({
        url: `/LocationProduct/updateTime`,
        method: 'POST',
        data: data
    })
}
//  获取欠款列表
api.getArrearsCustList = function (data) {
    return axios({
        url: `/arrearsRecovery/getArrearsCustList`,
        method: 'GET',
        params: data
    })
}
//  获取护理师业绩列表
api.NursingPerformanceTarget = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/getList`,
        method: 'GET',
        params: data
    })
}
//  保存添加护理师业绩
api.NursingPerformanceTargetAdd = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/Add`,
        method: 'POST',
        data: data
    })
}
//  获取单个护理师业绩目标列表
api.NursingPerformanceTargetgetModel = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/getModel`,
        method: 'GET',
        params: data
    })
}
//  保存修改护理师业绩
api.NursingPerformanceTargetEdit = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/Edit`,
        method: 'POST',
        data: data
    })
}
//  门店经理审核护理师业绩目标
api.NursingPerformanceTargetAuditStep1 = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/AuditStep1`,
        method: 'POST',
        data: data
    })
}
//  查看每条数据的审核过程
api.NursingPerformanceTargetAuditgetAuditList = function (data) {
    return axios({
        url: `/AuditLog/getAuditList`,
        method: 'GET',
        params: data
    })
}
//  区域经理查看护理师业绩列表
api.GetStorePerformanceTarget = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/GetStorePerformanceTarget`,
        method: 'GET',
        params: data
    })
}
//  区域经理查看护理师业绩详情
api.GetWaitAuditDetail = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/GetWaitAuditDetail`,
        method: 'GET',
        params: data
    })
}
//  保存区域经理审核护理师业绩
api.GetStorePerformanceTargetAuditStep2 = function (data) {
    return axios({
        url: `/NursingPerformanceTarget/AuditStep2`,
        method: 'POST',
        data: data
    })
}
//  获取减免金额列表
api.consumptionsReadList = function (data) {
    return axios({
        url: `/consumptions/readList`,
        method: 'GET',
        params: data
    })
}
//  审阅单条减免金额
api.consumptionsAudit = function (data) {
    return axios({
        url: `/consumptions/Audit`,
        method: 'POST',
        data: data
    })
}
//  添加标签  
api.EnumCRMTagTypeAdd = function (data) {
    return axios({
        url: `/EnumCRMTagType/Add`,
        method: 'POST',
        data: data
    })
}
// 修改标签
api.EnumCRMTagTypeUpdate = function (data) {
    return axios({
        url: `/EnumCRMTagType/Update`,
        method: 'PUT',
        data: data
    })
}


// 门店经理可以查看收货单金额
api.StoreApplyGoodsOrderTotal = function (data) {
    return axios({
        url: `/StoreApplyGoods/OrderTotal`,
        method: 'GET',
        params: data
    })
}
// 
api.getDemo = function (data) {
    return axios({
        url: `/NewReport/getDemo`,
        method: 'GET',
        params: data
    })
}
// 获取获取盘点单列表 
api.StoreWarehousecheckList = function (data) {
    return axios({
        url: `/StoreWarehouse/checkList`,
        method: 'GET',
        params: data
    })
}
// 添加盘点单
api.StoreWarehouseAdd = function (data) {
    return axios({
        url: `/StoreWarehouse/Add`,
        method: 'POST',
        data: data
    })
}
// 获取获取单个盘点单中物资情况
api.getDetailByOrderNum = function (data) {
    return axios({
        url: `/StoreWarehouse/getDetailByOrderNum`,
        method: 'GET',
        params: data
    })
}
// 修改保存单个盘点单中物资情况
api.StoreWarehouseEdit = function (data) {
    return axios({
        url: `/StoreWarehouse/Edit`,
        method: 'POST',
        data: data
    })
}
// 修改数量或者删除某个盘点数据
api.StoreWarehouseEditNum = function (data) {
    return axios({
        url: `/StoreWarehouse/EditNum`,
        method: 'POST',
        data: data
    })
}
// 复核某个盘点单
api.StoreWarehouseAuditStep1 = function (data) {
    return axios({
        url: `/StoreWarehouse/AuditStep1`,
        method: 'POST',
        data: data
    })
}
// 审核某个盘点单
api.StoreWarehouseAudit = function (data) {
    return axios({
        url: `/StoreWarehouse/Audit`,
        method: 'POST',
        data: data
    })
}
// 审核某个盘点单
api.GoodsConsumeLogs = function (data) {
    return axios({
        url: `/Logs/GoodsConsumeLogs`,
        method: 'GET',
        params: data
    })
}
// 获取购买项目列表
api.PresentGoodsGetItemList = function (data) {
    return axios({
        url: `/presentGoods/getItemList`,
        method: 'GET',
        params: data
    })
}
// 添加赠送物资
api.PresentGoodsAdd = function (data) {
    return axios({
        url: `/presentGoods/add`,
        method: 'POST',
        data: data
    })
}
// 获取赠送物资申请单
api.PresentGoodsgetList = function (data) {
    return axios({
        url: `/presentGoods/getList`,
        method: 'GET',
        params: data
    })
}
// 审核申请单
api.PresentGoodsAudit = function (data) {
    return axios({
        url: `/presentGoods/Audit`,
        method: 'POST',
        data: data
    })
}
// 区域经理审核申请单
api.AuditByAreaAudit = function (data) {
    return axios({
        url: `/StoreApplyGoods/AuditByAreaAudit`,
        method: 'POST',
        data: data
    })
}
// 获取赠送物资申请单
api.GetListFinance = function (data) {
    return axios({
        url: `/executionRecord/GetListFinance`,
        method: 'GET',
        params: data
    })
}
// 客户库存
api.getCustProjectSurplusNum = function (data) {
    return axios({
        url: `/waitForExecuteRecord/getCustProjectSurplusNum`,
        method: 'GET',
        params: data
    })
}
// 导出客户库存
api.waitForExecuteRecordToExcel = function (data) {
    return axios({
        url: `/waitForExecuteRecord/ToExcel`,
        method: 'GET',
        params: data
    })
}
// 项目支付管理
api.upChargeDocDetails = function (data) {
    return axios({
        url: `/charge/upChargeDocDetails`,
        method: 'POST',
        data: data
    })
}
// 根据登录人ID查询护理师列表
api.getBeauticiansByEmployeeID = function (data) {
    return axios({
        url: `/employees/getBeauticiansByEmployeeID`,
        method: 'GET',
        params: data
    })
}
//  根据客户id 查询护理师
api.getBeauticiansByCust = function (data) {
    return axios({
        url: `/employees/getBeauticiansByCust`,
        method: 'GET',
        params: data
    })
}
// 根据登录人ID查询总监列表
api.getStoreSceneEmployee = function (data) {
    return axios({
        url: `/employees/getStoreSceneEmployee`,
        method: 'GET',
        params: data
    })
}
// 根据客户id查询总监列表
api.getStoreSceneCust = function (data) {
    return axios({
        url: `/employees/getStoreSceneCust`,
        method: 'GET',
        params: data
    })
}
// 保存支付管理时间
api.ChangeChargeData = function (data) {
    return axios({
        url: `/charge/ChangeChargeData`,
        method: 'POST',
        data: data
    })
}
// 审核收费单
api.AuditRelief = function (data) {
    return axios({
        url: `/consumptions/AuditRelief`,
        method: 'POST',
        data: data
    })
}
// 导出收入成本报表
api.ExportExportEarn = function (data) {
    return axios({
        url: `/Export/ExportEarn`,
        method: 'GET',
        params: data
    })
}
// 新获取项目
api.getMainItem = function (data) {
    return axios({
        url: `/itemCategories/getMainItem`,
        method: 'GET',
        params: data
    })
}
// 会员卡信息
api.GetCardInfo = function (data) {
    return axios({
        url: `/AlipayTemplate/GetCardInfo`,
        method: 'GET',
        params: data
    })
}

//美肤总监业绩
api.GetBeauticianTotalMoney = function (data) {
    return axios({
        url: `/BeauticianReport/GetBeauticianTotalMoney`,
        method: 'GET',
        params: data
    })
}

//客户转交
api.ByStoreIdQueryBeautician = function (data) {
    return axios({
        url: `/employees/ByStoreIdQueryBeautician`,
        method: 'GET',
        params: data
    })
}
// 客户转交(保存)
api.AddCustomerDeliverLog = function (data) {
    return axios({
        url: `/customerDetails/AddCustomerDeliverLog`,
        method: 'POST',
        data: data
    })
}
// 客户转交列表
api.GetCustomerDeliverList = function (data) {
    return axios({
        url: `/customerDetails/GetCustomerDeliverList`,
        method: 'POST',
        data: data
    })
}
// 客户转交列表
api.TotalReportV1 = function (data) {
    return axios({
        url: `/report/TotalReportV1`,
        method: 'GET',
        params: data
    })
}
// 通过一个门店的id获取该区域内所有的门店(此处针对在选择要调到的门店)
api.GetAreaStoresByOneStore = function (data) {
    return axios({
        url: `/stores/GetAreaStoresByOneStore`,
        method: 'GET',
        params: data
    })
}

// 获取调库申请单列表
api.MoveOrdergetList = function (data) {
    return axios({
        url: `/MoveOrder/getList`,
        method: 'GET',
        params: data
    })
}
// 获取单条记录详情
api.MoveOrdergetByOrderNum = function (data) {
    return axios({
        url: `/MoveOrder/getByOrderNum`,
        method: 'GET',
        params: data
    })
}
// 添加调库申请单
api.MoveOrderAdd = function (data) {
    return axios({
        url: `/MoveOrder/Add`,
        method: 'POST',
        data: data
    })
}
// 修改调库申请单
api.MoveOrderEdit = function (data) {
    return axios({
        url: `/MoveOrder/Edit`,
        method: 'POST',
        data: data
    })
}
// 审核调库申请单
api.MoveOrderAudit = function (data) {
    return axios({
        url: `/MoveOrder/Audit`,
        method: 'POST',
        data: data
    })
}
// 调入门店收货
api.MoveOrderConfirm = function (data) {
    return axios({
        url: `/MoveOrder/Confirm`,
        method: 'POST',
        data: data
    })
}
// 支付订单查询
api.QueryOrderList = function (data) {
    return axios({
        url: `/QueryOrder/OrderList`,
        method: 'Get',
        params: data
    })
}
// 支付订单查看
api.GetAccountAmount = function (data) {
    return axios({
        url: `/QueryOrder/GetAccountAmount`,
        method: 'POST',
        data: data
    })
}
// 查询护理师对应的客户
api.ByEmployeeIdQueryCust = function (data) {
    return axios({
        url: `/customerDetails/ByEmployeeIdQueryCust`,
        method: 'POST',
        data: data
    })
}
// 查询护理师
api.ByStoreIdQueryValidBeautician = function (data) {
    return axios({
        url: `/employees/ByStoreIdQueryValidBeautician`,
        method: 'GET',
        params: data
    })
}
// 提交转交护理师
api.AddListCustomerDeliverLog = function (data) {
    return axios({
        url: `/customerDetails/AddListCustomerDeliverLog`,
        method: 'POST',
        data: data
    })
}

// 总监顾客业绩
api.GetMeiFuZJCustTypeMoney = function (data) {
    return axios({
        url: `/BeauticianReport/GetMeiFuZJCustTypeMoney`,
        method: 'GET',
        params: data
    })
}
// 美肤总监项目分类
api.GetSceneProjectRatio = function (data) {
    return axios({
        url: `/BeauticianReport/GetSceneProjectRatio`,
        method: 'GET',
        params: data
    })
}
// 提修改欠款时间
api.arrearsRecoveryEditDate = function (data) {
    return axios({
        url: `/arrearsRecovery/EditDate`,
        method: 'POST',
        data: data
    })
}
// 查询工资明细
api.GetSalaryInfo = function (data) {
    return axios({
        url: `/ImportExcel/GetSalaryInfo`,
        method: 'GET',
        params: data
    })
}
// 终止执行
api.UpItemEndExec = function (data) {
    return axios({
        url: `/waitForExecuteRecord/UpItemEndExec`,
        method: 'POST',
        data: data
    })
}
//  获取套盒名称 列表
api.GetBoxGoodsName = function (data) {
    return axios({
        url: `/goods/GetBoxGoodsName`,
        method: 'GET',
        params: data
    })
}
//  物资套盒
api.GetBoxGoodsList = function (data) {
    return axios({
        url: `/goods/GetBoxGoodsList`,
        method: 'GET',
        params: data
    })
}
//  散装物资
api.GetGoodsInfos = function (data) {
    return axios({
        url: `/goods/GetGoodsInfos`,
        method: 'GET',
        params: data
    })
}
//  添加保存套盒产品
api.AddBoxGoods = function (data) {
    return axios({
        url: `/goods/AddBoxGoods`,
        method: 'GET',
        params: data
    })
}
//  修改保存套盒产品
api.EditBoxGoods = function (data) {
    return axios({
        url: `/goods/EditBoxGoods`,
        method: 'GET',
        params: data
    })
}
//  添加审核流程
api.ApprovalAdd = function (data) {
    return axios({
        url: `/Approval/ApprovalAdd`,
        method: 'GET',
        params: data
    })
}
//  获取审核类型
api.ListType = function () {
    return axios({
        url: `/Approval/ListType`,
        method: 'GET'
    })
}
//  根据多个区域查门店
api.ApprovallistStore = function (data) {
    return axios({
        url: `/Approval/listStore`,
        method: 'GET',
        params: data
    })
}
//  根据多个门店查询审核人
api.ApprovalStore = function (data) {
    return axios({
        url: `/Approval/Store`,
        method: 'GET',
        params: data
    })
}
//  审核流程列表
api.PersonSetList = function (data) {
    return axios({
        url: `/Approval/PersonSetList`,
        method: 'GET',
        params: data
    })
}
//  修改审核流程
api.ApprovalEdit = function (data) {
    return axios({
        url: `/Approval/ApprovalEdit`,
        method: 'GET',
        params: data
    })
}
//  客户数据统计
api.QueryCustNum = function (data) {
    return axios({
        url: `/NewReport/QueryCustNum`,
        method: 'GET',
        params: data
    })
}
//对应预交金护理师列表
api.QueryCustPrepayment = function (data) {
    return axios({
        url: `/refundsPrepayments/QueryCustPrepayment`,
        method: 'GET',
        params: data
    })
}
// 在财务 出纳结算单页面 查询业绩明细 2019年11月29日16:21:48 ly
api.QueryChangeItemDetail = function (data) {
    return axios({
        url: `/finance/QueryChangeItemDetail`,
        method: 'GET',
        params: data
    })
}

//2019年12月4日11:19:50 ly
// 在收费页面点击收费之前判断客户是否有欠费的项目 然后显示欠费项目信息
api.isCustArrDetail = function (data) {
    return axios({
        url: `/charge/queryCustArrDetail`,
        method: 'GET',
        params: data
    })
}

//财务收入表格 编辑单行数据 2019年12月28日16:55:42
api.SigleInfo = function (data) {
    return axios({
        url: `/finance/SigleInfo?ID=` + data,
        method: 'GET'
    })
}
//修改 财务收入表金额 2019年12月28日17:40:23
api.editRevenueCheck = function (data) {
    return axios({
        url: `/finance/EditRevenueCheck`,
        method: 'GET',
        params: data
    })
}
//账号审核列表
api.GetAuthConfirm = function (data) {
    return axios({
        url: `/employees/GetAuthConfirm`,
        method: 'GET',
        params: data
    })
}
//账号审核提交
api.AuthConfirm = function (data) {
    return axios({
        url: `/employees/AuthConfirm`,
        method: 'GET',
        params: data
    })
}

// 发消息给顾客接口
api.SendAppletNotice = function (data) {
    return axios({
        url: `/SendNotice/SendAppletNotice`,
        method: 'POST',
        data: data
    })
}

// 发消息给护理师接口
api.SendToEmployee = function (data) {
    return axios({
        url: `/SendNotice/SendToEmployee`,
        method: 'POST',
        data: data
    })
}

//根据门店ID查询门店护理师
api.GetBeauticiansByStoreID = function (data) {
    return axios({
        url: `/employees/GetBeauticiansByStoreID`,
        method: 'GET',
        params: data
    })
}
//根据门店ID查询门店总监
api.GetSceneEmployeeByStoreID = function (data) {
    return axios({
        url: `/employees/GetSceneEmployeeByStoreID`,
        method: 'GET',
        params: data
    })
}
//客户档案图片
api.CustomerDossierList = function (data) {
    return axios({
        url: `/medicalPhoto/CustomerDossierList`,
        method: 'GET',
        params: data
    })
}

// 检验是否可以执行
api.CustomerIsPic = function (data) {
    return axios({
        url: `/waitForExecuteRecord/CustomerIsPic`,
        method: 'POST',
        data: data
    })
}

//排班获取护理师
api.workHoursDefintionList = function (data) {
    return axios({
        url: `/workHoursDefintion/ByBeautician`,
        method: 'GET',
        params: data
    })
}
//获取护理师排班列表
api.EmployeeScheduleList = function (data) {
    return axios({
        url: `/workHoursDefintion/EmployeeSchedule`,
        method: 'GET',
        params: data
    })
}
//获取护理师排班预约详情
api.QueryPhoneByReserve = function (data) {
    return axios({
        url: `/workHoursDefintion/QueryPhoneByReserve`,
        method: 'GET',
        params: data
    })
}
// 修改员工名称
api.SingleEditEmName = function (data) {
    return axios({
        url: `/executionRecord/SingleEditEmName`,
        method: 'POST',
        data: data
    })
}
export default api