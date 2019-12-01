const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!Validator.isLength(data.handle, {min : 2, max : 20})) {
        errors.handle = "핸들 길이를 2자 이상 20자 이하로 적어주세요."
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "핸들을 입력해주세요."
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "스테이터스를 입력해주세요."
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "스킬을 입력해주세요."
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "URL형식이 잘못됬습니다."
        }
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
};