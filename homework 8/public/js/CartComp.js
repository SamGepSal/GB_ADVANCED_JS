Vue.component('cartComp', {
    data() {
        return {
            show: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${ product.id_product }/${ product.product_name }`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ product.id_product }/${ product.product_name }`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: ` 
    <li class="right_inner" style="position: relative">
        <button class="btn-cart" type="button" @click="show=!show">
            <img src="img/basket.svg" class="right_icon_img" alt="basket" />
        </button>
        <div class="cart" v-show="show">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <cart-item class="cart-item"
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.imgProduct"
                @remove="remove">
            </cart-item>
        </div>
    </li>
    `
})

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="shopping-item">
        <div class="shopping-item_cart">
            <img class="shopping-item_cart__img" :src="cartItem.imgProduct"
            alt="shop_card-img"/>
        </div>
        <div class="desc">
            <div class="head-delite">
                <h3 class="item-head">{{ cartItem.product_name }}</h3>
                <button class="delite" @click="$emit('remove', cartItem)">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <ul class="item-list">
                <li class="cart-text">
                    Price: <span class="collection_price">$ {{cartItem.price}}</span>
                </li>
                <li class="cart-text bottom-block">
                    <p class="cart-text">Quantity: {{ cartItem.quantity }}</p>
                    <p>Total: 
                        <span class="collection_price" style="font-weight: bold">
                            $ {{ cartItem.price * cartItem.quantity }}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
    `
})



