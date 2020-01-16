let width = document.body.clientWidth
let base64url;
$('#logchoice').css({
    display: 'none'
})
$('#regchoice').css({
    display: 'none'
})

$('#localsearchl').val(window.location.pathname)
$('#topp').click(function () {
    $('html,body').animate({
        scrollTop: '0px'
    }, 300);
});
$('#localhinp').val(window.location.pathname)

function dataURLtoFile(dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    })
}

$('.bflog').click(function () {
    if ($('#loggedname').text() == "") {
        $('#login').click()
    } else {
        window.location.href = '/write'
    }
})



$.ajax({
    url: "/getname",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        $('#loggedname').text(data.name)
        let usname = document.getElementById('loggedname');
        if (usname.innerHTML != '') {
            $('#login').hide();
            $('#loggedna').css({
                display: 'inline-block',
                lineHeight: '20px',
                fontSize: '25px',
                fontWeight: '400',
                fontFamily: 'Roboto',
                color: 'black',
                marginLeft: '10px',
                marginTop: '10px',
            })
            $('#headim').css({
                display: 'inline-block'
            })
        }
        if (document.getElementById('loggedna').style.display != "") {
            $.ajax({
                url: "/headimgbe",
                dataType: "json",
                type: "GET",
                data: {
                    'headimg': base64url
                },
                success: function (data) {
                    if (data.headimg != null) {
                        var imgFile1 = dataURLtoFile(data.headimg);
                        src = window.URL.createObjectURL(imgFile1);
                        document.getElementById('imageaf').src = src;
                        $('#imageaf').css({
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(136, 136, 136)',
                            verticalAlign: 'top',
                            display: 'inline-block'
                        })
                    }

                },
                error: function () {},
            });

        }
    },
    error: function () {},
});

let logele = document.getElementById('logpage');
$('#logpage').css({
    opacity: '0',
    position: 'fixed',
    zIndex: '3',
    width: '0px',
    border: '5px solid rgb(3, 19, 53)'
})
$('#login').on('click', () => {
    if (logele.style.width == '0px') {
        $('#username>p').show()
        $('#username>input').show()
        $('#password>p').show()
        $('#password>input').show()
        $('#con-password>p').show()
        $('#con-password>input').show()
        $('#logpage').animate({
            top: '60px',
            left: '5%',
            opacity: '1',
            width: '80%',
            maxWidth: '500px',
            height: '80%',
            maxHeight: '350px',
            backgroundColor: 'rgb(253, 253, 253)'
        })
        $('#gray').animate({
            opacity: '0.5'
        })
        $('#logchoice').css({
            display: 'block'
        })
        $('#regchoice').css({
            display: 'block'
        })
        $('#gray').css({
            zIndex: '2'
        })
    }
    if (logele.style.width == '400px') {
        $('#logpage').animate({
            top: '0px',
            left: '0px',
            opacity: '0',
            width: '0px',
            height: '0px',
            backgroundColor: 'rgb(0, 0, 0)'
        })
    }
    $('#logcontain').show();
    $('#regcontainer').hide();
})
$('#closel').on('click', () => {
    $('#logpage').animate({
        top: '0px',
        left: width,
        opacity: '0',
        width: '0px',
        height: '0px',
        backgroundColor: 'rgb(0, 0, 0)'
    })
    $('#gray').animate({
        opacity: '0'
    })
    $('#logchoice').css({
        display: 'none'
    })
    $('#regchoice').css({
        display: 'none'
    })
    $('#gray').css({
        zIndex: '-1'
    })
})
$('#closer').on('click', () => {
    $('#logpage').animate({
        top: '0px',
        left: width,
        opacity: '0',
        width: '0px',
        height: '0px',
        backgroundColor: 'rgb(0, 0, 0)'
    })
    $('#gray').animate({
        opacity: '0'
    })
    $('#gray').css({
        zIndex: '-1'
    })
})

