
const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); //llamar al modelo Note



//llamar a la vista fomrulario Add Note
router.get('/notes/add', (req,res)=>
{
     res.render('notes/add-notes');

});
 
//Grabar una nota
router.post('/notes/new-notes',async (req,res)=>{
    const {title, description_schema}  = req.body; //sacar la propiedad de un objeto con destructuive del html
    console.log(req.body);
    const errors = [];
    if(!title){
          errors.push({text: 'Inserta un titulo'});
    }
    if(!description_schema){
          errors.push({text: 'Inserta una descripcion'});
    }
    if(errors.length >0 )
    {
      res.render('notes/add-notes',{
            errors,
            title,
            description_schema
      });
    }
    else{
      const newNote = new Note({title,description_schema});
      console.log(newNote);
      await newNote.save();
      req.flash('success_msg', 'Nota Agregada');
      res.redirect('/notes')
    }
});

//Desplegar Notas en la vista all-notes
router.get('/notes', async (req,res)=>{
    const notes = await Note.find().sort({date:'desc'}).lean();
    res.render('notes/all-notes', {notes});
});

//Mostrar Nota a editar por ID 
router.get('/notes/edit/:id', async (req,res)=>{
      const note = await Note.findById(req.params.id).lean();;
      console.log(note);
      res.render('notes/edit-note',{note});

});

//metodo para guardar los cambios de la nota
router.put('/notes/edit-note/:id',async (req,res)=>{
      const {title,description_schema} = req.body;
      await Note.findByIdAndUpdate(req.params.id, {title, description_schema});
      res.redirect('/notes');
});

//eliminar nota by ID
router.delete('/notes/delete/:id',async(req,res)=>
{     
      await Note.findByIdAndDelete(req.params.id);
      res.redirect('/notes');
})

module.exports = router;