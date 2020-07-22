// 排班表
import axios from 'axios'
let superManager = {}

// 获取管理员列表
superManager.getAdminsList = function (data) {
    return axios({
        url: `/admins/getList`,
        method: 'GET',
        params: data
    })
}
// 新增管理员
superManager.addAdmins = function (data) {
    return axios({
        url: `/admins`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取管理员
superManager.getAdminsDetail = function (id, data) {
    return axios({
        url: `/admins/${id}`,
        method: 'GET',
        params: data
    })
}
// 修改管理员
superManager.modefyAdmin = function (id, data) {
    return axios({
        url: `/admins/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取控制器分类
superManager.getControllerCategoriesList = function (data) {
    return axios({
        url: `/ControllerCategories/getList`,
        method: 'GET',
        params: data
    })
}
// 新增控制器分类
superManager.addControllerCategories = function (data) {
    return axios({
        url: `/ControllerCategories`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取控制器分类
superManager.getControllerCategoriesDetail = function (id, data) {
    return axios({
        url: `/ControllerCategories/${id}`,
        method: 'GET',
        params: data
    })
}
// 修改控制器分类
superManager.modefyControllerCategories = function (id, data) {
    return axios({
        url: `/ControllerCategories/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取控制器列表
superManager.getControllersList = function (data) {
    return axios({
        url: `/controllers/getList`,
        method: 'GET',
        params: data
    })
}
// 新增控制器
superManager.addControllers = function (data) {
    return axios({
        url: `/controllers`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取控制器
superManager.getControllersDetail = function (id, data) {
    return axios({
        url: `/controllers/${id}`,
        method: 'GET',
        params: data
    })
}
// 修改控制器
superManager.modefyControllers = function (id, data) {
    return axios({
        url: `/controllers/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取控制器分类下拉框
superManager.getDropdownListData = function (data) {
    return axios({
        url: `/controllerCategories/getDropdownListData`,
        method: 'GET',
        params: data
    })
}
// 根据顶级菜单获取二级菜单列表(下拉框)
superManager.getSubMenuDropdownListByTopMenuID = function (data) {
    return axios({
        url: `/roles/getSubMenuDropdownListByTopMenuID`,
        method: 'GET',
        params: data
    })
}
// 获取动作列表
superManager.getActionsList = function (data) {
    return axios({
        url: `/actions/getList`,
        method: 'GET',
        params: data
    })
}
// 新增动作
superManager.addActions = function (data) {
    return axios({
        url: `/actions`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取动作
superManager.getActionsDetail = function (id, data) {
    return axios({
        url: `/actions/${id}`,
        method: 'GET',
        params: data
    })
}
// 修改动作
superManager.modefyActions = function (id, data) {
    return axios({
        url: `/actions/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取控制器分类下拉框
superManager.getControllerCategoriesDropdownListData = function (data) {
    return axios({
        url: `/controllerCategories/getDropdownListData`,
        method: 'GET',
        data: data
    })
}
// 获取所属控制器编号
superManager.getControllerDropdownListData = function (data) {
    return axios({
        url: `/controller/getDropdownListData`,
        method: 'GET',
        data: data
    })
}
// 获取动作下拉框
superManager.getLinkTypeDropdownListData = function (data) {
    return axios({
        url: `/actions/getLinkTypeDropdownListData`,
        method: 'GET',
        data: data
    })
}
// 获取权限列表
superManager.getRoleList = function (data) {
    return axios({
        url: `/roles/getList`,
        method: 'GET',
        params: data
    })
}
// 获取权限页面中的动作列表
superManager.getRoleActionList = function (data) {
    return axios({
        url: `/actions/getRoleActionList`,
        method: 'GET',
        params: data
    })
}
// 添加权限
superManager.addRoles = function (data) {
    return axios({
        url: `/roles`,
        method: 'POST',
        data: data
    })
}
// 根据编号获取权限(页面加载功能列表后要将RoleDetails中IsAllow为True的ActionID选项勾上)
superManager.getRoleDetail = function (data) {
    return axios({
        url: `/roles/GetSingleDataByID`,
        method: 'GET',
        params: data
    })
}
// 修改权限
superManager.modefyRoles = function (id, data) {
    return axios({
        url: `/roles/${id}`,
        method: 'PUT',
        data: data
    })
}
// 获取控制器分类编号
superManager.getControllerCategoriesDropdownList = function (data) {
    return axios({
        url: `/controllerCategories/getDropdownListData`,
        method: 'GET',
        params: data
    })
}
export default superManager