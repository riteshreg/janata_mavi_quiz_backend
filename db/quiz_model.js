const mongoose = require('mongoose')
var random = require('mongoose-simple-random');


const QuizModel = new mongoose.Schema({
    correctAnswer:String,
    incorrectAnswers:Array,
    question:String
})

QuizModel.plugin(random);


module.exports = mongoose.model('quizzes', QuizModel)