function ShoppingCart(cart) {
  this.cart = cart;
}

ShoppingCart.prototype.locateFind = function(id, cart) {
   
  if (typeof this.cart === "string") {
    this.cart = JSON.parse(cart);
  }
  let find;
  for (let i = 0; i < this.cart.length; i++) {
    if (this.cart[i].id == id) {
      find = i;
    }
  }
  return find;
};

ShoppingCart.prototype.createCart = function(find, input, data, id) {
 
  if (find !== undefined) {
    this.cart[find].quantity += parseInt(input.value);
  } else {
   console.log(data)
    this.cart.push({
      quantity: parseInt(input.value),
      name: data.name,
      price: data.price,
      id: id,
      image: data.imageUrl
    });
    
    
  }

};
