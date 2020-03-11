const images = document.getElementsByClassName("teddycarousel")


function getNames() {

  fetch('http://localhost:3000/api/teddies')

    .then((res) => res.json())
    .then((data) => {


      let html = ``;


      for (i = 0; i < data.length; i++) {

        images[i].src = data[i].imageUrl;

        let queryString = '?id=' + data[i]._id;

        html += `<div class="col-12 col-lg-4">
  <div class="card mb-4 mb-lg-4">
      <img src="${data[i].imageUrl}" alt="teddy" class="card-img-top" style="height:250px">
      <div class="card-body text-center">
          <h5 class="card-title teddy">${data[i].name}</h5>
          <h6 class="card-title price">Price: $ ${data[i].price}</h6>
          <a class="btn btn-primary" href="detail.html${queryString}">See Article</a>
      </div>
  </div>
  </div>`;

      }

      document.querySelector(".createteddys").innerHTML = html;


    })
}

getNames();

function onLoadCart() {
  let quantity = localStorage.getItem("quantity");

  if (quantity) {
    document.querySelector(".cartspan span").textContent = quantity;
  }
}

onLoadCart();
