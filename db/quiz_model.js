const mongoose = require('mongoose')
var random = require('mongoose-simple-random');


const QuizModel = new mongoose.Schema({
    correctAnswer:String,
    option1:String,
    option2:String,
    option3:String,
    question:String
})

QuizModel.plugin(random);


module.exports = mongoose.model('quizzes', QuizModel)