const express = require('express')
const app = express()
require('./db/connection')
var cors = require('cors')
const quizModel = require('./db/quiz_model')
const userModel = require('./db/user_model.js')


app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
  let data = await quizModel.find({})
  res.send(data)
})


app.get('/random_question', (req, res) => {
  quizModel.findRandom({}, {}, { limit: 10 }, function(err, results) {
    if (!err) {
      res.send(results)
    }
  });
})


app.delete('/delete', (req, res) => {
  quizModel.deleteOne({ _id: req.body._id }).then((response) => {
    res.send(response)
  })

})

app.post('/login', async (req, res) => {

  if (req.body.userName && req.body.password) {
    let user = await userModel.findOne(req.body).select("-password")
    if (user) {
      res.send(user)
    } else {
      res.send({ err: "no user found" })
    }

  } else {
    res.send({ err: "please enter both userName and password" })
  }

})

app.post('/', async (req, res) => {
  let data = new quizModel(req.body)
  data = await data.save();
  res.send(data)

})

app.listen(3000)