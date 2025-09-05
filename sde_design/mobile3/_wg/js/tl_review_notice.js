/* document.addEventListener("DOMContentLoaded", function (event) { //단위테스트 할 때  */
jQuery(function() { 
  (function($) { 
    $('.review_notice_box .notice_line .subject a').click(function (e) {
      e.preventDefault();
      $(this).parent().parent().hide(400);
      $(this).parent().parent().next().show(400);
    });
    $('.review_notice_box .notice_content .btn-toggle a').click(function (e) {
      e.preventDefault();
      $(this).parent().parent().hide(400);
      $(this).parent().parent().prev().show(400);
    });
  })($newAt);
});