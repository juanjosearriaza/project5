let finishshopping = document.querySelector("#finish");
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let address = document.getElementById("address");
let postCode = document.getElementById("postcode");
let city = document.getElementById("city");
let erase = document.getElementsByClassName("fa-window-close");
let input = document.getElementsByClassName("quantity");
let form = document.querySelector(".needs-validation");


function eraseProduct() {
  for (let i = 0; i < erase.length; i++) {
    erase[i].addEventListener("click", function() {
      let cart = localStorage.getItem("cart") || [];
      let quantity = localStorage.getItem("quantity");
      quantity = JSON.parse(quantity);
      let newQuantity = quantity - parseInt(input[i].value);
      if (typeof cart === "string") {
        cart = JSON.parse(cart);
      }

      cart.splice(i, 1);
      localStorage.setItem("quantity", JSON.stringify(newQuantity));
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(true);
    });
  }
}

function changeQuantity() {
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", function() {
      let cart = localStorage.getItem("cart") || [];
      if (typeof cart === "string") {
        cart = JSON.parse(cart);
      }

      cart[i].quantity = parseInt(input[i].value);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(true);
    });
  }
}

function getTotalCost() {
  let cart = localStorage.getItem("cart") || [];

  if (typeof cart === "string") {
    cart = JSON.parse(cart);
  }
  let totalCost = 0;
  let html = ``;
  let newQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalCost += cart[i].quantity * cart[i].price;
    newQuantity += cart[i].quantity;
    localStorage.setItem("quantity", JSON.stringify(newQuantity));


    html += `
      <div class="col-1 mt-5"><i class="fas fa-window-close" style="color:#007bff;"></i></div>
      <div class="col-2 mt-4"><img src="${
        cart[i].image
      }" alt="teddy" style="height:70px;width:50px;"></div>
      <div class="col-3 mt-5">${cart[i].name}</div>
      <div class="col-3 mt-5 text-center"><input class="quantity" type="number" value="${
        cart[i].quantity
      }" min="1" style="width:45px"></div>
      <div class="col-3 mt-5 text-center">$${cart[i].price / 100}.00</div>
      `;
  }
  document.querySelector(".createcart").innerHTML = html;
  document.querySelector(".price").textContent =
    "Total to pay  $" + totalCost / 100 + ".00";
}

getTotalCost();

function onLoadCart() {
  let quantity = localStorage.getItem("quantity");

  if (quantity) {
    document.querySelector(".cartspan span").textContent = quantity;
  }
}

onLoadCart();

finishshopping.addEventListener("click", function(event) {
  event.preventDefault();
  let productId = [];
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    address: address.value,
    postcode: postcode.value,
    city: city.value
  };

  
  
  let cart = localStorage.getItem("cart") || [];
  cart = JSON.parse(cart);

  for (let i = 0; i < cart.length; i++) {
    productId.push(cart[i].id);
  }

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ contact: contact, products: productId })
  })
    .then(response => response.json())
    .then(json => {
      localStorage.setItem("orderId", JSON.stringify(json));
      location.href = "confirmation.html";
    });
});

form.addEventListener("submit", function(event) {
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList("was-validated");
});
