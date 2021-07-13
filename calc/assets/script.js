'use strict'

let koef;

fetch('https://api.cryptowat.ch/markets/huobi/btchusd/price?apikey=9HZJQFW30CBDQYXPDHIJ')
.then((data) => data.json())
.then(({ data }) => console.log(data));

document.addEventListener('DOMContentLoaded', () => {
    const payInput = document.getElementById('calc-pay');
    const getInput = document.getElementById('calc-get');

    payInput.addEventListener('input', (e) => {
        getInput.value = e.target.value;
    })

    getInput.addEventListener('input', (e) => {
        pauInput.value = e.target.value;
    })

})

