const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});


userSchema.pre("save", async function (next) {
    try {
        console.log("entered");
        //아바타 자동생성
        const avatar = await gravatar.url(this.email, {
            s : "200",
            r : "pg",
            d : "mm"
        });
        this.avatar = avatar;

        //패스워드 암호화
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        console.log("exited");
        next();
    }
    catch (error) {
        next(error)
    }
});


module.exports = mongoose.model("user", userSchema);