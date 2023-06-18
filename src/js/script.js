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






    //Корзина товаров  + + + + + + + + + + + + + + + + + + + + + + + + 


       //Преобразует строку в число, убирая точки

    function toNum(str) {
        //const num = Number(str.replace(/\./g, ""));
        const num = Number(str.replace(/\D/g, ""));
        return num;
    }

       //Преобразует число в строку, со вставкой символа валют

    function toCurrency(num) {
        const format = new Intl.NumberFormat("en-EN", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(num);
        return format;
    } 
    
        //Считываем все элементы корзины:

    const cardAddArr = Array.from(document.querySelectorAll(".card__basket")); //кнопка добавить в корзину
    const cartNum = document.querySelector("#cart_num"); //счетчик корзины
    const cart = document.querySelector("#cart");  //кнопка корзины


        //Класс для корзины

    class Cart {
        products;
        constructor() {
            this.products = [];
        }
        get count() {
            return this.products.length;
        }
        addProduct(product) {
            this.products.push(product);
        }
        removeProduct(index) {
            this.products.splice(index, 1);
        }

        
       
        get cost() {
            const prices = this.products.map((product) => {
                return toNum(product.price);
            });
            const sum = prices.reduce((acc, num) => {
                return acc + num;
            }, 0);
            return sum;
        }   

        /*     //Если нужно вычесть из цены скидку

        get costDiscount() {
            const prices = this.products.map((product) => {
                return toNum(product.priceDiscount);
            });
            const sum = prices.reduce((acc, num) => {
                return acc + num;
            }, 0);
            return sum;
        }
        get discount() {
            return this.cost - this.costDiscount;
        } */
    }

        //класс для одного товара
    
    class Product {
        imageSrc;
        name;
        desc;
        price;
        id;
        constructor(card) {
            this.imageSrc = card.querySelector(".card__image").children[0].src;
            this.name = card.querySelector(".card__title").innerText;
            this.desc = card.querySelector(".card__desc").innerText;
            this.price = card.querySelector(".card__newprice").innerText;
            this.id = card.querySelector(".card__basket").dataset.id;
        }
    };

        //Создаем объект корзины и сохраняем его в localStorage

    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    cartNum.textContent = myCart.count;


        //Добавляем товар в корзину
    
    myCart.products = cardAddArr.forEach((cardAdd, id) => {

        cardAdd.addEventListener("click", (e) => {
            e.preventDefault();
            
            const card = e.target.closest(".card");

            const product = new Product(card);
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            myCart.products = savedCart.products;
            if (cardAdd.classList.contains("added")) {
                cardAdd.classList.remove("added");
                let cardId = e.target.dataset.id;  // нахожу ID кнопки на карточке
                let newArray = myCart.products.filter((product) => product.id !== cardId); // сравниваю ID нового продукта в корзине и ID карточки,
                                                                                           // и получаю новый массив, без нажатого продукта
                myCart.products = newArray; // обратно загоняю всё в старый массив

                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count; 
                cardAdd.textContent = "Add to cart";
                basketBlockFill();
            } else {
                cardAdd.classList.add("added");
                myCart.addProduct(product);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
                cardAdd.textContent = "Already inside";
            }; 
        });
        //}, { once: true }); // если хочу отловить только первый клик
    });


        //Считываем все элементы поп-апа:

    const basketBack = document.querySelector(".basket__back");
    const basketClose = document.querySelector("#basket_cross");
    const body = document.body;
    const basketСontent = document.querySelector("#basket_content");
    const basketPrice = document.querySelector("#final_price");
    const basketAmount = document.querySelector("#items_amount");
    const itemAmount = document.querySelector("#item_amount");


        //Заполнение корзины

    function basketBlockFill() {
        basketСontent.innerHTML = null;
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        myCart.products = savedCart.products;
        const productsHTML = myCart.products.map((product) => {
          const productItem = document.createElement("div");
          productItem.classList.add("basket-item");
      
          const productWrap1 = document.createElement("div");
          productWrap1.classList.add("basket-item__left");
          const productWrap2 = document.createElement("div");
          productWrap2.classList.add("basket-item__right");
          const productWrap3 = document.createElement("div");
          productWrap3.classList.add("basket-item__text");
          const productWrap4 = document.createElement("div");
          productWrap4.classList.add("amount");
      
          const productImage = document.createElement("img");
          productImage.classList.add("basket-item__image");
          productImage.setAttribute("src", product.imageSrc);
      
          const productTitle = document.createElement("h6");
          productTitle.classList.add("basket-item__title");
          productTitle.innerHTML = product.name;

          const productDesc = document.createElement("p");
          productDesc.classList.add("basket-item__desc");
          productDesc.innerHTML = product.desc;

          const itemMinus = document.createElement("button");
          itemMinus.classList.add("amount__minus");
          itemMinus.innerHTML = "&#8722;";

          const itemWord = document.createElement("div");
          itemWord.classList.add("amount__word");
          itemWord.innerHTML = "quantity&nbsp;&nbsp;";

          const itemAmount = document.createElement("span");
          itemAmount.classList.add("amount__number");
          itemAmount.innerHTML = "1";

          const itemPlus = document.createElement("button");
          itemPlus.classList.add("amount__plus");
          itemPlus.innerHTML = "&#43;";
      
          const productPrice = document.createElement("div");
          productPrice.classList.add("basket-item__price");
          productPrice.innerHTML = toCurrency(toNum(product.price));
      
          const productDelete = document.createElement("button");
          productDelete.classList.add("basket-item__off");
          productDelete.innerHTML = "&#10006;";
      
          productDelete.addEventListener("click", () => {
                myCart.removeProduct(product);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
                basketBlockFill();
          });

          /* const productAdded = document.querySelector(".added");
          productAdded.addEventListener('click', () => {
                myCart.removeProduct(product);
                localStorage.setItem("cart", JSON.stringify(myCart));
                basketBlockFill();
          }); */
        
      
          productWrap1.appendChild(productImage);
          productWrap1.appendChild(productWrap3);
          productWrap2.appendChild(productWrap4);
          productWrap3.appendChild(productTitle);
          productWrap3.appendChild(productDesc);
          productWrap4.appendChild(itemMinus);
          productWrap4.appendChild(itemWord);
          productWrap4.appendChild(itemAmount);
          productWrap4.appendChild(itemPlus);           
          productWrap2.appendChild(productPrice);
          productWrap2.appendChild(productDelete);
          productItem.appendChild(productWrap1);
          productItem.appendChild(productWrap2);
      
          return productItem;
        });
      
        productsHTML.forEach((productHTML) => {
            basketСontent.appendChild(productHTML);
        });

        basketAmount.textContent = myCart.count;
        basketPrice.textContent = toCurrency(myCart.cost);
        itemAmount.textContent = myCart.count;
    };


    //Обработчики кнопки открытия и закрытия корзины:

    cart.addEventListener("click", (e) => {
        e.preventDefault();
        basketBack.classList.add("active");
        body.style.overflow = 'hidden';
        basketBlockFill();
    });

    basketClose.addEventListener("click", (e) => {
        e.preventDefault();
        basketBack.classList.remove("active");
        body.style.overflow = 'scroll';
        //location.reload(); //- перезагрузка страницы
    });

    /* let cart = {
        '111': {
            "name" : "Pingky",
            "desc" : "Cute bed set",
            "count" :  1,
            "price" :  7000000
        }
    };

    document.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (e.target.classList.contains('amount__plus')) {
            plusFunction(e.target.dataset.id);
        }
        if (e.target.classList.contains('amount__minus')) {
            minusFunction(e.target.dataset.id);
        }
    })

    //увеличение количества товара
    const plusFunction (id) => {
        cart[id]['count'] ++;
        renderCart();
    }

    //уменьшение количества товара
    const minusFunction (id) => {
        if (cart[id]['count']-1 == 0) {
            deleteFunction(id);
            return true;
        }
        cart[id]['count'] --;
        renderCart();
    }

    //удаление товара
    const deleteFunction (id) => {
        delete cart[id];
        renderCart();
    }
    
    const renderCart () => {
        console.log(cart);
    }

    renderCart();

    let basket_price = 0,
    basketBtn = document.querySelector('.card__basket'),
    nameTrgt = document.querySelector('.card__title'),
    descTrgt = document.querySelector('.card__desc'),
    priceTrgt = document.querySelector('.card__newprice'),
    item = document.querySelector('.card__info'),
    name = nameTrgt.textContent,
    price = priceTrgt.textContent,
    desc = descTrgt.textContent;

    Basket = [];
    basketBtn.forEach((name, price, desc) => {
        basketBtn.addEventListener('click', () => {
            Basket.push({name, price, desc});
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
    document.write('</br><b>Стоимость заказа: '+countBasketPrice(Basket)+'</b>');  */

});//начальная функция 