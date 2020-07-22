// 排班表
import axios from 'axios'
let scheduling = {}

// 根据员工编号以及日期该员工本月排班信息
scheduling.getMonthScheduleInfoList = function (data) {
    return axios({
        url: `/employeeSchedules/getList`,
        method: 'GET',
        params: data
    })
}

// 根据员工编号以及日期该员工本月排班信息
scheduling.getMonthScheduleInfoByEmployeeIDAndDate = function (data) {
    return axios({
        url: `/employeeSchedules/getMonthScheduleInfoByEmployeeIDAndDate`,
        method: 'GET',
        params: data
    })
}
// 根据日排班信息编号获取日排班信息
scheduling.getScheduleDayInfoByDayInfoID = function (data) {
    return axios({
        url: `/employeeSchedules/getScheduleDayInfoByDayInfoID`,
        method: 'GET',
        params: data
    })
}
// 获取待排班员工
scheduling.getNeedToScheduleEmployee = function (data) {
    return axios({
        url: `/shiftEmployees/getNeedToScheduleEmployee`,
        method: 'GET',
        params: data
    })
}
// 根据员工编号和日期获取员工的工作时间段
scheduling.getScheduleTimeDetailsByEmployeeID = function (data) {
    return axios({
        url: `/employeeSchedules/getScheduleTimeDetailsByEmployeeID`,
        method: 'GET',
        params: data
    })
}
// 获取有效工作时间列表(添加/修改某日排班时使用)
scheduling.getValidWorkHoursDefintion = function (data) {
    return axios({
        url: `/workHoursDefintion/getValidWorkHoursDefintion`,
        method: 'GET',
        params: data
    })
}
// 添加月排班
scheduling.addEmployeeSchedules = function (data) {
    return axios({
        url: `/employeeSchedules`,
        method: 'POST',
        data: data
    })
}
// 根据月排班信息编号获取月排班信息
scheduling.getScheduleInfoByID = function (data) {
    return axios({
        url: `/employeeSchedules/getScheduleInfoByID`,
        method: 'GET',
        params: data
    })
}
// 根据日排班信息编号获取日排班信息
scheduling.getScheduleDayInfoByDayInfoID = function (data) {
    return axios({
        url: `/employeeSchedules/getScheduleDayInfoByDayInfoID`,
        method: 'GET',
        params: data
    })
}
// 修改日排班
scheduling.modefySchedules = function (id, data) {
    return axios({
        url: `/employeeSchedules/${id}`,
        method: 'PUT',
        data: data
    })
}
// 审核排班表
scheduling.checkSchedule = function (data) {
    return axios({
        url: `/employeeSchedules/checkSchedule`,
        method: 'PUT',
        data: data
    })
}
export default scheduling