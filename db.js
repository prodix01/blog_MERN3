const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
    .then(() => console.log("몽고db 서버를 시작합니다."))
    .catch(err => console.log(err.message));