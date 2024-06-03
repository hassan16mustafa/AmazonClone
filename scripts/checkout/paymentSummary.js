import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingCost = 0;
  cart.forEach((item) => {
    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingCost += deliveryOption.priceCents;
  });

  let beforeTax = productPriceCents + shippingCost;
  let tax = beforeTax * 0.1;
  let total = tax + beforeTax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div>Items (3):</div>
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
    </div>`;

  const paymentSummaryElement = document.querySelector('.js-payment-summary');
  if (paymentSummaryElement) {
    paymentSummaryElement.innerHTML = paymentSummaryHTML;
  } else {
    console.error("Payment summary element not found.");
  }
}
