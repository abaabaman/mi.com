import $ from './library/jquery.js';

$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
}).then((data)=>{
    console.log(data)
    console.log($('.phone .module_content').children().each((i,el)=>{
        // if(data[i]){
        // }
        let li = el.children[0].children;
        let pic = JSON.parse(data[i].screenshot);
        console.log(pic[0].src);
        console.log(li[0].src);
        li[0].src = pic[0].src;
    }));
}).catch((xhr)=>{
    console.log(xhr.state)
});

