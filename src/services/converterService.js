const API_KEY = '9837c2100b87c5e5681c'; //No using a backend server so can't hide it in .env for example
const baseUrl = 'https://free.currconv.com/api/v7';

//Will do one the old way and one using async/await syntax 
//Should probably be catching the errors where the function is called, but since i'm not doing anything with them other than print them I can do it here

export const getAvailableCurrencies = () => {
    const url = `${baseUrl}/currencies?apiKey=${API_KEY}`;
    return fetch(url).then(res => res.json()).catch(err => console.error(err));
}

export const getGBPExchangeRate = async (targetCurrency) => {
    try{
        const url = `${baseUrl}/convert?q=GBP_${targetCurrency}&compact=ultra&apiKey=${API_KEY}`;
        let response = await fetch(url);
        return await response.json();
    } catch (err){
        console.error(err)
    }   
}