// Defines API URL and default currency state
const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceTag = document.querySelector("h1")
let currency = "USD";

// Grabs current price from Coindesk API
const checlPrice = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(2)
        })

}

// Runs Function on load
checlPrice()

// Loop over nav links + click event
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        currency = this.getAttribute("data-currency");
        checkPrice();

        // Removes "selected" class from all links
        navLinks.forEach(link => link.classList.remove("selected"))
        // Adds "selected" class to link that was just clicked
        this.classList.add("selected");
    })
})