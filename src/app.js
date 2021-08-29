import { getAvailableCurrencies, getGBPExchangeRate } from "./services/converterService.js";
import changeVisibility from "./utils/changeVisibility.js";
import errorHandling from "./utils/errorHandling.js";
import isPositiveNumber from "./utils/isPositiveNumber.js";
import populateCurrencyOptions from "./utils/populateCurrencyOptions.js";

//Getting DOM Elements
const currencySelector = document.querySelector('#currency-selector');
const ratePerHourElement = document.querySelector('input[name="rate"]'); //Can easily add id to the html just showing different selectors
const hoursWorkedElement = document.querySelector('input[name="hours"]');
const totalPayParagraph = document.getElementById('total-pay');
const conversionContainerElement = document.querySelector('#conversion-container');
const conversionResultElement = document.querySelector('#conversion-result');
const exchangeRateElement = document.querySelector('#exchange-rate');

//Event listeners
currencySelector.addEventListener('change', currencyChangeHandler);

//Will use input events to capture user actions not the best for performance but it looks cool 
ratePerHourElement.addEventListener('input', userInputHandler);
hoursWorkedElement.addEventListener('input', userInputHandler);

//Closure elements
let totalPay = 0; // will need it doing conversions
let currentExchangeRate = 0;
let totalConverted = 0;
let currencyCode = '';

//Init - need to load the currency options at loadtime
getAvailableCurrencies().then(data => {
    delete data.results.GBP; //Don't need to be able to convert from GBP to GBP 
    let allCurrencies = Object.values(data.results).sort((a, b) => a.currencyName.localeCompare(b.currencyName)); //results from the API weren't sorted
    populateCurrencyOptions(allCurrencies, currencySelector);
});


//Functions

//Event handler functions
function userInputHandler(e){
    errorHandling.clearStyling(e.target); // housekeeping, could be better if i was using a framework but for vanilla js should be fine
    if(!isPositiveNumber(e.target.value)){
        errorHandling.addStyling(e.target);
        totalPay = 0; // Don't like this being here, can change how calculate pay works to avoid it
        updatePay(0);
        updateConversion(0,currencyCode);
        return;
    }
    calculatePay();
    calculateConversion(totalPay,currentExchangeRate);
    updatePay(totalPay);
    updateConversion(totalConverted,currencyCode);
}

async function currencyChangeHandler(e){
    if(e.target.value === 'select'){
        changeVisibility.hide(conversionContainerElement);
        return;
    }
    currencyCode = e.target.value;
    let exRateObj = await getGBPExchangeRate(e.target.value); //Api returns an object with the exchange rate {GBP_XXX: 1.000000}
    currentExchangeRate = Object.values(exRateObj)[0]; //The rate should be the only value in the object

    calculateConversion(totalPay, currentExchangeRate);
    updateConversion(totalConverted, currencyCode);
    updateExchangeRate(currentExchangeRate, currencyCode);
    changeVisibility.show(conversionContainerElement);
}


function calculatePay(){
    if(!isPositiveNumber(hoursWorkedElement.value)) return;
    if(!isPositiveNumber(ratePerHourElement.value)) return;
    //Would be better if i inject the values instead of pulling them straight from the DOM
    totalPay = Number(hoursWorkedElement.value) * Number(ratePerHourElement.value);
}

function calculateConversion(pay, rate){
    totalConverted = pay * rate;
}

//DOM update functions should probably abstracten in a helper class and inject the relevant elements
function updateExchangeRate(rate, code){
    exchangeRateElement.textContent = `1 GBP ≈ ${rate} ${code}`
}

function updateConversion(amount, sign){
    conversionResultElement.textContent = `${amount.toFixed(2)} ${sign}`
}

function updatePay(pay){
    totalPayParagraph.textContent = `${pay.toFixed(2)} ₤`;
}