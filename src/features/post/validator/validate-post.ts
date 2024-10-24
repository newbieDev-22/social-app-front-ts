import Joi from "joi";
import validateWrapper from "../../../utils/validate-wrapper";
import { IPostInput } from "../../../data-type/post";

const postSchema: Joi.ObjectSchema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": `Message is required.`,
  }),
}).meta({ className: "IPostInput" });

const validatePost = (input: IPostInput) =>
  validateWrapper<IPostInput>(postSchema, input);

export default validatePost;
