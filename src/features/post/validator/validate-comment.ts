import Joi from "joi";
import validateWrapper from "../../../utils/validate-wrapper";
import { ICommentInput } from "../../../data-type/comment";

const commentSchema: Joi.ObjectSchema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": `Message is required.`,
  }),
}).meta({ className: "ICommentInput" });

const validateComment = (input: ICommentInput) =>
  validateWrapper<ICommentInput>(commentSchema, input);

export default validateComment;
