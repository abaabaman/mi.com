import $ from './library/jquery.js';

if(+location.search.slice(1)){
    $('#register').removeClass('none');
    $('#login_toggle a').eq(1).addClass('on');
    $('#login_toggle i').addClass('right');
    
}else{
    $('#login').removeClass('none');
    $('#login_toggle a').eq(0).addClass('on');
    $('#login_toggle i').removeClass('right');
}


let regAddr         // 选择国家
let regPrefix       // 电话前缀
let regPhone        // 电话号码
let regCode         // 密码

// 创建密码
$('#register #phone_number').on('blur',()=>{
    regPhone = $('#register .phone_number')
    if(regPhone.children('input').val()){
        regPhone.children('span').addClass('input')
        regPhone.children('input').removeClass('err')
    }else{
        regPhone.children('span').removeClass('input')
        regPhone.children('input').addClass('err')
    }
})

// 创建密码
$('#register #code').on('blur',()=>{
    regPhone = $('#register .code')
    if(regPhone.children('input').val()){
        regPhone.children('span').addClass('input')
        regPhone.children('input').removeClass('err')
    }else{
        regPhone.children('span').removeClass('input')
        regPhone.children('input').addClass('err')
    }
})

$('#register_btn').on('click',()=>{
    regAddr =  $('#register #addr').val()               // 选择国家
    regPrefix =  $('#register #prefix').val()           // 电话前缀
    regPhone =  $('#register #phone_number').val()      // 电话号码
    regCode =  $('#register #code').val()               // 密码

    console.log(`regAddr=${regAddr}&regPrefix=${regPrefix}&regPhone=${regPhone}&regCode=${regCode}`);
})