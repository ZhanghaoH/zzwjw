var CAROUSEL_HTML = 'http://app2.henanga.gov.cn/jmth5/zzga/wxService/getWXNewsImg'
var ZZWJW = 'http://zzga.zhengzhou.gov.cn'

// init carousel
$('#focus-img-1').owlCarousel({
	autoPlay: 3000,
	navigation: true,
	slideSpeed: 300,
	paginationSpeed: 400,
	stopOnHover: true,
	rewindSpeed: 10,
	singleItem: true
})
$('#focus-img-2').owlCarousel({
	autoPlay: 3000,
	navigation: true,
	slideSpeed: 300,
	paginationSpeed: 400,
	stopOnHover: true,
	rewindSpeed: 10,
	singleItem: true
})
$('#focus-img-3').owlCarousel({
	autoPlay: 3000,
	navigation: true,
	slideSpeed: 300,
	paginationSpeed: 400,
	stopOnHover: true,
	rewindSpeed: 10,
	singleItem: true
})

// $.ajax({
//   url: CAROUSEL_HTML,
//   type: 'POST',
//   // data: "data",
//   dataType: 'json',
//   // jsonp: 'callback',
//   success: function (response) {
//     // console.log(response)
//     var res = response
//     var errCode = res.errCode
//     if (errCode == 0) {
//       var carouselJson = res.resultData.content
//       var carouselHtml = carouselJson.replace(/src="/g, 'src="http://zzga.zhengzhou.gov.cn')
//       // var carouselHtml = carouselJson
//       $('#focus-img-1').html(carouselHtml)
//       $('#focus-img-2').html(carouselHtml)
//       $('#focus-img-3').html(carouselHtml)
//       // init carousel
//       $('#focus-img-1').owlCarousel({
//         autoPlay: 3000,
//         navigation: true,
//         slideSpeed: 300,
//         paginationSpeed: 400,
//         stopOnHover: true,
//         rewindSpeed: 10,
//         singleItem: true
//       })
//       $('#focus-img-2').owlCarousel({
//         autoPlay: 3000,
//         navigation: true,
//         slideSpeed: 300,
//         paginationSpeed: 400,
//         stopOnHover: true,
//         rewindSpeed: 10,
//         singleItem: true
//       })
//       $('#focus-img-3').owlCarousel({
//         autoPlay: 3000,
//         navigation: true,
//         slideSpeed: 300,
//         paginationSpeed: 400,
//         stopOnHover: true,
//         rewindSpeed: 10,
//         singleItem: true
//       })
//     }else {
//       $('#focus-img').html(res.msg)
//     }
//   }
// })
$(window).on('load resize', function() {
	var aspectRatio = 16 / 9
	var focusPic = $('.focus-pic')
	focusPic.css('height', focusPic.width() / aspectRatio + 'px')
	// focusPic.find('.item img').each(function () {
	//   $(this).css('height',$(window).width()  / aspectRatio + 'px')
	// })
})