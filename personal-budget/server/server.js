const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const budgetModel = require('./models/budgetModel');
const { User, validate } = require('./models/users');
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/budget_info';
app.use('',express.static('public'));



app.get('/budget',(req,res)=>{
   
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection is established");
                budgetModel.find({})
                           .then((data)=>{
                               console.log(data);
                               res.status(200).send(data);
                               mongoose.connection.close();
                           })
                           .catch((err)=>{
                               console.log(err);
                               res.status(500).send();
                           })
            })
})
app.post('/budget',(req,res)=>{
    console.log(req.body);
    let data = {id: req.body._id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection is established");
                budgetModel.insertMany(data,(err,data)=>{
                    if(err){
                        console.log(err);   
                        res.send(err);
                        mongoose.connection.close();                     
                    }else{
                        console.log("Data is inserted"); 
                        res.send(data);    
                        mongoose.disconnect();
                    }                    
                })                              
})
});

app.post('/users', async (req, res) => {
    // First Validate The Request
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        console.log("Error");
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});
 
//module.exports = router;

app.use(express.json());
//app.use('/api/users', users);

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


