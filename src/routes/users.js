
const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/signin',(req,res)=>{
  res.send('Ingresando a la app');
});


router.get('/signout',(req,res)=>{

    res.send('Formulario');
})
module.exports = router;