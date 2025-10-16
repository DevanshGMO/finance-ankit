!(function (a) {
  "use strict";
  var e = a(window),
    s = a("body"),
    t = a(".is-sticky");
  if (t.length > 0) {
    var l = a("#mainnav").offset();
    e.scroll(function () {
      var a = e.scrollTop();
      e.width() > 991 && a > l.top + 4
        ? t.hasClass("has-fixed") || t.addClass("has-fixed")
        : t.hasClass("has-fixed") && t.removeClass("has-fixed");
    });
  }
  var i = a("#slider");
  i.length > 0 && i.carousel({ interval: 6e3, pause: "null" });
  var n = a(".has-carousel");
  n.length > 0 &&
    n.each(function () {
      var e = a(this),
        s = e.data("items") ? e.data("items") : 4,
        t = s >= 3 ? 3 : s,
        l = t >= 2 ? 2 : t,
        i = e.data("delay") ? e.data("delay") : 4e3,
        n = !!e.data("auto"),
        r = !!e.data("loop"),
        o = !!e.data("dots"),
        c = !!e.data("navs"),
        d = e.data("margin") ? e.data("margin") : 30;
      e.owlCarousel({
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>",
        ],
        items: s,
        loop: r,
        nav: c,
        dots: o,
        margin: d,
        autoplay: n,
        autoplayTimeout: i,
        autoplaySpeed: 700,
        responsive: {
          0: { items: 1 },
          480: { items: l },
          768: { items: t },
          1170: { items: s },
        },
      });
    });
  var r = a(".logo-carousel");
  r.length > 0 &&
    r.owlCarousel({
      items: 5,
      loop: !0,
      margin: 30,
      responsive: {
        0: { items: 2 },
        379: { items: 3 },
        720: { items: 4 },
        1280: { items: 6 },
      },
    });
  var o = a(".has-parallax");
  o.length > 0 &&
    o.each(function () {
      a(this).parallaxie({ speed: 0.3, offset: 0 });
    });
  var c = window.location.href;
  a(".nav li a").each(function () {
    c === this.href && a(this).closest("li").addClass("active");
  });
  var d = a("#preloader");
  d.length > 0 &&
    e.on("load", function () {
      d.children().fadeOut(300),
        d.delay(150).fadeOut(500),
        s.delay(100).css({ overflow: "visible" });
    });
  var f = a(".scroll-to");
  f.length > 0 &&
    f.on("click", function () {
      return (
        a("html, body").animate(
          { scrollTop: a(a.attr(this, "href")).offset().top },
          500
        ),
        !1
      );
    });
  var h = a(".imagebg");
  h.length > 0 &&
    h.each(function () {
      var e = a(this),
        s = e.parent(),
        t = e.data("overlay"),
        l = e.children("img").attr("src"),
        i = void 0 !== t && "" !== t && t.split("-");
      void 0 !== l &&
        "" !== l &&
        (s.hasClass("has-bg-image") || s.addClass("has-bg-image"),
        "" !== i &&
          "dark" === i[0] &&
          (s.hasClass("light") || s.addClass("light")),
        e
          .css("background-image", 'url("' + l + '")')
          .addClass("bg-image-loaded"));
    });
  var u = a("#quote-request");
  if (u.length > 0) {
    if (!a().validate || !a().ajaxSubmit)
      return (
        console.log("quoteForm: jQuery Form or Form Validate not Defined."), !0
      );
    if (u.length > 0) {
      var g = u.find("select.required"),
        m = u.find(".form-results");
      u.validate({
        invalidHandler: function () {
          m.slideUp(400);
        },
        submitHandler: function (e) {
          m.slideUp(400),
            a(e).ajaxSubmit({
              target: m,
              dataType: "json",
              success: function (s) {
                var t = "error" === s.result ? "alert-danger" : "alert-success";
                m
                  .removeClass("alert-danger alert-success")
                  .addClass("alert " + t)
                  .html(s.message)
                  .slideDown(400),
                  "error" !== s.result && a(e).clearForm();
              },
            });
        },
      }),
        g.on("change", function () {
          a(this).valid();
        });
    }
  }
  var v = a(".filtered-menu");
  v.length > 0 &&
    v.each(function () {
      var s = a(this).find("li"),
        t = a(this).next(".has-filtered");
      s.on("click", function () {
        s.removeClass("active"), a(this).addClass("active");
      }),
        t.length > 0 &&
          e.on("load", function () {
            t.find("ul").filterizr({ delay: 25 });
          });
    });
  var p = a(".gallery-lightbox");
  p.length > 0 &&
    p.magnificPopup({
      delegate: "a",
      type: "image",
      gallery: { enabled: !0 },
      image: {
        titleSrc: function (a) {
          var e = "",
            s = a.el.find("img").attr("title"),
            t = a.el.find("img").attr("alt");
          return (
            void 0 !== s && "" !== s && (e += s),
            void 0 !== t &&
              "" !== t &&
              (void 0 === s || "" === s
                ? (e += t)
                : (e = e + "<small>" + t + "</small>")),
            "" === e && (e = a.el.attr("title")),
            e
          );
        },
      },
      zoom: { enabled: !0 },
    });
  var y = a(".image-lightbox");
  y.length > 0 && y.magnificPopup({ gallery: { enabled: !0 }, type: "image" });
  var C = a(".map-holder");
  if (C.length > 0) {
    new GMaps({ div: "#gmap", lat: -12.043333, lng: -77.028333 });
    C.on("click", function () {
      a(this).children().css("pointer-events", "auto");
    }),
      C.on("mouseleave", function () {
        a(this).children().css("pointer-events", "none");
      });
  }
  var sw = c.split("/").pop();
  s.append();
  var b = a("#color-switch");
  b.length > 0 &&
    b.ColorPanel({
      styleSheet: "#style-css",
      animateContainer: ".site-body",
      colors: {
        "#009750": "css/style.css",
        "#24C9ED": "css/style-blue.css",
        "#2C7DFA": "css/style-azure.css",
        "#8A44EE": "css/style-violet.css",
        "#81D74F": "css/style-green.css",
        "#DB5439": "css/style-red.css",
        "#FCB21A": "css/style-orange.css",
      },
    });
})(jQuery);
 $(function () {
    // Toggle only on mobile; keep desktop default behavior
    $('#mainnav .dropdown > a.dropdown-toggle').on('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        $(this).parent().toggleClass('open').siblings('.open').removeClass('open');
      }
    });
  });