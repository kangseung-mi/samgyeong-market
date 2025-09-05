/***************************************
 * prototype 모음
 ***************************************/

//-----------------------------------------------------------------------------
// 문자 앞 뒤 공백을 제거 한다.
//-----------------------------------------------------------------------------
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//-----------------------------------------------------------------------------
// 내용이 있는지 없는지 확인하다.
//
// @return : true(내용 있음) | false(내용 없음)
//-----------------------------------------------------------------------------
String.prototype.notNull = function() {
	return (this == null || this.trim() == "") ? false : true;
}

//-----------------------------------------------------------------------------
// 메일의 유효성을 체크 한다.
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.mail = function() {
	var em = this.trim().match(/^[_\-\.0-9a-zA-Z]{3,}@[-.0-9a-zA-z]{2,}\.[a-zA-Z]{2,4}$/);
	return (em) ? true : false;
}

//-----------------------------------------------------------------------------
// 주민번호 체크 XXXXXX-XXXXXXX 형태로 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.jumin = function() {
	var num = this.trim().onlyNum();
	if(num.length == 13) {
		num = num.substring(0, 6) + "-" + num.substring(6, 13);
	}
	else {
		return false;
	}
	num = num.match(/^([0-9]{6})-?([0-9]{7})$/);
	if(!num) return false;
	var num1 = RegExp.$1;
	var num2 = RegExp.$2;
	if(!num2.substring(0, 1).match(/^[1-4]{1}$/)) return false;
	num = num1 + num2;
	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (i=0; i<12; i++) {
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : false;
}

//-----------------------------------------------------------------------------
// 사업자번호 체크 XXX-XX-XXXXX 형태로 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.biznum = function() {
	var num = this.trim().onlyNum();
	if(num.length == 10) {
		num = num.substring(0, 3) + "-" + num.substring(3, 5) + "-" + num.substring(5, 10);
	}
	else {
		return false;
	}
	num = num.match(/([0-9]{3})-?([0-9]{2})-?([0-9]{5})/);
	if(!num) return false;
	num = RegExp.$1 + RegExp.$2 + RegExp.$3;
	var cVal = 0;
	for (var i=0; i<8; i++) {
		var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
		cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
	}
	var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0';
	cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
	return (parseInt(num.substring(9,10)) == 10 - (cVal % 10)%10) ? true : false;
}

//-----------------------------------------------------------------------------
// 전화번호 체크 XXX-XXXX-XXXX 형태로 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.phone = function() {
	var num = this.trim().onlyNum();
	if(num.substring(1,2) == "2") {
		num = num.substring(0, 2) + "-" + num.substring(2, num.length - 4) + "-" + num.substring(num.length - 4, num.length);
	}
	else {
		num = num.substring(0, 3) + "-" + num.substring(3, num.length - 4) + "-" + num.substring(num.length - 4, num.length);
	}
	num = num.match(/^0[0-9]{1,2}-[1-9]{1}[0-9]{2,3}-[0-9]{4}$/);
	return (num) ? true : false;
}

//-----------------------------------------------------------------------------
// 핸드폰 체크 XXX-XXXX-XXXX 형태로 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.mobile = function() {
	var num = this.trim().onlyNum();
	num = num.substring(0, 3) + "-" + num.substring(3, num.length - 4) + "-" + num.substring(num.length - 4, num.length);
	num = num.trim().match(/^01[016789]{1}-[1-9]{1}[0-9]{2,3}-[0-9]{4}$/);
	return (num) ? true : false;
}

//-----------------------------------------------------------------------------
// 숫자만 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.num = function() {
	return (this.trim().match(/^[0-9]+$/)) ? true : false;
}

//-----------------------------------------------------------------------------
// 영어만 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.eng = function() {
	return (this.trim().match(/^[a-zA-Z]+$/)) ? true : false;
}

//-----------------------------------------------------------------------------
// 영어와 숫자만 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.engnum = function() {
	return (this.trim().match(/^[0-9a-zA-Z]+$/)) ? true : false;
}

//-----------------------------------------------------------------------------
// 영어와 숫자만 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.numeng = function() {
	return this.engnum();
}

