let orderId = localStorage.getItem("orderId")
orderId = JSON.parse(orderId)
let totalCost = 0;
let cart = localStorage.getItem("cart") || [];
  cart = JSON.parse(cart);

for (let i = 0; i < cart.length; i++) {
    totalCost += cart[i].quantity * cart[i].price;

    document.querySelector(".col-12").innerHTML = "Thanks for shopping with us, your orderId is " + orderId.orderId + " and the total cost is $" + totalCost/100 +".00."
  }

function emptyCart() {
  localStorage.clear()
}
