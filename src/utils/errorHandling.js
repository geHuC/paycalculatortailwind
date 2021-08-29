function clearStyling(target){
    target.classList.remove('bg-red-100');
}
function addStyling(target){
    target.classList.add('bg-red-100');
}

export default{
    clearStyling,
    addStyling
}