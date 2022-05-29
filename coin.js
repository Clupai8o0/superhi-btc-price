const priceTag = document.getElementById("price");
const rateTag = document.getElementById("rate");

const URL = "https://api.coindesk.com/v1/bpi/currentprice.json";
let currency = "USD";

const checkPrice = async function () {
	const resp = await fetch(URL);
	const data = await resp.json();

	priceTag.textContent = data.bpi[currency].rate.slice(0, -3);
};

//* Looping over every nav element
const navLinks = document.querySelectorAll("nav a")
navLinks.forEach((element) => {
	element.addEventListener("click", function () {
		currency = this.getAttribute("data-currency");
    rateTag.textContent = `${currency} per BTC`
		checkPrice();

		navLinks.forEach((link) => link.classList.remove("selected"));
		this.classList.add("selected");
	});
});

window.onload = checkPrice();

//* checking price every 60 seconds
setInterval(() => {
  checkPrice();
}, 60000)
