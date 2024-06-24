import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadCart } from '../data/cart.js';
import { loadProductsFetch } from '../data/products.js';

Promise.all([
  loadProductsFetch(),
  loadCart()
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}).catch((error) => {
  console.error('Error loading initial data:', error);
});

// If you need to use an async function and handle the results of loadProductsFetch and loadCart, do it like this:

async function loadPage() {
  console.log('load page');

  try {
    await loadProductsFetch();
    await loadCart();

    console.log('next');
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Error loading page:', error);
  }
}

loadPage().then(() => {
  console.log('Page loaded successfully');
}).catch((error) => {
  console.error('Error loading page:', error);
});
