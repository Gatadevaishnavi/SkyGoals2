const Joi = require("joi");
const mobileRegex = /^[6-9]\d{9}$/;

const uservalidationSchama = Joi.object({
  first_name: Joi.string().min(2).max(15).required(),
  last_name: Joi.string().min(2).max(15).required(),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required(),
  confirm_password: Joi.ref("password"),
  mobileNo: Joi.string().pattern(mobileRegex).required().messages({
    "string.base": "Mobile number must be a string.",
    "string.empty": "Mobile number cannot be empty.",
    "string.pattern.base":
      "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long.",
    "any.required": "Mobile number is required.",
  }),
});
module.exports = uservalidationSchama;
