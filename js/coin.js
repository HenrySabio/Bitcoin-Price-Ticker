// Defines API URL and default currency state
const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceTag = document.querySelector("h1")
let currency = "USD";

// Grabs current price from Coindesk API
const checlPrice = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            priceTag.innerHTML = data.bpi.USD.rate_float.toFixed(2)
        })

}

// Runs Function on load
checlPrice()

