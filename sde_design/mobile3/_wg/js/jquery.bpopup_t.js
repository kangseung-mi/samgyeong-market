/*===================================================================================================================
 * @name: bPopup
 * @type: jQuery
 * @author: (c) Bjoern Klinggaard - @bklinggaard
 * @demo: http://dinbror.dk/bpopup
 * @requires jQuery 1.4.3
 *==================================================================================================================*/
/*===================================================================================================================
 * @tlog 옵션을 추가했습니다. 
 * (autoClose)옵션시 mouseenter시 닫힘 방지
 * ajax로 불러올 때 옵션 추가(preLoadUrl)
 * 위치 bottom, right 사용추가(positionRight)
 * class 변경으로 transition 추가하기 위해 (openClass) 옵션 추가
 *==================================================================================================================*/
//console.log(jQuery.fn.jquery);
!(function ($) {
  'use strict';

  $.fn.bPopup = function (options, callback) {

    if ($.isFunction(options)) {
      callback = options;
      options = null;
    }

    // OPTIONS
    var o = $.extend({}, $.fn.bPopup.defaults, options);

    // HIDE SCROLLBAR?  
    if (!o.scrollBar)
      $('html').css('overflow', 'hidden');

    // VARIABLES	
    var $popup = this,
      d = $(document),
      w = window,
      $w = $(w),
      wH = windowHeight(),
      wW = windowWidth(),
      prefix = '__b-popup',
      isIOS6X = (/OS 6(_\d)+/i).test(navigator.userAgent) // Used for a temporary fix for ios6 timer bug when using zoom/scroll 
      ,
      buffer = 200,
      popups = 0,
      id, inside, fixedVPos, fixedHPos, fixedPosStyle, vPos, hPos, height, width, debounce, autoCloseTO;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PUBLIC FUNCTION - call it: $(element).bPopup().close();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $popup.close = function () {
      close();
    };

    $popup.reposition = function (animateSpeed) {
      reposition(animateSpeed);
    };

    return $popup.each(function () {
      if ($(this).data('bPopup')) return; //POPUP already exists?
      init();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // HELPER FUNCTIONS - PRIVATE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function init() {
      triggerCall(ajaxLoad);
      triggerCall(o.onOpen);
      popups = ($w.data('bPopup') || 0) + 1,
        id = prefix + popups + '__',
        fixedVPos = o.position[1] !== 'auto',
        fixedHPos = o.position[0] !== 'auto',
        fixedPosStyle = o.positionStyle === 'fixed',
        height = $popup.outerHeight(true),
        width = $popup.outerWidth(true);
      o.loadUrl ? createContent() : open();
    };

    //@tlog preLoadUrl시 추가
    function ajaxLoad() {
      var $this = $(this);
      if (!$this.hasClass('pre-loaded') && o.preLoadUrl) {
        $.ajax({
          url: o.preLoadUrl,
          dataType: 'html',
          async: false,
          success: function (data) {
            var html = '';
            if (o.preLoadSelector) {
              html = $("<div class='remove'/>").html(data).find(o.preLoadSelector).html();;
            } else {
              html = data;
            }
            $this.append(html);
            $this.addClass('pre-loaded');
          }
        });
      }
    }

    function createContent() {
      o.contentContainer = $(o.contentContainer || $popup);
      switch (o.content) {
        case ('iframe'):
          var iframe = $('<iframe class="b-iframe" ' + o.iframeAttr + '></iframe>');
          iframe.appendTo(o.contentContainer);
          height = $popup.outerHeight(true);
          width = $popup.outerWidth(true);
          open();
          iframe.attr('src', o.loadUrl); // setting iframe src after open due IE9 bug
          triggerCall(o.loadCallback);
          break;
        case ('image'):
          open();
          $('<img />')
            .load(function () {
              triggerCall(o.loadCallback);
              recenter($(this));
            }).attr('src', o.loadUrl).hide().appendTo(o.contentContainer);
          break;
        default:
          open();
          $('<div class="b-ajax-wrapper"></div>')
            .load(o.loadUrl, o.loadData, function (response, status, xhr) {
              triggerCall(o.loadCallback, status);
              recenter($(this));
            }).hide().appendTo(o.contentContainer);
          break;
      }
    };

    function open() {
      // MODAL OVERLAY
      if (o.modal) {
        $('<div class="b-modal ' + id + '"></div>')
          .css({
            backgroundColor: o.modalColor,
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
            zIndex: o.zIndex + popups
          })
          .appendTo(o.appendTo)
          .fadeTo(o.speed, o.opacity);
      }
      
      // POPUP
      calcPosition();
      var css = {
        'position': o.positionStyle || 'absolute',
        'z-index': o.zIndex + popups + 1
      };
      if (o.transition !== 'custom') {
        if (!o.positionRight) css.left = o.transition == 'slideIn' || o.transition == 'slideBack' ? (o.transition == 'slideBack' ? d.scrollLeft() + wW : (hPos + width) * -1) : getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle));
        else css.right = o.transition == 'slideIn' || o.transition == 'slideBack' ? (o.transition == 'slideBack' ? d.scrollLeft() + wW : (hPos + width) * -1) : getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle));
        if (!o.positionBottom) css.top = o.transition == 'slideDown' || o.transition == 'slideUp' ? (o.transition == 'slideUp' ? d.scrollTop() + wH : vPos + height * -1) : getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle));
        else css.bottom = o.transition == 'slideDown' || o.transition == 'slideUp' ? (o.transition == 'slideUp' ? d.scrollTop() + wH : vPos + height * -1) : getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle));
      }
      $popup
        .data('bPopup', o).data('id', id)
        .css(css).each(function () {
          if (o.appending) {
            $(this).appendTo(o.appendTo);
          }
        });
      doTransition(true);
      
      //@tlog openClass
      if (o.openClass) {
        setTimeout(function() {
          $popup.addClass(o.openClass);
        }, 10); //transition 이 적용되기 위해 시간을 둔다.
      }
    };

    function close() {
      if (o.modal) {
        $('.b-modal.' + $popup.data('id'))
          .fadeTo(o.speed, 0, function () {
            $(this).remove();
          });
      }
      if (o.openClass) {
        $popup.removeClass(o.openClass);
      }
      // Clean up
      unbindEvents();
      clearTimeout(autoCloseTO);
      // Close trasition
      doTransition();
      return false; // Prevent default
    };

    function reposition(animateSpeed) {
      wH = windowHeight();
      wW = windowWidth();
      inside = insideWindow();
      if (inside.x || inside.y) {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          calcPosition();
          animateSpeed = animateSpeed || o.followSpeed;
          var css = {};
          if (inside.x)
            css.left = o.follow[0] ? getLeftPos(true) : 'auto';
          if (inside.y)
            css.top = o.follow[1] ? getTopPos(true) : 'auto';
          $popup
            .dequeue()
            .each(function () {
              if (fixedPosStyle) {
                $(this).css({
                  'left': hPos,
                  'top': vPos
                });
              } else {
                $(this).animate(css, animateSpeed, o.followEasing);
              }
            });
        }, 50);
      }
    };

    //Eksperimental
    function recenter(content) {
      var _width = content.width(),
        _height = content.height(),
        css = {};
      o.contentContainer.css({
        height: _height,
        width: _width
      });
      if (_height >= $popup.height()) {
        css.height = $popup.height();
      }
      if (_width >= $popup.width()) {
        css.width = $popup.width();
      }
      height = $popup.outerHeight(true), width = $popup.outerWidth(true);

      calcPosition();
      o.contentContainer.css({
        height: 'auto',
        width: 'auto'
      });
      //@tlog 
      if (!o.positionRight) css.left = getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle));
      else css.right = getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle));
      if (!o.positionBottom) css.top = getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle));
      else css.bottom = getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle));

      $popup
        .animate(
          css, 250,
          function () {
            content.show();
            inside = insideWindow();
          }
        );
    };

    function bindEvents() {
      $w.data('bPopup', popups);
      $popup.delegate('.bClose, .' + o.closeClass, 'click.' + id, close); // legacy, still supporting the close class bClose

      if (o.modalClose) {
        $('.b-modal.' + id).css('cursor', 'pointer').bind('click', close);
      }

      // Temporary disabling scroll/resize events on devices with IOS6+
      // due to a bug where events are dropped after pinch to zoom
      if (!isIOS6X && (o.follow[0] || o.follow[1])) {
        $w.bind('scroll.' + id, function () {
          if (inside.x || inside.y) {
            var css = {};
            if (inside.x)
              css.left = o.follow[0] ? getLeftPos(!fixedPosStyle) : 'auto';
            if (inside.y)
              css.top = o.follow[1] ? getTopPos(!fixedPosStyle) : 'auto';
            $popup
              .dequeue()
              .animate(css, o.followSpeed, o.followEasing);
          }
        }).bind('resize.' + id, function () {
          reposition();
        });
      }
      if (o.escClose) {
        d.bind('keydown.' + id, function (e) {
          if (e.which == 27) { //escape
            close();
          }
        });
      }
    };

    function unbindEvents() {
      if (!o.scrollBar) {
        $('html').css('overflow', 'auto');
      }
      $('.b-modal.' + id).unbind('click');
      d.unbind('keydown.' + id);
      $w.unbind('.' + id).data('bPopup', ($w.data('bPopup') - 1 > 0) ? $w.data('bPopup') - 1 : null);
      $popup.undelegate('.bClose, .' + o.closeClass, 'click.' + id, close).data('bPopup', null);
    };

    function doTransition(open) {
      switch (open ? o.transition : o.transitionClose || o.transition) {
        case "slideIn":
          animate({
            left: open ? getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle)) : d.scrollLeft() - (width || $popup.outerWidth(true)) - buffer
          });
          break;
        case "slideBack":
          animate({
            left: open ? getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle)) : d.scrollLeft() + wW + buffer
          });
          break;
        case "slideDown":
          animate({
            top: open ? getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle)) : d.scrollTop() - (height || $popup.outerHeight(true)) - buffer
          });
          break;
        case "slideUp":
          animate({
            top: open ? getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle)) : d.scrollTop() + wH + buffer
          });
          break;
          //@tlog
        case "custom":
          onCompleteCallback(open);
          break;
        default:
          //Hardtyping 1 and 0 to ensure opacity 1 and not 0.9999998
          $popup.stop().fadeTo(o.speed, open ? 1 : 0, function () {
            onCompleteCallback(open);
          });
      }

      function animate(css) {
        $popup
          .css({
            display: 'block',
            opacity: 1
          })
          .animate(css, o.speed, o.easing, function () {
            onCompleteCallback(open);
          });
      };
    };

    function onCompleteCallback(open) {
      if (open) {
        bindEvents();
        if (o.transition === 'custom' && o.speed) $popup.css({display:'block'});
        
        triggerCall(callback); //@tlog o.transition === custom 일때 callback에서 animate 함수 작업을 한다.
        if (o.autoClose) {
          autoCloseTO = setTimeout(close, o.autoClose);
          //@tlog mouseenter 추가
          $popup.mouseenter(function (e) {
            clearTimeout(autoCloseTO);
          });
          $popup.mouseleave(function (e) {
            autoCloseTO = setTimeout(close, o.autoClose);
          });
        }

      } else {
        //@tlog custom 일때 onClose에서 알아서 한다.
        if (o.transition !== 'custom') {
          $popup.hide();
        } else {
          if (o.speed) setTimeout(function() {$popup.css({display:'none'})}, o.speed);          
        }
        triggerCall(o.onClose);
        if (o.loadUrl) {
          o.contentContainer.empty();
          $popup.css({
            height: 'auto',
            width: 'auto'
          });
        }
      }
    };

    function getLeftPos(includeScroll) {
      return includeScroll ? hPos + d.scrollLeft() : hPos;
    };

    function getTopPos(includeScroll) {
      return includeScroll ? vPos + d.scrollTop() : vPos;
    };

    function triggerCall(func, arg) {
      $.isFunction(func) && func.call($popup, arg);
    };

    function calcPosition() {
      vPos = fixedVPos ? o.position[1] : Math.max(0, ((wH - $popup.outerHeight(true)) / 2) - o.amsl);
      hPos = fixedHPos ? o.position[0] : (wW - $popup.outerWidth(true)) / 2, inside = insideWindow();
    };

    function insideWindow() {
      return {
        x: wW > $popup.outerWidth(true),
        y: wH > $popup.outerHeight(true)
      }
    };

    function windowHeight() {
      return $w.height();
    };

    function windowWidth() {
      return $w.width();
    };
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // DEFAULT VALUES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $.fn.bPopup.defaults = {
    amsl: 50,
    appending: true,
    appendTo: 'body',
    autoClose: false,
    closeClass: 'p-close',
    content: 'ajax', // ajax, iframe or image,
    contentContainer: false,
    easing: 'easeInOutExpo',
    escClose: true,
    follow: [true, true], // x, y
    followEasing: 'easeInOutExpo',
    followSpeed: 500,
    iframeAttr: 'scrolling="no" frameborder="0"',
    loadCallback: false,
    loadData: false,
    loadUrl: false,
    modal: true,
    modalClose: true,
    modalColor: '#000',
    onClose: false,
    onOpen: false,
    opacity: 0.8,
    position: ['auto', 'auto'], // x, y,
    positionStyle: 'absolute', // absolute or fixed
    scrollBar: true,
    speed: 0, // open & close speed
    transition: 'fadeIn', //transitions: fadeIn, slideDown, slideIn, slideBack, custom @tlog custom 추가 
    transitionClose: false,
    zIndex: 9997, // popup gets z-index 9999, modal overlay 9998
    //@tlog 추가옵션
    openClass: false,
    preLoadUrl: false,
    preLoadSelector: false,
    positionRight: false,
    positionBottom: false
  };
})(jQuery);