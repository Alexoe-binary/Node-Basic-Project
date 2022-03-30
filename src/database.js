const mongoose = require('mongoose');

//conn a la db
/*mongoose.connect('mongodb://localhost/notes-app-db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db=>console.log('DB is connected'))
.catch(err=>console.log(err));*/

mongoose.connect('mongodb://localhost/notes-app-db',
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });