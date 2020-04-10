const image = document.getElementsByClassName("teddy1");
const name = document.querySelector("h2");
const code = document.getElementsByClassName("code");
const description = document.getElementsByClassName("description");
const price = document.getElementsByClassName("price");
const colortan = document.getElementsByClassName("btn-tan");
const colorchocolate = document.getElementsByClassName("btn-chocolate");
const colorwhite = document.getElementsByClassName("btn-light");
const colorblack = document.getElementsByClassName("btn-dark");
const addToCart = document.querySelector(".cart");
const input = document.querySelector("input");
let id = location.search;

function ShoppingCart(cart) {
  this.cart = cart;
}

ShoppingCart.prototype.locateFind = function (id, cart) {
  this.cart = localStorage.getItem("cart") || [];

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

ShoppingCart.prototype.createCart = function (find, input, data, id) {
  if (find !== undefined) {
    teddy.cart[find].quantity += parseInt(input.value);
  } else {
    teddy.cart.push({
      quantity: parseInt(input.value),
      name: data.name,
      price: data.price,
      id: id,
      image: data.imageUrl,
    });
  }
};

id = id.replace("?id=", "");

let URL = "http://localhost:3000/api/teddies/" + id;

function getNames() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let output = "Price: $ ";
      let output1 = "<strong> Description: </strong>";

      image[0].src = data.imageUrl;
      name.textContent = data.name;
      code[0].textContent = data._id;
      price[0].textContent = output + data.price / 100 + ".00";
      description[0].innerHTML = output1 + data.description;
      colortan[0].textContent = data.colors[0];
      colorchocolate[0].textContent = data.colors[1];
      colorwhite[0].textContent = data.colors[2];
      colorblack[0].textContent = data.colors[3];
    });
}

getNames();

addToCart.addEventListener("click", () => {
  addItems();
});

function onLoadCart() {
  let quantity = localStorage.getItem("quantity");

  if (quantity) {
    document.querySelector(".cartspan span").textContent = quantity;
  }
}

onLoadCart();

function addItems() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let cart = localStorage.getItem("cart") || [];
      let quantity = localStorage.getItem("quantity");
      quantity = parseInt(quantity);
      teddy = new ShoppingCart(cart);

      let find = teddy.locateFind(id, cart);
      

      teddy.locateFind(id, cart);
      teddy.createCart(find, input, data, id);

      $(".toast").toast("show");

      document.querySelector(".cartspan span").textContent = parseInt(
        input.value
      );

      localStorage.setItem("cart", JSON.stringify(teddy.cart));
      if (quantity) {
        localStorage.setItem("quantity", parseInt(input.value) + quantity);
        document.querySelector(".cartspan span").textContent =
          parseInt(input.value) + quantity;
      } else {
        localStorage.setItem("quantity", parseInt(input.value));
        document.querySelector(".cartspan span").textContent = parseInt(
          input.value
        );
      }
    });
}
