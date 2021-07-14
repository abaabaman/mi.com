import $ from './library/jquery.js';

$.ajax({
    type: "get",
    url: "http://localhost/2105/mi.com/interface/getProducts.php",
    data: location.search.slice(1),
    dataType: "json",
}).then((data)=>{
    let price = data.price.split(',');      // 价格
    let productsSelect = '';                // 型号
    JSON.parse(data.type).forEach(el => {
        productsSelect += `<section class="products_version">`
        productsSelect +=   `<div class="item_title"><h4>${Object.keys(el)}</h4></div>`
        productsSelect +=   `<div class="item_select">`
        el[Object.keys(el)].forEach(elm => {
            productsSelect += `<a href="javascript:;" class="item_one">${elm}</a>`
        });
        productsSelect +=   `</div>`
        productsSelect += `</section>`
    });
    let cont = 0;
    cont += price[0]

    // console.log(JSON.parse(data.type))
    $('#details_top em').html(data.name);      // 注入顶部商品标题
    $('#details_select h3').html(data.name);   // 注入主体商品标题
    $('#details_select p.state').html(`<span>${JSON.parse(data.l_description)[0].discount}</span>${JSON.parse(data.l_description)[0].description}`);    // 注入商品描述
    $('.products_prices ').html(`<em>${price[0]} 元</em><i>${price[1]} 元</i>`);    // 注入价格
    $('div#products_select').html(productsSelect);  //注入型号


}).catch((xhr)=>{
    console.log(xhr.state);
});