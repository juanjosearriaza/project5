const image = document.getElementsByClassName("teddy1");
const name = document.querySelector("h2");
const code = document.getElementsByClassName("code");
const description = document.getElementsByClassName("description");
const price = document.getElementsByClassName("price");
const colortan = document.getElementsByClassName("btn-tan");
const colorchocolate = document.getElementsByClassName("btn-chocolate");
const colorwhite = document.getElementsByClassName("btn-light");
const colorblack = document.getElementsByClassName("btn-dark");

function getNames () {fetch('http://localhost:3000/api/teddies')
.then((res) => res.json())
.then((data) => {  

    let output = "Price: USD: "
    let output1 = "<strong> Description: </strong>"

    for (i = 0; i < data.length; i++) {

    image[0].src = data[0].imageUrl;
    name.textContent = data[0].name;
    code[0].textContent = data[0]._id;
    price[0].textContent = output + data[0].price;
    description[0].innerHTML = output1 + data[0].description;
    colortan[0].textContent = data[0].colors[0];
    colorchocolate[0].textContent = data[0].colors[1];
    colorwhite[0].textContent = data[0].colors[2];
    colorblack[0].textContent = data[0].colors[3];

    
    }
})

}

getNames();