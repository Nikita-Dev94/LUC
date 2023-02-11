//Маска для телефона
const selectorHero = document.querySelector(".text-field__inp");
const imHero = new Inputmask("+7 (999) 999-99-99");
imHero.mask(selectorHero);

const sectionCall = document.querySelector('.call')
const selectorCall = sectionCall.querySelector(".text-field__inp");
const imCall = new Inputmask("+7 (999) 999-99-99");
imCall.mask(selectorCall);



// При нажати на кнопку появляется рамка, если в номере телефона меньше 10 символов.
document.querySelector('.hero__btn').addEventListener('click', (e) => {
	e.preventDefault();
	const phone = selectorHero.inputmask.unmaskedvalue()
	const heroInput = document.querySelector('.text-field__inp');
	if (phone.length != 10) {
		heroInput.classList.add('error')
	}
	selectorHero.addEventListener('input', () => {
		heroInput.classList.remove('error')
	})
	selectorHero.addEventListener('blur', () => {
		heroInput.classList.remove('error')
	})
})
document.querySelector('.call__btn').addEventListener('click', (e) => {
	e.preventDefault();
	const phone = selectorCall.inputmask.unmaskedvalue()
	const callInput = sectionCall.querySelector('.text-field__inp');
	const callName = sectionCall.querySelector('.text-field__inp[data-error="name"]');

	if (phone.length != 10) {
		callInput.classList.add('error')
	}
	selectorCall.addEventListener('input', () => {
		callInput.classList.remove('error')
	})
	selectorCall.addEventListener('blur', () => {
		callInput.classList.remove('error')
	})
	if (callName.value === '') {
		callName.classList.add('error')
	}
	callName.addEventListener('input', () => {
		callName.classList.remove('error')
	})
	callName.addEventListener('blur', () => {
		callName.classList.remove('error')
	})
})

// Скрытие части таблицы
const btnPrice = document.querySelector('.price__btn');
btnPrice.addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelector('.price__content').classList.toggle('hide')
	btnPrice.classList.toggle('price__btn--rotate')
});

// Слайдер сотрудники
const swiperStaff = new Swiper('.staff__slider', {

	grabCursor: true,
	loop: true,
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},
	// Navigation arrows
	navigation: {
		nextEl: '.staff__button-next',
		prevEl: '.staff__button-prev',
	},
	breakpoints: {
		// when window width is >= 300px
		300: {
			slidesPerView: 1,
			spaceBetween: 10,
			slidesPerGroup: 1,

		},
		// when window width is >= 650px
		765: {
			slidesPerView: 2,
			spaceBetween: 20,
			slidesPerGroup: 1,

		},
		// when window width is >= 992px
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
			slidesPErGroup: 1,
			centeredSlides: true,
		}
	}
});
// Слайдер отзывы
const swiperFeedback = new Swiper('.feedback__slider', {
	grabCursor: true,
	loop: true,
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},
	// Navigation arrows
	navigation: {
		nextEl: '.feedback__button-next',
		prevEl: '.feedback__button-prev',
	},
	breakpoints: {
		// when window width is >= 300px
		300: {
			slidesPerView: 1,
			spaceBetween: 10,
			slidesPerGroup: 1,

		},
		// when window width is >= 650px
		765: {
			slidesPerView: 2,
			spaceBetween: 20,
			slidesPerGroup: 1,

		},
		// when window width is >= 992px
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
			slidesPErGroup: 1,

		}
	}
});



// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
	// Создание карты.
	let myMap = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.831248, 37.445696],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 14
	});

	// Создадим макет метки.
	let animatedLayout = ymaps.templateLayoutFactory.createClass(
		'<div class="placemark"></div>',
		{
			build: function () {
				animatedLayout.superclass.build.call(this);
				let element = this.getParentElement().getElementsByClassName('placemark')[0];
				// Если метка выбрана, то увеличим её размер.
				let size = this.isActive ? 60 : 34;
				// При задании для метки своего HTML макета, фигуру активной области
				// необходимо задать самостоятельно - иначе метка будет неинтерактивной.
				// Создадим фигуру активной области "Круг".
				let smallShape = { type: 'Circle', coordinates: [0, 0], radius: size / 2 };
				let bigShape = { type: 'Circle', coordinates: [0, -30], radius: size / 2 };
				// Зададим фигуру активной области.
				this.getData().options.set('shape', this.isActive ? bigShape : smallShape);
				// Если метка выбрана, то зададим класс и запустим анимацию.
				if (this.isActive) {
					element.classList.add("active");
					element.style.animation = ".35s show-big-placemark";
				} else if (this.inited) {
					element.classList.remove("active");
					element.style.animation = ".35s show-small-placemark";
				}
				if (!this.inited) {
					this.inited = true;
					this.isActive = false;
					// При клике по метке будем перестраивать макет.
					this.getData().geoObject.events.add('click', function () {
						this.isActive = !this.isActive;
						this.rebuild();
					}, this);
				}
			}
		}
	);
	myMap.geoObjects.add(new ymaps.Placemark([55.831248, 37.445696], {}, {
		iconLayout: animatedLayout,
		hasBalloon: false
	}));

	myMap.controls.remove('geolocationControl'); // удаляем геолокацию
	myMap.controls.remove('searchControl'); // удаляем поиск
	myMap.controls.remove('trafficControl'); // удаляем контроль трафика
	myMap.controls.remove('typeSelector'); // удаляем тип
	myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
	myMap.controls.remove('rulerControl'); // удаляем контрол правил
	myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}

//меняем текст маршрут
const route = document.querySelector('.contact__route-link');
if (document.documentElement.clientWidth < 765) {
	route.textContent = 'Маршрут'
}

