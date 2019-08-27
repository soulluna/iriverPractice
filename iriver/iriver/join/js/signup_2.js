$(document).ready(function () {
    setDateBox();
    setTelephoneBox();
    setCellphoneBox();
    setEmail();
});
// 만약에 인증을 받으면 그 인증받을 때 사용한 사용자 정보를 입력받아서 출력하는 함수 추가해야 함
// select box 연도 , 월, 일 표시
function setDateBox() {
    var dt = new Date();
    var year = "";
    var com_year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var userDay = dt.getDate();
    var day = 0;
    var i = 1;
    // 연도
    $("#joinYear").append("<option value=''>년</option>");
    // 올해 기준으로 100년 전까지 보여줌
    for (var y = (com_year); y >= (com_year - 100); y--) {
        $("#joinYear").append("<option value='" + y + "'>" + y + " 년" + "</option>");
    }
    // 월 뿌려주기(1월부터 12월)
    $("#joinMonth").append("<option value=''>월</option>");
    for (i = 1; i <= 12; i++) {
        $("#joinMonth").append("<option value='" + i + "'>" + i + " 월" + "</option>");
    }
    //month에 따라서 출력할 일수를 다르게 하기 위해 switch-case문 사용
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: day = 31; break;
        case 4: case 6: case 9: case 11: day = 30; break;
        case 2:
            if ((com_year % 4 == 0) && (com_year % 100 != 0) || com_year % 400 == 0) {
                day = 28;
            }
            else {
                day = 29;
            }
            break;
    }
    //일 뿌려주기(달에 맞춰서 계산)
    console.log(day);
    console.log(userDay);
    $("#joinDay").append("<option value=''>일</option>");
    for (var j = 1; j <= day; j++) {
        $("#joinDay").append("<option value'" + j + "'>" + j + " 일" + "</option>");
    }

    //default 설정
    $("#joinYear").children("option").eq(1).attr({ "selected": "selected" });
    $("#joinMonth").children("option").eq(month).attr({ "selected": "selected" });
    $("#joinDay").children("option").eq(userDay).attr({ "selected": "selected" });
}
//전화번호 select 화면
function setTelephoneBox() {
    var Telephone = ["02", "031", "032", "033", "041", "042", "043", "044", "051", "052", "053", "054", "055", "061", "062", "063", "064", "070"];
    //console.log(Telephone.length);
    for (var i = 0; i < Telephone.length; i++) {
        $("#userPhone1").append("<option value='" + Telephone[i] + "'>" + Telephone[i] + "</option>");
    }
}
//핸드폰 select 화면
function setCellphoneBox() {
    var Cellphone = ["010", "011", "016", "017", "018", "019"];
    //console.log(Cellphone.length);
    for (var i = 0; i < Cellphone.length; i++) {
        $("#userCellPhone1").append("<option value='" + Cellphone[i] + "'>" + Cellphone[i] + "</option>");
    }
}
//email select 화면
function setEmail() {
    var Email = ["naver.com", "hanmail.net", "nate.com", "gamil.com", "hotmail.com", "dreamwiz.com", "daum.net", "korea.com", "직접입력"];
    //console.log(Cellphone.length);
    for (var i = 0; i < Email.length; i++) {
        $("#userEmail2").append("<option value='" + Email[i] + "'>" + Email[i] + "</option>");
    }
    //직접입력창 띄우기
    $('#userEmail2').change(function () {
        var state = $('#userEmail2 option:selected').val();
        if (state == "직접입력") {
            $('#directInputEmail').show();
        } else {
            $('#directInputEmail').hide();
        }
    });
}



