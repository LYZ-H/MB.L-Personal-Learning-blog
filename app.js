var express = require('express');
var app = express();
var session = require('express-session');
var bodyparser = require('body-parser');
var sqlite3 = require('sqlite3');
var utility = require("utility");
var uuid = require('node-uuid');
var db = new sqlite3.Database('sourse/db/user.db');
var dba = new sqlite3.Database('sourse/db/all.db');
var logsdb = new sqlite3.Database('sourse/db/logs/logs.db');
var responsedb = new sqlite3.Database('sourse/db/allresblog.db');
var saltdb = new sqlite3.Database('sourse/db/secure/saltelpsy.db');
var fs = require('fs');
let arr = [];
var ueditor = require("ueditor");
let path = require('path');
let d;
let ci = 0;
let date;




function encryption(pw, req, name, state) {
    function ip(req) {
        var ipAddress;
        var forwardedIpsStr = req.headers['X-Forwarded-For'];
        if (forwardedIpsStr) {
            var forwardedIps = forwardedIpsStr.split(',');
            ipAddress = forwardedIps[0];
        }
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    };
    let word = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let randw
    for (let i = 0; i < 36; i++) {
        randw += word[Math.round(Math.random() * 35)];
    }
    let randnum = Math.round(Math.random() * 100000000);
    let date = new Date();
    let ipk = ip(req).substring(7);
    let cuuid = uuid.v1()
    let salt = utility.md5(name + ipk + date + 'elpsycongroo' + cuuid + randnum + randw);
    if (state == 0) {
        saltdb.run('INSERT INTO saltel (name,saltelp) VALUES($name,$salt)', {
            $name: name,
            $salt: salt
        })
    } else {
        saltdb.run('UPDATE saltel SET name=$name,saltelp=$salt WHERE name=$bname', {
            $name: name,
            $salt: salt,
            $bname: req.session.userName
        })
    }
    let pws = utility.md5(pw + salt)
    return pws;
}


let simul = function (a, b) {
    let spiword = function (str) {
        var re = /\s*\b/g;
        var re2 = /[A-Z]/g;
        var string = str;

        function convert(propertyName) {
            function upperToLower(match) {
                return match.toLowerCase();
            }
            return propertyName.replace(re2, upperToLower);
        }
        string = convert(string);
        var output = [];
        output = string.split(re);
        var output2 = [];
        for (var i = 0; i < output.length; i++) {
            if (output[i] !== ',' && output[i] !== ';' && output[i] !== '.')
                output2.push(output[i]);
        }
        return output2;

    }
    let af = spiword(a)
    let bf = spiword(b)
    let aaf = spiword(a)
    let baf = spiword(b)
    let maxlen;
    let maxar;
    let shorar;
    if (af.length > bf.length) {
        maxlen = af.length
        maxar = af
        shorar = bf
    } else {
        maxlen = bf.length
        maxar = bf
        shorar = af
    }

    let sta;
    for (let i = 0; i < shorar.length; i++) {
        sta = 0
        for (let j = 0; j < maxar.length; j++) {
            if (shorar[i] == maxar[j]) {
                sta = 1;
            }
        }
        if (sta == 0) {
            maxar.push(shorar[i])
        }
    }
    let ap = new Array(maxar.length)
    let bp = new Array(maxar.length)
    for (let i = 0; i < ap.length; i++) {
        ap[i] = 0
    }
    for (let i = 0; i < bp.length; i++) {
        bp[i] = 0
    }

    for (let i = 0; i < aaf.length; i++) {
        for (let j = 0; j < maxar.length; j++) {
            if (aaf[i] == maxar[j]) {
                ap[j]++;
            }
        }
    }
    for (let i = 0; i < baf.length; i++) {
        for (let j = 0; j < maxar.length; j++) {
            if (baf[i] == maxar[j]) {
                bp[j]++;
            }
        }
    }

    let ad = 0;
    let ad1 = 0;
    let ad2 = 0;
    for (let i = 0; i < maxar.length; i++) {
        ad += ap[i] * bp[i]
        ad1 += Math.pow(ap[i], 2)
        ad2 += Math.pow(bp[i], 2)
    }
    let sim = (ad) / ((Math.sqrt(ad1)) * (Math.sqrt(ad2)))
    return sim;
}

let maxsi = function (a, b) {
    let msium = new Array(b.length)
    let curr = []
    for (let i = 0; i < b.length; i++) {
        msium[i] = simul(a, b[i].blogtitle)
        if (msium[i] >= 0.1) {
            curr.push(b[i])
        }
    }
    return curr;
}


let ip = function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.headers['X-Forwarded-For'];
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};



app.set('views', __dirname + '/sourse/HTML/');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(bodyparser.json({
    limit: '100mb'
}));
app.use(bodyparser.urlencoded({
    limit: '100mb',
    extended: true
}));
app.use(express.static(path.join(__dirname, 'sourse')))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30,
    },
}));

