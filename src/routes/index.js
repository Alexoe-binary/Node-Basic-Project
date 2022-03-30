//para crear rutas del servidor
const express = require('express');
const router = express.Router();


//llamar a la ruta /
router.get('/', (req,res)=>{
   res.render('main',{layout:'layout'});
   
});

module.exports = router;

