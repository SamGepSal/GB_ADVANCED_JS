const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'img/img.jpeg'},
    {id: 2, title: 'Mouse', price: 20, img: 'img/img.jpeg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'img/img.jpeg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'img/img.jpeg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (img = 'img/tovar-chto-takoe-korobka.jpg', title = 'товар', price = '0') => {
    return `<div class="product-item">
                <img src="${img}" alt="img" class='product-item__img'/>
                <h3 class='product-item__title'>${title}</h3>
                <p class='produc-item__price'>${price} &#8381</p>
                <button class="buy-btn"><i class="fa-solid fa-basket-shopping"></i> Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.img, item.title,item.price)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);