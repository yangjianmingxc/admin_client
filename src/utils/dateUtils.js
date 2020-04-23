/*
包含n个日期时间处理的工具函数模块
export 分别暴露的写法 取值的时候用{}
*/

/*
  格式化日期
*/
export function formateDate(time) {
    if (!time) return ''
    let Y, M, D, h, m, s;
    const date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() >= 10) ? (date.getDate() + ' ') : ("0" + date.getDate() + ' ');
    h = (date.getHours() >= 10) ? (date.getHours() + ':') : ("0" + date.getHours() + ':');
    m = (date.getMinutes() >= 10) ? (date.getMinutes() + ':') : ("0" + date.getMinutes() + ':');
    s = (date.getSeconds() >= 10) ? (date.getSeconds()) : ("0" + date.getSeconds());
    return Y + M + D + h + m + s;
}
