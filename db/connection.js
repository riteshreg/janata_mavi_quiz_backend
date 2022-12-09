const mongoose = require('mongoose')


const url = "mongodb+srv://riteshreg:lNgoGSrxZLjq3csg@cluster0.yx9mnsx.mongodb.net/?retryWrites=true"

mongoose.connect(url).then(()=>{
    console.log("connected")
}).catch((err)=>console.warn(err))