$('#register1').on('click', () => {
    $('#regbutton').show()
    $('#regbutton>p').show()
    $('#register2').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#login2').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#register1').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#login1').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#regcontainer').show();
    $('#logcontain').hide();
})
$('#login1').on('click', () => {
    $('#login1').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#register1').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#logcontain').show();
    $('#regcontainer').hide();
})
$('#register2').on('click', () => {
    $('#register2').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#login2').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#regcontainer').show();
    $('#logcontain').hide();
})
$('#login2').on('click', () => {
    $('#login1').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#register1').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#register2').animate({
        backgroundColor: 'rgb(8, 55, 73)',
        color: 'rgb(255, 255, 255)'
    }, 200)
    $('#login2').animate({
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)'
    }, 200)
    $('#logcontain').show();
    $('#regcontainer').hide();
})
$('#logbutton').on('mouseenter', () => {
    $('#logbutton').animate({
        backgroundColor: 'rgb(228, 120, 120)'
    })
})
$('#logbutton').on('mouseleave', () => {
    $('#logbutton').animate({
        backgroundColor: 'rgb(219, 81, 81)'
    })
})
$('#regbutton').on('mouseenter', () => {
    $('#regbutton').animate({
        backgroundColor: 'rgb(228, 120, 120)'
    })
})
$('#regbutton').on('mouseleave', () => {
    $('#regbutton').animate({
        backgroundColor: 'rgb(219, 81, 81)'
    })
})

$('#regbutton').on('click', () => {
    $.ajax({
        url: "/nameisused",
        dataType: "json",
        type: "POST",
        data: {
            'username': document.getElementById('nameinput').value
        },
        success: function (data) {
            if (document.getElementById('passwordinput').value == document.getElementById('conpasswordinput').value & data.nameisused == 0) {
                $("#formr").submit();
            }
            if (document.getElementById('passwordinput').value != document.getElementById('conpasswordinput').value) {
                $('#notsp').css({
                    display: 'block'
                })
            }
            if (document.getElementById('passwordinput').value == document.getElementById('conpasswordinput').value & data.nameisused == 1) {
                $('#namealr').css({
                    display: 'block'
                })
                $('#notsp').css({
                    display: 'none'
                })
            }
        },
        error: function () {},
    });
})
document.getElementById('logbutton').onclick = function () {
    let logtruenum = 0;
    let name;
    let password;
    name = document.getElementById("poname").value;
    password = document.getElementById("popassword").value;
    $.ajax({
        url: "/check",
        dataType: "json",
        type: "POST",
        data: {
            'username': name,
            'password': password
        },
        success: function (data) {
            logtruenum = data.type;
            if (logtruenum == 0) {
                $('#aler').css({
                    display: 'block'
                })
            }
            if (logtruenum == 1) {
                $("#forml").submit();
            }
        },
        error: function () {},
    });
}

document.getElementById('searchbut').onclick = function () {
    let value = $('#searchinp').val()
    $.ajax({
        url: "/hasresult",
        dataType: "json",
        type: "POST",
        data: {
            'value': value
        },
        success: function (data) {
            if (data.state == 1) {
                document.getElementById('searchbut').setAttribute('type', 'submit')
                $('#searchbut').click()
            } else {
                $('#showsearch').click()
            }
        },
        error: function () {},
    });
}



$.ajax({
    url: "/getlogs",
    dataType: "json",
    type: "POST",
    data: {
        'page': document.title.slice(8)
    },
    success: function (data) {
        document.getElementById('content').innerHTML = data.content;
    },
    error: function () {},
});


$.ajax({
    url: "/logspagenumber",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        let strp = '';
        for (let i = 1; i <= data.length; i++) {
            if (i == 1) {
                if (document.title.slice(8) != 1) {
                    strp += '<li class="page-item">\
                        <a class="page-link" href="/logspage' + (parseInt(document.title.slice(8)) - 1) + '">Previous</a></li>'
                } else {
                    strp += '<li class="page-item disabled">\
                        <a class="page-link" href="/logspage1">Previous</a></li>'
                }
            }
            strp += '<li class="page-item"><a class="page-link" href="/logspage' + i + '">' + i + '</a></li>'
            if (i == data.length) {
                if (document.title.slice(8) != data.length) {
                    strp += '<li class="page-item">\
                        <a class="page-link" href="/logspage' + (parseInt(document.title.slice(8)) + 1) + '">Next</a></li>'
                } else {
                    strp += '<li class="page-item disabled">\
                        <a class="page-link" href="/logspage' + data.length + '">Next</a></li>'
                }
            }
        }
        $('.pagination').html(strp)
    },
    error: function () {},
});