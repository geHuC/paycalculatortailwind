export default function populateCurrencyOptions(currencyOptions, currencySelector){
    //looping through all the values to populate the options menu
    currencyOptions.forEach(currency =>{
        let {currencyName, id} = currency;
        currencySelector.appendChild( new Option(currencyName, id));
    });
}