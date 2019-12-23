const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExpInput(data) {

    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    if (Validator.isEmpty(data.title)) {
        errors.title = "제목을 입력해주세요."
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = "회사를 입력해주세요."
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "날짜를 입력해주세요."
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };


};