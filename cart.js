let finishshopping = document.getElementById("finish");
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let address = document.getElementById("address");
let postCode = document.getElementById("postcode");
let city = document.getElementById("city");
let erase = document.getElementsByClassName("fa-window-close");

for (let i = 0; i < erase.length; i++) {
  erase[i].addEventListener("click", function() {
    console.log("hola");
  });
}

function getTotalCost() {
  let cart = localStorage.getItem("cart") || [];
  cart = JSON.parse(cart);
  let totalCost = 0;
  let html = ``;

  for (let i = 0; i < cart.length; i++) {
    totalCost += cart[i].quantity * cart[i].price;

    html += `
      <div class="col-1 mt-5"><i class="fas fa-window-close" style="color:#007bff;"></i></div>
      <div class="col-2 mt-4"><img src="${
        cart[i].image
      }" alt="teddy" style="height:70px;width:50px;"></div>
      <div class="col-3 mt-5">${cart[i].name}</div>
      <div class="col-3 mt-5 text-center"><input type="number" value="${
        cart[i].quantity
      }" min="1" style="width:45px"></div>
      <div class="col-3 mt-5 text-center">$${cart[i].price / 100}.00</div>
      `;
  }
  document.querySelector(".createcart").innerHTML = html;
  document.querySelector(".price").textContent =
    "Total to pay  $" + totalCost / 100 + ".00";

  console.log(cart);
  console.log(totalCost);
}

getTotalCost();

function onLoadCart() {
  let quantity = localStorage.getItem("quantity");

  if (quantity) {
    document.querySelector(".cartspan span").textContent = quantity;
  }
}

onLoadCart();

finishshopping.addEventListener("click", function() {
  let productId = []
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
  
  for (let i = 0; i < cart.length; i++ ) {
    
    productId.push(cart[i].id)
  }


  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact: contact, products: productId})
  })
    .then(response => response.json())
    .then(json => console.log(json));
});
