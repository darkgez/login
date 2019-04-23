var express = require('express');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');
var ejs = require('ejs');
var engine= require('ejs-mate');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var passportConf = require('./passport');
var Pasien = require('./models/user');


var app = express();

/*
//cloud db
mongoose.connect('mongodb+srv://darkgez:arbundaadmin@coba-yoa8u.gcp.mongodb.net/coba', function(err){
    if (err){
        console.log(err);
    }    else {
        console.log("Alhamdulillah Berhasil")
    }
});
*/

mongoose.connect('mongodb://localhost:27017/pendaftaran', function(err){
    if (err){
        console.log(err);
    }    else {
        console.log("Alhamdulillah Berhasil Konek DB")
    }
});

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret:"Hello",
    store: new MongoStore({ url: 'mongodb://localhost:27017/pendaftaran', autoReconnect: true })
}));

//var engine
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(passport.initialize());
app.use(passport.session());

/*
//model
var PaseinSkema = new mongoose.Schema({
    nama: String,
    nrm: Number
});
*/

//model
//var Pasien = mongoose.model('Pasien', PaseinSkema);

/*
// tambah pasien
app.get('/tambah-pasien', function(req,res,next){
    var pasien = new Pasien();
    pasien.nama= "Anggorohfhg";
    pasien.nrm = 18003056456548;
    pasien.save(function(err){
        if (err) next(err)
        res.json(pasien);
    });

});
*/

app.get('/', function(req, res, next){
    res.render('home')
});

app.get('/login', function(req, res, next){
   if (req.pasien) return res.redirect('/')
   res.render('login')
});

app.get('/profile', function(req,res,next){
    res.render('profile')
});

app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

app.get('/logout',function(req,res,next){
    req.logout()
    res.redirect('/');
});

app.post('/daftar-pasien',function(req,res,next){
    var pasien = new Pasien();
    pasien.nama = req.body.nama;
    pasien.nrm = req.body.nrm;
    pasien.save(function(err){
        if (err) console.log(err)
        res.json(pasien);
    })
})
/*
app.get('/', function(req, res, next){
    Pasien.find({}, function(err, CariPasien){
        if (CariPasien){
            res.json(CariPasien);
        } else {
            res.json("Belum terdaftar");
        }
    });
})
;
*/
/*
app.post('/tambah-pasien', function(req, res, next){
    var pasien = new Pasien();
    pasien.nama = req.body.nama;
    pasien.nrm = req.body.nrm;
    pasien.save(function(err){
        if (err) next(err)
        res.json(pasien);
    });
});

app.post('/tambah-pasien', function(req, res, next){
    var pasien = new Pasien();
    pasien.nama = req.body.nama;
    pasien.nrm = req.body.nrm;
    pasien.save(function(err){
        if (err) next(err)
        res.json(pasien);
    });
});
*/

/*
app.get('/:nama', function(req, res, next){
    Pasien.findOne({nama: req.params.nama}, function(err, CariPasien){
        if (CariPasien){
            res.json(CariPasien);
        } else {
            res.json("Belum terdaftar");
        }
    });
})
*/

//set server
app.listen(4000,function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Alhamdullilah port 4000");
    }
});