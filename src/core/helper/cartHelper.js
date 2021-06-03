export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    ///if item already exists
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
  console.log(cart);
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product.id === productId) {
        //removing one item from there
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");

    let cart = []; //holding empty cart so that it doesn't gets error coz loadcart function obviously will be empty
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
