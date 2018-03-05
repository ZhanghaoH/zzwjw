;(function ($) {
  var ynjjyList = function (element, options) {
    var $main = $('#ynjjy')
    var $list = $main.find('#ynjjyList')
    var params = {num: 1, size: 10}
    this.init = function (){
      $list.html("")
      var mescrollYNJJY = new MeScroll('ynjjy', { // 第一个参数"mescroll"对应上面布局结构div的id
        // 如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        // 解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
          // callback: downCallback // 下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
          noMoreSize: 0,
          callback: upCallback, // 上拉加载的回调
          isBounce: false, // 如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
          scrollbar: {
            use: false
          },
          toTop: {
            warpId: null, 
            src: './i/top.png', 
            html: null, 
            offset: 1000, 
            warpClass: 'mescroll-totop', 
            showClass: 'mescroll-fade-in', 
            hideClass: 'mescroll-fade-out', 
            duration: 300, 
            supportTap: false
          }
        }
      })
      // 上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
      function upCallback (params) {
        params.num = Math.floor(params.num / 10) * 10 + 1
        params.size = params.num + 9
        console.log(params.num);
        var ajaxTimeoutTest = $.ajax({
          url: YNJJY + '?page=' + params.num + '&pageSize=' + params.size,
          // data: "data",
          dataType: 'json',
          type: 'POST',
          // jsonp: 'callback',
          timeout: 10000,
          success: function success (res) {
            // 联网成功的回调,隐藏下拉刷新的状态
            // console.log("ynjjy success");
            mescrollYNJJY.endSuccess(); // 无参
            params.num += 10
            params.size += 10
            // 设置数据
            // setXxxx(data);//自行实现 TODO
            var newsHtml = ''
            var resData = res.resultData
            console.log(resData);
            var errCode = res.errCode
            if ( errCode == 0) {
              resData.map(function (el, index) {
                if (el.imgUrl) {
                  newsHtml += `<li>
                  <a href="../newsDetails.html?id=${el.id}" class="am-link-muted  flex-row">
                  <div class="img-wr"><img src=${el.imgUrl} ></div>
                  <div class="txt-wr">
                    <div class="news-title line-clamp">${el.title}</div>
                    <div class="news-time">${el.uploadTime.substr(0,10)}</div>
                  </div>
                  </a>
                </li>`
                }else {
                  newsHtml += `<li>
                <a href="../newsDetails.html?id=${el.id}" class="am-link-muted  flex-row">
                <div class="txt-wr">
                  <div class="news-title line-clamp">${el.title}</div>
                  <div class="news-time">${el.uploadTime.substr(0,10)}</div>
                </div>
                </a>
              </li>`
                }
              })
              if (params.num - 10 == 1) {
                $list.html(newsHtml)
              }else{
                $list.append(newsHtml)
              }
              if(resData.length < 10){
                mescrollYNJJY.endSuccess(0, false)
              }
              // mescrollYNJJY.endUpScroll(false)
            }else{
              mescrollYNJJY.endSuccess(0 , false)
            } 
          },
          error: function error (err) {
            // 联网失败的回调,隐藏下拉刷新的状态
            mescrollYNJJY.endErr()
            params.start = params.start > 10 ? params.start - 10 : 1
            params.end = params.end > 10 ? params.end - 10 : 10
            console.log(err)
            document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
            document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">服务器开小差了，请稍候再试</h4></div></div>'
          },
          complete: function complete (XMLHttpRequest, status) {
            if (status == 'timeout') {
              // 超时,status还有success,error等值的情况
              params.start = params.start > 10 ? params.start - 10 : 1
              params.end = params.end > 10 ? params.end - 10 : 10
              ajaxTimeoutTest.abort()
              document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
              document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请求超时</h4></div></div>'
            }
          }
        })
      }
      // 下拉刷新的回调
      function downCallback () {
        params.num = 1
        params.size = 10
        upCallback(params)
      }
    }
  }
  var jjjwList = function (element, options) {
    var $main = $('#jjjw')
    var $list = $main.find('#jjjwList')
    var params = {num: 1, size: 10}
    this.init = function (){
      $list.html("")
      var mescrollJJJW = new MeScroll('jjjw', { // 第一个参数"mescroll"对应上面布局结构div的id
        // 如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        // 解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
          // callback: downCallback // 下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
          noMoreSize: 0,
          callback: upCallback, // 上拉加载的回调
          isBounce: false, // 如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
          scrollbar: {
            use: false
          },
          toTop: {
            warpId: null, 
            src: './i/top.png', 
            html: null, 
            offset: 1000, 
            warpClass: 'mescroll-totop', 
            showClass: 'mescroll-fade-in', 
            hideClass: 'mescroll-fade-out', 
            duration: 300, 
            supportTap: false
          }
        }
      })
      // 上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
      function upCallback (params) {
        params.num = Math.floor(params.num / 10) * 10 + 1
        params.size = params.num + 9
        console.log(params.num);
        var ajaxTimeoutTest = $.ajax({
          url: JJJW + '?page=' + params.num + '&pageSize=' + params.size,
          // data: "data",
          dataType: 'json',
          type: 'POST',
          // jsonp: 'callback',
          timeout: 10000,
          success: function success (res) {
            // 联网成功的回调,隐藏下拉刷新的状态
            mescrollJJJW.endSuccess(); // 无参
            params.num += 10
            params.size += 10
            // 设置数据
            // setXxxx(data);//自行实现 TODO
            var newsHtml = ''
            var resData = res.resultData
            console.log(resData);
            var errCode = res.errCode
            if ( errCode == 0) {
              resData.map(function (el, index) {
                if (el.imgUrl) {
                  newsHtml += `<li>
                  <a href="../juanwenDetails.html?id=${el.id}" class="am-link-muted  flex-row">
                  <div class="img-wr"><img src=${el.imgUrl} ></div>
                  <div class="txt-wr">
                    <div class="news-txt line-clamp">${el.title}</div>
                    <div class="news-time">${el.author}&emsp;&emsp;${el.uploadTime.substr(0,10)}</div>
                  </div>
                  </a>
                </li>`
                  
                }else {
                  newsHtml += `<li>
                <a href="../juanwenDetails.html?id=${el.id}" class="am-link-muted  flex-row">
                <div class="txt-wr">
                  <div class="news-txt line-clamp">${el.title}</div>
                  <div class="news-time">${el.author}&emsp;&emsp;${el.uploadTime.substr(0,10)}</div>
                </div>
                </a>
              </li>`
                }
              })
              if (params.num - 10 == 1) {
                $list.html(newsHtml)
              }else{
                $list.append(newsHtml)
              }
              if(resData.length < 10){
                mescrollJJJW.endSuccess(0, false)
              }
            } else {
              // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
              // 必传参数(当前页的数据个数, 是否有下一页true/false)
              mescrollJJJW.endSuccess(0 , false)
            }
          },
          error: function error (err) {
            // 联网失败的回调,隐藏下拉刷新的状态
            mescrollJJJW.endErr()
            params.start = params.start > 10 ? params.start - 10 : 1
            params.end = params.end > 10 ? params.end - 10 : 10
            console.log(err)
            document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
            document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">服务器开小差了，请稍候再试</h4></div></div>'
          },
          complete: function complete (XMLHttpRequest, status) {
            if (status == 'timeout') {
              // 超时,status还有success,error等值的情况
              params.start = params.start > 10 ? params.start - 10 : 1
              params.end = params.end > 10 ? params.end - 10 : 10
              ajaxTimeoutTest.abort()
              document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
              document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请求超时</h4></div></div>'
            }
          }
        })
      }
      // 下拉刷新的回调
      function downCallback () {
        params.num = 1
        params.size = 10
        upCallback(params)
      }
    }
  }
  var jjywList = function(){
    var $main = $('#jjyw')
    var $list = $main.find('#newsList')
    var params = {num: 1, size: 10}
    this.init = function (){
      $list.html("")
      var mescrollJJYW = new MeScroll('jjyw', { // 第一个参数"mescroll"对应上面布局结构div的id
        // 如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        // 解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
          // callback: downCallback // 下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
          noMoreSize: 0,
          callback: upCallback, // 上拉加载的回调
          isBounce: false, // 如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
          scrollbar: {
            use: false
          },
          toTop: {
            warpId: null, 
            src: './i/top.png', 
            html: null, 
            offset: 1000, 
            warpClass: 'mescroll-totop', 
            showClass: 'mescroll-fade-in', 
            hideClass: 'mescroll-fade-out', 
            duration: 300, 
            supportTap: false
          }
        }
      })
      // 上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
      function upCallback (params) {
        params.num = Math.floor(params.num / 10) * 10 + 1
        params.size = params.num + 9
        console.log(params.num);
        var ajaxTimeoutTest = $.ajax({
          url: JJYW + '?page=' + params.num + '&pageSize=' + params.size,
          // data: "data",
          dataType: 'json',
          type: 'POST',
          // jsonp: 'callback',
          timeout: 10000,
          success: function success (res) {
            // 联网成功的回调,隐藏下拉刷新的状态
            mescrollJJYW.endSuccess(); // 无参
            params.num += 10
            params.size += 10
            // 设置数据
            // setXxxx(data);//自行实现 TODO
            var newsHtml = ''
            var resData = res.resultData
            console.log(resData);
            var errCode = res.errCode
            if ( errCode == 0) {
              resData.map(function (el, index) {
                newsHtml +=
                  '<li onclick="window.location.href=' + el.url + '">\n              <a href="' + el.url + '" class="am-block am-link-muted" target="_blank">\n                <div class="news-title line-clamp">' + el.title + '</div>\n                <div class="news-time">' + el.createTime + '</div>\n              </a>\n            </li>'
              })
              if (params.num - 10 == 1) {
                $list.html(newsHtml)
              }else{
                $list.append(newsHtml)
              }
              if(resData.length < 10){
                mescrollJJYW.endSuccess(0, false)
              }
            } else {
              // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
              // 必传参数(当前页的数据个数, 是否有下一页true/false)
              mescrollJJYW.endSuccess(0 , false)
            }
          },
          error: function error (err) {
            // 联网失败的回调,隐藏下拉刷新的状态
            mescrollJJYW.endErr()
            params.start = params.start > 10 ? params.start - 10 : 1
            params.end = params.end > 10 ? params.end - 10 : 10
            console.log(err)
            document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
            document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">服务器开小差了，请稍候再试</h4></div></div>'
          },
          complete: function complete (XMLHttpRequest, status) {
            if (status == 'timeout') {
              // 超时,status还有success,error等值的情况
              params.start = params.start > 10 ? params.start - 10 : 1
              params.end = params.end > 10 ? params.end - 10 : 10
              ajaxTimeoutTest.abort()
              document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">'
              document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请求超时</h4></div></div>'
            }
          }
        })
      }
      // 下拉刷新的回调
      function downCallback () {
        params.num = 1
        params.size = 10
        upCallback(params)
      }
    }
  }

  $(function () {
    var tabs = $('.tabs'); // tabs  选项卡
    var pages = $('.pages'); // pages  页面
    var tabIcons = tabs.find('img')
    var app_jjyw = new jjywList()
    app_jjyw.init()
var app_ynjjy = new ynjjyList()
    app_ynjjy.init()
var app_jjjw = new jjjwList()
    app_jjjw.init()
    var pageNo = 1
    if (location.search != '') {
      var search = parseURL(location.href)
      loadPage(search.page)
    } else {
      loadPage('jjyw')
    }

    function loadPage (page) {
      // 添加am-navbar-active
      tabs.removeClass('am-navbar-active')
      pages.addClass('am-hide')

      var tabIcon = $('.tabs').find('img')
      // tabicon
      for (var i = 0, len = tabIcons.length; i < len; ++i) {
        tabIcons[i].setAttribute('src', tabIcons[i].getAttribute('src').replace(/_active/, ''))
      }
      // console.log(page)
      switch (page) {
        case 'jjyw':
          $('.jjyw').addClass('am-navbar-active')
          $('.jjyw').find('img').attr('src', $('.jjyw').find('img').attr('src').replace(/.png/, '_active.png'))
          $('#jjyw').removeClass('am-hide')
          // var app_jjyw = new jjywList()
          // app_jjyw.init()
          break
        case 'ymjgs':
          $('.ymjgs').addClass('am-navbar-active')
          $('.ymjgs').find('img').attr('src', $('.ymjgs').find('img').attr('src').replace(/.png/, '_active.png'))
          $('#ymjgs').removeClass('am-hide')
          break
        case 'ynjjy':
          $('.ynjjy').addClass('am-navbar-active')
          $('.ynjjy').find('img').attr('src', $('.ynjjy').find('img').attr('src').replace(/.png/, '_active.png'))
          $('#ynjjy').removeClass('am-hide')
          // var app_ynjjy = new ynjjyList()
          // app_ynjjy.init()
          break
        case 'tmswdc':
          // $('.tmswdc').addClass('am-navbar-active')
          // $('.tmswdc').find('img').attr('src', $('.tmswdc').find('img').attr('src').replace(/.png/, '_active.png'))
          // $('#tmswdc').removeClass('am-hide')
          break
        case 'jjjw':
          $('.jjjw').addClass('am-navbar-active')
          $('.jjjw').find('img').attr('src', $('.jjjw').find('img').attr('src').replace(/.png/, '_active.png'))
          $('#jjjw').removeClass('am-hide')
          // var app_jjjw = new jjjwList()
          // app_jjjw.init()
          break
        default:
          break
      }
    }
    // 解析参数
    function parseURL (url) {
      var url = url.split('?')[1]
      var para = url.split('&')
      var len = para.length
      var res = {}
      var arr = []
      for (var i = 0; i < len; i++) {
        arr = para[i].split('=')
        res[arr[0]] = arr[1]
      }
      return res
    }

    tabs.on('touchstart', function (e) {
      var dataset = e.currentTarget.dataset
      loadPage(dataset.page)
    })
  })
})(window.jQuery)
