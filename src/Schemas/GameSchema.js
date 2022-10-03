import Joi from "joi";

const GameSchema = Joi.object({
    name:Joi.string().min(1).required(),
    image:Joi.string().required(),
    stockTotal:Joi.string().min(1).required(),
    categoryId:Joi.string().required(),
    pricePerDay:Joi.string().min(1).required(),
});

export default GameSchema;