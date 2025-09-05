jQuery11(function(){
	let $ = jQuery11, arr_brand_list = [];
    
    // 브랜드 데이터 수집
    let list = $('.wp-brand-list').children('li');
    for (let i = 0, l = list.length; i < l; i++){
        arr_brand_list[i] = {
            "name" : $(list[i]).children('a').text(),
            "html" : $(list[i]).html(),
            "outerhtml" : $(list[i])[0].outerHTML
        };
    }
    
    // 안전장치: 브랜드 목록이 비어있으면 백업 목록 사용
    if (arr_brand_list.length === 0) {
        console.log('브랜드 목록이 없어서 백업 목록을 사용합니다');
        
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
    }
    
    // 브랜드 정렬
    arr_brand_list.sort(function(a, b){
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
    
    // 기존 DOM 업데이트
    for(let i = 0, l = list.length; i < l; i++){
		$(list[i]).html(arr_brand_list[i].html);
        $('.wp-brand-list.summary').append(list[i].outerHTML);
	}
    
    // 헤더에서 선택된 브랜드를 저장할 전역 변수
    window.selectedHeaderBrand = '';
    
    // 드롭다운 생성 함수 (검색 페이지용)
    function createSearchPageDropdown() {
        let brandSelect = $('.brandSelect');
        if (brandSelect.length > 0) {
            brandSelect.empty();
            brandSelect.append('<option value="">전체 브랜드</option>');
            
            for(let i = 0; i < arr_brand_list.length; i++) {
                let brandName = arr_brand_list[i].name;
                if (brandName && brandName.trim() !== '') {
                    let option = $('<option></option>').attr('value', brandName).text(brandName);
                    brandSelect.append(option);
                }
            }
            console.log('✅ 검색 페이지 드롭다운 생성:', brandSelect.find('option').length, '개 옵션');
            return true;
        }
        return false;
    }
    
    // 헤더 드롭다운 설정 함수 (강화된 버전)
    function setupHeaderDropdown() {
        let attempts = 0;
        const maxAttempts = 5;
        
        const trySetup = function() {
            attempts++;
            console.log(`헤더 드롭다운 설정 시도 ${attempts}/${maxAttempts}`);
            
            // 1단계: 헤더와 드롭다운 요소 확인
            let headerElement = document.getElementById('header');
            let headerSelect = document.querySelector('.headerBrandSelect');
            let searchPageSelect = document.querySelector('.brandSelect');
            
            if (!headerElement) {
                console.log('헤더 요소가 아직 없음');
                if (attempts < maxAttempts) {
                    setTimeout(trySetup, 200);
                }
                return;
            }
            
            if (!headerSelect) {
                console.log('headerBrandSelect 요소가 아직 없음');
                if (attempts < maxAttempts) {
                    setTimeout(trySetup, 200);
                }
                return;
            }
            
            if (!searchPageSelect) {
                console.log('검색 페이지 드롭다운이 아직 준비되지 않음');
                if (attempts < maxAttempts) {
                    setTimeout(trySetup, 200);
                }
                return;
            }
            
            // 2단계: 헤더 드롭다운에 브랜드 옵션 복사
            try {
                console.log('헤더 드롭다운에 브랜드 옵션 복사 중...');
                
                // 기존 옵션 제거
                headerSelect.innerHTML = '';
                
                // 검색 페이지의 모든 옵션을 헤더로 복사
                for (let i = 0; i < searchPageSelect.options.length; i++) {
                    let originalOption = searchPageSelect.options[i];
                    let newOption = document.createElement('option');
                    newOption.value = originalOption.value;
                    newOption.textContent = originalOption.text;
                    headerSelect.appendChild(newOption);
                }
                
                console.log('✅ 헤더 브랜드 옵션 복사 완료:', headerSelect.options.length, '개');
                
                // 3단계: 이벤트 바인딩 (DOM 방식 - 더 안전함)
                headerSelect.onchange = function() {
                    window.selectedHeaderBrand = this.value;
                    console.log('✅ 헤더에서 브랜드 선택됨:', window.selectedHeaderBrand);
                };
                
                // 4단계: 검색 폼 이벤트 바인딩
                let searchForm = document.getElementById('searchBarForm');
                if (searchForm) {
                    searchForm.onsubmit = function(e) {
                        e.preventDefault();
                        
                        console.log('헤더 검색 실행!');
                        console.log('선택된 브랜드:', window.selectedHeaderBrand);
                        
                        let keywordField = document.getElementById('keyword');
                        let userKeyword = keywordField ? keywordField.value.trim() : '';
                        
                        console.log('입력된 검색어:', userKeyword);
                        
                        // 브랜드 + 검색어 조합
                        let combinedKeyword = window.selectedHeaderBrand && window.selectedHeaderBrand !== '' 
                            ? (userKeyword ? window.selectedHeaderBrand + ' ' + userKeyword : window.selectedHeaderBrand)
                            : userKeyword;
                            
                        console.log('최종 검색어:', combinedKeyword);
                        
                        // 검색어를 키워드 필드에 설정하고 폼 제출
                        if (keywordField) {
                            keywordField.value = combinedKeyword;
                        }
                        
                        this.submit();
                        return false;
                    };
                    
                    console.log('헤더 검색 폼 이벤트 바인딩 완료');
                } else {
                    console.log('헤더 검색 폼을 찾을 수 없음');
                }
                
                console.log('헤더 드롭다운 설정 완료!');
                return true;
                
            } catch (error) {
                console.log('헤더 드롭다운 설정 중 오류:', error);
                if (attempts < maxAttempts) {
                    setTimeout(trySetup, 200);
                }
                return false;
            }
        };
        
        // 즉시 시작
        trySetup();
    }
    
    // 실행 순서
    // 1. 검색 페이지 드롭다운 생성
    createSearchPageDropdown();
    
    // 2. 헤더 드롭다운 설정 (지연 실행)
    setTimeout(setupHeaderDropdown, 100);
    
    // 3. 추가 안전장치들
    $(document).ready(function() {
        setTimeout(setupHeaderDropdown, 500);
    });
    
    $(window).on('load', function() {
        setTimeout(setupHeaderDropdown, 1000);
    });
    
    // 기존 이벤트들 (검색 페이지용)
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
            
        $('input[name="combined_keyword"]').val(combinedKeyword);
        $('.keyword').attr('name', 'temp_keyword');
        $('input[name="combined_keyword"]').attr('name', 'keyword');
        this.submit();
    });
});

let brandToggle = function(){
    $('.all-brand-list, .bg--all-brand-list').removeClass('displaynone');
    $('#header .top-area').addClass('all-brand--expand');
    $('html').addClass('no-scroll');
}

// 검색 완료 후 검색창 정리
setTimeout(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tempKeyword = urlParams.get('temp_keyword');
    const brandParam = urlParams.get('brand');
    
    if (tempKeyword) {
        $('.keyword').val(decodeURIComponent(tempKeyword));
    }
    
    if (brandParam) {
        const decodedBrand = decodeURIComponent(brandParam);
        $('.brandSelect').val(decodedBrand);
        
        // 헤더 드롭다운도 같은 값으로 설정
        let headerSelect = document.querySelector('.headerBrandSelect');
        if (headerSelect) {
            headerSelect.value = decodedBrand;
            window.selectedHeaderBrand = decodedBrand;
        }
    }
}, 100);