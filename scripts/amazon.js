import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

// Initialize the loading process and set up the grid rendering
document.addEventListener('DOMContentLoaded', () => {
  loadProducts(renderProductsGrid);
});

function renderProductsGrid() {
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
          <img class="product-rating-stars" src="${product.getStarsUrl()}" alt="Rating ${product.rating.stars} stars">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>
        <div class="product-quantity-container">
          <select class="product-quantity">
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
        ${product.extraInfoHTML()}
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

  document.querySelector('.js-grid').innerHTML = productsHtml;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = button.dataset.productId;
      const quantity = button.parentElement.querySelector('.product-quantity').value;
      addToCart(productId, parseInt(quantity));
      updateCart();
    });
  });

  updateCart(); // Initial update to show the correct cart quantity on page load
}

function updateCart() {
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = count;
}
