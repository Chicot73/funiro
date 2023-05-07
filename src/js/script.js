window.addEventListener('DOMContentLoaded', () => {

    //slider-1
    
    const swiper = new Swiper('.slider-1', {
        loop: true,
        slidesPerView: 'auto',
        //freeMode: false,
        initialSlide: 1,
        loopedSlides: 2,
        spaceBetween: 23,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.introduce__next',
            prevEl: '.introduce__prev',
          },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    

    //mobile menu

    const burger = document.querySelector('.header__burger'),
        cross = document.querySelector('.header__cross'),
        menuMob = document.querySelector('.header__menu'),
        menuBack = document.querySelector('.header__orange'),
        darker = document.querySelector('.header__darker'),
        action = document.querySelector('.introduce__action'),
        bodyM = document.querySelector('body');

    burger.addEventListener('click', (e) => {
        
        if (menuMob.classList.contains('header__menu--out')) {
            menuMob.classList.remove('header__menu--out');
        }; 
        if (menuBack.classList.contains('header__orange--out')) {
            menuBack.classList.remove('header__orange--out');
        };   
        
        menuMob.classList.add('header__menu--in');
        menuBack.classList.add('header__orange--in');
        darker.style.opacity = '1';
        action.style.opacity = '0.7';
        bodyM.style.overflow = 'hidden';
    }); 

    cross.addEventListener('click', (e) => {

        menuMob.classList.remove('header__menu--in');
        menuMob.classList.add('header__menu--out');
        menuBack.classList.remove('header__orange--in');
        menuBack.classList.add('header__orange--out');
        darker.style.opacity = '0';
        action.style.opacity = '1';
        bodyM.style.overflow = 'scroll';
    });  

    window.addEventListener('resize', (e) => { //чтобы не включалась анимация из "out" после скрипта
        if (menuMob.classList.contains('header__menu--out')) {
            menuMob.classList.remove('header__menu--out');
        }; 
        if (menuBack.classList.contains('header__orange--out')) {
            menuBack.classList.remove('header__orange--out');
        }; 
    });

});//начальная функция 