//-----------------------------------------------------------------------------
// 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.userid = function() {
	return (this.trim().match(/[a-zA-z]{1}[0-9a-zA-Z]+$/)) ? true : false;
}

//-----------------------------------------------------------------------------
// 한글만 체크
//
// @return : true(맞는 형식) | false(잘못된 형식)
//-----------------------------------------------------------------------------
String.prototype.kor = function() {
	return (this.trim().match(/^[가-힣]+$/)) ? true : false;
}

//-----------------------------------------------------------------------------
// 숫자와 . - 이외의 문자는 다 뺀다. - 통화량을 숫자로 변환
//
// @return : 숫자
//-----------------------------------------------------------------------------
String.prototype.toNum = function() {
	var num = this.trim();
	return (this.trim().replace(/[^0-9\.-]/g,""));
}

//-----------------------------------------------------------------------------
// 숫자 이외에는 다 뺀다.
//
// @return : 숫자
//-----------------------------------------------------------------------------
String.prototype.onlyNum = function() {
	var num = this.trim();
	return (this.trim().replace(/[^0-9]/g,""));
}

//-----------------------------------------------------------------------------
// 숫자만 뺀 나머지 전부
//
// @return : 숫자 이외
//-----------------------------------------------------------------------------
String.prototype.noNum = function() {
	var num = this.trim();
	return (this.trim().replace(/[0-9]/g,""));
}

//-----------------------------------------------------------------------------
// 숫자에 3자리마다 , 를 찍어서 반환
//
// @return : 통화량
//-----------------------------------------------------------------------------
String.prototype.toMoney = function() {
	var num = this.toNum();
	var pattern = /(-?[0-9]+)([0-9]{3})/;
	while(pattern.test(num)) {
		num = num.replace(pattern,"$1,$2");
	}
	return num;
}

//-----------------------------------------------------------------------------
// String length 반환
//
// @return : int
//-----------------------------------------------------------------------------
String.prototype.getLength = function() {
	return this.length;
}

//-----------------------------------------------------------------------------
// String length 반환 한글 2글자 영어 1글자
//
// @return : int
//-----------------------------------------------------------------------------
String.prototype.getByteLength = function() {
	var tmplen = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127)
			tmplen += 2;
		else
			tmplen++;
	}
	return tmplen;
}

//-----------------------------------------------------------------------------
// 파일 확장자 반환
//
// @return : String
//-----------------------------------------------------------------------------
String.prototype.getExt = function() {
	var ext = this.substring(this.lastIndexOf(".") + 1, this.length);
	return ext;
}

//-----------------------------------------------------------------------------
// String에 따라서 받침이 있으면 은|이|을 을
//                 받침이 없으면 는|가|를 등을 리턴 한다.
// str.josa("을/를") : 구분자는 항상 "/"로
//
//
// @return : 은/는, 이/가 ...
//-----------------------------------------------------------------------------
String.prototype.josa = function(nm) {
	var nm1 = nm.trim().substring(0, nm.trim().indexOf("/"));
	var nm2 = nm.trim().substring(nm.trim().indexOf("/") + 1, nm.trim().length);
	var a = this.substring(this.length - 1, this.length).charCodeAt();
	a = a - 44032;
	var jongsung = a % 28;
	return (jongsung) ? nm1 : nm2;
}


