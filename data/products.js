class Product {
  constructor(dets) {
    this.id = dets.id;
    this.image = dets.image;
    this.name = dets.name;
    this.rating = dets.rating;
    this.priceCents = dets.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${(this.priceCents / 100).toFixed(2)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export let products = [];

export function getProduct(productId) {
  return products.find(product => product.id === productId);
}

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    try {
      products = JSON.parse(xhr.response).map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      callback(); // Call the callback function after products are loaded
    } catch (error) {
      console.error("Error parsing product data: ", error);
    }
  });

  xhr.addEventListener('error', () => {
    console.error("Error loading product data.");
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

