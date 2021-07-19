import $ from './library/jquery.js';

if(+location.search.slice(1)){      // 注册
    $('#register').removeClass('none');
    $('#login_toggle a').eq(1).addClass('on');
    $('#login_toggle i').addClass('right');
    $('title').html('注册');

    
}else{      // 登录
    $('#login').removeClass('none');
    $('#login_toggle a').eq(0).addClass('on');
    $('#login_toggle i').removeClass('right');
}

let regAddrVal                                  // 国家的值
let regPrefixVal                                // 电话前缀的值
let regPhoneVal                                 // 电话号码的值
let regCodeVal                                  // 密码的值

let regAddr = $('#register .Addr')              // 选择国家

let regPrefix = $('#register .Prefix')          // 电话前缀

let regPhone = $('#register .phone_number')     // 电话号码
let phoneType = /^(?:(?:\+|00)86)?1\d{10}$/     // 号码格式检测
let phoneTypeErr = $('#phoneTypeErr')           // 号码格式错误
let phoneNone = $('#phoneNone')                 // 号码没填

let regCode                                     // 密码
let codeNone = $('#codeNone')                   // 密码没填

// 手机号
$('#register #phone_number').on('blur',()=>{

    if(regPhone.children('input').val()){
        regPhone.children('span').addClass('input')
        regPhone.children('input').removeClass('err')
        phoneNone.addClass('none');
    }else{
        regPhone.children('span').removeClass('input')
        regPhone.children('input').addClass('err')
        phoneNone.removeClass('none');
    }
})
$('#register #phone_number').on('change',()=>{
    phoneTypeErr.addClass('none');
    regPhone.children('input').removeClass('err');
})

// 密码
$('#register #code').on('blur',()=>{
    regCode = $('#register .code')
    if(regCode.children('input').val()){
        regCode.children('span').addClass('input')
        regCode.children('input').removeClass('err')
        codeNone.addClass('none');
    }else{
        regCode.children('span').removeClass('input')
        regCode.children('input').addClass('err')
        codeNone.removeClass('none');
    }
})

// 提交
$('#register_btn').on('click',()=>{

    regAddrVal =  $('#register #addr').val()               // 选择国家的值
    regPrefixVal =  $('#register #prefix').val()           // 电话前缀的值
    regPhoneVal =  $('#register #phone_number').val()      // 电话号码的值
    regCodeVal =  $('#register #code').val()               // 密码的值

    if(!regPhoneVal.match(phoneType)){
        console.log('1了1了');
        regPhone.children('input').addClass('err')
        phoneTypeErr.removeClass('none');
        return
    }

    $.ajax({
        type: "get",
        url: "../../interface/addUser.php",
        data: `regAddr=${regAddrVal}&regPrefix=${regPrefixVal}&regPhone=${regPhoneVal}&regCode=${regCodeVal}`,
    }).then((data)=>{
        console.log(data);
        if(data == 'repeat'){
            let btn = confirm('你已注册过，是否直接登录');
            if(btn){
                location.href = '../html/index.html';
            }else{
                location.reload();
            }
        }
    }).catch((err)=>{
        console.log(err.status);
    });
})