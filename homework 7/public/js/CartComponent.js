Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/50x100',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img/products/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `
    <li style="position: relative">
        <button class="cart-btn" type="button"@click="showCart = !showCart">
            <i class="fa-solid fa-cart-plus"></i> Корзина
        </button>
        
        <div class="basket" v-show="showCart">
            <div class="basket__angle"></div>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" @remove="remove"></cart-item>
        </div>
    </li>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template:  `
    <div class="basket__block">
      <div class="basket__item">
        <div class="basket__img">
          <img class="basket__img_inner" :src="img" alt="img" />
        </div>
        <div class="basket__product">
          <div class="basket__productName">
          {{ cartItem.product_name }}
          </div>
          <div class="basket__quontity">
            <span>кол-во: </span>{{ cartItem.quantity }}
          </div>
          <div class="basket__cost">
          <span>$</span>{{ cartItem.price }}
          </div>
        </div>
        <div class="total">
          <div class="basket__sum">
          <span>$</span>{{cartItem.quantity*cartItem.price}}</div>
          <div class="basket__delete" @click="$emit('remove', cartItem)">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>`
})