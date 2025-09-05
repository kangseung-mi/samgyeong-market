jQuery11(function(){
	let $ = jQuery11, arr_brand_list = [];
    // 브랜드 데이터 수집
    let list = $('.wp-brand-list').children('li');
    for (let i = 0, l = list.length; i < l; i++){
        // 각 브랜드의 name(텍스트)을 배열로 저장
    	arr_brand_list[i] = {
            "name" : $(list[i]).children('a').text(), // 브랜드명
            "html" : $(list[i]).html(),
            "outerhtml" : $(list[i])[0].outerHTML};
    }
    
    // 👇 안전장치: 브랜드 목록이 비어있으면 백업 목록 사용
    if (arr_brand_list.length === 0) {
        console.log('브랜드 목록이 없어서 백업 목록을 사용합니다');
        
        // 백업 브랜드 목록 (실제 브랜드명으로 변경하세요)
        const backupBrands = [
            "G7", "가나디", "게랑드소금", "기꼬만", "기라델리", "긴죠", "네스카페", "네슬레", "네펠리", "노무라", "노보", "노이하우스", "니비시", "다비도프", "데라리타", 
            "델몬트", "도쿄바나나", "도쿄카지노", "라구", "라구스테냐"
        ];
        
        for (let i = 0; i < backupBrands.length; i++) {
            arr_brand_list[i] = {
                "name": backupBrands[i],
                "html": `<a href="/search/?keyword=${backupBrands[i]}">${backupBrands[i]}</a>`,
                "outerhtml": `<li><a href="/search/?keyword=${backupBrands[i]}">${backupBrands[i]}</a></li>`
            };
        }
    } else {
        console.log('기존 방식으로 브랜드 목록을 가져왔습니다:', arr_brand_list.length, '개');
    }
    
    // 브랜드 정렬
    arr_brand_list.sort(function(a, b){
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		if (nameA < nameB)  return -1;
		if (nameA > nameB) 	return 1;
		return 0;
	});
    
    // 기존 DOM 업데이트
    for(let i = 0, l = list.length; i < l; i++){
		$(list[i]).html(arr_brand_list[i].html);
        $('.wp-brand-list.summary').append(list[i].outerHTML);
	}
    
    // 드롭다운 생성 함수 추가
    function createBrandDropdown() {

// 헤더 드롭다운 재시도 함수 추가
function retryHeaderDropdown() {
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkAndCreate = function() {
        attempts++;
        console.log(`헤더 드롭다운 시도 ${attempts}/${maxAttempts}`);
        
        // 헤더 드롭다운이 존재하고 옵션이 없는 경우에만 재생성
        if ($('.headerBrandSelect').length > 0 && $('.headerBrandSelect option').length <= 1) {
            console.log('헤더 드롭다운 발견! 옵션 생성 중...');
            
            // 헤더 드롭다운만 따로 처리
            let headerSelect = $('.headerBrandSelect');
            headerSelect.empty();
            headerSelect.append('<option value="">전체 브랜드</option>');
            
            for(let i = 0; i < arr_brand_list.length; i++) {
                let brandName = arr_brand_list[i].name;
                if (brandName && brandName.trim() !== '') {
                    let option = $('<option></option>').attr('value', brandName).text(brandName);
                    headerSelect.append(option);
                }
            }
            
            console.log('헤더 드롭다운 완성:', $('.headerBrandSelect option').length, '개 옵션');
            return; // 성공하면 종료
        }
        
        // 아직 없으면 재시도
        if (attempts < maxAttempts) {
            setTimeout(checkAndCreate, 300); // 0.3초 후 재시도
        } else {
            console.log('헤더 드롭다운을 찾을 수 없거나 이미 생성됨');
        }
    };
    
    // 0.5초 후부터 시작 (헤더 로딩 시간 고려)
    setTimeout(checkAndCreate, 500);
}

// 재시도 함수 실행
retryHeaderDropdown();

        // 기존 검색 페이지용 + 헤더용 모두 선택
        let brandSelect = $('.brandSelect, .headerBrandSelect');
  		if (brandSelect.length > 0) {
            // 기존 옵션 제거 (중복 방지)
            brandSelect.empty();
        	brandSelect.append('<option value="">전체 브랜드</option>');
       
       		for(let i = 0; i < arr_brand_list.length; i++) {
            	let brandName = arr_brand_list[i].name;
                if (brandName && brandName.trim() !== '') {
            		let option = $('<option></option>').attr('value', brandName).text(brandName);
            		brandSelect.append(option);
                }
            }
    // 디버깅 로그
            console.log('브랜드 드롭다운 생성:', $('.brandSelect option').length, '/', $('.headerBrandSelect option').length);
        }    
    }
    // 드롭다운 생성 실행
    createBrandDropdown();
    
    // 브랜드 선택 이벤트 추가
    // $('.brandSelect').on('change', function() {
    //     let selectedBand = $(this).val();
    //     let keywordInput = $('.keyword');
        
    //     if (selectrdBrand && selectedBrand !== '') {
    //         let currentkeyword = keywordInput.val().trim();
    //         if (currentkeyword === '') {
    //             keywordInput.val(selectedBrand);
    //             } else {
    //                 keywordInput.val(selectedBrand + ' ' + currenrkeyword);
    //                 }
    //         }
    //     });
    
    // 검색 폼 제출 시에만 브랜드명 추가
	// $('.searchField').on('submit', function() {
    //     let selectedBrand = $('.brandSelect').val();
    //     let keywordInput = $('.keyword');
    // 	let currentKeyword = keywordInput.val().trim();
    // 	if (selectedBrand && selectedBrand !== '') {
    //     	if (currentKeyword === '') {
    //         	keywordInput.val(selectedBrand);
    //     	} else {
    //         	keywordInput.val(selectedBrand + ' ' + currentKeyword);
    //     	}
    // 	}
	// });
    
// 브랜드 선택 시 즉시 검색창에 반영하는 방식 (폼 제출 이벤트 사용 안함)
// 아무 이벤트도 넣지 않음 - 폼은 기본 동작 그대로 실행
    
    
    

	// 검색 페이지용 브랜드 선택 이벤트 - 즉시 검색창에 반영
    /*
    let selectedBrand;
    $('.brandSelect').on('change', function() {
        selectedBrand = $(this).val();
    });
    */
    
    let selectedHeaderBrand;
    $('.headerBrandSelect').on('change', function () {
        selectedHeaderBrand = $(this).val();
    })
    
    $('#header .all-brand-list .close').on('click', function(){
        $('.all-brand-list, .bg--all-brand-list').addClass('displaynone');
        $('#header .top-area').removeClass('all-brand--expand');
        $('html').removeClass('no-scroll');
    });
    
   

	$('.searchField').on('submit', function(e) {
        e.preventDefault();
        
        let selectedBrand = $('.brandSelect').val();
        let userKeyword = $('.keyword').val().trim();
        let combinedKeyword = selectedBrand && selectedBrand !== '' 
            ? (userKeyword ? selectedBrand + ' ' + userKeyword : selectedBrand)
            : userKeyword;
        // 숨겨진 필드에 합친 키워드 설정
        $('input[name="combined_keyword"]').val(combinedKeyword);
        // 키워드 필드 이름 변경하여 원본 보존
        $('.keyword').attr('name', 'temp_keyword');
        $('input[name="combined_keyword"]').attr('name', 'keyword');
        // 폼 제출
        this.submit();
    });
    
    $('#searchBarForm').on('submit', function(e) {
        e.preventDefault();
        
        const $keyword=$(this).find('#keyword')
        
        console.log($keyword, 'keyword')
        
        //let selectedBrand = $('.brandSelect').val();
        let userKeyword = $keyword.val().trim();
        let combinedKeyword = selectedHeaderBrand && selectedHeaderBrand !== '' 
            ? (userKeyword ? selectedHeaderBrand + ' ' + userKeyword : selectedHeaderBrand)
            : userKeyword;
        // 숨겨진 필드에 합친 키워드 설정
        $('input[name="header_combined_keyword"]').val(combinedKeyword);
        // 키워드 필드 이름 변경하여 원본 보존
        $keyword.attr('name', 'temp_keyword');
        $('input[name="header_combined_keyword"]').attr('name', 'keyword');
        // 폼 제출
        this.submit();
    });
    
    
    
});

let brandToggle = function(){
    $('.all-brand-list, .bg--all-brand-list').removeClass('displaynone');
    $('#header .top-area').addClass('all-brand--expand');
    $('html').addClass('no-scroll');
}



// 검색 완료 후 검색창 정리
/* setTimeout(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tempKeyword = urlParams.get('temp_keyword');
    if (tempKeyword) {
        $('.keyword').val(decodeURIComponent(tempKeyword));
    }
}, 100);
*/
setTimeout(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tempKeyword = urlParams.get('temp_keyword');
    const brandParam = urlParams.get('brand'); // 브랜드 파라미터 추가
    
    if (tempKeyword) {
        $('.keyword').val(decodeURIComponent(tempKeyword));
    }
    
    // 브랜드 선택 상태 복원
    if (brandParam) {
        const decodedBrand = decodeURIComponent(brandParam);
        $('.brandSelect').val(decodedBrand);
        $('.headerBrandSelect').val(decodedBrand);
    }
}, 100);



