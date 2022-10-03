import Joi from "joi";

const CategoriesSchema = Joi.object({
    name: Joi.string().required()
});

export default CategoriesSchema;