const basketAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';
const basketButtonEl = document.querySelector('.btn-cart');
const basketEl = document.querySelector('.basket')

basketButtonEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden')
})

class BasketList {
    constructor(block = '.basket__block'){
        this.block = block;
        this.basketGoods = [];
        this._getBasketProducts()
            .then(data => {
                this.basketGoods = data.contents;
                this.basketRender()
       })
    };

    _getBasketProducts(){
        return fetch(basketAPI)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    basketRender(){
        const basketBlock = document.querySelector(this.block);
        
        for (let basketProduct of this.basketGoods){
          const basketProductObj = new BasketProductItem(basketProduct);
            basketBlock.insertAdjacentHTML('beforeend', basketProductObj.basketRender());
        }
    }
}

class BasketProductItem {
    constructor(contents, img = 'https://placehold.jp/60x60.png'){
        this.id_product = contents.id_product;
        this.product_name = contents.product_name;
        this.price = contents.price;
        this.img = img;
        this.quantity = contents.quantity;
    }

    basketRender(){
        return `<div class="basket__item">
        <div class="basket__img">
          <img src="${this.img}" alt="img" />
        </div>
        <div class="basket__product">
          <div class="basket__productName">${this.product_name}</div>
          <div class="basket__quontity"><span>кол-во: </span>${this.quantity}</div>
          <div class="basket__cost"><span>$</span>${this.price}</div>
        </div>
        <div class="total">
          <div class="basket__sum"><span>$</span>${this.price * this.quantity}</div>
          <div class="basket__delete">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>`
    }
}
let bList = new BasketList();
console.log(bList)