app.post('/formc', function (req, res) {
    if (req.body.username == req.session.userName) {
        if (req.body.password == req.body.conpassword) {
            let pws
            saltdb.get('SELECT saltelp FROM saltel WHERE name=$namec', {
                $namec: req.session.userName
            }, function (err, rows) {
                if (rows == undefined) {
                    pws = encryption(req.body.password, req, req.body.username, 0)
                    db.run('UPDATE user SET name=$name,password=$password WHERE name=$bname', {
                        $name: req.body.username,
                        $password: pws,
                        $bname: req.session.userName
                    });
                } else {
                    pws = encryption(req.body.password, req, req.body.username, 1)
                    db.run('UPDATE user SET name=$name,password=$password WHERE name=$bname', {
                        $name: req.body.username,
                        $password: pws,
                        $bname: req.session.userName
                    });
                }
            })
            dba.run('UPDATE allblog SET name=$name WHERE name=$bname', {
                $bname: req.session.userName,
                $name: req.body.username
            })
            responsedb.run('UPDATE resblog SET name=$name WHERE name=$bname', {
                $bname: req.session.userName,
                $name: req.body.username
            })
            db.run('UPDATE userinfo SET name=$name WHERE name=$bname', {
                $bname: req.session.userName,
                $name: req.body.username
            })
            db.run('UPDATE userinfol SET name=$name WHERE name=$bname', {
                $bname: req.session.userName,
                $name: req.body.username
            })
            db.run('UPDATE userinfolres SET name=$name WHERE name=$bname', {
                $bname: req.session.userName,
                $name: req.body.username
            })
            d = new Date();
            let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            let ipp = ip(req).substring(7)
            let event = "update account:" + req.body.username + " " + req.body.password
            logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
                $time: ti,
                $event: event,
                $ip: ipp
            })
            let stringlog = "update account:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7) + '\r\n';
            fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                if (err) {
                    throw err;
                }
            })
            fs.rename(__dirname + '/sourse/db/userblog/' + req.session.userName + '.db', __dirname + '/sourse/db/userblog/' + req.body.username + '.db', function (err) {
                if (err) {
                    throw err;
                }
            })
            console.log("update account:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7));
            let i = 0;
            req.session.userName = req.body.username;
            req.session.pW = pws;
            res.send({
                'state': 1
            })
        } else {
            res.redirect('/page1')
        }
    } else if (req.body.username != 'admin' & req.session.userName != 'admin') {
        db.get('SELECT * FROM user WHERE name=$name', {
            $name: req.body.username
        }, function (err, rows) {
            if (rows == undefined) {
                if (req.body.password == req.body.conpassword) {
                    let pws = encryption(req.body.password, req, req.body.username, 1)
                    db.run('UPDATE user SET name=$name,password=$password WHERE name=$bname', {
                        $name: req.body.username,
                        $password: pws,
                        $bname: req.session.userName
                    });
                    dba.run('UPDATE allblog SET name=$name WHERE name=$bname', {
                        $bname: req.session.userName,
                        $name: req.body.username
                    })
                    responsedb.run('UPDATE resblog SET name=$name WHERE name=$bname', {
                        $bname: req.session.userName,
                        $name: req.body.username
                    })
                    db.run('UPDATE userinfo SET name=$name WHERE name=$bname', {
                        $bname: req.session.userName,
                        $name: req.body.username
                    })
                    db.run('UPDATE userinfol SET name=$name WHERE name=$bname', {
                        $bname: req.session.userName,
                        $name: req.body.username
                    })
                    db.run('UPDATE userinfolres SET name=$name WHERE name=$bname', {
                        $bname: req.session.userName,
                        $name: req.body.username
                    })
                    d = new Date();
                    let stringlog = "update account:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7) + '\r\n';
                    fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                    fs.rename(__dirname + '/sourse/db/userblog/' + req.session.userName + '.db', __dirname + '/sourse/db/userblog/' + req.body.username + '.db', function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                    let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                    let ipp = ip(req).substring(7)
                    let event = "update account:" + req.body.username + " " + req.body.password
                    logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
                        $time: ti,
                        $event: event,
                        $ip: ipp
                    })
                    console.log("update account:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7));
                    let i = 0;
                    req.session.userName = req.body.username;
                    req.session.pW = pws;
                    res.send({
                        'state': 1
                    })
                } else {
                    res.redirect('/page1')
                }
            } else {
                res.redirect('/page1');
            }
        });
    } else {
        res.redirect('/page1');
    }
})

app.post('/formr', function (req, res) {
    db.get('SELECT * FROM user WHERE name=$name', {
        $name: req.body.username
    }, function (err, rows) {
        if (rows == undefined) {
            if (req.body.password == req.body.conpassword) {
                let pws = encryption(req.body.password, req, req.body.username, 0)
                db.run('INSERT INTO user (name,password) VALUES ($name,$password)', {
                    $name: req.body.username,
                    $password: pws
                });
                db.run('UPDATE user SET blognumber = 0 WHERE name=$name', {
                    $name: req.body.username
                })
                d = new Date();
                let stringlog = "register:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7) + '\r\n';
                fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                    if (err) {
                        throw err;
                    }
                })
                let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                let ipp = ip(req).substring(7)
                let event = "register:" + req.body.username + " " + req.body.password
                logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
                    $time: ti,
                    $event: event,
                    $ip: ipp
                })
                console.log("register:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7));
                let i = 0;
                db.all('SELECT name FROM user', function (err, rows) {
                    for (i = 0; i < rows.length; i++) {
                        arr[i] = new sqlite3.Database('sourse/db/userblog/' + rows[i].name + '.db');
                        if (rows[i].name == req.body.username) {
                            arr[i].run('CREATE TABLE blogs(blogscontent,title,time)');
                        }
                    }
                })
                req.session.userName = req.body.username;
                req.session.pW = pws;
                if (req.body.localhref != '/search' & req.body.localhref != undefined) {
                    res.redirect(req.body.localhref);
                } else {
                    res.redirect('/page1')
                }
            } else {
                res.redirect('/page1')
            }
        } else {
            res.redirect('/page1');
        }
    });
});



app.post('/forml', function (req, res) {
    db.get('SELECT * FROM user WHERE name=$name', {
        $name: req.body.username
    }, function (err, rows) {
        if (rows != undefined) {
            saltdb.get('SELECT saltelp FROM saltel WHERE name=$name', {
                $name: req.body.username
            }, function (err, rowsx) {
                if (rowsx != undefined) {
                    let pws = utility.md5(req.body.password + rowsx.saltelp)
                    if (req.body.username == rows.name && pws == rows.password) {
                        d = new Date();
                        let stringlog = "login:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7) + '\r\n';
                        fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                        let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        let ipp = ip(req).substring(7)
                        let event = "login:" + req.body.username + " " + req.body.password
                        logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
                            $time: ti,
                            $event: event,
                            $ip: ipp
                        })
                        console.log("login:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7));
                        req.session.userName = req.body.username;
                        req.session.pW = pws;
                        if (req.body.localhref != '/search') {
                            res.redirect(req.body.localhref);
                        } else {
                            res.redirect('/page1')
                        }
                    } else {
                        res.redirect('/page1');
                    }
                } else {
                    if (req.body.username == rows.name && req.body.password == rows.password) {
                        d = new Date();
                        let stringlog = "login:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7) + '\r\n';
                        fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                        let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        let ipp = ip(req).substring(7)
                        let event = "login:" + req.body.username + " " + req.body.password
                        logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
                            $time: ti,
                            $event: event,
                            $ip: ipp
                        })
                        console.log("login:" + req.body.username + " " + req.body.password + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '  IP:' + ip(req).substring(7));
                        req.session.userName = req.body.username;
                        req.session.pW = req.body.password;
                        if (req.body.localhref != '/search') {
                            res.redirect(req.body.localhref);
                        } else {
                            res.redirect('/page1')
                        }
                    } else {
                        res.redirect('/page1');
                    }
                }
            })
        } else {
            res.redirect('/page1');
        }
    });
});

app.get('/usernumber', function (req, res) {
    db.all('SELECT name FROM user', function (err, rows) {
        res.send({
            'num': rows.length
        })
    })
})

app.post('/allblognumber', function (req, res) {
    dba.get('SELECT count(*) FROM allblog', function (err, rowsa) {
        dba.all('SELECT id FROM allblog limit $a,$b', {
            $a: rowsa['count(*)'] - (req.body.page) * 20,
            $b: rowsa['count(*)'] - (req.body.page - 1) * 20
        }, function (err, rows) {
            res.send({
                'num': rows.length,
                'id': rows
            });
        })
    })
})

app.get('/allblognuma', function (req, res) {
    dba.get('SELECT count(*) FROM allblog', function (err, rowsa) {
        res.send({
            'num': rowsa['count(*)']
        });
    })
})

app.get('/getip', function (req, res) {
    res.send({
        ip: ip(req).substring(7)
    })
})

app.get('/getname', function (req, res) {
    res.send({
        name: req.session.userName
    })
})


