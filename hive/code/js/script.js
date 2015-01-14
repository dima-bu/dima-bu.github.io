

function ge(id) {
    return document.getElementById(id);
}

// Как только страничка загрузилась
window.onload = function () {
    // проверяем поддерживает ли браузер FormData
    if(!window.FormData) {

        /*
         * если не поддерживает, то выводим
         * то выводим предупреждение вместо формы
         */

        var div = ge('content');
        div.innerHTML = "Ваш браузер не поддерживает объект FormData";
        div.className = 'notSupport';
    }
}

function sendForm(form, output) {
    var data = new FormData(form),

    /*
     * Использовать кроссбраузерный способ создания
     * не имеет смысла, т.к. браузеры для, для которых
     * XMLHttpRequest (xhr) создаётся по-другому, не поддерживают FormData
     */

        xhr = new XMLHttpRequest(),

        progressBar = document.querySelector('progress'),
        goBtn = ge('go'),
        fileInp = ge('userfile'),
        nameInp = ge('name');
    if(nameInp.value == '' && fileInp.value == '') {
        ge('status').innerHTML = 'Заполните поля!';
        return false;
    } else if(nameInp.value == '') {
        ge('status').innerHTML = 'Введите имя!';
        return false
    } else if(fileInp.value == '') {
        ge('status').innerHTML = 'Выберите файл!';
        return false;
    }

    if(fileInp.files[0].size > 100000000) { // 1 мб
        ge('status').innerHTML = 'Максимум 100 мб!';
        return false;
    }

    ge('status').innerHTML = '';

    xhr.open('POST', form.action);

    xhr.onload = function (e) {
        output.innerHTML = e.currentTarget.responseText;
    }

    xhr.upload.onprogress = function (e) {
        progressBar.value = e.loaded / e.total * 100;
    }

    xhr.send(data);
    return false;
}


$(function(){
    var wrapper = $( ".g_file_wrapper" ),
        inp = wrapper.find( ".g_file" ),
        btn = wrapper.find( "button"),
        lbl = wrapper.find( ".g_file-text" );

    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выбрать" );
        }else
            btn.text( file_name );
            $('#go').removeAttr("disabled");
    }).change();

});


$( document ).ready(function() {

    document.createElement('header');
    document.createElement('nav');
    document.createElement('section');
    document.createElement('article');
    document.createElement('aside');
    document.createElement('footer');

    $('.js-popup-open').on('click', function(){
        var job = $(this).parents('.vacancy-item').find('h3').text();
        $('.popup').find('h3').text( job );
        $('.popup-wrapper').fadeIn('fast');
        $('.popup').find('#vacancy').attr('value', job);
    });


    $(document).on("click", ".js-popup-close", function () {
        $('.popup-wrapper').hide();
    });

    $('.popup-wrapper').click(function(event) {
        if ($(event.target).closest(".popup").length) return;
        $(this).hide();
        event.stopPropagation();
    });


    //$('#submit-form').click(function() {
    //
    //
    //    $.ajax({
    //        type: 'POST',
    //        url: '/url/to/action',
    //        data: fd,
    //        processData: false,
    //        contentType: false,
    //        dataType: "json",
    //        success: function(data) {
    //            console.log(data);
    //        },
    //        error: function(data) {
    //            console.log(data);
    //        }
    //    });
    //        var name = $('#name').val();
    //        var vacancy = $('#vacancy').val();
    //        var fd = new FormData();
    //        fd.append('name', name);
    //        fd.append('vacancy', vacancy);
    //        fd.append('img', $('#imgFile')[0].files[0]);
    //        console.log(name+vacancy+fd);
    //        // Отсылаем паметры
    //        $.ajax({
    //            type: "POST",
    //            url: "http://hivecompany.com/test/simple-form.php",
    //            data: {
    //                name: name,
    //                vacancy: vacancy,
    //                fd: fd
    //            },
    //            success: function(html) {
    //                $("#result").empty();
    //                $("#result").append();
    //            }
    //        });
    //
    //});
    //


    //
    //    $(document).ajaxSend(function(event, jqxhr, settings) {
    //        $(this).append("<p>Requesting: " + opt.url + "</p>");
    //    });
    //
    //
    //function SendPost() {
    //    //отправляю POST запрос и получаю ответ
    //    $$a({
    //        type:'post',//тип запроса: get,post либо head
    //        url:'/resume_recieve_form.php',//url адрес файла обработчика
    //        data:{},//параметры запроса
    //        response:'text',//тип возвращаемого ответа text либо xml
    //        success:function (data) {//возвращаемый результат от сервера
    //            $$('result',$$('result').innerHTML+'<br />'+data);
    //        }
    //    });
    //}




    //$('#email').on('keyup change',function() {
    //
    //    if($(this).val() != '') {
    //        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    //        if(pattern.test($(this).val())){
    //            $(this).css({'border' : '1px solid #80CBC4'});
    //            $('#submit-form').removeAttr("disabled");
    //        } else {
    //            $(this).css({'border' : '1px solid #EF9A9A'});
    //            //$('#valid').text('Не верно');
    //            $('#submit-form').attr("disabled", "disabled");
    //            $(this).addClass('checked');
    //        }
    //    } else {
    //        $(this).css({'border' : '1px solid #EF9A9A'});
    //        //$('#valid').text('Поле email не должно быть пустым');
    //        $('#submit-form').attr("disabled", "disabled");
    //        $(this).addClass('checked');
    //    }
    //
    //
    //});



});

