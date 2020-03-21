// Defines API URL and default currency state
const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceTag = document.querySelector("h1");
const paragraphTag = document.querySelector("p");
let currency = "USD";

// Grabs current price from Coindesk API
const checkPrice = () => {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const originalContent = data.bpi[currency].rate_float.toFixed(2);
        let num = 0

        const addInterval = setInterval( () => {
            num = num + 1
            priceTag.innerHTML = originalContent.substring(0, num)

            if (originalContent = priceTag.innerHTML) {
                clearInterval(addInterval)
            }
        }, 100 )
    
        })

}

// Runs Function on load
checkPrice()

// Loop over nav links + click event
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        currency = this.getAttribute("data-currency");
        checkPrice();

        // Removes "selected" class from all links
        navLinks.forEach(link => link.classList.remove("selected"));
        // Adds "selected" class to link that was just clicked
        this.classList.add("selected");

        // Update p tag to currently selected currency
        paragraphTag.innerHTML = `${currency} per BTC`;
    })
})

// Updates price every 60 seconds
setInterval(function () {
    checkPrice();
}, 60000)