app.get('/page1', function (req, res) {
    d = new Date();
    let stringlog = ip(req).substring(7) + "-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + '\r\n';
    fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
        if (err) {
            throw err;
        }
    })
    let ti = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let ipp = ip(req).substring(7)
    let event = "Visit"
    logsdb.run('INSERT INTO logs (time,event,ip) VALUES ($time,$event,$ip)', {
        $time: ti,
        $event: event,
        $ip: ipp
    })
    console.log(ip(req).substring(7) + "-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    if (req.session.userName) {
        res.render('page1', {
            username: req.session.userName
        });
    } else {
        res.sendFile(__dirname + '/sourse/HTML/page1.html')
    }
})

app.get('/aboutdeveloper', function (req, res) {
    res.sendFile(__dirname + '/sourse/HTML/aboutdeveloper.html')
})

app.get('/aboutblog', function (req, res) {
    res.sendFile(__dirname + '/sourse/HTML/aboutblog.html')
})

app.get('/currentblognum', function (req, res) {
    date = new Date();
    dba.all('SELECT blog FROM allblog WHERE time=$current', {
        $current: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()
    }, function (err, rows) {
        res.send({
            'currentnum': rows.length
        })
    })
})

app.get('/account', function (req, res) {
    if (req.session.userName) {
        db.get('SELECT * FROM user WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            res.render('login', {
                username: req.session.userName,
                blognumber: rows.blognumber
            });
        })
    } else {
        res.redirect('/page1')
    }
})

app.get('/homeblogtitle', function (req, res) {
    let count = [];
    let ur = [];
    let i = 0
    dba.all('SELECT blogtitle,id FROM allblog', function (err, rows) {
        if (rows.length < 9) {
            for (let i = 0; i < rows.length; i++) {
                count[i] = rows[rows.length - i - 1].blogtitle;
                ur[i] = rows[rows.length - i - 1].id;
            }
            res.send({
                'homeblogtitle': count,
                'id': ur
            })
        }
        if (rows.length >= 9) {
            for (let i = 0; i < 9; i++) {
                count[i] = rows[rows.length - i - 1].blogtitle;
                ur[i] = rows[rows.length - i - 1].id;
            }
            res.send({
                'homeblogtitle': count,
                'id': ur
            })
        }
    })
})


app.get('/logout', function (req, res) {
    req.session.userName = null;
    res.redirect('/page1');
});



app.post('/check', function (req, res) {
    db.get('SELECT * FROM user WHERE name=$name', {
        $name: req.body.username
    }, function (err, rows) {
        if (rows != undefined) {
            saltdb.get('SELECT saltelp FROM saltel WHERE name=$name', {
                $name: req.body.username
            }, function (err, rowsx) {
                if (rowsx != undefined) {
                    let pws = utility.md5(req.body.password + rowsx.saltelp)
                    if (req.body.username == rows.name && pws == rows.password) {
                        res.send({
                            'type': '1'
                        });
                    } else {
                        res.send({
                            'type': '0'
                        });
                    }
                } else {
                    if (req.body.username == rows.name && req.body.password == rows.password) {
                        res.send({
                            'type': '1'
                        });
                    } else {
                        res.send({
                            'type': '0'
                        });
                    }
                }
            })
        } else {
            res.send({
                'type': '0'
            });
        }
    })
})


app.post('/headimg', function (req, res) {
    if (req.session.userName) {
        let stringlog = "headimgupdate  " + "name:  " + req.session.userName + '\r\n';
        fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
            if (err) {
                throw err;
            }
        })
        db.run('UPDATE user SET headimg = $headimg WHERE name = $name', {
            $headimg: req.body.headimg,
            $name: req.session.userName
        });
        dba.run('UPDATE allblog SET headimg = $headimg WHERE name = $name', {
            $headimg: req.body.headimg,
            $name: req.session.userName
        });
        res.send({
            'headimg': req.body.headimg
        });
    }
})

app.get('/headimgbe', function (req, res) {
    db.get('SELECT * FROM user WHERE name=$name', {
        $name: req.session.userName
    }, function (err, rows) {
        if (rows != undefined) {
            res.send({
                'headimg': rows.headimg
            });
        }
    });
})


app.post('/headimgblox', function (req, res) {
    dba.get('SELECT headimg FROM allblog WHERE id=$id', {
        $id: req.body.num
    }, function (err, rows) {
        res.send({
            'headimg': rows.headimg,
            num: req.body.numa
        });
    });
})

app.post('/headimgblo', function (req, res) {
    dba.get('SELECT count(*) FROM allblog', function (err, rowsa) {
        dba.all('SELECT headimg FROM allblog limit $a,$b', {
            $a: rowsa['count(*)'] - (req.body.page) * 20,
            $b: rowsa['count(*)'] - (req.body.page - 1) * 20
        }, function (err, rows) {
            res.send({
                'headimg': rows
            });
        })
    })
})

app.get('/logout', function (req, res) {
    req.session.userName = null;
    res.redirect('/page1');
});

app.post('/nameisused', function (req, res) {
    db.get('SELECT * FROM user WHERE name=$name', {
        $name: req.body.username
    }, function (err, rows) {
        if (rows == undefined) {
            res.send({
                'nameisused': '0'
            })
        } else {
            res.send({
                'nameisused': '1'
            })
        }
    });
});

app.post('/newnameisused', function (req, res) {
    if (req.body.username == req.session.userName) {
        res.send({
            'nameisused': '0'
        })
    } else {
        db.get('SELECT * FROM user WHERE name=$name', {
            $name: req.body.username
        }, function (err, rows) {
            if (rows == undefined) {
                res.send({
                    'nameisused': '0'
                })
            } else {
                res.send({
                    'nameisused': '1'
                })
            }
        });
    }
});

app.post('/deleteblog', function (req, res) {
    if (req.session.userName) {
        let stringlog = "deleteblog:  " + req.body.tag + "    name:  " + req.session.userName + '\r\n';
        fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
            if (err) {
                throw err;
            }
        })
        dba.run('DELETE FROM allblog WHERE name=$name AND id=$tag', {
            $name: req.session.userName,
            $tag: req.body.tag
        })
        fs.unlink(__dirname + '/sourse/HTML/blogs/blog' + req.body.tag + '.html', function (error) {
            if (error) {
                return false;
            }
        })
        db.get('SELECT blognumber FROM user WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            db.run('UPDATE user SET blognumber=$change WHERE name=$name', {
                $change: rows.blognumber - 1,
                $name: req.session.userName
            }, function (err, rows) {
                res.send({
                    'state': 1
                })
            })
        })
    }
})

app.post('/deleteres', function (req, res) {
    if (req.session.userName) {
        responsedb.get('SELECT name FROM resblog WHERE id=$id', {
            $id: req.body.tag
        }, function (err, rows) {
            if ((rows.name == req.session.userName) | (req.session.userName == "admin")) {
                responsedb.run('DELETE FROM resblog WHERE id=$id', {
                    $id: req.body.tag
                }, function (err, rows) {
                    res.send({
                        'state': 1
                    })
                })
            }
        })
    }
})

