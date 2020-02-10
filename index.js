const images = document.getElementsByClassName("teddycarousel")


const URL = "http://127.0.0.1:5500/index.html" + "?name=Norbert" + "&name=Arnold" + "&name=LennyandCarl" + "&name=Gustav" + "name=Garfunkel"

const a = window.document.createElement("a")

a.href = URL
let params = new URLSearchParams(a.search)
console.log(params);





function getNames() {

  fetch('http://localhost:3000/api/teddies')

    .then((res) => res.json())
    .then((data) => {  

      
      let html = ``;
      
      
      for (i = 0; i < data.length; i++) {
   
        images[i].src = data[i].imageUrl;


        html += `<div class="col-12 col-lg-4">
  <div class="card mb-4 mb-lg-0">
      <img src="${data[i].imageUrl}" alt="teddy" class="card-img-top">
      <div class="card-body text-center">
          <h5 class="card-title teddy">${data[i].name}</h5>
          <h6 class="card-title price">Price: $ ${data[i].price}</h6>
          <a class="btn btn-primary" href="teddy1.html">See Article</a>
      </div>
  </div>
  </div>`;
  
        }

      document.querySelector(".createteddys").innerHTML = html;
      
      
    })
}

getNames();