var SC = {};
/***************************************세부적 폼값 체크***************************************************
*
* 작성자 : 장준영
* chk 값이 y 일경우 무조건 체크, n 일경우 값이 있으면 체크
------------------------------------------------------------------------
* @objform    : 폼이름(this 혹은 document.formname)
------------------------------------------------------------------------
* 사용법 예제 (영어,숫자만 4~12글자로 받는다)
<table border="1">
<form name="member_form" method="post" action="" onsubmit="return SC.checkForm(this)">
<tr>
<td>비밀번호</td>
<td><input type="password" name="passwd" chk="y" msg="비밀번호를" kind="eng+num" len="4-12">
<input type='submit'>
</td>
</tr>
</form>
</table>
****************************************************************************************/
SC.checkForm = function(objform) {
    var obj = objform;
    var count = obj.length;
    var chk = '';
    var msg = '';
    var kind = '';
    var from = '';
    var item = '';
    var len = '';
    var ex_len = '';
    var len_chk = '';
    var len_text = '';
    var min = '';
    var max = '';
    var result = '';
    var first = '';
    var ret_chk = false;

    for (var x = 0; x < count; x++) {
        item = obj.elements[x];
        if (item.name) {
            if (item.getAttribute('chk')) {
                chk = item.getAttribute('chk'); //value 있을시 검사n   있거나 없거나 검사y
                msg = item.getAttribute('msg'); //alert메세지 앞부분 한글
                kind = item.getAttribute('kind'); //value에 허용조건 (num,eng,kor)
                from = item.getAttribute('from'); //value값 일치시킬 name값
                len = item.getAttribute('len'); //textbox value 허용 범위

                if (chk == 'y' || chk == 'Y') { first = "item.value == '' || ("; }
                else { first = "item.value && ("; }

                if (len) {
                    ex_len = len.split('-');
                    min = ex_len[0];
                    max = ex_len[1];

                    if (min == max)	//길이가 정해져있다면 해당글자 표시
                    {
                        len_chk = " || item.value.length != " + min;
                        len_text = " [" + min + " 글자]";
                    }
                    else {			//범위가 정해져있다면 범위표시  (n ~ n)
                        len_chk = " || item.value.length < " + min + " || item.value.length > " + max;
                        len_text = " [" + min + " ~ " + max + " 글자]";
                    }
                }

                //검사 항목
                switch (kind) {
                    //숫자로만 
                    case 'num':
                        result = "var num_pattern = /(^[0-9]+$)/gi;";
                        result += "if (" + first + "!num_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 숫자로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //영어로만 
                    case 'eng':
                        result = "var eng_pattern = /(^[a-zA-Z]+$)/gi;";
                        result += "if (" + first + "!eng_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 영어로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //한글로만 
                    case 'kor':
                        result = "var kor_pattern = /(^[ㄱ-힣]+$)/gi;";
                        result += "if (" + first + "!kor_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 한글로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //from='필드'  와 일치검사시 
                    case 'like':
                        result = "var obj_from = document.getElementsByName('" + from + "')[0];";
                        result += "if (obj_from.value && (obj_from.value !== item.value" + len_chk + ")) {";
                        result += "alert('" + msg + " 일치 하지 않습니다." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //영어 한글 
                    case 'kor+eng':
                    case 'eng+kor':
                        result = "var eng_kor_num_pattern = /(^[a-zA-Zㄱ-힣\-_]+$)/gi;";
                        result += "if (" + first + "!eng_kor_num_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 영문 및 한글로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //영어 한글 숫자 
                    case 'num+eng+kor':
                    case 'kor+num+eng':
                    case 'eng+num+kor':
                    case 'num+kor+eng':
                    case 'kor+eng+num':
                    case 'eng+kor+num':
                        result = "var eng_kor_num_pattern = /(^[a-zA-Z0-9ㄱ-힣\-_]+$)/gi;";
                        result += "if (" + first + "!eng_kor_num_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 영문,한글 및 숫자로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //영어 숫자 
                    case 'num+eng':
                    case 'eng+num':
                        result = "var eng_num_pattern = /(^[a-zA-Z0-9\-_]+$)/gi;";
                        result += "if (" + first + "!eng_num_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 숫자 및 영어로만 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //행과연프로젝트로 인한 추가(소수점체크) 2008.9.23 
                    case 'float':
                        result = "var float_pattern = /(^[0-9\.]+$)/gi;";
                        result += "if (" + first + "!float_pattern.test(item.value)" + len_chk + ")) {";
                        if (item.value.trim() != "") {
                            result += "alert('" + msg + " 숫자(소수점포함)만 입력하세요." + len_text + "');";
                        } else {
                            result += "alert('" + msg + " 입력하세요." + len_text + "');";
                        }
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //이메일 
                    case 'email':
                        result = "var email_pattern = /(^[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+\.[a-zA-Z]+[.a-zA-Z]+$)/gi;";
                        result += "if (" + first + "!email_pattern.test(item.value)" + len_chk + ")) {";
                        result += "alert('" + msg + " 정확히 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;
                    //주민등록번호(사용법 : 주민번호 뒷부분 필드에 kind='jumin_number' from='앞부분필드' chk='y' msg='아무거나') 
                    case 'jumin':
                    case 'jumin_number':
                        var jumin_number_chk = false;
                        var obj_from = document.getElementsByName(from)[0];
                        if (chk == 'y' || chk == 'Y') {
                            jumin_number_chk = true;
                        }
                        else {
                            if (obj_from.value || item.value) jumin_number_chk = true;
                        }

                        if (jumin_number_chk == true) {
                            result = "var jumin_number_check = juminNumberChk('" + obj_from.value + "-" + item.value + "');";
                            result += "if (jumin_number_check == false) {";
                            result += "alert('" + msg + " 정확히 입력하세요." + len_text + "');";
                            result += "item.focus();";
                            result += "ret_chk = true;";
                            result += "}";
                            eval(result);
                            if (ret_chk == true) return false;
                        }
                        break;

                    default:
                        result = "if (" + first + "item.value.trim() == ''" + len_chk + ")) {";
                        result += "alert('" + msg + " 입력하세요." + len_text + "');";
                        result += "item.focus();";
                        result += "ret_chk = true;";
                        result += "}";
                        eval(result);
                        if (ret_chk == true) return false;
                        break;

                } //switch 종료
            }
        }
        chk = '';
        msg = '';
        kind = '';
        from = '';
        item = '';
        len = '';
        ex_len = '';
        len_chk = '';
        len_text = '';
        min = '';
        max = '';
        result = '';
        first = '';
        ret_chk = false;
    } //for 종료

    function juminNumberChk(jumin_number) {
        jumin_number = jumin_number.replace('-', '');
        if (jumin_number.length > 13) return false;
        var last = jumin_number.substring(13, 12);
        var arr = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
        var val = 0;

        for (var i = 0; i < 12; i++) {
            val += arr[i] * jumin_number.substring(i, i + 1);
        }

        val = val % 11;
        if (11 - val == last) {
            return true;
        }
        else {
            return false;
        }
    }

    return true;
}


