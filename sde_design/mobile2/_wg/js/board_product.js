function asdhCenterImageInsideMe(e) {
  var t = e.children("img"),
    n = e.height(),
    i = t.height(),
    c = t.width(),
    d = n - i,
    s = 100;
  if (n > i) {
    var a = d / i;
    s = 100 + 100 * a, t.css({
      width: s + "%",
      left: -(a * c / 2)
    })
  } else i > n ? t.css({
    top: d / 2,
    left: 0
  }) : t.css({
    top: 0,
    left: 0
  })
}
$(document).ready(function() {
  $(".img_center").each(function () {
      asdhCenterImageInsideMe($(this))
  });
  $(".img_center img").delay(100).fadeIn(10);
  $(".photo_img").attr("src", function (idx, src) {
    return src.replace("/gallery/", "/")
  });
  $(".review_img").attr("src", function (idx, src) {
    return src.replace("/gallery/", "/")
  });

});