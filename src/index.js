const express = require('express');
const { append } = require('express/lib/response');
const path = require('path');
var hbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); //mandar mensajes entre multiples vistas


//Initialization
const app = express();
require('./database'); //inicializar mongodb

//Settings
app.set('port',process.env.PORT || 3000);


//configurar el motor del plantillas
app.engine('hbs', hbs.engine({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname,'/views/layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
//user el motor del platillas, correrlo
app.set('view engine','hbs');
app.use(flash());

//Variables Globales
app.use((req,res,next)=>{
    //para accessar a los mensajes desde todas las vistas
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next(); // para que el request continue y puedar seguir el server trabajando
});


//Server Listening
app.listen(app.get('port'), ()=>{

    console.log('Server Listening on ' + app.get('port'));
});


//middleware
app.use(express.urlencoded({extended:false})); //para aceptar otro tipo de request apartede get o post
app.use(methodOverride('_method')); //_method formulario oculto
app.use(session({ 
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//router
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//static
app.use(express.static(path.join(__dirname,'public')));


