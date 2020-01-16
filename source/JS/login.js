let base64url;
let i = 0;
$('#logchoice').css({
    display: 'none'
})
$('#regchoice').css({
    display: 'none'
})
let widthscr = screen.width - 28;
$('body').css({
    minWidth: widthscr
})

$('#username>p').hide()
$('#username>input').hide()
$('#password>p').hide()
$('#password>input').hide()
$('#con-password>p').hide()
$('#con-password>input').hide()
$('#register1').hide()
$('#login2').hide()
$('#regbutton').hide()
$('#logpage').hide()
$('#closel').hide()
$('#closer').hide()

$('#localsearchl').val(window.location.pathname)



if ($('#loggedname').text() == "admin") {
    $('#management').css({
        display: 'block'
    })
    $('#logs').css({
        display: 'block'
    })
    $('#cname').attr("disabled", "disabled");
}

function setting() {
    $('#cname').val($('#loggedname').text())
    if ($('#changeinfob').text() == "Account setting") {
        $('#changeinfob').text('Cancel')
        $('#setf').css({
            display: 'block'
        })
    } else {
        $('#setf').css({
            display: 'none'
        })
        $('#changeinfob').text('Account setting')
        $('#cninfo').css("cssText", "color:#6c757d !important;");
        $('#cninfo').css({
            backgroundColor: ''
        })
        $('#cninfo').text('Type the new name you want')
        $('#cpinfo').css("cssText", "color:#6c757d !important;");
        $('#cpinfo').css({
            backgroundColor: ''
        })
        $('#cpinfo').text('Type the new password you want')
    }
}

function setsub() {
    if ($('#cname').val() != "admin") {
        if ($('#cpassword').val() == $('#ccpassword').val()) {
            $.ajax({
                url: "/newnameisused",
                dataType: "json",
                type: "POST",
                data: {
                    'username': $('#cname').val()
                },
                success: function (data) {
                    if (data.nameisused == 0) {
                        let name = $('#cname').val()
                        let password = $('#cpassword').val()
                        let conpassword = $('#ccpassword').val()
                        $.ajax({
                            url: "/formc",
                            dataType: "json",
                            type: "POST",
                            data: {
                                'username': name,
                                'password': password,
                                'conpassword': conpassword
                            },
                            success: function (data) {
                                if (data.state == 1) {
                                    $('#csucb').click()
                                }
                            },
                            error: function () {},
                        });
                    } else {
                        $('#cninfo').css("cssText", "color:white !important;");
                        $('#cninfo').css({
                            backgroundColor: 'red'
                        })
                        $('#cninfo').text('This name has already be used, please try another name')
                        $('#cpinfo').css("cssText", "color:#6c757d !important;");
                        $('#cpinfo').css({
                            backgroundColor: ''
                        })
                        $('#cpinfo').text('Type the new password you want')
                    }
                },
                error: function () {},
            });
        } else {
            $('#cpinfo').css("cssText", "color:white !important;");
            $('#cpinfo').css({
                backgroundColor: 'red'
            })
            $('#cpinfo').text('Two passwords are not same')
            $('#cninfo').css("cssText", "color:#6c757d !important;");
            $('#cninfo').css({
                backgroundColor: ''
            })
            $('#cninfo').text('Type the new name you want')
        }
    } else {
        if ($('#loggedname').text() == 'admin') {
            let password = $('#cpassword').val()
            let conpassword = $('#ccpassword').val()
            $.ajax({
                url: "/formc",
                dataType: "json",
                type: "POST",
                data: {
                    'username': 'admin',
                    'password': password,
                    'conpassword': conpassword
                },
                success: function (data) {
                    if (data.state == 1) {
                        $('#csucb').click()
                    } else {
                        location.reload()
                    }
                },
                error: function () {},
            });
        } else {
            $('#cninfo').css("cssText", "color:white !important;");
            $('#cninfo').css({
                backgroundColor: 'red'
            })
            $('#cninfo').text('Invalid name or password!')
            $('#cpinfo').css("cssText", "color:#6c757d !important;");
            $('#cpinfo').css({
                backgroundColor: ''
            })
            $('#cpinfo').text('Type the new password you want')
        }
    }
}