app.post('/hasresult', function (req, res) {
    dba.all('SELECT blogtitle,time,name,id from allblog', function (err, rows) {
        let resultsimu = maxsi(req.body.value, rows)
        if (resultsimu.length != 0) {
            res.send({
                'state': 1
            })
        } else {
            res.send({
                'state': 0
            })
        }
    })
})

app.get('/logs', function (req, res) {
    if (req.session.userName == 'admin') {
        res.redirect('/logspage1')
    } else {
        res.redirect('/page1')
    }
})

app.post('/search', function (req, res) {
    cont = '';
    dba.all('SELECT blogtitle,time,name,id from allblog', function (err, rows) {
        let resultsimu = maxsi(req.body.searchdata, rows)
        let i;
        if (resultsimu.length != 0) {
            for (i = 0; i < resultsimu.length; i++) {
                cont += '<div class="list-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' + '<a href="' + '/HTML/blogs/blog' + (resultsimu[i].id) + '.html' + '" class="list-group-item list-group-item-action">' + '<div class="d-flex w-100 justify-content-between">' + '<h5 class="mb-1">' + resultsimu[i].blogtitle + '</h5>' + '<small>' + resultsimu[i].time + '</small>' + '</div>' + '<small>' + '<img id="imageaf' + i + '"src="">' + resultsimu[i].name + '</small>' + '</a>' + '</div>'
                if (i == resultsimu.length - 1) {
                    res.render('searchpage', {
                        data: cont
                    });
                }
            }
        } else {
            if (req.body.localhref != undefined) {
                res.redirect(req.body.localhref)
            } else {
                res.redirect('/page1')
            }
        }
    })
})

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/sourse/HTML/searchpage.html')
})

app.get('/collection', function (req, res) {
    if (req.session.userName) {
        db.all('SELECT blog FROM userinfo WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            res.render('collection', {
                Collection_number: rows.length
            });
        })
    } else {
        res.redirect('/page1')
    }
})


app.get('/getcollection', function (req, res) {
    if (req.session.userName) {
        db.all('SELECT blog,owner,time,headimg,blogtitle FROM userinfo WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            res.send({
                'collection': rows
            })
        })
    } else {
        res.redirect('/page1')
    }
})

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'sourse'), function (req, res, next) {
    var imgDir = '/img/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/';
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/';
        }
        res.ue_up(file_url);
        res.setHeader('Content-Type', 'text/html');
    } else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

app.get('/blogpagenumber', function (req, res) {
    dba.get('SELECT count(*) FROM allblog', function (err, rowsa) {
        res.send({
            'length': parseInt(rowsa['count(*)'] / 20 + 1)
        })
    })
});

app.get('/logspagenumber', function (req, res) {
    logsdb.get('SELECT count(*) FROM logs', function (err, rowsa) {
        res.send({
            'length': parseInt(rowsa['count(*)'] / 30 + 1)
        })
    })
});

app.get('/sendtime', function (req, res) {
    dba.all('SELECT time FROM allblog', function (err, rows) {
        res.send(rows)
    })
});

app.get('/userpostblog', function (req, res) {
    dba.all('SELECT blogtitle,id,name,time FROM allblog WHERE name=$name', {
        $name: req.session.userName
    }, function (err, rows) {
        res.send(rows)
    })
});

app.get('/management', function (req, res) {
    if (req.session.userName == "admin") {
        dba.all('SELECT blogtitle,id,name,time FROM allblog', function (err, rows) {
            res.send({
                'state': 1,
                'data': rows
            })
        })
    } else {
        res.send({
            'state': -1
        })
    }
});

app.post('/getreply', function (req, res) {
    responsedb.all('SELECT rescontent,time,name,id FROM resblog WHERE blog=$blog', {
        $blog: req.body.blogid
    }, function (err, rows) {
        res.send({
            dbdata: rows,
            cname: req.session.userName
        })
    })
});

app.post('/allresnumber', function (req, res) {
    responsedb.all('SELECT rescontent,id FROM resblog WHERE blog=$blog', {
        $blog: req.body.blogid
    }, function (err, rows) {
        res.send({
            'num': rows.length,
            'id': rows
        })
    })
})

app.post('/resheadimgblox', function (req, res) {
    responsedb.get('SELECT headimg FROM resblog WHERE id=$id', {
        $id: req.body.num
    }, function (err, rows) {
        res.send({
            'headimg': rows.headimg,
            num: req.body.numa
        });
    });
})

app.use('/write', function (req, res) {
    if (req.session.userName) {
        res.render('ueditor', {
            username: req.session.userName
        });
    } else {
        res.redirect('/page1')
    }
});

app.get('/blogs/:aid', function (req, res) {
    var aid = req.params.aid;
    res.sendFile(__dirname + '/sourse/HTML/blogs/' + aid + '.html')
})

app.post('/collect', function (req, res) {
    date = new Date();
    if (req.session.userName == req.body.username) {
        db.run('SELECT name FROM userinfo WHERE blog=$blogid', {
            $blogid: 'blog' + req.body.blogid
        }, function (err, rowsx) {
            if (rowsx == undefined) {
                dba.get('SELECT name,headimg,blogtitle FROM allblog WHERE id=$id', {
                    $id: req.body.blogid
                }, function (err, rows) {
                    db.run('INSERT INTO userinfo (blog,name,owner,time,headimg,blogtitle) VALUES ($blogid,$name,$owner,$time,$headimg,$blogtitle)', {
                        $blogid: 'blog' + req.body.blogid,
                        $name: req.session.userName,
                        $owner: rows.name,
                        $time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate(),
                        $headimg: rows.headimg,
                        $blogtitle: rows.blogtitle
                    }, function (err, rows) {
                        res.send({
                            'state': 1
                        })
                    })
                })
            }
        })
    }
})

app.post('/getcollect', function (req, res) {
    if (req.session.userName) {
        db.get('SELECT name FROM userinfo WHERE blog=$blog AND name=$name', {
            $blog: req.body.blogid,
            $name: req.session.userName
        }, function (err, rows) {
            if (rows != undefined) {
                res.send({
                    'state': 1
                })
            } else {
                res.send({
                    'state': 0
                })
            }
        })
    } else {
        res.send({
            'state': -1
        })
    }
})

app.post('/delcollect', function (req, res) {
    let blogidd = 'blog' + req.body.blogid
    if (req.session.userName) {
        db.run('DELETE FROM userinfo WHERE name=$name AND blog=$blog', {
            $name: req.session.userName,
            $blog: blogidd
        }, function (err, rows) {
            res.send({
                'state': 1
            })
        })
    } else {
        res.send({
            'state': -1
        })
    }
})

