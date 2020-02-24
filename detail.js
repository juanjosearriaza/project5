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



let id = location.search

id = id.replace("?id=", "");


let URL = 'http://localhost:3000/api/teddies/' + id



function getNames() {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {

            let output = "Price: USD: "
            let output1 = "<strong> Description: </strong>"



            image[0].src = data.imageUrl;
            name.textContent = data.name;
            code[0].textContent = data._id;
            price[0].textContent = output + data.price;
            description[0].innerHTML = output1 + data.description;
            colortan[0].textContent = data.colors[0];
            colorchocolate[0].textContent = data.colors[1];
            colorwhite[0].textContent = data.colors[2];
            colorblack[0].textContent = data.colors[3];



        })

}

getNames();

addToCart.addEventListener("click", () => {
    addItems();
})



function onLoadCart() {
    let productNumbers = localStorage.getItem("productNumbers");

    if (productNumbers) {

        document.querySelector(".cartspan span").textContent = productNumbers
    }
}


function addItems() {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            let cart = localStorage.getItem("cart") || []
            let productNumbers = localStorage.getItem("productNumbers")
            productNumbers = parseInt(productNumbers)



            if (typeof cart === "string") {
                cart = JSON.parse(cart);
            }

            //TO DO 
            //Find out if the teddy bear is there and if it´s there increase the quantity
            document.querySelector(".cartspan span").textContent = parseInt(input.value)




            if (cart.id) {


                cart[id].quantity = cart[id].quantity + parseInt(input.value)
                cart[id].quantity = parseInt(input.value)
            } else {


                cart.push({
                    quantity: parseInt(input.value),
                    name: data.name,
                    price: data.price,
                    id: id

                })
                localStorage.setItem("cart", JSON.stringify(cart))
                
            }
            if (productNumbers) {
                localStorage.setItem("productNumbers", parseInt(input.value) + productNumbers)
                document.querySelector(".cartspan span").textContent = parseInt(input.value) + productNumbers
            } else {
                localStorage.setItem("productNumbers", parseInt(input.value))
                document.querySelector(".cartspan span").textContent = parseInt(input.value)
            }



        })
}



onLoadCart();