function manage() {
    if ($('#management').text() == "Management") {
        $('#management').text('Cancel')
        $.ajax({
            url: "/management",
            dataType: "json",
            type: "GET",
            data: {},
            success: function (data) {
                if (data.state == 1) {
                    let count = "<li class='mana list-group-item list-group-item-action active'>Management<h2 id='allnum'></h2></li>";
                    for (let i = 0; i < data.data.length; i++) {
                        count += '<li class="mana list-group-item list-group-item-action"><a href="/HTML/blogs/blog' + data.data[data.data.length - 1 - i].id + '.html">' + data.data[data.data.length - 1 - i].blogtitle + '</a>' + '<button id="delete' + i + '" type="button" class="delbuttd btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick="adddel(' + data.data[data.data.length - 1 - i].id + ')">delete</button><small>' + data.data[data.data.length - 1 - i].time + '</small></li>'
                    }
                    document.getElementById('posblog').innerHTML += count
                    $.ajax({
                        url: "/allblognuma",
                        dataType: "json",
                        type: "GET",
                        data: {},
                        success: function (data) {
                            $('#allnum').text(data.num)
                        },
                        error: function () {},
                    });
                }
            },
            error: function () {},
        });
    } else {
        $('#management').text('Management')
        $('.mana').remove()
    }
}


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
$.ajax({
    url: "/headimgbe",
    dataType: "json",
    type: "GET",
    data: {
        'headimg': base64url
    },
    success: function (data) {
        if (data.headimg != undefined) {
            var imgFile1 = dataURLtoFile(data.headimg);
            src = window.URL.createObjectURL(imgFile1);
            document.getElementById('imageaf').src = src;
            $('#imageaf').css({
                textAlign: 'center',
                width: '200px',
                height: '200px',
                borderRadius: '50%'
            })
        }

    },
    error: function () {},
});


$('#he').change(function () {
    $('#getCroppedCanvas').css({
        display: 'block'
    });
    $('#afcontainer').hide();
    $('#imcontainer').show();
    let headfile = document.getElementById('he').files[0];
    src = window.URL.createObjectURL(headfile);
    document.getElementById('image').src = src
    var $image = $('#image');
    $image.cropper({
        aspectRatio: 1 / 1,
        viewMode: 1,
        background: false,
        modal: false,
        crop: function (event) {

            //console.log(event.detail.x);
            //console.log(event.detail.y);
            //console.log(event.detail.width);
            //console.log(event.detail.height);
            //console.log(event.detail.rotate);
            //console.log(event.detail.scaleX);
            //console.log(event.detail.scaleY);
        }
    });
    $("#replace").on("click", function () {
        $('#image').cropper('replace', "../material/picture/gettyimages_486109654_super_resized.jpg", true);
    })
    $("#getData").on("click", function () {})
    $("#getCroppedCanvas").on("click", function () {
        if (i == 0) {
            var cas = $('#image').cropper('getCroppedCanvas');
            base64url = cas.toDataURL('image/jpeg');
            $('.cavans').html(cas)
            var imgFile = dataURLtoFile(base64url);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgFile);
            const img = new Image();
            img.src = fileReader.result;
            document.body.appendChild(img);
            src = window.URL.createObjectURL(imgFile);
            document.getElementById('imageaf').src = src;
            $('#imcontainer').hide();
            $('#imageaf').css({
                textAlign: 'center',
                width: '200px',
                height: '200px',
                borderRadius: '50%'
            })
            $('#image').cropper('destroy');
            i++;
        }
        $('#afcontainer').show();
        $("#getCroppedCanvas").hide();


        $.ajax({
            url: "/headimg",
            dataType: "json",
            type: "POST",
            data: {
                'headimg': base64url
            },
            success: function (data) {
                location.reload()
            },
            error: function () {},
        });
    })
    i = 0;



    var cropper = $image.data('cropper');
})
let width = document.body.clientWidth;
$('#image').css({
    marginLeft: width / 2 - 125
})

$('#logout').on('mouseenter', () => {
    if (!$('#logout').is(":animated")) {
        $('#logout').animate({
            backgroundColor: 'rgb(255, 106, 106)'
        })
    }
})
$('#logout').on('mouseleave', () => {
    $('#logout').animate({
        backgroundColor: 'rgb(207, 59, 59)'
    })
})

$.ajax({
    url: "/userpostblog",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        let count = "";
        for (let i = 0; i < data.length; i++) {
            count += '<li class="list-group-item list-group-item-action"><a href="/HTML/blogs/blog' + data[data.length - 1 - i].id + '.html">' + data[data.length - 1 - i].blogtitle + '</a>' + '<button id="delete' + i + '" type="button" class="delbuttd btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick="adddel(' + data[data.length - 1 - i].id + ')">delete</button><small>' + data[data.length - 1 - i].time + '</small></li>'
        }
        document.getElementById('posblog').innerHTML += count
    },
    error: function () {},
});

function adddel(i) {
    document.getElementById('delbut').innerHTML = '<button type="button" class="btn btn-danger" data-dismiss="modal" onclick=deleteblog(' + i + ')>Delete</button>'
}

function deleteblog(i) {
    $.ajax({
        url: "/deleteblog",
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


$.ajax({
    url: "/getname",
    dataType: "json",
    type: "GET",
    data: {},
    success: function (data) {
        $('#loggednamex').text(data.name)
        let usname = document.getElementById('loggednamex');
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
                        document.getElementById('imageafx').src = src;
                        $('#imageafx').css({
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