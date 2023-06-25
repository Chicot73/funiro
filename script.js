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

});//начальная функция 