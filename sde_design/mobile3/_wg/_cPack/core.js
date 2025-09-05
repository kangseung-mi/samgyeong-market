!(function ($) {
  $(document).ready(function () {
    // $.easing = $newAt.easing; //easing 어디에 잡히는지 확인

    //팝업디자인
    var $popup_map = {}; //라디오버튼처럼 사용하기 위해
    $('._cPack.btn').click(function (e) {
      var $btn = $(this);
      var popup_key = $btn.attr('data-popup_key');
      var popup_box = $btn.attr('data-popup_box');
      var preLoadUrl = $btn.attr('data-preLoadUrl');
      var preLoadSelector = $btn.attr('data-preLoadSelector');
      if ($btn.hasClass('on') && $popup_map[popup_key]) {
        $popup_map[popup_key].close();
        return;
      }
      for (var key in $popup_map) {
        if ($popup_map[key] && key != popup_key) $popup_map[key].close();
      }
      $popup_map[popup_key] = $(popup_box).bPopup(
        {
          //preLoadSelector: preLoadSelector,
          preLoadSelector: '.loadhtml',
          preLoadUrl: preLoadUrl, // 페이지주소는 각html에서 컨트롤
          positionStyle: 'absolute', // 고정방법
          speed: 300, // 속도 (css transition과 동일하게 설정)
          modal: false, // 배경
          transition: 'custom', //onClose와 callback에서 transition 처리
          appendTo: '',
          zIndex: 10,
          appending: true,
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          },
        },
        function () {
          var $this = $(this);
          if (!$this.hasClass('script-on')) {
            //한번만 실행하기 위해 class 추가
            //동적으로 불러오는 부분이 스크롤바가 있을 때
            /*
            $newAt(this).find('.scrollbar_box').scrollbar({  // jQuery 사용중 scrollbar 함수가 $newAt에 잡히는지 $ 에 잡히는지 확인후 scrollbar 함수 호출 여기서는 $newAt에 잡힌다. scrollbar가 잡히기 위해서는 height 가 css로 고정되어야 한다.
                'disableBodyScroll':true,
            });
            */
            if (tl_isMobile()) {
            } else {
              $jq(this)
                .find('.scrollbar_box')
                .mCustomScrollbar({
                  theme: 'dark',
                  mouseWheel: { scrollAmount: 300 },
                });
            }
          }
          $this.addClass('script-on');
          $btn.addClass('on');
        }
      );
    });
  });
})(jQuery);
