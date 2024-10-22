import Joi from "joi";
import validateWrapper from "../../../utils/validate-wrapper";
import { IPostInput } from "../../../data-type/post";

const postSchema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": `Message is required.`,
  }),
}).meta({ className: "IPostInput" });

const validatePost = (input: IPostInput) => validateWrapper(postSchema, input);

export default validatePost;
