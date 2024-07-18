const apiKey = 'API KEY'; // API Key from Open Exchange Rates
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const amountEl = document.getElementById('amount');
const fromCurrencyEl = document.getElementById('from-currency');
const toCurrencyEl = document.getElementById('to-currency');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convert');

const fromCurrencyFilterEl = document.getElementById('from-currency-filter');
const toCurrencyFilterEl = document.getElementById('to-currency-filter');

let rates;
let currencies;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        rates = data.rates;
        currencies = Object.keys(rates);
        populateSelect(fromCurrencyEl, currencies);
        populateSelect(toCurrencyEl, currencies);
    });

function populateSelect(selectElement, currencyList) {
    selectElement.innerHTML = '';
    currencyList.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        selectElement.appendChild(option);
    });
}

function filterCurrencies(event, selectElement, currencyList) {
    const searchTerm = event.target.value.toUpperCase();
    const filteredCurrencies = currencyList.filter(currency => currency.includes(searchTerm));
    populateSelect(selectElement, filteredCurrencies);
}

fromCurrencyFilterEl.addEventListener('input', (event) => {
    filterCurrencies(event, fromCurrencyEl, currencies);
});

toCurrencyFilterEl.addEventListener('input', (event) => {
    filterCurrencies(event, toCurrencyEl, currencies);
});

convertBtn.addEventListener('click', () => {
    const amount = amountEl.value;
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;

    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = amount * conversionRate;
    resultEl.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
});

