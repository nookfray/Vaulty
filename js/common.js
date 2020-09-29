$(document).ready(function() {

	// FIXED NAVBAR
	function collapseNavbar() {
		if ($(".main_header").offset().top > 50) {
			$(".main_header").addClass("fixed_header");
		} else {
			$(".main_header").removeClass("fixed_header");
		}
	}

	if($('*').is('.main_header')) {
		$(window).scroll(collapseNavbar);
		$(document).ready(collapseNavbar);
	};



	// ACADEMY NAV
	var lastId,
	topMenu = $(".academy_header .academy_nav"),
	topHeader = $(".main_header"),
	topMenuHeight = topHeader.outerHeight(),
	menuItems = topMenu.find("a"),
	activeBlock = $(".academy_header .active_section"),
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 20;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop()+topMenuHeight;
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		if (lastId !== id) {
			lastId = id;
			menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
			activeTitle = menuItems.parent().end().filter("[href='#"+id+"']").text();
			$(activeBlock).text(activeTitle);
		};
	});

	$(".academy_header .open_btn").click(function() {
		$(this).toggleClass("active");
		($(this).text() === "Close") ? $(this).text("Open") : $(this).text("Close");
		$(".academy_header .academy_nav").slideToggle(300);
	});
	$(".academy_header .active_section, .academy_header .active_page").click(function() {
		if($(window).width() < 576) {
			$(this).toggleClass("active");
			$(".academy_header .academy_nav").slideToggle(300);
		}
	});
	$(".academy_header .academy_nav li a").click(function() {
		if($(window).width() < 1200) {
			$(".academy_header .open_btn, .academy_header .active_section").removeClass("active");
			$(".academy_header .academy_nav").slideUp(300);
		}
	});


	
	

	// SANDWICH ANIMATION
	$(".toggle_menu").click(function() {
		$(this).toggleClass("active");
		if($(window).width() > 767) {
			$(".main_header .mobile_nav, .user_dropdown .dropdown_menu").fadeToggle(300).toggleClass("active");
		} else {
			$(".main_header .mobile_nav, .user_dropdown .dropdown_menu").slideToggle(300).toggleClass("active");
		}
	});



	// HOVER DROPDOWN
	$(".main_header .products_dropdown").hover(function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().fadeIn(200).addClass("open");
			$(this).addClass("open");
		}
	},
	function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().fadeOut(200).removeClass("open");
			$(this).removeClass("open");
		}
	});


	// CLICK DROPDOWN
	$(".main_header .products_dropdown").click(function(){
		if($(window).width() < 768) {
			$(this).children(".dropdown_menu").stop().slideToggle(200).toggleClass("open");
			$(this).toggleClass("open");
		} 
	});


	// HOVER USER DROPDOWN
	$(".main_header .user_dropdown").hover(function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().fadeIn(200).addClass("open");
			$(this).addClass("open");
		}
	},
	function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().fadeOut(200).removeClass("open");
			$(this).removeClass("open");
		}
	});


	// LANGUAGE DROPDOWN
	$("footer .language_dropdown .drop_btn").click(function() {
		$(this).parent().toggleClass("open");
		$(this).next().slideToggle(200);
	});
	$(document).mouseup(function (e) {
		if ($(".language_dropdown").hasClass("open")) {
			var container = $(".language_dropdown");
			if (container.has(e.target).length === 0){
				$(".language_dropdown").removeClass("open");
				$(".language_dropdown .dropdown_menu").slideUp(200);
			}
		}
	});


	$(".icons_list .dropdown > a, .icons_list .dropdown > button").click(function() {
		$(".toggle_menu").removeClass("active");
		$(".main_header .mobile_nav, .main_header .user_dropdown .dropdown_menu").fadeOut(300).removeClass("active");
		$(".icons_list .dropdown > a, .icons_list .dropdown > button").not(this).parent().removeClass("open");
		$(".icons_list .dropdown > a, .icons_list .dropdown > button").not(this).next().fadeOut();
		$(this).parent().toggleClass("open");
		$(this).next().fadeToggle(200);
		return false;
	});
	$(document).mouseup(function (e) {
		if ($(".icons_list .dropdown").hasClass("open")) {
			var container = $(".icons_list .dropdown", this);
			if (container.has(e.target).length === 0){
				$(".icons_list .dropdown").removeClass("open");
				$(".icons_list .dropdown .dropdown_menu").fadeOut(200);
			}
		}
	});
	


	$(".mobile_nav .dropdown > a").click(function() {
		$(this).parent().toggleClass("open");
		$(this).next().slideToggle(300);
		return false;
	});


	var swiperMain = new Swiper('.main_slider', {
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.main_slider_pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.main_slider_next',
			prevEl: '.main_slider_prev',
		},
	});


	// SPOILER
	$(".spoiler_item .spoiler").click(function() {
		if ($(this).hasClass("active")) {
			$(this).next().collapse('hide');
			$(this).removeClass("active");
		} else {
			$(this).next().collapse('toggle');
			$(this).toggleClass("active");
		}
	});



	// STEPS SLIDER
	var swiperSteps = new Swiper('.steps_slider', {
		spaceBetween: 0,
		pagination: {
			el: '.steps_slider_pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.steps_slider_next',
			prevEl: '.steps_slider_prev',
		},
	});


	// SCROLL TO ID
	$(".terminal_section .top_wrapper .more[href*='#'], .inner_freedom_section .buy_btn, .inner_freedom_section a.buy_btn").click(function() {
		$(this).mPageScroll2id({
			offset: 86
		});
	})
	

	// MOD SELECT
	$(".mod_select").niceSelect();


	// PASSWORD OR TEXT
	$(".password_item .show_pass").click(function() {
		var x = $(this).prev().attr("type");
		if ($(this).prev().attr("type") == "password") {
			$(this).prev().attr("type", "text");
		} else {
			$(this).prev().attr("type", "password");
		}
	});


	$(function() {
		$('[data-toggle="popover"]').popover();
	});


	$("#copyButton").click(function() {
		copyToClipboard(document.getElementById("referal_link"));
	});

	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).html()).select();
		document.execCommand("copy");
		$temp.remove();
	};



	$(".key_item input").keyup(function () {
		if (this.value.length == this.maxLength) {
			$(this).next('input').focus();
		}
	});





	// CUSTOM SELECT
	$(".custom_select .select_btn").click(function() {
		$(".custom_select .select.active").not(this).removeClass("active");
		$(this).parent().toggleClass("active");
	});

	$(".custom_select .select_list li").click(function() {
		$(this).parent().parent().toggleClass("active");
		$(this).parent().siblings(".select_btn").text($(this).text());
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		
	});

	$(document).mouseup(function (e) {
		if ($(".custom_select .select").hasClass("active")) {
			var container = $(".custom_select .select");
			if (container.has(e.target).length === 0){
				$(".custom_select .select").removeClass("active");
			}
		}
	});


	// PRODUCT PAGE SCRIPTS
	var imgSrc = $(".product_main_section .img_block img");
	var activeProduct = $(".custom_select li.active").attr("data-img");
	var activeProductBack = $(".custom_select li.active").attr("data-img-back");

	$('.custom_select .select').each(function() {
		$(this).find(".select_btn").text($(this).find(".select_list").find(".active").text());
	});

	if ($(".view_select .front_view").hasClass("active")) {
		$(imgSrc).attr("src", activeProduct);
	} else if ($(".view_select .back_view").hasClass("active"))  {
		$(imgSrc).attr("src", activeProductBack);
	}

	$(".product_select li").click(function() {
		if ($(".view_select .front_view").hasClass("active")) {
			$(imgSrc).attr("src", $(this).attr("data-img"));
		} else if ($(".view_select .back_view").hasClass("active"))  {
			$(imgSrc).attr("src", $(this).attr("data-img-back"));
		}
	});

	$(".view_select li").click(function() {
		if ($(".view_select .front_view").hasClass("active")) {
			$(imgSrc).attr("src", $(".product_select li.active").attr("data-img"));
		} else if ($(".view_select .back_view").hasClass("active"))  {
			$(imgSrc).attr("src", $(".product_select li.active").attr("data-img-back"));
		}
	});


	// BUTTON SAVE ON A 3 PACK
	$(".add_card .save_btn").click(function() {
		$(".custom_select .new_price strong").text($(this).attr("data-new-price"));
		$(".quantity_select .select_list li").removeClass("active");
		$(".quantity_select .select_list .pack_li").addClass("active");
		$(".quantity_select .select_btn").text($(".quantity_select .select_list .pack_li").text());
	});

	$(".custom_select .quantity_select ul li").click(function() {
		$(".custom_select .new_price strong").text($(this).attr("data-new-price"));

	});


	// PRODUCT CHARACTERISTICS SECTION
	$(".characteristics_section .tab-pane .more").click(function() {
		$(this).removeClass("active");
		thisActive = $(".characteristics_section .nav-tabs li .active");
		$(thisActive).removeClass("active").parent().next().find("a").addClass("active");
		$(".characteristics_section .mobile_block .active_page").text($(this).children("span").text());
	});
	
	$(".characteristics_section .nav-tabs li a").click(function() {
		activelink = $(this).children("span").text();
		$(".characteristics_section .mobile_block .active_page").text(activelink);
	});

	$(".characteristics_section .mobile_block .open_btn").click(function() {
		$(this).toggleClass("active");
		($(this).text() === "Close") ? $(this).text("Open") : $(this).text("Close");
		$(".characteristics_section .nav-tabs").slideToggle(300);
	});

	$(".characteristics_section .mobile_block .active_page").click(function() {
		if($(window).width() < 768) {
			$(this).toggleClass("active");
			$(".characteristics_section .nav-tabs").slideToggle(300);
		}
	});

	$(".characteristics_section .nav-tabs li a").click(function() {
		if($(window).width() < 1200) {
			$(".characteristics_section .mobile_block .open_btn").removeClass("active").text("Open");
			$(".characteristics_section .nav-tabs").slideUp(300);
		}
	});


	// PRODUCT COMPARE SECTION
	$(".product_compare .custom_dropdown .drop_btn").click(function() {
		$(this).parent().toggleClass("active");
	});

	$(".product_compare .custom_dropdown .dropdown_menu li").click(function() {
		$(this).parent().parent().removeClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).parent().prev().text($(this).text());
	});

	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_1'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_1").addClass("active");
	});
	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_2'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_2").addClass("active");
	});
	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_3'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_3").addClass("active");
	});

	$(".product_compare .option_dropdown .dropdown_menu li").click(function() {
		var index= $(this).index();
		$(this).parent().prev().text($(this).text());
		$('.product_compare .wrapper .item').each(function() {
			$(this).find("ul li").removeClass("active");
			$(this).find("ul li").eq(index).addClass("active");
		});
	});


	$(".step_cart .show_carts").click(function() {
		$(this).toggleClass("active");
		$(this).next().slideToggle();
	});


	$(".payment_methods .radio_item").click(function() {
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
	});


	$('.shipping_methods input').on('change', function() {
		if($("#different_address_input").is(':checked')) { 
			$(".step_section .different_address").slideDown(100);	
		} else {
			$(".step_section .different_address").slideUp(100);	
		}
	});


	$("input[name='tel']").keydown(function(event) {
		// Разрешаем нажатие клавиш backspace, Del, Tab и Esc
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
			// Разрешаем выделение: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			// Разрешаем клавиши навигации: Home, End, Left, Right
			(event.keyCode >= 35 && event.keyCode <= 39)) {
			return;
		} else {
			// Запрещаем всё, кроме клавиш цифр на основной клавиатуре, а также Num-клавиатуре
			if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				event.preventDefault();
			}  
		}
	});

	// MAIN FORM
	$('.main_form, .request_form').each(function() {
		$(this).validate({
			ignore: [],
			rules:{
				name: {
					minlength: 2,
					maxlength: 16,
				},
				firstName: {
					minlength: 2,
					maxlength: 16,
				},
				lastName: {
					minlength: 2,
					maxlength: 16,
				},
				tel: {
					required: true,
					minlength: 8,
				},
				email: {
					email: true,
					emailfull: true,
					maxlength: 120,
				},
				emailre: {
					email: true,
					maxlength: 120,
					equalTo: "#email_input"
				},
				country: {
					required: true,
				},
				password: {
					required: true,
					minlength: 5,
					maxlength: 120,
				},
				nameoremail: {
					required: true,
					minlength: 2,
					maxlength: 120,
				}
			},
			messages:{
				name: {
					required: "This field is required.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				firstName: {
					required: "Please enter your firstname.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				lastName: {
					required: "Please enter your lastname.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				tel: {
					required: "This field is required.",
					minlength: "Please enter at least 8 characters."
				},
				email: {
					required: "Please enter a valid email address.",
					email: "Please enter a valid email address.",
					maxlength: "Maximum 120 characters."
				},
				emailre: {
					required: "Please enter a valid email address.",
					email: "Please enter a valid email address.",
					maxlength: "Maximum 120 characters.",
					equalTo: "Please enter the same email as above"
				},
				country: {
					required: "This field is required."
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				},
				nameoremail: {
					required: "This field is required.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 120 characters."
				}
			},
			errorPlacement: function(error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.siblings('.nice-select'));
				} else if (element.is('.key_item input')) {
					error.appendTo(element.parent());
				} else {
					error.insertAfter(element);
				};
			},
			submitHandler: function(form) {
				$.ajax({
					url: "php/submit.php",
					type: "POST",
					data: $(form).serialize(),
					success: function(response) {
						$('.main_form').trigger('reset');
						$(".modal").modal("hide");
						setTimeout(function(){$('#thanks_modal').modal("show")}, 500); 
					}            
				});
			}
		});
	});


	// STEP FORM
	$('.step_form').each(function() {
		$(this).validate({
			ignore: [],
			rules:{
				name: {
					minlength: 2,
					maxlength: 16,
				},
				firstName: {
					minlength: 2,
					maxlength: 16,
				},
				lastName: {
					minlength: 2,
					maxlength: 16,
				},
				tel: {
					required: true,
					minlength: 8,
				},
				email: {
					email: true,
					emailfull: true,
					maxlength: 120,
				},
				emailre: {
					email: true,
					maxlength: 120,
					equalTo: "#email_input"
				},
				country: {

				},
				password: {
					required: true,
					minlength: 5,
					maxlength: 120,
				},
				nameoremail: {
					required: true,
					minlength: 2,
					maxlength: 120,
				}
			},
			messages:{
				name: {
					required: "This field is required.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				firstName: {
					required: "Please enter your firstname.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				lastName: {
					required: "Please enter your lastname.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 16 characters."
				},
				tel: {
					required: "This field is required.",
					minlength: "Please enter at least 8 characters."
				},
				email: {
					required: "Please enter a valid email address.",
					email: "Please enter a valid email address.",
					maxlength: "Maximum 120 characters."
				},
				emailre: {
					required: "Please enter a valid email address.",
					email: "Please enter a valid email address.",
					maxlength: "Maximum 120 characters.",
					equalTo: "Please enter the same email as above"
				},
				country: {
					required: "This field is required."
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				},
				nameoremail: {
					required: "This field is required.",
					minlength: "Please enter at least 2 characters.",
					maxlength: "Maximum 120 characters."
				}
			},
			errorPlacement: function(error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.siblings('.nice-select'));
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {
				$.ajax({
					url: "php/submit.php",
					type: "POST",
					data: $(form).serialize(),
					success: function(response) {
						
					}            
				});
			}
		});
	});



	// SUBSCRIBE FORM
	$('.subscribe_form').each(function() {
		$(this).validate({
			ignore: [],
			rules:{
				subscribe: {
					email: true,
					emailfull: true,
					maxlength: 120,
				},
			},
			messages:{
				subscribe: {
					required: "Please enter a valid email address.",
					email: "Please enter a valid email address.",
					maxlength: "Maximum 120 characters."
				},
			},
			submitHandler: function(form) {
				$.ajax({
					url: "php/submit.php",
					type: "POST",
					data: $(form).serialize(),
					success: function(response) {
						$('.main_form').trigger('reset');
						$(".modal").modal("hide");
						setTimeout(function(){$('#thanks_modal').modal("show")}, 500); 
					}            
				});
			}
		});
	});


	jQuery.validator.addMethod("emailfull", function(value, element) {
		return this.optional(element) || /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(value);
	}, "Please enter valid email address!");



	// CLOSE THANKS WINDOW
	$(".thanks_window .close").click(function() {
		$(".thanks_window").fadeOut();
	});


	$('.cart_section .cart_item').each(function() {
		thisSumm = $(this).find(".item_price").children("span").text();
		$(this).find("input").keyup(function() {
			itemVal = $(this).val();
			itemPrice = $(this).parent().siblings(".item_title").find(".item_pr").text();
			parseSumm = parseFloat(itemPrice * itemVal);
			$(this).parent().siblings(".item_price").children("span").text(parseSumm.toFixed(2));
			calculateSum();
		});
	});

	function calculateSum() {
		var sum = 0;
		$(".item_price span").each(function () {
			var thisSumm = parseFloat($(this).text());

				sum += thisSumm;

		});
		$('.table_summ').text(sum.toFixed(2));
	}

	calculateSum() 



	// SCROLL TO ID
	if($(window).width() > 479) {
		$(".terminal_section .bottom_wrapper .main_btn").click(function() {
			$(this).mPageScroll2id({
				offset: 115
			});
		})
	} else {
		$(".terminal_section .bottom_wrapper .main_btn").click(function() {
			$(this).mPageScroll2id({
				offset: 72
			});
		})
	}


	$('.mod_select').on('change', function() {
        $(this).valid();
    })



    // SCROLL TO ID
	if($(window).width() > 479) {
		$(".main_section .main_btn, .what_is_section .main_btn, .academy_welcome .more, .product_main_section .more").click(function() {
			$(this).mPageScroll2id({
				offset: 86
			});
		})
	} else {
		$(".main_section .main_btn, .what_is_section .main_btn, .academy_welcome .more, .product_main_section .more").click(function() {
			$(this).mPageScroll2id({
				offset: 51
			});
		});
	}
	
	

	// SCROLL TO ID
	if($(window).width() > 767) {
		$(".academy_all_welcome .more").click(function() {
			$(this).mPageScroll2id({
				offset: 200
			});
		})
	} else {
		$(".academy_all_welcome .more").click(function() {
			$(this).mPageScroll2id({
				offset: 140
			});
		})
	}

});
