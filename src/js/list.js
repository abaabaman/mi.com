import $ from './library/jquery.js';
import cookie from './library/cookie.js';
let getlist = cookie.get('key')
let getListObj = JSON.parse(`[${getlist}]`)

if(!getlist){
    $('.empty_list').removeClass('none')
}else{
    $('.list_container').removeClass('none')
    $('.settlement_list').removeClass('none')

    let giveKey = 'getlist=';
    JSON.parse(`[${getlist}]`).forEach((el)=>giveKey += el.id+',');
    console.log(giveKey.slice(0,-1));
    console.log(getListObj);
    $.ajax({
        type: "get",
        url: "../../interface/getList.php",
        data: giveKey.slice(0,-1),
        dataType: "json",
    }).then((data)=>{
        console.log(data);
        let innerUl = '';
        data.forEach((el,i)=>{
            console.log();
            let current = data.filter(elm => elm.id === JSON.parse(`[${getlist}]`)[i].id)[0]
            innerUl +=`
            <li class="warpper">
                <p class="check"><input type="checkbox" name="" id=""></p>
                <p class="screenshot"><img src="${JSON.parse(current.screenshot)[0].src}" alt=""></p>
                <p class="products">${current.name}</p>
                <p class="products_prices">${current.price.split(',').shift()}元</p>
                <p class="products_count"><a value="down,${i}">-</a><input type="text" id="" value="${getListObj[i].num}"><a value="up,${i}">+</a></p>
                <p class="products_subtotal">${current.price.split(',').shift()*getListObj[i].num}元</p>
                <p class="products_remove"><a href="">×</a></p>
            </li>`
        })
        // 商品注入购物车
        $('#list').html(function(i,elm){return elm+innerUl})
        // 商品数量增减
        $('.products_count a').on('click',(el)=>{
            let click = el.target.getAttribute('value').split(',');
            // console.log(el.target.parentNode.children[1].value);
            switch(click[0]){
                case 'up' : 
                    getListObj[click[1]].num += 1;
                    el.target.parentNode.children[1].value = +el.target.parentNode.children[1].value + 1;
                    break;
                case 'down' :
                    if(el.target.parentNode.children[1].value > 1){
                        el.target.parentNode.children[1].value -= 1;
                        getListObj[click[1]].num -= 1;
                    }
                    break;
            }
            el.target.parentNode.parentNode.children[5].innerHTML = el.target.parentNode.children[1].value * el.target.parentNode.parentNode.children[3].innerHTML.slice(0,-1) +'元';
            cookie.set('key', JSON.stringify(getListObj).slice(1,-1),1)
            let total = 0;
            $('.products_subtotal').each((i,el)=>{
                if(el.innerHTML!='小计'){
                    console.log(el.innerHTML);
                    total += parseFloat(el.innerHTML)
                }
            });
            $('#total').html(total)
        });
        
        
    }).catch((xhr)=>{
        console.log(xhr.readyState);
        console.log(xhr.status);
    });
}