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
    
    // 브랜드 데이터 수집 함수 (메인페이지 대응)
    function collectBrandDataFromSource() {
        let brandData = [];
        
        // 1순위: 기존 처리된 데이터
        if (arr_brand_list.length > 0) {
            console.log('기존 브랜드 데이터 사용:', arr_brand_list.length, '개');
            return arr_brand_list;
        }
        
        // 2순위: wp-brand-list에서 직접 수집 (메인페이지용)
        let brandList = $('.wp-brand-list');
        if (brandList.length > 0) {
            console.log('wp-brand-list에서 브랜드 데이터 수집 중...');
            let listItems = brandList.children('li');
            
            for (let i = 0; i < listItems.length; i++) {
                let link = $(listItems[i]).children('a');
                if (link.length > 0) {
                    brandData.push({
                        name: link.text().trim(),
                        html: $(listItems[i]).html(),
                        outerhtml: listItems[i].outerHTML
                    });
                }
            }
            
            // 정렬
            brandData.sort(function(a, b){
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            
            console.log('wp-brand-list에서 수집 완료:', brandData.length, '개');
            return brandData;
        }
        
        // 3순위: 백업 데이터
        console.log('백업 브랜드 데이터 사용');
        const backupBrands = [
            "G7", "가나디", "게랑드소금", "기꼬만", "기라델리", "긴죠", "네스카페", "네슬레", "네펠리", "노무라", "노보", "노이하우스", "니비시", "다비도프", "데라리타", 
            "델몬트", "도쿄바나나", "도쿄카지노", "라구", "라구스테냐"
        ];
        
        for (let i = 0; i < backupBrands.length; i++) {
            brandData.push({
                name: backupBrands[i],
                html: `<a href="/search/?keyword=${backupBrands[i]}">${backupBrands[i]}</a>`,
                outerhtml: `<li><a href="/search/?keyword=${backupBrands[i]}">${backupBrands[i]}</a></li>`
            });
        }
        
        return brandData;
    }
    
    // 드롭다운 생성 함수 (검색 페이지용)
    function createSearchPageDropdown() {
        let brandSelect = $('.brandSelect');
        if (brandSelect.length > 0) {
            brandSelect.empty();
            brandSelect.append('<option value="">전체 브랜드</option>');
            
            let brandData = collectBrandDataFromSource();
            for(let i = 0; i < brandData.length; i++) {
                let brandName = brandData[i].name;
                if (brandName && brandName.trim() !== '') {
                    let option = $('<option></option>').attr('value', brandName).text(brandName);
                    brandSelect.append(option);
                }
            }
            console.log('검색 페이지 드롭다운 생성:', brandSelect.find('option').length, '개 옵션');
            return true;
        }
        return false;
    }
    
    // 헤더 드롭다운 직접 생성 함수 (메인페이지 대응)
    function createHeaderDropdownDirect() {
        let headerSelect = document.querySelector('.headerBrandSelect');
        if (!headerSelect) {
            console.log('headerBrandSelect 요소가 없음');
            return false;
        }
        
        let brandData = collectBrandDataFromSource();
        if (brandData.length === 0) {
            console.log('브랜드 데이터가 없음');
            return false;
        }
        
        console.log('헤더 드롭다운에 브랜드 옵션 직접 생성 중...');
        
        // 기존 옵션 제거
        headerSelect.innerHTML = '';
        
        // "전체 브랜드" 옵션 추가
        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '전체 브랜드';
        headerSelect.appendChild(defaultOption);
        
        // 브랜드 옵션 추가
        for (let i = 0; i < brandData.length; i++) {
            let brandName = brandData[i].name;
            if (brandName && brandName.trim() !== '') {
                let option = document.createElement('option');
                option.value = brandName;
                option.textContent = brandName;
                headerSelect.appendChild(option);
            }
        }
        
        console.log('헤더 드롭다운 직접 생성 완료:', headerSelect.options.length, '개');
        
        // 이벤트 바인딩
        headerSelect.onchange = function() {
            window.selectedHeaderBrand = this.value;
            console.log('헤더에서 브랜드 선택됨:', window.selectedHeaderBrand);
        };
        
        return true;
    }
    
    // 헤더 드롭다운 설정 함수 (개선된 버전 - 메인페이지 대응)
    function setupHeaderDropdown() {
        let attempts = 0;
        const maxAttempts = 5;
        
        const trySetup = function() {
            attempts++;
            console.log(`헤더 드롭다운 설정 시도 ${attempts}/${maxAttempts}`);
            
            // 필수 요소 확인
            let headerElement = document.getElementById('header');
            let headerSelect = document.querySelector('.headerBrandSelect');
            
            if (!headerElement || !headerSelect) {
                console.log('필수 요소 대기 중...', {
                    header: !!headerElement,
                    headerSelect: !!headerSelect
                });
                
                if (attempts < maxAttempts) {
                    setTimeout(trySetup, 100);
                }
                return;
            }
            
            // 방법 1: 검색 페이지 드롭다운에서 복사 (기존 방식)
            let searchPageSelect = document.querySelector('.brandSelect');
            if (searchPageSelect && searchPageSelect.options.length > 1) {
                console.log('방법 1: 검색 페이지 드롭다운에서 복사');
                
                try {
                    // 기존 복사 방식
                    headerSelect.innerHTML = '';
                    for (let i = 0; i < searchPageSelect.options.length; i++) {
                        let originalOption = searchPageSelect.options[i];
                        let newOption = document.createElement('option');
                        newOption.value = originalOption.value;
                        newOption.textContent = originalOption.text;
                        headerSelect.appendChild(newOption);
                    }
                    
                    console.log('방법 1 성공 - 검색 페이지에서 복사:', headerSelect.options.length, '개');
                } catch (error) {
                    console.log('방법 1 실패:', error);
                    // 방법 2로 fallback
                    if (!createHeaderDropdownDirect()) {
                        console.log('모든 방법 실패');
                        return;
                    }
                }
            } else {
                // 방법 2: 브랜드 데이터에서 직접 생성 (메인페이지용)
                console.log('방법 2: 브랜드 데이터에서 직접 생성');
                if (!createHeaderDropdownDirect()) {
                    if (attempts < maxAttempts) {
                        setTimeout(trySetup, 100);
                    }
                    return;
                }
            }
            
            // 검색 폼 이벤트 바인딩
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
            }
            
            console.log('헤더 드롭다운 설정 완료!');
        };
        
        // 즉시 시작
        trySetup();
    }
    
    // 실행 순서 (더 빠르게)
    // 1. 검색 페이지 드롭다운 생성
    createSearchPageDropdown();
    
    // 2. 헤더 드롭다운 설정 (더 빠른 시작)
    setTimeout(setupHeaderDropdown, 30);
    
    // 3. 백업 안전장치 (더 간소화)
    $(document).ready(function() {
        setTimeout(setupHeaderDropdown, 200);
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
            
        // keyword만 설정하고 brand 파라미터는 제거 (브랜드 지속성 방지)
        $('.keyword').val(combinedKeyword);
        $('.keyword').attr('name', 'keyword');
        
        // brand 관련 hidden input 제거
        $(this).find('input[name*="brand"]').remove();
        
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