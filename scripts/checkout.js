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



// new Promise((resolve) => {

//   loadProducts(() => {
//     resolve();
//   });

// }).then(() => {
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });
// }).then(()=> {
//   renderOrderSummary();
//   renderPaymentSummary();
// });