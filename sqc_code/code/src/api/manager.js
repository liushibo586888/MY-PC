// 管理员
import axios from 'axios'
let manager = {}
let qs = require('qs')
// 获取网络来源列表 (管理员)
manager.getNetSourceList = function (data) {
    return axios({
        url: `/netSources/getList`,
        method: 'GET',
        params: data
    })
}
// 添加网络来源
manager.addNetSource = function (data) {
    return axios({
        url: `/netSources`,
        method: 'POST',
        data: data
    })
}
// 获取单个网络来源
manager.getSingleNet = function (id) {
    return axios({
        url: `/netSources/${id}`,
        method: 'GET'
    })
}
// 修改网络来源
manager.modefySingleNet = function (id, data) {
    return axios({
        url: `/netSources/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取了解途径列表
manager.getUnderstandWaysList = function (data) {
    return axios({
        url: `/understandWays/getList`,
        method: 'GET',
        params: data
    })
}
// 添加了解途径
manager.addUnderstandWays = function (data) {
    return axios({
        url: `/understandWays`,
        method: 'POST',
        data: data
    })
}
// 获取单个了解途径
manager.getSingleUnder = function (id) {
    return axios({
        url: `/understandWays/${id}`,
        method: 'GET'
    })
}
// 修改了解途径
manager.modefySingleUnder = function (id, data) {
    return axios({
        url: `/understandWays/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取仪器列表
manager.getDevicesList = function (data) {
    return axios({
        url: `/devices/getList`,
        method: 'GET',
        params: data
    })
}
// 添加仪器列表
manager.addDevices = function (data) {
    return axios({
        url: `/devices`,
        method: 'POST',
        data: data
    })
}
// 获取单个仪器
manager.getSingleDevies = function (id) {
    return axios({
        url: `/devices/${id}`,
        method: 'GET'
    })
}
// 修改仪器列表
manager.modefySingleDevies = function (id, data) {
    return axios({
        url: `/devices/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取部门列表
manager.getDepartmentsList = function (data) {
    return axios({
        url: `/departments/getList`,
        method: 'GET',
        params: data
    })
}
// 添加部门列表
manager.addDepartments = function (data) {
    return axios({
        url: `/departments`,
        method: 'POST',
        data: data
    })
}
// 获取单个部门
manager.getSingleDepartments = function (id) {
    return axios({
        url: `/departments/${id}`,
        method: 'GET'
    })
}
// 修改部门列表
manager.modefySingleDepartments = function (id, data) {
    return axios({
        url: `/departments/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取部门类型列表  (下拉框)
manager.getDepartmentTypeList = function (data) {
    return axios({
        url: `/departmentType`,
        method: 'GET',
        params: data
    })
}
// 获取项目分类
manager.getItemCategoriesList = function (data) {
    return axios({
        url: `/ItemCategories/getList`,
        method: 'GET',
        params: data
    })
}
// 添加项目分类
manager.addItemCategories = function (data) {
    return axios({
        url: `/ItemCategories`,
        method: 'POST',
        data: data
    })
}
// 获取单个项目分类
manager.getSingleItemCategories = function (id) {
    return axios({
        url: `/ItemCategories/${id}`,
        method: 'GET'
    })
}
// 修改项目分类
manager.modefySingleItemCategories = function (id, data) {
    return axios({
        url: `/ItemCategories/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取顶级分类列表(下拉框)
manager.getAllTopCategories = function () {
    return axios({
        url: `/ItemCategories/getAllTopCategories`,
        method: 'GET'
    })
}
// 获取客户转店列表
manager.getCustomerTransferList = function (data) {
    return axios({
        url: `/customerTransfer/getList`,
        method: 'GET',
        params: data
    })
}
//获取客户转交护理师列表
manager.GetPractitionerList = function (data) {
    return axios({
        url: `/customerTransfer/GetPractitionerList`,
        method: 'GET',
        params: data
    })
}
// 获取客户转店个人详情
manager.getCustomerID = function (id) {
    return axios({
        url: `/customerTransfer/getList/${id}`,
        method: 'GET'
    })
}
// 新增客户转店记录
manager.addCustomerTransfer = function (data) {
    return axios({
        url: `/customerTransfer`,
        method: 'POST',
        data: data
    })
}
// 新增客户转店记录(新接口)
manager.AddChangeStoreInfo = function (data) {
    return axios({
        url: `/customerTransfer/AddChangeStoreInfo`,
        method: 'POST',
        data: data
    })
}
// 获取项目列表
manager.getItemsList = function (data) {
    return axios({
        url: `/items/getList`,
        method: 'GET',
        params: data
    })
}
// 新增项目
manager.addItems = function (data) {
    return axios({
        url: `/items`,
        method: 'POST',
        data: data
    })
}
// 获取单条项目
manager.getSingleItems = function (id) {
    return axios({
        url: `/items/${id}`,
        method: 'GET'
    })
}
// 修改项目
manager.modefySingleItems = function (id, data) {
    return axios({
        url: `/items/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取顶级项目类型列表(下拉框)
manager.getItemType = function () {
    return axios({
        url: `/items/getItemType`,
        method: 'GET'
    })
}
// 获取二级项目类型列表(下拉框)
manager.getSecondItemType = function () {
    return axios({
        url: `/items/getSecondItemType`,
        method: 'GET'
    })
}
// 获取顶级分类列表（下拉框）
manager.getTopList = function () {
    return axios({
        url: `/ItemCategories/getAllTopCategories`,
        method: 'GET'
    })
}
// 根据顶级分类获取二级分类
manager.getTwiceList = function (data) {
    return axios({
        url: `/ItemCategories/getSubCategoriesByTopCategoryID`,
        method: 'GET',
        params: data
    })
}
// 物资列表
manager.getGoodsList = function (data) {
    return axios({
        url: `/goods/getList`,
        method: 'GET',
        params: data
    })
}
// 门店物资列表
manager.getStoreGoodsInfoWarnList = function (data) {
    return axios({
        url: `/goods/getStoreGoodsInfoWarnList`,
        method: 'GET',
        params: data
    })
}
// 新增物资
manager.addGoods = function (data) {
    return axios({
        url: `/goods`,
        method: 'POST',
        data: data
    })
}
// 获取单条物资
manager.getSingleGoods = function (id) {
    return axios({
        url: `/goods/${id}`,
        method: 'GET'
    })
}
// 获取单条预警上下限
manager.getGoodsUpdate = function (data) {
    return axios({
        url: `/goods/update`,
        method: 'GET',
        params: data
    })
}
// 修改物资
manager.modefySingleGoods = function (id, data) {
    return axios({
        url: `/goods/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取物资顶级分类列表  (下拉框)
manager.getGoodsCategoriesTopCategoriesList = function (id) {
    return axios({
        url: `/goodsCategories/getTopCategoriesList`,
        method: 'GET'
    })
}
// 物资分类列表
manager.getGoodsCategoriesList = function (data) {
    return axios({
        url: `/goodsCategories/getList`,
        method: 'GET',
        params: data
    })
}
// 新增物资分类
manager.addGoodsCategories = function (data) {
    return axios({
        url: `/goodsCategories`,
        method: 'POST',
        data: data
    })
}
// 获取单条物资分类
manager.getSingleGoodsCategories = function (id) {
    return axios({
        url: `/goodsCategories/${id}`,
        method: 'GET'
    })
}
// 修改物资分类
manager.modefySingleGoodsCategories = function (id, data) {
    return axios({
        url: `/goodsCategories/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取物资分类列表  (下拉框)
manager.getGoodsCategoriesDropdownList = function (id) {
    return axios({
        url: `/goodsCategories/getDropdownList`,
        method: 'GET'
    })
}
// 获取供货厂家列表  (下拉框)
manager.getFactoriesDropdownList = function (id) {
    return axios({
        url: `/factories/getDropdownList`,
        method: 'GET'
    })
}
// 获取供应商列表
manager.getFactoriesList = function (data) {
    return axios({
        url: `/factories/getList`,
        method: 'GET',
        params: data
    })
}
// 新增供应商
manager.addFactories = function (data) {
    return axios({
        url: `/factories`,
        method: 'POST',
        data: data
    })
}
// 获取单条供应商
manager.getSingleFactories = function (id) {
    return axios({
        url: `/factories/${id}`,
        method: 'GET'
    })
}
// 修改供应商
manager.modefySingleFactories = function (id, data) {
    return axios({
        url: `/factories/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取员工列表
manager.getEmployeesList = function (data) {
    return axios({
        url: `/employees/getList`,
        method: 'GET',
        params: data
    })
}
// 新增员工
manager.addEmployees = function (data) {
    return axios({
        url: `/employees/addGeneralUser`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charst=UTF-8'
        },
        // data: data
        data: qs.stringify(data)
    })
}
// 获取单条员工
manager.getSingleEmployees = function (id) {
    return axios({
        url: `/employees/${id}`,
        method: 'GET'
    })
}
// 修改员工
manager.modefySingleEmployees = function (id, data) {
    return axios({
        url: `/employees/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取所属门店（下拉框）
manager.modefySingleEmployees = function (id, data) {
    return axios({
        url: `/employees/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取有效部门列表(下拉框)
manager.getValidDepartmentsList = function () {
    return axios({
        url: `/departments/getValidDepartments`,
        method: 'GET'
    })
}
// 根据部门编号获取门店列表 (若是集团部门,返回的list为null)
manager.getStoresByDepartmentsID = function (data) {
    return axios({
        url: `/stores/getStoresByDepartmentsID`,
        method: 'GET',
        params: data
    })
}

// 根据部门ID获取职位列表(下拉框)
manager.getPositionsByDepartmentID = function (data) {
    return axios({
        url: `/positions/getPositionsByDepartmentID`,
        method: 'GET',
        params: data
    })
}
// 获取职位列表
manager.getPositionsList = function (data) {
    return axios({
        url: `/positions/getList`,
        method: 'GET',
        params: data
    })
}
// 新增职位
manager.addPositions = function (data) {
    return axios({
        url: `/positions`,
        method: 'POST',
        data: data
    })
}
// 获取单条职位
manager.getSinglePositions = function (id) {
    return axios({
        url: `/positions/${id}`,
        method: 'GET'
    })
}
// 修改职位
manager.modefySinglePositions = function (id, data) {
    return axios({
        url: `/positions/${id}`,
        method: 'PUT',
        data: data
    })
}
// 新增、修改时获取职位类型下拉框数据
manager.getPositionTypeList = function () {
    return axios({
        url: `/positions/getPositionTypeList`,
        method: 'GET'
    })
}
// 获取数据读取范围列表  (下拉框)
manager.getDataRangeDropdownList = function () {
    return axios({
        url: `/dataRange/getDropdownList`,
        method: 'GET'
    })
}
// 获取权限列表  (下拉框)
manager.getRolesDropdownList = function () {
    return axios({
        url: `/roles/getDropdownList`,
        method: 'GET'
    })
}
// 获取门店列表
manager.getStoresList = function (data) {
    return axios({
        url: `/stores/getList`,
        method: 'GET',
        params: data
    })
}
// 新增门店
manager.addStores = function (data) {
    return axios({
        url: `/stores`,
        method: 'POST',
        data: data
    })
}
// 新增门店-获取省
manager.getProvinceList = function (data) {
    return axios({
        url: `/region/getProvinceList`,
        method: 'GET',
        params: data
    })
}
// 新增门店-获取区
manager.getCityList = function (data) {
    return axios({
        url: `/region/getCityList`,
        method: 'GET',
        params: data
    })
}
// 获取单条门店
manager.getSingleStores = function (id) {
    return axios({
        url: `/stores/${id}`,
        method: 'GET'
    })
}
// 修改门店
manager.modefySingleStores = function (id, data) {
    return axios({
        url: `/stores/${id}`,
        method: 'PUT',
        data: data
    })
}

// 新增门店
manager.addStores = function (data) {
    return axios({
        url: `/stores`,
        method: 'POST',
        data: data
    })
}
// 获取单条门店
manager.getSingleStores = function (id) {
    return axios({
        url: `/stores/${id}`,
        method: 'GET'
    })
}


// 获取来源途径列表
manager.getChannelsList = function (data) {
    return axios({
        url: `/channels/getList`,
        method: 'GET',
        params: data
    })
}
// 添加来源途径
manager.addChannels = function (data) {
    return axios({
        url: `/channels`,
        method: 'POST',
        data: data
    })
}
// 获取单个来源渠道
manager.getSingleChannels = function (id) {
    return axios({
        url: `/channels/${id}`,
        method: 'GET'
    })
}
// 修改来源渠道
manager.modefySingleChannels = function (id, data) {
    return axios({
        url: `/channels/${id}`,
        method: 'PUT',
        data: data
    })
}


// 获取客户标签列表
manager.getCustomerTagsList = function (data) {
    return axios({
        url: `/customerTags/getList`,
        method: 'GET',
        params: data
    })
}
// 添加客户标签
manager.addCustomerTags = function (data) {
    return axios({
        url: `/customerTags`,
        method: 'POST',
        data: data
    })
}
// 获取单个客户标签
manager.getSingleCustomerTag = function (id) {
    return axios({
        url: `/customerTags/${id}`,
        method: 'GET'
    })
}
// 修改客户标签
manager.modefySingleCustomerTag = function (id, data) {
    return axios({
        url: `/customerTags/${id}`,
        method: 'PUT',
        data: data
    })
}


// 获取待排班员工管理
manager.getShiftEmployeesList = function (data) {
    return axios({
        url: `/shiftEmployees/getList`,
        method: 'GET',
        params: data
    })
}
// 添加待排班员工
manager.addShiftEmployees = function (data) {
    return axios({
        url: `/shiftEmployees`,
        method: 'POST',
        data: data
    })
}
// 获取需要排班的员工列表
manager.getNeedScheduleEmployeesByEmployeeID = function (data) {
    return axios({
        url: `/employees/getNeedScheduleEmployeesByEmployeeID`,
        method: 'GET',
        params: data
    })
}
// 获取需要排班的员工详情
manager.getSingleShiftEmployees = function (id) {
    return axios({
        url: `/shiftEmployees/${id}`,
        method: 'GET'
    })
}
// 修改待排班员工
manager.modefySingleShiftEmployees = function (id, data) {
    return axios({
        url: `/shiftEmployees/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取标签分类列表
manager.EnumCRMTagTypegetList = function () {
    return axios({
        url: `/EnumCRMTagType/getList`,
        method: 'GET'
    })
}
export default manager