/* ===========================================
   Emeril's Restaurants Main JS
   Author: Terrance Pitre
   =========================================== */function getViewportWidth() {
    return window.innerWidth ? window.innerWidth : document.body && document.body.offsetWidth ? document.body.offsetWidth : 0;
}

function getViewportHeight() {
    return window.innerHeight ? window.innerHeight : document.body && document.body.offsetHeight ? document.body.offsetHeight : 0;
}

var er = {
    bg: $(".bg"),
    transformNav: function() {
        var a = $(".trigger-nav"), b = $("#sub-head");
    },
    miscFunct: function() {
        var a = $("#city-filter"), b = $("#main-nav");
        a.click(function() {
            $(this).toggleClass("city-open");
        });
        b.toggle(function() {
            $(this).animate({
                marginTop: 0
            }, 300, "easeInOutQuint");
        }, function() {
            $(this).animate({
                marginTop: -194
            }, 300, "easeInOutQuint");
        });
    },
    toggleGallery: function() {
        var a = $(".toggle-gallery"), b = function() {
            $("#main-content").animate({
                paddingTop: 560
            }, 700, "easeInOutQuint");
            a.addClass("down");
        }, c = function() {
            $("#main-content").animate({
                paddingTop: 136
            }, 700, "easeInOutQuint");
            a.removeClass("down");
        };
        a.toggle(b, c);
    },
    initSlideshow: function() {
        if ($("body").hasClass("show-gallerys")) {
            var a = 6e3, b = [ {
                image: "em-img1.jpg"
            }, {
                image: "em-img2.jpg"
            }, {
                image: "em-img3.jpg"
            } ];
            $(".prev").click(function(a) {
                h();
                f("back");
                a.preventDefault();
            });
            $(".next").click(function(a) {
                h();
                f("next");
                a.preventDefault();
            });
            var c;
            $(".pause").toggle(function() {
                h();
            }, function() {
                $(this).removeClass("play");
                f("next");
                c = setInterval(function() {
                    f("next");
                }, a);
            });
            var d = 0, e = !1, f = function(a) {
                if (e) return;
                if (a === "next") {
                    d++;
                    d === b.length + 1 && (d = 1);
                } else {
                    d--;
                    d === 0 && (d = b.length);
                }
                g(b[d - 1]);
            }, g = function(a) {
                e = !0;
                $("#main-container").css({
                    "background-image": "url(img/" + a.image + ")"
                });
                e = !1;
            }, h = function() {
                $(".pause").addClass("play");
                clearInterval(c);
            };
            f("next");
            $("body").hasClass("rest-home") && (c = setInterval(function() {
                f("next");
            }, a));
        }
    },
    addPlaceHolder: function() {}
};

$(function() {
    er.miscFunct();
    er.addPlaceHolder();
    er.toggleGallery();
    er.initSlideshow();
    $("#city-filter").find("li").click(function(a) {
        a.preventDefault();
        $(".rest-cities").attr("data-city-filter") == $(this).attr("data-city-filter") && console.log($(".rest-cities").attr("data-city-filter"));
    });
});

var tellMeTheSizes = function() {
    document.getElementById("viewportwidth").innerHTML = "VW: " + getViewportWidth() + "px";
};

window.onload = function() {
    tellMeTheSizes();
};

window.onresize = function() {
    tellMeTheSizes();
};