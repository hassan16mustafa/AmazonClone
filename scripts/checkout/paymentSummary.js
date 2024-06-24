import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingCost = 0;
  cart.forEach((item) => {
    const product = getProduct(item.productId);
    if (product) {
      productPriceCents += product.priceCents * item.quantity;
    } else {
      console.error(`Product not found for ID: ${item.productId}`);
    }
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    if (deliveryOption) {
      shippingCost += deliveryOption.priceCents;
    } else {
      console.error(`Delivery option not found for ID: ${item.deliveryOptionId}`);
    }
  });

  let beforeTax = productPriceCents + shippingCost;
  let tax = beforeTax * 0.1;
  let total = tax + beforeTax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div>Items (${cart.length}):</div>
      <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money">$${(shippingCost / 100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${(beforeTax / 100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
    </div>
    <button class="place-order-button button-primary js-order">Place Your Order</button>
  `;

  const paymentSummaryElement = document.querySelector('.js-payment-summary');
  if (paymentSummaryElement) {
    paymentSummaryElement.innerHTML = paymentSummaryHTML;

    // Ensure event listener is added after the element is available in the DOM
    document.querySelector('.js-order').addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json();
        addOrder(order);
        window.location.href = 'orders.html'
      } catch (error) {
        console.error('Error placing order:', error);
      }
    });
  } else {
    console.error("Payment summary element not found.");
  }
}
