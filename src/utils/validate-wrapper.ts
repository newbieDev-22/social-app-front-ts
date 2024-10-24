import Joi, { ValidationErrorItem } from "joi";
import { IValidateError } from "../data-type/validator";

export default function validateWrapper<T>(schema: Joi.ObjectSchema, input: T) {
  const { error } = schema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce(
      (acc: IValidateError, el: ValidationErrorItem) => {
        console.log(el);
        acc[el.path[0]] = el.message;
        return acc;
      },
      {}
    );
    return result;
  }
}
