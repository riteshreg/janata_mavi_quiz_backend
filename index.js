const express = require('express')
const app = express()
require('./db/connection')
var cors = require('cors')
const quizModel = require('./db/quiz_model')
const userModel = require('./db/user_model.js')
const { ObjectID } = require("bson");


app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  let data = await quizModel.find({})
  res.send(data)
})

app.get('/get_data_for_update/:id', (req, res) => {
  quizModel.findOne({ _id: req.params.id }).then((response) => {
    if (response) {
      res.send(response)
    }
  })
})

app.put("/update/:id", async (req, res) => {
  let data = await quizModel.updateOne(
    { _id: ObjectID(req.params.id) },
    { $set: req.body }
  )
  res.send(data)
})

app.get('/random_question', (req, res) => {
  quizModel.findRandom({}, {}, { limit: 10 }, function(err, results) {
    if (!err) {
      res.send(results)
    }
  });
})


app.delete('/delete/:id', (req, res) => {
  quizModel.deleteOne({ _id: req.params.id }).then((response) => {
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