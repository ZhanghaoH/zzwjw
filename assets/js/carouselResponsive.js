var CAROUSEL_HTML = 'http://app2.henanga.gov.cn/jmth5/zzga/wxService/getWXNewsImg';

var ZZWJW = 'http://zzga.zhengzhou.gov.cn';
$("#focus-img").owlCarousel({
  autoPlay: 3000,
  navigation: true,
  slideSpeed: 300,
  paginationSpeed: 400,
  stopOnHover: true,
  rewindSpeed: 10,
  singleItem: true
});
// $.ajax({
//   url: CAROUSEL_HTML,
//   type: 'POST',
//   // data: "data",
//   dataType: "json",
//   // jsonp: 'callback',
//   success: function (response) {
//     // console.log(response);
//     var res = response
//     var errCode = res.errCode
//     if(errCode == 0){
//       var carouselJson = res.resultData.content;
//       var carouselHtml = carouselJson.replace(/src="/g, 'src="http://zzga.zhengzhou.gov.cn');
//       // var carouselHtml = carouselJson;
//       $('#focus-img').html(carouselHtml);
//       // init carousel
//       $("#focus-img").owlCarousel({
//         autoPlay: 3000,
//         navigation: true,
//         slideSpeed: 300,
//         paginationSpeed: 400,
//         stopOnHover: true,
//         rewindSpeed: 10,
//         singleItem: true
//       });
//     }else{
//       $('#focus-img').html(res.msg);
//     }
//   }
// });
$(window).on('load resize', function () {
  var aspectRatio = 16 / 9;
  var focusPic = $('.focus-pic');
  focusPic.css('height', focusPic.width() / aspectRatio + 'px');
  // focusPic.find('.item img').each(function () {
  //   if ($(this).width() / $(this).height() > aspectRatio) {
  //     $(this).css('width', '100%')
  //     $(this).css('height', '100%')
  //     // var marginTop = (focusPic.height() - $(this).height()) / 2
  //     // $(this).css('margin-top', (marginTop > 0 ? marginTop : 0) + 'px')
  //     $(this).css('margin-top', '0px')
  //   } else {
  //     $(this).css('width', '100%')
  //     $(this).css('height', '100%')
  //     $(this).css('margin-top', '0px')
  //   }
  // })
})
