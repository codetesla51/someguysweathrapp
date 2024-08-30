//js code
let menu = document.querySelector('#menu');//menu id
let navbar = document.querySelector('.navbar');//nav id

menu.addEventListener('click',() =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('nav-toggle');
});
//end js