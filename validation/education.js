const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEduInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.major = !isEmpty(data.major) ? data.major : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    if (Validator.isEmpty(data.school)) {
        errors.school = "학교를 입력해주세요."
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "학력 입력해주세요."
    }

    if (Validator.isEmpty(data.major)) {
        errors.major = "전공을 입력해주세요."
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "입학일을 입력해주세요."
    }

    return{
        errors,
        isValid : isEmpty(errors)
    };
};