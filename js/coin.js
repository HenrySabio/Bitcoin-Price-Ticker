// Defines API URL and default currency state
const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const priceTag = document.querySelector('h1');
const paragraphTag = document.querySelector('p');
let input = document.getElementById('convert-value');
let convertedValue = document.getElementById('converted-value');
let currentPrice = 0;
let currency = 'USD';

// Grabs current price from Coindesk API
const checkPrice = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const bitcoinPrice = data.bpi[currency].rate_float.toFixed(2);
            let newContent = '';
            let num = 0
            const randChar = 'abcdefghijklmnopqrstuvwxyz._$@!¢%&®¥†∆øµπ?'.split('')

            const addInterval = setInterval(() => {
                num = num + 1
                newContent = bitcoinPrice.substring(0, num)

                if (bitcoinPrice == priceTag.innerHTML) {
                    clearInterval(addInterval)
                    clearInterval(randomInterval)
                }
            }, 100)

            const randomInterval = setInterval(() => {
                priceTag.innerHTML = newContent
                currentPrice = parseInt(newContent);

                for (let i = newContent.length; i < bitcoinPrice.length; i++) {
                    priceTag.innerHTML = priceTag.innerHTML + randChar[Math.floor(Math.random() * randChar.length)]
                }
            }, 50)

        })
}

// Runs Function on load
checkPrice()

// Loop over nav links + click event
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        currency = this.getAttribute('data-currency');
        checkPrice();


        // Removes 'selected' class from all links
        navLinks.forEach(link => link.classList.remove('selected'));
        // Adds 'selected' class to link that was just clicked
        this.classList.add('selected');

        // Update p tag to currently selected currency
        paragraphTag.innerHTML = `${currency} per BTC`;
        input.value = '';
        convertedValue.value = '';
    })
})

// Updates price every 60 seconds
setInterval(function () {
    checkPrice();
}, 60000)

input.addEventListener("input", function () {
    this.value = this.value.replace(/[e\+\-]/gi, "");
});

input.addEventListener('keydown', function (keypress) {
    const invalidChars = ['-', '+', 'e'];
    if (invalidChars.includes(keypress.key)) {
        keypress.preventDefault();
    } else {
        input.addEventListener('keyup', function () {
            let inputToConvert = parseInt(input.value);
            convertedValue.value = (inputToConvert / currentPrice).toFixed(8);
            console.log(`${convertedValue.value} bitcoins`);
        })
    }
});