'use strict'

const formatNumberString = (strNumber = '') => {
    if (strNumber === null) {
        return '';
    }

    const parts = strNumber.split('.');

    parts[0] = parts[0]
        .split('')
        .reverse()
        .join('')
        .replace(/\d{3}(?=.)/g, '$&,')
        .split('')
        .reverse()
        .join('');

    return parts.join('.');
};

const clearNumberString = (strNumber = '') => strNumber.replace(/[^0-9.]/g, '');

const createHandler = (input, resultCallback) => {
    let value = input.value || '';
    return (
        (event) => {
            const clearText = clearNumberString(event.target.value);
            if (/^(\d+\.?\d{0,8})?$/.test(clearText)) {
                value = clearText;
                resultCallback(Number(clearText))
                input.value = formatNumberString(clearText);
            } else {
                input.value = formatNumberString(value);
            }
        }
    )
};

document.addEventListener('DOMContentLoaded', () => {
    let price;
    const payInput = document.getElementById('calc-pay');
    const getInput = document.getElementById('calc-get');

    fetch('/api-calc')
    .then((res) => res.json())
    .then((data) => { 
        price = data.price;

        const initialValue = Number(clearNumberString(payInput.value));
        getInput.value = formatNumberString((initialValue / price).toFixed(8)).replace(/[\.0]*$/g, '');

        payInput.addEventListener('input', createHandler(payInput, (value) => {
            getInput.value = formatNumberString((value / price).toFixed(8)).replace(/[\.0]*$/g, '');
        }));
    
        getInput.addEventListener('input', createHandler(getInput, (value) => {
            payInput.value = formatNumberString((value * price).toFixed(8)).replace(/[\.0]*$/g, '');
        }));

        payInput.removeAttribute('readonly');
        getInput.removeAttribute('readonly');
    });
})

