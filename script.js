const apiKey = 'API_KEY'; // Înlocuiește cu cheia ta de API
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const amountEl = document.getElementById('amount');
const fromCurrencyEl = document.getElementById('from-currency');
const toCurrencyEl = document.getElementById('to-currency');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convert');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const currencies = Object.keys(rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencyEl.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencyEl.appendChild(option2);
        });
    });

convertBtn.addEventListener('click', () => {
    const amount = amountEl.value;
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const conversionRate = rates[toCurrency] / rates[fromCurrency];
            const convertedAmount = amount * conversionRate;
            resultEl.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
});
