var ue = UE.getEditor('editor');
let width = document.body.clientWidth

$('#username>p').hide()
$('#username>input').hide()
$('#password>p').hide()
$('#password>input').hide()
$('#con-password>p').hide()
$('#con-password>input').hide()
$('#logchoice').css({
    display: 'none'
})
$('#regchoice').css({
    display: 'none'
})
$('#register1').hide()
$('#login2').hide()
$('#regbutton').hide()
$('#logpage').hide()
$('#closel').hide()
$('#closer').hide()

$('#localhinp').val(window.location.pathname)
$('#localhinpr').val(window.location.pathname)
$('#localsearchl').val(window.location.pathname)

$('#topp').click(function () {
    $('html,body').animate({
        scrollTop: '0px'
    }, 300);
});

function showresbu() {
    if (document.getElementById('submitres').style.display == '') {
        $('#edui1').css({
            display: 'block'
        })
        $('#submitres').css({
            display: 'block',
            width: '100%'
        })
        $('#liedi').css({
            display: 'block'
        })
        $('#showreply').text('Cancel')
    } else {
        $('#edui1').css({
            display: ''
        })
        $('#submitres').css({
            display: ''
        })
        $('#liedi').css({
            display: ''
        })
        $('#showreply').text('Click to reply')
    }

}

function adddel(i) {
    document.getElementById('delbut').innerHTML = '<button type="button" class="btn btn-danger" data-dismiss="modal" onclick=deleteres(' + i + ')>Delete</button>'
}

function heartfun(i) {
    if (document.getElementById('loggedname').innerText != '') {
        let name = document.getElementById('loggedname').innerText;
        if (document.getElementById('heart' + i).getAttribute('src') != '../../material/picture/heartful.png') {
            $.ajax({
                url: "/likeres",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'resid': i
                },
                success: function (data) {
                    document.getElementById('heart' + i).src = '../../material/picture/heartful.png'
                    if (document.getElementById('resnum' + i).innerText != '-') {
                        document.getElementById('resnum' + i).innerText = parseInt(document.getElementById('resnum' + i).innerText) + 1
                    } else {
                        document.getElementById('resnum' + i).innerText = 1
                    }
                },
                error: function () {},
            });
        } else {
            $.ajax({
                url: "/delreslike",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'resid': i
                },
                success: function (data) {
                    document.getElementById('heart' + i).src = '../../material/picture/heart.png'
                    if (document.getElementById('resnum' + i).innerText != '1') {
                        document.getElementById('resnum' + i).innerText = parseInt(document.getElementById('resnum' + i).innerText) - 1
                    } else {
                        document.getElementById('resnum' + i).innerText = '-'
                    }
                },
                error: function () {},
            });
        }
    } else {
        $('#login').click()
    }
}

function deleteres(i) {
    $.ajax({
        url: "/deleteres",
        dataType: "json",
        type: "POST",
        data: {
            tag: i
        },
        success: function (data) {
            setTimeout("location.reload()", 300)
        },
        error: function () {},
    });
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

function getContent() {
    if (document.getElementById('loggedname').innerText != '') {
        var arr = [];
        arr.push(UE.getEditor('editor').getContent());
        let id = document.title.slice(4)
        $.ajax({
            url: "/postresblog",
            dataType: "json",
            type: "POST",
            data: {
                'rescontent': arr,
                'blogid': id
            },
            success: function (data) {
                if (data.state == 1) {
                    document.getElementById('allresnum').innerText = parseInt(document.getElementById('allresnum').innerText) + 1
                    let imgfile = dataURLtoFile(data.headimg);
                    src = window.URL.createObjectURL(imgfile);
                    date = new Date();
                    document.getElementById('replycontent').innerHTML = document.getElementById('replycontent').innerHTML + '<li class="list-group-item">' + arr + '<small>' + date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate() + '</small>' + '<small>' + '<img id="imageaftemp' + '"src="">' + data.name + '<button id="delete' + data.id + '" type="button" class="btn btn-danger delresbu" data-toggle="modal" data-target="#exampleModal" onclick="adddel(' + data.id + ')">delete</button><img class="heartimg" id="heart' + data.id + '" onclick="heartfun(' + data.id + ')" src="../../material/picture/heart.png"><div class="resnumc" id="resnum' + data.id + '">-</div>' + '</small>' + '</li>'
                    document.getElementById('imageaftemp').src = src;
                    $('#imageaftemp').css({
                        height: '2%',
                        width: '2%',
                        minHeight: '24px',
                        minWidth: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(136, 136, 136)',
                        verticalAlign: 'top',
                        display: 'inline-block',
                        marginRight: '1%'
                    })
                    $('html,body').animate({
                        scrollTop: $('.bottom').offset().top
                    }, 300);
                    $('#edui1').css({
                        display: ''
                    })
                    $('#submitres').css({
                        display: ''
                    })
                    $('#liedi').css({
                        display: ''
                    })
                    $('#showreply').text('Click to reply')
                }
            },
            error: function () {

            },
        });
    } else {
        $('#login').click()
    }
}

function getContentTxt() {
    var arr = [];
    arr.push(UE.getEditor('editor').getContentTxt());
    alert(arr.join("\n"));
}

function hasContent() {
    var arr = [];
    arr.push(UE.getEditor('editor').hasContents());
    alert(arr.join("\n"));
}

function setFocus() {
    UE.getEditor('editor').focus();
}

function deleteEditor() {
    disableBtn();
    UE.getEditor('editor').destroy();
}

function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}

