import $ from './library/jquery.js';

$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
}).then((data)=>{
    console.log(data)
    $('.phone .module_content').children().each((i,el)=>{
        if(data[i]){
            let li = el.children[0].children;
            let pic = JSON.parse(data[i].screenshot);
            let price = data[i].price.split(',');
            
            el.children[0].href = `http://localhost/2105/mi.com/src/html/details.html?id=${data[i].id}` // 修改a标签herf指向
            li[0].src = pic[0].src; // 注入图片
            li[1].innerHTML = data[i].name  // 注入标题
            li[2].innerHTML = data[i].s_description // 注入描述
            li[3].innerHTML = `<em>${price[0]}元起</em> <i>${price[1]}元</i>` // 注入价格
        }
    });
}).catch((xhr)=>{
    console.log(xhr.state)
});

