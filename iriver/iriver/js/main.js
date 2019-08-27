$(document).ready(function () {

	// 공지사항에 date 추가 --> 추후에 database와 연동해서 작성 날짜를 저장 후 불러오는 함수 추가 예정
	var t = new Date();
	var now_year = t.getFullYear();
	var now_month = t.getMonth();
	now_month += 1;
	var now_date = t.getDate();
	//console.log(now_year, now_month, now_date);
	$(".date").text(now_year + "." + now_month + "." + now_date);

	
	//banner 슬라이드 + button 누르면 다음 또는 이전 이미지로 넘어가는 부분
	var state = false;
	var playOn = false;
	var direction = "right";
	var bannerAuto;
	/* play();
		1. 기능 : flag 변수 playOn을 받아 false면 오른쪽으로 이미지가 애니메이션 동작하게 해주는 함수
		2. 변수 : playOn : 현재 베너 이미지 애니메이션이 재생중인지 알려주는 flag 변수
	*/
	function play() {
		if (!playOn) { 
			playOn = true;
			bannerAuto = setInterval(function () {
				$("#nextBtn").click();
			}, 2000);
		}
	}
	/* stop();
		1. 기능 : flag변수 playOn을 받아 현재 베너 애니메이션이 동작중이면 정지하는 함수 
	*/
	function stop() {
		if (playOn) {
			playOn = false;
			clearInterval(bannerAuto);
		}
	}
	/* right();
		1. 기능 : 베너 오른쪽에 있는 버튼을 누르면 이미지가 오른쪽으로 이동하는 애니메이션을 하도록 하는 함수
		2. flow chart
			1) 현재 동작하고 있는 에니메이션 stop();
			2) 이동중에 오른쪽 버튼을 눌렀을 때를 대비하여 먼저 이동하던 이미지를 강제로 이동시킴
			3) 방향을 알려주는 direction변수에 right 입력
			4) insertAfter 함수를 이용하여 맨 앞에 있는 li를 맨 뒤로 보내줌(Append와 동일한 기능)
			5) 버튼이 눌렸는지 확인해주는 flag변수 state를 초기화
			6) 베너 정상적으로 동작하도록 play();
	*/
		function right() {
		stop();
		direction = "right";
		$(".mainPhoto").animate({ "margin-left": "-970px" }, 1000, "swing", function () {
			$(this).children("li:first").insertAfter($(this).children("li:last"));
			$(this).css({ "margin-left": 0 });
			state = false;
			play();
		});
	}
	/* right();
		1. 기능 : 베너 오른쪽에 있는 버튼을 누르면 이미지가 오른쪽으로 이동하는 애니메이션을 하도록 하는 함수
		2. flow chart
			1) 현재 동작하고 있는 에니메이션 stop();
			2) 이동중에 오른쪽 버튼을 눌렀을 때를 대비하여 먼저 이동하던 이미지를 강제로 이동시킴
			3) 방향을 알려주는 direction변수에  left 입력
			4) insertBefore 함수를 이용하여 맨 뒤에 있는 li를 맨 앞으로 보내줌(Append하기 전과 동일한 기능)
			5) 버튼이 눌렸는지 확인해주는 flag변수 state를 초기화
			6) 베너 정상적으로 동작하도록 play();
	*/
	function left() {
		stop();
		direction = "left";
		$(".mainPhoto > li:last").insertBefore($(".mainPhoto > li:first"));
		$(".mainPhoto").css({ "margin-left": "-970px" });
		$(".mainPhoto").animate({ "margin-left": 0 }, 1000, "swing", function () {
			state = false;
			play();
		});
	}
	/* button click 상태를 알려주는 함수
		1. 기능 : 왼쪽 버튼 혹은 오른쪽 버튼이 눌렸는지 알려주는 flag 함수
		2. state를 true로 만들어주고 바로 left() 혹은 rifht()함수 실행
	*/
	$("#prevBtn").click(function () {
		if (!state) {
			state = true;
			left();
		}
	});
	$("#nextBtn").click(function () {
		if (!state) {
			state = true;
			right();
		}
	});
	play();//배너의 default 상태 : play();

	//베너 클릭했을 때 해당 상품 페이지로 이동
	$(".mainPhoto li").click(function(){
		//var img_link=$(this.children(a).children(img).attr("src"));
		$(this).children("a").attr({"href": "../shop/shop_index.html" });;
	});

});//document(function)
