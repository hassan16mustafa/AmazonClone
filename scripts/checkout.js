import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

function renderOrderSummary(){

let cartSummaryHTML = '';

const today = dayjs();
const delivery = today.add(7, 'days');
console.log(delivery.format('dddd, MMMM D'));

// Debugging log to verify cart contents
console.log("Cart:", cart);
console.log("Products:", products);

// Check if the cart is empty
if (cart.length === 0) {
  console.log("The cart is empty.");
}

cart.forEach((item) => {
  const productId = item.productId;
  let matchingProduct = products.find(product => product.id === productId);

  // Debugging log to verify each matching product
  console.log("Matching Product:", matchingProduct);

  if (!matchingProduct) {
    console.log(`No matching product found for productId: ${productId}`);
    return;
  }

  const deliveryOptionsHtml = deliveryOptionsHTML(matchingProduct, item);
  console.log("Delivery Options HTML for Product:", matchingProduct.name, deliveryOptionsHtml);

  const deliveryOptionId = item.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM D');
  console.log("Delivery Date String:", dateString);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml}
        </div>
      </div>
    </div>`;
});

// Debugging log to verify final HTML content
console.log("Cart Summary HTML:", cartSummaryHTML);

const orderSummaryElement = document.querySelector('.js-order-summary');
if (orderSummaryElement) {
  orderSummaryElement.innerHTML = cartSummaryHTML;
  console.log("Order summary element found and updated.");
} else {
  console.error("Order summary element not found.");
}

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) {
      container.remove();
    }
  });
});

hello();

console.log(dayjs());

function deliveryOptionsHTML(matchingProduct, item) {
  let html = '';
  console.log("Generating delivery options for product:", matchingProduct.name);
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');
    console.log("Delivery Date String:", dateString);

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
    console.log("Price String:", priceString);

    const isChecked = deliveryOption.id === item.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input" 
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>`;
  });
  console.log("Generated Delivery Options HTML:", html);
  return html;
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener("click", () => {
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
  });
});

}

renderOrderSummary();
