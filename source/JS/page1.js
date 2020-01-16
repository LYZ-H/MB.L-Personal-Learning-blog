var imgCount = 5;
var index = 1;
var intervalId;
var buttonSpan = $('.pointer')[0].children;
let islogtrue = false;



let wid = screen.width
if (wid > 800) {
    $('.containe').css({
        display: 'block'
    })
}

autoNextPage();

function autoNextPage() {
    intervalId = setInterval(function () {
        nextPage(!true);
    }, 3000);
}

if (wid >= 1025) {
    $('#newslo').css({
        display: 'block'
    })
} else {
    $('#afnews').html($('#newslo').html())
    $('#afnews').css({
        display: 'block'
    })
}


$('.bflog').click(function () {
    if ($('#loggedname').text() == "<%= username %> ") {
        $('#login').click()
    } else {
        window.location.href = '/write'
    }
})

$('#localhinp').val(window.location.pathname)
$('#localhinpr').val(window.location.pathname)
$('#localsearchl').val(window.location.pathname)

$('.containe').mouseover(function () {
    clearInterval(intervalId);
});
$('.containe').mouseout(function () {
    autoNextPage();
});
$('.left').click(function () {
    nextPage(true);
});
$('.right').click(function () {
    nextPage(false);
});
$('#logchoice').css({
    display: 'none'
})
$('#regchoice').css({
    display: 'none'
})
$('#logpage').hide()
clickButtons();

function clickButtons() {
    var length = buttonSpan.length;
    for (var i = 0; i < length; i++) {
        buttonSpan[i].onclick = function () {
            $(buttonSpan[index - 1]).removeClass('on');
            if ($(this).attr('index') == 1) {
                index = 5;
            } else {
                index = $(this).attr('index') - 1;
            }
            nextPage(!true);
        };
    }
}
let width = document.body.clientWidth

function nextPage(next) {
    var targetLeft = 0;
    if (!$('.list').is(":animated")) {
        $(buttonSpan[index - 1]).removeClass('on');
        if (!next) {
            if (index == 5) {
                targetLeft = 0;
                index = 1;
            } else {
                index++;
                targetLeft = -width * 0.9 * (index - 1);
            }
        } else {
            if (index == 1) {
                index = 5;
                targetLeft = -width * 0.9 * (imgCount - 1);
            } else {
                index--;
                targetLeft = -width * 0.9 * (index - 1);
            }
        }
        $('.list').animate({
            left: targetLeft + 'px'
        }, 1000);
        $(buttonSpan[index - 1]).addClass('on');
    }
}


$('#left-logo').on('mouseenter', () => {
    $('#left-logo').animate({
        backgroundColor: "#1c7c99"
    }, 200);
});
$('#left-logo').on('mouseleave', () => {
    $('#left-logo').animate({
        backgroundColor: "rgb(48, 135, 156)"
    }, 200);
});
$('#left-head>p').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#1c7c99"
    }, 200);
});
$('#left-head>p').on('mouseleave', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#006494"
    }, 200);
});
$('#right-head>p').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#1c7c99"
    }, 200);
});
$('#right-head>p').on('mouseleave', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#006494"
    }, 200);
});
$('#login>p').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#1c7c99"
    }, 200);
});
$('#login>p').on('mouseleave', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#006494"
    }, 200);
});
$('#Clicklog').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "rgb(250, 144, 144)"
    }, 100);
})
$('#Clicklog').on('mouseleave', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#e93d3d"
    }, 100);
})
$('#Clickwrite').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "rgb(250, 144, 144)"
    }, 100);
})
$('#Clickwrite').on('mouseleave', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "#e93d3d"
    }, 100);
})
$('#state>div7').on('mouseenter', () => {
    $('#state>div7').animate({
        borderColor: "rgb(6, 81, 124)"
    }, 300)
})
$('#state>div7').on('mouseleave', () => {
    $('#state>div7').animate({
        borderColor: "rgb(48, 135, 156)"
    }, 300)
})


