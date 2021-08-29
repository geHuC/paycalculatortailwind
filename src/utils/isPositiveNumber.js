export default function isPositiveNumber(input){
    if(input.trim() === '') return false; //Does two things - one checks if we have whitespace also empty strings in JS equate to 0 and give incorrect result in isNan;
    if(isNaN(input)) return false;
    if(Number(input) <0 ) return false; 

    return true; 
}
