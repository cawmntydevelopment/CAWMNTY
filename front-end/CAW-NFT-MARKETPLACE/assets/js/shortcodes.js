/**
  * isMobile
  * Parallax
  * flatContentBox
  * flatCounter
  * flatIsotopeCase
  * flatAccordion
  * swClick
  * buttonHeart
  * goTop
  * WOW
  * toggleMenu
  * topSearch
  * flatProgressBar
  * popUpLightBox
  * donatProgress
  * Preloader
  * clearcheckbox
  * flatAccordions
  * dropdown
  * no_link
  * flcustominput
  * tabs
  * copycode
  * fasterPreview
  * viewShop
  * imgUpload
*/

; (function ($) {

    "use strict";

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var Parallax = function () {
        if ($().parallax && isMobile.any() == null) {
            $(".parallax").parallax("50%", 0.2);
        }
    };

    var goTop = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 800) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
            return false;
        });
    };

    new WOW().init();


    var Preloader = function () {
        setTimeout(function () {
        $(".preload").fadeOut("slow", function () {
            $(this).remove();
        });
        }, 800);
    };



    var dropdown = function(id){
        var obj = $(id+'.dropdown');
        var btn = obj.find('.btn-selector');
        var dd = obj.find('ul');
        var opt = dd.find('li');
            dd.hide();
            obj.on("mouseenter", function() {
                dd.show();
                dd.addClass('show');
                $(this).css("z-index",1000);
            }).on("mouseleave", function() {
                dd.hide();
                 $(this).css("z-index","auto")
                 dd.removeClass('show');
            })
            
            opt.on("click", function() {
                dd.hide();
                var txt = $(this).text();
                opt.removeClass("active");
                $(this).addClass("active");
                btn.text(txt);
            });
    }

    var no_link = function(){
        $('a.nolink').on('click', function(e){
          e.preventDefault();
      });
      $('.icon_menu .icon a').on('click', function(e){
        e.preventDefault();
    });
    }

    var tfShowpass = function(){
        $('.btn-show-pass').on('click',function() {
            var temp = document.getElementById("showpassword");
            
            if (temp.type === "password") {
                temp.type = "text";
              } else {
                temp.type = "password";
              }
        });
        $('.btn-show-pass2').on('click',function() {
            var temp2 = document.getElementById("showpassword2");
            
            if (temp2.type === "password") {
                temp2.type = "text";
              } else {
                temp2.type = "password";
              }
        });
        
    }

    var click_author = function () {
        $('.tf-author .content .icon').on('click', function () {
            $(this).toggleClass("active");
        });
        $('.sc-product .wish-list').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass("active");
        });
    };

    var tfLoadmore = function () {
        $(".tf-loadmore").slice(0, 8).show();
        $(".loadmore").on("click", function(e){
            e.preventDefault();
            $(".tf-loadmore:hidden").slice(0, 4).slideDown();
            if($(".tf-loadmore:hidden").length == 0) {
            $(".loadmore").hide;
            }
        });
    };

    var tfFilter = function () {
        $(".tf-filter").each(function () {
        // if ( $().isotope ) {
            
            var $container = $(this).find('.tf-filter-container').isotope({
                itemSelector: '.tf-loadmore',
                layoutMode: 'fitRows',
                percentPosition: true,
            });

            
            $container.imagesLoaded().progress( function() {
                $container.isotope('layout');
            });
            
            $container.isotope({ filter: ".3d" });
        
            $(this).find('.filter-menu li ').on( 'click', function(e) {
                e.preventDefault();
                var filterValue = $( this ).find('a').attr('data-filter');
                $container.isotope({ filter: filterValue });
            });
    
            $(this).find('.filter-menu').each( function() {
                $(this).find('.filter-menu li ').removeClass('active');
                $('.filter-menu li ').on( 'click', function() {  
                    $(this).closest('.filter-menu').find('li ').removeClass('active');
                    $(this).addClass('active');
                
                });
            });
        // };
    });
        
    } 

    var tfTabs = function(){
        $('.tf-tab').each(function(){
            $(this).find('.content-tab').children().hide();
            $(this).find('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click',function(e){
                e.preventDefault();
                var liActive = $(this).index();
                var contentActive=$(this).siblings().removeClass('active').parents('.tf-tab').find('.content-tab').children().eq(liActive);
                contentActive.addClass('active').fadeIn("slow");
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.tf-tab').find('.content-tab').children().eq(liActive).siblings().hide();
            });
        });
    };

    var tfAccordion = function () {
        var args = { duration: 600 };
        $('.tf-toggle .tf-toggle-title.active').siblings('.tf-toggle-content').show();
        $('.tf-toggle.enable .tf-toggle-title').on('click', function () {
            $(this).closest('.tf-toggle').find('.tf-toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        });
        $('.tf-accordion .tf-toggle-title').on('click', function () {
            if (!$(this).is('.active')) {
                $(this).closest('.tf-accordion').find('.tf-toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });
    };

    var tfAccordionWidget = function () {
        var args = { duration: 600 };
        $('.widget-accordion .widget-title.active').siblings('.widget-content').show();
        $('.widget-accordion.enable .widget-title').on('click', function () {
            $(this).closest('.widget-accordion').find('.widget-content').slideToggle(args);
            $(this).toggleClass('active');
        });
        $('.widget-accordion .widget-title').on('click', function () {
            if (!$(this).is('.active')) {
                $(this).closest('.widget-accordion').find('.widget-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });
    };

     var addClassBoard = function () {
        $('.tf-dashboard .filter-menuu li').on('click', function () {
            if ($(this).is('.dashboard')) {
                $(this).closest('.tf-dashboard').find('.overflow-table').addClass('has-board');
            } else {
                $(this).closest('.tf-dashboard').find('.overflow-table').removeClass('has-board');
            }
        });
    };

    var tfTabs2 = function(){
        $('.tf-tab2').each(function(){
            $(this).find('.content-tab2').children().hide();
            $(this).find('.content-tab2 .active').show();
            $(this).find('.menu-tab2').children('li').on('click',function(e){
                e.preventDefault();
                var liActive = $(this).index();
                var contentActive=$(this).siblings().removeClass('active').parents('.tf-tab2').find('.content-tab2').children().eq(liActive);
                contentActive.addClass('active').fadeIn("slow");
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.tf-tab2').find('.content-tab2').children().eq(liActive).siblings().hide();
            });
        });
    };

    var btn_option = function(){
        $('.btn-option').on('click', function(event){
            event.stopPropagation();
            if(!$('.option_popup').hasClass('show')){
                $('.option_popup').toggleClass('show');
                    event.preventDefault();
                }
            else
                $('.option_popup').removeClass('show');
        })
    };
    
    var tfFixedSidebar = function () {
        var $window = $(window);  
        if ($(".sidebar-explore").length) { 
            var $sidebar = $(".sidebar-explore"); 
            var $sidebarHeight = $sidebar.innerHeight();   
            var $footerOffsetTop = $(".footer").offset().top; 
            var $sidebarOffset = $sidebar.offset();
            $window.scroll(function() {
                if($window.scrollTop() > $sidebarOffset.top) {
                  $sidebar.addClass("is-fixed"); 
                } else {
                  $sidebar.removeClass("is-fixed");   
                }    
                if($window.scrollTop() + $sidebarHeight  > $footerOffsetTop) {
                  $sidebar.removeClass("is-fixed");       
                }  
        
              });
        }  
    };
    var tfFixedDashboard = function () {
        var $window = $(window);  
        if ($(".dashboard-user").length) { 
            var $dashboard = $(".dashboard-user"); 
            var $dashboardHeight = $dashboard.innerHeight();   
            var $footerOffsetTop = $(".footer").offset().top; 
            var $dashboardOffset = $dashboard.offset();
            $window.scroll(function() {
                if($window.scrollTop() > $dashboardOffset.top) {
                  $dashboard.addClass("is-fixed"); 
                } else {
                  $dashboard.removeClass("is-fixed");   
                }    
                if($window.scrollTop() + $dashboardHeight  > $footerOffsetTop) {
                  $dashboard.removeClass("is-fixed");       
                }  
              
              });   
        }
        
    };

    

    
    
   

    var calc = function(element){
        var w 				= element.width(),
            initial_width 	= element.data('initial-width'),
            ratio 			= element.data('ratio'),
            padding			= 15;
            padding *= 2;
        var width 			= ((w-padding)/2 > initial_width) ? initial_width : (w-padding) / 2,
            height			= width*ratio + padding,
            ul				= element.find('ul'),
            children		= ul.children('li');

        ul.height(height + 'px');
        children.css({width: width + 'px', height: (height) + 'px'});
        var current_left	= w/2 - width/2,
            next1_left		= current_left + width / 3.5,
            next2_left		= next1_left + width / 3.5,
            next3_left		= next2_left + width / 3.5,
            prev1_left		= current_left - width / 3.5,
            prev2_left		= prev1_left - width / 3.5,
            prev3_left		= prev1_left - width / 3.5;
        children.css({left: '50%',transform: 'scale(0)'});
        ul.find('.current').css({left: current_left + 'px',top: 0,transform: ' rotate(0)'});
        ul.find('.next1').css({left: next1_left + 'px',top: '60px',transform: ' rotate(20deg)'});
     
        ul.find('.prev1').css({left: prev1_left + 'px',top: '60px',transform: ' rotate(-20deg)'});

        
        if(children.length > 3){
            ul.find('.prev2').css({left: prev2_left + 'px',top: '120px',transform: ' rotate(-40deg)'});
            ul.find('.next2').css({left: next2_left + 'px',top: '120px',transform: ' rotate(40deg)'});
            ul.find('.prev3').css({left: prev3_left + 'px',top: '240px',transform: ' rotate(-60deg)'});
            ul.find('.next3').css({left: next3_left + 'px',top: '240px',transform: ' rotate(60deg)'});
        }
    }

    var calc_call = function(element){
        if(typeof element === 'undefined'){
            $('.slider-card-img').each(function(){
                element = $(this);
                calc(element);
            });
        }else{
            calc(element);
        }
    }

    var change_slide = function(index, element){
        var ul 				= element.find('ul'),
            children 		= ul.children('li'),
            length			= children.length;
            index			= (index + length) % length;
        var el 				= children.eq(index-1);

        if(!el.hasClass('current')){
            children.removeClass('current next1  prev1  next2 prev2');
            el.addClass('current');
            var next1_index = (index + 1) % length;
            var next2_index = (index + 2) % length;
            var prev1_index = (index - 1 + length) % length;
            var prev2_index = (index - 2 + length) % length;
            children.eq(next1_index-1).addClass('next1');
            children.eq(prev1_index-1).addClass('prev1');
            if(length > 4){
                children.eq(next2_index-1).addClass('next2');
                children.eq(prev2_index-1).addClass('prev2');
            }
            calc_call(element);
        }
    }

    var start_autoplay = function(ul,element){
        var timeout 		= 6000;
        var time 			= null;
        clearInterval(time);
        time = setInterval(function(){
            var index 		= ul.find('.current').index() + 2;
            change_slide(index,element);
        }, timeout);
    } 

    var sliderCard = function(){
        var slider = $('.slider-card-img');
        if(slider.length){
            slider.each(function(){
                var element 		= $(this),
                    ul				= element.find('ul'),
                    children		= ul.children('li'),
                    length			= children.length;

                if(length<3){return false;}

                change_slide(1,element);

                children.on('click',function(){
                    var el 			= $(this);
                    var index		= el.index() + 1;
                    change_slide(index,element);
                });
                start_autoplay(ul,element);
            });
        }
    }

    // Dom Ready
    $(function () {
        goTop();
        Parallax();
        no_link();
        dropdown('#item_category');
        dropdown('#item_category2');
        dropdown('#item_category3');
        dropdown('#item_category4');
        dropdown('#chains');
        dropdown('#sigle-item');
        dropdown('#item-create1');
        dropdown('#item-create2');
        click_author();
        tfAccordion();
        tfShowpass();
        tfFilter();
        tfTabs();
        tfAccordionWidget();
        addClassBoard();
        tfTabs2();
        btn_option();
        tfFixedSidebar();
        tfFixedDashboard();
        sliderCard();
        Preloader();
    });

})(jQuery);


