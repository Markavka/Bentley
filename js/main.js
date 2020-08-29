
// Main Бургер - открыть----------
$(".nav__btn, .nav p").click(function() {
	$(".nav__row").addClass('nav__row-active');
	$(".slide, .nav, .main__wrapper, .models__body, .dark, .news__link").animate({opacity: 0}, "fast");
	$("body").addClass('lock');
});
//--------------------------------

// Main Бургер - закрыть----------
$(".nav__close").click(function() {
	$(".nav__row").removeClass('nav__row-active');
	$(".slide, .nav, .main__wrapper, .models__body, .dark, .news__link").animate({opacity: 1}, "fast");
	$("body").removeClass('lock');
	// Выкл. для блока "Модельний ряд в nav"
	$(items).fadeOut('fast');
	$(tabLi).removeClass('tab__li-active');
	// $("body").css('overflow', 'auto');

	// Анимация уменьшения бокового меню
	if ($(window).width() > 1280) {
		$(navRow).removeClass('width');
		$(tabLi).addClass('padding');
	}
});
//--------------------------------


// Models slider------------------
let lies = $(".models__li");
let images = $(".models__img");
$(images[1]).css('display', 'block');

lies.click(function() {
	// img-----------------------------
	$(images).css('display', 'none');
	$(images[lies.index($(this))]).css('display', 'block');
	// Проверка нынешнего значение countSl (см. let countSl)
	images.map(function(index, elem) {
		if ($(elem).css('display') == 'block') {
			countSl = index;
		}
	});
	// li------------------------------
	if ($(this).hasClass('models__li-active') !== true) {
		$(lies).removeClass('models__li-active')
		$(this).addClass('models__li-active')
	}
});


// Функционал слайдера

// (см. 24стр.)
let countSl = 1;

let next = $('.models__dot-right');
let prev = $('.models__dot-left');

// Кнопка "Вперёд"
next.click(function() {
	countSl++;
	if (countSl == $(images).length) {
		countSl = 0;
	}
	$(images).fadeOut(400);
	$(images[countSl]).fadeIn(400);
	$(lies).removeClass('models__li-active')
	$(lies[countSl]).addClass('models__li-active');
});

// Кнопка "Назад"
prev.click(function() {
	countSl--;
	if (countSl == -1) {
		countSl = $(images).length - 1;
	}
	$(images).fadeOut(400);
	$(images[countSl]).fadeIn(400);
	$(lies).removeClass('models__li-active')
	$(lies[countSl]).addClass('models__li-active');
});

// Будет ли анимация в Модельном ряде, в зависимости от ширины экрана
function resizeAnim() {
	if ($(this).width() <= 1500) {
		$(".models__img").removeClass('animate__animated animate__fadeInLeft')
	}
	else {
		$(".models__img").addClass('animate__animated animate__fadeInLeft')
	}
}

window.addEventListener("resize", resizeAnim);

resizeAnim();
//--------------------------------





// Document Slider----------------

// Переменные Document Slider
 // Куда скроллим
let models = $(".models").offset().top;
let accessories = $(".accessories").offset().top;
let news = $(".news").offset().top;
 // Что будет изменяться
let slider = $(".slide__dots span");
let sliderTitle = $(".slide__title");

let count = 0;

// Функционал Document Slider
$(window).scroll(function() {
	let winScroll = $(window).scrollTop();
	let slide = $(".slide").position().top;

	// 1-й слайд
	if (winScroll < (models - slide)) {
		if ($(sliderTitle).text() !== 'Модельний ряд') {
			$(slider).removeClass("slide__dot-active");
			$(slider[0]).addClass("slide__dot-active");
			$(sliderTitle).stop().text('Модельний ряд').hide().fadeIn(400);
		}
	}

	// 2-й слайд
	if (winScroll > (models - slide) && winScroll < (accessories - slide)) {
		if ($(sliderTitle).text() !== 'Аксесуари') {
			$(slider).removeClass("slide__dot-active");
			$(slider[1]).addClass("slide__dot-active");
			$(sliderTitle).stop().text('Аксесуари').hide().fadeIn(400);
		}
	}

	// 3-й слайд
	if (winScroll > (accessories - slide) && winScroll < (news - slide)) {
		if ($(sliderTitle).text() !== 'Новини') {
			$(slider).removeClass("slide__dot-active");
			$(slider[2]).addClass("slide__dot-active");
			$(sliderTitle).stop().text('Новини').hide().fadeIn(400);
		}
	}


	// 4-й слайд
	if (winScroll > (news - slide)) {
		if ($(sliderTitle).text() !== '') {
			$(slider).removeClass("slide__dot-active");
			$(slider[3]).addClass("slide__dot-active");
			$(".slide").addClass('slide-detach')
			$(sliderTitle).stop().text('').hide().fadeIn(400);
		}
	}
	if (winScroll < (news - slide)) {
		if ($(sliderTitle).text() !== '') {
			$(".slide").removeClass('slide-detach');
		}
	}
});


