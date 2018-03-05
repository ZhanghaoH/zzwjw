// 通用接口头
var URLHEAD = 'http://app2.henanga.gov.cn/jmth5/zzga/';
// var URLHEAD = 'https://app1.henanga.gov.cn/jmth5/zzga/';
// 业务接口
var JZZ = 'getResidenceProgress';
var SFZ = 'getIdCardProgress';
var CMCX_CITY = 'getResidentsCityDept';
var CMCX_POLICE = 'getResidentsBureauDept';
var CMCX = 'getSameName';
var CRJBL = 'getExitEntryProgress';
var CRJZJ = 'getExitEntryInfo';
var BAYCJ = 'getSecurityScores';
var BAYZJD = 'getSecurityProgress';
var JSZ = 'getJSZXX';
var WFCX = 'getJDCWZXX';
var HZLIST = 'getResidentsServiceListAll'
var HZITEM = 'getResidentsGuideDetail'

// var JJYW = "http://117.158.5.51:89/WXAdminProject/notice/getAllNotices"
// var YNJJY_Details = "http://117.158.5.51:89/WXAdminProject/notice/getArticleById" 
// var YNJJY = "http://117.158.5.51:89/WXAdminProject/notice/getAllArticles"
// var JJJW_Details = "http://117.158.5.51:89/WXAdminProject/notice/getJWById" 
// var JJJW = "http://117.158.5.51:89/WXAdminProject/notice/getAllJWs"

var JJYW = URLHEAD + "wxService/getAllNotices"
var YNJJY = URLHEAD + "wxService/getAllArticlesByPage"
var YNJJY_Details = URLHEAD + "wxService/getArticleById" 
var JJJW = URLHEAD + "wxService/getAllJuanWenByPage"
var JJJW_Details =  URLHEAD + "wxService/getJuanWenById" 

// TODO:  modify these variables
// var urls = {
//   jsz: ,
//   jzz: ,
// }

// const Storage = window.localStorage;

/*----------  日期签名  ----------*/
Date.prototype.Format = function () {
  var y = this.getFullYear() + '';
  var m = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) + '' : '0' + (this.getMonth() + 1) ;
  var d = this.getDate() >= 10 ? this.getDate() + '' : '0' + this.getDate();
  var h = this.getHours() >= 10 ? this.getHours() + '' : '0' + this.getHours();
  var mm = this.getMinutes() >= 10 ? this.getMinutes() + '' : '0' + this.getMinutes();
  var s = this.getSeconds()  >= 10 ? this.getSeconds() + '' : '0' + this.getSeconds();
  return y + m + d + h + mm + s; 
}
// console.log(new Date().Format());