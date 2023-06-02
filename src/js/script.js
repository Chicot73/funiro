window.addEventListener('DOMContentLoaded', () => {

    //slider-1
    
    const slider = new Swiper('.slider-1', {
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
            clickable: true
        },
    });


    //slider-2
    
    const slider2 = new Swiper('.slider-2', {
        loop: true,
        slidesPerView: 'auto',
        //freeMode: false,
        initialSlide: 0,
        loopedSlides: 3,
        spaceBetween: 23,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.slider-2__next',
          },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            10: {
                spaceBetween: 19,
            },
            592: {
                spaceBetween: 23,
            },
        }
    });


    //slider-3
    
    const slider3 = new Swiper('.slider-3', {
        loop: true,
        slidesPerView: 'auto',
        //freeMode: false,
        initialSlide: 2,
        loopedSlides: 2,
        spaceBetween: 32,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.essays__next',
            prevEl: '.essays__prev',
          },
        breakpoints: {
            10: {
                spaceBetween: 22,
            },
            592: {
                spaceBetween: 32,
            },
        }
    });


    //slider-4
    
    const slider4 = new Swiper('.slider-4', {
        loop: false,
        slidesPerView: 'auto',
        freeMode: true,
        initialSlide: 2,
        loopedSlides: 2,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        breakpoints: {
            10: {
                spaceBetween: 15,
            },
            592: {
                spaceBetween: 20,
            },
        }
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


    //Калькулятор корзины

    /* let basket_price = 0,
    basketBtn = document.querySelector('.card__basket'),
    nameTrgt = document.querySelector('.card__title'),
    priceTrgt = document.querySelector('.card__newprice'),
    name = nameTrgt.textContent,
    price = priceTrgt.textContent;

    Basket = [];
    basketBtn.forEach((name, price) => {
        item.addEventListener('click', () => {
            Basket.push({name, price});
        });
    });
    function countBasketPrice() {
        for (i=0; i<Basket.length; i++) { 
            basket_price = basket_price + Basket[i].price;
        }
        return basket_price;
    }
    document.write('<h2>В корзине:</h2>');
    for (i=0;i<Basket.length;i++){document.write(Basket[i].name + ' — ' + Basket[i].price +' руб</br>');}
    document.write('</br><b>Стоимость заказа: '+countBasketPrice(Basket)+'</b>'); */

});//начальная функция 