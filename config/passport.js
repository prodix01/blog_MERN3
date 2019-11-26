//jwt 를 검증하는 모듈

const JwtStrategy = require("passport-jwt").Strategy; //토큰검사
const ExtractJwt = require("passport-jwt").ExtractJwt;//compare
const userModel = require("../models/users");


const ops = {};   //option

ops.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
ops.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(ops, (jwt_payload, done) => {
            userModel
                .findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        done(null, false);
                    }
                })
                .catch(err => {
                    console.log(err.message)
                });
        })
    )
};

