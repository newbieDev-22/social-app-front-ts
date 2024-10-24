import Joi from "joi";
import validateWrapper from "../../../utils/validate-wrapper";
import { IRegisterInput } from "../../../data-type/auth";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Email is required.`,
      "string.email": `Email must be a valid email.`,
    }),
  firstName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .messages({
      "string.empty": `First name is required.`,
      "string.pattern.base": `First name must be alphabet.`,
    }),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .messages({
      "string.empty": `Last name is required.`,
      "string.pattern.base": `Last name must be alphabet.`,
    }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": `Password is required.`,
      "string.pattern.base": `Password must be at least 6 character and contain alphabet and number.`,
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "string.empty": `Confirm password is required.`,
    "any.only": `Password and confirm password did not match.`,
  }),
}).meta({ className: "IRegisterInput" });

const validateRegister = (input: IRegisterInput) =>
  validateWrapper<IRegisterInput>(registerSchema, input);

export default validateRegister;
