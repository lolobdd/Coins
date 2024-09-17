const form = document.getElementById('currency-form');
const result = document.getElementById('result');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');

// Cargar las monedas disponibles
async function loadCurrencies() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        optionTo.value = currency;
        optionTo.text = currency;
        
        fromCurrencySelect.appendChild(optionFrom);
        toCurrencySelect.appendChild(optionTo);
    });
}

// Manejar la conversión
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        result.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        result.innerText = 'Error en la conversión. Verifique la conexión o las monedas selecionadas.';
    }
});

// Inicialización
loadCurrencies();
