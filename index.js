const express = require('express')
const app = express()
require('./db/connection')
const quizModel = require('./db/quiz_model')


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


app.post('/', async(req, res)=>{
  let data = new quizModel(req.body)
  data =  await data.save();
  res.send(data)

})

app.listen(3000)