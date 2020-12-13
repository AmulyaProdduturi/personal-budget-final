const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amulya:amulya@cluster0.gejir.mongodb.net/PersonalBudget?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex : true
});