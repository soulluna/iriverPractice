$(document).ready(function () {

	//gnb 1st_depth hover event handler
	//호버했을 때
	$("#gnb > ul.top_depth_01 > li").on("mouseenter", function () {
		var ori_img = $(this).children("a").children("img").attr("src").split(".");
		var changed_img = "";
		//console.log(ori_img);
		var img_name = ori_img[1];
		var img_extension = ori_img[2];//img src를 입력받아 확장자와 이름으로 나눔
		//console.log(img_name, img_extension);
		img_name = "." + img_name + "_ov";//_ov(호버 이미지)를 src에 붙여 호버했을 때 이미지이름으로 수정
		changed_img = img_name + "." + img_extension;
		//console.log(changed_img);
		$(this).children("a").children("img").attr({ "src": changed_img });//src에 적용
		$(this).children("ul").css({ "display": "block" });//하위메뉴 보여줌
	});
	//호버 하지 않았을 때
	$("#gnb > ul.top_depth_01 > li").on("mouseleave", function () {
		var ori_img = $(this).children("a").children("img").attr("src").split(".");
		//console.log(ori_img);
		var img_name = ori_img[1];
		img_name = img_name.split("_");//img src를 입력받아 확장자와 이름으로 나눔
		//console.log(img_name);
		var rechange_imagename = img_name[0] + "_" + img_name[1];
		var img_extension = ori_img[2];//ov를 제거한 원래 이미지를 src에 넣어 호버하지 않았을 때 이미지이름으로 수정

		//console.log(rechange_imagename,img_extension);
		var rechange_image = "." + rechange_imagename + "." + img_extension;
		//console.log(rechange_image);
		$(this).children("a").children("img").attr({ "src": rechange_image });//원래 이미지를 src에 적용
		$(this).children("ul").css({ "display": "none" });//하위메뉴 보여주지 않음
	});

	// gnb 2nd_depth hover event handler
	//호버했을 때
	$(".top_depth_02 li").on("mouseenter", function () {
		var ori_img = $(this).children("a").children("img").attr("src").split(".");
		var img_name = "", img_extension = "", changed_img = "";
		//console.log(ori_img);
		img_name = ori_img[1];
		img_extension = ori_img[2];//img src를 입력받아 확장자와 이름으로 나눔
		//console.log(img_name, img_extension);
		img_name = "./" + img_name + "_on";//_on(호버 이미지)를 src에 붙여 호버했을 때 이미지이름으로 수정
		changed_img = img_name + "." + img_extension;
		//console.log(changed_img);
		$(this).children("a").children("img").attr({ "src": changed_img });//src에 적용

	});
	//호버 하지 않았을 때
	$(".top_depth_02 li").on("mouseleave", function () {
		var ori_img = $(this).children("a").children("img").attr("src").split(".");//img 파일명을 수정하기 위해 split함수를 이용하여 파일명을 split함
		console.log(ori_img);
		var img_name = "", img_extension = "";
		var img_name = ori_img[1];//split한 파일명을 각각의 string변수에 담음
		img_name = img_name.split("_");//on를 제거한 원래 이미지를 src에 넣어 호버하지 않았을 때 이미지이름으로 수정
		console.log(img_name);
		var rechange_imagename = img_name[0] + "_" + img_name[1];
		var img_extension = ori_img[2];
		//console.log(rechange_imagename,img_extension);
		var rechange_image = "." + rechange_imagename + "." + img_extension;//호버하기 전 이미지 경로로 변환
		console.log(rechange_image);
		$(this).children("a").children("img").attr({ "src": rechange_image });//원래 이미지를 src에 적용
	});
	//검색창에 아무것도 입력하지 않았을 이벤트
	$("#header > .right_lnb > .top_search > button").on("click", function () {
		var search_word = $("input").val();
		if (search_word == "")//검색창에 아무것도 입력하지 않은 경우
		{
			alert("아무것도 입력하지 않았습니다.");
		}
	});
	//전체보기 메뉴 click event handler
	var now_display = "";
	$(".btn_full").on("click", function(){
		now_display = $(".full_wrap_out").css("display");
		if (now_display == "block") {
			$(".full_wrap_out").css({ "display": "none" });
			$(this).children("li").children("a").children("img").attr({"src" : "./images/top_btnFull.gif"});
		}
		else if (now_display == "none") {
			$(".full_wrap_out").css({ "display": "block" });
			$(this).children("li").children("a").children("img").attr({"src" : "./images/top_btnFull_open.gif"});
		}
	});
	$(".btn_close").on("click", function(){
		$(".full_wrap_out").css({ "display": "none" });
		$(".btn_full img").attr({"src" : "./images/top_btnFull.gif"});
	});

	//family site hover
	// 함수로 만들어서 넣었는데 여기 부분만 초기화가 되지 않아 어쩔수 없이 노가다로 작성
	// 7월 1주 주말에 한번 더 수정 예정
	$(".footer_site01").on("mouseenter", function () {
		$(".footer_site02").css({ "display": "block" });
		$(".site").eq(0).on("mouseenter", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site07_on.gif"});
		});
		$(".site").eq(0).on("mouseleave", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site07.gif"});
		});
		$(".site").eq(1).on("mouseenter", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site05_on.gif"});
		});
		$(".site").eq(1).on("mouseleave", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site05.gif"});
		});
		$(".site").eq(2).on("mouseenter", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site02_on.gif"});
		});
		$(".site").eq(2).on("mouseleave", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site02.gif"});
		});
		$(".site").eq(3).on("mouseenter", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site04_on.gif"});
		});
		$(".site").eq(3).on("mouseleave", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site04.gif"});
		});
		$(".site").eq(4).on("mouseenter", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site08_on.gif"});
		});
		$(".site").eq(4).on("mouseleave", function () {
			$(this).children("a").children("img").attr({"src" : "./images/footer_site08.gif"});
		});
	});
	$(".footer_site02").on("mouseleave", function () {
		$(this).css({ "display": "none" });
	});
});//document(function)


