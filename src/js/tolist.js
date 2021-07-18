import $ from './library/jquery.js';


let back = location.search.slice(1).split('&');
let data = [];
back.forEach(el=>{
    data.push(el.split('='))
})

$('.submit_txt em').html(decodeURI(data[0][1]));
$('#back').on('click',()=>{
    location.href = `../html/details.html?id=${data[1][1]}`;
})

$('img.logo').on('click',()=>{
    location.href = '../html/'
})