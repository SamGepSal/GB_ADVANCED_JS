Vue.component('products',{
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: 
    `<div class="shop_card container">
        <product v-for="product of filtered" 
        :key="product.id_product" 
        :product="product">
        </product>
    </div>`
})

Vue.component('product',{
    props: ['product', 'img'],
    template:`   
    <div class="shop_card_1">
            <a href="product.html">
                <img class="card-img" :src="product.imgProduct" alt="shop-img"/>
              <h3 class="shop_card_article">{{product.product_name}}</h3>
              <p class="shop_card_text">
                Known for her sculptural takes on traditional tailoring,
                Australian arbiter of cool Kym Ellery teams up with Moda
                Operandi.
              </p>
              <p class="cost">$ {{product.price}}</p>
            </a>
            <div class="add__box">
            <button class="add" @click="$root.$refs.cart.addProduct(product)"
              ><img src="img/basket.svg" alt="add to card" />
              <p class="add-desc">Add to Cart</p>
            </button>
          </div>
    </div>
    `
})






         