//이름 변환하는 함수(_on이 붙는 이름들)
function name_change_on(now_html1, now_index1) {
	now_html1 = "." + now_html1;
	//console.log(now_html1);
	var ori_img = $(now_html1).eq(now_index1 - 1).children("a").children("img").attr("src").split(".");
	var img_name = "";
	var img_extension = "";
	var changed_img = "";
	//console.log(ori_img);
	img_name = ori_img[1];
	img_extension = ori_img[2];//img src를 입력받아 확장자와 이름으로 나눔
	//console.log(img_name, img_extension);
	img_name = "./" + img_name + "_on";//_on(호버 이미지)를 src에 붙여 호버했을 때 이미지이름으로 수정
	changed_img = img_name + "." + img_extension;
	//console.log(changed_img);
	$(now_html1).eq(now_index1 - 1).children("a").children("img").attr({ "src": changed_img });//src에 적용
}

//이름 변환하는 함수(_on을 떼는 함수)
function name_rechange_on(now_html2, now_index2) {
	var ori_img = $("." + now_html2).eq(now_index2 - 1).children("a").children("img").attr("src").split(".");
	console.log(ori_img);
	var img_name1 = "";
	var img_extension1 = "";
	var img_name1 = ori_img[1];
	img_name1 = img_name.split("_");//on를 제거한 원래 이미지를 src에 넣어 호버하지 않았을 때 이미지이름으로 수정
	console.log(img_name1);
	var img_name1 = img_name1[0] + "_" + img_name1[1];
	var img_extension1 = ori_img[2];
	console.log(img_name1, img_extension1);
	var rechange_imagename1 = "." + img_name1 + "." + img_extension1;
	console.log(rechange_imagename1);
	$("." + now_html2).eq(now_index2 - 1).children("a").children("img").attr({ "src": rechange_imagename1 });//원래 이미지를 src에 적용
}