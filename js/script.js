$(document).ready(function () {
    $('.burger__icon').on('click', function () {
        $(this).toggleClass('active');
        $('.header__mobile').slideToggle();
    });

    const addActive = (element) => {
        element.on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
    addActive($('.header__lang'));
    addActive($('.header__mobile-lang'));

    const equalHeightContent = (element) => {
        let imgHeidht = $('.online__images').height();
        element.height(imgHeidht);
    }
    equalHeightContent($('.online__content'))
    const contentHeigh = () => {
        let mainHeight = $('.instruction__wrapper').height();
        let titleHeight = $('.instruction-content__title').height() + parseInt($('.instruction-content__title').css('marginBottom'));
        let headHeight = $('.instruction-content__head').height() + parseInt($('.instruction-content__head').css('marginBottom'));
        let upperHeight = titleHeight + headHeight;
        let downHeight = $('.instruction-footer').height();
        let contentHeight = mainHeight - upperHeight - downHeight - parseInt($('.instruction-content__text').css('paddingBottom'));
        $('.instruction-content__text').height(contentHeight);
    }

    $(window).resize(function () {
        let windowWidth = $(window).width();
        contentHeigh();
        if (windowWidth > 992) {
            equalHeightContent($('.online__content'))
        }
    })
    $('.accordion__title').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
        return false;
    });
    // scrollbar
    $('.online__content').mCustomScrollbar({
        axis: "y",
    });
    $('.instruction-content__text--scroll').mCustomScrollbar({
        axis: "y",
    });
    // scrollbar end
    // slick silder

    $('.info__slider').slick({
        arrows: false,
        swipe: true,
        dots: true,
    });

    $('.intresting-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        prevArrow: '<div class="slider-arrow slider-arrow--prev"></div>',
        nextArrow: '<div class="slider-arrow slider-arrow--next"></div>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
        ]
    })

    // slick silder end
    contentHeigh();



    const scrollLink = document.querySelectorAll('.scroll-link')

    const smoothScrol = (elememt) => {
        elememt.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault()
                const id = e.currentTarget.getAttribute('data-scroll');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        })
    };

    smoothScrol(scrollLink);
});