$('#state>div1').on('mouseenter', () => {
    $('#state>div1').animate({
        backgroundColor: "rgb(7, 81, 124)"
    }, 300)
})
$('#state>div1').on('mouseleave', () => {
    $('#state>div1').animate({
        backgroundColor: "rgb(48, 135, 156)"
    }, 300)
})
$('#state>div2').on('mouseenter', () => {
    $('#state>div2').animate({
        backgroundColor: "rgb(35, 141, 35)"
    }, 300)
})
$('#state>div2').on('mouseleave', () => {
    $('#state>div2').animate({
        backgroundColor: "rgb(103, 223, 73)"
    }, 300)
})
$('#state>div3').on('mouseenter', () => {
    $('#state>div3').animate({
        backgroundColor: "rgb(104, 0, 81)"
    }, 300)
})
$('#state>div3').on('mouseleave', () => {
    $('#state>div3').animate({
        backgroundColor: "rgb(151, 73, 223)"
    }, 300)
})
$('#state>div4').on('mouseenter', () => {
    $('#state>div4').animate({
        backgroundColor: "rgb(117, 119, 0)"
    }, 300)
})
$('#state>div4').on('mouseleave', () => {
    $('#state>div4').animate({
        backgroundColor: "rgb(223, 183, 73)"
    }, 300)
})
$('#state>div5').on('mouseenter', () => {
    $('#state>div5').animate({
        backgroundColor: "rgb(8, 0, 82)"
    }, 300)
})
$('#state>div5').on('mouseleave', () => {
    $('#state>div5').animate({
        backgroundColor: "rgb(57, 54, 179)"
    }, 300)
})
$('.blogtitlein').on('mouseenter', (event) => {
    $(event.currentTarget).animate({
        backgroundColor: "rgb(8, 55, 73)",
        color: "rgb(255,255,255)"
    }, 300)
})
$('.blogtitlein').on('mouseleave', (event) => {
    (event.currentTarget).animate({
        backgroundColor: "rgb(255,255,255)",
        color: "rgb(0,0,0)"
    }, 300)
})

$('#username>p').hide()
$('#username>input').hide()
$('#password>p').hide()
$('#password>input').hide()
$('#con-password>p').hide()
$('#con-password>input').hide()
$('#regbutton').hide()
$('#regbutton>p').hide()

let timeino = function () {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    minute = minute.toString();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let day = time.getDay();
    if (minute.length == 1) {
        minute = '0' + minute
    }
    document.getElementById('actime').innerText = hour + ':' + minute
    $('#actime').css({
        float: 'right',
        marginBottom: '0',
    })
    let month_word = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day_word = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (month == 1) {
        month = month_word[0]
    }
    if (month == 2) {
        month = month_word[1]
    }
    if (month == 3) {
        month = month_word[2]
    }
    if (month == 4) {
        month = month_word[3]
    }
    if (month == 5) {
        month = month_word[4]
    }
    if (month == 6) {
        month = month_word[5]
    }
    if (month == 7) {
        month = month_word[6]
    }
    if (month == 8) {
        month = month_word[7]
    }
    if (month == 9) {
        month = month_word[8]
    }
    if (month == 10) {
        month = month_word[9]
    }
    if (month == 11) {
        month = month_word[10]
    }
    if (month == 12) {
        month = month_word[11]
    }
    if (day == 0) {
        day = day_word[0]
    }
    if (day == 1) {
        day = day_word[1]
    }
    if (day == 2) {
        day = day_word[2]
    }
    if (day == 3) {
        day = day_word[3]
    }
    if (day == 4) {
        day = day_word[4]
    }
    if (day == 5) {
        day = day_word[5]
    }
    if (day == 6) {
        day = day_word[6]
    }
    $('#month').html(month);
    $('#date').html(date);
    $('#day').html(day);
}
setInterval("timeino()", 1000);



let logele = document.getElementById('logpage');
$('#logpage').css({
    opacity: '0',
    position: 'fixed',
    zIndex: '3',
    width: '0px',
    border: '5px solid rgb(3, 19, 53)'
})
$('#login').on('click', () => {
    $('#lognav').addClass('active')
    $('#homen').removeClass('active')
    if (logele.style.width == '0px') {
        $('#logpage').show()
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
    $('#lognav').removeClass('active')
    $('#homen').addClass('active')
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
    $('#lognav').removeClass('active')
    $('#homen').addClass('active')
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

let usname = document.getElementById('loggedname');
if (usname.innerHTML != '&lt;%= username %&gt; ') {
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

let base64url;

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
$.ajax({
    url: "/usernumber",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        $('#lousernum').text(data.num)
    },
    error: function () {},
});

$.ajax({
    url: "/allblognuma",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        $('#allblogsnumber').text(data.num)
    },
    error: function () {},
});


$.ajax({
    url: "/homeblogtitle",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        let i
        for (i = 0; i < data.homeblogtitle.length; i++) {
            document.getElementById('headblogtitle').innerHTML += '<div class="list-group">' + '<a class="list-group-item list-group-item-action" href="/HTML/blogs/blog' + (data.id[i]) + '.html' + '">' + data.homeblogtitle[i] + '</a>' + '</div>'
        }
    },
    error: function () {},
});





$.ajax({
    url: "/getip",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        let url = "https://free-api.heweather.net/s6/weather/now?location=" + data.ip + "&key=a90c393ec2914a20b207548681d96cac"
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            data: {},
            success: function (data) {},
            error: function () {},
        });

    },
    error: function () {},
});


$.ajax({
    url: "/currentblognum",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        document.getElementById('dailyblognum').innerText = data.currentnum
    },
    error: function () {},
});


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