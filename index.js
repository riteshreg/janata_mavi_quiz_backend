const express = require('express')
const app = express()
require('./db/connection')
const quizModel = require('./db/quiz_model')
const userModel = require('./db/user_model.js')


app.use(express.json())



app.get('/', async(req, res) => {
  let data = await quizModel.find({})
  res.send(data)
})


app.get('/random_question', (req, res)=>{
  quizModel.findRandom({}, {}, {limit: 4}, function(err, results) {
    if (!err) {
      res.send(results) 
    }
  });
})

app.post('/login',async(req,res)=>{

  if(req.body.userName && req.body.password){
    let user = await userModel.findOne(req.body).select("-password")
      if(user){
        res.send(user)
      }else{
        res.send("no user found")
      }
  
  }else{
    res.send("please enter both id and password")
  }

})

app.post('/', async(req, res)=>{
  let data = new quizModel(req.body)
  data =  await data.save();
  res.send(data)

})

app.listen(3000)