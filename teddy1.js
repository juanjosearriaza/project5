const image = document.getElementsByClassName("teddy1");
const name = document.querySelector("h2");
const code = document.getElementsByClassName("code");
const description = document.getElementsByClassName("description");
const price = document.getElementsByClassName("price");
const colortan = document.getElementsByClassName("btn-tan");
const colorchocolate = document.getElementsByClassName("btn-chocolate");
const colorwhite = document.getElementsByClassName("btn-light");
const colorblack = document.getElementsByClassName("btn-dark");

let id = location.search

id = id.replace("?id=","");


let URL = 'http://localhost:3000/api/teddies/'+ id



function getNames () {fetch(URL)
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