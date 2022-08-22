// input user
let userInput = document.querySelector("#input-user");
// crypto div
let cryptoContainer = document.querySelector(".crypto-container");
// Digital currencies API
const URL_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false";
fetch(URL_API)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    showData(data);
    userInput.addEventListener("input",() =>{
        filterByUser(data);
    })
  });
//   function show data (json)
function showData(arr) {
  // loop
  for (i in arr) {
    // variable from arr API
    let cryptoNAme = arr[i].name;
    let imgIcon = arr[i].image;
    let symbol = arr[i].symbol;
    let price = arr[i].current_price;
    let volume = arr[i].total_volume.toLocaleString();
    let ath24 = arr[i].price_change_percentage_24h.toFixed(2);
    let marketCap = arr[i].market_cap.toLocaleString();
    //   append to the empty div variable from data API
    cryptoContainer.innerHTML += `
        <div class='list-container d-flex justify-content-evenly col-12 d-flex border-bottom my-2 p-2'>
        <img class="col-1" src="${imgIcon}" alt="icon ">
        <p class="mb-0 col-1">${cryptoNAme}</p>
        <p class=" col-2">${symbol}</p>
        <p class=" col-2">£${price}</p>
        <p class=" col-2">£${volume}</p>
        <p class=" col-2 "><span class="ath24">${ath24}</span>%</p>
        <p class=" col-2">£${marketCap}</p>
        </div>
        `;
  }
  let priceChange24 = document.querySelectorAll(".ath24");
  priceChange24.forEach(function (price) {
    if (price.innerHTML < 0) {
      price.parentElement.classList.add("text-danger");
    } else {
      price.parentElement.classList.add("text-success");
    }
  });
}
// function filter Array
function filterByUser(arr){
    let filterData = arr.filter(function (cryptoName) {
        cryptoContainer.innerHTML = "";
        return cryptoName.name.toLowerCase().startsWith(userInput.value.toLowerCase());
      });
      console.log(filterData);
      showData(filterData);
}