app.post('/like', function (req, res) {
    date = new Date();
    if (req.session.userName == req.body.username) {
        db.run('SELECT name FROM userinfol WHERE blog=$blogid', {
            $blogid: 'blog' + req.body.blogid
        }, function (err, rowsx) {
            if (rowsx == undefined) {
                dba.get('SELECT name,headimg,blogtitle FROM allblog WHERE id=$id', {
                    $id: req.body.blogid
                }, function (err, rows) {
                    db.run('INSERT INTO userinfol (blog,name,owner,time,headimg,blogtitle) VALUES ($blogid,$name,$owner,$time,$headimg,$blogtitle)', {
                        $blogid: 'blog' + req.body.blogid,
                        $name: req.session.userName,
                        $owner: rows.name,
                        $time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate(),
                        $headimg: rows.headimg,
                        $blogtitle: rows.blogtitle
                    }, function (err, rows) {
                        res.send({
                            'state': 1
                        })
                    })
                })
            }
        })
    }
})

app.post('/getlike', function (req, res) {
    if (req.session.userName) {
        db.get('SELECT name FROM userinfol WHERE blog=$blog AND name=$name', {
            $blog: req.body.blogid,
            $name: req.session.userName
        }, function (err, rows) {
            if (rows != undefined) {
                res.send({
                    'state': 1
                })
            } else {
                res.send({
                    'state': 0
                })
            }
        })
    } else {
        res.send({
            'state': -1
        })
    }
})

app.post('/dellike', function (req, res) {
    let blogidd = 'blog' + req.body.blogid
    if (req.session.userName) {
        db.run('DELETE FROM userinfol WHERE name=$name AND blog=$blog', {
            $name: req.session.userName,
            $blog: blogidd
        }, function (err, rows) {
            res.send({
                'state': 1
            })
        })
    }
})

app.post('/likeres', function (req, res) {
    date = new Date();
    if (req.session.userName == req.body.username) {
        db.run('SELECT name FROM userinfolres WHERE res=$resid', {
            $resid: 'response' + req.body.resid
        }, function (err, rowsx) {
            if (rowsx == undefined) {
                responsedb.get('SELECT name,headimg,rescontent,blog FROM resblog WHERE id=$id', {
                    $id: req.body.resid
                }, function (err, rows) {
                    db.run('INSERT INTO userinfolres (res,name,owner,time,headimg,rescontent) VALUES ($resid,$name,$owner,$time,$headimg,$rescontent)', {
                        $resid: 'response' + req.body.resid,
                        $name: req.session.userName,
                        $owner: rows.blog,
                        $time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate(),
                        $headimg: rows.headimg,
                        $rescontent: rows.rescontent
                    }, function (err, rows) {
                        res.send({
                            'state': 1
                        })
                    })
                })
            }
        })
    }
})

app.post('/getlikeres', function (req, res) {
    if (req.session.userName) {
        db.all('SELECT res FROM userinfolres WHERE name=$name AND owner=$owner', {
            $name: req.session.userName,
            $owner: req.body.owner
        }, function (err, rows) {
            if (rows != undefined) {
                res.send({
                    'res': rows
                })
            }
        })
    }
})

app.post('/delreslike', function (req, res) {
    let residd = 'response' + req.body.resid
    if (req.session.userName) {
        db.run('DELETE FROM userinfolres WHERE name=$name AND res=$res', {
            $name: req.session.userName,
            $res: residd
        }, function (err, rows) {
            res.send({
                'state': 1
            })
        })
    }
})

app.post('/alllikenum', function (req, res) {
    db.all('SELECT name FROM userinfol WHERE blog=$blog', {
        $blog: req.body.blogid
    }, function (err, rows) {
        res.send({
            'num': rows.length
        })
    })
})

app.post('/allcollectnum', function (req, res) {
    db.all('SELECT name FROM userinfo WHERE blog=$blog', {
        $blog: req.body.blogid
    }, function (err, rows) {
        res.send({
            'num': rows.length
        })
    })
})

app.post('/reslikenum', function (req, res) {
    db.all('SELECT res FROM userinfolres WHERE owner=$blog', {
        $blog: req.body.blogid
    }, function (err, rows) {
        res.send({
            'res': rows
        })
    })
})


