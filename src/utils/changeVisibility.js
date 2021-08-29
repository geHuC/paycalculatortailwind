function hide(target){
    target.classList.add('invisible'); //That is the class Tailwind uses to hide an element but keep its size in the DOM
}
function show(target){
    target.classList.remove('invisible');
}
export default {
    hide,
    show
}