/***************************************
 * Form에 관련된 메서드
 *
 * 1. text, textarea
 *    required : 값이 없으면 경고
 *    num : 값에 숫자만 가능
 *    eng : 값에 영어만 가능
 *    han : 값에 한글만 가능
 *    numeng : 값에 숫자와 영어만 가능
 *    min=value : 최소 value자 이상
 *    max=value : 최대 value자 이하
 *    len=value : 정확하게 value자만 가능
 *    len=start~end : start자에서 end자까지 가능
 *    userid : 영어 숫자만 가능하고 첫문자는 영어로
 *    phone=value : value가 ""면 이 필드만 아니면 value가 같은 phone에 관련된 모든 필드 조사
 *    mobile=value : value가 ""면 이 필드만 아니면 value가 같은 mobile에 관련된 모든 필드 조사
 *    email=value : value가 ""면 이 필드만 아니면 value가 같은 email에 관련된 모든 필드 조사
 *    jumin=value : value가 ""면 이 필드만 아니면 value가 같은 jumin에 관련된 모든 필드 조사
 *    biznum=value : value가 ""면 이 필드만 아니면 value가 같은 biznum에 관련된 모든 필드 조사
 * 2. select
 *    required : 값이 없으면 경고
 * 3. radio
 *    required : 아무것도 선택되지 않으면 경고
 * 4. checkbox
 *    required : 아무것도 선택되지 않으면 경고
 *    min=value : 최소 value개 이상 가능
 *    max=value : 최대 value개 이하 가능
 *    len=value : 정확하게 value개 가능
 *    len=start~end : start개에서 end개 까지 가능
 * 5. file
 *    required :  아무것도 선택되지 않으면 경고
 *    allow=value : 확장자가 value 인 파일만 업로드 가능 (allow="gif jpg jpeg png")
 *    deny=value : 확장자가 value 인 파일은 업로드 불가능
 ***************************************/
//-----------------------------------------------------------------------------
// FormUtil Class 생성
//-----------------------------------------------------------------------------
/*
FormUtil = function(obj) {
	this.obj = obj;
}
*/
function FormUtil(obj){
	this.obj = obj;
}