function enableBtn() {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
    }
}

let bid = document.title
$.ajax({
    url: "/getreply",
    dataType: "json",
    type: "POST",
    data: {
        'blogid': bid
    },
    success: function (data) {
        for (let i = 0; i < data.dbdata.length; i++) {
            if ((data.dbdata[i].name == data.cname) | (data.cname == "admin")) {
                document.getElementById('replycontent').innerHTML = document.getElementById('replycontent').innerHTML + '<li class="list-group-item">' + data.dbdata[i].rescontent + '<small>' + data.dbdata[i].time + '</small>' + '<small>' + '<img id="imageaf' + i + '"src="">' + data.dbdata[i].name + '<button id="delete' + i + '" type="button" class="btn btn-danger delresbu" data-toggle="modal" data-target="#exampleModal" onclick="adddel(' + data.dbdata[i].id + ')">delete</button><img class="heartimg" id="heart' + data.dbdata[i].id + '" onclick="heartfun(' + data.dbdata[i].id + ')" src="../../material/picture/heart.png"><div class="resnumc" id="resnum' + data.dbdata[i].id + '">-</div>' + '</small>' + '</li>'
            } else {
                document.getElementById('replycontent').innerHTML = document.getElementById('replycontent').innerHTML + '<li class="list-group-item">' + data.dbdata[i].rescontent + '<small>' + data.dbdata[i].time + '</small>' + '<small>' + '<img id="imageaf' + i + '"src="">' + data.dbdata[i].name + '<img class="heartimg" id="heart' + data.dbdata[i].id + '" onclick="heartfun(' + data.dbdata[i].id + ')" src="../../material/picture/heart.png"><div class="resnumc" id="resnum' + data.dbdata[i].id + '">-</div></small>' + '</li>'
            }
        }
        $.ajax({
            url: "/reslikenum",
            dataType: "json",
            type: "POST",
            data: {
                'blogid': document.title
            },
            success: function (data) {
                for (let i = 0; i < data.res.length; i++) {
                    if (document.getElementById('resnum' + data.res[i].res.slice(8)).innerText == '-') {
                        document.getElementById('resnum' + data.res[i].res.slice(8)).innerText = 1
                    } else {
                        document.getElementById('resnum' + data.res[i].res.slice(8)).innerText = parseInt(document.getElementById('resnum' + data.res[i].res.slice(8)).innerText) + 1
                    }
                }
            },
            error: function () {},
        });
        $.ajax({
            url: "/allresnumber",
            dataType: "json",
            type: "POST",
            data: {
                'blogid': bid
            },
            success: function (data) {
                document.getElementById('allresnum').innerText = data.num
                for (let i = 0; i < data.num; i++) {
                    $.ajax({
                        url: "/resheadimgblox",
                        dataType: "json",
                        type: "POST",
                        data: {
                            num: data.id[i].id,
                            numa: i
                        },
                        success: function (data) {
                            let imgfile;
                            if (data.headimg != null) {
                                imgfile = dataURLtoFile(data.headimg);
                                src = window.URL.createObjectURL(imgfile);
                                if (document.getElementById('imageaf' + data.num) != null) {
                                    document.getElementById('imageaf' + data.num).src = src;
                                    $('#imageaf' + data.num).css({
                                        height: '2%',
                                        width: '2%',
                                        minHeight: '24px',
                                        minWidth: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgb(136, 136, 136)',
                                        verticalAlign: 'top',
                                        display: 'inline-block',
                                        marginRight: '1%'
                                    })
                                }
                            }
                        }
                    })
                }

            },
            error: function () {},
        });
        $.ajax({
            url: "/getname",
            dataType: "json",
            type: "GET",
            data: {},
            success: function (data) {
                $('#loggedname').text(data.name)
                if (document.getElementById('loggedname').innerText != '') {
                    $.ajax({
                        url: "/getlikeres",
                        dataType: "json",
                        type: "POST",
                        data: {
                            'username': name,
                            'owner': document.title
                        },
                        success: function (data) {
                            for (let i = 0; i < data.res.length; i++) {
                                document.getElementById('heart' + (data.res[i].res).slice(8)).src = '../../material/picture/heartful.png'
                            }
                        },
                        error: function () {},
                    });
                }
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

    },
    error: function () {

    },
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
        $('#logpage').show()
        $('#closel').show()
        $('#register1').show()
        $('#login2').show()
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
    $('#closer').show()
    $('#closel').hide()
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
    $('#closer').hide()
    $('#closel').show()
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


function starmaincli() {
    if (document.getElementById('loggedname').innerText != '') {
        let name = document.getElementById('loggedname').innerText;
        let blogid = document.title.slice(4);
        if (document.getElementById('starmain').getAttribute('src') != '../../material/picture/starful.png') {
            $.ajax({
                url: "/collect",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'blogid': blogid
                },
                success: function (data) {
                    document.getElementById('starmain').src = '../../material/picture/starful.png'
                    if (document.getElementById('allcollect').innerText != '-') {
                        document.getElementById('allcollect').innerText = parseInt(document.getElementById('allcollect').innerText) + 1
                    } else {
                        document.getElementById('allcollect').innerText = 1
                    }
                },
                error: function () {},
            });
        } else {
            $.ajax({
                url: "/delcollect",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'blogid': blogid
                },
                success: function (data) {
                    document.getElementById('starmain').src = '../../material/picture/star.png'
                    if (document.getElementById('allcollect').innerText != 1) {
                        document.getElementById('allcollect').innerText = parseInt(document.getElementById('allcollect').innerText) - 1
                    } else {
                        document.getElementById('allcollect').innerText = '-'
                    }
                },
                error: function () {},
            });
        }
    } else {
        $('#login').click()
    }
}


let namell = document.getElementById('loggedname').innerText;
let blogidll = document.title.slice(4);
$.ajax({
    url: "/getcollect",
    dataType: "json",
    type: "POST",
    data: {
        'blogid': document.title
    },
    success: function (data) {
        if (data.state == 1) {
            document.getElementById('starmain').src = '../../material/picture/starful.png'
        }
    },
    error: function () {},
});


function heartmaincli() {
    if (document.getElementById('loggedname').innerText != '') {
        let name = document.getElementById('loggedname').innerText;
        let blogid = document.title.slice(4);
        if (document.getElementById('heartmain').getAttribute('src') != '../../material/picture/heartful.png') {
            $.ajax({
                url: "/like",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'blogid': blogid
                },
                success: function (data) {
                    document.getElementById('heartmain').src = '../../material/picture/heartful.png'
                    if (document.getElementById('alllike').innerText != '-') {
                        document.getElementById('alllike').innerText = parseInt(document.getElementById('alllike').innerText) + 1
                    } else {
                        document.getElementById('alllike').innerText = 1
                    }
                },
                error: function () {},
            });
        } else {
            $.ajax({
                url: "/dellike",
                dataType: "json",
                type: "POST",
                data: {
                    'username': name,
                    'blogid': blogid
                },
                success: function (data) {
                    document.getElementById('heartmain').src = '../../material/picture/heart.png'
                    if (document.getElementById('alllike').innerText != '1') {
                        document.getElementById('alllike').innerText = parseInt(document.getElementById('alllike').innerText) - 1
                    } else {
                        document.getElementById('alllike').innerText = '-'
                    }
                },
                error: function () {},
            });
        }
    } else {
        $('#login').click()
    }
}


$.ajax({
    url: "/alllikenum",
    dataType: "json",
    type: "POST",
    data: {
        'blogid': document.title
    },
    success: function (data) {
        if (data.num != 0) {
            document.getElementById('alllike').innerText = data.num
        }
    },
    error: function () {},
});

$.ajax({
    url: "/allcollectnum",
    dataType: "json",
    type: "POST",
    data: {
        'blogid': document.title
    },
    success: function (data) {
        if (data.num != 0) {
            document.getElementById('allcollect').innerText = data.num
        }
    },
    error: function () {},
});





$.ajax({
    url: "/getlike",
    dataType: "json",
    type: "POST",
    data: {
        'username': name,
        'blogid': document.title
    },
    success: function (data) {
        if (data.state == 1) {
            document.getElementById('heartmain').src = '../../material/picture/heartful.png'
        }
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


$('.bflog').click(function () {
    if ($('#loggedname').text() == "") {
        $('#login').click()
    } else {
        window.location.href = '/write'
    }
})