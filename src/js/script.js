window.addEventListener('DOMContentLoaded', function () {
    // Slider
    
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        speed: 1000,
        autoplay: true,
        controls: false,
        navPosition: 'bottom',
        nav: true
    });

    document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
    };

    document.querySelector('.next').onclick = function () {
        slider.goTo('next');
    };

    // Tabs

    let li = document.querySelectorAll('.catalog_i'),
        tab = document.querySelectorAll('.catalog__tab'),
        content = document.querySelectorAll('.catalog__content'),
        tabs = document.querySelector('.catalog__tabs');

    tabs.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.value == "catalog_i" || target.classList.value == "catalog__tab") {

            tab.forEach((element) => {
                element.classList.remove('catalog__tab_active');
            });

            content.forEach((element) => {
                element.classList.remove('catalog__content_active');
            });

            for (let i = 0; i < li.length; i++) {
                if (target == li[i]) {
                    tab[i].classList.add('catalog__tab_active');
                    content[i].classList.add('catalog__content_active');
                    break;
                }
            }
        }
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_min').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Validate form

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                },
                phone: "Пожалуста, введите свой номер телефона",
                email: {
                    required: "Пожалуста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');


    // Mask tel

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Sending data

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#order, #consultation').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function (){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    
    new WOW().init();
});