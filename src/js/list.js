import $ from './library/jquery.js';
import cookie from './library/cookie.js';
let getlist = cookie.get('key')

if(!getlist){
    $('.empty_list').removeClass('none')
}else{
    $('.list_container').removeClass('none')
    $('.settlement_list').removeClass('none')

    let giveKey = 'getlist=';
    JSON.parse(`[${getlist}]`).forEach((el)=>giveKey += el.id+',');
    console.log(giveKey.slice(0,-1));
    $.ajax({
        type: "get",
        url: "../../interface/getList.php",
        data: giveKey.slice(0,-1),
        dataType: "json",
    }).then((data)=>{
        console.log(data);
        $('#list').html(1)


    }).catch((xhr)=>{
        console.log(xhr.readyState);
        console.log(xhr.status);
    });
}