// Переменные	Стрелки Document Slider
let modSc = document.querySelector(".models");
let accsSc = document.querySelector(".accessories");
let newsSc = document.querySelector(".news");
let arrowSc = $(".slide__arrow");

// Стрелка Document Slider
document.querySelector(".slide__arrow").onclick = function() {

	if (sliderTitle.text() == 'Модельний ряд') {
		modSc.scrollIntoView({behavior: "smooth"})
	}
	if (sliderTitle.text() == 'Аксесуари') {
		accsSc.scrollIntoView({behavior: "smooth"})
	}
	if (sliderTitle.text() == 'Новини') {
		newsSc.scrollIntoView({behavior: "smooth"})
	}
};
//--------------------------------


// Изменение цвета логотипа ------
let logo = $(".logo");
let navBtn = $(".nav__btn");

function dark() {
	let winScroll = $(window).scrollTop();
	// Нижний отступ секции accessories
	let accPad = parseInt($(".accessories").css("paddingBottom"));
	let logoDark = news - accPad - $(logo).innerHeight();

	if (winScroll > logoDark) {
		if ($(logo).hasClass('logo-gray') == false) {
			$(logo).addClass('logo-gray');
			$(navBtn).addClass('nav__btn-gray');
		}
	}
	else {
		if ($(logo).hasClass('logo-gray')) {
			$(logo).removeClass('logo-gray');
			$(navBtn).removeClass('nav__btn-gray');
		}
	}
}

$(window).scroll(function() {
	dark();
});

dark();
//--------------------------------



// Tab nav -----------------------
$(".tab a").click(function() {
	$(this).toggleClass('tab__active').next().slideToggle(300);
	// Выкл. для блока "Модельний ряд в nav"
	$(items).fadeOut('fast');
	$(tabLi).removeClass('tab__li-active');

	// Анимация уменьшения бокового меню
	if ($(window).width() > 1280) {
		$(navRow).removeClass('width');
	}
});
//--------------------------------


// Блок Модельний ряд в nav ------
let tabLi = $(".tab__li");
let items = $(".item");
let itemClose = $(".item__close");

let navRow = $(".nav__row");

$(tabLi).click(function() {
	let ind = $(this).index();

	// Проверка на повторный клик
	if ($(this).hasClass('tab__li-active') == false) {

		// тело функции
		$(items).fadeOut('fast');
		$(items[ind]).fadeIn("fast");
		$(tabLi).removeClass('tab__li-active');
		$(tabLi[ind]).addClass('tab__li-active');
		$("body").addClass('lock-2');

		// Анимация уменьшения бокового меню
		if ($(window).width() > 1280) {
			if ($(navRow).width() !== 400) {
				$(navRow).addClass('width');
				$(tabLi).addClass('padding');
			}
		}
	}
});

$(itemClose).click(function() {
	$(items).fadeOut('fast');
	$(tabLi).removeClass('tab__li-active');
	$("body").removeClass('lock-2');

	// Анимация уменьшения бокового меню
	if ($(window).width() > 1280) {
		$(navRow).removeClass('width');
		$(tabLi).addClass('padding');
	}
});
//--------------------------------



// Спойлеры ----------------------
let listList = $(".list__list");
let listTitle = $(".list__title");

$(listTitle).click(function() {
	if ($(window).width() <= 992) {
		$(listTitle).not($(this)).removeClass('list__title-active');
		$(listList).not($(this).next()).slideUp(300);
		$(this).toggleClass('list__title-active').next().slideToggle(300);
	}
});

$(window).resize(function() {
	if ($(this).width() > 992 && $(listList).css('display', 'none')) {
		listList.css('display', 'block');
		$(listTitle).removeClass('list__title-active');
	}
	else {
		listList.css('display', 'none');
	}
});
//--------------------------------


// Надпись "Меню" ----------------
let menu = $(".nav p");
let menuHeight = $(".nav p").height();
let mainTitleHeight = $(".main__title").height();

$(window).scroll(function() {
	let winScroll = $(window).scrollTop();
	let mainTitle = $(".main__title").offset().top;

	if ($(window).width() >= 576) {
		if (winScroll > (mainTitle - mainTitleHeight - menuHeight)) {
			menu.fadeOut('fast');
		}
		else {
			menu.fadeIn('fast');
		}
	}
	else {
		menu.css('display', 'none');
	}
});

if ($(window).width() <= 576) {
	if ($(window).scrollTop() > ($(".main__title").offset().top - mainTitleHeight - menuHeight)) {
		menu.css('display', 'none');
	}
	else {
		menu.css('display', 'block');
	}
}
// Делает ту же самую проверку, что и функция выше,
// но при загрузке экрана

//--------------------------------