document.aspnetForm.onsubmit = function() {
    return frmCheck();
}

function frmCheck() {
    var frm = document.aspnetForm;
    if (frm.ctl00$cpContents$frmName.value.trim() == '') {
        alert(' 이름을 입력하세요'); frm.ctl00$cpContents$frmName.focus(); return false;
    }

    if (frm.ctl00$cpContents$frmJumin1.value.trim() == '') {
        alert(' 주민등록번호를 입력하세요'); frm.ctl00$cpContents$frmJumin1.focus(); return false;
    }
    if (frm.ctl00$cpContents$frmJumin2.value.trim() == '') {
        alert(' 주민등록번호를 입력하세요'); frm.ctl00$cpContents$frmJumin2.focus(); return false;
    }

        var r = SC.checkForm(frm);
        if (r) {

            if (frm.frmParentAgree)
                if (frm.frmParentAgree.checked == false) {
                alert('가입 동의를 하지 않으셨습니다.'); return false;
            }

        }
        else {
            return false;
        }
    return true;
}


function goUserType(t) {
    if (t == 1) {
        location.href = "join_check_realname.aspx";
    }
    else if (t == 2) {
        location.href = "join_check_realname2.aspx";
    }
    else if (t == 3) {
        location.href = "join_check_realname3.aspx";
    }
}

function changeRealnameForm(type) {
	if(type == 'I'){
		document.getElementById("ipin_area").style.display = "";
		document.getElementById("sid_area").style.display = "none";
		document.getElementById("sid_footer").style.display = "none";
	}
	if(type == 'N'){
		document.getElementById("ipin_area").style.display = "none";
		document.getElementById("sid_area").style.display = "";
		document.getElementById("sid_footer").style.display = "";
	}
}