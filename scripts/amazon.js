import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHtml = '';

products.forEach((product) => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Rating ${product.rating.stars} stars">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>
            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart">
                <img src="images/icons/checkmark.png" alt="Added to cart">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}"
            data-product-name="${product.name}">
                Add to Cart
            </button>
        </div>
    `;
    productsHtml += html;
});




function updatecart(){
    let count = 0;
        cart.forEach((item) => {
            count += item.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = count;

}

document.querySelector('.js-grid').innerHTML = productsHtml;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productName = button.dataset.productName;

        addToCart(productId, productName);
        updatecart();
        
    });
});