//-----------------------------------------------------------------------------
// 폼 유효성 체크
//
// @return : true | false
//-----------------------------------------------------------------------------
FormUtil.prototype.success = function() {

	for(var i = 0; i < this.obj.elements.length; i++) {
		var f = this.obj[i];

		if (f.getAttribute("FNAME") == null || $(f).hasClass('displaynone')){
			continue;
		}else{
			var fname = f.getAttribute("FNAME");
		}

		// checkbox
		if(f.type == "checkbox") {
			if(!this.checkbox(f, fname)) {
				return false;
			}
		}
		// radio
		else if(f.type == "radio") {
			if(!this.radio(f, fname)) {
				return false;
			}
		}
		else { // text, textarea, password, select
			// <input required>
			if(f.getAttribute("REQUIRED") != null) {
				var ftype = f.type;
				var msg = " 입력 하세요";
				if(ftype.indexOf("select") >= 0 || ftype == "file") {
					msg = " 선택하세요";
				}

				if(!f.value.notNull()) {
					alert(fname + fname.josa("을/를") + msg);
					f.focus();
					return false;
				}
			}
			// <input num>
			if(f.getAttribute("NUM") != null && f.value != "") {
				if(!f.value.num()) {
					alert(fname + fname.josa("은/는") + " 숫자로만 구성되어야 합니다.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input eng>
			if(f.getAttribute("ENG") != null && f.value != "") {
				if(!f.value.eng()) {
					alert(fname + fname.josa("은/는") + " 영어로만 구성되어야 합니다.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input numeng>
			if(f.getAttribute("NUMENG") != null && f.value != "") {
				if(!f.value.numeng()) {
					alert(fname + fname.josa("은/는") + " 숫자와 영어로만 구성되어야 합니다.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input han>
			if(f.getAttribute("HAN") != null && f.value != "") {
				if(!f.value.kor()) {
					alert(fname + fname.josa("은/는") + " 한글로만 구성되어야 합니다.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input userid>
			if(f.getAttribute("USERID") != null && f.value != "") {
				if(!f.value.userid()) {
					alert(fname + fname.josa("은/는") + " 숫자와 영어로만 구성되어야 하며\n첫문자는 반드시 영어로 시작해야 합니다.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input type="file" deny="value">
			if(f.getAttribute("DENY") != null && f.type == "file" && f.value != "") {
				var ext = f.value.getExt().toLowerCase();
				var ext2 = f.getAttribute("DENY").toLowerCase();
				if(ext2.indexOf(ext) >= 0) {
					alert("확장자가 " + f.getAttribute("DENY").toUpperCase() + " 인 파일은 업로드 하실 수 없습니다.");
					return false;
				}
			}
			// <input type="file" deny="value">
			if(f.getAttribute("ALLOW") != null && f.type == "file" && f.value != "") {
				var ext = f.value.getExt().toLowerCase();
				var ext2 = f.getAttribute("ALLOW").toLowerCase();
				if(ext2.indexOf(ext) < 0) {
					alert("확장자가 " + f.getAttribute("ALLOW").toUpperCase() + " 인 파일만 업로드 가능 합니다.");
					return false;
				}
			}
			// <input max="10">
			if(f.getAttribute("MAX") != null) {
				var tmpLen = f.value.getLength();
				if(tmpLen > parseInt(f.getAttribute("MAX"))) {
					alert(fname + fname.josa("은/는") + " " + f.getAttribute("MAX") + "자 이하로 입력 하세요.");
					f.value = "";
					f.focus();
					return false;
				}
			}
			// <input min="10">
			if(f.getAttribute("MIN") != null) {
				var tmpLen = f.value.getLength();
				if(tmpLen < parseInt(f.getAttribute("MIN"))) {
					alert(fname + fname.josa("은/는") + " " + f.getAttribute("MIN") + "자 이상으로 입력 하세요.");
					f.focus();
					return false;
				}
			}
			// <input len="10">
			if(f.getAttribute("LEN") != null) {
				var tmpLen = f.value.getLength();
				var val = f.getAttribute("LEN");
				if(val.indexOf(val.noNum()) > 0) {
					var num1 = val.substring(0, val.indexOf(val.noNum()));
					var num2 = val.substring(val.lastIndexOf(val.noNum()) + 1, val.length);
					if(tmpLen < parseInt(num1) || tmpLen > parseInt(num2)) {
						alert(fname + fname.josa("은/는") + " " + num1 + "자 이상 " + num2 + "자 이하로 입력하세요");
						f.focus();
						return false;
					}
				}
				else {
					if(tmpLen != parseInt(val)) {
						alert(fname + fname.josa("은/는") + " " + val + "자리 입니다.");
						f.focus();
						return false;
					}
				}
			}
		}
	}

	for(var i = 0; i < this.obj.elements.length; i++) {
		var f = this.obj[i];
		// <input phone="name">
		if(f.getAttribute("PHONE") != null) {
			var val = "";
			if(f.getAttribute("PHONE") == "") {
				val = f.value
			}
			else {
				val = this.getValue("PHONE", f.getAttribute("PHONE"));
			}
			if(!val.phone()) {
				alert("올바른 전화번호가 아닙니다.\n다시 확인하여 주세요");
				f.focus();
				return false;
			}
		}

		// <input mobile="name">
		if(f.getAttribute("MOBILE") != null) {
			var val = "";
			if(f.getAttribute("MOBILE") == "") {
				val = f.value
			}
			else {
				val = this.getValue("MOBILE", f.getAttribute("MOBILE"));
			}
			if(!val.mobile()) {
				alert("올바른 핸드폰번호가 아닙니다.\n다시 확인하여 주세요");
				f.focus();
				return false;
			}
		}

		// <input fax="name">
		if(f.getAttribute("FAX") != null) {
			var val = "";
			if(f.getAttribute("FAX") == "") {
				val = f.value
			}
			else {
				val = this.getValue("FAX", f.getAttribute("FAX"));
			}
			if (val != "")
			{
				if(!val.phone()) {
					alert("올바른 팩스번호가 아닙니다.\n다시 확인하여 주세요");
					f.focus();
					return false;
				}
			}
		}

		// <input jumin="name">
		if(f.getAttribute("JUMIN") != null) {
			var val = "";
			if(f.getAttribute("JUMIN") == "") {
				val = f.value
			}
			else {
				val = this.getValue("JUMIN", f.getAttribute("JUMIN"));
			}
			if(!val.jumin()) {
				alert("올바른 주민등록 번호가 아닙니다.\n다시 확인하여 주세요");
				f.focus();
				return false;
			}
		}
		// <input email="name">
		if(f.getAttribute("EMAIL") != null) {
			var val = "";
			if(f.getAttribute("EMAIL") == "") {
				val = f.value
			}
			else {
				val = this.getValue("EMAIL", f.getAttribute("EMAIL"));
			}
			if(!val.mail()) {
				alert("유효한 이메일이 아닙니다.\n다시 확인하여 주세요");
				f.focus();
				return false;
			}
		}
		// <input biznum="name">
		if(f.getAttribute("BIZNUM") != null) {
			var val = "";
			if(f.getAttribute("BIZNUM") == "") {
				val = f.value
			}
			else {
				val = this.getValue("BIZNUM", f.getAttribute("BIZNUM"));
			}
			if(!val.bizname()) {
				alert("유효한 사업자 등록 번호가 아닙니다.\n다시 확인하여 주세요");
				f.focus();
				return false;
			}
		}

	}

	return true;
}

//-----------------------------------------------------------------------------
// Checkbox 일때 유효성 체크
//
// @return : true | false
//-----------------------------------------------------------------------------
FormUtil.prototype.checkbox = function(f, fname) {
	var chkObj = eval("this.obj." + f.name);
	// 체크박스를 선택하여야 할 때
	var c = 0;
	var len = chkObj.length;
	if(len) {
		for(var j = 0; j < len; j++) {
			if(chkObj[j].checked) c++;
		}
	}
	else {
		if(chkObj.checked) c = 1;
	}

	if(f.getAttribute("REQUIRED") != null) {
		if(c == 0) {
			alert(fname + fname.josa("을/를") + " 선택하여 주세요");
			return false;
		}
	}
	if(f.getAttribute("MAX") != null) {
		var val = f.getAttribute("MAX");
		if(c > parseInt(val)) {
			alert(fname + fname.josa("은/는") + " 최대 " + val + "개 이하로 선택 하셔야 합니다.");
			return false;
		}
	}
	if(f.getAttribute("MIN") != null) {
		var val = f.getAttribute("MIN");
		if(c < parseInt(val)) {
			alert(fname + fname.josa("은/는") + " 최소 " + val + "개 이상 선택 하셔야 합니다.");
			return false;
		}
	}
	if(f.getAttribute("LEN") != null) {
		var val = f.getAttribute("LEN");
		if(val.indexOf(val.noNum()) > 0) {
			var num1 = val.substring(0, val.indexOf(val.noNum()));
			var num2 = val.substring(val.lastIndexOf(val.noNum()) + 1, val.length);
			if(c < parseInt(num1) || c > parseInt(num2)) {
				alert(fname + fname.josa("은/는") + " " + num1 + "개 이상 " + num2 + "개 이하로 선택 하셔야 합니다.");
				return false;
			}
		}
		else {
			if(c != parseInt(val)) {
				alert(fname + fname.josa("은/는") + " " + val + "개 선택 하셔야 합니다.");
				f.focus();
				return false;
			}
		}
	}
	return true;
}

//-----------------------------------------------------------------------------
// Radio 유효성 체크
//
// @return : true | false
//-----------------------------------------------------------------------------
FormUtil.prototype.radio = function(f, fname) {
	var chkObj = eval("this.obj." + f.name);
	if(f.getAttribute("REQUIRED") != null) {
		var c = 0;
		var len = chkObj.length;
		if(len) {
			for(var j = 0; j < len; j++) {
				if(chkObj[j].checked) c++;
			}
		}
		else {
			if(chkObj.checked) c = 1;
		}
		if(c == 0) {
			alert(fname + fname.josa("을/를") + " 선택하여 주세요");
			return false;
		}
	}
	return true;
}

//-----------------------------------------------------------------------------
// 체크되어 있는 갯수를 리턴해 준다.
//
// @return : int
//-----------------------------------------------------------------------------
FormUtil.prototype.checked = function(btn) {
	var len = btn.length;
	var c = 0;
	if(len) {
		for(var j = 0; j < len; j++) {
			if(btn[j].checked) c++;
		}
	}
	else {
		if(btn.checked) c = 1;
	}
	return c;
}

//-----------------------------------------------------------------------------
// 해당 name의 값이 같은 filed를 구한다.
//
// @return : String
//-----------------------------------------------------------------------------
FormUtil.prototype.getValue = function(name, value) {
	var val = "";
	for(var j = 0; j < this.obj.elements.length; j++) {
		if(eval("this.obj[j].getAttribute(\"" + name + "\")") != null && eval("this.obj[j].getAttribute(\"" + name + "\")") == value) {
			if(val == "") {
				val += this.obj[j].value;
			}
			else {
				val += "@" + this.obj[j].value;
			}
		}
	}
	return val;
}
//-->