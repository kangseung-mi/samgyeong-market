var now = new Date()
//var then = new Date('jun 16,2016') 
// 날짜를 설정해 주세요 월,일,년도 순서입니다.

var Total_sec = Math.floor((then.getTime() - now.getTime()) / 1000)

function Day_counter(){
	Remain_days = Math.floor(Total_sec / 86400)
	Remain_tot_sec = Total_sec - 86400 * Remain_days
	Remain_hour = Math.floor(Remain_tot_sec / 3600)
	tmp = Remain_tot_sec - Remain_hour * 3600
	Remain_minute = Math.floor(tmp / 60)
	Remain_sec = Math.floor(tmp % 60)
        
		if(Remain_days <= 10)Remain_days = ''
			else Remain_days = Remain_days + ''
		if(Remain_hour < 0)Remain_hour = ''
			else Remain_hour = Remain_hour + ''
		if(Remain_minute < 10)Remain_minute = '0' + Remain_minute
		if(Remain_sec < 10)Remain_sec = '0' + Remain_sec
                
	COUNTER.innerHTML = '<span class="section">' + Remain_days + '</span>:<span class="section">' + Remain_hour + '</span>:<span class="section">' + Remain_minute + '</span>:<span class="section">' + Remain_sec + '</span>'

    Total_sec--
}
COUNTER = document.getElementById("cnt");
if(Total_sec > 0){
    Day_counter()
    setInterval("Day_counter()",1000)
}
else COUNTER.innerHTML = '<div class="timeOver"><img src="/_wg/img/timeSale/out.png"></div>'