app.post('/postblog', function (req, res) {
    date = new Date();
    if (req.session.userName) {
        db.get('SELECT headimg FROM user WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            let himg = rows.headimg
            dba.run('INSERT INTO allblog (id,name,blog,blogtitle,headimg,time) VALUES (NULL,$name,$blog,$blogtitle,$headimg,$time)', {
                $name: req.session.userName,
                $blog: req.body.blogcontent[0],
                $blogtitle: req.body.blogtitle,
                $headimg: himg,
                $time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()
            }, function (err, rows) {
                dba.all('SELECT id FROM allblog WHERE name=$name', {
                    $name: req.session.userName
                }, function (err, rows) {
                    let stringlog = "postblog:  " + rows[rows.length - 1].id + "    name:  " + req.session.userName + '\r\n';
                    fs.appendFile(__dirname + '/log/' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '.txt', stringlog, function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                    dba.get('SELECT count(*) FROM allblog', function (err, rowsx) {
                        let pagenum = parseInt(rowsx['count(*)'] / 20) + 1
                        fs.writeFile(__dirname + '/sourse/HTML/blogs/blog' + rows[rows.length - 1].id + '.html', '<!DOCTYPE html><html><head><title>' + 'blog' + rows[rows.length - 1].id + '</title><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><link rel="stylesheet" href="../../CSS/jquery-ui.css"><link rel="stylesheet" href="../../CSS/bootstrap.css"><link rel="stylesheet" href="../../CSS/alluserblog.css"></head><body background="../../material/picture/backimage.jpg">\
                            <button id="showsearch" data-toggle="modal" data-target="#noresult"></button>\
                            <div id="topp"><img id="topi" src="../../material/picture/top.png"></div>' + '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
                        <a class="navbar-brand">MB.L</a>\
                        <a href="/account">\
                            <div1 id="headim">\
                                <img id="imageaf" src="">\
                            </div1>\
                            <div1 id="loggedna">\
                                <span id="loggedname"></span>\
                            </div1>\
                        </a>\
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
                          <span class="navbar-toggler-icon"></span>\
                        </button>\
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">\
                          <ul class="navbar-nav mr-auto">\
                            <li class="nav-item">\
                              <a class="nav-link" href="/page1">Home <span class="sr-only">(current)</span></a>\
                            </li>\
                            <li class="nav-item active">\
                              <a class="nav-link" href="JavaScript:history.go(-1)">Blogs</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link bflog">Write</a>\
                            </li>\
                            <li class="nav-item dropdown">\
                              <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                developer\
                              </a>\
                              <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                                <a class="dropdown-item" href="/aboutdeveloper">about developer</a>\
                                <div class="dropdown-divider"></div>\
                                <a class="dropdown-item" href="/aboutblog">about blog</a>\
                              </div>\
                            </li>\
                            <li class="nav-item" id="lognav">\
                                <a class="nav-link" id="login" >Login/Register</a>\
                            </li>\
                          </ul>\
                          <form action="/search" method="POST" class="form-inline my-2 my-lg-0">\
                            <input id="searchinp" class="form-control mr-sm-2" name="searchdata" type="text" placeholder="Search" aria-label="Search">\
                            <input id="searchbut" class="btn btn-outline-success my-2 my-sm-0" type="button" value="search">\
                            <input id="localsearchl" name="localhref">\
                          </form>\
                        </div>\
                      </nav>\
                      <div id="gray"></div>\
                        <div id="logpage">\
                            <div id="logcontain">\
                                <p id="closel">x</p>\
                                <div id="logchoice">\
                                    <p id="login1">Login</p>\
                                    <p id="register1">Register</p>\
                                </div>\
                                <div id="logmain">\
                                    <form id="forml" action="/forml" method="POST">\
                                        <div id="username">\
                                            <p>User Name:</p>\
                                            <input id="poname" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                        </div>\
                                        <div id="password">\
                                            <p>Password:&nbsp&nbsp&nbsp</p>\
                                            <input id="popassword" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                        </div>\
                                        <div id="localhdiv">\
                                            <input id="localhinp" name="localhref">\
                                        </div>\
                                        <div id="aler">\
                                            <p>Wrong name or password</p>\
                                        </div>\
                                        <div id="logbutton">\
                                            <p>Login</p>\
                                        </div>\
                                    </form>\
                                </div>\
                            </div>\
                            <div id="gray"></div>\
                            <div id="regcontainer">\
                                <p id="closer">x</p>\
                                <div id="regchoice">\
                                    <p id="login2">Login</p>\
                                    <p id="register2">Register</p>\
                                </div>\
                                <div id="regmain">\
                                    <form id="formr" action="/formr" method="POST">\
                                        <div id="username">\
                                            <p>User Name:</p>\
                                            <input id="nameinput" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                        </div>\
                                        <div id="password">\
                                            <p>Password:&nbsp&nbsp&nbsp</p>\
                                            <input id="passwordinput" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                        </div>\
                                        <div id="con-password">\
                                            <p>Config Password:&nbsp&nbsp&nbsp</p>\
                                            <input id="conpasswordinput" type="password" name="conpassword" size="20" maxlength="20" placeholder="password"/>\
                                        </div>\
                                        <div id="localhdivr">\
                                            <input id="localhinpr" name="localhref">\
                                        </div>\
                                        <div id="notsp">\
                                            <p>Two passwords are not same</p>\
                                        </div>\
                                        <div id="namealr">\
                                            <p>This name has already be used</p>\
                                        </div>\
                                        <div id="regbutton">\
                                            <p>Register</p>\
                                        </div>\
                                    </form>\
                                </div>\
                            </div>\
                        </div>' + '<ul class="list-group"><li id="maincont" class="list-group-item">' + '<div id="blobtitle">' + req.body.blogtitle + '</div>' + req.body.blogcontent[0] + '</li></ul>\
                        <ul id="replycontent" class="list-group">\
                        <li id="repnumber" class="list-group-item">reply:<div id="allresnum"></div>\
                        <button onclick="showresbu()" id="showreply" type="button" class="btn btn-success">Click to reply</button>\
                        <div id="alllike">-</div>\
                        <img onclick="heartmaincli()" id="heartmain" src="../../material/picture/heart.png">\
                        <div id="allcollect">-</div>\
                        <img onclick="starmaincli()" id="starmain" src="../../material/picture/star.png"></li>\
                        <li id="liedi"><div><script id="editor" type="text/plain" style="width:1024px;height:200px;"></script></div>\
                        <button id="submitres" onclick="getContent()" type="button" class="btn btn-primary">Submit</button></li></ul>\
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
                        <div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Waring</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Are you sure to delete this response?</div>\
                        <div class="modal-footer"><button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button><div id="delbut"><button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button></div></div></div></div></div>\
                        <div class="modal fade" id="noresult" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
            <div class="modal-dialog" role="document">\
              <div class="modal-content">\
                <div class="modal-header">\
                  <h5 class="modal-title" id="exampleModalLabel">No result</h5>\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                  </button>\
                </div>\
                <div class="modal-body">\
                    No result, Please try to use full word search\
                </div>\
                <div class="modal-footer">\
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                </div>\
              </div>\
            </div>\
          </div>\
                        <script src="../../JS/jquery.js"></script><script src="../../JS/jQuery_Color_Animations.js"></script><script src="../../JS/bootstrap.js"></script><script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.config.js"></script>\
                        <script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.all.js"> </script><script type="text/javascript" charset="utf-8" src="../../ueditor/lang/zh-cn/zh-cn.js"></script><script src="../../JS/postblog.js"></script><div class="bottom"></div></body></html>', {
                            'flag': 'w'
                        }, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            });
        })
    }
    let i = 0;
    db.each('SELECT name FROM user', function (err, rows) {
        arr[i] = new sqlite3.Database('sourse/db/userblog/' + rows.name + '.db');
        if (req.session.userName == rows.name) {
            arr[i].run('INSERT INTO blogs (blogscontent,title,time) VALUES ($content,$title,$ctime)', {
                $content: req.body.blogcontent[0],
                $title: req.body.blogtitle,
                $ctime: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()
            })
        }
        i++;
    })
    db.get('SELECT blognumber FROM user WHERE name=$name', {
        $name: req.session.userName
    }, function (err, rows) {
        db.run('UPDATE user SET  blognumber = $blognumber WHERE name = $name', {
            $blognumber: rows.blognumber + 1,
            $name: req.session.userName
        })
    })
    res.send({
        'issub': 1
    })
});

app.post('/postresblog', function (req, res) {
    if (req.session.userName) {
        date = new Date();
        db.get('SELECT headimg FROM user WHERE name=$name', {
            $name: req.session.userName
        }, function (err, rows) {
            responsedb.run('INSERT INTO resblog (blog,rescontent,time,name,headimg) VALUES ($blog,$content,$time,$name,$headimg)', {
                $blog: 'blog' + req.body.blogid,
                $content: req.body.rescontent[0],
                $time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate(),
                $name: req.session.userName,
                $headimg: rows.headimg
            }, function (err, rows) {
                responsedb.get('SELECT headimg,MAX(id) FROM resblog WHERE name=$name', {
                    $name: req.session.userName
                }, function (err, rows) {
                    res.send({
                        'state': 1,
                        'headimg': rows.headimg,
                        'name': req.session.userName,
                        'id': rows['MAX(id)']
                    })
                })
            })
        })
    } else {
        res.send({
            'state': -1
        })
    }
});


app.post('/getblog', function (req, res) {
    let i;
    let cont = '';
    dba.get('SELECT count(*) FROM allblog', function (err, rowsa) {
        if ((req.body.page - 1) * 20 < rowsa['count(*)']) {
            dba.all('SELECT name,blogtitle,time,id FROM allblog limit $a,$b', {
                $a: rowsa['count(*)'] - (req.body.page) * 20,
                $b: rowsa['count(*)'] - (req.body.page - 1) * 20
            }, function (err, rows) {
                for (i = 0; i < rows.length; i++) {
                    cont += '<div class="list-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' + '<a href="' + '/blogs/blog' + (rows[rows.length - 1 - i].id) + '" class="list-group-item list-group-item-action">' + '<div class="d-flex w-100 justify-content-between">' + '<h5 class="mb-1">' + rows[rows.length - 1 - i].blogtitle + '</h5>' + '<small>' + rows[rows.length - 1 - i].time + '</small>' + '</div>' + '<small>' + '<img id="imageaf' + (rows.length - 1 - i) + '"src="">' + rows[rows.length - 1 - i].name + '</small>' + '</a>' + '</div>'
                    if (i == rows.length - 1) {
                        res.send({
                            'content': cont
                        })
                    }
                }
            })
        } else {
            res.send({
                'content': ''
            })
        }
    })
});

app.post('/getlogs', function (req, res) {
    let i;
    let cont = '';
    logsdb.get('SELECT count(*) FROM logs', function (err, rowsa) {
        if ((req.body.page - 1) * 30 < rowsa['count(*)']) {
            logsdb.all('SELECT * FROM logs limit $a,$b', {
                $a: rowsa['count(*)'] - (req.body.page) * 30,
                $b: rowsa['count(*)'] - (req.body.page - 1) * 30
            }, function (err, rows) {
                for (i = 0; i < rows.length; i++) {
                    cont += '<div class="list-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' + '<li class="list-group-item list-group-item-action">' + '<div class="d-flex w-100 justify-content-between">' + '<h5 class="mb-1">' + rows[rows.length - 1 - i].event + '</h5>' + '<small>' + rows[rows.length - 1 - i].time + '</small>' + '</div>' + '<small>' + rows[rows.length - 1 - i].ip + '</small>' + '</li>' + '</div>'
                    if (i == rows.length - 1) {
                        res.send({
                            'content': cont
                        })
                    }
                }
            })
        } else {
            res.send({
                'content': ''
            })
        }
    })
})



app.get('/:aid', function (req, res) {
    var aid = req.params.aid;
    if (aid.slice(0, 8) == "blogpage" & !isNaN(aid.slice(8))) {
        dba.get('SELECT count(*) FROM allblog', function (err, rows) {
            let pagenum = parseInt(rows['count(*)'] / 20) + 1
            for (let i = 1; i <= pagenum; i++) {
                fs.access(__dirname + '/sourse/HTML/blogpages/blogpage' + i + '.html', function (err) {
                    if (err) {
                        fs.writeFile(__dirname + '/sourse/HTML/blogpages/blogpage' + i + '.html', '<!DOCTYPE html><html><head><title>' + 'blogpage' + i + '</title><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><link rel="stylesheet" href="../../CSS/jquery-ui.css"><link rel="stylesheet" href="../../CSS/bootstrap.css"><link rel="stylesheet" href="../../CSS/blogpage.css"></head><body background="../../material/picture/backimage.jpg">\
                        <button id="showsearch" data-toggle="modal" data-target="#noresult"></button>\
                        <div id="topp"><img id="topi" src="../../material/picture/top.png"></div>' + '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
                            <a class="navbar-brand">MB.L</a>\
                            <a href="/account">\
                                <div1 id="headim">\
                                    <img id="imageaf" src="">\
                                </div1>\
                                <div1 id="loggedna">\
                                    <span id="loggedname"></span>\
                                </div1>\
                            </a>\
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
                              <span class="navbar-toggler-icon"></span>\
                            </button>\
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">\
                              <ul class="navbar-nav mr-auto">\
                                <li class="nav-item">\
                                  <a class="nav-link" href="/page1">Home <span class="sr-only">(current)</span></a>\
                                </li>\
                                <li class="nav-item" active>\
                                  <a class="nav-link" href="/blogpage' + i + '">Blogs</a>\
                                </li>\
                                <li class="nav-item">\
                                    <a class="nav-link bflog">Write</a>\
                                </li>\
                                <li class="nav-item dropdown">\
                                  <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    developer\
                                  </a>\
                                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                                    <a class="dropdown-item" href="/aboutdeveloper">about developer</a>\
                                    <div class="dropdown-divider"></div>\
                                    <a class="dropdown-item" href="/aboutblog">about blog</a>\
                                  </div>\
                                </li>\
                                <li class="nav-item" id="lognav">\
                                    <a class="nav-link" id="login" >Login/Register</a>\
                                </li>\
                              </ul>\
                              <form action="/search" method="POST" class="form-inline my-2 my-lg-0">\
                                <input id="searchinp" class="form-control mr-sm-2" name="searchdata" type="text" placeholder="Search" aria-label="Search">\
                                <input id="searchbut" class="btn btn-outline-success my-2 my-sm-0" type="button" value="search">\
                                <input id="localsearchl" name="localhref">\
                              </form>\
                            </div>\
                          </nav>\
                          <div id="gray"></div>\
                            <div id="logpage">\
                                <div id="logcontain">\
                                    <p id="closel">x</p>\
                                    <div id="logchoice">\
                                        <p id="login1">Login</p>\
                                        <p id="register1">Register</p>\
                                    </div>\
                                    <div id="logmain">\
                                        <form id="forml" action="/forml" method="POST">\
                                            <div id="username">\
                                                <p>User Name:</p>\
                                                <input id="poname" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                            </div>\
                                            <div id="password">\
                                                <p>Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="popassword" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="localhdiv">\
                                                <input id="localhinp" name="localhref">\
                                            </div>\
                                            <div id="aler">\
                                                <p>Wrong name or password</p>\
                                            </div>\
                                            <div id="logbutton">\
                                                <p>Login</p>\
                                            </div>\
                                        </form>\
                                    </div>\
                                </div>\
                                <div id="gray"></div>\
                                <div id="regcontainer">\
                                    <p id="closer">x</p>\
                                    <div id="regchoice">\
                                        <p id="login2">Login</p>\
                                        <p id="register2">Register</p>\
                                    </div>\
                                    <div id="regmain">\
                                        <form id="formr" action="/formr" method="POST">\
                                            <div id="username">\
                                                <p>User Name:</p>\
                                                <input id="nameinput" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                            </div>\
                                            <div id="password">\
                                                <p>Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="passwordinput" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="con-password">\
                                                <p>Config Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="conpasswordinput" type="password" name="conpassword" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="localhdivr">\
                                                <input id="localhinpr" name="localhref">\
                                            </div>\
                                            <div id="notsp">\
                                                <p>Two passwords are not same</p>\
                                            </div>\
                                            <div id="namealr">\
                                                <p>This name has already be used</p>\
                                            </div>\
                                            <div id="regbutton">\
                                                <p>Register</p>\
                                            </div>\
                                        </form>\
                                    </div>\
                                </div>\
                            </div>\
                            <div id="content" class="container-fluid row"></div>\
                            <div class="modal fade" id="noresult" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
            <div class="modal-dialog" role="document">\
              <div class="modal-content">\
                <div class="modal-header">\
                  <h5 class="modal-title" id="exampleModalLabel">No result</h5>\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                  </button>\
                </div>\
                <div class="modal-body">\
                    No result, Please try to use full word search\
                </div>\
                <div class="modal-footer">\
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                </div>\
              </div>\
            </div>\
          </div>\
                            <script src="../../JS/jquery.js"></script><script src="../../JS/jQuery_Color_Animations.js"></script><script src="../../JS/bootstrap.js"></script><script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.config.js"></script>\
                            <script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.all.js"> </script><script type="text/javascript" charset="utf-8" src="../../ueditor/lang/zh-cn/zh-cn.js"></script><script src="../../JS/blogpage.js"></script>\
                            <nav aria-label="Page navigation example">\
                            <ul class="pagination justify-content-end">\
                            </ul>\
                            </nav>\
                            </body></html>', {
                            'flag': 'w'
                        }, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                    }
                })
            }
        })
        res.sendFile(__dirname + '/sourse/HTML/blogpages/' + aid + '.html')
    } else if (aid.slice(0, 8) == "logspage" & !isNaN(aid.slice(8))) {
        logsdb.get('SELECT count(*) FROM logs', function (err, rows) {
            let pagenum = parseInt(rows['count(*)'] / 30) + 1
            for (let i = 1; i <= pagenum; i++) {
                fs.access(__dirname + '/sourse/HTML/logs/logspage' + i + '.html', function (err) {
                    if (err) {
                        fs.writeFile(__dirname + '/sourse/HTML/logs/logspage' + i + '.html', '<!DOCTYPE html><html><head><title>' + 'logspage' + i + '</title><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><link rel="stylesheet" href="../../CSS/jquery-ui.css"><link rel="stylesheet" href="../../CSS/bootstrap.css"><link rel="stylesheet" href="../../CSS/logspage.css"></head><body background="../../material/picture/backimage.jpg">\
                        <button id="showsearch" data-toggle="modal" data-target="#noresult"></button>\
                        <div id="topp"><img id="topi" src="../../material/picture/top.png"></div>' + '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
                            <a class="navbar-brand">MB.L</a>\
                            <a href="/account">\
                                <div1 id="headim">\
                                    <img id="imageaf" src="">\
                                </div1>\
                                <div1 id="loggedna">\
                                    <span id="loggedname"></span>\
                                </div1>\
                            </a>\
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
                              <span class="navbar-toggler-icon"></span>\
                            </button>\
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">\
                              <ul class="navbar-nav mr-auto">\
                                <li class="nav-item active">\
                                  <a class="nav-link" href="/page1">Home <span class="sr-only">(current)</span></a>\
                                </li>\
                                <li class="nav-item">\
                                  <a class="nav-link" href="/blogpage1">Blogs</a>\
                                </li>\
                                <li class="nav-item">\
                                    <a class="nav-link bflog">Write</a>\
                                </li>\
                                <li class="nav-item dropdown">\
                                  <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    developer\
                                  </a>\
                                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                                    <a class="dropdown-item" href="/aboutdeveloper">about developer</a>\
                                    <div class="dropdown-divider"></div>\
                                    <a class="dropdown-item" href="/aboutblog">about blog</a>\
                                  </div>\
                                </li>\
                                <li class="nav-item" id="lognav">\
                                    <a class="nav-link" id="login" >Login/Register</a>\
                                </li>\
                              </ul>\
                              <form action="/search" method="POST" class="form-inline my-2 my-lg-0">\
                                <input id="searchinp" class="form-control mr-sm-2" name="searchdata" type="text" placeholder="Search" aria-label="Search">\
                                <input id="searchbut" class="btn btn-outline-success my-2 my-sm-0" type="button" value="search">\
                                <input id="localsearchl" name="localhref">\
                              </form>\
                            </div>\
                          </nav>\
                          <div id="gray"></div>\
                            <div id="logpage">\
                                <div id="logcontain">\
                                    <p id="closel">x</p>\
                                    <div id="logchoice">\
                                        <p id="login1">Login</p>\
                                        <p id="register1">Register</p>\
                                    </div>\
                                    <div id="logmain">\
                                        <form id="forml" action="/forml" method="POST">\
                                            <div id="username">\
                                                <p>User Name:</p>\
                                                <input id="poname" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                            </div>\
                                            <div id="password">\
                                                <p>Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="popassword" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="localhdiv">\
                                                <input id="localhinp" name="localhref">\
                                            </div>\
                                            <div id="aler">\
                                                <p>Wrong name or password</p>\
                                            </div>\
                                            <div id="logbutton">\
                                                <p>Login</p>\
                                            </div>\
                                        </form>\
                                    </div>\
                                </div>\
                                <div id="gray"></div>\
                                <div id="regcontainer">\
                                    <p id="closer">x</p>\
                                    <div id="regchoice">\
                                        <p id="login2">Login</p>\
                                        <p id="register2">Register</p>\
                                    </div>\
                                    <div id="regmain">\
                                        <form id="formr" action="/formr" method="POST">\
                                            <div id="username">\
                                                <p>User Name:</p>\
                                                <input id="nameinput" type="text" name="username" size="20" maxlength="20" placeholder="User Name"/>\
                                            </div>\
                                            <div id="password">\
                                                <p>Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="passwordinput" type="password" name="password" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="con-password">\
                                                <p>Config Password:&nbsp&nbsp&nbsp</p>\
                                                <input id="conpasswordinput" type="password" name="conpassword" size="20" maxlength="20" placeholder="password"/>\
                                            </div>\
                                            <div id="localhdivr">\
                                                <input id="localhinpr" name="localhref">\
                                            </div>\
                                            <div id="notsp">\
                                                <p>Two passwords are not same</p>\
                                            </div>\
                                            <div id="namealr">\
                                                <p>This name has already be used</p>\
                                            </div>\
                                            <div id="regbutton">\
                                                <p>Register</p>\
                                            </div>\
                                        </form>\
                                    </div>\
                                </div>\
                            </div>\
                            <div id="content" class="container-fluid row"></div>\
                            <div class="modal fade" id="noresult" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
            <div class="modal-dialog" role="document">\
              <div class="modal-content">\
                <div class="modal-header">\
                  <h5 class="modal-title" id="exampleModalLabel">No result</h5>\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                  </button>\
                </div>\
                <div class="modal-body">\
                    No result, Please try to use full word search\
                </div>\
                <div class="modal-footer">\
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                </div>\
              </div>\
            </div>\
          </div>\
                            <script src="../../JS/jquery.js"></script><script src="../../JS/jQuery_Color_Animations.js"></script><script src="../../JS/bootstrap.js"></script><script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.config.js"></script>\
                            <script type="text/javascript" charset="utf-8" src="../../ueditor/ueditor.all.js"> </script><script type="text/javascript" charset="utf-8" src="../../ueditor/lang/zh-cn/zh-cn.js"></script><script src="../../JS/logspage.js"></script>\
                            <nav aria-label="Page navigation example">\
                            <ul class="pagination justify-content-end">\
                            </ul>\
                            </nav>\
                            </body></html>', {
                            'flag': 'w'
                        }, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                    }
                })
            }
        })
        res.sendFile(__dirname + '/sourse/HTML/logs/' + aid + '.html')
    } else {
        res.redirect('/page1')
    }
});


app.listen(8080, function () {
    console.log('successful!');
});

module.exports = app;