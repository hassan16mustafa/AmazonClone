export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

export function loadCart() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      console.log('Response from server:', xhr.responseText); // Debugging line

      try {
        const parsedResponse = JSON.parse(xhr.responseText);
        cart = parsedResponse;
        saveToStorage();
        resolve();
      } catch (error) {
        // Handle unexpected response format
        console.error(`Unexpected response format: ${xhr.responseText}`);
        // Fallback to default cart if response is invalid
        resolve();
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Error loading cart data.'));
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  });
}
