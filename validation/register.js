const Validator = require("validator");
const isEmpty = require("./is-empty");


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";    //confirm pw

    if (!Validator.isLength(data.name, {min : 2, max :30})) {
        errors.name = "이름의 길이를 2자 이상 30자 이하로 적어야합니다."
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "이름을 입력해주세요!"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "이메일 형식이 잘못되었습니다."
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "이메일을 입력해주세요!"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "패스워드를 입력해주세요!"
    }

    if (!Validator.isLength(data.password, {min : 4, max : 20})) {
        errors.password = "비밀번호를 4자 이상 20자 이하로 적어야합니다."
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "비밀번호를 재입력해주세요!"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "재입력 패스워드가 다릅니다."
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};