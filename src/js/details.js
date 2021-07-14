import $ from './library/jquery.js';
import cookie from './library/cookie.js';

$.ajax({
    type: "get",
    url: "../../interface/getProducts.php",
    data: location.search.slice(1),
    dataType: "json",
}).then((data)=>{
    let state = JSON.parse(data.l_description)[0]   // 商品描述
    let price = data.price.split(',');              // 价格
    let productsSelect = '';                        // 型号
    let total = '';                                 // 小计
    let type = '';                                  // 小计第一行的型号
    let cont = 0;                                   // 小计的金额
    let details_img = '';                           // 缩略图
    let details_toggle = '';                        // 缩略图控制块
    let details_content = '';                       // 详情图


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
    
    type += JSON.parse(data.type)[0][Object.keys(JSON.parse(data.type)[0])[0]][0];
    if(JSON.parse(data.type)[1])type += ' '+JSON.parse(data.type)[1][Object.keys(JSON.parse(data.type)[1])[0]][0];
    cont += +price[0];
    total += `<p class="total_version"><span>${data.name} ${type}</span><span>${price[0]} 元<i>${price[0]} 元</i></span></p>`
    total += `<p class="total_price">总计：${cont}</p>`
    
    JSON.parse(data.screenshot).forEach((el,i) => {
        if(el.alt != 'small'){
            details_img += `<img src="${el.src}" alt="">`
            details_toggle += `<span id="${i}"></span>`
        };
    });

    JSON.parse(data.description).forEach(el => {
        details_content += `<img src="${el.src}">`;
    });

    $('#details_top em').html(data.name);                                                       // 注入顶部商品标题
    $('#details_select h3').html(data.name);                                                    // 注入主体商品标题
    $('#details_select p.state').html(`<span>${state.discount}</span>${state.description}`);    // 注入商品描述
    $('.products_prices ').html(`<em>${price[0]} 元</em><i>${price[1]} 元</i>`);                //注入价格
    $('div#products_select').html(productsSelect);                                              // 注入型号
    $('#total').html(total);                                                                    // 注入价格小计
    $('.details_img').html(details_img);                                                        // 注入缩略图
    $('.details_toggle').html(details_toggle)                                                   // 注入缩略图控制块
    $('.details_content').html(details_content)                                                 // 注入详情页
    $('#add_list').on('click',()=>{                                                             // 注入购物车
        let key = '';
        if(cookie.get('key')){
            key += cookie.get('key');
            let item =  JSON.parse(`[${key}]`);
            
            if(item.some((el,i)=>item[i].id = data.id)){
                +item[i].num + 1
            }else{
                key += ','+(JSON.stringify({"id":data.id,"num":1}))
            }
        }else{
            key = (JSON.stringify({"id":data.id,"num":1}));
        }
        cookie.set('key', key,1);
        console.log(key);
        // location.href = `../html/tolist.html?name=${data.name}&id=${data.id}`;
    })

}).catch((xhr)=>{
    console.log(xhr.state);
});