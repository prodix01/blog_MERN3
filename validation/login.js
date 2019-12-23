const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "이메일 형식이 틀렸습니다."
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "이메일을 입력해주세요!"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "패스워드를 입력해주세요!"
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};